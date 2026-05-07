import type { Metadata } from "next";
import Section from "@/components/Section";
import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import site from "@/content/site.json";
import { formatHoursLines } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description:
    "Contact Malone's Pub in Downtown Fort Worth near Sundance Square. Free street parking, pool tables, darts, Golden Tee, pinball, Guinness, and simple bar food.",
};

export default function ContactPage() {
  const hoursLines = formatHoursLines(site.hours);
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <Section title="Contact">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="text-lg font-semibold">Find us</div>
          <div className="mt-2 text-neutral-300">{site.address}</div>
          <div className="mt-2 text-neutral-300">{site.phone}</div>

          <div className="mt-3 text-sm text-neutral-400">
            {hoursLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={site.googleMapsUrl} external>
              Get Directions
            </ButtonLink>
            <ButtonLink href={tel} variant="ghost">
              Call
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
          <div className="text-lg font-semibold">Email</div>
          <div className="mt-2 text-neutral-400">
            Questions about Malone&apos;s Pub, directions, or the bar? Send us a note.
          </div>

          <div className="mt-5">
            <ButtonLink
              href="mailto:brian@b2bconsulting.com?subject=Malone%27s%20Pub%20Question&body=Hey%20Malone%27s%20team%2C%0A%0A"
              external
            >
              Email us
            </ButtonLink>
          </div>
        </Card>
      </div>
    </Section>
  );
}
