import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { events, type EventItem } from "@/lib/events";

function Card({ e, dup }: { e: EventItem; dup?: boolean }) {
  return (
    <li className={dup ? "marquee-dup" : undefined} {...(dup ? { "aria-hidden": true, inert: true } : {})}>
      <Link href="/evenements" tabIndex={dup ? -1 : undefined} className="group relative block aspect-[4/5] w-60 overflow-hidden rounded-card shadow-soft sm:w-72">
        <Image src={e.image} alt="" fill sizes="288px" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-chocolate-deep">{e.tag}</span>
        <div className="absolute inset-x-4 bottom-4 text-ivory">
          <h3 className="font-serif text-xl font-bold leading-tight">{e.title}</h3>
          <p className="mt-1 text-xs text-ivory/80">{e.date} · {e.place}</p>
        </div>
      </Link>
    </li>
  );
}

/* Défile tout seul : le visiteur n'a rien à faire. Pause au survol ; sans animation si « réduire les animations ». */
export function EventsCarousel() {
  return (
    <section aria-label="Événements et bons plans" className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Événements &amp; bons plans</h2>
          <p className="mt-1 text-sm text-ink/70">Les rendez-vous du moment, avec places VIP sur demande.</p>
        </div>
        <Link href="/evenements" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-bronze hover:underline sm:inline-flex">Tout voir <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="marquee -mx-4 px-4 py-2 md:mx-0 md:px-0">
        <ul className="marquee-track">
          {events.map((e) => <Card key={e.slug} e={e} />)}
          {events.map((e) => <Card key={`d-${e.slug}`} e={e} dup />)}
        </ul>
      </div>
      <Link href="/evenements" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-bronze hover:underline sm:hidden">Tout voir <ArrowRight className="h-4 w-4" /></Link>
    </section>
  );
}
