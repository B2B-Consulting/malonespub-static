import { SITE_URL } from "@/lib/business";
import type { SeoLandingPage as SeoLandingPageData } from "@/lib/seoPages";
import CallToActionBar from "@/components/CallToActionBar";
import InternalLinkGrid, { defaultInternalLinks } from "@/components/InternalLinkGrid";
import LocalBusinessCard from "@/components/LocalBusinessCard";
import SeoFaq from "@/components/SeoFaq";
import SeoPageHero from "@/components/SeoPageHero";

export default function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const relatedLinks = defaultInternalLinks.filter((link) =>
    page.related.includes(link.href.replace("/", ""))
  );
  const links = relatedLinks.length ? relatedLinks : defaultInternalLinks;

  return (
    <>
      <SeoPageHero
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={page.intro}
        image={page.image}
        imageAlt={page.imageAlt}
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-black text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-neutral-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="space-y-4">
          <LocalBusinessCard />
          <CallToActionBar label="Ready for a drink?" />
        </div>
      </section>

      <SeoFaq
        faqs={page.faqs}
        title={`${page.title} FAQ`}
        pageUrl={`${SITE_URL}/${page.slug}`}
      />
      <InternalLinkGrid links={links} title="Related Malone's Pages" />
    </>
  );
}
