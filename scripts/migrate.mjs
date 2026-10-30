// Usage : DATABASE_URL=postgresql://… npm run db:migrate
import pg from "pg";
import { readFileSync } from "node:fs";

const url = process.env.DATABASE_URL;
if (!url) { console.error("DATABASE_URL manquante"); process.exit(1); }
const src = readFileSync(new URL("../server/db/schema.ts", import.meta.url), "utf8");
const sql = src.match(/SCHEMA = `([\s\S]*?)`;/)?.[1];
if (!sql) { console.error("Schéma introuvable"); process.exit(1); }
const local = /@(localhost|127\.0\.0\.1)/.test(url);
const client = new pg.Client({ connectionString: url, ssl: local ? undefined : { rejectUnauthorized: false } });
await client.connect();
await client.query(sql);
const { rows } = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY 1");
console.log("OK — tables :", rows.map((r) => r.table_name).join(", "));
await client.end();
