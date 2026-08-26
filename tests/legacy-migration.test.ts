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
  });
  it("does not embed the archived bracket in the active tournament", () => {
    expect(getInitialActiveTournament().legacyBracket).toBeUndefined();
  });
});
