import Card from "@/components/Card";
import Section from "@/components/Section";

const articleUrl =
  "https://www.fwweekly.com/2026/09/30/on-the-town-best-of-2026/";

export default function FortWorthWeeklyRecognition({
  variant = "home",
}: {
  variant?: "home" | "about";
}) {
  const isAbout = variant === "about";
  const Heading = isAbout ? "h3" : "h2";

  return (
    <Section title={isAbout ? "In the Press" : undefined}>
      <Card className="md:p-8">
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.4fr] md:gap-8">
          <div className="flex flex-col items-center justify-center border-b border-neutral-800 pb-6 text-center md:border-r md:border-b-0 md:pr-8 md:pb-0">
            <span aria-hidden="true" className="mb-4 h-px w-12 bg-green-300" />
            <p className="text-sm font-bold tracking-[0.16em] text-neutral-300">
              FORT WORTH WEEKLY
            </p>
            <p className="mt-3 font-black tracking-tight text-white">
              <span className="block text-xl">BEST OF</span>{" "}
              <span className="mt-1 block text-5xl">2026</span>
            </p>
            <p className="mt-4 text-sm font-semibold text-neutral-300">
              CRITIC’S CHOICE • TOP 3
            </p>
            <p className="mt-2 text-xl font-bold text-green-300">“BAR-BAR”</p>
          </div>

          <div className="min-w-0 self-center">
            <Heading className="text-2xl font-black tracking-tight text-white md:text-3xl">
              Officially venerable.
            </Heading>
            <figure className="mt-3">
              <blockquote cite={articleUrl} className="text-lg leading-7 text-neutral-100">
                <p>“A venerable, cozy, downtown classic.”</p>
              </blockquote>
              <figcaption className="mt-1 text-sm text-neutral-400">
                — Fort Worth Weekly
              </figcaption>
            </figure>
            <p className="mt-5 leading-7 text-neutral-300">
              We looked up “venerable.”
              <br />
              <span className="font-semibold text-green-300">
                Turns out it’s a compliment.
              </span>
            </p>
            <p className="mt-4 leading-7 text-neutral-300">
              Thank you to our bartenders and everyone who makes Malone’s feel like home.
            </p>
            {isAbout ? (
              <p className="mt-4 leading-7 text-neutral-300">
                We promise not to let this go to our heads. Our regulars would never allow it.
              </p>
            ) : null}
            <a
              href={articleUrl}
              className="mt-3 inline-block rounded-sm py-2 text-sm font-semibold !underline decoration-neutral-500 underline-offset-4 transition hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-300"
            >
              Read the Fort Worth Weekly feature <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Card>
    </Section>
  );
}
