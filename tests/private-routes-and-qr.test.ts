import { describe, expect, it, vi } from "vitest";
import sharp from "sharp";
import jsQR from "jsqr";

vi.mock("@/lib/pool-tournaments/auth", () => ({ isPoolAdminAuthenticated: vi.fn(async () => true) }));
vi.mock("@/lib/pool-tournaments/store", () => ({
  getTournament: async () => ({ slug: "fall-pool" }),
  listRegistrations: async () => [{ name: "Jordan Smith", phone: "8175551212", email: "jordan@example.com", createdAt: "2026-08-26T12:00:00.000Z", status: "Registered", checkedIn: true }],
}));

import { GET as exportCsv } from "@/app/api/admin/pool-tournaments/[id]/export/route";
import { GET as getQr } from "@/app/api/admin/pool-tournaments/[id]/qr/[format]/route";

describe("protected exports and QR assets", () => {
  it("exports the authenticated registration list as CSV", async () => {
    const response = await exportCsv(new Request("https://malonespub.com/api/admin/pool-tournaments/id/export"), { params: Promise.resolve({ id: "id" }) });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(await response.text()).toContain('"jordan@example.com"');
  });
  it("generates a high-resolution square PNG with a quiet zone", async () => {
    const response = await getQr(new Request("https://malonespub.com/api/admin/pool-tournaments/id/qr/png"), { params: Promise.resolve({ id: "id", format: "png" }) });
    const png = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(png).metadata();
    expect(response.headers.get("content-disposition")).toContain("1600");
    expect(metadata.width).toBe(1600);
    expect(metadata.height).toBe(1600);
    const decodedImage = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const decoded = jsQR(new Uint8ClampedArray(decodedImage.data), decodedImage.info.width, decodedImage.info.height);
    expect(decoded?.data).toBe("https://malonespub.com/pool-tournament");
  });
  it("generates a printable SVG", async () => {
    const response = await getQr(new Request("https://malonespub.com/api/admin/pool-tournaments/id/qr/svg"), { params: Promise.resolve({ id: "id", format: "svg" }) });
    expect(response.headers.get("content-type")).toContain("image/svg+xml");
    expect(await response.text()).toContain("<svg");
  });
});
