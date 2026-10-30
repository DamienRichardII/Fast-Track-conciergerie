import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { hasDb } from "@/server/db/pool";
import { snapshot } from "@/server/admin/queries";
import { getExperiences } from "@/server/content/experiences";
import { AdminApp } from "@/features/admin/AdminApp";
import { LogoutButton } from "@/components/auth/LogoutButton";

export const metadata: Metadata = { title: "Back-office", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  const s = await getSession();
  if (!s || s.role !== "admin") redirect("/connexion");
  let initial = null;
  let error = "";
  if (!hasDb()) error = "La base de données n'est pas configurée (variable DATABASE_URL).";
  else {
    try { await getExperiences(); initial = await snapshot(); }
    catch (e) { console.error("[admin] snapshot", e); error = "Impossible de joindre la base de données."; }
  }
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-4xl font-bold">Back-office</h1>
          <LogoutButton className="text-sm font-semibold text-chocolate underline" />
        </div>
        {initial ? <AdminApp initial={initial} /> : <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      </div>
    </section>
  );
}
