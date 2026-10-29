import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "./SocialLinks";
import { nav, services } from "@/lib/services";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="space-y-5"><Logo tone="light" size="md" className="mb-2" /><p className="text-sm">Conciergerie privée à Abidjan, prestations sur mesure en Côte d&apos;Ivoire et à l&apos;international.</p></div>
        <div><h2 className="mb-3 font-serif text-lg text-ivory">Navigation</h2>
          <ul className="space-y-2 text-sm">{nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-gold">{n.label}</Link></li>)}</ul></div>
        <div><h2 className="mb-3 font-serif text-lg text-ivory">Services</h2>
          <ul className="space-y-2 text-sm">{services.map((s) => <li key={s.slug}><Link href={s.path} className="hover:text-gold">{s.short}</Link></li>)}</ul></div>
        <div><h2 className="mb-3 font-serif text-lg text-ivory">Contact</h2><ul className="mb-4 space-y-2 text-sm"><li><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li><li><a href={site.phoneHref} className="hover:text-gold">{site.phone}</a></li></ul><SocialLinks />
          <ul className="mt-6 space-y-2 text-sm"><li><Link href="/mentions-legales" className="hover:text-gold">Mentions légales</Link></li><li><Link href="/cgv" className="hover:text-gold">CGV</Link></li><li><Link href="/confidentialite" className="hover:text-gold">Confidentialité</Link></li><li><Link href="/connexion" className="hover:text-gold">Espace client</Link></li></ul></div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} Fast Track Conciergerie</div>
    </footer>
  );
}
