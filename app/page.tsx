import Image from "next/image";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ButtonLink from "@/components/ButtonLink";
import OpenStatus from "@/components/OpenStatus";
import Ratings from "@/components/Ratings";
import ReviewButton from "@/components/ReviewButton";
import SeoFaq from "@/components/SeoFaq";
import site from "@/content/site.json";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: {
    absolute: "Malone's Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
  },
  description:
    "Malone's Pub is a long-running Irish pub and neighborhood dive bar in Downtown Fort Worth with Guinness, pool, darts, Golden Tee, Big Lebowski pinball, bar food, and a laid-back local atmosphere.",
  alternates: { canonical: SITE_URL },
};

const homeFaqs = [
  {
    question: "Is Malone's Pub an Irish pub?",
    answer:
      "Yes. Malone's Pub is a Downtown Fort Worth Irish pub and neighborhood dive bar with Guinness, cold beer, games, and bar food.",
  },
  {
    question: "Is Malone's Pub a dive bar?",
    answer:
      "Yes. Malone's has a casual, no-frills neighborhood dive-bar feel.",
  },
  {
    question: "Does Malone's Pub have pool tables?",
    answer:
      "Yes. Malone's has a pool table and a double-elimination 8-ball tournament rules page.",
  },
  {
    question: "Does Malone's Pub have darts?",
    answer:
      "Yes. Malone's has dart boards along with Golden Tee, pinball, and a jukebox.",
  },
  {
    question: "Does Malone's Pub serve Guinness?",
    answer:
      "Yes. Malone's serves Guinness Pub Draught and Guinness 0.0.",
  },
  {
    question: "What time does Malone's Pub close?",
    answer:
      "Malone's Pub closes at 2am every night.",
  },
];

export default function Home() {
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <div className="relative border-b border-neutral-900">
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="/photos/hero.webp"
            alt="Malone's Pub exterior sign in Downtown Fort Worth"
            fill
            priority
            className="scale-105 object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-24 text-center md:pt-28">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              {site.name}
            </h1>

            <p className="mt-5 max-w-2xl text-xl text-neutral-300 md:text-2xl">
              Downtown Fort Worth&apos;s longest-running Irish pub and neighborhood dive bar.
            </p>

            <div className="mx-auto mt-4 h-px w-16 bg-neutral-500" />

            <div className="mt-3 text-sm uppercase tracking-wider text-neutral-400">
              Established 2000
            </div>

            <OpenStatus />

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href={site.googleMapsUrl} external>
                Get Directions
              </ButtonLink>

              <ButtonLink href={tel} variant="ghost">
                Call
              </ButtonLink>

              <ButtonLink href="/menu" variant="ghost">
                Drink Menu
              </ButtonLink>
            </div>

            <div className="mt-5 text-xs text-neutral-300/80">
              Free street parking - Pool - Darts - Golden Tee - Pinball - Bar food
            </div>
          </div>
        </div>
      </div>

      <Ratings />

      <Section>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-black text-white">Like Malone&apos;s?</h2>
          <p className="max-w-2xl text-neutral-400">
            Reviews help local regulars and new downtown visitors find the bar.
          </p>
          <ReviewButton />
        </div>
      </Section>

      <Section>
        <p className="mx-auto max-w-3xl text-center text-neutral-400">
          Located in the heart of <strong>Downtown Fort Worth</strong> near{" "}
          <strong>Sundance Square</strong>, Malone&apos;s Pub is a local staple for
          cold drinks, Guinness, darts, Golden Tee, pinball, and bar food. If
          you&apos;re looking for an <strong>Irish pub & dive bar in Downtown Fort Worth</strong>,
          you will feel right at home at Malone&apos;s.
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 text-center md:grid-cols-3">
          <div>
            <div className="text-3xl font-bold">Cold Drinks</div>
            <p className="mt-3 text-neutral-400">
              Strong pours. Ice cold beer. Guinness on tap. No fluff.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold">Games</div>
            <p className="mt-3 text-neutral-400">
              Pool, darts, Golden Tee, Big Lebowski pinball, and a jukebox that works.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold">Downtown Location</div>
            <p className="mt-3 text-neutral-400">
              Free street parking and a laid-back neighborhood vibe near Sundance Square.
            </p>
          </div>
        </div>
      </Section>

      <SeoFaq faqs={homeFaqs} title="Malone's Pub FAQ" pageUrl={SITE_URL} />
    </>
  );
}
