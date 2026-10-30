"use client";

import { useState, useTransition } from "react";
import { LayoutDashboard, CalendarDays, MessageSquare, Compass, Users, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { STATUSES, type AdminSnapshot, type AdminRequest, type AdminMessage, type AdminExperience, type Status } from "./types";
import { setRequestStatus, setRequestNotes, removeRequest, markMessage, removeMessage, updateExperience } from "./actions";

const TABS = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "requests", label: "Demandes", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "experiences", label: "Expériences", icon: Compass },
  { id: "clients", label: "Clients", icon: Users },
] as const;
type Tab = (typeof TABS)[number]["id"];

const badge: Record<Status, string> = {
  Nouvelle: "bg-amber-100 text-amber-900", "En cours": "bg-sky-100 text-sky-900", "Devis envoyé": "bg-violet-100 text-violet-900",
  Confirmée: "bg-emerald-100 text-emerald-900", Terminée: "bg-stone-200 text-stone-800", Annulée: "bg-red-100 text-red-900",
};
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={cn("min-w-0 rounded-card bg-white p-5 shadow-soft", className)}>{children}</div>;
const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—");
const show = (v: unknown) => (v == null || v === "" ? "—" : String(v));

export function AdminApp({ initial }: { initial: AdminSnapshot }) {
  const [data, setData] = useState(initial);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [err, setErr] = useState("");
  const [, start] = useTransition();
  const unread = data.messages.filter((m) => !m.read).length;
  const fresh = data.requests.filter((r) => r.status === "Nouvelle").length;

  /** Applique d'abord le changement à l'écran, puis le confirme côté serveur (retour arrière si refus). */
  function run(optimistic: (d: AdminSnapshot) => AdminSnapshot, call: () => Promise<{ ok: boolean; error?: string }>) {
    const before = data;
    setErr(""); setData(optimistic(before));
    start(async () => {
      const res = await call();
      if (!res.ok) { setData(before); setErr(res.error ?? "Action impossible."); }
    });
  }
  const patchReq = (id: number, p: Partial<AdminRequest>) => (d: AdminSnapshot) => ({ ...d, requests: d.requests.map((r) => (r.id === id ? { ...r, ...p } : r)) });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[15rem_1fr]">
      <nav aria-label="Administration" className="min-w-0 rounded-card bg-navy p-3 text-ivory md:self-start">
        <ul className="flex gap-1 overflow-x-auto md:flex-col">
          {TABS.map((t) => (
            <li key={t.id} className="shrink-0">
              <button type="button" onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}
                className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition", tab === t.id ? "bg-white/10 font-semibold" : "text-ivory/70 hover:bg-white/5")}>
                <t.icon className="h-5 w-5 shrink-0" />{t.label}
                {t.id === "messages" && unread > 0 && <span className="ml-auto rounded-full bg-gold px-2 text-xs font-bold text-chocolate-deep">{unread}</span>}
                {t.id === "requests" && fresh > 0 && <span className="ml-auto rounded-full bg-gold px-2 text-xs font-bold text-chocolate-deep">{fresh}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 space-y-6">
        {err && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</p>}
        {tab === "dashboard" && <Dashboard data={data} />}
        {tab === "requests" && (
          <Requests list={data.requests}
            onStatus={(id, status) => run(patchReq(id, { status }), () => setRequestStatus(id, status))}
            onNotes={(id, notes) => run(patchReq(id, { notes }), () => setRequestNotes(id, notes))}
            onDelete={(id) => run((d) => ({ ...d, requests: d.requests.filter((r) => r.id !== id) }), () => removeRequest(id))} />
        )}
        {tab === "messages" && (
          <Messages list={data.messages}
            onRead={(id, read) => run((d) => ({ ...d, messages: d.messages.map((m) => (m.id === id ? { ...m, read } : m)) }), () => markMessage(id, read))}
            onDelete={(id) => run((d) => ({ ...d, messages: d.messages.filter((m) => m.id !== id) }), () => removeMessage(id))} />
        )}
        {tab === "experiences" && (
          <Experiences list={data.experiences}
            onSave={(e) => run((d) => ({ ...d, experiences: d.experiences.map((x) => (x.slug === e.slug ? e : x)) }), () => updateExperience(e))} />
        )}
        {tab === "clients" && <Clients data={data} />}
      </div>
    </div>
  );
}

function Dashboard({ data }: { data: AdminSnapshot }) {
  const count = (s: Status) => data.requests.filter((r) => r.status === s).length;
  const kpis: [string, number][] = [
    ["Demandes", data.requests.length], ["Nouvelles", count("Nouvelle")], ["Devis envoyés", count("Devis envoyé")],
    ["Confirmées", count("Confirmée")], ["Messages non lus", data.messages.filter((m) => !m.read).length], ["Comptes clients", data.clients.filter((c) => c.role === "client").length],
  ];
  const by = [...data.requests.reduce((m, r) => m.set(r.service, (m.get(r.service) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...by.map((b) => b[1]));
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {kpis.map(([l, v]) => <li key={l} className="rounded-card bg-white p-5 shadow-soft"><p className="font-serif text-3xl font-bold">{v}</p><p className="mt-1 text-sm text-ink/60">{l}</p></li>)}
      </ul>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><h2 className="font-semibold">Demandes par prestation</h2>
          {by.length === 0 && <p className="mt-4 text-sm text-ink/60">Aucune demande pour l&apos;instant.</p>}
          <ul className="mt-4 space-y-3 text-sm">{by.map(([l, v]) => (
            <li key={l}><div className="flex justify-between"><span>{l}</span><span className="font-semibold">{v}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-champagne/60"><div style={{ width: `${(v / max) * 100}%` }} className="h-full rounded-full bg-bronze" /></div></li>))}</ul></Card>
        <Card><h2 className="mb-3 font-semibold">Dernières demandes</h2>
          {data.requests.length === 0 && <p className="text-sm text-ink/60">Rien à afficher.</p>}
          <ul className="divide-y divide-champagne text-sm">{data.requests.slice(0, 5).map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3"><span className="min-w-0"><span className="block truncate font-medium">{r.service}</span><span className="text-ink/60">{r.client} · {fmt(r.createdAt)}</span></span>
              <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", badge[r.status])}>{r.status}</span></li>))}</ul></Card>
      </div>
    </>
  );
}

function csvCell(v: unknown) { return `"${String(v ?? "").replaceAll('"', '""')}"`; }
function exportCsv(list: AdminRequest[]) {
  const head = ["Référence", "Reçue le", "Prestation", "Client", "Email", "Téléphone", "Début", "Fin", "Personnes", "Statut", "Notes"];
  const rows = list.map((r) => [r.ref, r.createdAt.slice(0, 10), r.service, r.client, r.email, r.phone, r.startDate, r.endDate, r.participants, r.status, r.notes]);
  const blob = new Blob(["﻿" + [head, ...rows].map((r) => r.map(csvCell).join(";")).join("\n")], { type: "text/csv;charset=utf-8" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "demandes.csv" });
  a.click(); URL.revokeObjectURL(a.href);
}

function Requests({ list, onStatus, onNotes, onDelete }: { list: AdminRequest[]; onStatus: (id: number, s: Status) => void; onNotes: (id: number, n: string) => void; onDelete: (id: number) => void }) {
  const [fs, setFs] = useState(""); const [q, setQ] = useState(""); const [open, setOpen] = useState<number | null>(null);
  const [draft, setDraft] = useState<Record<number, string>>({});
  const needle = q.trim().toLowerCase();
  const rows = list.filter((r) => (!fs || r.status === fs) && (!needle || [r.ref, r.client, r.email, r.service].some((x) => x.toLowerCase().includes(needle))));
  return (
    <Card>
      <div className="flex flex-wrap items-end gap-3">
        <h2 className="mr-auto font-semibold">Demandes de réservation ({rows.length})</h2>
        <Input label="Recherche" placeholder="Nom, email, référence…" value={q} onChange={(e) => setQ(e.target.value)} className="w-52" />
        <Select label="Statut" options={[...STATUSES]} placeholder="Tous" value={fs} onChange={(e) => setFs(e.target.value)} className="w-40" />
        <Button size="sm" variant="outline" onClick={() => exportCsv(rows)} disabled={!rows.length}><Download className="mr-1 h-4 w-4" />CSV</Button>
      </div>
      {rows.length === 0 && <p className="mt-6 text-sm text-ink/60">Aucune demande ne correspond.</p>}
      <ul className="mt-4 divide-y divide-champagne">
        {rows.map((r) => (
          <li key={r.id} className="py-4">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setOpen(open === r.id ? null : r.id)} aria-expanded={open === r.id} className="min-w-0 flex-1 text-left">
                <span className="block truncate font-medium">{r.service}</span>
                <span className="text-sm text-ink/60">{r.ref} · {r.client} · {r.startDate ? `pour le ${fmt(r.startDate)}` : `reçue le ${fmt(r.createdAt)}`}</span>
              </button>
              <select aria-label={`Statut de ${r.ref}`} value={r.status} onChange={(e) => onStatus(r.id, e.target.value as Status)} className={cn("rounded-full border-0 px-3 py-1.5 text-xs font-semibold", badge[r.status])}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {open === r.id && (
              <div className="mt-3 space-y-4 rounded-xl bg-ivory p-4 text-sm">
                <div className="grid gap-2 sm:grid-cols-2">
                  <p><span className="text-ink/60">Email :</span> <a className="underline" href={`mailto:${r.email}`}>{r.email}</a></p>
                  <p><span className="text-ink/60">Téléphone :</span> {r.phone ? <a className="underline" href={`tel:${r.phone}`}>{r.phone}</a> : "—"}</p>
                  <p><span className="text-ink/60">Dates :</span> {fmt(r.startDate)}{r.endDate ? ` → ${fmt(r.endDate)}` : ""}</p>
                  <p><span className="text-ink/60">Personnes :</span> {show(r.participants)}</p>
                </div>
                <dl className="grid gap-x-6 gap-y-1 border-t border-champagne pt-3 sm:grid-cols-2">
                  {Object.entries(r.data).filter(([k, v]) => v !== "" && v != null && !["Nom", "Email", "Téléphone", "Prestation"].includes(k)).map(([k, v]) => (
                    <div key={k}><dt className="inline text-ink/60">{k} : </dt><dd className="inline">{String(v)}</dd></div>
                  ))}
                </dl>
                <Textarea label="Notes internes" value={draft[r.id] ?? r.notes} onChange={(e) => setDraft({ ...draft, [r.id]: e.target.value })} onBlur={() => draft[r.id] !== undefined && draft[r.id] !== r.notes && onNotes(r.id, draft[r.id])} />
                <button type="button" onClick={() => { if (confirm(`Supprimer définitivement la demande ${r.ref} ?`)) onDelete(r.id); }} className="w-fit text-xs font-semibold text-red-700 underline">Supprimer cette demande</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Messages({ list, onRead, onDelete }: { list: AdminMessage[]; onRead: (id: number, r: boolean) => void; onDelete: (id: number) => void }) {
  return (
    <Card><h2 className="mb-3 font-semibold">Messages reçus ({list.length})</h2>
      {list.length === 0 && <p className="text-sm text-ink/60">Aucun message.</p>}
      <ul className="divide-y divide-champagne">{list.map((m) => (
        <li key={m.id} className="py-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={cn(!m.read && "font-bold")}>{m.name} <span className="font-normal text-ink/60">· {m.email}{m.phone ? ` · ${m.phone}` : ""} · {fmt(m.createdAt)}</span></p>
            <span className="flex gap-4 text-xs font-semibold">
              <a className="underline" href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + m.subject)}`} onClick={() => !m.read && onRead(m.id, true)}>Répondre</a>
              <button type="button" className="underline" onClick={() => onRead(m.id, !m.read)}>{m.read ? "Marquer non lu" : "Marquer lu"}</button>
              <button type="button" className="text-red-700 underline" onClick={() => { if (confirm("Supprimer ce message ?")) onDelete(m.id); }}>Supprimer</button>
            </span>
          </div>
          {m.subject && <p className="mt-1 font-medium">{m.subject}</p>}
          <p className="mt-1 whitespace-pre-line text-ink/80">{m.body}</p></li>))}</ul></Card>
  );
}

function Experiences({ list, onSave }: { list: AdminExperience[]; onSave: (e: AdminExperience) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink/60">Les textes modifiés ici apparaissent sur le site sous une minute. Les photos restent gérées dans le code.</p>
      {list.map((e) => <ExperienceForm key={e.slug} e={e} onSave={onSave} />)}
    </div>
  );
}
function ExperienceForm({ e, onSave }: { e: AdminExperience; onSave: (e: AdminExperience) => void }) {
  const [f, setF] = useState({ ...e, includesText: e.includes.join("\n") });
  const dirty = JSON.stringify([f.title, f.place, f.duration, f.body, f.includesText, f.note, f.visible]) !== JSON.stringify([e.title, e.place, e.duration, e.body, e.includes.join("\n"), e.note, e.visible]);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold">{e.title} <span className="text-xs font-normal text-ink/50">/{e.slug}</span></h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.visible} onChange={(x) => setF({ ...f, visible: x.target.checked })} className="h-4 w-4 accent-[#a87848]" /> Visible sur le site</label>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Input label="Titre" className="sm:col-span-3" value={f.title} onChange={(x) => setF({ ...f, title: x.target.value })} />
        <Input label="Lieu" value={f.place} onChange={(x) => setF({ ...f, place: x.target.value })} />
        <Select label="Durée" options={["Demi-journée", "Journée", "Soirée"]} value={f.duration} onChange={(x) => setF({ ...f, duration: x.target.value })} />
        <Textarea label="Description" className="sm:col-span-3" value={f.body} onChange={(x) => setF({ ...f, body: x.target.value })} />
        <Textarea label="Inclus (une ligne par élément)" className="sm:col-span-2" value={f.includesText} onChange={(x) => setF({ ...f, includesText: x.target.value })} />
        <Input label="Remarque (facultatif)" value={f.note} onChange={(x) => setF({ ...f, note: x.target.value })} />
      </div>
      <Button size="sm" className="mt-4" disabled={!dirty}
        onClick={() => onSave({ slug: e.slug, title: f.title, place: f.place, duration: f.duration, body: f.body, note: f.note, visible: f.visible, includes: f.includesText.split("\n").map((s) => s.trim()).filter(Boolean) })}>
        Enregistrer
      </Button>
    </Card>
  );
}

function Clients({ data }: { data: AdminSnapshot }) {
  return (
    <Card className="overflow-x-auto"><h2 className="mb-3 font-semibold">Comptes ({data.clients.length})</h2>
      {data.clients.length === 0 && <p className="text-sm text-ink/60">Aucun compte pour l&apos;instant.</p>}
      <table className="w-full min-w-[32rem] text-left text-sm"><thead className="text-ink/50"><tr><th className="pb-2 font-medium">Nom</th><th className="pb-2 font-medium">Email</th><th className="pb-2 font-medium">Rôle</th><th className="pb-2 font-medium">Demandes</th><th className="pb-2 font-medium">Inscrit le</th></tr></thead>
        <tbody className="divide-y divide-champagne">{data.clients.map((c) => <tr key={c.id}><td className="py-3 font-medium">{c.name || "—"}</td><td>{c.email}</td><td>{c.role === "admin" ? "Admin" : "Client"}</td><td>{c.requests}</td><td>{fmt(c.createdAt)}</td></tr>)}</tbody></table></Card>
  );
}
