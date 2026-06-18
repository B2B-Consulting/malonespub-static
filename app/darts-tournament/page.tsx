import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReviewButton from "@/components/ReviewButton";
import SeoFaq from "@/components/SeoFaq";
import tournament from "@/content/darts-tournament.json";
import site from "@/content/site.json";
import { SITE_URL } from "@/lib/business";

const pageUrl = `${SITE_URL}/darts-tournament`;

export const metadata: Metadata = {
  title: "Darts Tournament",
  description:
    "Darts tournament information, house rules, and sign-up details for Malone's Pub in Downtown Fort Worth.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Malone's Darts Tournament | Downtown Fort Worth",
    description:
      "Play darts at Malone's Pub in Downtown Fort Worth. See tournament formats, house rules, and sign-up details.",
    url: pageUrl,
    siteName: "Malone's Pub",
    type: "website",
    images: [
      {
        url: "/photos/malones-pub-darts-downtown-fort-worth.webp",
        width: 1200,
        height: 630,
        alt: "Dart boards at Malone's Pub in Downtown Fort Worth",
      },
    ],
  },
};

const dartsFaqs = [
  {
    question: "Where can I play darts in Downtown Fort Worth?",
    answer:
      "Malone's Pub has darts in Downtown Fort Worth near Sundance Square.",
  },
  {
    question: "Does Malone's Pub host darts tournaments?",
    answer:
      "Malone's has darts tournament information and house rules. Ask the bartender about the next bracket or darts night.",
  },
  {
    question: "Can beginners join darts night at Malone's?",
    answer:
      "Yes. Malone's is a casual neighborhood bar, and new players are welcome when a bracket is being organized.",
  },
  {
    question: "What darts games are used for tournaments?",
    answer:
      "Common formats include 501, Cricket, and luck-of-the-draw doubles depending on turnout.",
  },
];

export default function DartsTournamentPage() {
  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden border-b border-white/10">
        <Image
          src="/photos/malones-pub-darts-downtown-fort-worth.webp"
          alt="Dart boards at Malone's Pub in Downtown Fort Worth"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/68" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />

        <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            Downtown Fort Worth Darts
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            {tournament.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200">
            {tournament.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#rules"
              className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400"
            >
              View Rules
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
            >
              Hours & Directions
            </Link>
            <ReviewButton />
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

      <section className="border-y border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            Common Formats
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Pick-up darts or a full bracket
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {tournament.formats.map((format) => (
              <div
                key={format.title}
                className="rounded-lg border border-white/10 bg-neutral-900 p-5"
              >
                <h3 className="text-xl font-black text-white">{format.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="border-b border-white/10 bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            House Rules
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Malone&apos;s Darts Tournament
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

      <SeoFaq
        faqs={dartsFaqs}
        title="Darts Tournament FAQ"
        pageUrl={pageUrl}
      />
    </>
  );
}
