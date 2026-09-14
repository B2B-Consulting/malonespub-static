import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PoolTournamentBracket from "@/components/PoolTournamentBracket";
import { BRACKET_MATCHES, publicBracket, recordMatchResult } from "@/lib/pool-tournaments/bracket";
import type { TournamentBracket } from "@/lib/pool-tournaments/types";

function draw(): TournamentBracket {
  return {
    drawnAt: "2026-09-13T15:00:00.000Z",
    players: Array.from({ length: 16 }, (_, i) => ({ registrationId: `private-id-${i + 1}`, name: `Player ${i + 1}` })),
    results: {},
  };
}

describe("16-player double-elimination bracket", () => {
  it("exposes only names, scores and draw metadata, with eight first-round matches", () => {
    const bracket = publicBracket(draw());
    expect(Object.values(bracket.slots).filter((slot) => slot.name)).toHaveLength(16);
    expect(BRACKET_MATCHES.filter((match) => match.id.startsWith("w1-"))).toHaveLength(8);
    expect(JSON.stringify(bracket)).not.toContain("private-id");
    expect(Object.values(bracket.slots).every((slot) => slot.score === "")).toBe(true);
    expect(bracket.champion).toBeNull();
  });

  it("renders the original three bracket sections without public score-editing controls", () => {
    const html = renderToStaticMarkup(<PoolTournamentBracket bracket={publicBracket(draw())} />);
    expect(html).toContain("Winners Bracket");
    expect(html).toContain("Losers Bracket");
    expect(html).toContain("Championship");
    expect(html).toContain("Player 16");
    expect(html).not.toContain("<input");
    expect(html).not.toContain("private-id");
  });

  it("renders score controls when public score entry is enabled", () => {
    const html = renderToStaticMarkup(<PoolTournamentBracket bracket={publicBracket(draw())} allowPublicScoreEntry />);
    expect(html).toContain("Save Score");
    expect(html).toContain("enter the final 2–0 or 2–1 score");
    expect(html.match(/<input/g)).toHaveLength(16);
  });

  it("advances the winner and loser to their correct brackets", () => {
    const bracket = publicBracket(recordMatchResult(draw(), "w1-1", 1, 2));
    expect(bracket.slots["w2-1-a"].name).toBe("Player 2");
    expect(bracket.slots["l1-1-a"].name).toBe("Player 1");
    expect(bracket.slots["seed-1"].score).toBe("1");
  });

  it("rejects incomplete matches and invalid best-of-three scores", () => {
    expect(() => recordMatchResult(draw(), "w2-1", 2, 0)).toThrow("Both players");
    for (const [a, b] of [[2, 2], [1, 0], [3, 1], [-1, 2], [2, 0.5], ["2", 0]]) {
      expect(() => recordMatchResult(draw(), "w1-1", a, b)).toThrow("final score");
    }
  });

  it.each([false, true])("finishes a whole tournament with two losses per eliminated player (reset: %s)", (reset) => {
    let bracket = draw();
    const losses: Record<string, number> = {};
    for (const match of BRACKET_MATCHES) {
      if (match.id === "g2" && !reset) continue;
      const slots = publicBracket(bracket).slots;
      const names = match.slotIds.map((id) => slots[id].name);
      expect(names.every(Boolean)).toBe(true);
      expect(names[0]).not.toBe(names[1]);
      expect(names.every((name) => (losses[name] ?? 0) < 2)).toBe(true);
      const bWins = match.id === "g1" && reset;
      const loser = names[bWins ? 0 : 1];
      losses[loser] = (losses[loser] ?? 0) + 1;
      bracket = recordMatchResult(bracket, match.id, bWins ? 1 : 2, bWins ? 2 : 1);
    }
    const champion = publicBracket(bracket).champion;
    expect(champion).toBeTruthy();
    for (const player of bracket.players) {
      expect(losses[player.name] ?? 0).toBe(player.name === champion ? (reset ? 1 : 0) : 2);
    }
    if (!reset) expect(publicBracket(bracket).slots["g2-a"].name).toBe("");
  });

  it("clears downstream results after a winner changes, preserving unrelated scores", () => {
    let bracket = draw();
    for (const match of BRACKET_MATCHES.slice(0, 15)) bracket = recordMatchResult(bracket, match.id, 2, 0);
    bracket = recordMatchResult(bracket, "w1-1", 0, 2);
    expect(bracket.results["w2-1"]).toBeUndefined();
    expect(bracket.results["w3-1"]).toBeUndefined();
    expect(bracket.results["w4-1"]).toBeUndefined();
    expect(bracket.results["w2-2"]).toEqual({ a: 2, b: 0 });
    expect(publicBracket(bracket).slots["w2-1-a"].name).toBe("Player 2");
  });
});
