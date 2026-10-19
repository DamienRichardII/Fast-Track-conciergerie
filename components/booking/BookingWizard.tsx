"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Calendar } from "./Calendar";
import { services } from "@/lib/services";
import { serviceForms } from "@/features/booking/config";
import { bookingSchema, checkBookingRules, zodErrors } from "@/features/booking/schema";
import { submitBooking } from "@/features/booking/actions";
import { addDays, formatLong, nightsBetween } from "@/lib/dates";
import { cn } from "@/lib/utils";

const STEPS = ["Prestation", "Date & heure", "Informations", "Récapitulatif", "Confirmation"];
const STEP_KEYS: Record<number, (k: string) => boolean> = {
  0: (k) => k === "service",
  1: (k) => ["startDate", "endDate", "time"].includes(k),
  2: (k) => ["participants", "name", "email", "phone", "message"].includes(k) || k.startsWith("details."),
  3: (k) => k === "consent",
};
const TIMES = ["09:00", "12:00", "14:00", "19:00", "20:00", "21:00"];

type Props = { today: string; initialService?: string; initialDestination?: string };

export function BookingWizard({ today, initialService, initialDestination }: Props) {
  const minDate = addDays(today, 1);
  const valid = services.some((s) => s.slug === initialService);
  const [step, setStep] = useState(valid ? 1 : 0);
  const [service, setService] = useState(valid ? initialService! : "");
  const [dates, setDates] = useState<{ start?: string; end?: string }>({});
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState(initialDestination ? `Destination souhaitée : ${initialDestination}` : "");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [ref, setRef] = useState("");
  const [pending, start] = useTransition();
  const top = useRef<HTMLDivElement>(null);

  const svc = services.find((s) => s.slug === service);
  const form = service ? serviceForms[service] : undefined;

  const payload = () => ({
    service, startDate: dates.start ?? "", endDate: dates.end ?? "", time, participants,
    details: Object.fromEntries(Object.entries(details).filter(([, v]) => v !== "")),
    ...contact, message, consent, website,
  });

  function validate(forStep: number) {
    const p = payload();
    const all: Record<string, string> = {};
    const parsed = bookingSchema.safeParse(forStep < 3 ? { ...p, consent: true } : p);
    if (!parsed.success) Object.assign(all, zodErrors(parsed.error));
    if (parsed.success || service in serviceForms) {
      Object.assign(all, checkBookingRules(parsed.success ? parsed.data : ({ ...p, details: p.details } as never), today), );
    }
    const keys = STEP_KEYS[forStep];
    const out = Object.fromEntries(Object.entries(all).filter(([k]) => keys(k)));
    setErrors(out);
    return out;
  }

  const go = (n: number) => { setStep(n); setServerError(""); requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const next = () => { if (Object.keys(validate(step)).length === 0) go(step + 1); };

  function submit() {
    const e = validate(3);
    if (Object.keys(e).length) return;
    start(async () => {
      const res = await submitBooking(payload());
      if (res.ok) { setRef(res.ref); go(4); }
      else { setServerError(res.error); if (res.fieldErrors) setErrors(res.fieldErrors); }
    });
  }

  const setDetail = (k: string, v: string) => setDetails((d) => ({ ...d, [k]: v }));

  return (
    <div ref={top} className="scroll-mt-28">
      <ol className="mx-auto mb-10 flex max-w-3xl items-start justify-between" aria-label="Étapes de la demande">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && <span aria-hidden className={cn("absolute right-1/2 top-4 h-px w-full", i <= step ? "bg-bronze" : "bg-champagne")} />}
            <span className={cn("relative z-10 grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold",
              i < step ? "border-bronze bg-bronze text-ivory" : i === step ? "btn-gradient border-transparent text-ivory" : "border-champagne bg-ivory text-ink/50")}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className={cn("mt-2 text-[11px] leading-tight md:text-xs", i === step ? "font-bold text-chocolate" : "text-ink/60")}>{label}</span>
          </li>
        ))}
      </ol>

      <div className="mx-auto max-w-3xl rounded-card bg-white p-5 shadow-soft md:p-8">
        {serverError && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{serverError}</p>}

        {step === 0 && (
          <fieldset>
            <legend className="mb-5 font-serif text-2xl font-bold">Choisissez une prestation</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <label key={s.slug} className={cn("flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-bronze",
                  service === s.slug ? "border-bronze bg-champagne/40" : "border-champagne hover:bg-champagne/20")}>
                  <input type="radio" name="service" value={s.slug} checked={service === s.slug} className="sr-only"
                    onChange={() => { setService(s.slug); setDetails({}); setDates({}); setTime(""); setParticipants(""); setErrors({}); }} />
                  <s.icon className="h-7 w-7 shrink-0 stroke-[1.3] text-bronze" />
                  <span className="text-sm font-semibold">{s.short}</span>
                </label>
              ))}
            </div>
            {errors.service && <p role="alert" className="mt-3 text-sm text-red-700">Choisissez une prestation</p>}
          </fieldset>
        )}

        {step === 1 && form && (
          <div>
            <h2 className="mb-1 font-serif text-2xl font-bold">Date et horaire</h2>
            <p className="mb-6 text-sm text-ink/60">{svc?.title}</p>
            {form.dateMode === "none" ? (
              <p className="rounded-xl bg-champagne/30 p-4 text-sm">Aucune date n&apos;est nécessaire pour cette prestation. Vous pourrez préciser vos délais dans votre message.</p>
            ) : (
              <>
                <p className="mb-3 text-sm font-semibold text-chocolate">{form.dateLabel}</p>
                <Calendar mode={form.dateMode} minDate={minDate} value={dates} onChange={(v) => { setDates(v); setErrors({}); }} />
                {(errors.startDate || errors.endDate) && <p role="alert" className="mt-3 text-center text-sm text-red-700">{errors.startDate || errors.endDate}</p>}
                {form.time && (
                  <div className="mt-8">
                    <p className="mb-3 text-sm font-semibold text-chocolate">Heure souhaitée</p>
                    <div className="flex flex-wrap gap-2">
                      {TIMES.map((t) => (
                        <button type="button" key={t} aria-pressed={time === t} onClick={() => setTime(t)}
                          className={cn("h-11 rounded-xl border px-5 text-sm", time === t ? "btn-gradient border-transparent text-ivory" : "border-champagne hover:bg-champagne/40")}>{t}</button>
                      ))}
                      <input type="time" aria-label="Autre heure" value={time} onChange={(e) => setTime(e.target.value)} className="h-11 rounded-xl border border-champagne px-3 text-sm" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {step === 2 && form && (
          <div className="space-y-5">
            <h2 className="font-serif text-2xl font-bold">Vos informations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {form.participantsLabel && (
                <Input label={form.participantsLabel + (form.participantsRequired ? "" : " (facultatif)")} type="number" min={1} inputMode="numeric"
                  value={participants} onChange={(e) => setParticipants(e.target.value)} error={errors.participants} />
              )}
              {form.fields.map((f) => {
                const common = { label: f.label, error: errors[`details.${f.name}`], value: details[f.name] ?? "" };
                if (f.type === "select") return <Select key={f.name} {...common} options={f.options ?? []} onChange={(e) => setDetail(f.name, e.target.value)} />;
                if (f.type === "textarea") return <Textarea key={f.name} {...common} placeholder={f.placeholder} className="sm:col-span-2" onChange={(e) => setDetail(f.name, e.target.value)} />;
                return <Input key={f.name} {...common} type={f.type === "date" ? "date" : "text"} min={f.type === "date" ? minDate : undefined}
                  placeholder={f.placeholder} onChange={(e) => setDetail(f.name, e.target.value)} />;
              })}
            </div>
            <hr className="border-champagne" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Nom complet" autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} error={errors.name} />
              <Input label="Email" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} error={errors.email} />
              <Input label="Téléphone (facultatif)" type="tel" autoComplete="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} error={errors.phone} />
            </div>
            <Textarea label="Message / demandes spécifiques (facultatif)" value={message} onChange={(e) => setMessage(e.target.value)} error={errors.message} />
            <div aria-hidden className="absolute -left-[9999px]"><label>Site web<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
          </div>
        )}

        {step === 3 && form && svc && (
          <div className="space-y-5">
            <h2 className="font-serif text-2xl font-bold">Récapitulatif</h2>
            <dl className="divide-y divide-champagne rounded-xl border border-champagne text-sm">
              <Row k="Prestation" v={svc.title} />
              {dates.start && <Row k={dates.end ? "Séjour" : "Date"} v={dates.end ? `${formatLong(dates.start)} → ${formatLong(dates.end)} (${nightsBetween(dates.start, dates.end)} nuit${nightsBetween(dates.start, dates.end) > 1 ? "s" : ""})` : formatLong(dates.start)} />}
              {time && <Row k="Heure souhaitée" v={time} />}
              {participants && <Row k={form.participantsLabel ?? "Participants"} v={participants} />}
              {form.fields.filter((f) => details[f.name]).map((f) => <Row key={f.name} k={f.label} v={details[f.name]} />)}
              <Row k="Contact" v={`${contact.name} — ${contact.email}${contact.phone ? " — " + contact.phone : ""}`} />
              {message && <Row k="Message" v={message} />}
            </dl>
            <div className="rounded-xl bg-champagne/30 p-4 text-sm">
              <strong>Demande sur devis.</strong> Prix et disponibilité sont confirmés par notre équipe avant toute réservation. Aucun paiement n&apos;est demandé à cette étape.
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 accent-[#55331d]" aria-invalid={!!errors.consent} />
              <span>J&apos;accepte que mes informations soient utilisées pour traiter ma demande, conformément à la <Link href="/confidentialite" className="underline" target="_blank">politique de confidentialité</Link> et aux <Link href="/cgv" className="underline" target="_blank">CGV</Link>.</span>
            </label>
            {errors.consent && <p role="alert" className="text-sm text-red-700">{errors.consent}</p>}
          </div>
        )}

        {step === 4 && (
          <div className="py-6 text-center" role="status">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#7a7a2f] text-ivory"><Check className="h-8 w-8" /></span>
            <h2 className="mt-5 font-serif text-3xl font-bold">Demande envoyée</h2>
            <p className="mt-3 text-sm text-ink/70">Votre demande a bien été enregistrée. Notre équipe vous répond pour confirmer disponibilité et tarif.</p>
            <p className="mt-5 text-sm">Référence : <strong className="select-all font-mono text-base tracking-wider">{ref}</strong></p>
            <p className="mt-1 text-xs text-ink/60">Statut : en attente de confirmation. Conservez cette référence.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/">Retour à l&apos;accueil</Button>
              <Button href="/reserver" variant="outline">Nouvelle demande</Button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? <Button variant="ghost" onClick={() => go(step - 1)}><ArrowLeft className="h-4 w-4" />Retour</Button> : <span />}
            {step < 3 ? (
              <Button onClick={next} disabled={step === 0 && !service}>Continuer <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={submit} disabled={pending}>{pending ? "Envoi…" : "Envoyer ma demande"}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (<div className="grid gap-1 p-3 sm:grid-cols-[11rem_1fr]"><dt className="text-ink/60">{k}</dt><dd className="font-medium">{v}</dd></div>);
}
