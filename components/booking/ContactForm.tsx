"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { contactSchema, zodErrors } from "@/features/booking/schema";
import { submitContact } from "@/features/booking/actions";
import Link from "next/link";

const SUBJECTS = ["Demande d'information", "Devis sur mesure", "Suivi d'une demande", "Partenariat", "Autre"];

export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [ref, setRef] = useState("");
  const [pending, start] = useTransition();
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...v, consent, website };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) { setErrors(zodErrors(parsed.error)); return; }
    setErrors({}); setServerError("");
    start(async () => {
      const res = await submitContact(payload);
      if (res.ok) setRef(res.ref); else { setServerError(res.error); if (res.fieldErrors) setErrors(res.fieldErrors); }
    });
  }

  if (ref) {
    return (
      <div role="status" className="rounded-card bg-white p-8 text-center shadow-soft">
        <h2 className="font-serif text-2xl font-bold">Message envoyé</h2>
        <p className="mt-3 text-sm text-ink/70">Merci, nous revenons vers vous par email.</p>
        <p className="mt-2 text-sm">Référence : <strong className="font-mono">{ref}</strong></p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-card bg-white p-5 shadow-soft md:p-8">
      {serverError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{serverError}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nom complet" autoComplete="name" value={v.name} onChange={set("name")} error={errors.name} />
        <Input label="Email" type="email" autoComplete="email" value={v.email} onChange={set("email")} error={errors.email} />
        <Input label="Téléphone (facultatif)" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} error={errors.phone} />
        <Select label="Objet" options={SUBJECTS} value={v.subject} onChange={set("subject")} error={errors.subject} />
      </div>
      <Textarea label="Message" value={v.message} onChange={set("message")} error={errors.message} />
      <div aria-hidden className="absolute -left-[9999px]"><label>Site web<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 accent-[#55331d]" />
        <span>J&apos;accepte que mes informations soient utilisées pour répondre à ma demande (<Link href="/confidentialite" className="underline" target="_blank">politique de confidentialité</Link>).</span>
      </label>
      {errors.consent && <p role="alert" className="text-sm text-red-700">{errors.consent}</p>}
      <Button type="submit" disabled={pending}>{pending ? "Envoi…" : "Envoyer"}</Button>
    </form>
  );
}
