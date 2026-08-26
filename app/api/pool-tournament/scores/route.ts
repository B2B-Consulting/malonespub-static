import { NextResponse } from "next/server";
import { ensurePoolTournamentData } from "@/lib/pool-tournaments/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function privateResponse() {
  try { await ensurePoolTournamentData(); } catch { /* Do not expose database details. */ }
  return NextResponse.json(
    { error: "Tournament scores are not publicly available." },
    { status: 404, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
  );
}

export const GET = privateResponse;
export const POST = privateResponse;
