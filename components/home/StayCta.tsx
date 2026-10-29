import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/* « Un séjour complet ? » : combiner plusieurs expériences, avec accueil, hôtel et chauffeur. */
export function StayCta() {
  return (
    <section aria-labelledby="sejour-t" className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid items-center gap-6 rounded-card bg-chocolate-deep px-6 py-12 text-ivory shadow-soft md:grid-cols-[1.4fr_1fr] md:px-12">
        <div className="text-center md:text-left">
          <h2 id="sejour-t" className="font-serif text-3xl font-bold">Un séjour complet ?</h2>
          <p className="mt-3 text-sm text-ivory/75">Accueil à l&apos;aéroport, hôtel, chauffeur pour toute la durée et plusieurs expériences combinées : nous vous préparons un programme sur mesure.</p>
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <Button href="/reserver?service=activites-touristiques" variant="gold" size="lg">Composer mon séjour</Button>
          <a href={`${site.whatsappHref}?text=${encodeURIComponent("Bonjour Fast Track Conciergerie, je souhaite composer un séjour complet : ")}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-chocolate-deep"><MessageCircle className="h-4 w-4" />En parler sur WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
