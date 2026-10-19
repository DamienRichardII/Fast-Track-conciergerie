"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Base = { label: string; error?: string; hint?: string; className?: string };

const control =
  "w-full rounded-xl border border-champagne bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 transition focus:border-bronze focus:outline-none aria-[invalid=true]:border-red-600";

function Wrap({ id, label, error, hint, className, children }: Base & { id: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-chocolate">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-d`} className="text-xs text-ink/60">{hint}</p>}
      {error && <p id={`${id}-d`} role="alert" className="text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

export function Input({ label, error, hint, className, ...p }: Base & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrap id={id} {...{ label, error, hint, className }}>
      <input id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-d` : undefined} className={control} {...p} />
    </Wrap>
  );
}

export function Textarea({ label, error, hint, className, ...p }: Base & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrap id={id} {...{ label, error, hint, className }}>
      <textarea id={id} rows={4} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-d` : undefined} className={control} {...p} />
    </Wrap>
  );
}

export function Select({ label, error, hint, className, options, placeholder = "Choisir…", ...p }:
  Base & { options: string[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrap id={id} {...{ label, error, hint, className }}>
      <select id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-d` : undefined} className={control} {...p}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Wrap>
  );
}
