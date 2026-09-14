import { beforeEach, describe, expect, it, vi } from "vitest";
import { publicBracket } from "@/lib/pool-tournaments/bracket";
import { getInitialActiveTournament } from "@/lib/pool-tournaments/legacy";

const { getPublicTournament, saveTournamentMatch } = vi.hoisted(() => ({ getPublicTournament: vi.fn(), saveTournamentMatch: vi.fn() }));
vi.mock("@/lib/pool-tournaments/auth", () => ({ hasValidMutationOrigin: (request: Request) => request.headers.get("origin") === new URL(request.url).origin }));
vi.mock("@/lib/pool-tournaments/store", () => ({
  allowPublicScoreAttempt: vi.fn(async () => true),
  getPublicTournament,
  requestIdentity: vi.fn(() => "visitor"),
  saveTournamentMatch,
}));
import { GET, POST } from "@/app/api/pool-tournament/scores/route";

function tournament() {
  const value = getInitialActiveTournament();
  value.bracket = {
    drawnAt: "2026-09-14T02:02:46.534Z",
    players: Array.from({ length: 16 }, (_, index) => ({ registrationId: `private-${index}`, name: `Player ${index + 1}` })),
    results: {},
  };
  return value;
}

describe("public tournament score endpoint", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns only the public bracket", async () => {
    const value = tournament();
    getPublicTournament.mockResolvedValue({ ...value, bracket: publicBracket(value.bracket!) });
    const response = await GET();
    expect(response.status).toBe(200);
    expect(JSON.stringify(await response.json())).not.toContain("private-");
  });

  it("saves a valid same-origin score and returns the advanced public bracket", async () => {
    const value = tournament();
    getPublicTournament.mockResolvedValue({ ...value, bracket: publicBracket(value.bracket!) });
    const updated = tournament();
    updated.bracket!.results["w1-1"] = { a: 2, b: 1 };
    saveTournamentMatch.mockResolvedValue(updated);
    const response = await POST(new Request("https://malonespub.com/api/pool-tournament/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://malonespub.com" },
      body: JSON.stringify({ matchId: "w1-1", a: 2, b: 1, drawnAt: value.bracket!.drawnAt }),
    }));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.bracket.slots["seed-1"].score).toBe("2");
    expect(body.bracket.slots["w2-1-a"].name).toBe("Player 1");
    expect(JSON.stringify(body)).not.toContain("private-");
  });

  it("rejects a cross-origin score submission", async () => {
    const response = await POST(new Request("https://malonespub.com/api/pool-tournament/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://example.com" },
      body: JSON.stringify({ matchId: "w1-1", a: 2, b: 1, drawnAt: "draw" }),
    }));
    expect(response.status).toBe(403);
    expect(saveTournamentMatch).not.toHaveBeenCalled();
  });

  it("leaves recorded-score corrections to the administrator", async () => {
    const value = tournament();
    value.bracket!.results["w1-1"] = { a: 2, b: 0 };
    getPublicTournament.mockResolvedValue({ ...value, bracket: publicBracket(value.bracket!) });
    const response = await POST(new Request("https://malonespub.com/api/pool-tournament/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://malonespub.com" },
      body: JSON.stringify({ matchId: "w1-1", a: 1, b: 2, drawnAt: value.bracket!.drawnAt }),
    }));
    expect(response.status).toBe(409);
    expect(saveTournamentMatch).not.toHaveBeenCalled();
  });
});
