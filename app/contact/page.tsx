import type { Metadata } from "next";
import Section from "@/components/Section";
import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import site from "@/content/site.json";
import { formatHoursLines } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description:
    "Contact Malone’s Pub in Downtown Fort Worth (76102) near Sundance Square. Free street parking, pool tables, darts, Golden Tee, pinball, and bar food.",
};

export default function ContactPage() {
  const hoursLines = formatHoursLines(site.hours as any);

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
            <ButtonLink
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              variant="ghost"
            >
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
            For now this is a simple email link (static, no backend).
          </div>

          <div className="mt-5">
            <ButtonLink
              href={`mailto:info@malonespub.com?subject=Malone%E2%80%99s%20Pub%20Question&body=Hey%20Malone%E2%80%99s%20team%2C%0A%0A`}
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