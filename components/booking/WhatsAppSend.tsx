"use client";

import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/layout/WhatsAppButton";

/* Bouton « envoyer sur WhatsApp » : ouvre WhatsApp avec le récapitulatif déjà écrit. Le client n'a qu'à appuyer sur Envoyer. */
export function whatsappRecapLink(lines: (string | false | undefined)[]) {
  const text = lines.filter(Boolean).join("\n").slice(0, 1500);
  return `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppSend({ lines, label = "Envoyer aussi sur WhatsApp", className = "" }: { lines: (string | false | undefined)[]; label?: string; className?: string }) {
  return (
    <a href={whatsappRecapLink(lines)} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1ebe5b] ${className}`}>
      <WhatsAppIcon className="h-5 w-5" />{label}
    </a>
  );
}
