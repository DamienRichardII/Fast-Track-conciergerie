"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CIV, WORLD } from "@/lib/mapData";
import { hotelDestinations, xpPlaces } from "@/lib/destinations";
import { cn } from "@/lib/utils";

type Tab = "all" | "hotels" | "xp";
const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "Tout voir" },
  { id: "hotels", label: "Hôtels" },
  { id: "xp", label: "Expériences" },
];


function Marker({ x, y, active, dim, label, size = 4, onSelect }: { x: number; y: number; active: boolean; dim?: boolean; label: string; size?: number; onSelect: () => void }) {
  return (
    <g role="button" tabIndex={0} aria-label={label} aria-pressed={active} onClick={onSelect}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}
      className={cn("cursor-pointer outline-none transition-opacity", dim && "opacity-25")}>
      {active && <circle cx={x} cy={y} r={size * 2.4} className="fill-gold/25 motion-safe:animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
      <circle cx={x} cy={y} r={size * 2.2} className="fill-transparent" />
      <circle cx={x} cy={y} r={active ? size * 1.5 : size} className={cn("transition-all", active ? "fill-gold stroke-ivory" : "fill-gold/90 stroke-chocolate-deep")} strokeWidth={size * 0.3} />
    </g>
  );
}

/* Carte interactive : un point = une destination. Abidjan réunit les hôtels et les expériences. */
export function MapSection() {
  const [tab, setTab] = useState<Tab>("all");
  const [sel, setSel] = useState<string | null>(null);

  const showHotels = tab !== "xp";
  const showXp = tab !== "hotels";
  const hotelSel = showHotels ? hotelDestinations.find((h) => h.code === sel) : undefined;
  const xpSel = showXp ? xpPlaces.find((x) => x.code === sel) : undefined;
  const name = hotelSel?.name ?? xpSel?.name;
  const both = !!hotelSel && !!xpSel;
  const worldPts = WORLD.pts as Record<string, readonly [number, number]>;
  /* Sur le planisphère : tous les hôtels, ou seulement Abidjan quand on ne regarde que les expériences. */
  const worldMarkers = hotelDestinations.filter((h) => showHotels || h.code === "ABJ");

  return (
    <section aria-labelledby="carte-titre" className="mt-20 w-full bg-chocolate-deep text-ivory">
      <div className="mx-auto w-full max-w-[110rem] px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Destinations</p>
          <h2 id="carte-titre" className="mt-3 font-serif text-3xl font-bold md:text-5xl">Des hôtels partout dans le monde, des expériences à Abidjan</h2>
          <p className="mt-3 text-sm text-ivory/70">Une quarantaine de destinations en exemple, et n&apos;importe quelle autre sur demande. Touchez un point pour faire votre demande.</p>
        </div>

        <div role="tablist" aria-label="Filtrer la carte" className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-gold/30 p-1">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} type="button" onClick={() => { setTab(t.id); setSel(null); }}
              className={cn("rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm", tab === t.id ? "bg-gold text-chocolate-deep" : "text-ivory/80 hover:text-gold")}>{t.label}</button>
          ))}
        </div>

        {/* Planisphère pleine largeur */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-2 md:p-4">
          <svg viewBox="0 20 1000 440" role="group" aria-label="Carte du monde" className="h-auto w-full">
            <path d={WORLD.path} className="fill-ivory/20 stroke-ivory/30" strokeWidth={0.5} />
            {worldMarkers.map((h) => {
              const [x, y] = worldPts[h.code];
              const abj = h.code === "ABJ";
              return <Marker key={h.code} x={x} y={y} size={abj ? 4.6 : 3.6} active={sel === h.code} label={abj ? "Abidjan : hôtels et expériences" : `${h.name} : hôtels`} onSelect={() => setSel(h.code)} />;
            })}
            {sel && name && worldPts[sel] && (
              <text x={worldPts[sel][0]} y={worldPts[sel][1] - 14} textAnchor="middle" className="pointer-events-none fill-ivory text-[13px] font-semibold" style={{ paintOrder: "stroke", stroke: "#2a1a10", strokeWidth: 3 }}>
                {both ? `${name} · hôtels et expériences` : name}
              </text>
            )}
          </svg>
        </div>

        {showHotels && (
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {hotelDestinations.map((h) => (
              <li key={h.code}><button type="button" onClick={() => setSel(h.code)} aria-pressed={sel === h.code}
                className={cn("rounded-full border px-3 py-1.5 text-xs transition", sel === h.code ? "border-gold bg-gold text-chocolate-deep" : "border-white/15 text-ivory/80 hover:border-gold/60")}>{h.name}</button></li>
            ))}
          </ul>
        )}

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
            <h3 className="text-center font-serif text-xl font-bold">Côte d&apos;Ivoire</h3>
            <svg viewBox={`0 0 ${CIV.size} ${CIV.size}`} role="group" aria-label="Carte de la Côte d'Ivoire" className="mx-auto mt-2 h-auto w-full max-w-[26rem]">
              <path d={CIV.path} className="fill-ivory/15 stroke-ivory/40" strokeWidth={1} />
              {xpPlaces.map((p) => {
                const [x, y] = CIV.pts[p.code as keyof typeof CIV.pts];
                return <Marker key={p.code} x={x} y={y} size={3.6} dim={!showXp} active={sel === p.code} label={`${p.name} : expériences`} onSelect={() => { if (showXp) setSel(p.code); }} />;
              })}
              {sel && xpSel && (() => {
                const [x, y] = CIV.pts[xpSel.code as keyof typeof CIV.pts];
                return <text x={x} y={y - 14} textAnchor="middle" className="pointer-events-none fill-ivory text-[13px] font-semibold" style={{ paintOrder: "stroke", stroke: "#2a1a10", strokeWidth: 3 }}>{xpSel.name}</text>;
              })()}
            </svg>
            <ul className="mt-2 flex flex-wrap justify-center gap-2">
              {xpPlaces.map((p) => (
                <li key={p.code}><button type="button" disabled={!showXp} onClick={() => setSel(p.code)} aria-pressed={sel === p.code}
                  className={cn("rounded-full border px-3 py-1.5 text-xs transition disabled:opacity-30", sel === p.code ? "border-gold bg-gold text-chocolate-deep" : "border-white/15 text-ivory/80 hover:border-gold/60")}>{p.name}</button></li>
              ))}
            </ul>
          </div>

          <div aria-live="polite" className="flex min-h-[12rem] flex-col items-center justify-center rounded-2xl border border-gold/25 bg-black/20 p-6 text-center">
            {name ? (
              <>
                <p className="font-serif text-2xl font-bold">{name}</p>
                {both && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Hôtels et expériences</p>}
                {hotelSel && <p className="mt-2 max-w-md text-sm text-ivory/75">Du boutique-hôtel au palace, réservés pour vous à des tarifs privilégiés.</p>}
                {xpSel && <p className="mt-2 max-w-md text-sm text-ivory/75">{xpSel.text}</p>}
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  {hotelSel && <Link href={`/reserver?service=hotels&destination=${encodeURIComponent(hotelSel.name)}`} className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-chocolate-deep">Demander un hôtel <ArrowRight className="h-4 w-4" /></Link>}
                  {xpSel && <Link href="/activites-touristiques" className={cn("inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold", hotelSel ? "border border-gold/60 text-gold" : "bg-gold text-chocolate-deep")}>Voir les expériences <ArrowRight className="h-4 w-4" /></Link>}
                </div>
              </>
            ) : (
              <p className="text-sm text-ivory/60">Touchez un point de la carte ou une destination ci-dessus.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
