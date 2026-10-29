import Link from "next/link";
import { ArrowRight, Handshake, Headset, Lock, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ActivityGrid } from "@/components/ui/ActivityGrid";
import { EventsCarousel } from "@/components/events/EventsCarousel";
import { MapSection } from "@/components/home/MapSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ContactChannels } from "@/components/home/ContactChannels";
import { entries, services, sharedGroup } from "@/lib/services";
import { site } from "@/lib/site";

const engagements = [
  { icon: ShieldCheck, title: "Service premium", text: "Chaque prestation est suivie par un interlocuteur dédié." },
  { icon: Lock, title: "Confidentialité", text: "Vos informations et vos déplacements restent privés." },
  { icon: Sparkles, title: "Conciergerie personnalisée", text: "Des offres construites selon vos attentes." },
  { icon: Headset, title: "Assistance", text: "Une équipe joignable avant, pendant et après votre prestation." },
  { icon: Handshake, title: "Réseau de partenaires", text: "Des partenaires sélectionnés à Abidjan et à l'international." },
];

/* Les 3 rubriques de l'accueil : sous-titres courts, fil conducteur du site. */
const rubriqueText: Record<string, string> = {
  hotels: "Partout dans le monde",
  "activites-touristiques": "Abidjan et Côte d'Ivoire",
  "conciergerie-privee": "Shopping, luxe, villas, chauffeur",
};

const conciergerieList = ["shopping-europe", "montres-de-luxe", "villas-de-luxe", "location-de-voiture", "restaurants", "jet-prive"].map((m) => services.find((s) => s.slug === m)!);
const conciergerieText: Record<string, string> = {
  "shopping-europe": "Paris, Milan, Londres : un personal shopper achète pour vous ou vous accompagne en boutique.",
  "montres-de-luxe": "Montres, pièces rares : dites-nous ce que vous cherchez, nous le trouvons et vous faisons une proposition.",
  "villas-de-luxe": "Villas avec piscine à Abidjan, Assinie ou à l'étranger, pour un séjour en famille ou un événement.",
  "location-de-voiture": "Un véhicule avec chauffeur pour la journée, les transferts aéroport ou tout votre séjour.",
  restaurants: "Une table réservée là où c'est complet, une soirée organisée de bout en bout.",
  "jet-prive": "Sur demande, pour un trajet ou un groupe : nous vous transmettons les options disponibles.",
};

export default function Home() {
  const waHero = `${site.whatsappHref}?text=${encodeURIComponent("Bonjour Fast Track Conciergerie, je souhaite des informations : ")}`;
  return (
    <>
      <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden text-ivory">
        <Media photo="villa" alt="Villa de luxe avec piscine à débordement face à la mer" tone="sunset" priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
        <div className="relative z-10 flex flex-col items-center px-4 pb-16 pt-24 text-center">
          <Logo tone="light" size="lg" href={null} />
          <h1 className="mt-8 max-w-2xl font-serif text-2xl font-bold leading-snug md:text-4xl">Vos hôtels moins chers partout dans le monde, vos plus belles journées à Abidjan</h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/reserver" size="lg">Demander un devis</Button>
            <a href={waHero} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-9 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-ivory">
              <MessageCircle className="h-4 w-4" />Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Nos trois rubriques" className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 md:px-8">
        <ul className="grid divide-y divide-champagne overflow-hidden rounded-card bg-ivory shadow-soft md:grid-cols-3 md:divide-x md:divide-y-0">
          {entries.map((e) => {
            const s = e.kind === "group" ? sharedGroup : e.service;
            return (
              <li key={s.slug}>
                <Link href={s.path} className="group flex h-full flex-col items-center px-6 py-8 text-center transition hover:bg-white">
                  <s.icon className="h-9 w-9 stroke-[1.2] text-bronze transition group-hover:scale-110" />
                  <span className="mt-3 font-serif text-xl font-bold text-chocolate">{s.short}</span>
                  <span className="mt-1 text-sm text-ink/65">{rubriqueText[s.slug]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="hotel-t" className="mx-auto max-w-3xl px-4 pt-20 text-center md:px-8">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-bronze">Hôtels à prix réduits</p>
          <h2 id="hotel-t" className="mt-3 font-serif text-3xl font-bold md:text-5xl">Le même hôtel, moins cher</h2>
          <p className="mt-4 text-ink/75">Vous avez trouvé un hôtel sur Booking ou ailleurs ? Envoyez-le-nous. Vous gardez le même hôtel, la même chambre, les mêmes dates : nous cherchons simplement un meilleur prix.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/hotels#hotels-prix">Demander mon prix</Button>
            <Link href="/#comment-ca-marche" className="inline-flex h-12 items-center gap-1 px-4 text-sm font-semibold text-bronze hover:underline">Comment ça marche <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
      </section>

      <EventsCarousel />

      <section aria-labelledby="xp-t" className="pt-20">
        <Reveal className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-bronze">Expériences Abidjan</p>
          <h2 id="xp-t" className="mt-3 font-serif text-3xl font-bold md:text-5xl">Vos plus belles journées à Abidjan</h2>
          <p className="mt-3 text-sm text-ink/70">Des sorties pensées pour ceux qui découvrent la Côte d&apos;Ivoire : chauffeur, bonnes adresses, rien à organiser.</p>
        </Reveal>
        <div className="mt-10"><ActivityGrid heading={null} slugs={["apres-midi-a-assinie", "city-tour-abidjan", "basilique-de-yamoussoukro"]} /></div>
        <div className="mt-8 text-center"><Button href="/activites-touristiques" variant="outline">Voir toutes les expériences</Button></div>
      </section>

      <MapSection />

      <section aria-labelledby="conc-t" className="mt-20 bg-champagne/40 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.4fr] md:px-8">
          <Reveal className="self-center text-center md:text-left">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-bronze">Conciergerie privée</p>
            <h2 id="conc-t" className="mt-3 font-serif text-3xl font-bold md:text-4xl">Pour tout ce qui ne rentre pas dans une case</h2>
            <p className="mt-4 text-sm text-ink/75">Un achat de luxe, une villa, un chauffeur, une table impossible à obtenir : dites-nous ce qu&apos;il vous faut, nous nous en occupons.</p>
            <p className="mt-3 text-xs text-ink/55">Et aussi : barber et chef cuisine à domicile.</p>
            <Link href="/conciergerie-privee" className="mt-6 inline-flex items-center gap-2 rounded-full btn-gradient px-7 py-3 text-sm font-bold text-ivory shadow-soft transition hover:brightness-110">Voir la conciergerie <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {conciergerieList.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={(i % 2) * 0.06}>
                  <Link href={s.path} className="block border-t border-bronze/30 py-4 transition hover:border-bronze">
                    <h3 className="font-serif text-lg font-bold">{s.short}</h3>
                    <p className="mt-1 text-sm text-ink/70">{conciergerieText[s.slug]}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
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

      <ContactChannels />
    </>
  );
}
