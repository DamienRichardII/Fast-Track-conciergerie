import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Paiement", robots: { index: false, follow: false } };

/** Ancienne page de démonstration : le paiement se fait désormais par lien SumUp envoyé après devis (voir /compte). */
export default function Page() {
  redirect("/compte");
}
