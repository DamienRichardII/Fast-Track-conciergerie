// Vérifie la connexion à la base et l'état des tables.
// Usage : DATABASE_URL="postgresql://…" npm run db:check
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) { console.error("✗ DATABASE_URL manquante"); process.exit(1); }
if (/\[PASSWORD\]|REGION/.test(url)) { console.error("✗ DATABASE_URL contient encore un texte à remplacer ([PASSWORD] ou REGION)."); process.exit(1); }
if (/\.railway\.internal|:5432\//.test(url) && /supabase\.co/.test(url)) console.warn("⚠ Connexion directe (port 5432) : utilisez le Transaction pooler (port 6543) pour Vercel.");

const local = /@(localhost|127\.0\.0\.1)/.test(url);
const c = new pg.Client({ connectionString: url, ssl: local ? undefined : { rejectUnauthorized: false }, connectionTimeoutMillis: 10000 });
try {
  await c.connect();
  const who = await c.query("select current_user as u, current_database() as d, version() as v");
  console.log(`✓ Connecté : ${who.rows[0].u} @ ${who.rows[0].d}`);
  const t = await c.query(`select c.relname as t, c.relrowsecurity as rls from pg_class c join pg_namespace n on n.oid=c.relnamespace
                           where n.nspname='public' and c.relkind='r' and c.relname in ('users','requests','messages','experiences') order by 1`);
  if (t.rows.length < 4) console.log(`⚠ Tables présentes : ${t.rows.map((r) => r.t).join(", ") || "aucune"} — exécuter supabase/01_schema.sql (ou npm run db:migrate)`);
  for (const r of t.rows) {
    const n = await c.query(`select count(*)::int as n from public.${r.t}`);
    console.log(`  ${r.t.padEnd(12)} ${String(n.rows[0].n).padStart(4)} ligne(s)   RLS ${r.rls ? "activée ✓" : "DÉSACTIVÉE ✗"}`);
  }
} catch (e) {
  console.error(`✗ Échec : ${e.code ?? ""} ${e.message}`);
  if (e.code === "28P01" || /password authentication/i.test(e.message)) console.error("  → mot de passe refusé : le réinitialiser (Settings → Database) et le recopier sans espace.");
  if (/Tenant or user not found/i.test(e.message)) console.error("  → hôte/région ou nom d'utilisateur incorrect : recopier l'adresse depuis Connect → Transaction pooler.");
  if (e.code === "ENOTFOUND") console.error("  → hôte introuvable : vérifier la région dans l'adresse.");
  process.exitCode = 1;
} finally { await c.end().catch(() => {}); }
