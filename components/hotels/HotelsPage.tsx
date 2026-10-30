import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Faq } from "@/components/home/Faq";
import { hotelDestinations, regions } from "@/lib/destinations";
import { site } from "@/lib/site";

const wa = `${site.whatsappHref}?text=${encodeURIComponent("Bonjour Fast Track Conciergerie, je souhaite un hôtel : ")}`;
const argument = [
  { t: "Une sélection, pas un catalogue", d: "Quelques hôtels choisis pour vous, selon vos goûts et l'occasion." },
  { t: "Des tarifs privilégiés", d: "Grâce à nos partenaires, des conditions souvent plus avantageuses que le tarif public. Le prix annoncé est le prix final." },
  { t: "Un seul interlocuteur", d: "Avant, pendant et après votre séjour, sur WhatsApp ou par email." },
];

/* Page Hôtels : sans photo d'hôtel (demande client). Cliquer sur une ville ouvre le formulaire avec la destination. */
export function HotelsPage() {
  return (
    <>
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#14202b] via-[#2b1d14] to-[#6b4423] px-4 pb-16 pt-32 text-center text-ivory">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gold">Hôtels</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-6xl">Les plus belles adresses, partout dans le monde</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/80">Du boutique-hôtel au palace, réservés pour vous à des tarifs privilégiés.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/reserver?service=hotels" size="lg">Demander un hôtel</Button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-9 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-ivory">
              <MessageCircle className="h-4 w-4" />WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold leading-tight text-chocolate md:text-4xl">Une destination, des dates. Nous nous occupons du reste.</h2>
          <p className="mt-5 text-ink/75">Vous nous dites où vous partez, ou l&apos;hôtel qui vous fait envie. Nous revenons vers vous avec une proposition choisie, au meilleur tarif que nous puissions obtenir auprès de nos partenaires.</p>
        </Reveal>
        <ul className="divide-y divide-champagne self-center">
          {argument.map((a, i) => (
            <li key={a.t} className="py-4 first:pt-0 last:pb-0">
              <Reveal delay={i * 0.06}>
                <h3 className="font-serif text-lg font-bold text-chocolate">{a.t}</h3>
                <p className="mt-1 text-sm text-ink/70">{a.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ou-partir" className="bg-champagne/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="ou-partir" className="font-serif text-3xl font-bold md:text-5xl">Où partir</h2>
            <p className="mt-3 text-sm text-ink/70">Quelques destinations où nous réservons le plus souvent. Choisissez une ville : le formulaire s&apos;ouvre avec votre destination.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-champagne bg-white p-6 shadow-soft">
                  <h3 className="font-serif text-xl font-bold text-chocolate">{r.title}</h3>
                  <p className="mt-1 text-sm text-ink/65">{r.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {hotelDestinations.filter((d) => d.region === r.id).map((d) => (
                      <li key={d.code}>
                        <Link href={`/reserver?service=hotels&destination=${encodeURIComponent(d.name)}`}
                          className="inline-block rounded-full border border-champagne px-3 py-1.5 text-xs font-medium text-chocolate transition hover:border-bronze hover:bg-champagne/40">{d.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink/65">Une autre destination ? <Link href="/reserver?service=hotels" className="font-semibold text-bronze hover:underline">Dites-le-nous</Link>.</p>
        </div>
      </section>

      <HowItWorks id="comment-reserver" title="Comment réserver" />
      <Faq />

      <section className="mx-auto max-w-4xl px-4 pb-24 text-center md:px-8">
        <Reveal className="rounded-card bg-chocolate-deep px-6 py-14 text-ivory shadow-soft md:px-12">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Votre prochain séjour commence ici</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ivory/75">Une destination, des dates : nous revenons vers vous avec une proposition.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/reserver?service=hotels" variant="gold" size="lg">Demander un hôtel</Button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-gold/50 px-8 text-sm font-semibold text-gold transition hover:bg-gold hover:text-chocolate-deep">
              <MessageCircle className="h-4 w-4" />WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
