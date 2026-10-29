import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceGrid } from "@/features/services/ServiceGrid";

export const metadata: Metadata = {
  title: "Nos services",
  description: "Hôtels à prix réduits, expériences à Abidjan et conciergerie privée : jet privé, villas, voiture avec chauffeur, restaurants, shopping et montres de luxe.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Nos services" subtitle="Trois univers, une seule conciergerie." tone="night" photo="hotel" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8"><ServiceGrid /></section>
    </>
  );
}
