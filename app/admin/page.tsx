import type { Metadata } from "next";
import { LayoutDashboard, CalendarDays, Users, Briefcase, FileText, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Back-office", robots: { index: false, follow: false } };

const nav = [
  { label: "Tableau de bord", icon: LayoutDashboard, active: true },
  { label: "Réservations", icon: CalendarDays },
  { label: "Clients", icon: Users },
  { label: "Prestations", icon: Briefcase },
  { label: "Devis", icon: FileText },
  { label: "Paiements", icon: CreditCard },
  { label: "Paramètres", icon: Settings },
];
const kpis = [
  { label: "Demandes", value: "128" },
  { label: "Clients", value: "47" },
  { label: "Chiffre d'affaires", value: "12 500 000 FCFA" },
];
const bars = [18, 40, 28, 52, 20, 24, 46, 22, 20, 36, 30, 58, 26, 44, 34, 62, 30, 48, 38, 70, 42, 36, 50, 44, 56, 40, 52, 60, 46, 74];
const top = [["Villas de luxe", 24], ["Hôtels", 22], ["Location de voiture", 18], ["Restaurants", 12], ["Jet privé", 10], ["Shopping en Europe", 8], ["Montres de luxe", 6]] as const;
const recent = [
  ["Villa Riviera — Abidjan", "Awa K.", "Nouvelle"],
  ["Jet privé — Abidjan → Paris", "Jean-Marc D.", "Devis envoyé"],
  ["Restaurant — La Terrasse", "Fatou S.", "Confirmée"],
  ["Location SUV — 3 jours", "Ibrahim T.", "Nouvelle"],
];

export default function Page() {
  return (
    <section className="bg-ivory px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 font-serif text-4xl font-bold">Back-office</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[15rem_1fr]">
          <nav aria-label="Administration" className="min-w-0 rounded-card bg-navy p-3 text-ivory">
            <ul className="flex gap-1 overflow-x-auto md:flex-col">
              {nav.map((n) => (
                <li key={n.label} className="shrink-0">
                  <span aria-current={n.active ? "page" : undefined} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm", n.active ? "bg-white/10 font-semibold" : "text-ivory/70")}>
                    <n.icon className="h-5 w-5" />{n.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-6">
            <ul className="grid gap-4 sm:grid-cols-3">
              {kpis.map((k) => (
                <li key={k.label} className="rounded-card bg-white p-5 shadow-soft">
                  <p className="font-serif text-2xl font-bold md:text-3xl">{k.value}</p>
                  <p className="mt-1 text-sm text-ink/60">{k.label}</p>
                </li>
              ))}
            </ul>
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="rounded-card bg-white p-5 shadow-soft">
                <h2 className="font-semibold">Demandes (30 derniers jours)</h2>
                <div role="img" aria-label="Histogramme des demandes sur 30 jours, tendance à la hausse" className="mt-4 flex h-48 items-end gap-1">
                  {bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t bg-bronze/70" />)}
                </div>
                <div className="mt-2 flex justify-between text-xs text-ink/50"><span>1</span><span>10</span><span>20</span><span>30</span></div>
              </div>
              <div className="rounded-card bg-white p-5 shadow-soft">
                <h2 className="font-semibold">Prestations les plus demandées</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {top.map(([l, v]) => (
                    <li key={l}><div className="flex justify-between"><span>{l}</span><span className="font-semibold">{v} %</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-champagne/60"><div style={{ width: `${v * 3}%` }} className="h-full rounded-full bg-bronze" /></div></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="overflow-x-auto rounded-card bg-white p-5 shadow-soft">
              <h2 className="mb-3 font-semibold">Activité récente</h2>
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="text-ink/50"><tr><th className="pb-2 font-medium">Prestation</th><th className="pb-2 font-medium">Client</th><th className="pb-2 font-medium">Statut</th></tr></thead>
                <tbody className="divide-y divide-champagne">{recent.map(([a, b, c]) => <tr key={a}><td className="py-3">{a}</td><td>{b}</td><td><span className="rounded-full bg-champagne/60 px-3 py-1 text-xs font-semibold">{c}</span></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
