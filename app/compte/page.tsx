import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { hasDb, db } from "@/server/db/pool";
import { userRequests } from "@/server/admin/queries";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Espace client", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "—");

export default async function Page() {
  const s = await getSession();
  if (!s) redirect("/connexion");
  if (s.role === "admin") redirect("/admin");
  let rows: Awaited<ReturnType<typeof userRequests>> = [];
  let error = false;
  if (hasDb()) {
    try {
      const u = await db().query("SELECT email FROM users WHERE id=$1", [s.uid]);
      if (!u.rows[0]) redirect("/connexion");
      rows = await userRequests(s.uid, u.rows[0].email);
    } catch (e) { if (e && typeof e === "object" && "digest" in e) throw e; console.error("[compte]", e); error = true; }
  }
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-4xl font-bold">Bonjour, {s.name.split(" ")[0]}</h1>
          <LogoutButton className="text-sm font-semibold text-chocolate underline" />
        </div>
        <div className="rounded-card bg-white p-5 shadow-soft md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">Mes demandes</h2>
            <Button href="/reserver" size="sm">Nouvelle demande</Button>
          </div>
          {error && <p role="alert" className="mt-4 text-sm text-red-700">Impossible de charger vos demandes pour le moment.</p>}
          {!error && rows.length === 0 && <p className="mt-4 text-sm text-ink/60">Vous n&apos;avez pas encore de demande. <Link href="/reserver" className="font-semibold text-chocolate underline">Faire une demande</Link></p>}
          <ul className="mt-4 divide-y divide-champagne">
            {rows.map((r) => (
              <li key={r.ref} className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
                <span><span className="block font-medium">{r.service}</span><span className="text-ink/60">{r.ref} · reçue le {fmt(r.createdAt)}{r.startDate ? ` · pour le ${fmt(r.startDate)}` : ""}</span></span>
                <span className="rounded-full bg-champagne/70 px-3 py-1 text-xs font-semibold text-chocolate">{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
