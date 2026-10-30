"use server";

import { headers } from "next/headers";
import { bookingSchema, contactSchema, checkBookingRules, zodErrors } from "./schema";
import { serviceForms, EXTRAS_KEY, EXTRAS_LABEL } from "./config";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { todayISO } from "@/lib/dates";
import { newRef } from "@/server/requests/ref";
import { getStore, type RequestRecord } from "@/server/requests/store";
import { adminMail, customerMail, sendMail } from "@/server/email/send";
import { rateLimit } from "@/server/security/rate-limit";
import { getSession } from "@/server/auth/session";

export type ActionResult =
  | { ok: true; ref: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const UNAVAILABLE = `Le service est momentanément indisponible. Écrivez-nous à ${site.email} ou appelez le ${site.phone}.`;

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

async function deliver(
  record: RequestRecord, title: string, fields: Record<string, unknown>, customerEmail: string, intro: string,
): Promise<ActionResult> {
  let persisted = false;
  const store = getStore();
  if (store) {
    try { await store.save(record); persisted = true; } catch (e) { console.error("[requests] save failed", e); }
  }
  const toAdmin = process.env.CONTACT_TO_EMAIL || site.email;
  const mailed = await sendMail({ to: toAdmin, subject: `${title} — ${record.ref}`, html: adminMail(record.ref, title, fields), replyTo: customerEmail });
  if (!persisted && !mailed) {
    console.error("[requests] ni stockage ni email interne : demande non enregistrée", record.ref);
    return { ok: false, error: UNAVAILABLE };
  }
  await sendMail({ to: customerEmail, subject: `Votre demande ${record.ref}`, html: customerMail(record.ref, intro) });
  return { ok: true, ref: record.ref };
}

export async function submitBooking(payload: unknown): Promise<ActionResult> {
  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, error: "Veuillez corriger le formulaire.", fieldErrors: zodErrors(parsed.error) };
  const input = parsed.data;
  if (input.website) return { ok: true, ref: newRef() }; // honeypot : bot, rien n'est enregistré
  if (!rateLimit(`booking:${await clientIp()}`)) return { ok: false, error: "Trop de demandes. Réessayez dans quelques minutes." };
  const fieldErrors = checkBookingRules(input, todayISO());
  if (Object.keys(fieldErrors).length) return { ok: false, error: "Veuillez corriger le formulaire.", fieldErrors };

  const svc = services.find((s) => s.slug === input.service)!;
  const form = serviceForms[input.service];
  const labelOf: Record<string, string> = { [EXTRAS_KEY]: EXTRAS_LABEL, ...Object.fromEntries(form.fields.map((f) => [f.name, f.label])) };
  const data = {
    Prestation: svc.title, "Mode": "Demande sur devis",
    "Début": input.startDate, "Fin": input.endDate, "Heure souhaitée": input.time,
    [form.participantsLabel ?? "Participants"]: input.participants,
    ...Object.fromEntries(Object.entries(input.details).map(([k, v]) => [labelOf[k] ?? k, v])),
    Nom: input.name, Email: input.email, Téléphone: input.phone, Message: input.message,
  };
  const session = await getSession();
  const record: RequestRecord = {
    ref: newRef(), type: "booking", status: "NEW", createdAt: new Date().toISOString(), data,
    meta: {
      userId: session?.uid ?? null, service: svc.title, name: input.name, email: input.email, phone: input.phone || "",
      startDate: input.startDate || "", endDate: input.endDate || "", participants: typeof input.participants === "number" ? input.participants : null,
    },
  };
  return deliver(record, `Nouvelle demande — ${svc.title}`, data, input.email,
    `Merci ${input.name}, nous avons bien reçu votre demande pour « ${svc.title} ».`);
}

export async function submitContact(payload: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, error: "Veuillez corriger le formulaire.", fieldErrors: zodErrors(parsed.error) };
  const input = parsed.data;
  if (input.website) return { ok: true, ref: newRef() };
  if (!rateLimit(`contact:${await clientIp()}`)) return { ok: false, error: "Trop de messages. Réessayez dans quelques minutes." };
  const data = { Objet: input.subject, Nom: input.name, Email: input.email, Téléphone: input.phone, Message: input.message };
  const record: RequestRecord = {
    ref: newRef(), type: "contact", status: "NEW", createdAt: new Date().toISOString(), data,
    meta: { name: input.name, email: input.email, phone: input.phone || "", subject: input.subject, message: input.message },
  };
  return deliver(record, "Nouveau message de contact", data, input.email, `Merci ${input.name}, nous avons bien reçu votre message.`);
}
