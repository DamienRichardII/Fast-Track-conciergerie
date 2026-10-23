import { z } from "zod";
import { serviceForms, EXTRAS_KEY, extraRequests } from "./config";

export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const clean = (max: number) => z.string().trim().max(max);

export const contactBase = {
  name: clean(120).min(2, "Indiquez votre nom"),
  email: z.email("Adresse email invalide").max(200),
  phone: clean(30).regex(/^[+0-9 ().-]{6,30}$/, "Numéro invalide").optional().or(z.literal("")),
};

export const bookingSchema = z.object({
  service: z.string().refine((s) => s in serviceForms, "Prestation inconnue"),
  startDate: z.string().regex(ISO_DATE).optional().or(z.literal("")),
  endDate: z.string().regex(ISO_DATE).optional().or(z.literal("")),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional().or(z.literal("")),
  participants: z.coerce.number().int().min(1).max(500).optional().or(z.literal("")),
  details: z.record(z.string().max(60), clean(1000)),
  ...contactBase,
  message: clean(2000).optional(),
  consent: z.literal(true, { error: "Vous devez accepter la politique de confidentialité" }),
  website: z.string().max(0).optional(), // honeypot
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  ...contactBase,
  subject: clean(120).min(2, "Indiquez un objet"),
  message: clean(3000).min(10, "Message trop court"),
  consent: z.literal(true, { error: "Vous devez accepter la politique de confidentialité" }),
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** Règles dépendantes du service (dates, participants, champs requis). `today` = YYYY-MM-DD. */
export function checkBookingRules(input: BookingInput, today: string): Record<string, string> {
  const errors: Record<string, string> = {};
  const form = serviceForms[input.service];
  if (!form) return { service: "Prestation inconnue" };
  const start = input.startDate || "";
  const end = input.endDate || "";

  if (form.dateMode !== "none") {
    if (form.dateRequired && !start) errors.startDate = "Choisissez une date";
    if (start && start <= today) errors.startDate = "La date doit être postérieure à aujourd'hui";
    if (form.dateMode === "range") {
      if (form.dateRequired && !end) errors.endDate = "Choisissez la date de fin";
      if (start && end && end <= start) errors.endDate = "La fin doit suivre le début";
    }
  }
  if (form.participantsRequired && !input.participants) errors.participants = "Indiquez le nombre";
  for (const f of form.fields) {
    const v = (input.details[f.name] ?? "").trim();
    const need = f.required || (f.requiredIf && (input.details[f.requiredIf.field] ?? "") === f.requiredIf.equals);
    if (need && !v) errors[`details.${f.name}`] = "Champ requis";
    if (f.type === "select" && v && !f.options?.includes(v)) errors[`details.${f.name}`] = "Valeur invalide";
    if (f.type === "date" && v && (!ISO_DATE.test(v) || v <= today)) errors[`details.${f.name}`] = "Date invalide";
  }
  const extras = (input.details[EXTRAS_KEY] ?? "").trim();
  if (extras && extras.split(", ").some((x) => !(extraRequests as readonly string[]).includes(x))) errors[`details.${EXTRAS_KEY}`] = "Valeur invalide";
  for (const k of Object.keys(input.details)) {
    if (k !== EXTRAS_KEY && !form.fields.some((f) => f.name === k)) errors[`details.${k}`] = "Champ inattendu";
  }
  return errors;
}

export function zodErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of err.issues) out[i.path.join(".") || "_"] ??= i.message;
  return out;
}
