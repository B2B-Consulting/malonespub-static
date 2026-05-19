import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PoolTournamentForms from "@/components/PoolTournamentForms";
import tournament from "@/content/pool-tournament.json";
import site from "@/content/site.json";

const pageUrl = "https://malonespub.com/pool-tournament";

export const metadata: Metadata = {
  title: "Pool Tournament",
  description:
    "Sign up for Malone's Weekly Pool Challenge in Downtown Fort Worth. Weekly 8-ball matchups, Best of 3 games, handicap tiers, scoring, and monthly finals.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Malone's Weekly Pool Challenge | Fort Worth Pool Tournament",
    description:
      "Read the official rules and sign up for Malone's Weekly Pool Challenge, a weekly 8-ball tournament in Downtown Fort Worth.",
    url: pageUrl,
    siteName: "Malone's Pub",
    type: "website",
    images: [
      {
        url: "/photos/bar-pool-table.webp",
        width: 1200,
        height: 630,
        alt: "Pool table at Malone's Pub near Sundance Square",
      },
    ],
  },
};

export default function PoolTournamentPage() {
  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden border-b border-white/10">
        <Image
          src="/photos/bar-pool-table.webp"
          alt="Pool table at Malone's Pub near Sundance Square"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />

        <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            Downtown Fort Worth Pool Tournament
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            {tournament.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200">
            {tournament.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#signup"
              className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400"
            >
              Sign Up
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
            >
              Hours & Directions
            </Link>
          </div>

          <p className="mt-5 text-sm text-neutral-300">
            {site.address} - Free street parking
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3">
        {tournament.details.map((detail) => (
          <div
            key={detail}
            className="rounded-lg border border-white/10 bg-neutral-900/70 p-5 text-neutral-200"
          >
            {detail}
          </div>
        ))}
      </section>

      <section id="rules" className="border-y border-white/10 bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            Official Rules
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Malone&apos;s Weekly Pool Challenge
          </h2>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {tournament.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-lg border border-white/10 bg-black/35 p-5"
              >
                <h3 className="text-xl font-black text-white">
                  {section.title}
                </h3>
                {"intro" in section && section.intro ? (
                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    {section.intro}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-300">
                  {section.rules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-300" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <PoolTournamentForms
          submitEmail={tournament.submitEmail}
          signupSubject={tournament.signupSubject}
        />
      </section>
    </>
  );
}
