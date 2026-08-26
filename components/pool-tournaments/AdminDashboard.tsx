"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminLegacyBracket from "@/components/pool-tournaments/AdminLegacyBracket";
import { TOURNAMENT_STATUSES, type PoolRegistration, type PoolTournament } from "@/lib/pool-tournaments/types";

type Props = { initialTournaments: PoolTournament[]; initialRegistrations: Record<string, PoolRegistration[]> };
const field = "mt-2 w-full rounded-lg border border-white/15 bg-black/45 px-3 py-2.5 text-sm text-white outline-none focus:border-green-300";
const label = "block text-xs font-bold uppercase tracking-wider text-neutral-400";

async function jsonRequest(url: string, init?: RequestInit) {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const body = (await response.json()) as Record<string, unknown>;
  if (!response.ok) throw new Error(String(body.error || "Request failed."));
  return body;
}

function tournamentPayload(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    name: data.get("name"), slug: data.get("slug"), date: data.get("date"), startTime: data.get("startTime"), checkInTime: data.get("checkInTime"), entryFee: data.get("entryFee"),
    maxPlayers: Number(data.get("maxPlayers")), format: data.get("format"), prizeInformation: data.get("prizeInformation"), rules: data.get("rules"), status: data.get("status"), registrationStatus: data.get("registrationStatus"), isPublic: data.get("isPublic") === "on",
  };
}

export default function AdminDashboard({ initialTournaments, initialRegistrations }: Props) {
  const router = useRouter();
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [message, setMessage] = useState("");

  function replaceTournament(next: PoolTournament) { setTournaments((current) => current.map((item) => item.id === next.id ? next : { ...item, isActivePublic: next.isActivePublic ? false : item.isActivePublic })); }
  async function saveTournament(event: FormEvent<HTMLFormElement>, id?: string) {
    event.preventDefault(); setMessage(""); const form = event.currentTarget;
    try {
      const body = await jsonRequest(id ? `/api/admin/pool-tournaments/${id}` : "/api/admin/pool-tournaments", { method: id ? "PUT" : "POST", body: JSON.stringify(tournamentPayload(form)) });
      const tournament = body.tournament as PoolTournament;
      if (id) replaceTournament(tournament); else { setTournaments((current) => [tournament, ...current]); setRegistrations((current) => ({ ...current, [tournament.id]: [] })); form.reset(); }
      setMessage(id ? "Tournament updated." : "Tournament created.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save tournament."); }
  }
  async function activate(id: string) {
    try { const body = await jsonRequest(`/api/admin/pool-tournaments/${id}`, { method: "PUT", body: JSON.stringify({ action: "activate" }) }); replaceTournament(body.tournament as PoolTournament); setMessage("Active public tournament updated."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to activate tournament."); }
  }
  async function addPlayer(event: FormEvent<HTMLFormElement>, tournamentId: string) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    try { const body = await jsonRequest(`/api/admin/pool-tournaments/${tournamentId}/registrations`, { method: "POST", body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), email: data.get("email") }) }); setRegistrations((current) => ({ ...current, [tournamentId]: [...(current[tournamentId] ?? []), body.registration as PoolRegistration] })); form.reset(); setMessage("Player added."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to add player."); }
  }
  async function savePlayer(tournamentId: string, registration: PoolRegistration) {
    try { const body = await jsonRequest(`/api/admin/pool-tournaments/${tournamentId}/registrations/${registration.id}`, { method: "PUT", body: JSON.stringify(registration) }); setRegistrations((current) => ({ ...current, [tournamentId]: current[tournamentId].map((entry) => entry.id === registration.id ? body.registration as PoolRegistration : entry) })); setMessage("Player updated."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to update player."); }
  }
  async function removePlayer(tournamentId: string, registrationId: string) {
    if (!window.confirm("Permanently remove this registration?")) return;
    try { await jsonRequest(`/api/admin/pool-tournaments/${tournamentId}/registrations/${registrationId}`, { method: "DELETE" }); setRegistrations((current) => ({ ...current, [tournamentId]: current[tournamentId].filter((entry) => entry.id !== registrationId) })); setMessage("Registration removed."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to remove player."); }
  }
  async function logout() { await jsonRequest("/api/admin/pool-tournaments/auth/logout", { method: "POST", body: "{}" }); router.replace("/admin/pool-tournaments/login"); router.refresh(); }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">Private administration</p><h1 className="mt-2 text-4xl font-black">Pool tournaments</h1></div><button onClick={logout} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold">Sign out</button></div>
      {message ? <p role="status" className="mt-6 rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm font-bold">{message}</p> : null}

      <details className="mt-8 rounded-xl border border-green-300/20 bg-green-950/15 p-5">
        <summary className="cursor-pointer text-xl font-black text-green-200">Create a new tournament</summary>
        <form onSubmit={(event) => saveTournament(event)} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className={label}>Name<input name="name" required className={field} /></label><label className={label}>Slug<input name="slug" placeholder="auto-generated from name" className={field} /></label><label className={label}>Date<input name="date" type="date" className={field} /></label><label className={label}>Start time<input name="startTime" type="time" className={field} /></label>
          <label className={label}>Check-in time<input name="checkInTime" type="time" className={field} /></label><label className={label}>Entry fee<input name="entryFee" className={field} /></label><label className={label}>Player limit<input name="maxPlayers" type="number" min="2" max="512" defaultValue="16" required className={field} /></label><label className={label}>Status<select name="status" defaultValue="Draft" className={field}>{TOURNAMENT_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label className={label}>Registration<select name="registrationStatus" defaultValue="Closed" className={field}><option>Open</option><option>Closed</option></select></label><label className={`${label} flex items-center gap-2 self-end py-3`}><input name="isPublic" type="checkbox" /> Public tournament</label>
          <label className={`${label} md:col-span-2`}>Format<textarea name="format" rows={3} className={field} /></label><label className={`${label} md:col-span-2`}>Prize information<textarea name="prizeInformation" rows={3} className={field} /></label><label className={`${label} md:col-span-2 xl:col-span-4`}>Rules (one per line)<textarea name="rules" rows={6} className={field} /></label>
          <button className="rounded-lg bg-green-500 px-5 py-3 font-black text-neutral-950">Create tournament</button>
        </form>
      </details>

      <div className="mt-8 space-y-8">
        {tournaments.map((tournament) => {
          const entries = registrations[tournament.id] ?? [];
          return (
            <article key={tournament.id} className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{tournament.status}</span>{tournament.isActivePublic ? <span className="rounded-full bg-green-400 px-3 py-1 text-xs font-black text-neutral-950">Active public tournament</span> : null}{!tournament.isPublic ? <span className="rounded-full bg-violet-950 px-3 py-1 text-xs font-bold text-violet-200">Private</span> : null}</div><h2 className="mt-3 text-2xl font-black">{tournament.name}</h2><p className="mt-1 text-sm text-neutral-400">{entries.filter((entry) => entry.status === "Registered").length} / {tournament.maxPlayers} registered</p></div><div className="flex flex-wrap gap-2">{tournament.status !== "Archived" && !tournament.isActivePublic ? <button onClick={() => activate(tournament.id)} className="rounded-lg bg-green-500 px-4 py-2 text-sm font-black text-neutral-950">Make active</button> : null}<a href={`/api/admin/pool-tournaments/${tournament.id}/export`} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold">Export CSV</a></div></div>

              <details className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4"><summary className="cursor-pointer font-black">Edit tournament details</summary>
                <form onSubmit={(event) => saveTournament(event, tournament.id)} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <label className={label}>Name<input name="name" defaultValue={tournament.name} required className={field} /></label><label className={label}>Slug<input name="slug" defaultValue={tournament.slug} className={field} /></label><label className={label}>Date<input name="date" type="date" defaultValue={tournament.date} className={field} /></label><label className={label}>Start time<input name="startTime" type="time" defaultValue={tournament.startTime} className={field} /></label>
                  <label className={label}>Check-in<input name="checkInTime" type="time" defaultValue={tournament.checkInTime} className={field} /></label><label className={label}>Entry fee<input name="entryFee" defaultValue={tournament.entryFee} className={field} /></label><label className={label}>Player limit<input name="maxPlayers" type="number" min="2" max="512" defaultValue={tournament.maxPlayers} className={field} /></label><label className={label}>Status<select name="status" defaultValue={tournament.status} className={field}>{TOURNAMENT_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
                  <label className={label}>Registration<select name="registrationStatus" defaultValue={tournament.registrationStatus} className={field}><option>Open</option><option>Closed</option></select></label><label className={`${label} flex items-center gap-2 self-end py-3`}><input name="isPublic" type="checkbox" defaultChecked={tournament.isPublic} /> Public tournament</label>
                  <label className={`${label} md:col-span-2`}>Format<textarea name="format" defaultValue={tournament.format} rows={3} className={field} /></label><label className={`${label} md:col-span-2`}>Prize information<textarea name="prizeInformation" defaultValue={tournament.prizeInformation} rows={3} className={field} /></label><label className={`${label} md:col-span-2 xl:col-span-4`}>Rules<textarea name="rules" defaultValue={tournament.rules.join("\n")} rows={8} className={field} /></label>
                  <button className="rounded-lg bg-white px-5 py-3 font-black text-neutral-950">Save changes</button>
                </form>
              </details>

              {tournament.isActivePublic ? <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4"><h3 className="font-black">Evergreen flyer QR code</h3><p className="mt-1 text-sm text-neutral-400">Both files encode only https://malonespub.com/pool-tournament.</p><div className="mt-3 flex flex-wrap gap-2"><a href={`/api/admin/pool-tournaments/${tournament.id}/qr/svg`} className="rounded-lg bg-white px-4 py-2 text-sm font-black text-neutral-950">Download print SVG</a><a href={`/api/admin/pool-tournaments/${tournament.id}/qr/png`} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold">Download 1600px PNG</a></div></div> : null}

              <details className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4"><summary className="cursor-pointer font-black">Registrations ({entries.length})</summary>
                <form onSubmit={(event) => addPlayer(event, tournament.id)} className="mt-5 grid gap-3 md:grid-cols-4"><input name="name" required placeholder="Player name" className={field} /><input name="phone" type="tel" required placeholder="Cell phone" className={field} /><input name="email" type="email" required placeholder="Email" className={field} /><button className="self-end rounded-lg bg-green-500 px-4 py-2.5 font-black text-neutral-950">Add player</button></form>
                <div className="mt-5 space-y-3">{entries.length === 0 ? <p className="text-sm text-neutral-400">No registrations yet.</p> : entries.map((entry) => <RegistrationRow key={entry.id} entry={entry} onSave={(next) => savePlayer(tournament.id, next)} onRemove={() => removePlayer(tournament.id, entry.id)} />)}</div>
              </details>
              {tournament.legacyBracket ? <AdminLegacyBracket slots={tournament.legacyBracket} /> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function RegistrationRow({ entry, onSave, onRemove }: { entry: PoolRegistration; onSave: (entry: PoolRegistration) => void; onRemove: () => void }) {
  const [value, setValue] = useState(entry);
  return (
    <div className="grid gap-2 rounded-lg border border-white/10 bg-black/35 p-3 lg:grid-cols-[1fr_1fr_1.3fr_auto_auto_auto] lg:items-center">
      <input aria-label="Player name" value={value.name} onChange={(event) => setValue({ ...value, name: event.target.value })} className={field} /><input aria-label="Cell phone" value={value.phone} onChange={(event) => setValue({ ...value, phone: event.target.value })} className={field} /><input aria-label="Email" type="email" value={value.email} onChange={(event) => setValue({ ...value, email: event.target.value })} className={field} />
      <label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={value.checkedIn} onChange={(event) => setValue({ ...value, checkedIn: event.target.checked })} /> Checked in</label>
      <select aria-label="Registration status" value={value.status} onChange={(event) => setValue({ ...value, status: event.target.value === "Cancelled" ? "Cancelled" : "Registered" })} className={field}><option>Registered</option><option>Cancelled</option></select>
      <div className="flex gap-2"><button type="button" onClick={() => onSave(value)} className="rounded bg-white px-3 py-2 text-xs font-black text-neutral-950">Save</button><button type="button" onClick={onRemove} className="rounded border border-red-300/30 px-3 py-2 text-xs font-bold text-red-200">Remove</button></div>
      <p className="text-xs text-neutral-500 lg:col-span-full">Registered {new Date(entry.createdAt).toLocaleString()}</p>
    </div>
  );
}
