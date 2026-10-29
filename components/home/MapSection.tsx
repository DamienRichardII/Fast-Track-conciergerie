"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CIV, WORLD } from "@/lib/mapData";
import { hotelDestinations, xpPlaces } from "@/lib/destinations";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tab = "all" | "hotels" | "xp";
const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "Tout voir" },
  { id: "hotels", label: "Hôtels à prix réduits" },
  { id: "xp", label: "Expériences" },
];

const wa = (text: string) => `${site.whatsappHref}?text=${encodeURIComponent(text)}`;

function Marker({ x, y, active, dim, label, onSelect }: { x: number; y: number; active: boolean; dim?: boolean; label: string; onSelect: () => void }) {
  return (
    <g role="button" tabIndex={0} aria-label={label} aria-pressed={active} onClick={onSelect}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}
      className={cn("cursor-pointer outline-none transition-opacity", dim && "opacity-25")}>
      {active && <circle cx={x} cy={y} r={14} className="fill-gold/25 motion-safe:animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
      <circle cx={x} cy={y} r={14} className="fill-transparent" />
      <circle cx={x} cy={y} r={active ? 7 : 5} className={cn("transition-all", active ? "fill-gold stroke-ivory" : "fill-gold/90 stroke-chocolate-deep")} strokeWidth={1.5} />
    </g>
  );
}

/* Carte interactive : choisir une ville d'hôtel ou un lieu d'expérience, puis écrire directement avec la demande préremplie. */
export function MapSection() {
  const [tab, setTab] = useState<Tab>("all");
  const [sel, setSel] = useState<string | null>(null);

  const hotelSel = hotelDestinations.find((h) => h.code === sel);
  const xpSel = xpPlaces.find((x) => x.code === sel);
  const showHotels = tab !== "xp";
  const showXp = tab !== "hotels";

  return (
    <section aria-labelledby="carte-titre" className="mx-auto max-w-7xl px-4 pt-20 md:px-8">
      <div className="overflow-hidden rounded-card bg-chocolate-deep px-5 py-12 text-ivory shadow-soft md:px-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Destinations</p>
          <h2 id="carte-titre" className="mt-3 font-serif text-3xl font-bold md:text-5xl">Des hôtels partout, des expériences à Abidjan</h2>
          <p className="mt-3 text-sm text-ivory/70">Choisissez une destination sur la carte : nous vous répondons avec une proposition.</p>
        </div>

        <div role="tablist" aria-label="Filtrer la carte" className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-gold/30 p-1">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} type="button" onClick={() => { setTab(t.id); setSel(null); }}
              className={cn("rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm", tab === t.id ? "bg-gold text-chocolate-deep" : "text-ivory/80 hover:text-gold")}>{t.label}</button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3 md:p-5">
            <svg viewBox="245 55 570 230" role="group" aria-label="Carte du monde" className="h-auto w-full overflow-hidden rounded-xl">
              <path d={WORLD.path} className="fill-ivory/20 stroke-ivory/30" strokeWidth={0.5} />
              {hotelDestinations.map((h) => {
                const [x, y] = WORLD.pts[h.code as keyof typeof WORLD.pts];
                return showHotels ? <Marker key={h.code} x={x} y={y} active={sel === h.code} label={`${h.name} : hôtels à prix réduits`} onSelect={() => setSel(h.code)} /> : null;
              })}
              {showXp && (() => { const [x, y] = WORLD.pts.ABJ; return <Marker x={x} y={y} active={xpSel?.code === "ABJ"} label="Abidjan : expériences" onSelect={() => setSel("ABJ")} />; })()}
            </svg>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {showHotels && hotelDestinations.map((h) => (
                <li key={h.code}><button type="button" onClick={() => setSel(h.code)} aria-pressed={sel === h.code}
                  className={cn("rounded-full border px-3 py-1.5 text-xs transition", sel === h.code ? "border-gold bg-gold text-chocolate-deep" : "border-white/15 text-ivory/80 hover:border-gold/60")}>
                  <span className="font-semibold tracking-wider">{h.code}</span> <span className="opacity-80">{h.name}</span></button></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
            <h3 className="font-serif text-xl font-bold">Côte d&apos;Ivoire</h3>
            <svg viewBox={`0 0 ${CIV.size} ${CIV.size}`} role="group" aria-label="Carte de la Côte d'Ivoire" className="mx-auto mt-2 h-auto w-full max-w-[18rem]">
              <path d={CIV.path} className="fill-ivory/15 stroke-ivory/40" strokeWidth={1} />
              {xpPlaces.map((p) => {
                const [x, y] = CIV.pts[p.code as keyof typeof CIV.pts];
                return <Marker key={p.code} x={x} y={y} active={sel === p.code} dim={!showXp} label={`${p.name} : expériences`} onSelect={() => { if (showXp) setSel(p.code); }} />;
              })}
            </svg>
            <ul className="mt-2 flex flex-wrap justify-center gap-2">
              {xpPlaces.map((p) => (
                <li key={p.code}><button type="button" disabled={!showXp} onClick={() => setSel(p.code)} aria-pressed={sel === p.code}
                  className={cn("rounded-full border px-3 py-1.5 text-xs transition disabled:opacity-30", sel === p.code ? "border-gold bg-gold text-chocolate-deep" : "border-white/15 text-ivory/80 hover:border-gold/60")}>{p.name}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-live="polite" className="mx-auto mt-6 min-h-[5.5rem] max-w-2xl rounded-2xl border border-gold/25 bg-black/20 p-5 text-center">
          {hotelSel ? (
            <>
              <p className="font-serif text-xl font-bold">{hotelSel.name} <span className="text-sm font-sans tracking-widest text-gold">{hotelSel.code}</span></p>
              <p className="mt-1 text-sm text-ivory/75">Envoyez-nous l&apos;hôtel que vous avez trouvé : nous cherchons le même, moins cher.</p>
              <a href={wa(`Bonjour Fast Track Conciergerie, je cherche un hôtel à ${hotelSel.name} et je souhaite connaître votre meilleur prix : `)} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-chocolate-deep"><MessageCircle className="h-4 w-4" />Demander mon prix</a>
            </>
          ) : xpSel ? (
            <>
              <p className="font-serif text-xl font-bold">{xpSel.name}</p>
              <p className="mt-1 text-sm text-ivory/75">{xpSel.text}</p>
              <Link href="/activites-touristiques" className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-chocolate-deep">Voir les expériences <ArrowRight className="h-4 w-4" /></Link>
            </>
          ) : (
            <p className="pt-3 text-sm text-ivory/60">Touchez un point de la carte ou une ville ci-dessus.</p>
          )}
        </div>
      </div>
    </section>
  );
}
