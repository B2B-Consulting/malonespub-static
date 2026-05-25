import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/pool-tournament", label: "Pool" },
  { href: "/world-cup", label: "Soccer 2026" },
  { href: "/photos", label: "Photos" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="shrink-0 font-semibold tracking-tight text-neutral-100">
          Malone&apos;s Pub
        </Link>

        <nav className="flex items-center gap-4 overflow-x-auto text-sm text-neutral-300 sm:gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
