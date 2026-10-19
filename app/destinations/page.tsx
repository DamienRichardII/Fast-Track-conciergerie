import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { destinationPhoto } from "@/lib/photos";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { destinations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Abidjan, Côte d'Ivoire et destinations internationales : séjours et prestations sur mesure avec Fast Track Conciergerie.",
  alternates: { canonical: "/destinations" },
};

function Group({ title, items }: { title: string; items: readonly { name: string; kind: string; text: string; tone: "sunset" | "sea" | "warm" | "night" }[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <Reveal><h2 className="mb-8 font-serif text-3xl font-bold md:text-4xl">{title}</h2></Reveal>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d, i) => (
          <li key={d.name}>
            <Reveal delay={(i % 3) * 0.08}>
              <article className="group overflow-hidden rounded-card bg-white shadow-soft">
                <Media photo={destinationPhoto[d.name]} alt={d.name} tone={d.tone} className="aspect-[16/10] transition duration-700 group-hover:scale-[1.02]" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-bronze">{d.kind}</p>
                  <h3 className="mt-1 font-serif text-2xl font-bold">{d.name}</h3>
                  <p className="mt-2 text-sm text-ink/70">{d.text}</p>
                  <Link href={`/reserver?destination=${encodeURIComponent(d.name)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-chocolate hover:text-bronze">
                    Planifier un séjour <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function DestinationsPage() {
  return (
    <>
      <PageHero title="Destinations" subtitle="Une expérience sur mesure à Abidjan et partout dans le monde." tone="sunset" photo="abidjan" />
      <Group title="Abidjan et Côte d'Ivoire" items={destinations.cote} />
      <Group title="À l'international" items={destinations.international} />
      <p className="mx-auto max-w-3xl px-4 pb-20 text-center text-sm text-ink/60">Les prestations sont proposées sur demande ; disponibilités et tarifs sont confirmés par notre équipe avant toute réservation.</p>
    </>
  );
}
