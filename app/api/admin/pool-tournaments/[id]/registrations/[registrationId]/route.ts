import { NextResponse } from "next/server";
import { hasValidMutationOrigin, isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";
import { deleteRegistration, updateRegistration } from "@/lib/pool-tournaments/store";
import { validateRegistrationInput } from "@/lib/pool-tournaments/validation";

type Context = { params: Promise<{ id: string; registrationId: string }> };

export async function PUT(request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = (await request.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: "Invalid player details." }, { status: 400 }); }
  const validated = validateRegistrationInput(body);
  if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 });
  const { id, registrationId } = await params;
  try {
    const registration = await updateRegistration(id, registrationId, { ...validated.value, status: body.status === "Cancelled" ? "Cancelled" : "Registered", checkedIn: Boolean(body.checkedIn) });
    return registration ? NextResponse.json({ registration }) : NextResponse.json({ error: "Player not found." }, { status: 404 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update player." }, { status: 409 }); }
}

export async function DELETE(request: Request, { params }: Context) {
  if (!(await isPoolAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const { id, registrationId } = await params;
  return (await deleteRegistration(id, registrationId)) ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Player not found." }, { status: 404 });
}
