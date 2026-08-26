import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/pool-tournaments/AdminDashboard";
import { isPoolAdminAuthenticated } from "@/lib/pool-tournaments/auth";
import { listRegistrations, listTournaments } from "@/lib/pool-tournaments/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pool Tournament Admin", robots: { index: false, follow: false, noarchive: true } };

export default async function PoolTournamentAdminPage() {
  if (!(await isPoolAdminAuthenticated())) redirect("/admin/pool-tournaments/login");
  const tournaments = await listTournaments();
  const registrations = Object.fromEntries(await Promise.all(tournaments.map(async ({ id }) => [id, await listRegistrations(id)])));
  return <AdminDashboard initialTournaments={tournaments} initialRegistrations={registrations} />;
}
