import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ExperienceList } from "@/components/experiences/ExperienceList";
import { getExperiences } from "@/server/content/experiences";
import { StayCta } from "@/components/home/StayCta";
import { HotelsPage } from "@/components/hotels/HotelsPage";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/services";

type Params = { service: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ service: s.path.slice(1) }));
}

export const dynamicParams = false;
export const revalidate = 60;

const find = (slug: string) => services.find((s) => s.path === `/${slug}`);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const s = find((await params).service);
  return s ? { title: s.title, description: s.intro, alternates: { canonical: s.path } } : {};
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const s = find((await params).service);
  if (!s) notFound();
  if (s.slug === "hotels") return <HotelsPage />;
  const Icon = s.icon;

  return (
    <>
      <section className="relative flex min-h-[60svh] items-end overflow-hidden text-ivory">
        {/* Vidéo pour les expériences ; ailleurs, fond sobre sans photo (hôtels et conciergerie : demande client). */}
        {s.slug === "activites-touristiques" ? <HeroVideo /> : <Media alt={s.title} tone="night" className="absolute inset-0" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <h1 className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 font-serif text-4xl font-bold md:px-8 md:text-6xl">{s.title}</h1>
      </section>

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl rounded-card bg-ivory px-4 py-10 shadow-soft md:px-10">
        <p className="mx-auto max-w-2xl text-center font-serif text-xl text-chocolate md:text-2xl">{s.intro}</p>
        <ul className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {s.atouts.map((a, i) => (
            <li key={a}>
              <Reveal delay={i * 0.06} className="flex flex-col items-center gap-3 text-center text-sm font-semibold text-chocolate">
                <Icon className="h-9 w-9 stroke-[1.2] text-bronze" />
                {a}
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Button href={`/reserver?service=${s.slug}`} size="lg">{s.cta}</Button>
          <p className="mt-3 text-xs text-ink/60">
            {s.mode === "QUOTE" ? "Prestation sur devis : notre équipe confirme disponibilité et tarif avant toute réservation." : ""}
          </p>
        </div>
      </div>
      {s.slug === "activites-touristiques" && <ExperienceList list={await getExperiences()} />}
      {s.slug === "activites-touristiques" && <StayCta />}
      <div className="h-20" />
    </>
  );
}
