import { db, hasDb } from "@/server/db/pool";
import { ensureSchema } from "@/server/db/schema";
import { experiences as base, type Experience } from "@/lib/experiences";

/**
 * Expériences affichées sur le site : textes modifiables depuis l'admin (table `experiences`).
 * Les photos restent celles du code. Sans base ou en cas d'erreur, le contenu du code est utilisé tel quel.
 */
export async function getExperiences(): Promise<Experience[]> {
  if (!hasDb()) return base;
  try {
    await ensureSchema();
    // Première utilisation : on amorce la table avec le contenu du code (sans écraser l'existant).
    const values = base.map((_, i) => `($${i * 7 + 1},$${i * 7 + 2},$${i * 7 + 3},$${i * 7 + 4},$${i * 7 + 5},$${i * 7 + 6}::jsonb,$${i * 7 + 7})`).join(",");
    await db().query(
      `INSERT INTO experiences(slug,title,place,duration,body,includes,position) VALUES ${values} ON CONFLICT (slug) DO NOTHING`,
      base.flatMap((e, i) => [e.slug, e.title, e.place, e.duration, e.text, JSON.stringify(e.includes), i]),
    );
    const { rows } = await db().query("SELECT * FROM experiences ORDER BY position, slug");
    const by = new Map(base.map((e) => [e.slug, e]));
    return rows
      .filter((r) => r.visible && by.has(r.slug))
      .map((r) => ({ ...by.get(r.slug)!, title: r.title, place: r.place, duration: r.duration, text: r.body, includes: r.includes, note: r.note || undefined }));
  } catch (e) {
    console.error("[experiences] lecture base impossible, contenu du code utilisé", e);
    return base;
  }
}
