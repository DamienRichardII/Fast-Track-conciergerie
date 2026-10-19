import type { Metadata } from "next";
import { ShieldCheck, Lock, Sparkles, Headset, Handshake } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description: "Fast Track Conciergerie, conciergerie de luxe basée à Abidjan : une équipe dédiée à vos prestations sur mesure.",
  alternates: { canonical: "/a-propos" },
};

const values = [
  { icon: ShieldCheck, title: "Service premium", text: "Chaque prestation est suivie avec exigence." },
  { icon: Lock, title: "Confidentialité", text: "Vos informations et vos déplacements restent privés." },
  { icon: Sparkles, title: "Conciergerie personnalisée", text: "Des offres construites selon vos attentes." },
  { icon: Headset, title: "Assistance", text: "Une équipe joignable avant, pendant et après votre prestation." },
  { icon: Handshake, title: "Réseau de partenaires", text: "Des partenaires sélectionnés à Abidjan et à l'international." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="À propos" subtitle="Votre conciergerie privée à Abidjan." tone="warm" />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Une maison de conciergerie</h2>
          <p className="mt-5 text-lg text-ink/75">Fast Track Conciergerie accompagne ses clients à Abidjan et à l&apos;international : jet privé, villas, hôtels, location de voiture, restaurants, activités, shopping sur mesure et montres de luxe. Chaque demande est étudiée individuellement par notre équipe.</p>
        </Reveal>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold">Comment ça marche</h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.n}><Reveal delay={i * 0.08} className="text-center">
                <span className="btn-gradient mx-auto grid h-12 w-12 place-items-center rounded-full font-serif text-xl text-ivory">{s.n}</span>
                <h3 className="mt-4 font-serif text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{s.text}</p>
              </Reveal></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold">Nos engagements</h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <li key={v.title}><Reveal delay={i * 0.06} className="text-center">
              <v.icon className="mx-auto h-9 w-9 stroke-[1.2] text-bronze" />
              <h3 className="mt-3 font-serif text-lg font-bold">{v.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{v.text}</p>
            </Reveal></li>
          ))}
        </ul>
        <div className="mt-12 text-center"><Button href="/reserver" size="lg">Réserver maintenant</Button></div>
      </section>
    </>
  );
}
