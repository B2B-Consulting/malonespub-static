import Link from "next/link";

export type InternalLinkItem = {
  href: string;
  label: string;
  description: string;
};

export const defaultInternalLinks: InternalLinkItem[] = [
  {
    href: "/menu",
    label: "Drink Menu",
    description: "Guinness, cold beer, imports, wine, non-alcoholic beer, and bar bites.",
  },
  {
    href: "/photos",
    label: "Photos",
    description: "See the bar, pool table, darts, Golden Tee, pinball, and patio.",
  },
  {
    href: "/contact",
    label: "Contact & Directions",
    description: "Address, hours, phone, directions, and free street parking info.",
  },
  {
    href: "/pool-tournament",
    label: "Pool Tournament",
    description: "Double-elimination 8-ball tournament rules at Malone's Pub.",
  },
];

export default function InternalLinkGrid({
  links = defaultInternalLinks,
  title = "Keep Exploring Malone's",
}: {
  links?: InternalLinkItem[];
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-white/10 bg-neutral-900/70 p-5 transition hover:border-green-400/50"
          >
            <div className="font-bold text-white">{link.label}</div>
            <p className="mt-2 text-sm leading-6 text-neutral-400">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
