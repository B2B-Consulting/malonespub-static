import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqSchema from "@/components/FaqSchema";
import site from "@/content/site.json";

const pageUrl = "https://malonespub.com/world-cup";
const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Malone%27s+Pub+1303+Calhoun+St+Fort+Worth+TX+76102";

export const metadata: Metadata = {
  title: "Watch the 2026 World Cup in Fort Worth",
  description:
    "Watch the 2026 World Cup at Malone's Pub in Downtown Fort Worth. Cold beer, Guinness, pool, darts, Golden Tee, pinball, bar food, and a laid-back pub crowd near Sundance Square.",
  keywords: [
    "Watch World Cup Fort Worth",
    "World Cup bar Fort Worth",
    "Soccer bar Fort Worth",
    "Where to watch World Cup in Fort Worth",
    "Watch soccer downtown Fort Worth",
    "World Cup 2026 Fort Worth bar",
    "Watch USA World Cup games Fort Worth",
    "Watch Mexico World Cup games Fort Worth",
    "Watch England World Cup games Fort Worth",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Watch the 2026 World Cup in Fort Worth | Malone's Pub",
    description:
      "Malone's Pub is showing 2026 World Cup games in Downtown Fort Worth with Guinness, cold beer, bar bites, pool, darts, Golden Tee, and pinball.",
    url: pageUrl,
    siteName: "Malone's Pub",
    type: "website",
    images: [
      {
        url: "/photos/inside.webp",
        width: 1200,
        height: 630,
        alt: "Interior of Malone's Pub in Downtown Fort Worth",
      },
    ],
  },
};

const priorityMatches = [
  "USA matches",
  "Mexico matches",
  "England matches",
  "Brazil matches",
  "Argentina matches",
  "Germany matches",
  "Japan matches",
  "Knockout rounds",
  "Semifinals",
  "World Cup Final",
];

const faqs = [
  {
    question: "Where can I watch the World Cup in Fort Worth?",
    answer:
      "Malone's Pub in Downtown Fort Worth will be showing 2026 World Cup games at 1303 Calhoun St near Sundance Square.",
  },
  {
    question: "Is Malone's Pub showing World Cup games?",
    answer:
      "Yes. Malone's Pub will be showing World Cup games, with major matches and knockout games highlighted as the schedule is set.",
  },
  {
    question: "Does Malone's Pub serve Guinness?",
    answer:
      "Yes. Malone's Pub serves Guinness Pub Draught, along with cold beer, liquor, wine, non-alcoholic beer, and simple bar bites.",
  },
  {
    question: "Is Malone's Pub near Sundance Square?",
    answer:
      "Yes. Malone's Pub is in Downtown Fort Worth near Sundance Square at 1303 Calhoun St, Fort Worth, TX 76102.",
  },
  {
    question: "What time does Malone's Pub open?",
    answer:
      "Malone's Pub opens at 3pm Monday through Friday and 2pm Saturday and Sunday, and closes at 2am every night.",
  },
  {
    question: "Does Malone's Pub have food?",
    answer:
      "Malone's Pub has simple bar food and bar bites including pizza, chips, beef jerky, and nuts.",
  },
  {
    question: "Does Malone's Pub have pool, darts, Golden Tee, or pinball?",
    answer:
      "Yes. Malone's Pub has pool, darts, Golden Tee, Big Lebowski pinball, and a jukebox.",
  },
];

export default function WorldCupPage() {
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "2026 World Cup Games at Malone's Pub",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Malone's Pub",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1303 Calhoun St",
        addressLocality: "Fort Worth",
        addressRegion: "TX",
        postalCode: "76102",
        addressCountry: "US",
      },
    },
    description:
      "Watch 2026 World Cup games at Malone's Pub, an Irish pub & dive bar in Downtown Fort Worth near Sundance Square.",
    organizer: {
      "@type": "Organization",
      name: "Malone's Pub",
      url: "https://malonespub.com",
    },
  };

  return (
    <>
      <FaqSchema faqs={faqs} pageUrl={pageUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="relative min-h-[640px] overflow-hidden border-b border-white/10">
        <Image
          src="/photos/inside.webp"
          alt="Interior of Malone's Pub in Downtown Fort Worth"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />

        <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col justify-center px-4 py-16">
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-green-200">
            {["USA", "MEX", "ENG", "BRA", "ARG", "GER", "JPN"].map((country) => (
              <span key={country} className="rounded border border-white/20 bg-black/50 px-2 py-1">
                {country}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            2026 FIFA World Cup - Downtown Fort Worth
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
            Watch the 2026 World Cup at Malone&apos;s Pub in Downtown Fort Worth
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl">
            Cold beer, Guinness, pool, darts, Golden Tee, pinball, and a
            laid-back pub crowd at Malone&apos;s Pub near Sundance Square.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400" href={directionsUrl}>
              Get Directions
            </a>
            <a className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950" href={tel}>
              Call Malone&apos;s
            </a>
            <a className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950" href="#schedule">
              See Match Schedule
            </a>
            <Link className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950" href="/menu">
              View Drink Menu
            </Link>
          </div>

          <p className="mt-5 text-sm text-neutral-300">
            1303 Calhoun St, Fort Worth, TX 76102 - Free street parking
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-4">
        {[
          "Irish pub & dive bar in Downtown Fort Worth",
          "Guinness, cold beer, cocktails, and bar bites",
          "Pool, darts, Golden Tee, pinball, and jukebox",
          "Near Sundance Square with free street parking",
        ].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-neutral-900/70 p-5 text-neutral-200">
            {item}
          </div>
        ))}
      </section>

      <section id="schedule" className="border-y border-white/10 bg-neutral-900">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
              Match Schedule
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              World Cup Games We Plan to Show
            </h2>
            <p className="mt-5 leading-8 text-neutral-300">
              The 2026 World Cup runs from June 11 through July 19, 2026. Once
              matchups and kickoff times are final, this page can list dates,
              countries, times, and day-of-week details for Fort Worth soccer fans.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {priorityMatches.map((match) => (
                <div key={match} className="rounded-lg border border-green-400/20 bg-green-400/10 px-4 py-3 text-neutral-200">
                  {match}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 p-6">
            <h3 className="text-2xl font-black">Key Dates</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-neutral-400">Tournament begins</dt>
                <dd className="font-bold">June 11, 2026</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-neutral-400">Group stage</dt>
                <dd className="font-bold">June 11-27</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-neutral-400">Knockout rounds</dt>
                <dd className="font-bold">June 28-July 19</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-400">World Cup Final</dt>
                <dd className="font-bold">July 19, 2026</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm text-neutral-400">
              Check back as the official match schedule gets closer.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            Why Malone&apos;s
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            A Real Fort Worth Pub for the World&apos;s Biggest Soccer Tournament
          </h2>
          <p className="mt-5 leading-8 text-neutral-300">
            Malone&apos;s is not a polished chain sports bar. It is Downtown Fort
            Worth&apos;s longest-running Irish pub and neighborhood dive bar: cold
            drinks, regulars, games, and enough grit to feel like an actual pub.
          </p>
          <p className="mt-4 leading-8 text-neutral-300">
            If you are searching for where to watch World Cup games in Fort
            Worth, a soccer bar near Sundance Square, or a Guinness in Downtown
            Fort Worth, this is the page to keep handy.
          </p>
        </div>

        <div className="grid gap-4">
          <Link className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50" href="/photos">
            See photos of the bar
          </Link>
          <Link className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50" href="/menu">
            Check the drink menu and bar bites
          </Link>
          <Link className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50" href="/contact">
            View hours, address, and contact info
          </Link>
          <a className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50" href={site.instagramUrl}>
            Follow Malone&apos;s Pub on Instagram
          </a>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-black md:text-4xl">
            World Cup FAQ
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-3 text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400" href={directionsUrl}>
              Get directions to Malone&apos;s Pub
            </a>
            <a className="rounded-lg border border-white/30 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950" href={tel}>
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
