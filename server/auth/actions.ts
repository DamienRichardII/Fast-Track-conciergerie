"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db, hasDb } from "@/server/db/pool";
import { ensureSchema } from "@/server/db/schema";
import { hashPassword, verifyPassword } from "./password";
import { startSession, endSession } from "./session";
import { rateLimit } from "@/server/security/rate-limit";

export type AuthResult = { ok: true; role: "client" | "admin" } | { ok: false; error: string };

const email = z.email("Adresse email invalide").max(200).transform((v) => v.trim().toLowerCase());
const loginSchema = z.object({ email, password: z.string().min(1).max(200) });
const signupSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom").max(120),
  email,
  password: z.string().min(10, "10 caractères minimum").max(200),
});

async function ip() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
const UNAVAILABLE = "Le service est momentanément indisponible.";

/** Crée le compte administrateur au premier accès si ADMIN_EMAIL / ADMIN_PASSWORD correspondent et qu'aucun admin n'existe. */
async function bootstrapAdmin(mail: string, password: string) {
  const ae = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const ap = process.env.ADMIN_PASSWORD;
  if (!ae || !ap || ae !== mail || ap !== password) return;
  const { rows } = await db().query("SELECT 1 FROM users WHERE role='admin' LIMIT 1");
  if (rows.length) return;
  await db().query(
    "INSERT INTO users(email,name,password,role) VALUES($1,'Administrateur',$2,'admin') ON CONFLICT (email) DO UPDATE SET role='admin', password=EXCLUDED.password",
    [mail, await hashPassword(password)],
  );
}

export async function login(payload: unknown): Promise<AuthResult> {
  const p = loginSchema.safeParse(payload);
  if (!p.success) return { ok: false, error: "Email ou mot de passe invalide." };
  if (!hasDb()) return { ok: false, error: UNAVAILABLE };
  if (!rateLimit(`login:${await ip()}`, 10, 10 * 60_000)) return { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." };
  try {
    await ensureSchema();
    await bootstrapAdmin(p.data.email, p.data.password);
    const { rows } = await db().query("SELECT id, name, password, role FROM users WHERE email=$1", [p.data.email]);
    const u = rows[0];
    if (!u || !(await verifyPassword(p.data.password, u.password))) return { ok: false, error: "Email ou mot de passe incorrect." };
    await startSession({ id: Number(u.id), role: u.role, name: u.name });
    return { ok: true, role: u.role };
  } catch (e) { console.error("[auth] login", e); return { ok: false, error: UNAVAILABLE }; }
}

export async function signup(payload: unknown): Promise<AuthResult> {
  const p = signupSchema.safeParse(payload);
  if (!p.success) return { ok: false, error: p.error.issues[0]?.message ?? "Formulaire invalide." };
  if (!hasDb()) return { ok: false, error: UNAVAILABLE };
  if (!rateLimit(`signup:${await ip()}`, 5, 10 * 60_000)) return { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." };
  try {
    await ensureSchema();
    const { rows } = await db().query(
      "INSERT INTO users(email,name,password,role) VALUES($1,$2,$3,'client') ON CONFLICT (email) DO NOTHING RETURNING id, name",
      [p.data.email, p.data.name, await hashPassword(p.data.password)],
    );
    if (!rows[0]) return { ok: false, error: "Un compte existe déjà avec cet email. Connectez-vous." };
    await startSession({ id: Number(rows[0].id), role: "client", name: rows[0].name });
    return { ok: true, role: "client" };
  } catch (e) { console.error("[auth] signup", e); return { ok: false, error: UNAVAILABLE }; }
}

export async function logout() { await endSession(); }
