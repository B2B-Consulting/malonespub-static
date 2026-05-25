import { BUSINESS } from "@/lib/business";

export default function LocalBusinessCard() {
  return (
    <div className="rounded-lg border border-white/10 bg-black/35 p-5">
      <h2 className="text-2xl font-black text-white">Visit Malone&apos;s Pub</h2>
      <div className="mt-4 space-y-2 text-sm leading-6 text-neutral-300">
        <p>
          <strong className="text-white">{BUSINESS.name}</strong>
        </p>
        <p>{BUSINESS.address.formatted}</p>
        <p>
          <a className="text-green-300 hover:text-green-200" href={BUSINESS.phoneHref}>
            {BUSINESS.phone}
          </a>
        </p>
        <p>{BUSINESS.hours.weekday}</p>
        <p>{BUSINESS.hours.weekend}</p>
        <p>Free street parking near Sundance Square and Downtown Fort Worth.</p>
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={BUSINESS.mapsUrl}
          className="rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-bold text-neutral-950 transition hover:bg-green-400"
        >
          Get Directions
        </a>
        <a
          href={BUSINESS.phoneHref}
          className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-white hover:text-neutral-950"
        >
          Call
        </a>
      </div>
    </div>
  );
}
