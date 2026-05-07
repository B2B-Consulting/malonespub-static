import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "World Cup Watch Party Fort Worth | Watch 2026 World Cup at Malone’s Pub",
  description:
    "Watch the 2026 World Cup at Malone’s Pub in downtown Fort Worth. Soccer games on TV, cold drinks, Guinness, bar food, and World Cup watch parties for major matches.",
  alternates: {
    canonical: "https://www.malonespub.com/world-cup",
  },
  openGraph: {
    title:
      "World Cup Watch Party Fort Worth | Malone’s Pub Downtown Fort Worth",
    description:
      "Looking for where to watch the 2026 World Cup in Fort Worth? Malone’s Pub will show major World Cup matches with cold drinks, Guinness, bar food, and a downtown pub atmosphere.",
    url: "https://www.malonespub.com/world-cup",
    siteName: "Malone’s Pub",
    type: "website",
  },
};

const highPriorityMatches = [
  "United States matches",
  "Mexico matches",
  "England matches",
  "Brazil matches",
  "Argentina matches",
  "Knockout round matches",
  "Semifinals",
  "World Cup Final",
];

const searchKeywords = [
  "World Cup bar Fort Worth",
  "World Cup watch party Fort Worth",
  "Where to watch World Cup in Fort Worth",
  "Soccer bar Fort Worth",
  "Bars showing World Cup near me",
  "Sports bar downtown Fort Worth",
  "USA soccer bar Fort Worth",
  "Mexico soccer bar Fort Worth",
  "World Cup Final watch party Fort Worth",
];

export default function WorldCupPage() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Malone’s Pub",
    url: "https://www.malonespub.com/world-cup",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1303 Calhoun St",
      addressLocality: "Fort Worth",
      addressRegion: "TX",
      postalCode: "76102",
      addressCountry: "US",
    },
    servesCuisine: "Bar food",
    priceRange: "$$",
    description:
      "Malone’s Pub is a downtown Fort Worth bar showing major 2026 World Cup matches with drinks, Guinness, bar food, and a classic pub atmosphere.",
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "2026 World Cup Watch Parties at Malone’s Pub",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Malone’s Pub",
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
      "Watch major 2026 World Cup matches at Malone’s Pub in downtown Fort Worth.",
    organizer: {
      "@type": "Organization",
      name: "Malone’s Pub",
      url: "https://www.malonespub.com",
    },
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.35),_transparent_45%),linear-gradient(to_bottom,_#052e16,_#0a0a0a)]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-green-300">
            2026 FIFA World Cup • Downtown Fort Worth
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Watch the 2026 World Cup at Malone’s Pub in Fort Worth
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl">
            Looking for a World Cup bar in Fort Worth? Malone’s Pub in downtown
            Fort Worth will be showing major 2026 World Cup matches with cold
            drinks, Guinness, bar food, TVs, and a classic pub atmosphere.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Malone%27s+Pub+1303+Calhoun+St+Fort+Worth+TX+76102"
              className="rounded-full bg-green-500 px-6 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400"
            >
              Get Directions
            </a>

            <a
              href="tel:+18173322214"
              className="rounded-full border border-white/30 px-6 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
            >
              Call Malone’s Pub
            </a>
          </div>

          <p className="mt-5 text-sm text-neutral-300">
            1303 Calhoun St, Fort Worth, TX 76102
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-extrabold">World Cup Games on TV</h2>
          <p className="mt-3 text-neutral-300">
            Watch major 2026 World Cup matches at a downtown Fort Worth bar
            built for cold drinks, regulars, and game-day energy.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-extrabold">Soccer Watch Parties</h2>
          <p className="mt-3 text-neutral-300">
            Join other soccer fans for USA, Mexico, England, knockout round,
            semifinal, and final match watch parties.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-extrabold">Drinks + Pub Atmosphere</h2>
          <p className="mt-3 text-neutral-300">
            Guinness, cold beer, cocktails, simple bar food, and a real Fort
            Worth pub setting for the world’s biggest soccer tournament.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-neutral-900">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
                World Cup Schedule
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                2026 World Cup Watch Schedule at Malone’s
              </h2>

              <p className="mt-5 leading-8 text-neutral-300">
                The 2026 World Cup runs from June 11 through July 19, 2026. We
                will highlight major matches, high-demand country matchups, and
                knockout round games as the tournament approaches.
              </p>

              <div className="mt-6 rounded-2xl border border-green-400/30 bg-green-400/10 p-5">
                <p className="font-bold text-green-200">
                  Best matches to watch at Malone’s:
                </p>

                <ul className="mt-4 grid gap-2 text-neutral-200 sm:grid-cols-2">
                  {highPriorityMatches.map((match) => (
                    <li key={match} className="flex gap-2">
                      <span className="text-green-300">•</span>
                      <span>{match}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <h3 className="text-2xl font-black">Key Dates</h3>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-neutral-400">Tournament begins</dt>
                  <dd className="font-bold">June 11, 2026</dd>
                </div>

                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-neutral-400">Group stage</dt>
                  <dd className="font-bold">June 11–27</dd>
                </div>

                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-neutral-400">Knockout rounds</dt>
                  <dd className="font-bold">June 28–July 19</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-400">World Cup Final</dt>
                  <dd className="font-bold">July 19, 2026</dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-neutral-400">
                Check back for updated matchups, kickoff times, drink specials,
                and watch party details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
          Where to Watch the World Cup in Fort Worth
        </p>

        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          A Downtown Fort Worth Soccer Bar for the 2026 World Cup
        </h2>

        <div className="mt-6 grid gap-8 text-neutral-300 md:grid-cols-2">
          <p className="leading-8">
            Malone’s Pub is located in downtown Fort Worth, making it an easy
            place to meet friends before, during, or after World Cup matches.
            Whether you are searching for a soccer bar near me, a World Cup bar
            in Fort Worth, or a downtown sports bar showing the games, Malone’s
            is built for a straightforward pub experience.
          </p>

          <p className="leading-8">
            We are not trying to be a polished chain sports bar. Malone’s is a
            local Fort Worth pub with cold drinks, TVs, regulars, and a casual
            atmosphere for fans who want to watch the match without overthinking
            it.
          </p>
        </div>
      </section>

      <section className="bg-neutral-900">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-black md:text-4xl">
            Popular World Cup Searches We Serve
          </h2>

          <p className="mt-4 max-w-3xl text-neutral-300">
            Malone’s Pub is a good fit for fans searching for World Cup watch
            parties, soccer bars, and downtown Fort Worth bars showing major
            World Cup matches.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {searchKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
              Match Day
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Come Early for Big Matches
            </h2>

            <p className="mt-5 leading-8 text-neutral-300">
              For USA, Mexico, England, knockout round, semifinal, and final
              matches, expect more people in the bar. Come early, grab a drink,
              and get settled before kickoff.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">World Cup Match Day Plan</h3>

            <ul className="mt-5 space-y-3 text-neutral-300">
              <li>
                <strong className="text-white">Step 1:</strong> Check the
                updated match schedule on this page.
              </li>
              <li>
                <strong className="text-white">Step 2:</strong> Head to
                Malone’s Pub in downtown Fort Worth before kickoff.
              </li>
              <li>
                <strong className="text-white">Step 3:</strong> Watch the match
                with drinks, bar food, and other soccer fans.
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Malone%27s+Pub+1303+Calhoun+St+Fort+Worth+TX+76102"
                className="rounded-full bg-white px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-300"
              >
                Directions
              </a>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-black md:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-black">
                Where can I watch the World Cup in Fort Worth?
              </h3>
              <p className="mt-3 text-neutral-300">
                Malone’s Pub in downtown Fort Worth will be showing major 2026
                World Cup matches, including high-demand country matchups and
                knockout round games.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-black">
                Is Malone’s Pub showing USA World Cup games?
              </h3>
              <p className="mt-3 text-neutral-300">
                Yes. USA matches will be priority World Cup watch party games at
                Malone’s Pub.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-black">
                Is Malone’s Pub showing Mexico World Cup games?
              </h3>
              <p className="mt-3 text-neutral-300">
                Yes. Mexico matches are expected to be some of the biggest World
                Cup watch party games in Fort Worth.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-black">
                Is this an official FIFA event?
              </h3>
              <p className="mt-3 text-neutral-300">
                No. Malone’s Pub is not affiliated with FIFA. This is a local
                Fort Worth bar showing World Cup matches for soccer fans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}