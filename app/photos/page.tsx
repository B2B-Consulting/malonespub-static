import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import SeoFaq from "@/components/SeoFaq";
import photos from "@/content/photos.json";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photos of Malone's Pub, a Downtown Fort Worth Irish pub and neighborhood dive bar near Sundance Square with pool, darts, Golden Tee, pinball, and bar food.",
  alternates: { canonical: `${SITE_URL}/photos` },
};

const photoFaqs = [
  {
    question: "Can I see photos of Malone's Pub before visiting?",
    answer:
      "Yes. The photos page shows the exterior, bar, patio, interior, pool table, darts, Golden Tee, and Big Lebowski pinball.",
  },
  {
    question: "Does Malone's Pub have a pool table?",
    answer: "Yes. Malone's has a pool table in Downtown Fort Worth.",
  },
  {
    question: "Does Malone's Pub have Golden Tee?",
    answer: "Yes. Malone's has a Golden Tee machine.",
  },
  {
    question: "Does Malone's Pub have pinball?",
    answer: "Yes. Malone's has a Big Lebowski pinball machine.",
  },
];

export default function PhotosPage() {
  return (
    <>
      <Section title="Photos">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <div
              key={p.src}
              className="overflow-hidden rounded-lg border border-neutral-900 bg-neutral-900/20"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={1200}
                height={800}
                className="h-64 w-full object-cover"
              />
              <div className="px-3 py-2 text-sm text-neutral-400">{p.alt}</div>
            </div>
          ))}
        </div>
      </Section>
      <SeoFaq faqs={photoFaqs} title="Photos FAQ" pageUrl={`${SITE_URL}/photos`} />
    </>
  );
}
