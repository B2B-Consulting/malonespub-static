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
    "About Malone's Pub, a Downtown Fort Worth dive bar and Irish pub established in 2000 with Guinness, pool, darts, Golden Tee, Big Lebowski pinball, jukebox, bar food, and local regulars.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const faqs = [
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
        intro="Malone's Pub is a no-frills Irish pub and neighborhood dive bar in Downtown Fort Worth with Guinness, cold beer, pool, darts, Golden Tee, Big Lebowski pinball, jukebox, and bar food."
        image={mainImages.exterior}
        imageAlt="Malone's Pub exterior in Downtown Fort Worth"
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-base leading-8 text-neutral-300">
          <h2 className="text-3xl font-black text-white">
            Downtown Fort Worth&apos;s Neighborhood Pub
          </h2>
          <p>
            Malone&apos;s Pub has been part of Downtown Fort Worth since 2000.
            It sits on Calhoun Street near Sundance Square, the Fort Worth
            Convention Center, and Texas A&amp;M Fort Worth, but it still feels
            like a local neighborhood bar.
          </p>
          <p>
            The identity is simple: Irish pub roots, dive-bar comfort, cold
            drinks, regulars, and games. Malone&apos;s is not trying to be an
            upscale restaurant or a corporate sports bar. It is a place for
            Guinness, beer, cocktails, pool, darts, Golden Tee, Big Lebowski
            pinball, jukebox, and simple bar food.
          </p>
          <p>
            Whether you are downtown after work, near Sundance Square, coming
            from the Convention Center, or just looking for a Fort Worth bar
            that feels lived in, Malone&apos;s keeps the door open and the tone
            easy.
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
