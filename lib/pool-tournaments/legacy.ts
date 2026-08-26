import tournamentRules from "@/content/pool-tournament.json";
import type { BracketSlot, PoolTournament } from "@/lib/pool-tournaments/types";

export const LEGACY_SCORE_KEY = "malones:pool-tournament:scores:v1";
export const LEGACY_TOURNAMENT_ID = "legacy-pool-tournament-v1";
export const ACTIVE_TOURNAMENT_ID = "current-pool-tournament-v1";

const firstRoundPlayers = [
  "Missy",
  "Roger",
  "Brendan",
  "Hank",
  "Robbie",
  "Oscar",
  "Todd",
  "Race",
  "Matt",
  "Collin",
  "Chelsey",
  "Joe",
  "Jeremy",
  "Mack",
  "Tolley",
  "Rodney",
];

const advancedPlayers: Record<string, string> = {
  "w2-1-a": "Roger", "w2-1-b": "Hank", "w2-2-a": "Oscar", "w2-2-b": "Jeremy",
  "w2-3-a": "Race", "w2-3-b": "Joe", "w2-4-a": "Collin", "w2-4-b": "Tolley",
  "l1-1-a": "Todd", "l1-1-b": "Missy", "l1-2-a": "Brendan", "l1-2-b": "Rodney",
  "l1-3-a": "Robbie", "l1-3-b": "Matt", "l1-4-a": "Chelsey", "l1-4-b": "Mack",
  "w3-1-a": "Oscar", "w3-1-b": "Race", "w3-2-a": "Collin", "w3-2-b": "Roger",
  "l2-1-a": "Brendan", "l2-1-b": "Jeremy", "l2-2-a": "Missy", "l2-2-b": "Joe",
  "l2-3-a": "Mack", "l2-3-b": "Tolley", "l2-4-a": "Matt", "l2-4-b": "Hank",
  "w4-1-a": "Oscar", "w4-1-b": "Collin", "l3-1-a": "Brendan", "l3-1-b": "Matt",
  "l3-2-a": "Tolley", "l3-2-b": "Joe", "l4-1-a": "Matt", "l4-1-b": "Race",
  "l4-2-a": "Joe", "l4-2-b": "Roger", "l5-1-a": "Matt", "l5-1-b": "Joe",
  "l6-1-a": "Matt", "l6-1-b": "Collin", "g1-a": "Oscar", "g1-b": "Collin",
  "g2-a": "Oscar", "g2-b": "Collin",
};

export function getLegacyBracket(scores: Record<string, { score?: string }> = {}) {
  const slots: Record<string, BracketSlot> = {};
  firstRoundPlayers.forEach((name, index) => {
    const id = `seed-${index + 1}`;
    slots[id] = { name, score: scores[id]?.score ?? "" };
  });
  Object.entries(advancedPlayers).forEach(([id, name]) => {
    slots[id] = { name, score: scores[id]?.score ?? "" };
  });
  return slots;
}

export type LegacyBracketRound = {
  title: string;
  matches: { id: string; title: string; slotIds: [string, string] }[];
};

const round = (title: string, prefix: string, count: number, firstMatch: number): LegacyBracketRound => ({
  title,
  matches: Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    title: `Match ${firstMatch + index}`,
    slotIds:
      prefix === "w1"
        ? [`seed-${index * 2 + 1}`, `seed-${index * 2 + 2}`]
        : [`${prefix}-${index + 1}-a`, `${prefix}-${index + 1}-b`],
  })),
});

export const LEGACY_BRACKET_ROUNDS: LegacyBracketRound[] = [
  round("Winners Round 1", "w1", 8, 1),
  round("Winners Round 2", "w2", 4, 9),
  round("Winners Semifinals", "w3", 2, 13),
  round("Winners Final", "w4", 1, 15),
  round("Losers Round 1", "l1", 4, 16),
  round("Losers Round 2", "l2", 4, 20),
  round("Losers Round 3", "l3", 2, 24),
  round("Losers Round 4", "l4", 2, 26),
  round("Losers Semifinal", "l5", 1, 28),
  round("Losers Final", "l6", 1, 29),
  {
    title: "Championship",
    matches: [
      { id: "g1", title: "Grand Final", slotIds: ["g1-a", "g1-b"] },
      { id: "g2", title: "Reset Match", slotIds: ["g2-a", "g2-b"] },
    ],
  },
];

const rules = tournamentRules.sections.flatMap((section) =>
  section.rules.map((rule) => `${section.title}: ${rule}`),
);

export function getArchivedTournament(scores: Record<string, { score?: string }> = {}): PoolTournament {
  return {
    id: LEGACY_TOURNAMENT_ID,
    slug: "archived-pool-tournament-v1",
    name: "Malone's Pool Tournament — Archived Results",
    date: "",
    startTime: "",
    checkInTime: "",
    entryFee: "Not recorded",
    maxPlayers: 16,
    format: "Double elimination; best 2 out of 3 games of 8-ball",
    rules,
    prizeInformation: "Not recorded",
    registrationStatus: "Closed",
    status: "Archived",
    isPublic: false,
    isActivePublic: false,
    createdAt: "2026-08-26T00:00:00.000Z",
    archivedAt: "2026-08-26T00:00:00.000Z",
    legacyBracket: getLegacyBracket(scores),
  };
}

export function getInitialActiveTournament(): PoolTournament {
  return {
    id: ACTIVE_TOURNAMENT_ID,
    slug: "current-pool-tournament",
    name: "Malone's Pool Tournament",
    date: "",
    startTime: "",
    checkInTime: "",
    entryFee: "Ask Malone's Pub",
    maxPlayers: 16,
    format: "Double elimination; best 2 out of 3 games of 8-ball",
    rules,
    prizeInformation: "Prize details will be announced by the tournament organizer.",
    registrationStatus: "Open",
    status: "Registration Open",
    isPublic: true,
    isActivePublic: true,
    createdAt: "2026-08-26T00:00:00.000Z",
    archivedAt: null,
  };
}
