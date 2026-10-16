import Image from "next/image";
import Link from "next/link";
import wordmark from "@/public/images/brand/malones-pub-wordmark-white.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/pool-tournament", label: "Pool" },
  { href: "/darts-tournament", label: "Darts" },
  { href: "/photos", label: "Photos" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link
          href="/"
          aria-label="Malone’s Pub — Home"
          className="flex min-h-9 w-36 shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-44"
        >
          <Image
            src={wordmark}
            alt=""
            className="block h-auto w-full"
            loading="eager"
            unoptimized
          />
        </Link>

        <nav className="flex min-w-0 items-center gap-4 overflow-x-auto text-sm text-neutral-300 sm:gap-5">
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
