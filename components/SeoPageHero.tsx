import Image from "next/image";
import { BUSINESS } from "@/lib/business";

export default function SeoPageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative min-h-[460px] overflow-hidden border-b border-white/10">
      <Image src={image} alt={imageAlt} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/72" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
      <div className="relative mx-auto flex min-h-[460px] max-w-6xl flex-col justify-center px-4 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200">{intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            className="rounded-lg bg-green-500 px-5 py-3 text-center font-bold text-neutral-950 transition hover:bg-green-400"
            href={BUSINESS.mapsUrl}
          >
            Get Directions
          </a>
          <a
            className="rounded-lg border border-white/30 bg-black/45 px-5 py-3 text-center font-bold text-white transition hover:bg-white hover:text-neutral-950"
            href={BUSINESS.phoneHref}
          >
            Call Malone&apos;s
          </a>
        </div>
      </div>
    </section>
  );
}
