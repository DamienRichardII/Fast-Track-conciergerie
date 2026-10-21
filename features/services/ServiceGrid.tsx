import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { servicePhoto } from "@/lib/photos";
import { galleries } from "@/lib/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/services";

const tones = ["sunset", "sea", "warm", "night", "night", "sea", "warm", "night", "warm"] as const;

export function ServiceGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <li key={s.slug}>
          <Reveal delay={(i % 4) * 0.08}>
            <Link href={s.path} className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <Media src={galleries[s.slug]?.cover} photo={galleries[s.slug] ? undefined : servicePhoto[s.slug]} alt={s.title} tone={tones[i]} className="absolute inset-0 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <span className="font-semibold">{s.short}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-chocolate-deep transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
