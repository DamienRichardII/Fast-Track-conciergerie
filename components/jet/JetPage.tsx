import { JetHero } from "./JetHero";
import { JetSteps } from "./JetSteps";
import { JetGallery } from "./JetGallery";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { jetIntro } from "@/lib/jet";

/* Page /jet-prive : hero dynamique, texte validé, 3 encadrés et appel à l'action. */
export function JetPage() {
  return (
    <>
      <JetHero />
      <section className="bg-navy pb-16 text-ivory">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-xl leading-relaxed text-ivory/90 md:text-2xl">{jetIntro}</p>
          </Reveal>
          <div className="mt-12"><JetSteps /></div>
        </div>
      </section>
      <JetGallery />
      <section className="bg-navy pb-24 pt-10 text-ivory">
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <Button href="/reserver?service=jet-prive" variant="gold" size="lg">Demander un devis jet</Button>
          <p className="mt-3 text-xs text-ivory/60">Prestation sur devis : notre équipe confirme disponibilité et tarif avant toute réservation.</p>
        </Reveal>
      </section>
    </>
  );
}
