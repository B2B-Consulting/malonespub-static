import FaqSchema from "@/components/FaqSchema";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function SeoFaq({
  faqs,
  title = "FAQ",
  pageUrl,
}: {
  faqs: FaqItem[];
  title?: string;
  pageUrl?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {pageUrl ? <FaqSchema faqs={faqs} pageUrl={pageUrl} /> : null}
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-lg border border-white/10 bg-neutral-900/70 p-5">
            <h3 className="font-bold text-white">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
