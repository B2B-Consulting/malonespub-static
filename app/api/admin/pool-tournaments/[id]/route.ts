import { NextResponse } from "next/server";
import { hasValidMutationOrigin, isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";
import { getTournament, listRegistrations, setActiveTournament, updateTournament } from "@/lib/pool-tournaments/store";
import { validateTournamentInput } from "@/lib/pool-tournaments/validation";

type Context = { params: Promise<{ id: string }> };
const unauthorized = () => NextResponse.json({ error: "Unauthorized." }, { status: 401 });

export async function GET(_request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return unauthorized();
  const { id } = await params;
  const tournament = await getTournament(id);
  if (!tournament) return NextResponse.json({ error: "Tournament not found." }, { status: 404 });
  return NextResponse.json({ tournament, registrations: await listRegistrations(id) }, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}

export async function PUT(request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return unauthorized();
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const { id } = await params;
  let body: Record<string, unknown>;
  try { body = (await request.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: "Invalid tournament details." }, { status: 400 }); }
  try {
    if (body.action === "activate") {
      const tournament = await setActiveTournament(id);
      return tournament ? NextResponse.json({ tournament }) : NextResponse.json({ error: "Tournament cannot be activated." }, { status: 400 });
    }
    const validated = validateTournamentInput(body);
    if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 });
    const tournament = await updateTournament(id, validated.value);
    return tournament ? NextResponse.json({ tournament }) : NextResponse.json({ error: "Tournament not found." }, { status: 404 });
  } catch { return NextResponse.json({ error: "Unable to update tournament." }, { status: 503 }); }
}
