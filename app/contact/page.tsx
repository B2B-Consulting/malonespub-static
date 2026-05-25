import type { Metadata } from "next";
import Section from "@/components/Section";
import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import ReviewButton from "@/components/ReviewButton";
import SeoFaq from "@/components/SeoFaq";
import site from "@/content/site.json";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { formatHoursLines } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description:
    "Contact Malone's Pub in Downtown Fort Worth. Address, phone, hours, directions, free street parking, and nearby Sundance Square, Fort Worth Convention Center, and Texas A&M Fort Worth.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

const contactFaqs = [
  {
    question: "Where is Malone's Pub?",
    answer:
      "Malone's Pub is at 1303 Calhoun St, Fort Worth, TX 76102 in Downtown Fort Worth.",
  },
  {
    question: "Is there parking near Malone's Pub?",
    answer:
      "Yes. Malone's notes free street parking nearby.",
  },
  {
    question: "What time does Malone's Pub close?",
    answer:
      "Malone's Pub closes at 2am every night.",
  },
  {
    question: "Is Malone's Pub near Sundance Square?",
    answer:
      "Yes. Malone's is in Downtown Fort Worth near Sundance Square.",
  },
  {
    question: "Can I call before coming in?",
    answer:
      "Yes. You can call Malone's Pub at (817) 332-5330.",
  },
];

export default function ContactPage() {
  const hoursLines = formatHoursLines(site.hours);
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <Section title="Contact Malone's Pub">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-lg font-semibold">NAP</div>
            <div className="mt-3 space-y-2 text-neutral-300">
              <div className="font-bold text-white">Malone&apos;s Pub</div>
              <div>{BUSINESS.address.formatted}</div>
              <a className="block text-green-300 hover:text-green-200" href={tel}>
                {site.phone}
              </a>
            </div>

            <div className="mt-4 text-sm text-neutral-400">
              {hoursLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={site.googleMapsUrl} external>
                Get Directions
              </ButtonLink>
              <ButtonLink href={tel} variant="ghost">
                Click to Call
              </ButtonLink>
              <ButtonLink href={site.instagramUrl} external variant="ghost">
                Instagram
              </ButtonLink>
            </div>

            <div className="mt-6 text-xs text-neutral-500">
              Free street parking available.
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold">Nearby Downtown Landmarks</div>
            <p className="mt-3 leading-7 text-neutral-400">
              Malone&apos;s Pub is on Calhoun Street in Downtown Fort Worth,
              convenient to Sundance Square, the Fort Worth Convention Center,
              Texas A&amp;M Fort Worth, downtown hotels, offices, and event
              venues.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/menu" variant="ghost">
                View Menu
              </ButtonLink>
              <ButtonLink href="/photos" variant="ghost">
                See Photos
              </ButtonLink>
              <ReviewButton />
            </div>
          </Card>
        </div>
      </Section>

      <SeoFaq faqs={contactFaqs} title="Contact FAQ" pageUrl={`${SITE_URL}/contact`} />
    </>
  );
}
