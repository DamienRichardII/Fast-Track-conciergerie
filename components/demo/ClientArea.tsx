"use client";

import type { PhotoKey } from "@/lib/photos";
import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, MessageSquareText, Heart, UserRound, CreditCard, LogOut } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/utils";

type Status = "Confirmée" | "En attente" | "Terminée";
type Item = { title: string; date: string; status: Status; tone: "sunset" | "sea" | "night" | "warm"; photo: PhotoKey };

const upcoming: Item[] = [
  { title: "Villa Riviera — Abidjan", date: "14 – 16 novembre 2026", status: "Confirmée", tone: "sea", photo: "villaPiscine" },
  { title: "Jet privé — Abidjan → Paris", date: "22 novembre 2026", status: "En attente", tone: "sunset", photo: "jet" },
  { title: "Restaurant — La Terrasse", date: "19 novembre 2026", status: "Confirmée", tone: "night", photo: "restaurantSalle" },
];
const past: Item[] = [
  { title: "Location de voiture — SUV", date: "2 – 5 septembre 2026", status: "Terminée", tone: "night", photo: "voiture" },
  { title: "Sortie en mer — Assinie", date: "18 juillet 2026", status: "Terminée", tone: "sea", photo: "activites" },
];
const menu = [
  { label: "Mes réservations", icon: CalendarCheck },
  { label: "Mes demandes", icon: MessageSquareText },
  { label: "Mes favoris", icon: Heart },
  { label: "Mes informations", icon: UserRound },
  { label: "Mes moyens de paiement", icon: CreditCard },
];
const badge: Record<Status, string> = {
  "Confirmée": "bg-green-100 text-green-800",
  "En attente": "bg-orange-100 text-orange-800",
  "Terminée": "bg-neutral-200 text-neutral-700",
};

export function ClientArea() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [section, setSection] = useState(menu[0].label);
  const items = tab === "upcoming" ? upcoming : past;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[16rem_1fr]">
      <nav aria-label="Espace client" className="min-w-0 rounded-card bg-white p-4 shadow-soft">
        <p className="mb-3 px-3 font-serif text-lg font-bold">Mon compte</p>
        <ul className="flex gap-2 overflow-x-auto md:flex-col">
          {menu.map((m) => (
            <li key={m.label} className="shrink-0">
              <button type="button" onClick={() => setSection(m.label)} aria-current={section === m.label ? "page" : undefined}
                className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm", section === m.label ? "btn-gradient text-ivory" : "hover:bg-champagne/40")}>
                <m.icon className="h-5 w-5 shrink-0" />{m.label}
              </button>
            </li>
          ))}
          <li className="shrink-0"><Link href="/connexion" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-champagne/40"><LogOut className="h-5 w-5" />Se déconnecter</Link></li>
        </ul>
      </nav>

      <section className="min-w-0 rounded-card bg-white p-5 shadow-soft md:p-8" aria-labelledby="titre-section">
        <h2 id="titre-section" className="font-serif text-2xl font-bold">{section}</h2>
        {section === "Mes réservations" ? (
          <>
            <div role="tablist" aria-label="Période" className="mt-5 flex gap-2">
              {([["upcoming", "À venir"], ["past", "Passées"]] as const).map(([k, l]) => (
                <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                  className={cn("rounded-full px-5 py-2 text-sm font-semibold", tab === k ? "bg-champagne text-chocolate" : "text-ink/60 hover:bg-champagne/30")}>{l}</button>
              ))}
            </div>
            <ul className="mt-5 divide-y divide-champagne">
              {items.map((it) => (
                <li key={it.title} className="flex flex-wrap items-center gap-4 py-4">
                  <Media photo={it.photo} alt="" tone={it.tone} className="h-16 w-24 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1"><p className="font-semibold">{it.title}</p><p className="text-sm text-ink/60">{it.date}</p></div>
                  <div className="text-right"><span className={cn("rounded-full px-3 py-1 text-xs font-semibold", badge[it.status])}>{it.status}</span>
                    <p className="mt-1 text-xs text-ink/50 underline">Voir le détail</p></div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-5 rounded-xl bg-champagne/30 p-6 text-sm text-ink/70">Cette section sera disponible prochainement.</p>
        )}
      </section>
    </div>
  );
}
