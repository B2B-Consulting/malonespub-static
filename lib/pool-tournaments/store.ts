import { createHash, createHmac, randomInt, randomUUID } from "node:crypto";
import { publicBracket, recordMatchResult } from "@/lib/pool-tournaments/bracket";
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
  TournamentBracket,
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

export async function allowPublicScoreAttempt(identity: string) {
  if (!isPoolDatabaseConfigured()) return true;
  const key = `${PREFIX}:score-rate:${identity}`;
  const attempts = await poolRedisCommand<number>(["INCR", key]);
  if (attempts === 1) await poolRedisCommand(["EXPIRE", key, 600]);
  return attempts <= 30;
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
    return toPublicTournament(getInitialActiveTournament(), 0);
  }
  await ensurePoolTournamentData();
  const activeId = await poolRedisCommand<string | null>(["GET", ACTIVE_KEY]);
  if (!activeId) return null;
  let tournament = await getTournament(activeId);
  if (!tournament || !tournament.isPublic || tournament.status === "Archived") return null;
  const registrations = await listRegistrations(tournament.id);
  const activeCount = registrations.filter((entry) => entry.status === "Registered").length;
  // One-time rollout for the full second tournament requested by the organizer.
  // Future tournament IDs continue to use the authenticated dashboard draw action.
  if (activeId === ACTIVE_TOURNAMENT_ID && !tournament.bracket && tournament.maxPlayers === 16 && activeCount === 16 &&
    (tournament.status === "Registration Open" || tournament.status === "Registration Closed")) {
    tournament = await drawTournamentBracket(activeId);
  }
  return toPublicTournament(tournament, activeCount);
}

function toPublicTournament(tournament: PoolTournament, activeCount: number): PublicPoolTournament {
  const { legacyBracket: _legacyBracket, bracket, slug: _slug, archivedAt: _archivedAt, createdAt: _createdAt, isActivePublic: _isActivePublic, ...safe } = tournament;
  void _legacyBracket; void _slug; void _archivedAt; void _createdAt; void _isActivePublic;
  return { ...safe, availableSpots: Math.max(0, tournament.maxPlayers - activeCount), ...(bracket ? { bracket: publicBracket(bracket) } : {}) };
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
if active ~= tournament.id or tournament.isPublic ~= true or tournament.registrationStatus ~= 'Open' or tournament.status == 'Archived' or tournament.bracket then return 'CLOSED' end
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
    registrationStatus: isArchived || existing.bracket ? "Closed" : input.registrationStatus,
    isActivePublic: isArchived ? false : existing.isActivePublic,
    archivedAt: isArchived ? existing.archivedAt ?? new Date().toISOString() : null,
  };
  // Keep a draw or score saved concurrently with an edit to tournament details.
  const saved = await poolRedisCommand<string>(["EVAL", `
local current = cjson.decode(redis.call('GET', KEYS[1]))
local next = cjson.decode(ARGV[1])
if current.bracket then
  next.bracket = current.bracket
  next.registrationStatus = 'Closed'
end
local encoded = cjson.encode(next)
redis.call('SET', KEYS[1], encoded)
return encoded
`, 1, tournamentKey(id), JSON.stringify(next)]);
  if (isArchived && existing.isActivePublic) await poolRedisCommand(["DEL", ACTIVE_KEY]);
  return JSON.parse(saved) as PoolTournament;
}

const DRAW_BRACKET_SCRIPT = `
local raw = redis.call('GET', KEYS[1])
if not raw then return 'MISSING' end
local tournament = cjson.decode(raw)
if tournament.bracket then return raw end
if redis.call('GET', KEYS[2]) ~= tournament.id or tournament.isPublic ~= true or tournament.status == 'Archived' or tournament.status == 'Completed' then return 'INACTIVE' end
if tournament.maxPlayers ~= 16 then return 'SIZE' end
local count = 0
for _, rawPlayer in ipairs(redis.call('HVALS', KEYS[3])) do
  if cjson.decode(rawPlayer).status == 'Registered' then count = count + 1 end
end
if count ~= 16 then return 'SIZE' end
local bracket = cjson.decode(ARGV[1])
for _, player in ipairs(bracket.players) do
  local registrationRaw = redis.call('HGET', KEYS[3], player.registrationId)
  if not registrationRaw then return 'CHANGED' end
  local registration = cjson.decode(registrationRaw)
  if registration.status ~= 'Registered' or registration.name ~= player.name then return 'CHANGED' end
end
tournament.bracket = bracket
tournament.registrationStatus = 'Closed'
tournament.status = 'Registration Closed'
local encoded = cjson.encode(tournament)
redis.call('SET', KEYS[1], encoded)
return encoded
`;

export async function drawTournamentBracket(id: string) {
  if (!isPoolDatabaseConfigured()) throw new Error("Tournament database is not configured.");
  const tournament = await getTournament(id);
  if (!tournament) throw new Error("Tournament not found.");
  if (tournament.bracket) return tournament;
  const players = (await listRegistrations(id))
    .filter((entry) => entry.status === "Registered")
    .map((entry) => ({ registrationId: entry.id, name: entry.name }));
  if (tournament.maxPlayers !== 16 || players.length !== 16) throw new Error("This bracket requires exactly 16 registered players.");
  // Fisher–Yates with unbiased cryptographic integers. Save once; never shuffle on reads.
  for (let index = players.length - 1; index > 0; index--) {
    const other = randomInt(index + 1);
    [players[index], players[other]] = [players[other], players[index]];
  }
  const bracket: TournamentBracket = { drawnAt: new Date().toISOString(), players, results: {} };
  const result = await poolRedisCommand<string>(["EVAL", DRAW_BRACKET_SCRIPT, 3, tournamentKey(id), ACTIVE_KEY, registrationKey(id), JSON.stringify(bracket)]);
  if (result === "SIZE") throw new Error("This bracket requires exactly 16 registered players.");
  if (result === "CHANGED") throw new Error("The player list changed. Please try the draw again.");
  if (result === "MISSING" || result === "INACTIVE") throw new Error("Only the active public tournament can be drawn.");
  return JSON.parse(result) as PoolTournament;
}

export async function saveTournamentMatch(id: string, matchId: string, a: unknown, b: unknown, expectedDrawnAt: string) {
  if (!isPoolDatabaseConfigured()) throw new Error("Tournament database is not configured.");
  const raw = await poolRedisCommand<string | null>(["GET", tournamentKey(id)]);
  const tournament = parseJson<PoolTournament>(raw);
  if (!tournament?.bracket || tournament.status === "Archived") throw new Error("An active bracket is required.");
  if (tournament.bracket.drawnAt !== expectedDrawnAt) throw new Error("The bracket changed. Reload before saving.");
  const bracket = recordMatchResult(tournament.bracket, matchId, a, b);
  const next: PoolTournament = { ...tournament, bracket, registrationStatus: "Closed", status: publicBracket(bracket).champion ? "Completed" : "In Progress" };
  const saved = await poolRedisCommand<number>(["EVAL", `
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[2])
return 1
`, 1, tournamentKey(id), raw, JSON.stringify(next)]);
  if (!saved) throw new Error("The tournament changed while saving. Reload and try again.");
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
