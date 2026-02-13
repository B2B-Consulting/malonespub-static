export default function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      {title ? <h2 className="mb-5 text-2xl font-semibold tracking-tight">{title}</h2> : null}
      {children}
    </section>
  );
}
