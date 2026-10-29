import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Gallery } from "@/components/ui/Gallery";
import { Media } from "@/components/ui/Media";
import { activities } from "@/lib/gallery";

type Params = { activite: string };

export function generateStaticParams(): Params[] {
  return activities.map((a) => ({ activite: a.slug }));
}

export const dynamicParams = false;

const find = (slug: string) => activities.find((a) => a.slug === slug);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const a = find((await params).activite);
  return a ? { title: a.title, description: a.blurb, alternates: { canonical: `/activites-touristiques/${a.slug}` } } : {};
}

export default async function ActivityPage({ params }: { params: Promise<Params> }) {
  const a = find((await params).activite);
  if (!a) notFound();
  return (
    <>
      <section className="relative flex min-h-[60svh] items-end overflow-hidden text-ivory">
        <Media src={a.cover} alt={a.coverAlt ?? a.title} tone="night" priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 md:px-8">
          <Link href="/activites-touristiques" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"><ArrowLeft className="h-4 w-4" />Activités touristiques</Link>
          <h1 className="font-serif text-4xl font-bold md:text-6xl">{a.title}</h1>
        </div>
      </section>
      <div className="relative z-10 mx-auto -mt-12 max-w-6xl rounded-card bg-ivory px-4 py-10 text-center shadow-soft md:px-10">
        <p className="mx-auto max-w-2xl font-serif text-xl text-chocolate md:text-2xl">{a.blurb}</p>
        <div className="mt-8">
          <Button href="/reserver?service=activites-touristiques" size="lg">Réserver cette activité</Button>
          <p className="mt-3 text-xs text-ink/60">Prestation sur devis : notre équipe confirme disponibilité et tarif avant toute réservation.</p>
        </div>
      </div>
      {a.items.length > 0 && <Gallery title="Photos" items={a.items} />}
      <div className="h-20" />
    </>
  );
}
