import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CallToActionBar from "@/components/CallToActionBar";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Malone's Pub merchandise is coming soon, including shirts, hats, koozies, and bar merch from the Downtown Fort Worth Irish pub and dive bar.",
  alternates: { canonical: `${SITE_URL}/merch` },
};

export default function MerchPage() {
  return (
    <>
      <Section title="Malone's Pub Merch">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 leading-8 text-neutral-300">
            <h2 className="text-3xl font-black text-white">
              Merchandise Coming Soon
            </h2>
            <p>
              Malone&apos;s Pub merch is on the way. Expect practical bar gear
              like shirts, hats, koozies, and other Malone&apos;s Pub items for
              regulars, downtown Fort Worth locals, and anyone who wants a piece
              of the neighborhood dive bar.
            </p>
            <p>
              Until online ordering is ready, ask the bartender about current
              availability when you stop in. You can also check the photos page
              to get a feel for the bar, look over the drink menu, or contact
              Malone&apos;s before coming downtown.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="text-green-300 hover:text-green-200" href="/photos">
                See photos
              </Link>
              <Link className="text-green-300 hover:text-green-200" href="/menu">
                View menu
              </Link>
              <Link className="text-green-300 hover:text-green-200" href="/contact">
                Contact Malone&apos;s
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-neutral-900/70 p-5">
            <div className="text-lg font-bold text-white">Possible Merch</div>
            <ul className="mt-4 space-y-2 text-neutral-400">
              <li>Shirts</li>
              <li>Hats</li>
              <li>Koozies</li>
              <li>Bar merch</li>
            </ul>
          </div>
        </div>
      </Section>
      <CallToActionBar label="Ask about Malone's merch at the bar" />
    </>
  );
}
