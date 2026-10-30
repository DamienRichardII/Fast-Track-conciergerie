import { db } from "@/server/db/pool";
import { ensureSchema } from "@/server/db/schema";

export { STATUSES };
export type { Status, AdminRequest, AdminMessage, AdminClient, AdminExperience, AdminSnapshot } from "@/features/admin/types";
import { STATUSES, type Status, type AdminExperience, type AdminSnapshot } from "@/features/admin/types";

const iso = (d: unknown) => (d ? new Date(d as string).toISOString() : "");
const day = (d: unknown) => (d ? String(d).slice(0, 10) : null);

export async function snapshot(): Promise<AdminSnapshot> {
  await ensureSchema();
  const [rq, ms, cl, ex] = await Promise.all([
    db().query("SELECT *, start_date::text AS sd, end_date::text AS ed FROM requests ORDER BY created_at DESC LIMIT 1000"),
    db().query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 500"),
    db().query(`SELECT u.id,u.name,u.email,u.phone,u.role,u.created_at,
                  (SELECT count(*) FROM requests r WHERE r.user_id=u.id OR lower(r.email)=lower(u.email)) AS n
                FROM users u ORDER BY u.created_at DESC LIMIT 500`),
    db().query("SELECT * FROM experiences ORDER BY position, slug"),
  ]);
  return {
    requests: rq.rows.map((r) => ({
      id: Number(r.id), ref: r.ref, service: r.service, client: r.client_name, email: r.email, phone: r.phone,
      startDate: day(r.sd), endDate: day(r.ed), participants: r.participants, status: r.status,
      notes: r.notes, data: r.data, createdAt: iso(r.created_at),
    })),
    messages: ms.rows.map((m) => ({ id: Number(m.id), ref: m.ref, name: m.name, email: m.email, phone: m.phone, subject: m.subject, body: m.body, read: m.is_read, createdAt: iso(m.created_at) })),
    clients: cl.rows.map((c) => ({ id: Number(c.id), name: c.name, email: c.email, phone: c.phone, role: c.role, requests: Number(c.n), createdAt: iso(c.created_at) })),
    experiences: ex.rows.map((e) => ({ slug: e.slug, title: e.title, place: e.place, duration: e.duration, body: e.body, includes: e.includes, note: e.note, visible: e.visible })),
  };
}

export async function updateRequest(id: number, patch: { status?: Status; notes?: string }) {
  if (patch.status && !STATUSES.includes(patch.status)) throw new Error("Statut invalide");
  await db().query(
    "UPDATE requests SET status=COALESCE($2,status), notes=COALESCE($3,notes) WHERE id=$1",
    [id, patch.status ?? null, patch.notes?.slice(0, 4000) ?? null],
  );
}
export const deleteRequest = (id: number) => db().query("DELETE FROM requests WHERE id=$1", [id]);
export const setMessageRead = (id: number, read: boolean) => db().query("UPDATE messages SET is_read=$2 WHERE id=$1", [id, read]);
export const deleteMessage = (id: number) => db().query("DELETE FROM messages WHERE id=$1", [id]);

export async function saveExperience(e: AdminExperience) {
  await db().query(
    `UPDATE experiences SET title=$2, place=$3, duration=$4, body=$5, includes=$6, note=$7, visible=$8, updated_at=now() WHERE slug=$1`,
    [e.slug, e.title.slice(0, 160), e.place.slice(0, 160), e.duration.slice(0, 40), e.body.slice(0, 4000), JSON.stringify(e.includes.slice(0, 20)), e.note.slice(0, 500), e.visible],
  );
}

export async function userRequests(uid: number, email: string) {
  await ensureSchema();
  const { rows } = await db().query(
    "SELECT ref, service, status, start_date::text AS start_date, created_at FROM requests WHERE user_id=$1 OR lower(email)=lower($2) ORDER BY created_at DESC LIMIT 100",
    [uid, email],
  );
  return rows.map((r) => ({ ref: r.ref as string, service: r.service as string, status: r.status as string, startDate: day(r.start_date), createdAt: iso(r.created_at) }));
}
