import { describe, it, expect, beforeEach, vi } from "vitest";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { bookingSchema, checkBookingRules, contactSchema } from "@/features/booking/schema";
import { monthGrid, addDays, nightsBetween } from "@/lib/dates";
import { newRef, REF_PATTERN } from "@/server/requests/ref";
import { FileStore } from "@/server/requests/store";
import { rateLimit, __resetRateLimit } from "@/server/security/rate-limit";
import { esc, sendMail } from "@/server/email/send";

const TODAY = "2026-10-19";
const base = {
  service: "villas-de-luxe", startDate: "2026-11-02", endDate: "2026-11-05", time: "", participants: "4",
  details: { destination: "Assinie" }, name: "Awa Koné", email: "awa@example.com", phone: "+225 07 00 00 00 00",
  message: "", consent: true as const,
};
const check = (o: object) => {
  const p = bookingSchema.parse({ ...base, ...o });
  return checkBookingRules(p, TODAY);
};

describe("validation des demandes", () => {
  it("accepte une demande valide", () => expect(check({})).toEqual({}));
  it("refuse une date passée ou aujourd'hui", () => {
    expect(check({ startDate: "2026-10-19" }).startDate).toBeTruthy();
    expect(check({ startDate: "2026-01-01" }).startDate).toBeTruthy();
  });
  it("refuse une fin avant le début (séjour)", () => expect(check({ endDate: "2026-11-02" }).endDate).toBeTruthy());
  it("exige la destination d'une villa", () => expect(check({ details: {} })["details.destination"]).toBeTruthy());
  it("rejette un champ inattendu et une valeur de liste invalide", () => {
    expect(check({ details: { destination: "X", hack: "1" } })["details.hack"]).toBeTruthy();
    expect(check({ service: "hotels", details: { destination: "X", categorie: "6 étoiles" } })["details.categorie"]).toBeTruthy();
  });
  it("jet privé : date de retour requise pour un aller-retour", () => {
    const jet = { service: "jet-prive", endDate: "", startDate: "2026-11-02", details: { depart: "Abidjan", destination: "Paris", trajet: "Aller-retour" } };
    expect(check(jet)["details.retour"]).toBeTruthy();
    expect(check({ ...jet, details: { ...jet.details, retour: "2026-11-09" } })).toEqual({});
  });
  it("montres : aucune date requise", () =>
    expect(check({ service: "montres-de-luxe", startDate: "", endDate: "", participants: "", details: { demande: "Achat", marque: "X" } })).toEqual({}));
  it("refuse sans consentement, email invalide, prestation inconnue, honeypot rempli", () => {
    expect(bookingSchema.safeParse({ ...base, consent: false }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...base, email: "nope" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...base, service: "inconnu" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...base, website: "http://spam" }).success).toBe(false);
  });
  it("contact : message trop court refusé", () =>
    expect(contactSchema.safeParse({ name: "Awa", email: "a@b.co", subject: "Info", message: "court", consent: true }).success).toBe(false));
});

describe("calendrier", () => {
  it("octobre 2026 commence un jeudi et a 31 jours", () => {
    const g = monthGrid(2026, 9);
    expect(g[0].findIndex((d) => d === "2026-10-01")).toBe(3);
    expect(g.flat().filter(Boolean)).toHaveLength(31);
    expect(g.every((w) => w.length === 7)).toBe(true);
  });
  it("addDays / nightsBetween passent le changement de mois", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(nightsBetween("2026-11-02", "2026-11-05")).toBe(3);
  });
});

describe("référence, stockage, anti-abus, email", () => {
  beforeEach(() => __resetRateLimit());
  it("référence au bon format et unique", () => {
    const refs = new Set(Array.from({ length: 500 }, () => newRef()));
    expect(refs.size).toBe(500);
    for (const r of refs) expect(r).toMatch(REF_PATTERN);
  });
  it("FileStore enregistre et relit", async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "ft-"));
    const s = new FileStore(path.join(dir, "r.json"));
    await s.save({ ref: "FT-261019-ABCDE", type: "contact", status: "NEW", createdAt: "x", data: { a: 1 } });
    await s.save({ ref: "FT-261019-FGHJK", type: "booking", status: "NEW", createdAt: "x", data: {} });
    expect((await s.list()).map((r) => r.ref)).toEqual(["FT-261019-ABCDE", "FT-261019-FGHJK"]);
  });
  it("limiteur : bloque au-delà du seuil puis libère", () => {
    for (let i = 0; i < 5; i++) expect(rateLimit("ip", 5, 1000, 0)).toBe(true);
    expect(rateLimit("ip", 5, 1000, 10)).toBe(false);
    expect(rateLimit("ip", 5, 1000, 2000)).toBe(true);
    expect(rateLimit("autre", 5, 1000, 10)).toBe(true);
  });
  it("échappe le HTML des emails", () => expect(esc('<script>"x"&</script>')).toBe("&lt;script&gt;&quot;x&quot;&amp;&lt;/script&gt;"));
  it("sendMail : false sans config, appelle Resend avec config", async () => {
    delete process.env.RESEND_API_KEY; delete process.env.RESEND_FROM;
    expect(await sendMail({ to: "a@b.co", subject: "s", html: "h" })).toBe(false);
    process.env.RESEND_API_KEY = "k"; process.env.RESEND_FROM = "Fast Track <no-reply@example.com>";
    const f = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", f);
    expect(await sendMail({ to: "a@b.co", subject: "s", html: "h", replyTo: "c@d.co" })).toBe(true);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(init.body).reply_to).toBe("c@d.co");
    vi.unstubAllGlobals();
  });
});
