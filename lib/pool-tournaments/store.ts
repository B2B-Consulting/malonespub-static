import { createHash, createHmac, randomUUID } from "node:crypto";
import {
  ACTIVE_TOURNAMENT_ID,
  getArchivedTournament,
  getInitialActiveTournament,
  LEGACY_SCORE_KEY,
  LEGACY_TOURNAMENT_ID,
} from "@/lib/pool-tournaments/legacy";
import { isPoolDatabaseConfigured, poolRedisCommand } from "@/lib/pool-tournaments/redis";
import type {
  PoolRegistration,
  PoolTournament,
  PublicPoolTournament,
  RegistrationInput,
  TournamentInput,
} from "@/lib/pool-tournaments/types";

const PREFIX = "malones:pool:v1";
const TOURNAMENT_IDS_KEY = `${PREFIX}:tournament-ids`;
const ACTIVE_KEY = `${PREFIX}:active-tournament`;
const tournamentKey = (id: string) => `${PREFIX}:tournament:${id}`;
const registrationKey = (id: string) => `${PREFIX}:registrations:${id}`;
const phoneKey = (id: string) => `${PREFIX}:registration-phone:${id}`;
const emailKey = (id: string) => `${PREFIX}:registration-email:${id}`;

function parseJson<T>(raw: string | null | undefined): T | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

function registrationHash(value: string) {
  const key = process.env.POOL_REGISTRATION_HASH_SECRET || process.env.POOL_ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && !key) {
    throw new Error("Registration hashing is not configured.");
  }
  return createHmac("sha256", key || "local-development-only").update(value).digest("hex");
}

export function requestIdentity(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function allowAdminLoginAttempt(identity: string) {
  if (!isPoolDatabaseConfigured()) return true;
  const key = `${PREFIX}:admin-login-rate:${identity}`;
  const attempts = await poolRedisCommand<number>(["INCR", key]);
  if (attempts === 1) await poolRedisCommand(["EXPIRE", key, 900]);
  return attempts <= 10;
}

export async function ensurePoolTournamentData() {
  if (!isPoolDatabaseConfigured()) return;
  const oldScoresRaw = await poolRedisCommand<string | null>(["GET", LEGACY_SCORE_KEY]);
  const oldScores = parseJson<Record<string, { score?: string }>>(oldScoresRaw) ?? {};
  const archived = getArchivedTournament(oldScores);
  const active = getInitialActiveTournament();
  await Promise.all([
    poolRedisCommand(["SET", tournamentKey(archived.id), JSON.stringify(archived), "NX"]),
    poolRedisCommand(["SET", tournamentKey(active.id), JSON.stringify(active), "NX"]),
    poolRedisCommand(["SADD", TOURNAMENT_IDS_KEY, archived.id, active.id]),
    poolRedisCommand(["SET", ACTIVE_KEY, active.id, "NX"]),
  ]);
}

export async function getTournament(id: string) {
  if (!isPoolDatabaseConfigured()) {
    if (id === LEGACY_TOURNAMENT_ID) return getArchivedTournament();
    if (id === ACTIVE_TOURNAMENT_ID) return getInitialActiveTournament();
    return null;
  }
  await ensurePoolTournamentData();
  return parseJson<PoolTournament>(await poolRedisCommand<string | null>(["GET", tournamentKey(id)]));
}

export async function listTournaments() {
  if (!isPoolDatabaseConfigured()) return [getInitialActiveTournament(), getArchivedTournament()];
  await ensurePoolTournamentData();
  const ids = await poolRedisCommand<string[]>(["SMEMBERS", TOURNAMENT_IDS_KEY]);
  if (!ids.length) return [];
  const values = await poolRedisCommand<(string | null)[]>(["MGET", ...ids.map(tournamentKey)]);
  return values
    .map((raw) => parseJson<PoolTournament>(raw))
    .filter((item): item is PoolTournament => Boolean(item))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listRegistrations(tournamentId: string) {
  if (!isPoolDatabaseConfigured()) return [];
  const values = await poolRedisCommand<string[]>(["HVALS", registrationKey(tournamentId)]);
  return values
    .map((raw) => parseJson<PoolRegistration>(raw))
    .filter((item): item is PoolRegistration => Boolean(item))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function getPublicTournament(): Promise<PublicPoolTournament | null> {
  if (!isPoolDatabaseConfigured()) {
    return { ...getInitialActiveTournament(), availableSpots: 16 };
  }
  await ensurePoolTournamentData();
  const activeId = await poolRedisCommand<string | null>(["GET", ACTIVE_KEY]);
  if (!activeId) return null;
  const tournament = await getTournament(activeId);
  if (!tournament || !tournament.isPublic || tournament.status === "Archived") return null;
  const registrations = await listRegistrations(tournament.id);
  const activeCount = registrations.filter((entry) => entry.status === "Registered").length;
  const { legacyBracket: _legacyBracket, slug: _slug, archivedAt: _archivedAt, createdAt: _createdAt, isActivePublic: _isActivePublic, ...safe } = tournament;
  void _legacyBracket; void _slug; void _archivedAt; void _createdAt; void _isActivePublic;
  return { ...safe, availableSpots: Math.max(0, tournament.maxPlayers - activeCount) };
}

const REGISTER_SCRIPT = `
local attempts = redis.call('INCR', KEYS[6])
if attempts == 1 then redis.call('EXPIRE', KEYS[6], 600) end
if attempts > 5 then return 'RATE' end
local active = redis.call('GET', KEYS[2])
if not active then return 'CLOSED' end
local raw = redis.call('GET', KEYS[1])
if not raw then return 'CLOSED' end
local tournament = cjson.decode(raw)
if active ~= tournament.id or tournament.isPublic ~= true or tournament.registrationStatus ~= 'Open' or tournament.status == 'Archived' then return 'CLOSED' end
if redis.call('HEXISTS', KEYS[4], ARGV[2]) == 1 or redis.call('HEXISTS', KEYS[5], ARGV[3]) == 1 then return 'DUPLICATE' end
local count = 0
for _, registrationRaw in ipairs(redis.call('HVALS', KEYS[3])) do
  local registration = cjson.decode(registrationRaw)
  if registration.status == 'Registered' then count = count + 1 end
end
if count >= tonumber(tournament.maxPlayers) then return 'FULL' end
redis.call('HSET', KEYS[3], ARGV[1], ARGV[4])
redis.call('HSET', KEYS[4], ARGV[2], ARGV[1])
redis.call('HSET', KEYS[5], ARGV[3], ARGV[1])
return 'OK'
`;

export async function registerForActiveTournament(input: RegistrationInput, identity: string) {
  if (!isPoolDatabaseConfigured()) return "UNAVAILABLE" as const;
  await ensurePoolTournamentData();
  const activeId = await poolRedisCommand<string | null>(["GET", ACTIVE_KEY]);
  if (!activeId) return "CLOSED" as const;
  const now = new Date().toISOString();
  const registration: PoolRegistration = {
    id: randomUUID(), tournamentId: activeId, name: input.name, phone: input.phone, email: input.email,
    createdAt: now, updatedAt: now, status: "Registered", checkedIn: false,
  };
  return poolRedisCommand<"OK" | "RATE" | "CLOSED" | "DUPLICATE" | "FULL">([
    "EVAL", REGISTER_SCRIPT, 6,
    tournamentKey(activeId), ACTIVE_KEY, registrationKey(activeId), phoneKey(activeId), emailKey(activeId), `${PREFIX}:rate:${identity}`,
    registration.id, registrationHash(input.phone), registrationHash(input.email), JSON.stringify(registration),
  ]);
}

export async function createTournament(input: TournamentInput) {
  if (!isPoolDatabaseConfigured()) throw new Error("Tournament database is not configured.");
  await ensurePoolTournamentData();
  const now = new Date().toISOString();
  const tournament: PoolTournament = {
    id: randomUUID(), ...input, isActivePublic: false, createdAt: now,
    archivedAt: input.status === "Archived" ? now : null,
  };
  await Promise.all([
    poolRedisCommand(["SET", tournamentKey(tournament.id), JSON.stringify(tournament)]),
    poolRedisCommand(["SADD", TOURNAMENT_IDS_KEY, tournament.id]),
  ]);
  return tournament;
}

export async function updateTournament(id: string, input: TournamentInput) {
  const existing = await getTournament(id);
  if (!existing || !isPoolDatabaseConfigured()) return null;
  const isArchived = input.status === "Archived";
  const next: PoolTournament = {
    ...existing,
    ...input,
    isPublic: isArchived ? false : input.isPublic,
    registrationStatus: isArchived ? "Closed" : input.registrationStatus,
    isActivePublic: isArchived ? false : existing.isActivePublic,
    archivedAt: isArchived ? existing.archivedAt ?? new Date().toISOString() : null,
  };
  await poolRedisCommand(["SET", tournamentKey(id), JSON.stringify(next)]);
  if (isArchived && existing.isActivePublic) await poolRedisCommand(["DEL", ACTIVE_KEY]);
  return next;
}

export async function setActiveTournament(id: string) {
  const target = await getTournament(id);
  if (!target || target.status === "Archived" || !isPoolDatabaseConfigured()) return null;
  const currentId = await poolRedisCommand<string | null>(["GET", ACTIVE_KEY]);
  if (currentId && currentId !== id) {
    const current = await getTournament(currentId);
    if (current) await poolRedisCommand(["SET", tournamentKey(current.id), JSON.stringify({ ...current, isActivePublic: false })]);
  }
  const next = { ...target, isPublic: true, isActivePublic: true };
  await Promise.all([
    poolRedisCommand(["SET", tournamentKey(id), JSON.stringify(next)]),
    poolRedisCommand(["SET", ACTIVE_KEY, id]),
  ]);
  return next;
}

export async function addRegistrationByAdmin(tournamentId: string, input: RegistrationInput) {
  const tournament = await getTournament(tournamentId);
  if (!tournament || !isPoolDatabaseConfigured()) throw new Error("Tournament not found.");
  const registrations = await listRegistrations(tournamentId);
  if (registrations.filter((entry) => entry.status === "Registered").length >= tournament.maxPlayers) throw new Error("Registration is full.");
  const phoneHash = registrationHash(input.phone);
  const emailHash = registrationHash(input.email);
  const [phoneMatch, emailMatch] = await Promise.all([
    poolRedisCommand<string | null>(["HGET", phoneKey(tournamentId), phoneHash]),
    poolRedisCommand<string | null>(["HGET", emailKey(tournamentId), emailHash]),
  ]);
  if (phoneMatch || emailMatch) throw new Error("This player may already be registered.");
  const now = new Date().toISOString();
  const registration: PoolRegistration = { id: randomUUID(), tournamentId, ...input, createdAt: now, updatedAt: now, status: "Registered", checkedIn: false };
  await Promise.all([
    poolRedisCommand(["HSET", registrationKey(tournamentId), registration.id, JSON.stringify(registration)]),
    poolRedisCommand(["HSET", phoneKey(tournamentId), phoneHash, registration.id]),
    poolRedisCommand(["HSET", emailKey(tournamentId), emailHash, registration.id]),
  ]);
  return registration;
}

export async function updateRegistration(tournamentId: string, registrationId: string, input: RegistrationInput & { status: PoolRegistration["status"]; checkedIn: boolean }) {
  if (!isPoolDatabaseConfigured()) return null;
  const raw = await poolRedisCommand<string | null>(["HGET", registrationKey(tournamentId), registrationId]);
  const existing = parseJson<PoolRegistration>(raw);
  if (!existing) return null;
  const phoneHash = registrationHash(input.phone);
  const emailHash = registrationHash(input.email);
  const [phoneMatch, emailMatch] = await Promise.all([
    poolRedisCommand<string | null>(["HGET", phoneKey(tournamentId), phoneHash]),
    poolRedisCommand<string | null>(["HGET", emailKey(tournamentId), emailHash]),
  ]);
  if ((phoneMatch && phoneMatch !== registrationId) || (emailMatch && emailMatch !== registrationId)) throw new Error("This player may already be registered.");
  const next: PoolRegistration = { ...existing, ...input, updatedAt: new Date().toISOString() };
  await Promise.all([
    poolRedisCommand(["HDEL", phoneKey(tournamentId), registrationHash(existing.phone)]),
    poolRedisCommand(["HDEL", emailKey(tournamentId), registrationHash(existing.email)]),
    poolRedisCommand(["HSET", registrationKey(tournamentId), registrationId, JSON.stringify(next)]),
  ]);
  if (next.status === "Registered") {
    await Promise.all([
      poolRedisCommand(["HSET", phoneKey(tournamentId), phoneHash, registrationId]),
      poolRedisCommand(["HSET", emailKey(tournamentId), emailHash, registrationId]),
    ]);
  }
  return next;
}

export async function deleteRegistration(tournamentId: string, registrationId: string) {
  if (!isPoolDatabaseConfigured()) return false;
  const raw = await poolRedisCommand<string | null>(["HGET", registrationKey(tournamentId), registrationId]);
  const existing = parseJson<PoolRegistration>(raw);
  if (!existing) return false;
  await Promise.all([
    poolRedisCommand(["HDEL", registrationKey(tournamentId), registrationId]),
    poolRedisCommand(["HDEL", phoneKey(tournamentId), registrationHash(existing.phone)]),
    poolRedisCommand(["HDEL", emailKey(tournamentId), registrationHash(existing.email)]),
  ]);
  return true;
}
