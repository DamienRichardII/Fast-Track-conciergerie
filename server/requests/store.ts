import { promises as fs } from "node:fs";
import path from "node:path";
import { db, hasDb } from "@/server/db/pool";
import { ensureSchema } from "@/server/db/schema";

export type RequestRecord = {
  ref: string;
  type: "booking" | "contact";
  status: "NEW";
  createdAt: string;
  data: Record<string, unknown>;
  /** Champs structurés pour la base (réservation) */
  meta?: {
    userId?: number | null; service?: string; name?: string; email?: string; phone?: string;
    startDate?: string; endDate?: string; participants?: number | null; subject?: string; message?: string;
  };
};

export interface RequestStore {
  save(record: RequestRecord): Promise<void>;
  list(): Promise<RequestRecord[]>;
}

const nz = (v?: string) => (v ? v : null);

/** Stockage Postgres (Railway) : demandes → `requests`, messages de contact → `messages`. */
export class PgStore implements RequestStore {
  async save(r: RequestRecord) {
    await ensureSchema();
    const m = r.meta ?? {};
    if (r.type === "contact") {
      await db().query(
        "INSERT INTO messages(ref,name,email,phone,subject,body,created_at) VALUES($1,$2,$3,$4,$5,$6,$7)",
        [r.ref, m.name ?? "", m.email ?? "", m.phone ?? "", m.subject ?? "", m.message ?? "", r.createdAt],
      );
      return;
    }
    await db().query(
      `INSERT INTO requests(ref,user_id,service,client_name,email,phone,start_date,end_date,participants,notes,data,created_at)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'',$10,$11)`,
      [r.ref, m.userId ?? null, m.service ?? "", m.name ?? "", m.email ?? "", m.phone ?? "", nz(m.startDate), nz(m.endDate), m.participants ?? null, JSON.stringify(r.data), r.createdAt],
    );
  }
  async list(): Promise<RequestRecord[]> {
    await ensureSchema();
    const { rows } = await db().query("SELECT ref, data, created_at FROM requests ORDER BY created_at DESC LIMIT 500");
    return rows.map((x) => ({ ref: x.ref, type: "booking" as const, status: "NEW" as const, createdAt: new Date(x.created_at).toISOString(), data: x.data }));
  }
}

/** Stockage JSON local : développement uniquement (système de fichiers en lecture seule sur Vercel). */
export class FileStore implements RequestStore {
  constructor(private file = path.join(process.cwd(), ".data", "requests.json")) {}
  async list(): Promise<RequestRecord[]> {
    try { return JSON.parse(await fs.readFile(this.file, "utf8")); } catch { return []; }
  }
  async save(record: RequestRecord) {
    const all = await this.list();
    all.push(record);
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(all, null, 2));
    await fs.rename(tmp, this.file);
  }
}

/** Postgres si DATABASE_URL est définie ; sinon fichier local en développement ; sinon aucun stockage (l'action exige alors l'email interne). */
export function getStore(): RequestStore | null {
  if (hasDb()) return new PgStore();
  if (process.env.NODE_ENV !== "production" || process.env.ALLOW_FILE_STORE === "true") return new FileStore();
  return null;
}
