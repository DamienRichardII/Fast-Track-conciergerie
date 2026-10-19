import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { Media } from "@/components/ui/Media";

export const metadata: Metadata = { title: "Paiement", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 font-serif text-4xl font-bold">Paiement sécurisé</h1>
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <fieldset disabled className="space-y-4 rounded-card bg-white p-6 opacity-80 shadow-soft">
            <legend className="mb-2 flex items-center gap-2 font-serif text-xl font-bold"><Lock className="h-5 w-5" />Paiement sécurisé</legend>
            <p className="text-sm font-semibold">Carte bancaire · Mobile money (selon prestataire)</p>
            {["Nom sur la carte", "Numéro de carte", "Date d'expiration", "Code de sécurité"].map((l) => (
              <div key={l}><span className="block text-sm text-ink/60">{l}</span><div className="mt-1 h-11 rounded-xl border border-champagne bg-ivory" /></div>
            ))}
          </fieldset>
          <aside className="space-y-4 rounded-card bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl font-bold">Votre réservation</h2>
            <div className="flex gap-4"><Media alt="" tone="sea" className="h-20 w-24 shrink-0 rounded-xl" />
              <div><p className="font-semibold">Villa Riviera — Abidjan</p><p className="text-sm text-ink/60">14 – 16 novembre 2026</p></div></div>
            <p className="flex justify-between border-t border-champagne pt-4 font-semibold"><span>Total</span><span>Montant à confirmer par devis</span></p>
            <button type="button" disabled className="btn-gradient w-full rounded-full px-6 py-4 text-sm font-semibold text-ivory opacity-60">Payer (indisponible)</button>
          </aside>
        </div>
      </div>
    </section>
  );
}
