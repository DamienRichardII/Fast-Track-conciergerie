import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { galleries } from "@/lib/gallery";
import { servicePhoto } from "@/lib/photos";
import { services, sharedGroup } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: sharedGroup.title,
  description: "Shopping de luxe, montres, villas, voiture avec chauffeur, restaurants, jet privé, barber et chef à domicile : dites-nous ce qu'il vous faut, nous vous faisons une proposition.",
  alternates: { canonical: sharedGroup.path },
};

export default function ConciergeriePage() {
  const items = sharedGroup.members.map((m) => services.find((s) => s.slug === m)!);
  return (
    <>
      <PageHero title={sharedGroup.title} subtitle="Pour tout ce qui ne rentre pas dans une case." tone="night" photo="shopping" />
      <section className="mx-auto max-w-3xl px-4 pt-16 text-center md:px-8">
        <Reveal>
          <p className="font-serif text-xl text-chocolate md:text-2xl">Un achat de luxe, une villa, un chauffeur, une réservation difficile : vous nous dites ce qu&apos;il vous faut, nous vous faisons une proposition.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/reserver" size="lg">Faire une demande</Button>
            <a href={`${site.whatsappHref}?text=${encodeURIComponent("Bonjour Fast Track Conciergerie, j'ai une demande particulière : ")}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-bronze px-8 text-sm font-semibold text-chocolate transition hover:bg-champagne/40"><MessageCircle className="h-4 w-4" />Écrire sur WhatsApp</a>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 4) * 0.08}>
                <Link href={s.path} className="group relative block aspect-[4/5] overflow-hidden rounded-card shadow-soft">
                  <Media src={galleries[s.slug]?.cover} photo={galleries[s.slug] ? undefined : servicePhoto[s.slug]} alt={s.title} tone="night" className="absolute inset-0 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <h2 className="font-serif text-xl font-bold leading-tight">{s.short}</h2>
                    <p className="mt-1 line-clamp-2 text-xs text-white/80">{s.intro}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold transition group-hover:gap-2">Voir <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
