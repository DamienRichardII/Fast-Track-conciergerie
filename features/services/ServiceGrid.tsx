import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { servicePhoto } from "@/lib/photos";
import { galleries } from "@/lib/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { entries, services, sharedGroup } from "@/lib/services";

const tones = ["sunset", "sea", "warm", "night", "night", "sea", "warm", "night", "warm"] as const;

export function ServiceGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((e, i) => e.kind === "group" ? (
        <li key={sharedGroup.slug}>
          <Reveal delay={(i % 4) * 0.08}>
            <Link href={sharedGroup.path} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <div className="absolute inset-0 grid grid-cols-3 gap-0.5 bg-ivory">
                {sharedGroup.members.map((m) => (
                  <Media key={m} photo={servicePhoto[m]} alt={services.find((x) => x.slug === m)?.title ?? ""} tone="night" className="relative h-full transition duration-700 group-hover:scale-105" />
                ))}
              </div>
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
              <Media src={galleries[e.service.slug]?.cover} photo={galleries[e.service.slug] ? undefined : servicePhoto[e.service.slug]} alt={e.service.title} tone={tones[i]} className="absolute inset-0 transition duration-700 group-hover:scale-105" />
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
