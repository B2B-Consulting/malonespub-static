import Image from "next/image";
import Link from "next/link";
import FaqSchema from "@/components/FaqSchema";
import ReviewButton from "@/components/ReviewButton";
import site from "@/content/site.json";
import { worldCupMatches } from "@/data/worldCupSchedule";

const pageUrl = "https://malonespub.com/soccer-2026";
const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Malone%27s+Pub+1303+Calhoun+St+Fort+Worth+TX+76102";

const faqs = [
  {
    question: "Where can I watch 2026 soccer matches in Fort Worth?",
    answer:
      "You can watch televised 2026 international soccer matches at Malone's Pub in downtown Fort Worth. We'll be opening early for select morning matches that start before our normal business hours.",
  },
  {
    question: "Is Malone's Pub an official FIFA or World Cup venue?",
    answer:
      "No. Malone's Pub is not affiliated with, sponsored by, endorsed by, or officially connected to FIFA, FIFA World Cup, or any tournament organizer. We are an independent pub showing televised soccer matches.",
  },
  {
    question: "Will Malone's Pub open early for morning soccer matches?",
    answer:
      "Yes. When a televised soccer match starts before our normal hours, Malone's Pub will open one hour before the first match of the day.",
  },
  {
    question: "Will Malone's Pub show USA, Mexico, and England soccer matches?",
    answer:
      "Malone's Pub plans to show major 2026 international soccer matches, including high-interest country matchups when the schedule and broadcast availability allow.",
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
      "Malone's Pub opens at 3pm Monday through Friday and 12pm Saturday and Sunday, and closes at 2am every night.",
  },
  {
    question: "Does Malone's Pub have pool, darts, Golden Tee, or pinball?",
    answer:
      "Yes. Malone's Pub has pool, darts, Golden Tee, Big Lebowski pinball, and a jukebox.",
  },
];

const scheduleByDate = worldCupMatches.reduce<
  Array<{ date: string; matches: typeof worldCupMatches }>
>((groups, match) => {
  const existingGroup = groups.find((group) => group.date === match.date);

  if (existingGroup) {
    existingGroup.matches.push(match);
  } else {
    groups.push({ date: match.date, matches: [match] });
  }

  return groups;
}, []);

function formatScheduleDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day, 12, 0, 0)));
}

function formatScheduleTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2026, 0, 1, hour, minute, 0)));
}

export default function WorldCupPage() {
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <FaqSchema faqs={faqs} pageUrl={pageUrl} />

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
              <span
                key={country}
                className="rounded border border-white/20 bg-black/50 px-2 py-1"
              >
                {country}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            2026 International Soccer - Downtown Fort Worth
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
            Watch 2026 International Soccer Matches at Malone&apos;s Pub in
            Downtown Fort Worth
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl">
            Catch televised 2026 international soccer matches at Malone&apos;s
            Pub in downtown Fort Worth. We&apos;ll be opening early for morning
            matches that start before our normal business hours.
          </p>

          <p className="mt-4 max-w-2xl rounded-lg border border-white/15 bg-black/45 p-3 text-sm leading-6 text-neutral-300">
            Malone&apos;s Pub is not affiliated with, sponsored by, endorsed by,
            or officially connected to FIFA, FIFA World Cup, or any tournament
            organizer. We are an independent local pub where fans can watch
            televised soccer matches.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400"
              href={directionsUrl}
            >
              Get Directions
            </a>
            <a
              className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
              href={tel}
            >
              Call Malone&apos;s
            </a>
            <a
              className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
              href="#schedule"
            >
              See Soccer Schedule
            </a>
            <Link
              className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
              href="/menu"
            >
              View Drink Menu
            </Link>
            <ReviewButton />
          </div>

          <p className="mt-5 text-sm text-neutral-300">
            1303 Calhoun St, Fort Worth, TX 76102 - Free street parking
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-5">
        {[
          "Irish pub & dive bar in Downtown Fort Worth",
          "Sports bar in Downtown Fort Worth showing soccer matches",
          "Guinness, cold beer, cocktails, and bar bites",
          "Pool, darts, Golden Tee, pinball, and jukebox",
          "Near Sundance Square and the Fort Worth Convention Center",
        ].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-white/10 bg-neutral-900/70 p-5 text-neutral-200"
          >
            {item}
          </div>
        ))}
      </section>

      <section
        id="schedule"
        className="border-y border-white/10 bg-neutral-900"
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
                Soccer Schedule
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                2026 Soccer Matches We Plan to Show
              </h2>
              <p className="mt-5 leading-8 text-neutral-300">
                The major 2026 international soccer tournament runs from June
                11 through July 19, 2026. Kickoffs below are listed in Fort
                Worth Central time (CST/CDT). For televised matches before
                normal hours, Malone&apos;s Pub will open one hour before the
                first match of the day.
              </p>
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
                  <dt className="text-neutral-400">Final match</dt>
                  <dd className="font-bold">July 19, 2026</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 grid gap-5">
            <div className="grid grid-cols-[5rem_1fr_5.5rem] gap-3 border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-400 sm:grid-cols-[8rem_1fr_7rem]">
              <span>Date</span>
              <span>Match</span>
              <span className="text-right">CST/CDT</span>
            </div>

            {scheduleByDate.map((group) => (
              <div
                key={group.date}
                className="grid gap-3 border-b border-white/10 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[8rem_1fr]"
              >
                <div className="text-sm font-black text-green-300">
                  {formatScheduleDate(group.date)}
                </div>
                <div className="grid gap-2">
                  {group.matches.map((match) => (
                    <div
                      key={`${match.date}-${match.time}-${match.homeTeam}-${match.awayTeam}`}
                      className="grid gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div>
                        <div className="font-bold text-white">
                          {match.homeTeam} vs {match.awayTeam}
                        </div>
                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                          {match.label}
                        </div>
                      </div>
                      <div className="font-black text-green-300 sm:text-right">
                        {formatScheduleTime(match.time)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-5 text-neutral-500">
            Schedule details can change as tournament and broadcast updates are
            released.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
            Why Malone&apos;s
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            A Real Fort Worth Pub for Major Soccer Matches
          </h2>
          <p className="mt-5 leading-8 text-neutral-300">
            Malone&apos;s is not a polished chain sports bar. It is Downtown Fort
            Worth&apos;s longest-running Irish pub and neighborhood dive bar:
            cold drinks, regulars, games, and enough grit to feel like an
            actual pub.
          </p>
          <p className="mt-4 leading-8 text-neutral-300">
            Fans searching for World Cup games in Fort Worth can watch
            televised international soccer matches at Malone&apos;s Pub. If you
            want to watch soccer in Fort Worth, it is a Fort Worth soccer bar,
            sports bar in downtown Fort Worth, and pub showing soccer matches
            near Sundance Square and the Fort Worth Convention Center without
            implying any official tournament affiliation.
          </p>
        </div>

        <div className="grid gap-4">
          <Link
            className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50"
            href="/photos"
          >
            See photos of the bar
          </Link>
          <Link
            className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50"
            href="/menu"
          >
            Check the drink menu and bar bites
          </Link>
          <Link
            className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50"
            href="/contact"
          >
            View hours, address, and contact info
          </Link>
          <a
            className="rounded-lg border border-white/10 bg-neutral-900 p-5 transition hover:border-green-400/50"
            href={site.instagramUrl}
          >
            Follow Malone&apos;s Pub on Instagram
          </a>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-black md:text-4xl">
            Soccer Viewing FAQ
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-3 text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400"
              href={directionsUrl}
            >
              Get directions to Malone&apos;s Pub
            </a>
            <a
              className="rounded-lg border border-white/30 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
              href={tel}
            >
              Call {site.phone}
            </a>
          </div>

          <p className="mt-8 max-w-4xl text-xs leading-5 text-neutral-500">
            Malone&apos;s Pub is not affiliated with, sponsored by, endorsed by,
            or officially connected to FIFA, FIFA World Cup, or any tournament
            organizer. All trademarks are the property of their respective
            owners. References to tournaments or teams are for informational
            purposes only.
          </p>
        </div>
      </section>
    </>
  );
}
