import { Button } from "@/components/ui/Button";
import { jetTagline, jetHeroVideos } from "@/lib/jet";
import { HeroVideos } from "./JetVideo";

/* Hero de la page Jet privé : deux vidéos du client en fond (voir lib/jet.ts). */
export function JetHero() {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy text-ivory">
      <HeroVideos videos={jetHeroVideos} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-black/40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 md:px-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold [text-shadow:0_1px_10px_rgb(0_0_0/0.7)]">Jet privé</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-6xl">{jetTagline}</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/reserver?service=jet-prive" variant="gold" size="lg">Demander un devis jet</Button>
        </div>
      </div>
    </section>
  );
}
