import { Media } from "./Media";
import type { PhotoKey } from "@/lib/photos";

export function PageHero({ title, subtitle, tone = "night", photo, video }: { video?: string; photo?: PhotoKey; title: string; subtitle?: string; tone?: "sunset" | "night" | "sea" | "warm" }) {
  return (
    <section className="relative flex min-h-[48svh] items-end overflow-hidden text-ivory">
      <Media photo={photo} alt="" tone={tone} priority className="absolute inset-0" />
      {video && <video src={video} autoPlay muted loop playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <h1 className="font-serif text-4xl font-bold md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-ivory/90">{subtitle}</p>}
      </div>
    </section>
  );
}
