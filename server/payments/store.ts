import { db } from "@/server/db/pool";
import { ensureSchema } from "@/server/db/schema";
import { getCheckout, type SumupStatus } from "./sumup";

export type PayRow = { id: number; ref: string; service: string; amount: number | null; status: string; checkoutId: string | null };

export async function payRow(ref: string): Promise<PayRow | null> {
  await ensureSchema();
  const { rows } = await db().query("SELECT id, ref, service, pay_amount, pay_status, pay_checkout_id FROM requests WHERE ref=$1", [ref]);
  const r = rows[0];
  return r ? { id: Number(r.id), ref: r.ref, service: r.service, amount: r.pay_amount == null ? null : Number(r.pay_amount), status: r.pay_status, checkoutId: r.pay_checkout_id } : null;
}

export async function setCheckout(id: number, checkoutId: string) {
  await db().query("UPDATE requests SET pay_checkout_id=$2, pay_status='pending' WHERE id=$1 AND pay_status <> 'paid'", [id, checkoutId]);
}

const MAP: Record<SumupStatus, string> = { PAID: "paid", PENDING: "pending", FAILED: "failed", EXPIRED: "failed" };

/** Relit le paiement chez SumUp et met la demande à jour. Retourne le statut interne. */
export async function syncCheckout(checkoutId: string): Promise<string | null> {
  const c = await getCheckout(checkoutId);
  const status = MAP[c.status] ?? "pending";
  const { rows } = await db().query(
    `UPDATE requests SET pay_status=$2,
       paid_at = CASE WHEN $2='paid' THEN COALESCE(paid_at, now()) ELSE paid_at END,
       status = CASE WHEN $2='paid' AND status IN ('Nouvelle','En cours','Devis envoyé') THEN 'Confirmée' ELSE status END
     WHERE pay_checkout_id=$1 AND (pay_status <> 'paid' OR $2='paid') RETURNING pay_status`,
    [checkoutId, status],
  );
  return rows[0]?.pay_status ?? null;
}
