import { beforeEach, describe, expect, it, vi } from "vitest";
import { getInitialActiveTournament } from "@/lib/pool-tournaments/legacy";
import type { PoolRegistration, PoolTournament, TournamentBracket } from "@/lib/pool-tournaments/types";

const { command } = vi.hoisted(() => ({ command: vi.fn() }));
vi.mock("@/lib/pool-tournaments/redis", () => ({ isPoolDatabaseConfigured: () => true, poolRedisCommand: command }));
import { drawTournamentBracket, getPublicTournament } from "@/lib/pool-tournaments/store";

let tournament: PoolTournament;
let registrations: PoolRegistration[];

beforeEach(() => {
  tournament = getInitialActiveTournament();
  registrations = Array.from({ length: 16 }, (_, i) => ({ id: `reg-${i}`, tournamentId: tournament.id, name: `Player ${i}`, phone: "8175550000", email: "private@example.com", createdAt: "2026-09-01", updatedAt: "2026-09-01", status: "Registered", checkedIn: false }));
  command.mockReset().mockImplementation(async (args: string[]) => {
    const [action, key] = args;
    if (action === "GET" && key.endsWith(":active-tournament")) return tournament.id;
    if (action === "GET" && key.endsWith(`:tournament:${tournament.id}`)) return JSON.stringify(tournament);
    if (action === "HVALS") return registrations.map((entry) => JSON.stringify(entry));
    if (action === "EVAL") return JSON.stringify({ ...tournament, bracket: JSON.parse(args.at(-1)!), registrationStatus: "Closed", status: "Registration Closed" });
    return null;
  });
});

describe("saved tournament draw", () => {
  it("automatically draws only the current full tournament during the requested rollout", async () => {
    const result = await getPublicTournament();
    expect(result?.registrationStatus).toBe("Closed");
    expect(Object.values(result!.bracket!.slots).filter((slot) => slot.name)).toHaveLength(16);
    expect(command.mock.calls.filter(([args]) => args[0] === "EVAL")).toHaveLength(1);
  });

  it("does not automatically draw a future tournament", async () => {
    tournament.id = "future-tournament";
    const result = await getPublicTournament();
    expect(result?.bracket).toBeUndefined();
    expect(command.mock.calls.some(([args]) => args[0] === "EVAL")).toBe(false);
  });
  it("draws every registered player exactly once without contact details or cancelled players", async () => {
    registrations.push({ ...registrations[0], id: "cancelled", name: "Cancelled Player", status: "Cancelled" });
    await drawTournamentBracket(tournament.id);
    const args = command.mock.calls.find(([args]) => args[0] === "EVAL")?.[0];
    const bracket = JSON.parse(args.at(-1)) as TournamentBracket;
    expect(new Set(bracket.players.map((player) => player.registrationId)).size).toBe(16);
    expect(bracket.players.map((player) => player.name).sort()).toEqual(registrations.slice(0, 16).map((player) => player.name).sort());
    expect(bracket.results).toEqual({});
    expect(JSON.stringify(bracket)).not.toMatch(/phone|email|private@example|Cancelled Player/);
  });

  it("refuses an incomplete field", async () => {
    registrations.pop();
    await expect(drawTournamentBracket(tournament.id)).rejects.toThrow("exactly 16");
    expect(command.mock.calls.some(([args]) => args[0] === "EVAL")).toBe(false);
  });

  it("returns an existing draw unchanged and never attempts another shuffle write", async () => {
    tournament.bracket = { drawnAt: "2026-09-13", players: registrations.map(({ id, name }) => ({ registrationId: id, name })), results: {} };
    const result = await drawTournamentBracket(tournament.id);
    expect(result.bracket).toEqual(tournament.bracket);
    expect(command.mock.calls.some(([args]) => args[0] === "EVAL")).toBe(false);
  });

  it("keeps registration IDs and contact information out of the public tournament", async () => {
    tournament.bracket = { drawnAt: "2026-09-13", players: registrations.map(({ id, name }) => ({ registrationId: id, name })), results: {} };
    const result = await getPublicTournament();
    expect(result?.bracket?.slots["seed-1"].name).toBe("Player 0");
    expect(JSON.stringify(result)).not.toMatch(/registrationId|reg-0|phone|email|private@example/);
    expect(result?.availableSpots).toBe(0);
  });
});
