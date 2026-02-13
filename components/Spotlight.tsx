import ButtonLink from "@/components/ButtonLink";
import spotlight from "@/content/spotlight.json";

export default function Spotlight() {
  if (!spotlight.enabled) return null;

  return (
    <div className="border-b border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 md:flex-row md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {spotlight.label}
            </div>
            <div className="text-lg font-semibold tracking-tight">
              {spotlight.headline}
            </div>
            <div className="text-sm text-neutral-400">{spotlight.subhead}</div>
          </div>

          <ButtonLink href={spotlight.ctaHref} variant="ghost">
            {spotlight.ctaText}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
