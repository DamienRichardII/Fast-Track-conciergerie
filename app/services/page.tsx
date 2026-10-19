import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceGrid } from "@/features/services/ServiceGrid";

export const metadata: Metadata = {
  title: "Nos services",
  description: "Jet privé, villas, hôtels, location de voiture, restaurants, activités, shopping sur mesure et montres de luxe.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Nos services" subtitle="Huit univers, une seule conciergerie." tone="night" photo="hotel" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8"><ServiceGrid /></section>
    </>
  );
}
