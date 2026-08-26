import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/pool-tournaments/AdminLoginForm";
import { isPoolAdminAuthenticated, isPoolAdminConfigured } from "@/lib/pool-tournaments/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Tournament Admin Sign In", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isPoolAdminAuthenticated()) redirect("/admin/pool-tournaments");
  return <section className="px-4 py-20"><AdminLoginForm configured={isPoolAdminConfigured()} /></section>;
}
