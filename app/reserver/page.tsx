import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { todayISO } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Réserver ou demander un devis",
  description: "Choisissez votre prestation, vos dates souhaitées et envoyez votre demande à l'équipe Fast Track Conciergerie.",
  alternates: { canonical: "/reserver" },
};

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ReserverPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return (
    <section className="bg-ivory pb-20 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h1 className="mb-2 text-center font-serif text-4xl font-bold md:text-5xl">Réserver</h1>
        <p className="mx-auto mb-10 max-w-xl text-center text-ink/70">Décrivez votre besoin : notre équipe confirme la disponibilité et le tarif avant toute réservation.</p>
        <BookingWizard today={todayISO()} initialService={one(sp.service)} initialDestination={one(sp.destination)?.slice(0, 80)} />
      </div>
    </section>
  );
}
