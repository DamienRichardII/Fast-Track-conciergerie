import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { jetFleet } from "@/lib/jet";

const km = (nm: number) => Math.round((nm * 1.852) / 10) * 10;
const fmt = (n: number) => n.toLocaleString("fr-FR");

/* Flotte du partenaire Jet Groupe International : appareils, capacité et autonomie. */
export function JetFleet() {
  return (
    <section id="flotte" aria-labelledby="jet-flotte" className="scroll-mt-28 bg-navy pb-16 pt-6 text-ivory">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Notre flotte</p>
          <h2 id="jet-flotte" className="mt-3 font-serif text-3xl font-bold md:text-4xl">Un appareil pour chaque trajet</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ivory/70">Des jets légers aux avions de ligne VIP, proposés avec notre partenaire Jet Groupe International. Nous vous orientons vers l&apos;appareil adapté à votre voyage.</p>
        </Reveal>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jetFleet.map((a, i) => (
            <li key={a.name}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                  <div className="relative aspect-[16/10] bg-white/5">
                    <Image src={a.src} alt={`${a.name}, ${a.cat.toLowerCase()}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" loading={i < 3 ? "eager" : "lazy"} className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold">{a.cat}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold">{a.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/75">{a.text}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                      <div><dt className="text-[0.65rem] uppercase tracking-wider text-ivory/50">Passagers</dt><dd className="mt-0.5 font-semibold">{a.pax}</dd></div>
                      <div><dt className="text-[0.65rem] uppercase tracking-wider text-ivory/50">Autonomie</dt><dd className="mt-0.5 font-semibold">{fmt(a.range)}{a.plus ? "+" : ""} nm <span className="font-normal text-ivory/60">(≈ {fmt(km(a.range))} km)</span></dd></div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 text-center">
          <p className="font-serif text-xl">Besoin d&apos;aide pour choisir ?</p>
          <p className="mt-1 text-sm text-ivory/70">Indiquez trajet, dates et nombre de voyageurs : nous vous proposons l&apos;appareil adapté, avec un tarif clair.</p>
        </Reveal>
      </div>
    </section>
  );
}
