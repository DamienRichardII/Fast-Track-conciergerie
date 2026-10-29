import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { activities } from "@/lib/gallery";

export function ActivityGrid({ slugs, heading = "Nos expériences" }: { slugs?: string[]; heading?: string | null } = {}) {
  const list = slugs ? activities.filter((a) => slugs.includes(a.slug)) : activities;
  return (
    <section className={heading ? "mx-auto max-w-7xl px-4 py-16 md:px-8" : "mx-auto max-w-7xl px-4 md:px-8"} aria-label="Nos expériences">
      {heading && <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">{heading}</h2>}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => {
          return (
            <li key={a.slug}>
              <Link href={`/activites-touristiques/${a.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
                {a.cover ? (
                  <Image src={a.cover} alt={a.coverAlt ?? a.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#14202b] via-[#3b2a20] to-[#8a5a2b]" />
                )}
                {a.duration && <span className="absolute left-3 top-3 rounded-full border border-gold/50 bg-black/40 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-md">{a.duration} · Sur devis</span>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                  <h3 className="font-serif text-2xl font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm text-ivory/85">{a.blurb}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold">Découvrir <ArrowRight className="h-4 w-4" /></p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
