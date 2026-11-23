import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceGrid } from "@/features/services/ServiceGrid";

export const metadata: Metadata = {
  title: "Nos services",
  description: "Hôtels à prix réduits, jet privé à la demande et conciergerie privée : chasse de montres de luxe, achats et recherches, chauffeur et transferts.",
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
