import type { Metadata } from "next";
import Soccer2026Page from "@/app/soccer-2026/Soccer2026Page";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "2026 Soccer Tournament Viewing in Fort Worth",
  description:
    "Watch 2026 international soccer matches at Malone's Pub in Downtown Fort Worth. Cold beer, Guinness, pool, darts, Golden Tee, pinball, bar bites, and a laid-back pub crowd near Sundance Square.",
  keywords: [
    "watch soccer Fort Worth",
    "soccer bar Fort Worth",
    "where to watch soccer in Fort Worth",
    "watch soccer downtown Fort Worth",
    "2026 soccer tournament Fort Worth bar",
    "watch USA soccer games Fort Worth",
    "watch Mexico soccer games Fort Worth",
    "watch England soccer games Fort Worth",
  ],
  alternates: { canonical: `${SITE_URL}/soccer-2026` },
  openGraph: {
    title: "2026 Soccer Tournament Viewing in Fort Worth | Malone's Pub",
    description:
      "Malone's Pub is a Downtown Fort Worth bar for watching major international soccer matches with Guinness, cold beer, bar bites, pool, darts, Golden Tee, and pinball.",
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
