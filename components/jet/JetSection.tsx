import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JetSteps } from "./JetSteps";
import { jetIntro, jetTagline, jetHomeVideo } from "@/lib/jet";
import { LoopVideo } from "./JetVideo";

/* Section Jet privé de l'accueil : accroche, texte, bouton, vidéo et 3 encadrés. */
export function JetSection() {
  return (
    <section aria-labelledby="jet-t" className="mt-20 bg-navy py-16 text-ivory md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Jet privé</p>
            <h2 id="jet-t" className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">{jetTagline}</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/80 md:text-base">{jetIntro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/reserver?service=jet-prive" variant="gold">Demander un devis jet</Button>
              <Button href="/jet-prive" variant="outline" className="border-gold/60 text-gold hover:bg-white/5">Découvrir le jet privé</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-navy md:max-w-none">
              <LoopVideo v={jetHomeVideo} className="absolute inset-0 h-full w-full object-cover" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
        <div className="mt-10"><JetSteps /></div>
      </div>
    </section>
  );
}
