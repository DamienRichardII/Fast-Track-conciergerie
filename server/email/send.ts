export const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Mail = { to: string; subject: string; html: string; replyTo?: string };

/** Envoi via l'API Resend (fetch, sans dépendance). Retourne false si non configuré ou en échec. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [mail.to], subject: mail.subject, html: mail.html, reply_to: mail.replyTo }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const wrap = (title: string, body: string) =>
  `<div style="font-family:Arial,sans-serif;background:#FAF6EE;padding:24px;color:#171411"><div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;padding:28px"><h1 style="font-family:Georgia,serif;color:#55331D;font-size:22px;margin:0 0 16px">${esc(title)}</h1>${body}<p style="margin-top:24px;font-size:12px;color:#777">Fast Track Conciergerie — Abidjan</p></div></div>`;

const rows = (o: Record<string, unknown>) =>
  `<table style="width:100%;font-size:14px;border-collapse:collapse">${Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:6px 8px 6px 0;color:#777;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`)
    .join("")}</table>`;

export const adminMail = (ref: string, title: string, fields: Record<string, unknown>) =>
  wrap(`${title} — ${ref}`, rows(fields));

export const customerMail = (ref: string, intro: string) =>
  wrap("Votre demande a bien été reçue", `<p style="font-size:14px">${esc(intro)}</p><p style="font-size:14px">Référence : <strong>${esc(ref)}</strong></p><p style="font-size:14px">Aucun paiement n'est demandé à cette étape. Notre équipe revient vers vous pour confirmer la disponibilité et le tarif.</p>`);
