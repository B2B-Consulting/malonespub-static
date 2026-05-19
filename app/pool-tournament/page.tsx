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
    "Sign up for the Malone's Pub pool tournament in Downtown Fort Worth, read the rules, and report match results after tournament games.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Pool Tournament at Malone's Pub Fort Worth",
    description:
      "Read the rules, sign up, and report match results for the Malone's Pub pool tournament in Downtown Fort Worth.",
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
            Rules
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Tournament Rules
          </h2>

          <ol className="mt-7 grid gap-3 md:grid-cols-2">
            {tournament.rules.map((rule, index) => (
              <li
                key={rule}
                className="rounded-lg border border-white/10 bg-black/35 p-5 text-neutral-200"
              >
                <span className="mr-2 font-black text-green-300">
                  {index + 1}.
                </span>
                {rule}
              </li>
            ))}
          </ol>
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
