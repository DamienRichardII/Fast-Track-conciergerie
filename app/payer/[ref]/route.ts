import { NextResponse, type NextRequest } from "next/server";
import { REF_PATTERN } from "@/server/requests/ref";
import { hasDb } from "@/server/db/pool";
import { rateLimit } from "@/server/security/rate-limit";
import { createCheckout, getCheckout, sumupConfigured, siteBase } from "@/server/payments/sumup";
import { payRow, setCheckout } from "@/server/payments/store";

export const dynamic = "force-dynamic";

/** Lien de paiement : crée (ou reprend) une session SumUp pour la demande, puis y redirige le client. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ ref: string }> }) {
  const { ref } = await ctx.params;
  const base = siteBase();
  const back = (code: string) => NextResponse.redirect(`${base}/payer/${encodeURIComponent(ref)}/merci?e=${code}`, 303);
  if (!REF_PATTERN.test(ref)) return NextResponse.redirect(`${base}/`, 303);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "?";
  if (!rateLimit(`pay:${ip}`, 12, 10 * 60_000)) return back("limite");
  if (!hasDb() || !sumupConfigured()) return back("indisponible");

  try {
    const row = await payRow(ref);
    if (!row || !row.amount) return back("introuvable");
    if (row.status === "paid") return back("deja");
    // Session précédente encore valable : on la reprend plutôt que d'en créer une seconde.
    if (row.status === "pending" && row.checkoutId) {
      const c = await getCheckout(row.checkoutId).catch(() => null);
      if (c?.status === "PENDING" && c.hosted_checkout_url) return NextResponse.redirect(c.hosted_checkout_url, 303);
    }
    const c = await createCheckout({ ref, amount: row.amount, description: `Fast Track Conciergerie — ${row.service} (${ref})` });
    if (!c.hosted_checkout_url) throw new Error("hosted_checkout_url absent");
    await setCheckout(row.id, c.id);
    return NextResponse.redirect(c.hosted_checkout_url, 303);
  } catch (e) {
    console.error("[sumup] création du paiement impossible", e);
    return back("erreur");
  }
}
