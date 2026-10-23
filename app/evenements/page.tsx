import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { events, eventLink } from "@/lib/events";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Événements du moment",
  description: "Matchs, concerts, sorties exclusives et bons plans en Afrique, avec places VIP sur demande.",
  alternates: { canonical: "/evenements" },
};

export default function EventsPage() {
  return (
    <>
      <PageHero title="Événements du moment" subtitle="Matchs, concerts, sorties exclusives : les bons plans de la semaine." tone="night" photo="abidjan" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e, i) => (
            <li key={e.slug}>
              <Reveal delay={i * 0.06} className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-soft">
                <div className="relative aspect-[4/3]">
                  <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-chocolate-deep">{e.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-serif text-xl font-bold">{e.title}</h2>
                  <p className="mt-1 text-xs font-semibold text-bronze">{e.date} · {e.place}</p>
                  <p className="mt-3 flex-1 text-sm text-ink/75">{e.blurb}</p>
                  <Button href={eventLink(e, site.whatsappHref)} target="_blank" rel="noopener noreferrer" size="md" className="mt-5">{e.cta}</Button>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-ink/60">Programme mis à jour régulièrement. Places et tarifs confirmés par notre équipe avant toute réservation.</p>
      </section>
    </>
  );
}
