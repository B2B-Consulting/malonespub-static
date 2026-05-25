import type { Metadata } from "next";
import PoolTournamentPage from "@/app/pool-tournament/page";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Pool",
  description:
    "Pool at Malone's Pub in Downtown Fort Worth, including double-elimination 8-ball tournament rules, darts, Golden Tee, pinball, Guinness, and bar food.",
  alternates: { canonical: `${SITE_URL}/pool` },
};

export default function Page() {
  return <PoolTournamentPage />;
}
