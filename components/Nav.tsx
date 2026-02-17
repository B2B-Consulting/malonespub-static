import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/photos", label: "Photos" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/40 backdrop-blur">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="no-underline">
          <div className="font-semibold tracking-tight">Malone’s Pub</div>
          <div className="text-xs text-neutral-400">Downtown Fort Worth</div>
        </Link>

        <nav className="hidden gap-5 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-neutral-200 hover:text-white no-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden text-xs text-neutral-400">Menu →</div>
      </div>

      <div className="md:hidden border-t border-neutral-900">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-1 px-2 py-2">
          {links.slice(0, 6).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg border border-neutral-900 px-2 py-2 text-center text-xs text-neutral-200 no-underline hover:bg-neutral-900"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
