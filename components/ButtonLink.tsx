import Link from "next/link";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold " +
    "transition focus:outline-none focus:ring-2 focus:ring-white/40 shadow-md active:translate-y-px " +
    "select-none";

  // Force text colors so nothing can override them
  const primaryStyles =
    "bg-white/95 hover:bg-white !text-black !fill-black border border-black/10";

  const ghostStyles =
    "bg-black/45 hover:bg-black/60 border border-white/35 !text-white !fill-white";

  const styles = variant === "primary" ? primaryStyles : ghostStyles;

  const className = `${base} ${styles} no-underline`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}




