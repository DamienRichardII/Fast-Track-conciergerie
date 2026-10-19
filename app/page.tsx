import Link from "next/link";
import { ShieldCheck, Lock, Sparkles, Headset, Handshake } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGrid } from "@/features/services/ServiceGrid";
import { services } from "@/lib/services";

const engagements = [
  { icon: ShieldCheck, title: "Service premium", text: "Chaque prestation est suivie par un interlocuteur dédié." },
  { icon: Lock, title: "Confidentialité", text: "Vos informations et vos déplacements restent privés." },
  { icon: Sparkles, title: "Conciergerie personnalisée", text: "Des offres construites selon vos attentes." },
  { icon: Headset, title: "Assistance", text: "Une équipe joignable avant, pendant et après votre prestation." },
  { icon: Handshake, title: "Réseau de partenaires", text: "Des partenaires sélectionnés à Abidjan et à l'international." },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden text-ivory">
        <Media photo="villa" alt="Villa de luxe avec piscine à débordement face à la mer" tone="sunset" priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <div className="relative z-10 flex flex-col items-center px-4 pt-24 text-center">
          <Logo tone="light" size="lg" href={null} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/reserver" size="lg">Réserver maintenant</Button>
            <Button href="/services" variant="light" size="lg">Nos services →</Button>
          </div>
        </div>
      </section>

      <section aria-label="Accès rapide" className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 md:px-8">
        <ul className="grid grid-cols-3 gap-y-6 sm:grid-cols-5 rounded-card bg-ivory p-5 shadow-soft md:grid-cols-9">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={s.path} className="group flex flex-col items-center gap-2 text-center text-[0.7rem] leading-tight text-chocolate md:text-xs">
                <s.icon className="h-8 w-8 stroke-[1.2] text-chocolate transition group-hover:text-bronze md:h-9 md:w-9" />
                {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <Reveal><h2 className="mb-10 text-center font-serif text-4xl font-bold md:text-5xl">Nos services</h2></Reveal>
        <ServiceGrid />
      </section>

      <section className="relative isolate overflow-hidden py-24 text-center text-ink">
        <Media photo="abidjan" alt="Vue sur la lagune et les tours d'Abidjan" tone="sunset" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-ivory/45" />
        <Reveal>
          <h2 className="font-serif text-3xl font-bold md:text-5xl">Une expérience sur mesure</h2>
          <p className="mt-2 font-serif text-xl text-chocolate md:text-2xl">à Abidjan et partout dans le monde</p>
          <Button href="/destinations" className="mt-8">Découvrir nos destinations</Button>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {engagements.map((e, i) => (
            <li key={e.title}>
              <Reveal delay={i * 0.06} className="text-center">
                <e.icon className="mx-auto h-9 w-9 stroke-[1.2] text-bronze" />
                <h3 className="mt-3 font-serif text-lg font-bold">{e.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{e.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
