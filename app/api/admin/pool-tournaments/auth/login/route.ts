import { NextResponse } from "next/server";
import { adminCookieOptions, createAdminSessionToken, hasValidMutationOrigin, isPoolAdminConfigured, POOL_ADMIN_COOKIE, verifyAdminPassword } from "@/lib/pool-tournaments/auth";
import { allowAdminLoginAttempt, requestIdentity } from "@/lib/pool-tournaments/store";

export async function POST(request: Request) {
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Unable to sign in." }, { status: 403 });
  if (!isPoolAdminConfigured()) return NextResponse.json({ error: "Administrator authentication is not configured." }, { status: 503 });
  if (!(await allowAdminLoginAttempt(requestIdentity(request)))) return NextResponse.json({ error: "Too many sign-in attempts. Please try again later." }, { status: 429 });
  let body: { password?: string };
  try { body = (await request.json()) as { password?: string }; }
  catch { return NextResponse.json({ error: "Unable to sign in." }, { status: 400 }); }
  if (!verifyAdminPassword(String(body.password ?? ""))) return NextResponse.json({ error: "Invalid administrator password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(POOL_ADMIN_COOKIE, createAdminSessionToken(), adminCookieOptions());
  return response;
}
