import { NextResponse } from "next/server";
import { hasDb } from "@/server/db/pool";
import { sumupConfigured } from "@/server/payments/sumup";
import { syncCheckout } from "@/server/payments/store";

export const dynamic = "force-dynamic";

/** Rappel SumUp (CHECKOUT_STATUS_CHANGED). Le corps n'est jamais cru : on relit le paiement chez SumUp. */
export async function POST(req: Request) {
  let body: { event_type?: string; id?: string } = {};
  try { body = await req.json(); } catch { /* corps vide */ }
  if (body.event_type !== "CHECKOUT_STATUS_CHANGED" || typeof body.id !== "string" || body.id.length > 80) return new NextResponse(null, { status: 204 });
  if (!hasDb() || !sumupConfigured()) return new NextResponse(null, { status: 204 });
  try {
    await syncCheckout(body.id);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("[sumup] webhook", e);
    return new NextResponse(null, { status: 500 }); // SumUp réessaie (1 min, 5 min, 20 min, 2 h)
  }
}
