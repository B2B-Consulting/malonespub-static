import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";

type Context = { params: Promise<{ id: string; format: string }> };
const PUBLIC_URL = "https://malonespub.com/pool-tournament";

export async function GET(_request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { format } = await params;
  const options = { errorCorrectionLevel: "H" as const, margin: 4, color: { dark: "#000000", light: "#ffffff" } };
  if (format === "svg") {
    const svg = await QRCode.toString(PUBLIC_URL, { ...options, type: "svg", width: 1600 });
    return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml", "Content-Disposition": 'attachment; filename="malones-pool-tournament-qr.svg"', "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
  }
  if (format === "png") {
    const png = await QRCode.toBuffer(PUBLIC_URL, { ...options, type: "png", width: 1600 });
    return new NextResponse(new Uint8Array(png), { headers: { "Content-Type": "image/png", "Content-Disposition": 'attachment; filename="malones-pool-tournament-qr-1600.png"', "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
  }
  return NextResponse.json({ error: "QR format not found." }, { status: 404 });
}
