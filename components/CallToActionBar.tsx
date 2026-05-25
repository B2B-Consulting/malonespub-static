import Link from "next/link";
import { BUSINESS } from "@/lib/business";

export default function CallToActionBar({
  label = "Come by Malone's Pub",
}: {
  label?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-neutral-900/70 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-black text-white">{label}</div>
          <div className="mt-1 text-sm text-neutral-400">
            {BUSINESS.address.formatted} - {BUSINESS.hours.weekday} / {BUSINESS.hours.weekend}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
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
            Call {BUSINESS.phone}
          </a>
          <Link
            href="/menu"
            className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-white hover:text-neutral-950"
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
