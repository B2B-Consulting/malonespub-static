import type { Metadata } from "next";
import Soccer2026Page from "@/app/soccer-2026/Soccer2026Page";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "2026 International Soccer Watch Parties",
  description:
    "Watch 2026 international soccer matches at Malone's Pub in downtown Fort Worth. Opening early for select morning matches before normal hours. No official affiliation with FIFA or tournament organizers.",
  keywords: [
    "watch soccer Fort Worth",
    "soccer bar Fort Worth",
    "where to watch soccer in Fort Worth",
    "watch soccer downtown Fort Worth",
    "2026 international soccer Fort Worth bar",
    "Fort Worth soccer bar",
    "sports bar downtown Fort Worth",
    "pub showing soccer matches Fort Worth",
    "watch USA soccer games Fort Worth",
    "watch Mexico soccer games Fort Worth",
    "watch England soccer games Fort Worth",
  ],
  alternates: { canonical: `${SITE_URL}/soccer-2026` },
  openGraph: {
    title: "2026 International Soccer Watch Parties | Malone's Pub Fort Worth",
    description:
      "Watch 2026 international soccer matches at Malone's Pub in downtown Fort Worth. Opening early for select morning matches before normal hours.",
    url: `${SITE_URL}/soccer-2026`,
    siteName: "Malone's Pub",
    type: "website",
    images: [
      {
        url: "/photos/inside.webp",
        width: 1200,
        height: 630,
        alt: "Interior of Malone's Pub in Downtown Fort Worth",
      },
    ],
  },
};

export default function Page() {
  return <Soccer2026Page />;
}
