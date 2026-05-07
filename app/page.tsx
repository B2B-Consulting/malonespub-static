import Image from "next/image";
import Section from "@/components/Section";
import ButtonLink from "@/components/ButtonLink";
import OpenStatus from "@/components/OpenStatus";
import Ratings from "@/components/Ratings";
import site from "@/content/site.json";

export default function Home() {
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <div className="relative border-b border-neutral-900">
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="/photos/hero.webp"
            alt="Malone's Pub exterior sign in Downtown Fort Worth"
            fill
            priority
            className="scale-105 object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-24 text-center md:pt-28">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              {site.name}
            </h1>

            <p className="mt-5 max-w-2xl text-xl text-neutral-300 md:text-2xl">
              Downtown Fort Worth&apos;s longest-running Irish pub and neighborhood dive bar.
            </p>

            <div className="mx-auto mt-4 h-px w-16 bg-neutral-500" />

            <div className="mt-3 text-sm uppercase tracking-wider text-neutral-400">
              Established 2000
            </div>

            <OpenStatus />

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href={site.googleMapsUrl} external>
                Get Directions
              </ButtonLink>

              <ButtonLink href={tel} variant="ghost">
                Call
              </ButtonLink>

              <ButtonLink href="/menu" variant="ghost">
                Drink Menu
              </ButtonLink>
            </div>

            <div className="mt-5 text-xs text-neutral-300/80">
              Free street parking - Pool - Darts - Golden Tee - Pinball - Bar food
            </div>
          </div>
        </div>
      </div>

      <Ratings />

      <Section>
        <p className="mx-auto max-w-3xl text-center text-neutral-400">
          Located in the heart of <strong>Downtown Fort Worth</strong> near{" "}
          <strong>Sundance Square</strong>, Malone&apos;s Pub is a local staple for
          cold drinks, Guinness, darts, Golden Tee, pinball, and bar food. If
          you&apos;re looking for an <strong>Irish pub & dive bar in Downtown Fort Worth</strong>,
          you will feel right at home at Malone&apos;s.
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 text-center md:grid-cols-3">
          <div>
            <div className="text-3xl font-bold">Cold Drinks</div>
            <p className="mt-3 text-neutral-400">
              Strong pours. Ice cold beer. Guinness on tap. No fluff.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold">Games</div>
            <p className="mt-3 text-neutral-400">
              Pool, darts, Golden Tee, Big Lebowski pinball, and a jukebox that works.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold">Downtown Location</div>
            <p className="mt-3 text-neutral-400">
              Free street parking and a laid-back neighborhood vibe near Sundance Square.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
