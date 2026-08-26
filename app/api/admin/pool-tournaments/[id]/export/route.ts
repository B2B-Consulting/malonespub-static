import { NextResponse } from "next/server";
import { isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";
import { getTournament, listRegistrations } from "@/lib/pool-tournaments/store";

type Context = { params: Promise<{ id: string }> };
const csv = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export async function GET(_request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const tournament = await getTournament(id);
  if (!tournament) return NextResponse.json({ error: "Tournament not found." }, { status: 404 });
  const rows = (await listRegistrations(id)).map((entry) => [entry.name, entry.phone, entry.email, entry.createdAt, entry.status, entry.checkedIn ? "Checked in" : "Not checked in"].map(csv).join(","));
  const content = ["Player name,Cell phone,Email,Registered at,Status,Check-in", ...rows].join("\r\n");
  return new NextResponse(content, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${tournament.slug}-registrations.csv"`, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}
