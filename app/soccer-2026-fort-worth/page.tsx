import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { getSeoPage } from "@/lib/seoPages";
import { SITE_URL } from "@/lib/business";

const page = getSeoPage("soccer-2026-fort-worth");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: `${SITE_URL}/${page.slug}` },
};

export default function Page() {
  return <SeoLandingPage page={page} />;
}
