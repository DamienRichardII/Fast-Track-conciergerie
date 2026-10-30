import { describe, expect, it, beforeAll } from "vitest";
import { hashPassword, verifyPassword } from "@/server/auth/password";

vi_env();
function vi_env() { process.env.SESSION_SECRET = "test-secret-test-secret-test-secret"; }

describe("mot de passe", () => {
  it("vérifie le bon mot de passe et refuse les autres", async () => {
    const h = await hashPassword("un-mot-de-passe-solide");
    expect(h.startsWith("scrypt$")).toBe(true);
    expect(await verifyPassword("un-mot-de-passe-solide", h)).toBe(true);
    expect(await verifyPassword("autre", h)).toBe(false);
    expect(await verifyPassword("x", "n'importe quoi")).toBe(false);
  });
  it("sale chaque hash", async () => {
    expect(await hashPassword("abc12345678")).not.toBe(await hashPassword("abc12345678"));
  });
});

describe("session signée", () => {
  let enc: typeof import("@/server/auth/session");
  beforeAll(async () => { vi_env(); enc = await import("@/server/auth/session"); });
  const base = { uid: 1, role: "admin" as const, name: "A" };
  it("décode un jeton valide", () => {
    const t = enc.encode({ ...base, exp: Math.floor(Date.now() / 1000) + 60 });
    expect(enc.decode(t)?.role).toBe("admin");
  });
  it("refuse un jeton falsifié, expiré ou vide", () => {
    const t = enc.encode({ ...base, exp: Math.floor(Date.now() / 1000) + 60 });
    const [p, m] = t.split(".");
    const forged = Buffer.from(JSON.stringify({ ...base, role: "admin", uid: 2, exp: 9999999999 })).toString("base64url");
    expect(enc.decode(`${forged}.${m}`)).toBeNull();
    expect(enc.decode(`${p}.x${m}`)).toBeNull();
    expect(enc.decode(enc.encode({ ...base, exp: 1 }))).toBeNull();
    expect(enc.decode(undefined)).toBeNull();
  });
});
