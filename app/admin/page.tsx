import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminApp } from "@/features/admin/AdminApp";

export const metadata: Metadata = { title: "Back-office", robots: { index: false, follow: false } };
/* Rendu à la demande pour que ADMIN_DISABLED soit lu à l'exécution (et non figé au build). */
export const dynamic = "force-dynamic";

export default function Page() {
  // Accès temporaire sans connexion. Mettre ADMIN_DISABLED=true pour fermer la page.
  if (process.env.ADMIN_DISABLED === "true") notFound();
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 font-serif text-4xl font-bold">Back-office</h1>
        <AdminApp />
      </div>
    </section>
  );
}
