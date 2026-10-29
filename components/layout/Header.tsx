"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "./SocialLinks";
import { nav } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const noHero = ["/reserver", "/mentions-legales", "/cgv", "/confidentialite", "/connexion", "/inscription", "/compte", "/admin"].some((p) => pathname.startsWith(p));
  const solid = scrolled || open || noHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-ink/85 py-2 shadow-lg backdrop-blur-md" : "bg-gradient-to-b from-black/45 to-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Logo tone="light" size="md" className={solid ? "scale-90" : ""} />

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-sm text-ivory">
            {nav.map((n) => {
              const active = n.href.includes("#") ? false : pathname.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={active ? "page" : undefined}
                    className={cn("py-1 transition hover:text-gold", active && "font-bold")}>
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-ivory">
          <SocialLinks className="hidden 2xl:flex" />
          <Button href="/reserver" variant="gold" size="sm" className="md:h-11 md:px-7 md:text-sm">Demander un devis</Button>
          <button type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}
            onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full xl:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] flex flex-col items-center gap-8 bg-ink px-6 pt-12 xl:hidden"
          >
            <nav aria-label="Menu mobile">
              <ul className="flex flex-col items-center gap-6 font-serif text-3xl text-ivory">
                {nav.map((n) => (<li key={n.href}><Link href={n.href} onClick={() => setOpen(false)}>{n.label}</Link></li>))}
              </ul>
            </nav>
            <Button href="/reserver" variant="gold" size="lg" onClick={() => setOpen(false)}>Demander un devis</Button>
            <SocialLinks className="text-ivory" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
