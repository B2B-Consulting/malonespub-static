import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pool-tournaments/store", () => ({ ensurePoolTournamentData: vi.fn(async () => undefined) }));
import { GET, POST } from "@/app/api/pool-tournament/scores/route";

describe("legacy public score endpoint", () => {
  it("never returns archived scores to unauthenticated GET or POST requests", async () => {
    for (const handler of [GET, POST]) {
      const response = await handler();
      expect(response.status).toBe(404);
      expect(response.headers.get("x-robots-tag")).toContain("noindex");
      expect(await response.json()).toEqual({ error: "Tournament scores are not publicly available." });
    }
  });
});
