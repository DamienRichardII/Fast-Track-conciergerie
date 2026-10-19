import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Conditions générales de vente", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <LegalPage title="Conditions générales de vente" updated="19 octobre 2026" sections={[
      { title: "Objet", body: ["Les présentes conditions encadrent les prestations de conciergerie proposées par Fast Track Conciergerie (jet privé, villas, hôtels, location de voiture, restaurants, activités, shopping, montres de luxe)."] },
      { title: "Demandes et devis", body: ["Les prestations sont proposées sur demande. L'envoi d'une demande en ligne ne constitue pas une réservation : disponibilité et tarif sont confirmés par un devis. La prestation est conclue à l'acceptation écrite du devis par le client."] },
      { title: "Prix et paiement", body: ["Les prix figurent au devis, dans la devise indiquée. Un acompte de [À compléter] % peut être demandé ; le solde est exigible [À compléter]. Moyens de paiement acceptés : [À compléter]."] },
      { title: "Modification et annulation", body: ["Conditions de modification, d'annulation et de remboursement : [À compléter]. Elles peuvent varier selon les partenaires et sont précisées au devis."] },
      { title: "Responsabilité", body: ["Fast Track Conciergerie agit comme intermédiaire auprès de ses partenaires. Sa responsabilité est définie par la loi applicable : [À compléter]."] },
      { title: "Droit applicable et litiges", body: [`Droit applicable et juridiction compétente : [À compléter]. Pour toute réclamation : ${site.email}.`] },
    ]} />
  );
}
