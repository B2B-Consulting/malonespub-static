"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    try {
      const response = await fetch("/api/admin/pool-tournaments/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Unable to sign in.");
      router.replace("/admin/pool-tournaments"); router.refresh();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to sign in."); setLoading(false); }
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-md rounded-xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">Protected area</p><h1 className="mt-2 text-3xl font-black">Tournament admin</h1>
      {!configured ? <p className="mt-5 rounded-lg border border-amber-300/30 bg-amber-950/30 p-4 text-sm text-amber-100">Set POOL_ADMIN_PASSWORD and a POOL_ADMIN_SESSION_SECRET of at least 32 characters before signing in.</p> : null}
      <label className="mt-6 block text-sm font-bold">Administrator password<input name="password" type="password" autoComplete="current-password" required disabled={!configured} className="mt-2 w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3 text-white outline-none focus:border-green-300" /></label>
      {error ? <p role="alert" className="mt-4 text-sm font-bold text-red-300">{error}</p> : null}
      <button disabled={!configured || loading} className="mt-5 w-full rounded-lg bg-green-500 px-5 py-3 font-black text-neutral-950 disabled:bg-neutral-700 disabled:text-neutral-400">{loading ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
