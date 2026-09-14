import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pool-tournaments/auth", () => ({
  isPoolAdminAuthenticated: vi.fn(async () => false),
  hasValidMutationOrigin: () => true,
}));
vi.mock("@/lib/pool-tournaments/store", () => ({
  listTournaments: vi.fn(),
  listRegistrations: vi.fn(),
  createTournament: vi.fn(),
  drawTournamentBracket: vi.fn(),
  saveTournamentMatch: vi.fn(),
  getTournament: vi.fn(),
  setActiveTournament: vi.fn(),
  updateTournament: vi.fn(),
}));

import { GET } from "@/app/api/admin/pool-tournaments/route";
import { PUT } from "@/app/api/admin/pool-tournaments/[id]/route";
import { drawTournamentBracket, saveTournamentMatch } from "@/lib/pool-tournaments/store";

describe("administrator API authentication", () => {
  it.each(["draw", "score"])("rejects unauthenticated bracket %s requests before changing data", async (action) => {
    const response = await PUT(new Request("https://malonespub.com/api/admin/pool-tournaments/id", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, matchId: "w1-1", a: 2, b: 0 }),
    }), { params: Promise.resolve({ id: "id" }) });
    expect(response.status).toBe(401);
    expect(drawTournamentBracket).not.toHaveBeenCalled();
    expect(saveTournamentMatch).not.toHaveBeenCalled();
  });
  it("denies private tournament data while logged out", async () => {
    const response = await GET();
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "Unauthorized." });
  });
});
