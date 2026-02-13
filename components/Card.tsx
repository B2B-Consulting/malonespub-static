export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
