import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type Session = { uid: number; role: "client" | "admin"; name: string; exp: number };
const COOKIE = "ft_session";
const TTL = 60 * 60 * 24 * 14; // 14 jours

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 24) throw new Error("SESSION_SECRET manquant (24 caractères minimum)");
  return s;
}
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function encode(s: Session): string {
  const payload = Buffer.from(JSON.stringify(s)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decode(token: string | undefined, now = Date.now()): Session | null {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const good = sign(payload);
  const a = Buffer.from(mac), b = Buffer.from(good);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const s = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    return s.exp * 1000 > now ? s : null;
  } catch { return null; }
}

export async function getSession(): Promise<Session | null> {
  try { return decode((await cookies()).get(COOKIE)?.value); } catch { return null; }
}

export async function startSession(u: { id: number; role: "client" | "admin"; name: string }) {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  (await cookies()).set(COOKIE, encode({ uid: u.id, role: u.role, name: u.name, exp }), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: TTL,
  });
}

export async function endSession() { (await cookies()).delete(COOKIE); }

export async function requireAdmin(): Promise<Session> {
  const s = await getSession();
  if (!s || s.role !== "admin") throw new Error("Accès refusé");
  return s;
}
