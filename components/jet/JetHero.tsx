import { Button } from "@/components/ui/Button";
import { jetTagline, jetHeroVideo } from "@/lib/jet";
import { LoopVideo } from "./JetVideo";

/* Hero de la page Jet privé. La vidéo du client est verticale :
   - mobile : plein écran, comme fournie ;
   - ordinateur : la même vidéo, floutée, en fond, et la vidéo nette dans un cadre vertical à droite
     (étirée sur toute la largeur, une vidéo verticale de 480 px serait agrandie 4 fois et illisible). */
export function JetHero() {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy text-ivory">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <LoopVideo v={jetHeroVideo} className="h-full w-full object-cover md:scale-125 md:opacity-90 md:blur-xl md:saturate-150" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-black/40 md:via-navy/25 md:to-navy/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:px-8 md:pt-36">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold [text-shadow:0_1px_10px_rgb(0_0_0/0.7)]">Jet privé</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-6xl">{jetTagline}</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/reserver?service=jet-prive" variant="gold" size="lg">Demander un devis jet</Button>
          </div>
        </div>
        <div aria-hidden className="relative hidden aspect-[480/816] h-[min(62svh,560px)] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50 md:block">
          <LoopVideo v={jetHeroVideo} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
