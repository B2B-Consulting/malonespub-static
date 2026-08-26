import { NextResponse } from "next/server";
import { hasValidMutationOrigin } from "@/lib/pool-tournaments/auth";
import { getPublicTournament, registerForActiveTournament, requestIdentity } from "@/lib/pool-tournaments/store";
import { validateRegistrationInput } from "@/lib/pool-tournaments/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Unable to submit registration." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = (await request.json()) as Record<string, unknown>; }
  catch { return NextResponse.json({ error: "Unable to submit registration." }, { status: 400 }); }
  if (String(body.website ?? "").trim()) return NextResponse.json({ ok: true, message: "Registration received." });
  const validated = validateRegistrationInput(body);
  if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 });
  try {
    const result = await registerForActiveTournament(validated.value, requestIdentity(request));
    if (result === "DUPLICATE") return NextResponse.json({ error: "It looks like you may already be registered. Contact Malone's Pub if you need to update your information." }, { status: 409 });
    if (result === "FULL") return NextResponse.json({ error: "Registration is currently full. Check with Malone's Pub to see whether a spot has opened." }, { status: 409 });
    if (result === "CLOSED") return NextResponse.json({ error: "Registration is currently closed." }, { status: 409 });
    if (result === "RATE") return NextResponse.json({ error: "Please wait before trying again." }, { status: 429 });
    if (result === "UNAVAILABLE") return NextResponse.json({ error: "Registration is temporarily unavailable. Please contact Malone's Pub." }, { status: 503 });
    const tournament = await getPublicTournament();
    return NextResponse.json({
      ok: true,
      tournament: tournament ? { name: tournament.name, date: tournament.date, startTime: tournament.startTime } : null,
      message: "You're registered for the Malone's Pool Tournament. We'll contact you at the phone number or email address you provided if there are any tournament updates.",
    });
  } catch {
    return NextResponse.json({ error: "Registration is temporarily unavailable. Please try again later." }, { status: 503 });
  }
}
