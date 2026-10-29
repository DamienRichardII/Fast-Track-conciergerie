import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { servicePhoto } from "@/lib/photos";
import { services, sharedGroup } from "@/lib/services";

export const metadata: Metadata = {
  title: sharedGroup.title,
  description: "Shopping sur mesure en Europe, montres de luxe, barber et chef cuisine à domicile : un seul interlocuteur pour vos demandes sur mesure.",
  alternates: { canonical: sharedGroup.path },
};

export default function SharedGroupPage() {
  const items = sharedGroup.members.map((m) => services.find((s) => s.slug === m)!);
  return (
    <>
      <PageHero title={sharedGroup.title} subtitle="Shopping, montres, barber, chef à domicile : un seul interlocuteur." tone="night" photo="shopping" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 0.08}>
                <Link href={s.path} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
                  <Media photo={servicePhoto[s.slug]} alt={s.title} tone="night" className="absolute inset-0 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                    <span className="font-semibold">{s.short}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-chocolate-deep transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
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
