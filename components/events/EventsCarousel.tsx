import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { events, type EventItem } from "@/lib/events";

/* Filet aux couleurs de la Côte d'Ivoire, volontairement discret. */
const Tricolor = ({ className = "" }: { className?: string }) => (
  <span aria-hidden className={`flex h-[3px] overflow-hidden rounded-full ${className}`}>
    <span className="flex-1 bg-ci-orange" /><span className="flex-1 bg-white" /><span className="flex-1 bg-ci-green" />
  </span>
);

function Card({ e, dup }: { e: EventItem; dup?: boolean }) {
  return (
    <li className={dup ? "marquee-dup" : undefined} {...(dup ? { "aria-hidden": true, inert: true } : {})}>
      <Link href="/evenements" tabIndex={dup ? -1 : undefined}
        className="group relative block aspect-[4/5] w-60 overflow-hidden rounded-card ring-1 ring-gold/25 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] transition duration-500 hover:-translate-y-1 hover:ring-gold/60 sm:w-72">
        <Image src={e.image} alt="" fill sizes="288px" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep via-chocolate-deep/30 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/50 bg-black/40 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-md">{e.tag}</span>
        <div className="absolute inset-x-5 bottom-5 text-ivory">
          <Tricolor className="mb-3 w-10" />
          <h3 className="font-serif text-xl font-bold leading-tight">{e.title}</h3>
          <p className="mt-1 text-xs text-ivory/70">{e.date} · {e.place}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold opacity-90 transition group-hover:gap-2">Découvrir <ArrowRight className="h-3.5 w-3.5" /></span>
        </div>
      </Link>
    </li>
  );
}

const ticker = ["Places VIP sur demande", "Match Côte d'Ivoire – France", "Concerts du moment", "Rolex : pièce rare", "Feu d'artifice en VIP", "Bons plans Fast Track"];

/* Bande fine qui défile dans le sens inverse des cartes. */
function Ticker() {
  const row = (dup?: boolean) => (
    <ul className="ticker-row" {...(dup ? { "aria-hidden": true } : {})}>
      {ticker.map((t, i) => (
        <li key={t} className="flex items-center gap-6">
          <span>{t}</span>
          <span className={`h-1.5 w-1.5 rotate-45 ${i % 3 === 0 ? "bg-ci-orange" : i % 3 === 1 ? "bg-white" : "bg-ci-green"}`} />
        </li>
      ))}
    </ul>
  );
  return (
    <div role="note" aria-label="Promotions et événements du moment" className="ticker border-y border-gold/25 bg-black/25 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold sm:text-xs">
      <div className="ticker-track">{row()}{row(true)}</div>
    </div>
  );
}

/* Défile tout seul : le visiteur n'a rien à faire. Pause au survol ; sans animation si « réduire les animations ». */
export function EventsCarousel() {
  return (
    <section aria-label="Événements et bons plans" className="relative mt-16 overflow-hidden bg-chocolate-deep py-14 text-ivory md:py-20">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Sélection Fast Track</p>
            <Tricolor className="mt-3 w-14" />
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-5xl">Événements &amp; bons plans</h2>
            <p className="mt-2 text-sm text-ivory/70">Les rendez-vous du moment, avec places VIP sur demande.</p>
          </div>
          <Link href="/evenements" className="hidden shrink-0 items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-chocolate-deep sm:inline-flex">Tout voir <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <Ticker />
      <div className="marquee marquee-fade relative mx-auto mt-8 max-w-[120rem] px-4 py-3">
        <ul className="marquee-track">
          {events.map((e) => <Card key={e.slug} e={e} />)}
          {events.map((e) => <Card key={`d-${e.slug}`} e={e} dup />)}
        </ul>
      </div>
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:hidden">
        <Link href="/evenements" className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold">Tout voir <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
