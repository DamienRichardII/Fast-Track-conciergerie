import { Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JetSteps } from "./JetSteps";
import { jetIntro, jetTagline } from "@/lib/jet";

/* Section Jet privé de l'accueil : accroche, texte, bouton, illustration animée et 3 encadrés. */
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1b2c3d] via-[#26384f] to-[#3a3f5c]">
              <svg viewBox="0 0 400 300" aria-hidden className="absolute inset-0 h-full w-full">
                <path id="jet-home-arc" d="M40,230 Q200,20 360,200" fill="none" className="flight-trail stroke-gold/60" strokeWidth="1.5" strokeDasharray="4 7" strokeLinecap="round" />
                <circle cx="40" cy="230" r="5" className="fill-gold" /><circle cx="360" cy="200" r="5" className="fill-gold" />
                <g className="flight-plane">
                  <path d="M16 0 L2 -3.2 L-6 -12 L-8.8 -12 L-5.2 -2.8 L-13 -2.4 L-15.2 -6 L-17.6 -6 L-15.6 0 L-17.6 6 L-15.2 6 L-13 2.4 L-5.2 2.8 L-8.8 12 L-6 12 L2 3.2 Z" className="fill-gold" stroke="#14202b" strokeWidth="0.6">
                    <animateMotion dur="8s" repeatCount="indefinite" rotate="auto"><mpath href="#jet-home-arc" /></animateMotion>
                  </path>
                </g>
              </svg>
              <Plane aria-hidden className="absolute bottom-4 right-4 h-8 w-8 stroke-[1.2] text-gold/40 motion-reduce:text-gold" />
              <div className="light-sweep pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </Reveal>
        </div>
        <div className="mt-10"><JetSteps /></div>
      </div>
    </section>
  );
}
