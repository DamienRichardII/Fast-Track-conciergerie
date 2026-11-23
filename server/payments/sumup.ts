/** Intégration SumUp (Hosted Checkout) — appels serveur uniquement, clé secrète jamais exposée au navigateur. */
const API = "https://api.sumup.com/v0.1";

export type SumupStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";
export type Checkout = { id: string; status: SumupStatus; amount: number; checkout_reference: string; hosted_checkout_url?: string };

export function sumupConfigured(): boolean {
  return Boolean(process.env.SUMUP_API_KEY && process.env.SUMUP_MERCHANT_CODE);
}

function headers() {
  return { Authorization: `Bearer ${process.env.SUMUP_API_KEY}`, "Content-Type": "application/json" };
}

/** Base publique du site (redirections et rappel serveur). */
export function siteBase(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return env.replace(/\/$/, "");
}

export async function createCheckout(p: { ref: string; amount: number; description: string }): Promise<Checkout> {
  if (!sumupConfigured()) throw new Error("SumUp non configuré");
  const base = siteBase();
  const res = await fetch(`${API}/checkouts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      // 64 caractères max, unique à chaque tentative (un même identifiant renverrait une erreur 409)
      checkout_reference: `${p.ref}-${Date.now().toString(36)}`,
      amount: Math.round(p.amount * 100) / 100,
      currency: "EUR",
      merchant_code: process.env.SUMUP_MERCHANT_CODE,
      description: p.description.slice(0, 200),
      redirect_url: `${base}/payer/${encodeURIComponent(p.ref)}/merci`,
      return_url: `${base}/api/sumup/webhook`,
      hosted_checkout: { enabled: true },
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`SumUp ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as Checkout;
}

/** Source de vérité : on relit toujours le paiement chez SumUp, jamais le navigateur ni le corps du webhook. */
export async function getCheckout(id: string): Promise<Checkout> {
  const res = await fetch(`${API}/checkouts/${encodeURIComponent(id)}`, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`SumUp ${res.status}`);
  return (await res.json()) as Checkout;
}
