import { NextResponse } from "next/server";
import { hasValidMutationOrigin, POOL_ADMIN_COOKIE } from "@/lib/pool-tournaments/auth";

export async function POST(request: Request) {
  if (!hasValidMutationOrigin(request)) return NextResponse.json({ error: "Unable to sign out." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(POOL_ADMIN_COOKIE, "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
