import type { BracketSlot, PublicTournamentBracket, TournamentBracket } from "@/lib/pool-tournaments/types";

type Source = { matchId: string; outcome: "winner" | "loser" };
type Match = { id: string; title: string; slotIds: [string, string]; sources?: [Source, Source] };
type Round = { title: string; matches: Match[] };

const winner = (matchId: string): Source => ({ matchId, outcome: "winner" });
const loser = (matchId: string): Source => ({ matchId, outcome: "loser" });
const round = (title: string, prefix: string, count: number, firstMatch: number, sources?: (index: number) => [Source, Source]): Round => ({
  title,
  matches: Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    title: `Match ${firstMatch + index}`,
    slotIds: prefix === "w1"
      ? [`seed-${index * 2 + 1}`, `seed-${index * 2 + 2}`]
      : [`${prefix}-${index + 1}-a`, `${prefix}-${index + 1}-b`],
    sources: sources?.(index),
  })),
});

// The same 16-player layout and match numbers as the first tournament.
export const BRACKET_ROUNDS: Round[] = [
  round("Winners Round 1", "w1", 8, 1),
  round("Winners Round 2", "w2", 4, 9, (i) => [winner(`w1-${i * 2 + 1}`), winner(`w1-${i * 2 + 2}`)]),
  round("Winners Semifinals", "w3", 2, 13, (i) => [winner(`w2-${i * 2 + 1}`), winner(`w2-${i * 2 + 2}`)]),
  round("Winners Final", "w4", 1, 15, () => [winner("w3-1"), winner("w3-2")]),
  round("Losers Round 1", "l1", 4, 16, (i) => [loser(`w1-${i * 2 + 1}`), loser(`w1-${i * 2 + 2}`)]),
  round("Losers Round 2", "l2", 4, 20, (i) => [winner(`l1-${i + 1}`), loser(`w2-${[2, 1, 4, 3][i]}`)]),
  round("Losers Round 3", "l3", 2, 24, (i) => [winner(`l2-${i * 2 + 1}`), winner(`l2-${i * 2 + 2}`)]),
  round("Losers Round 4", "l4", 2, 26, (i) => [winner(`l3-${i + 1}`), loser(`w3-${2 - i}`)]),
  round("Losers Semifinal", "l5", 1, 28, () => [winner("l4-1"), winner("l4-2")]),
  round("Losers Final", "l6", 1, 29, () => [winner("l5-1"), loser("w4-1")]),
  { title: "Championship", matches: [
    { id: "g1", title: "Grand Final", slotIds: ["g1-a", "g1-b"], sources: [winner("w4-1"), winner("l6-1")] },
    { id: "g2", title: "Reset Match", slotIds: ["g2-a", "g2-b"], sources: [loser("g1"), winner("g1")] },
  ] },
];

export const BRACKET_GROUPS = [
  { title: "Winners Bracket", rounds: BRACKET_ROUNDS.slice(0, 4) },
  { title: "Losers Bracket", rounds: BRACKET_ROUNDS.slice(4, 10) },
  { title: "Championship", rounds: BRACKET_ROUNDS.slice(10) },
];

export const BRACKET_MATCHES = BRACKET_ROUNDS.flatMap((item) => item.matches);

export function slotPlaceholder(match: Match, index: number) {
  if (match.id === "g2") return "If needed";
  const source = match.sources?.[index];
  if (!source) return "Awaiting draw";
  const title = BRACKET_MATCHES.find((item) => item.id === source.matchId)?.title ?? source.matchId;
  return `${source.outcome === "winner" ? "Winner" : "Loser"} of ${title}`;
}

function resolveBracket(bracket: TournamentBracket) {
  type Player = TournamentBracket["players"][number];
  const participants: Record<string, [Player | undefined, Player | undefined]> = {};
  const outcomes: Record<string, { winner: Player; loser: Player }> = {};
  const slots: Record<string, BracketSlot> = {};
  for (const match of BRACKET_MATCHES) {
    const resetNeeded = bracket.results.g1 && bracket.results.g1.b === 2;
    const pair: [Player | undefined, Player | undefined] = match.id === "g2" && !resetNeeded
      ? [undefined, undefined]
      : match.sources
        ? [outcomes[match.sources[0].matchId]?.[match.sources[0].outcome], outcomes[match.sources[1].matchId]?.[match.sources[1].outcome]]
        : match.slotIds.map((id) => bracket.players[Number(id.slice(5)) - 1]) as [Player, Player];
    participants[match.id] = pair;
    const result = pair[0] && pair[1] ? bracket.results[match.id] : undefined;
    match.slotIds.forEach((id, index) => {
      slots[id] = { name: pair[index]?.name ?? "", score: result ? String(index === 0 ? result.a : result.b) : "" };
    });
    if (result && pair[0] && pair[1]) {
      outcomes[match.id] = result.a === 2 ? { winner: pair[0], loser: pair[1] } : { winner: pair[1], loser: pair[0] };
    }
  }
  const champion = outcomes.g2?.winner.name ?? (bracket.results.g1?.a === 2 ? outcomes.g1?.winner.name : undefined) ?? null;
  return { participants, slots, champion };
}

export function publicBracket(bracket: TournamentBracket): PublicTournamentBracket {
  const { slots, champion } = resolveBracket(bracket);
  return { drawnAt: bracket.drawnAt, slots, champion };
}

export function recordMatchResult(bracket: TournamentBracket, matchId: string, a: unknown, b: unknown): TournamentBracket {
  if (!BRACKET_MATCHES.some((match) => match.id === matchId)) throw new Error("Match not found.");
  if (typeof a !== "number" || typeof b !== "number" || !Number.isInteger(a) || !Number.isInteger(b) ||
    !((a === 2 && b >= 0 && b < 2) || (b === 2 && a >= 0 && a < 2))) {
    throw new Error("Enter a final score of 2–0 or 2–1.");
  }
  const before = resolveBracket(bracket);
  if (!before.participants[matchId].every(Boolean)) throw new Error("Both players must be assigned before saving a score.");
  const next: TournamentBracket = { ...bracket, results: { ...bracket.results, [matchId]: { a, b } } };
  // A correction invalidates only results whose players have changed, including descendants.
  for (const match of BRACKET_MATCHES) {
    if (match.id === matchId || !next.results[match.id]) continue;
    const after = resolveBracket(next);
    if (before.participants[match.id].some((player, index) => player?.registrationId !== after.participants[match.id][index]?.registrationId)) {
      delete next.results[match.id];
    }
  }
  return next;
}
