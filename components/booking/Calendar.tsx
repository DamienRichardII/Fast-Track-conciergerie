"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS, WEEKDAYS, monthGrid, formatLong } from "@/lib/dates";
import { cn } from "@/lib/utils";

export type DateValue = { start?: string; end?: string };

type Props = {
  mode: "single" | "range";
  value: DateValue;
  onChange: (v: DateValue) => void;
  /** Première date sélectionnable (YYYY-MM-DD) */
  minDate: string;
};

/**
 * Calendrier de dates SOUHAITÉES. Il ne prétend pas indiquer de disponibilité :
 * celle-ci est confirmée par l'équipe (prestations sur devis).
 */
export function Calendar({ mode, value, onChange, minDate }: Props) {
  const [y0, m0] = (value.start ?? minDate).split("-").map(Number);
  const [view, setView] = useState({ y: y0, m: m0 - 1 });
  const weeks = monthGrid(view.y, view.m);
  const [minY, minM] = minDate.split("-").map(Number);
  const atMin = view.y === minY && view.m === minM - 1;

  const move = (delta: number) =>
    setView(({ y, m }) => {
      const d = new Date(Date.UTC(y, m + delta, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });

  function pick(iso: string) {
    if (mode === "single") return onChange({ start: iso });
    const { start, end } = value;
    if (!start || (start && end) || iso <= start) return onChange({ start: iso });
    onChange({ start, end: iso });
  }

  const inRange = (iso: string) => !!(value.start && value.end && iso > value.start && iso < value.end);

  return (
    <div className="mx-auto w-full max-w-md rounded-card bg-white p-4 shadow-soft md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} disabled={atMin} aria-label="Mois précédent"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-champagne/40 disabled:opacity-30"><ChevronLeft /></button>
        <h3 className="font-serif text-xl font-bold capitalize" aria-live="polite">{MONTHS[view.m]} {view.y}</h3>
        <button type="button" onClick={() => move(1)} aria-label="Mois suivant"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-champagne/40"><ChevronRight /></button>
      </div>
      <div role="grid" aria-label={`Calendrier ${MONTHS[view.m]} ${view.y}`}>
        <div role="row" className="mb-1 grid grid-cols-7 text-center text-xs text-ink/50">
          {WEEKDAYS.map((d) => <span key={d} role="columnheader">{d}</span>)}
        </div>
        {weeks.map((w, i) => (
          <div role="row" key={i} className="grid grid-cols-7">
            {w.map((iso, j) => {
              if (!iso) return <span key={j} role="gridcell" />;
              const disabled = iso < minDate;
              const selected = iso === value.start || iso === value.end;
              return (
                <span key={iso} role="gridcell" className={cn("p-0.5", inRange(iso) && "bg-champagne/50")}>
                  <button type="button" disabled={disabled} aria-pressed={selected}
                    aria-label={formatLong(iso)} onClick={() => pick(iso)}
                    className={cn(
                      "grid h-11 w-full place-items-center rounded-xl text-sm transition",
                      disabled ? "cursor-not-allowed text-ink/25" : "hover:bg-champagne/60",
                      selected && "btn-gradient font-bold text-ivory hover:brightness-110",
                    )}>
                    {Number(iso.slice(8))}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-ink/60">
        {mode === "range"
          ? value.start && value.end ? `Du ${formatLong(value.start)} au ${formatLong(value.end)}` : value.start ? `Arrivée : ${formatLong(value.start)} — choisissez la date de fin` : "Choisissez la date de début"
          : value.start ? formatLong(value.start) : "Choisissez une date"}
      </p>
      <p className="mt-1 text-center text-[11px] text-ink/50">Dates souhaitées, sous réserve de confirmation par notre équipe (à partir du {formatLong(minDate)}).</p>
    </div>
  );
}
