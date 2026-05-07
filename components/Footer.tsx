import site from "@/content/site.json";
import { formatHoursLines } from "@/lib/hours";

export default function Footer() {
  const lines = formatHoursLines(site.hours);

  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-300">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-neutral-100">{site.name}</div>
          <div>Irish pub & dive bar in Downtown Fort Worth</div>
          <div>{site.address}</div>
          <div>{site.phone}</div>
          <div className="text-neutral-400">{lines.join(" / ")}</div>
        </div>

        <div className="mt-6 text-xs text-neutral-500">
          (c) {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
