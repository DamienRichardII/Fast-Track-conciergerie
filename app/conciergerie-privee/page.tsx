import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { conciergerieBlocks, conciergerieIntro, conciergerieNote } from "@/lib/conciergerie";
import { sharedGroup } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: sharedGroup.title,
  description: conciergerieIntro,
  alternates: { canonical: sharedGroup.path },
};

export default function ConciergeriePage() {
  return (
    <>
      <PageHero title={sharedGroup.title} subtitle={conciergerieIntro} tone="night" />
      <section className="mx-auto max-w-4xl px-4 pt-14 text-center md:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/reserver" size="lg">Faire une demande</Button>
            <a href={`${site.whatsappHref}?text=${encodeURIComponent("Bonjour Fast Track Conciergerie, j'ai une demande particulière : ")}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-bronze px-8 text-sm font-semibold text-chocolate transition hover:bg-champagne/40"><MessageCircle className="h-4 w-4" />Écrire sur WhatsApp</a>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <ul className="grid gap-x-12 gap-y-2 md:grid-cols-2">
          {conciergerieBlocks.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={(i % 2) * 0.06} className="border-t border-bronze/30 py-6">
                <h2 className="font-serif text-2xl font-bold text-chocolate">{b.title}</h2>
                <p className="mt-2 text-ink/75">{b.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center font-serif text-lg italic text-chocolate/80">{conciergerieNote}</p>
      </section>
    </>
  );
}
