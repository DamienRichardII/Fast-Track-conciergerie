import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { FlightLayer } from "./FlightLayer";
import { WORLD } from "@/lib/mapData";
import { flightRoutes } from "@/lib/flights";
import { jetTagline, jetVideo } from "@/lib/jet";

/* Hero de la page Jet privé. Avec une vidéo (voir lib/jet.ts) : lecture en boucle, comme le hero des expériences.
   Sans vidéo : photo en lent zoom, reflet lumineux et trajets d'avions animés sur le planisphère. */
export function JetHero() {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy text-ivory">
      {jetVideo ? (
        <div aria-hidden className="absolute inset-0">
          <video autoPlay muted loop playsInline preload="auto" poster={jetVideo.poster ?? "/images/jet.jpg"} className="h-full w-full object-cover motion-reduce:hidden">
            {jetVideo.mobile && <source src={jetVideo.mobile} type="video/mp4" media="(max-width: 767px)" />}
            <source src={jetVideo.wide} type="video/mp4" />
          </video>
          <div className="hidden h-full w-full bg-cover bg-center motion-reduce:block" style={{ backgroundImage: `url(${jetVideo.poster ?? "/images/jet.jpg"})` }} />
        </div>
      ) : (
        <>
          <Media photo="jet" alt="" priority className="kenburns absolute inset-0" />
          <svg viewBox="0 20 1000 440" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 h-full w-full opacity-50 md:opacity-70">
            <path d={WORLD.path} fill="none" className="stroke-ivory/15" strokeWidth={0.5} />
            <FlightLayer routes={flightRoutes} idPrefix="hero" scale={1.5} />
          </svg>
          <div aria-hidden className="light-sweep pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </>
      )}
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
