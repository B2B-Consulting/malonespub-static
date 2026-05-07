import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Malone's Pub merchandise is coming soon. Follow Malone's Pub in Downtown Fort Worth for updates.",
};

export default function MerchPage() {
  return (
    <Section title="Merch">
      <div className="flex items-center justify-center py-20 text-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Merchandise Coming Soon
          </h2>
          <p className="mt-4 text-neutral-400">
            Malone&apos;s gear is on the way. Stay tuned.
          </p>
        </div>
      </div>
    </Section>
  );
}
