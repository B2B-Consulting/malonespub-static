import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const POOL_ADMIN_COOKIE = "malones_pool_admin";
const SESSION_SECONDS = 60 * 60 * 12;

function secret() {
  return process.env.POOL_ADMIN_SESSION_SECRET ?? "";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isPoolAdminConfigured() {
  return Boolean(process.env.POOL_ADMIN_PASSWORD && secret().length >= 32);
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.POOL_ADMIN_PASSWORD;
  return Boolean(expected && safeEqual(password, expected));
}

export function createAdminSessionToken() {
  if (!isPoolAdminConfigured()) throw new Error("Administrator authentication is not configured.");
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_SECONDS * 1000 })).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token || !isPoolAdminConfigured()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  if (!safeEqual(signature, expected)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isPoolAdminAuthenticated() {
  return verifyAdminSessionToken((await cookies()).get(POOL_ADMIN_COOKIE)?.value);
}

export function hasValidMutationOrigin(request: Request) {
  const expectedOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin) return origin === expectedOrigin;
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).origin === expectedOrigin;
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}
