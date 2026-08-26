"use client";

import { useState, type FormEvent } from "react";

type Props = { acceptingRegistrations: boolean; dateLabel: string; startTimeLabel: string };

function displayPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function RegistrationForm({ acceptingRegistrations, dateLabel, startTimeLabel }: Props) {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<{ status: "idle" | "submitting" | "success" | "error"; message?: string }>({ status: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState({ status: "submitting" });
    const data = new FormData(form);
    try {
      const response = await fetch("/api/pool-tournament/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), email: data.get("email"), website: data.get("website") }),
      });
      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "Unable to register right now.");
      form.reset(); setPhone(""); setState({ status: "success", message: result.message });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Unable to register right now." });
    }
  }

  if (!acceptingRegistrations) return <div className="rounded-xl border border-amber-300/30 bg-amber-950/30 p-5" role="status"><h2 className="text-xl font-black text-amber-200">Registration is currently closed</h2><p className="mt-2 text-sm leading-6 text-amber-100/80">Check with Malone&apos;s Pub to see whether a spot has opened.</p></div>;
  if (state.status === "success") return <div className="rounded-xl border border-green-300/30 bg-green-950/35 p-6" role="status"><p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">Registration confirmed</p><h2 className="mt-2 text-2xl font-black text-white">You&apos;re on the list.</h2><p className="mt-3 leading-7 text-neutral-200">{state.message}</p><p className="mt-4 rounded-lg bg-black/30 p-3 text-sm font-bold text-white">{dateLabel} · Starts {startTimeLabel}</p></div>;

  return (
    <form onSubmit={submit} className="rounded-xl border border-white/10 bg-neutral-900 p-5 shadow-2xl shadow-black/30 sm:p-7">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">Player registration</p><h2 className="mt-2 text-2xl font-black text-white">Save your spot</h2>
      <div className="mt-6 space-y-4">
        <label className="block text-sm font-bold text-neutral-200">Full name<input name="name" autoComplete="name" required minLength={2} maxLength={100} className="mt-2 w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3 text-base text-white outline-none focus:border-green-300" /></label>
        <label className="block text-sm font-bold text-neutral-200">Cell phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required value={phone} onChange={(event) => setPhone(displayPhone(event.target.value))} pattern="\(?[2-9][0-9]{2}\)?[ -]?[2-9][0-9]{2}-?[0-9]{4}" placeholder="(817) 555-0123" className="mt-2 w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3 text-base text-white outline-none focus:border-green-300" /></label>
        <label className="block text-sm font-bold text-neutral-200">Email address<input name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder="you@example.com" className="mt-2 w-full rounded-lg border border-white/15 bg-black/45 px-4 py-3 text-base text-white outline-none focus:border-green-300" /></label>
        <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state.status === "error" ? <p className="mt-4 rounded-lg border border-red-300/30 bg-red-950/40 px-4 py-3 text-sm font-bold text-red-200" role="alert">{state.message}</p> : null}
      <button type="submit" disabled={state.status === "submitting"} className="mt-5 w-full rounded-lg bg-green-500 px-5 py-3.5 text-base font-black text-neutral-950 transition hover:bg-green-400 disabled:cursor-wait disabled:bg-neutral-600">{state.status === "submitting" ? "Registering…" : "Register for the tournament"}</button>
      <p className="mt-4 text-xs leading-5 text-neutral-400">By registering, you agree that Malone&apos;s Pub may contact you regarding this pool tournament. Your information will not be displayed publicly or added to a general marketing list.</p>
    </form>
  );
}
