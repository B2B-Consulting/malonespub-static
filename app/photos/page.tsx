import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import photos from "@/content/photos.json";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photos of Malone’s Pub — a Downtown Fort Worth Irish pub and neighborhood dive bar near Sundance Square.",
};

export default function PhotosPage() {
  return (
    <Section title="Photos">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          <div
            key={p.src}
            className="overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-900/20"
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
  );
}
