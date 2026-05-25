import Link from "next/link";
import ReviewButton from "@/components/ReviewButton";
import site from "@/content/site.json";
import { formatHoursLines } from "@/lib/hours";

const footerGroups = [
  {
    title: "Visit",
    links: [
      { href: "/contact", label: "Contact & Directions" },
      { href: "/menu", label: "Drink Menu" },
      { href: "/photos", label: "Photos" },
      { href: "/about", label: "About Malone's Pub" },
    ],
  },
  {
    title: "What We're Known For",
    links: [
      { href: "/irish-pub-fort-worth", label: "Irish Pub in Fort Worth" },
      { href: "/dive-bar-fort-worth", label: "Dive Bar in Downtown Fort Worth" },
      { href: "/pool-darts-fort-worth", label: "Pool & Darts" },
      { href: "/golden-tee-fort-worth", label: "Golden Tee" },
      { href: "/pinball-fort-worth", label: "Big Lebowski Pinball" },
      { href: "/guinness-fort-worth", label: "Guinness in Fort Worth" },
    ],
  },
  {
    title: "Events",
    links: [
      { href: "/pool-tournament", label: "Pool Tournament" },
      { href: "/world-cup", label: "Soccer 2026" },
      { href: "/world-cup-fort-worth", label: "World Cup Fort Worth" },
      { href: "/late-night-bar-fort-worth", label: "Late Night Bar Fort Worth" },
    ],
  },
];

export default function Footer() {
  const lines = formatHoursLines(site.hours);

  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-300">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-neutral-100">{site.name}</div>
            <div>Irish pub & dive bar in Downtown Fort Worth</div>
            <div>{site.address}</div>
            <div>{site.phone}</div>
            <div className="text-neutral-400">{lines.join(" / ")}</div>
            <div className="pt-3">
              <ReviewButton />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <div className="font-bold text-neutral-100">{group.title}</div>
                <div className="mt-3 flex flex-col gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-neutral-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-xs text-neutral-500">
          (c) {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
