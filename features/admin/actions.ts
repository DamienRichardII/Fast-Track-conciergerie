"use server";

import { z } from "zod";
import { requireAdmin } from "@/server/auth/session";
import { ensureSchema } from "@/server/db/schema";
import * as q from "@/server/admin/queries";
import { getExperiences } from "@/server/content/experiences";
import { revalidatePath } from "next/cache";

type Ok = { ok: true } | { ok: false; error: string };
const fail = (e: unknown): Ok => { console.error("[admin]", e); return { ok: false, error: e instanceof Error && e.message === "Accès refusé" ? "Session expirée : reconnectez-vous." : "Action impossible pour le moment." }; };
const id = z.number().int().positive();

async function guard() { await requireAdmin(); await ensureSchema(); }

export async function loadSnapshot(): Promise<q.AdminSnapshot> {
  await guard();
  await getExperiences(); // amorce la table des expériences au premier passage
  return q.snapshot();
}

export async function setRequestStatus(rid: number, status: q.Status): Promise<Ok> {
  try { await guard(); await q.updateRequest(id.parse(rid), { status }); return { ok: true }; } catch (e) { return fail(e); }
}
export async function setRequestNotes(rid: number, notes: string): Promise<Ok> {
  try { await guard(); await q.updateRequest(id.parse(rid), { notes: z.string().max(4000).parse(notes) }); return { ok: true }; } catch (e) { return fail(e); }
}
export async function removeRequest(rid: number): Promise<Ok> {
  try { await guard(); await q.deleteRequest(id.parse(rid)); return { ok: true }; } catch (e) { return fail(e); }
}
export async function markMessage(mid: number, read: boolean): Promise<Ok> {
  try { await guard(); await q.setMessageRead(id.parse(mid), read); return { ok: true }; } catch (e) { return fail(e); }
}
export async function removeMessage(mid: number): Promise<Ok> {
  try { await guard(); await q.deleteMessage(id.parse(mid)); return { ok: true }; } catch (e) { return fail(e); }
}

const exp = z.object({
  slug: z.string().min(1).max(80), title: z.string().trim().min(2).max(160), place: z.string().trim().min(2).max(160),
  duration: z.enum(["Demi-journée", "Journée", "Soirée"]), body: z.string().trim().min(10).max(4000),
  includes: z.array(z.string().trim().min(1).max(120)).max(20), note: z.string().trim().max(500), visible: z.boolean(),
});
export async function updateExperience(payload: unknown): Promise<Ok> {
  try {
    await guard();
    await q.saveExperience(exp.parse(payload));
    revalidatePath("/"); revalidatePath("/activites-touristiques");
    return { ok: true };
  } catch (e) { return fail(e); }
}
