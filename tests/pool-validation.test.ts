import { describe, expect, it } from "vitest";
import { formatPhone, normalizeEmail, normalizePhone, validateRegistrationInput, validateTournamentInput } from "@/lib/pool-tournaments/validation";

describe("pool registration validation", () => {
  it("accepts and normalizes a valid registration", () => {
    expect(validateRegistrationInput({ name: "  Jordan Smith ", phone: "+1 (817) 555-1212", email: "Jordan@Example.COM" })).toEqual({ ok: true, value: { name: "Jordan Smith", phone: "8175551212", email: "jordan@example.com" } });
  });
  it.each([
    [{ name: "", phone: "8175551212", email: "j@example.com" }, "full name"],
    [{ name: "Jordan Smith", phone: "111", email: "j@example.com" }, "10-digit"],
    [{ name: "Jordan Smith", phone: "8175551212", email: "not-an-email" }, "email"],
  ])("rejects invalid player details", (input, message) => {
    const result = validateRegistrationInput(input);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain(message);
  });
  it("produces the same duplicate keys for phone formatting and email capitalization", () => {
    expect(normalizePhone("+1 817-555-1212")).toBe(normalizePhone("(817) 555-1212"));
    expect(normalizeEmail("Player@Example.com")).toBe(normalizeEmail("player@example.COM"));
    expect(formatPhone("8175551212")).toBe("(817) 555-1212");
  });
  it("validates editable tournament limits and statuses", () => {
    expect(validateTournamentInput({ name: "Fall Pool", slug: "fall-pool", maxPlayers: 16, status: "Registration Open", registrationStatus: "Open", rules: "Rule one\nRule two", isPublic: true }).ok).toBe(true);
    expect(validateTournamentInput({ name: "Fall Pool", maxPlayers: 1, status: "Draft" }).ok).toBe(false);
  });
});
