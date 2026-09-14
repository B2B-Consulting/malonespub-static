import { NextResponse } from "next/server";
import { hasValidMutationOrigin } from "@/lib/pool-tournaments/auth";
import { BRACKET_MATCHES, publicBracket } from "@/lib/pool-tournaments/bracket";
import { allowPublicScoreAttempt, getPublicTournament, requestIdentity, saveTournamentMatch } from "@/lib/pool-tournaments/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET() {
  try {
    const tournament = await getPublicTournament();
    if (!tournament?.bracket) return NextResponse.json({ error: "No active tournament bracket." }, { status: 404, headers: privateHeaders });
    return NextResponse.json({ bracket: tournament.bracket }, { headers: privateHeaders });
  } catch {
    return NextResponse.json({ error: "Unable to load tournament scores." }, { status: 503, headers: privateHeaders });
  }
}

export async function POST(request: Request) {
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403, headers: privateHeaders });
  if (!(await allowPublicScoreAttempt(requestIdentity(request)))) return NextResponse.json({ error: "Too many score attempts. Please wait a few minutes and try again." }, { status: 429, headers: privateHeaders });

  let body: Record<string, unknown>;
  try { body = (await request.json()) as Record<string, unknown>; }
  catch { return NextResponse.json({ error: "Enter a valid match score." }, { status: 400, headers: privateHeaders }); }

  try {
    const tournament = await getPublicTournament();
    if (!tournament?.bracket || tournament.bracket.champion) return NextResponse.json({ error: "Score entry is closed." }, { status: 409, headers: privateHeaders });
    const match = BRACKET_MATCHES.find((item) => item.id === body.matchId);
    if (match?.slotIds.some((slotId) => tournament.bracket?.slots[slotId]?.score)) {
      return NextResponse.json({ error: "This score has already been recorded. Ask the tournament organizer to make a correction." }, { status: 409, headers: privateHeaders });
    }
    const updated = await saveTournamentMatch(
      tournament.id,
      typeof body.matchId === "string" ? body.matchId : "",
      body.a,
      body.b,
      typeof body.drawnAt === "string" ? body.drawnAt : "",
    );
    if (!updated.bracket) throw new Error("No active tournament bracket.");
    return NextResponse.json({ bracket: publicBracket(updated.bracket) }, { headers: privateHeaders });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save score." }, { status: 409, headers: privateHeaders });
  }
}
