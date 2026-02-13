import Image from "next/image";
import Section from "@/components/Section";
import ButtonLink from "@/components/ButtonLink";
import OpenStatus from "@/components/OpenStatus";
import Ratings from "@/components/Ratings";
import YelpRatings from "@/components/YelpRatings";


import site from "@/content/site.json";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="relative border-b border-neutral-900">
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="/photos/hero.webp"
            alt="Malone’s Pub exterior"
            fill
            priority
            className="object-cover object-top scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-24 md:pt-28">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              {site.name}
            </h1>

            <p className="mt-5 max-w-2xl text-xl text-neutral-300 md:text-2xl">
              Downtown Fort Worth’s longest-running neighborhood pub.
            </p>

            <div className="mt-4 h-px w-16 bg-neutral-500 mx-auto" />

            <div className="mt-3 text-sm tracking-wider text-neutral-400 uppercase">
              Established 2000
            </div>

            <OpenStatus />

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href={site.googleMapsUrl} external>
                Get Directions
              </ButtonLink>

              <ButtonLink
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                variant="ghost"
              >
                Call
              </ButtonLink>
            </div>

            <div className="mt-5 text-xs text-neutral-300/80">
              Free street parking • Dog friendly • Pool • Pinball • Darts
            </div>
          </div>
        </div>
      </div>

      {/* RATINGS (high ROI) */}
      <Ratings />

      {/* WHY MALONE'S */}
      <Section>
        <div className="grid gap-10 text-center md:grid-cols-3">
          <div>
            <div className="text-3xl font-bold">Cold Drinks</div>
            <p className="mt-3 text-neutral-400">
              Strong pours. Ice cold beer. No fluff.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold">Good Games</div>
            <p className="mt-3 text-neutral-400">
              Pool, pinball, darts and a jukebox that actually works.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold">Real Atmosphere</div>
            <p className="mt-3 text-neutral-400">
              Free street parking. Patio out back. Downtown energy.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

