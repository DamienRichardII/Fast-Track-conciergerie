import { Button } from "@/components/ui/Button";
import { jetTagline, jetHeroVideo } from "@/lib/jet";
import { LoopVideo } from "./JetVideo";

/* Hero de la page Jet privé. La vidéo du client est verticale :
   - mobile : plein écran, comme fournie ;
   - ordinateur : hero en deux parties, texte à gauche, vidéo pleine hauteur sur la moitié droite,
     fondue dans le fond (étirée sur toute la largeur, elle serait agrandie 4 fois et floue). */
export function JetHero() {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy text-ivory md:min-h-[92svh] md:items-center">
      <div aria-hidden className="absolute inset-0 md:hidden">
        <LoopVideo v={jetHeroVideo} className="h-full w-full object-cover" />
      </div>
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[52%] md:block">
        <LoopVideo v={jetHeroVideo} className="h-full w-full object-cover object-[50%_42%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-navy/70 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-black/40 md:hidden" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-8 md:py-36">
        <div className="md:max-w-[48%]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold [text-shadow:0_1px_10px_rgb(0_0_0/0.7)]">Jet privé</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl xl:text-6xl">{jetTagline}</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/reserver?service=jet-prive" variant="gold" size="lg">Demander un devis jet</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
