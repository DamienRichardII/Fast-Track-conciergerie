import type { Metadata } from "next";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REF_PATTERN } from "@/server/requests/ref";
import { hasDb } from "@/server/db/pool";
import { payRow, syncCheckout } from "@/server/payments/store";
import { sumupConfigured } from "@/server/payments/sumup";

export const metadata: Metadata = { title: "Paiement", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const ERR: Record<string, string> = {
  limite: "Trop de tentatives. Réessayez dans quelques minutes.",
  indisponible: "Le paiement en ligne n'est pas disponible pour le moment. Contactez-nous.",
  introuvable: "Aucun paiement n'est attendu pour cette référence. Contactez-nous.",
  deja: "Cette réservation est déjà réglée. Merci !",
  erreur: "Le paiement n'a pas pu démarrer. Réessayez ou contactez-nous.",
};

export default async function Page({ params, searchParams }: { params: Promise<{ ref: string }>; searchParams: Promise<{ e?: string }> }) {
  const { ref } = await params;
  const { e } = await searchParams;
  let state: "paid" | "pending" | "failed" | "none" = "none";
  if (REF_PATTERN.test(ref) && hasDb() && sumupConfigured()) {
    try {
      let row = await payRow(ref);
      if (row?.checkoutId && row.status !== "paid") { await syncCheckout(row.checkoutId); row = await payRow(ref); }
      if (row?.status === "paid" || row?.status === "pending" || row?.status === "failed") state = row.status;
    } catch (err) { console.error("[payer/merci]", err); }
  }
  const view = {
    paid: { Icon: CheckCircle2, title: "Paiement reçu", text: "Merci ! Votre paiement est bien enregistré. Notre équipe revient vers vous pour la suite.", color: "text-green-700" },
    pending: { Icon: Clock, title: "Paiement en cours de validation", text: "Nous attendons la confirmation de SumUp. Cette page se met à jour dès qu'elle arrive ; vous pouvez la recharger dans une minute.", color: "text-chocolate" },
    failed: { Icon: XCircle, title: "Paiement non abouti", text: "Le paiement n'a pas été validé. Vous pouvez réessayer avec le même lien ou nous contacter.", color: "text-red-700" },
    none: { Icon: Clock, title: "Paiement", text: (e && ERR[e]) || "Nous n'avons pas pu retrouver ce paiement. Contactez-nous avec votre référence.", color: "text-chocolate" },
  }[state];
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:pt-40">
      <div className="mx-auto max-w-xl rounded-card bg-white p-8 text-center shadow-soft">
        <view.Icon className={`mx-auto h-12 w-12 ${view.color}`} aria-hidden />
        <h1 className="mt-4 font-serif text-3xl font-bold">{view.title}</h1>
        <p className="mt-3 text-ink/70">{view.text}</p>
        <p className="mt-2 text-sm text-ink/50">Référence : {ref}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {(state === "failed" || e === "erreur") && <Button href={`/payer/${ref}`} size="sm">Réessayer le paiement</Button>}
          <Button href="/" size="sm" variant="outline">Retour à l&apos;accueil</Button>
        </div>
      </div>
    </section>
  );
}
