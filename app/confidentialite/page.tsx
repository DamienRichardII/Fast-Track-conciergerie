import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" updated="19 octobre 2026" sections={[
      { title: "Responsable du traitement", body: [`Fast Track Conciergerie, [identité juridique à compléter]. Contact : ${site.email}.`] },
      { title: "Données collectées", body: ["Via les formulaires de demande et de contact : nom, adresse email, numéro de téléphone (facultatif), contenu de votre demande (dates, préférences, message). Nous ne collectons aucune donnée bancaire sur ce site à ce stade."] },
      { title: "Finalités et base légale", body: ["Vos données servent uniquement à répondre à votre demande, établir une proposition et assurer le suivi de la prestation. Base : votre consentement et l'exécution de mesures précontractuelles."] },
      { title: "Destinataires", body: ["L'équipe Fast Track Conciergerie et nos prestataires techniques (hébergement, envoi d'emails, base de données), qui n'agissent que sur nos instructions. Nous ne vendons pas vos données."] },
      { title: "Durée de conservation", body: ["[À compléter : durée à définir par l'exploitant]."] },
      { title: "Vos droits", body: [`Vous pouvez demander l'accès, la rectification ou la suppression de vos données, ou retirer votre consentement, en écrivant à ${site.email}. Selon votre lieu de résidence, vous pouvez saisir l'autorité de protection des données compétente (en Côte d'Ivoire : l'ARTCI, loi n° 2013-450 ; dans l'Union européenne : votre autorité nationale, RGPD).`] },
      { title: "Cookies", body: ["Le site n'utilise pas de cookies publicitaires. Si des outils de mesure d'audience sont ajoutés, cette page sera mise à jour."] },
    ]} />
  );
}
