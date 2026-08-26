import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pool-tournaments/auth", () => ({
  isPoolAdminAuthenticated: vi.fn(async () => false),
  hasValidMutationOrigin: () => true,
}));
vi.mock("@/lib/pool-tournaments/store", () => ({
  listTournaments: vi.fn(),
  listRegistrations: vi.fn(),
  createTournament: vi.fn(),
}));

import { GET } from "@/app/api/admin/pool-tournaments/route";

describe("administrator API authentication", () => {
  it("denies private tournament data while logged out", async () => {
    const response = await GET();
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "Unauthorized." });
  });
});
