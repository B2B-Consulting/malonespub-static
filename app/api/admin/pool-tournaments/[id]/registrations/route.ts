import { NextResponse } from "next/server";
import { hasValidMutationOrigin, isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";
import { addRegistrationByAdmin, listRegistrations } from "@/lib/pool-tournaments/store";
import { validateRegistrationInput } from "@/lib/pool-tournaments/validation";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return NextResponse.json({ registrations: await listRegistrations((await params).id) }, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}

export async function POST(request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid player details." }, { status: 400 }); }
  const validated = validateRegistrationInput(body);
  if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 });
  try { return NextResponse.json({ registration: await addRegistrationByAdmin((await params).id, validated.value) }, { status: 201 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to add player." }, { status: 409 }); }
}
