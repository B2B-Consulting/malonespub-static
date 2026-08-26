import { beforeEach, describe, expect, it, vi } from "vitest";

const { register } = vi.hoisted(() => ({ register: vi.fn() }));
vi.mock("@/lib/pool-tournaments/auth", () => ({ hasValidMutationOrigin: () => true }));
vi.mock("@/lib/pool-tournaments/store", () => ({
  registerForActiveTournament: register,
  requestIdentity: () => "anonymous-hash",
  getPublicTournament: async () => ({ name: "Malone's Pool Tournament", date: "2026-09-12", startTime: "19:00" }),
}));

import { POST } from "@/app/api/pool-tournament/register/route";

function request(body: Record<string, unknown>) {
  return new Request("https://malonespub.com/api/pool-tournament/register", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://malonespub.com" }, body: JSON.stringify(body) });
}

describe("public registration endpoint", () => {
  beforeEach(() => register.mockReset().mockResolvedValue("OK"));
  it("registers a valid player without returning contact information or an ID", async () => {
    const response = await POST(request({ name: "Jordan Smith", phone: "8175551212", email: "jordan@example.com", website: "" }));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toContain("You're registered");
    expect(JSON.stringify(body)).not.toContain("jordan@example.com");
    expect(body.id).toBeUndefined();
  });
  it.each([
    ["DUPLICATE", 409, "already be registered"],
    ["FULL", 409, "currently full"],
    ["CLOSED", 409, "currently closed"],
    ["RATE", 429, "wait"],
  ])("maps %s admission decisions to a safe public response", async (decision, status, message) => {
    register.mockResolvedValue(decision);
    const response = await POST(request({ name: "Jordan Smith", phone: "8175551212", email: "jordan@example.com", website: "" }));
    expect(response.status).toBe(status);
    expect((await response.json()).error).toContain(message);
  });
  it("rejects invalid input before touching storage", async () => {
    const response = await POST(request({ name: "", phone: "bad", email: "bad", website: "" }));
    expect(response.status).toBe(400);
    expect(register).not.toHaveBeenCalled();
  });
  it("quietly absorbs honeypot submissions", async () => {
    const response = await POST(request({ website: "spam.example" }));
    expect(response.status).toBe(200);
    expect(register).not.toHaveBeenCalled();
  });
});
