import {
  TOURNAMENT_STATUSES,
  type RegistrationInput,
  type TournamentInput,
} from "@/lib/pool-tournaments/types";

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizePhone(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

export function normalizeEmail(value: unknown) {
  return cleanText(value, 254).toLowerCase();
}

export function formatPhone(phone: string) {
  return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
}

export function validateRegistrationInput(value: unknown):
  | { ok: true; value: RegistrationInput }
  | { ok: false; error: string } {
  const input = (value ?? {}) as Record<string, unknown>;
  const name = cleanText(input.name, 100);
  const phone = normalizePhone(input.phone);
  const email = normalizeEmail(input.email);
  if (name.length < 2 || name.length > 100) return { ok: false, error: "Enter your full name." };
  if (!/^[\p{L}\p{M}][\p{L}\p{M}' .-]+$/u.test(name)) return { ok: false, error: "Enter a valid full name." };
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(phone)) return { ok: false, error: "Enter a valid 10-digit cell phone number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: "Enter a valid email address." };
  return { ok: true, value: { name, phone, email } };
}

export function slugify(value: unknown) {
  return cleanText(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateTournamentInput(value: unknown):
  | { ok: true; value: TournamentInput }
  | { ok: false; error: string } {
  const input = (value ?? {}) as Record<string, unknown>;
  const name = cleanText(input.name, 120);
  const slug = slugify(input.slug || name);
  const maxPlayers = Number(input.maxPlayers);
  const rules = Array.isArray(input.rules)
    ? input.rules.map((rule) => cleanText(rule, 500)).filter(Boolean).slice(0, 100)
    : cleanText(input.rules, 20000).split(/\r?\n/).map((rule) => rule.trim()).filter(Boolean).slice(0, 100);
  if (!name || !slug) return { ok: false, error: "Tournament name and slug are required." };
  if (!Number.isInteger(maxPlayers) || maxPlayers < 2 || maxPlayers > 512) return { ok: false, error: "Player limit must be between 2 and 512." };
  const status = String(input.status);
  if (!TOURNAMENT_STATUSES.includes(status as (typeof TOURNAMENT_STATUSES)[number])) return { ok: false, error: "Select a valid tournament status." };
  const registrationStatus = input.registrationStatus === "Open" ? "Open" : "Closed";
  return {
    ok: true,
    value: {
      name,
      slug,
      date: cleanText(input.date, 30),
      startTime: cleanText(input.startTime, 30),
      checkInTime: cleanText(input.checkInTime, 30),
      entryFee: cleanText(input.entryFee, 80),
      maxPlayers,
      format: cleanText(input.format, 500),
      rules,
      prizeInformation: cleanText(input.prizeInformation, 1000),
      registrationStatus,
      status: status as TournamentInput["status"],
      isPublic: Boolean(input.isPublic),
    },
  };
}
