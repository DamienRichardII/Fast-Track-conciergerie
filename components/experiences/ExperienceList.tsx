import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { experiences as defaults, type Experience } from "@/lib/experiences";
import { cn } from "@/lib/utils";

/* Une vue par expérience : le bouton ouvre directement le formulaire, expérience présélectionnée. */
export function ExperienceList({ list = defaults }: { list?: Experience[] }) {
  return (
    <section aria-label="Nos expériences" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <ul className="space-y-14 md:space-y-20">
        {list.map((e, i) => (
          <li key={e.slug} id={e.slug} className="scroll-mt-28">
            <Reveal className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
              <div className={cn("relative aspect-[4/3] overflow-hidden rounded-card shadow-soft", i % 2 === 1 && "md:order-2")}>
                {e.cover ? (
                  <Image src={e.cover} alt={e.coverAlt ?? e.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#14202b] via-[#3b2a20] to-[#8a5a2b]" />
                )}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 text-ivory">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold">{e.duration}</p>
                  <p className="font-serif text-xl font-bold">{e.place}</p>
                </div>
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-bronze">{e.duration} · {e.place}</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-chocolate md:text-4xl">{e.title}</h2>
                <p className="mt-4 text-ink/75">{e.text}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink/80">
                  {e.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />{x}</li>
                  ))}
                </ul>
                {e.note && <p className="mt-3 text-xs italic text-ink/60">{e.note}</p>}
                <p className="mt-6 text-sm font-bold text-chocolate">Sur devis</p>
                <div className="mt-3"><Button href={`/reserver?service=activites-touristiques&experience=${e.slug}`}>Réserver cette expérience</Button></div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
