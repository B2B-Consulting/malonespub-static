import type { Metadata } from "next";
import WorldCupPage from "@/app/world-cup/page";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Soccer 2026",
  description:
    "2026 soccer viewing at Malone's Pub in Downtown Fort Worth with Guinness, cold beer, bar bites, pool, darts, Golden Tee, pinball, and a local pub crowd.",
  alternates: { canonical: `${SITE_URL}/soccer-2026` },
};

export default function Page() {
  return <WorldCupPage />;
}
