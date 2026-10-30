import { Pool } from "pg";

declare global { var __ftPool: Pool | undefined; }

export const hasDb = () => !!process.env.DATABASE_URL;

/** Pool partagé (réutilisé entre les appels en environnement serverless). */
export function db(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL manquante");
  if (!globalThis.__ftPool) {
    const local = /@(localhost|127\.0\.0\.1)/.test(url);
    globalThis.__ftPool = new Pool({
      connectionString: url,
      max: 3,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 8_000,
      ssl: local ? undefined : { rejectUnauthorized: false }, // proxy public Railway
    });
  }
  return globalThis.__ftPool;
}
