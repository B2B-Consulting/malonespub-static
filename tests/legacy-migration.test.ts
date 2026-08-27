import { describe, expect, it } from "vitest";
import { getArchivedTournament, getInitialActiveTournament } from "@/lib/pool-tournaments/legacy";

describe("legacy tournament snapshot", () => {
  it("keeps legacy player names and score values unchanged while making the archive private", () => {
    const archived = getArchivedTournament({ "seed-1": { score: "2" }, "seed-2": { score: "1" }, "g1-a": { score: "2" } });
    expect(archived.legacyBracket?.["seed-1"]).toEqual({ name: "Missy", score: "2" });
    expect(archived.legacyBracket?.["seed-2"]).toEqual({ name: "Roger", score: "1" });
    expect(archived.legacyBracket?.["g1-a"]).toEqual({ name: "Oscar", score: "2" });
    expect(archived.status).toBe("Archived");
    expect(archived.isPublic).toBe(false);
    expect(archived.registrationStatus).toBe("Closed");
    expect(archived.rules.some((rule) => rule.startsWith("Weekly Match Scheduling:"))).toBe(false);
  });
  it("does not embed the archived bracket in the active tournament", () => {
    const active = getInitialActiveTournament();
    expect(active.legacyBracket).toBeUndefined();
    expect(active.entryFee).toBe("$25");
    expect(active.prizeInformation).toBe("First place: $300. Second place: $100.");
    expect(active.rules.filter((rule) => rule.startsWith("Weekly Match Scheduling:"))).toHaveLength(6);
    expect(active.rules).toContain(
      "Tournament Table Access & Spotting: Although Malone's table is normally coin operated, it will be unlocked for tournament matches.",
    );
    expect(active.rules).toContain(
      "Balls on the Floor: An object ball other than the 8-ball that is knocked on the floor is retrieved and spotted on the foot spot after the shot.",
    );
    expect(active.rules.some((rule) => rule.includes("cannot be retrieved"))).toBe(false);
    expect(active.rules.some((rule) => rule.includes("Do not open the coin-operated table"))).toBe(false);
  });
});
