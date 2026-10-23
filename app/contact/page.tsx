import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/booking/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { WhatsAppIcon, whatsappLink } from "@/components/layout/WhatsAppButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Fast Track Conciergerie à Abidjan par email, téléphone ou via le formulaire.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" subtitle="Une question, un projet ? Écrivez-nous." tone="warm" photo="villaSoir" />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_1.4fr] md:px-8">
        <div className="space-y-6">
          <h2 className="font-serif text-3xl font-bold">Coordonnées</h2>
          <ul className="space-y-4 text-chocolate">
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-bronze"><Mail className="h-5 w-5" />{site.email}</a></li>
            <li><a href={site.phoneHref} className="flex items-center gap-3 hover:text-bronze"><Phone className="h-5 w-5" />{site.phone}</a></li>
          </ul>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1ebe5b]">
            <WhatsAppIcon className="h-5 w-5" />Écrire sur WhatsApp
          </a>
          <div className="text-chocolate"><SocialLinks /></div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
