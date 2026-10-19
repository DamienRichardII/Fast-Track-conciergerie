import { promises as fs } from "node:fs";
import path from "node:path";

export type RequestRecord = {
  ref: string;
  type: "booking" | "contact";
  status: "NEW";
  createdAt: string;
  data: Record<string, unknown>;
};

export interface RequestStore {
  save(record: RequestRecord): Promise<void>;
  list(): Promise<RequestRecord[]>;
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

/**
 * Choix du stockage. La base Supabase/Prisma sera branchée ici (Phase 5).
 * En production sans base, aucun stockage : l'action n'annonce un succès que si l'email interne est parti.
 */
export function getStore(): RequestStore | null {
  if (process.env.NODE_ENV !== "production" || process.env.ALLOW_FILE_STORE === "true") return new FileStore();
  return null;
}
