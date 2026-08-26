import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "@/components/pool-tournaments/RegistrationForm";
import site from "@/content/site.json";
import { getPublicTournament } from "@/lib/pool-tournaments/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pool Tournament Registration",
  description: "View the active Malone's Pub pool tournament and register online from your phone.",
  alternates: { canonical: "https://malonespub.com/pool-tournament" },
  openGraph: {
    title: "Malone's Pool Tournament | Register Online",
    description: "Tournament details and player registration for Malone's Pub in Downtown Fort Worth.",
    url: "https://malonespub.com/pool-tournament", siteName: "Malone's Pub", type: "website",
    images: [{ url: "/photos/malones-pub-pool-table-fort-worth.webp", width: 1200, height: 630, alt: "Pool table at Malone's Pub" }],
  },
};

function dateLabel(value: string) {
  if (!value) return "Date to be announced";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date);
}

function timeLabel(value: string) {
  if (!value) return "to be announced";
  const [hour, minute] = value.split(":").map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return value;
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(2020, 0, 1, hour, minute));
}

export default async function PoolTournamentPage() {
  const tournament = await getPublicTournament();
  if (!tournament) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">Malone&apos;s Pub Pool</p>
        <h1 className="mt-4 text-4xl font-black">The next tournament is coming soon.</h1>
        <p className="mt-5 text-neutral-300">Check back here or ask the bartender for the next tournament date.</p>
        <Link href="/contact" className="mt-8 inline-block rounded-lg bg-green-500 px-5 py-3 font-black text-neutral-950">Hours &amp; directions</Link>
      </section>
    );
  }
  const date = dateLabel(tournament.date);
  const start = timeLabel(tournament.startTime);
  const checkIn = timeLabel(tournament.checkInTime);
  const accepting = tournament.registrationStatus === "Open" && tournament.availableSpots > 0;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <Image src="/photos/malones-pub-pool-table-fort-worth.webp" alt="Pool table at Malone's Pub" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto grid min-h-[500px] max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">Downtown Fort Worth · 8-ball</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{tournament.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-200">Register from your phone, then arrive by check-in time ready to play.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#register" className="rounded-lg bg-green-500 px-5 py-3 font-black text-neutral-950">Register now</a>
              <a href={site.googleMapsUrl} className="rounded-lg border border-white/30 bg-black/50 px-5 py-3 font-bold text-white">Get directions</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/15 bg-black/65 p-4 backdrop-blur sm:p-6">
            {[["Date", date], ["Check-in", checkIn], ["Start time", start], ["Entry fee", tournament.entryFee || "To be announced"], ["Player limit", `${tournament.maxPlayers} players`], ["Available", `${tournament.availableSpots} ${tournament.availableSpots === 1 ? "spot" : "spots"}`]].map(([label, value]) => <div key={label} className="rounded-lg bg-white/5 p-3"><p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{label}</p><p className="mt-1 font-black text-white">{value}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">Tournament details</p><h2 className="mt-2 text-3xl font-black">How the tournament works</h2><p className="mt-4 text-lg leading-8 text-neutral-300">{tournament.format}</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-neutral-900 p-5"><h3 className="font-black text-white">Prize information</h3><p className="mt-2 leading-7 text-neutral-300">{tournament.prizeInformation || "Ask the tournament organizer for prize details."}</p></div>
            <div className="rounded-xl border border-white/10 bg-neutral-900 p-5"><h3 className="font-black text-white">Location</h3><p className="mt-2 leading-7 text-neutral-300">Malone&apos;s Pub<br />{site.address}</p></div>
          </div>
          <details className="rounded-xl border border-white/10 bg-neutral-900 p-5">
            <summary className="cursor-pointer text-xl font-black text-white">Official tournament rules</summary>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-300">{tournament.rules.map((rule, index) => <li key={`${index}-${rule}`} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-300" /><span>{rule}</span></li>)}</ul>
          </details>
        </div>
        <div id="register" className="scroll-mt-24"><RegistrationForm acceptingRegistrations={accepting} dateLabel={date} startTimeLabel={start} /></div>
      </section>
    </>
  );
}
