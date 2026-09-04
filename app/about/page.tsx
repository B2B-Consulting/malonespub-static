import type { Metadata } from "next";
import Link from "next/link";
import SeoPageHero from "@/components/SeoPageHero";
import LocalBusinessCard from "@/components/LocalBusinessCard";
import InternalLinkGrid from "@/components/InternalLinkGrid";
import CallToActionBar from "@/components/CallToActionBar";
import SeoFaq from "@/components/SeoFaq";
import { BUSINESS, mainImages, SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Malone's Pub",
  description:
    "Meet Malone's Pub owner Brian Huddleston and learn how he took ownership of the longtime Downtown Fort Worth Irish pub and neighborhood dive bar in 2026.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const faqs = [
  {
    question: "Who owns Malone's Pub?",
    answer:
      "Brian Huddleston has owned Malone's Pub since taking over from longtime owner Ed Noyes in 2026.",
  },
  {
    question: "When was Malone's Pub established?",
    answer: "Malone's Pub was established in 2000 in Downtown Fort Worth.",
  },
  {
    question: "What kind of bar is Malone's Pub?",
    answer:
      "Malone's is a Downtown Fort Worth Irish pub and neighborhood dive bar with cold drinks, Guinness, bar games, and simple bar food.",
  },
  {
    question: "Where is Malone's Pub?",
    answer: `Malone's Pub is at ${BUSINESS.address.formatted}.`,
  },
  {
    question: "What games does Malone's Pub have?",
    answer:
      "Malone's has pool, darts, Golden Tee, Big Lebowski pinball, and a jukebox.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SeoPageHero
        eyebrow="Established 2000"
        title="About Malone's Pub"
        intro="Meet owner Brian Huddleston and learn about the longtime Downtown Fort Worth Irish pub and neighborhood dive bar he took over in 2026."
        image={mainImages.exterior}
        imageAlt="Malone's Pub exterior in Downtown Fort Worth"
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-base leading-8 text-neutral-300">
          <h2 className="text-3xl font-black text-white">
            Meet Brian Huddleston
          </h2>
          <p>
            My name is Brian Huddleston, and I became the owner of
            Malone&apos;s Pub in 2026 when I took over the bar from its longtime
            owner, Ed Noyes.
          </p>
          <p>
            Malone&apos;s has been part of Downtown Fort Worth since 2000. The
            ownership has changed, but the things that make the bar feel like
            Malone&apos;s are still here: cold drinks, familiar faces, pool,
            darts, Golden Tee, Big Lebowski pinball, a jukebox, and a relaxed
            neighborhood atmosphere.
          </p>
          <h2 className="pt-4 text-3xl font-black text-white">
            Downtown Fort Worth&apos;s Neighborhood Pub
          </h2>
          <p>
            Malone&apos;s sits on Calhoun Street near Sundance Square, the Fort
            Worth Convention Center, and Texas A&amp;M Fort Worth, but it still
            feels like a local neighborhood bar. It is a no-frills place for
            Guinness, beer, cocktails, games, simple bar food, and good
            company.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link className="text-green-300 hover:text-green-200" href="/menu">
              View the menu
            </Link>
            <Link className="text-green-300 hover:text-green-200" href="/photos">
              See photos
            </Link>
            <Link className="text-green-300 hover:text-green-200" href="/contact">
              Get directions
            </Link>
          </div>
        </div>
        <LocalBusinessCard />
      </section>

      <CallToActionBar label="Visit Malone's Pub in Downtown Fort Worth" />
      <SeoFaq faqs={faqs} title="About Malone's FAQ" pageUrl={`${SITE_URL}/about`} />
      <InternalLinkGrid />
    </>
  );
}
