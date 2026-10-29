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

/* Carte interactive : choisir une ville d'hôtel ou un lieu d'expérience, puis écrire directement avec la demande préremplie. */
export function MapSection() {
  const [tab, setTab] = useState<Tab>("all");
  const [sel, setSel] = useState<string | null>(null);

  const hotelSel = hotelDestinations.find((h) => h.code === sel);
  const xpSel = xpPlaces.find((x) => x.code === sel);
  const showHotels = tab !== "xp";
  const showXp = tab !== "hotels";

  return (
    <section aria-labelledby="carte-titre" className="mt-20 w-full bg-chocolate-deep text-ivory">
      <div className="mx-auto w-full max-w-[110rem] px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">Destinations</p>
          <h2 id="carte-titre" className="mt-3 font-serif text-3xl font-bold md:text-5xl">Des hôtels à prix réduits partout dans le monde</h2>
          <p className="mt-3 text-sm text-ivory/70">Une quarantaine de villes en exemple, et bien d&apos;autres sur demande. Touchez une destination : nous vous répondons avec une proposition.</p>
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
            {hotelDestinations.map((h) => {
              const [x, y] = WORLD.pts[h.code as keyof typeof WORLD.pts];
              return showHotels ? <Marker key={h.code} x={x} y={y} size={3.6} active={sel === h.code} label={`${h.name} : hôtels à prix réduits`} onSelect={() => setSel(h.code)} /> : null;
            })}
            {showXp && (() => { const [x, y] = WORLD.pts.ABJ; return <Marker x={x} y={y} size={4.2} active={xpSel?.code === "ABJ"} label="Abidjan : expériences" onSelect={() => setSel("ABJ")} />; })()}
            {sel && (() => {
              const pt = (WORLD.pts as Record<string, readonly [number, number]>)[sel];
              const name = hotelSel?.name ?? xpPlaces.find((x) => x.code === sel)?.name;
              if (!pt || !name) return null;
              return <text x={pt[0]} y={pt[1] - 14} textAnchor="middle" className="pointer-events-none fill-ivory text-[13px] font-semibold" style={{ paintOrder: "stroke", stroke: "#2a1a10", strokeWidth: 3 }}>{name}</text>;
            })()}
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
            <svg viewBox={`0 0 ${CIV.size} ${CIV.size}`} role="group" aria-label="Carte de la Côte d'Ivoire" className="mx-auto mt-2 h-auto w-full max-w-[18rem]">
              <path d={CIV.path} className="fill-ivory/15 stroke-ivory/40" strokeWidth={1} />
              {xpPlaces.map((p) => {
                const [x, y] = CIV.pts[p.code as keyof typeof CIV.pts];
                return <Marker key={p.code} x={x} y={y} size={5} dim={!showXp} active={sel === p.code} label={`${p.name} : expériences`} onSelect={() => { if (showXp) setSel(p.code); }} />;
              })}
            </svg>
            <ul className="mt-2 flex flex-wrap justify-center gap-2">
              {xpPlaces.map((p) => (
                <li key={p.code}><button type="button" disabled={!showXp} onClick={() => setSel(p.code)} aria-pressed={sel === p.code}
                  className={cn("rounded-full border px-3 py-1.5 text-xs transition disabled:opacity-30", sel === p.code ? "border-gold bg-gold text-chocolate-deep" : "border-white/15 text-ivory/80 hover:border-gold/60")}>{p.name}</button></li>
              ))}
            </ul>
          </div>

          <div aria-live="polite" className="flex min-h-[12rem] flex-col items-center justify-center rounded-2xl border border-gold/25 bg-black/20 p-6 text-center">
            {hotelSel ? (
              <>
                <p className="font-serif text-2xl font-bold">{hotelSel.name}</p>
                <p className="mt-2 max-w-md text-sm text-ivory/75">Envoyez-nous l&apos;hôtel que vous avez trouvé : nous cherchons le même, moins cher. Pas encore d&apos;hôtel ? Nous vous en trouvons un à prix réduit, 5 étoiles et plus, toutes catégories.</p>
                <a href={wa(`Bonjour Fast Track Conciergerie, je cherche un hôtel à ${hotelSel.name} et je souhaite connaître votre meilleur prix : `)} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-chocolate-deep"><MessageCircle className="h-4 w-4" />Demander mon prix</a>
              </>
            ) : xpSel ? (
              <>
                <p className="font-serif text-2xl font-bold">{xpSel.name}</p>
                <p className="mt-2 max-w-md text-sm text-ivory/75">{xpSel.text}</p>
                <Link href="/activites-touristiques" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-chocolate-deep">Voir les expériences <ArrowRight className="h-4 w-4" /></Link>
              </>
            ) : (
              <p className="text-sm text-ivory/60">Touchez un point de la carte ou une ville ci-dessus.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
