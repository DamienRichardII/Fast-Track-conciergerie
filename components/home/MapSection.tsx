"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WORLD } from "@/lib/mapData";
import { hotelDestinations } from "@/lib/destinations";
import { flightRoutes, hasPoint } from "@/lib/flights";
import { FlightLayer } from "@/components/jet/FlightLayer";
import { cn } from "@/lib/utils";

type Tab = "all" | "hotels" | "flights";
const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "Tout voir" },
  { id: "hotels", label: "Hôtels" },
  { id: "flights", label: "Vols privés" },
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

/* Carte interactive : un point = une destination. Les trajets animés sont des exemples de vols privés. */
const routeCodes = new Set(flightRoutes.flat());
const ctaGold = "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-chocolate-deep";
const ctaLine = "inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-sm font-bold text-gold";

export function MapSection() {
  const [tab, setTab] = useState<Tab>("all");
  const [sel, setSel] = useState<string | null>(null);

  const showHotels = tab !== "flights";
  const showFlights = tab !== "hotels";
  const worldPts = WORLD.pts as Record<string, readonly [number, number]>;
  const dest = hotelDestinations.find((h) => h.code === sel);
  const name = dest?.name;
  /* Planisphère : tous les hôtels, ou seulement les aéroports des trajets (et la destination choisie) en mode vols. */
  const worldMarkers = hotelDestinations.filter((h) => showHotels || routeCodes.has(h.code) || h.code === sel);
  const selRoute = showFlights && sel && sel !== "ABJ" && hasPoint(sel) ? ([["ABJ", sel]] as const) : null;

  return (
    <section aria-labelledby="carte-titre" className="mt-20 w-full bg-chocolate-deep text-ivory">
      <div className="mx-auto w-full max-w-[110rem] px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Destinations</p>
          <h2 id="carte-titre" className="mt-3 font-serif text-3xl font-bold md:text-5xl">Des hôtels et des vols partout dans le monde</h2>
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
            {showFlights && <FlightLayer routes={flightRoutes} idPrefix="map" />}
            {selRoute && <FlightLayer routes={selRoute} idPrefix="sel" scale={1.25} />}
            {worldMarkers.map((h) => {
              const [x, y] = worldPts[h.code];
              const abj = h.code === "ABJ";
              return <Marker key={h.code} x={x} y={y} size={abj ? 4.6 : 3.6} active={sel === h.code} label={abj ? "Abidjan" : `${h.name}${showFlights ? " : hôtels et vols" : " : hôtels"}`} onSelect={() => setSel(h.code)} />;
            })}
            {sel && name && worldPts[sel] && (
              <text x={worldPts[sel][0]} y={worldPts[sel][1] - 14} textAnchor="middle" className="pointer-events-none fill-ivory text-[13px] font-semibold" style={{ paintOrder: "stroke", stroke: "#2a1a10", strokeWidth: 3 }}>
                {name}
              </text>
            )}
          </svg>
        </div>

        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {hotelDestinations.filter((h) => showHotels || routeCodes.has(h.code)).map((h) => (
            <li key={h.code}><button type="button" onClick={() => setSel(h.code)} aria-pressed={sel === h.code}
              className={cn("rounded-full border px-3 py-1.5 text-xs transition", sel === h.code ? "border-gold bg-gold text-chocolate-deep" : "border-white/15 text-ivory/80 hover:border-gold/60")}>{h.name}</button></li>
          ))}
        </ul>

        <div aria-live="polite" className="mx-auto mt-8 flex min-h-[10rem] max-w-2xl flex-col items-center justify-center rounded-2xl border border-gold/25 bg-black/20 p-6 text-center">
          {name ? (
            <>
              <p className="font-serif text-2xl font-bold">{name}</p>
              <p className="mt-2 max-w-md text-sm text-ivory/75">
                {showHotels && showFlights ? "Hôtels réservés à tarifs privilégiés, et vols privés à la demande." : showHotels ? "Du boutique-hôtel au palace, réservés pour vous à des tarifs privilégiés." : "Vol privé à la demande : nous revenons vers vous avec une proposition et un tarif clair."}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {showHotels && <Link href={`/reserver?service=hotels&destination=${encodeURIComponent(name)}`} className={ctaGold}>Demander un hôtel <ArrowRight className="h-4 w-4" /></Link>}
                {showFlights && <Link href={sel === "ABJ" ? "/reserver?service=jet-prive" : `/reserver?service=jet-prive&destination=${encodeURIComponent(name)}`} className={showHotels ? ctaLine : ctaGold}>{sel === "ABJ" ? "Demander un vol" : `Vol Abidjan → ${name}`} <ArrowRight className="h-4 w-4" /></Link>}
              </div>
            </>
          ) : (
            <p className="text-sm text-ivory/60">Touchez un point de la carte ou une destination ci-dessus.</p>
          )}
        </div>
      </div>
    </section>
  );
}
