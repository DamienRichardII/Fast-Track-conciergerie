import { Media } from "./Media";

export function PageHero({ title, subtitle, tone = "night" }: { title: string; subtitle?: string; tone?: "sunset" | "night" | "sea" | "warm" }) {
  return (
    <section className="relative flex min-h-[48svh] items-end overflow-hidden text-ivory">
      <Media alt="" tone={tone} priority className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <h1 className="font-serif text-4xl font-bold md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-ivory/90">{subtitle}</p>}
      </div>
    </section>
  );
}
