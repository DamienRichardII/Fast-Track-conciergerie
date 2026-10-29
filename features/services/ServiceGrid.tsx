import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { activities } from "@/lib/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { entries, sharedGroup } from "@/lib/services";

/* Pas de photo d'hôtel ni de conciergerie (demande client) : fond sobre et icône. */
const tile = "absolute inset-0 grid place-items-center bg-gradient-to-br from-[#14202b] via-[#3b2a20] to-[#8a5a2b] transition duration-700 group-hover:scale-105";

export function ServiceGrid({ only }: { only?: string[] } = {}) {
  const list = only ? entries.filter((e) => e.kind === "service" && only.includes(e.service.slug)) : entries;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((e, i) => e.kind === "group" ? (
        <li key={sharedGroup.slug}>
          <Reveal delay={(i % 4) * 0.08}>
            <Link href={sharedGroup.path} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <div className={tile}><sharedGroup.icon className="h-16 w-16 stroke-[1] text-gold/80" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <span className="font-semibold">{sharedGroup.title}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-chocolate-deep transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>
        </li>
      ) : (
        <li key={e.service.slug}>
          <Reveal delay={(i % 4) * 0.08}>
            <Link href={e.service.path} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              {e.service.slug === "activites-touristiques" && activities[0]?.cover ? (
                <Image src={activities[0].cover} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <div className={tile}><e.service.icon className="h-16 w-16 stroke-[1] text-gold/80" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <span className="font-semibold">{e.service.short}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-chocolate-deep transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
