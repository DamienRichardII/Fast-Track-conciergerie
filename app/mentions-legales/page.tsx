import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <LegalPage title="Mentions légales" updated="19 octobre 2026" sections={[
      { title: "Éditeur du site", body: [
        "Fast Track Conciergerie — Abidjan, Côte d'Ivoire.",
        "Raison sociale et forme juridique : [À compléter]. Numéro RCCM / identifiant fiscal : [À compléter]. Adresse du siège : [À compléter].",
        `Directeur de la publication : [À compléter]. Contact : ${site.email} — ${site.phone}.`] },
      { title: "Hébergement", body: ["Le site est hébergé par Vercel Inc. (États-Unis). Les données applicatives pourront être hébergées par un prestataire de base de données : [À compléter]."] },
      { title: "Propriété intellectuelle", body: ["L'ensemble des contenus du site (textes, logo, visuels) est protégé. Toute reproduction sans autorisation écrite préalable est interdite."] },
      { title: "Responsabilité", body: ["Les informations du site sont données à titre indicatif. Les prestations sont proposées sur demande, sous réserve de disponibilité et de confirmation écrite par l'équipe."] },
      { title: "Données personnelles", body: ["Voir la politique de confidentialité."] },
    ]} />
  );
}
