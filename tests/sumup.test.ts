import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCheckout, getCheckout, sumupConfigured } from "@/server/payments/sumup";

const env = { ...process.env };
beforeEach(() => { process.env.SUMUP_API_KEY = "sup_sk_test"; process.env.SUMUP_MERCHANT_CODE = "MC123"; process.env.NEXT_PUBLIC_SITE_URL = "https://exemple.test/"; });
afterEach(() => { process.env = { ...env }; vi.restoreAllMocks(); });

describe("SumUp", () => {
  it("n'est actif qu'avec les deux variables", () => {
    expect(sumupConfigured()).toBe(true);
    delete process.env.SUMUP_MERCHANT_CODE;
    expect(sumupConfigured()).toBe(false);
  });

  it("crée un paiement hébergé avec le bon corps et la clé en Bearer", async () => {
    const f = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "c1", status: "PENDING", hosted_checkout_url: "https://checkout.sumup.com/pay/x" }), { status: 201 }));
    const c = await createCheckout({ ref: "FT-261117-ABCDE", amount: 120.456, description: "Test" });
    expect(c.hosted_checkout_url).toContain("checkout.sumup.com");
    const [url, init] = f.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.sumup.com/v0.1/checkouts");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer sup_sk_test");
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ amount: 120.46, currency: "EUR", merchant_code: "MC123", hosted_checkout: { enabled: true }, redirect_url: "https://exemple.test/payer/FT-261117-ABCDE/merci", return_url: "https://exemple.test/api/sumup/webhook" });
    expect(body.checkout_reference.length).toBeLessThanOrEqual(64);
  });

  it("remonte une erreur SumUp sans exposer la clé", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("nope", { status: 401 }));
    await expect(createCheckout({ ref: "FT-261117-ABCDE", amount: 10, description: "x" })).rejects.toThrow(/401/);
    await expect(getCheckout("c1")).rejects.toThrow(/401/);
  });
});
