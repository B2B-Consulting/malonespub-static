import { NextResponse } from "next/server";
import { hasValidMutationOrigin, isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";
import { createTournament, listRegistrations, listTournaments } from "@/lib/pool-tournaments/store";
import { validateTournamentInput } from "@/lib/pool-tournaments/validation";

const unauthorized = () => NextResponse.json({ error: "Unauthorized." }, { status: 401 });

export async function GET() {
  if (!(await isPoolAdminAuthenticated())) return unauthorized();
  const tournaments = await listTournaments();
  const registrationCounts = Object.fromEntries(await Promise.all(tournaments.map(async ({ id }) => [id, (await listRegistrations(id)).filter((entry) => entry.status === "Registered").length])));
  return NextResponse.json({ tournaments, registrationCounts }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await isPoolAdminAuthenticated())) return unauthorized();
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid tournament details." }, { status: 400 }); }
  const validated = validateTournamentInput(body);
  if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 });
  try { return NextResponse.json({ tournament: await createTournament(validated.value) }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Unable to create tournament." }, { status: 503 }); }
}
