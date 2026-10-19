"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutDashboard, CalendarDays, MessageSquare, Briefcase, MapPin, Users, ImageIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { photos, servicePhoto, destinationPhoto } from "@/lib/photos";
import { useAdminData } from "./useAdminData";
import { STATUSES, type AdminData, type Request, type Status } from "./data";

const TABS = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "requests", label: "Demandes", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "services", label: "Prestations", icon: Briefcase },
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "clients", label: "Clients", icon: Users },
  { id: "media", label: "Photos", icon: ImageIcon },
  { id: "settings", label: "Paramètres", icon: Settings },
] as const;
type Tab = (typeof TABS)[number]["id"];

const badge: Record<Status, string> = {
  Nouvelle: "bg-amber-100 text-amber-900", "En cours": "bg-sky-100 text-sky-900", "Devis envoyé": "bg-violet-100 text-violet-900",
  Confirmée: "bg-emerald-100 text-emerald-900", Terminée: "bg-stone-200 text-stone-800", Annulée: "bg-red-100 text-red-900",
};
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={cn("min-w-0 rounded-card bg-white p-5 shadow-soft", className)}>{children}</div>;
const fmt = (iso: string) => (iso ? new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—");

export function AdminApp() {
  const { data, save, reset } = useAdminData();
  const [tab, setTab] = useState<Tab>("dashboard");
  const title = (slug: string) => data.services.find((s) => s.slug === slug)?.title ?? slug;
  const set = (patch: Partial<AdminData>) => save({ ...data, ...patch });
  const unread = data.messages.filter((m) => !m.read).length;
  const fresh = data.requests.filter((r) => r.status === "Nouvelle").length;

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
        <p role="note" className="rounded-xl border border-bronze/40 bg-champagne/40 px-4 py-3 text-sm text-chocolate">
          Accès temporaire sans connexion. Les modifications sont enregistrées dans ce navigateur uniquement ; elles ne changent pas encore le site public.
        </p>
        {tab === "dashboard" && <Dashboard data={data} title={title} />}
        {tab === "requests" && <Requests data={data} set={set} title={title} />}
        {tab === "messages" && <Messages data={data} set={set} />}
        {tab === "services" && <Services data={data} set={set} />}
        {tab === "destinations" && <Destinations data={data} set={set} />}
        {tab === "clients" && <Clients data={data} />}
        {tab === "media" && <Media data={data} />}
        {tab === "settings" && <SettingsTab data={data} set={set} reset={reset} />}
      </div>
    </div>
  );
}

type P = { data: AdminData; set: (p: Partial<AdminData>) => void };

function Dashboard({ data, title }: { data: AdminData; title: (s: string) => string }) {
  const count = (s: Status) => data.requests.filter((r) => r.status === s).length;
  const kpis = [
    ["Demandes", data.requests.length], ["Nouvelles", count("Nouvelle")], ["Devis envoyés", count("Devis envoyé")],
    ["Confirmées", count("Confirmée")], ["Messages non lus", data.messages.filter((m) => !m.read).length], ["Clients", new Set(data.requests.map((r) => r.email)).size],
  ];
  const by = data.services.map((s) => [s.title, data.requests.filter((r) => r.service === s.slug).length] as const).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...by.map((b) => b[1]));
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {kpis.map(([l, v]) => <li key={l} className="rounded-card bg-white p-5 shadow-soft"><p className="font-serif text-3xl font-bold">{v}</p><p className="mt-1 text-sm text-ink/60">{l}</p></li>)}
      </ul>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><h2 className="font-semibold">Demandes par prestation</h2>
          <ul className="mt-4 space-y-3 text-sm">{by.map(([l, v]) => (
            <li key={l}><div className="flex justify-between"><span>{l}</span><span className="font-semibold">{v}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-champagne/60"><div style={{ width: `${(v / max) * 100}%` }} className="h-full rounded-full bg-bronze" /></div></li>))}</ul></Card>
        <Card><h2 className="mb-3 font-semibold">Dernières demandes</h2>
          <ul className="divide-y divide-champagne text-sm">{[...data.requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5).map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3"><span className="min-w-0"><span className="block truncate font-medium">{title(r.service)}</span><span className="text-ink/60">{r.client} · {fmt(r.date)}</span></span>
              <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", badge[r.status])}>{r.status}</span></li>))}</ul></Card>
      </div>
    </>
  );
}

function Requests({ data, set, title }: P & { title: (s: string) => string }) {
  const [fs, setFs] = useState(""); const [fv, setFv] = useState(""); const [open, setOpen] = useState<string | null>(null); const [adding, setAdding] = useState(false);
  const [f, setF] = useState({ client: "", phone: "", email: "", service: data.services[0]?.slug ?? "", date: "", people: "", notes: "" });
  const slugOf = (t: string) => data.services.find((x) => x.title === t)?.slug ?? "";
  const titles = data.services.map((x) => x.title);
  const list = data.requests.filter((r) => (!fs || r.status === fs) && (!fv || r.service === slugOf(fv)));
  const upd = (id: string, p: Partial<Request>) => set({ requests: data.requests.map((r) => (r.id === id ? { ...r, ...p } : r)) });
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.client.trim()) return;
    const n = data.requests.length + 1;
    set({ requests: [{ id: `r${Date.now()}`, ref: `FT-${String(260000 + n)}`, status: "Nouvelle", createdAt: new Date().toISOString().slice(0, 10), ...f, client: f.client.trim() }, ...data.requests] });
    setF({ ...f, client: "", phone: "", email: "", date: "", people: "", notes: "" }); setAdding(false);
  };
  return (
    <Card>
      <div className="flex flex-wrap items-end gap-3">
        <h2 className="mr-auto font-semibold">Demandes de réservation ({list.length})</h2>
        <Select label="Statut" options={[...STATUSES]} placeholder="Tous" value={fs} onChange={(e) => setFs(e.target.value)} className="w-40" />
        <Select label="Prestation" options={titles} placeholder="Toutes" value={fv} onChange={(e) => setFv(e.target.value)} className="w-48" />
        <Button size="sm" onClick={() => setAdding(!adding)}>{adding ? "Fermer" : "Nouvelle demande"}</Button>
      </div>
      {adding && (
        <form onSubmit={add} className="mt-4 grid gap-3 rounded-xl bg-ivory p-4 sm:grid-cols-2">
          <Input label="Client" required value={f.client} onChange={(e) => setF({ ...f, client: e.target.value })} />
          <Select label="Prestation" options={titles} value={title(f.service)} onChange={(e) => setF({ ...f, service: slugOf(e.target.value) })} />
          <Input label="Téléphone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <Input label="Email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <Input label="Date souhaitée" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
          <Input label="Personnes" value={f.people} onChange={(e) => setF({ ...f, people: e.target.value })} />
          <Textarea label="Notes" className="sm:col-span-2" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
          <Button type="submit" size="sm" className="sm:col-span-2 sm:w-fit">Enregistrer la demande</Button>
        </form>
      )}
      {list.length === 0 && <p className="mt-6 text-sm text-ink/60">Aucune demande ne correspond.</p>}
      <ul className="mt-4 divide-y divide-champagne">
        {list.map((r) => (
          <li key={r.id} className="py-4">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setOpen(open === r.id ? null : r.id)} aria-expanded={open === r.id} className="min-w-0 flex-1 text-left">
                <span className="block truncate font-medium">{title(r.service)}</span>
                <span className="text-sm text-ink/60">{r.ref} · {r.client} · {fmt(r.date)}</span>
              </button>
              <select aria-label={`Statut de ${r.ref}`} value={r.status} onChange={(e) => upd(r.id, { status: e.target.value as Status })} className={cn("rounded-full border-0 px-3 py-1.5 text-xs font-semibold", badge[r.status])}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {open === r.id && (
              <div className="mt-3 grid gap-3 rounded-xl bg-ivory p-4 text-sm sm:grid-cols-2">
                <p><span className="text-ink/60">Téléphone :</span> {r.phone || "—"}</p>
                <p><span className="text-ink/60">Email :</span> {r.email || "—"}</p>
                <p><span className="text-ink/60">Personnes :</span> {r.people || "—"}</p>
                <p><span className="text-ink/60">Reçue le :</span> {fmt(r.createdAt)}</p>
                <Textarea label="Notes internes" className="sm:col-span-2" value={r.notes} onChange={(e) => upd(r.id, { notes: e.target.value })} />
                <button type="button" onClick={() => set({ requests: data.requests.filter((x) => x.id !== r.id) })} className="w-fit text-xs font-semibold text-red-700 underline">Supprimer cette demande</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Messages({ data, set }: P) {
  const upd = (id: string, read: boolean) => set({ messages: data.messages.map((m) => (m.id === id ? { ...m, read } : m)) });
  return (
    <Card><h2 className="mb-3 font-semibold">Messages reçus ({data.messages.length})</h2>
      {data.messages.length === 0 && <p className="text-sm text-ink/60">Aucun message.</p>}
      <ul className="divide-y divide-champagne">{data.messages.map((m) => (
        <li key={m.id} className="py-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className={cn(!m.read && "font-bold")}>{m.name} <span className="font-normal text-ink/60">· {m.email} · {fmt(m.createdAt)}</span></p>
            <span className="flex gap-4 text-xs font-semibold">
              <a className="underline" href={`mailto:${m.email}`}>Répondre</a>
              <button type="button" className="underline" onClick={() => upd(m.id, !m.read)}>{m.read ? "Marquer non lu" : "Marquer lu"}</button>
              <button type="button" className="text-red-700 underline" onClick={() => set({ messages: data.messages.filter((x) => x.id !== m.id) })}>Supprimer</button></span></div>
          <p className="mt-2 text-ink/80">{m.text}</p></li>))}</ul></Card>
  );
}

function Services({ data, set }: P) {
  const upd = (slug: string, p: object) => set({ services: data.services.map((s) => (s.slug === slug ? { ...s, ...p } : s)) });
  return (
    <div className="space-y-4">{data.services.map((s) => (
      <Card key={s.slug}><div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold">{s.title} <span className="text-xs font-normal text-ink/50">/{s.slug}</span></h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.visible} onChange={(e) => upd(s.slug, { visible: e.target.checked })} className="h-4 w-4 accent-[#a87848]" /> Visible sur le site</label></div>
        <div className="mt-3 grid gap-3"><Input label="Titre" value={s.title} onChange={(e) => upd(s.slug, { title: e.target.value })} />
          <Textarea label="Description" value={s.intro} onChange={(e) => upd(s.slug, { intro: e.target.value })} /></div></Card>))}</div>
  );
}

function Destinations({ data, set }: P) {
  const [n, setN] = useState(""); const [k, setK] = useState(""); const [g, setG] = useState("cote");
  const add = (e: React.FormEvent) => { e.preventDefault(); if (!n.trim()) return; set({ destinations: [...data.destinations, { name: n.trim(), kind: k.trim(), group: g as "cote" | "international", visible: true }] }); setN(""); setK(""); };
  return (
    <Card><h2 className="mb-3 font-semibold">Destinations</h2>
      <ul className="divide-y divide-champagne text-sm">{data.destinations.map((d) => (
        <li key={d.name} className="flex flex-wrap items-center justify-between gap-3 py-3">
          <span><span className="font-medium">{d.name}</span> <span className="text-ink/60">· {d.kind} · {d.group === "cote" ? "Côte d'Ivoire" : "International"}</span></span>
          <span className="flex items-center gap-4 text-xs font-semibold"><label className="flex items-center gap-2"><input type="checkbox" checked={d.visible} onChange={(e) => set({ destinations: data.destinations.map((x) => (x.name === d.name ? { ...x, visible: e.target.checked } : x)) })} className="h-4 w-4 accent-[#a87848]" />Visible</label>
            <button type="button" className="text-red-700 underline" onClick={() => set({ destinations: data.destinations.filter((x) => x.name !== d.name) })}>Supprimer</button></span></li>))}</ul>
      <form onSubmit={add} className="mt-4 grid gap-3 rounded-xl bg-ivory p-4 sm:grid-cols-3">
        <Input label="Nom" value={n} onChange={(e) => setN(e.target.value)} required /><Input label="Type" value={k} onChange={(e) => setK(e.target.value)} />
        <Select label="Groupe" options={["cote", "international"]} value={g} onChange={(e) => setG(e.target.value)} />
        <Button type="submit" size="sm" className="sm:w-fit">Ajouter la destination</Button></form></Card>
  );
}

function Clients({ data }: { data: AdminData }) {
  const map = new Map<string, { name: string; email: string; phone: string; n: number; last: string }>();
  data.requests.forEach((r) => { const k = r.email || r.client; const c = map.get(k); map.set(k, { name: r.client, email: r.email, phone: r.phone, n: (c?.n ?? 0) + 1, last: !c || r.createdAt > c.last ? r.createdAt : c.last }); });
  const rows = [...map.values()];
  return (
    <Card className="overflow-x-auto"><h2 className="mb-3 font-semibold">Clients ({rows.length})</h2>
      <table className="w-full min-w-[32rem] text-left text-sm"><thead className="text-ink/50"><tr><th className="pb-2 font-medium">Nom</th><th className="pb-2 font-medium">Contact</th><th className="pb-2 font-medium">Demandes</th><th className="pb-2 font-medium">Dernière</th></tr></thead>
        <tbody className="divide-y divide-champagne">{rows.map((c) => <tr key={c.email || c.name}><td className="py-3 font-medium">{c.name}</td><td>{c.email || "—"}<br /><span className="text-ink/60">{c.phone}</span></td><td>{c.n}</td><td>{fmt(c.last)}</td></tr>)}</tbody></table></Card>
  );
}

function Media({ data }: { data: AdminData }) {
  const used = new Map<string, string[]>();
  const add = (k: string, w: string) => used.set(k, [...(used.get(k) ?? []), w]);
  data.services.forEach((s) => servicePhoto[s.slug] && add(servicePhoto[s.slug], s.title));
  Object.entries(destinationPhoto).forEach(([n, k]) => add(k, n));
  return (
    <Card><h2 className="mb-1 font-semibold">Photos du site</h2><p className="mb-4 text-sm text-ink/60">Photos libres de droits en attendant celles du client. Remplacez les fichiers de <code>public/images</code> pour les changer.</p>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">{Object.entries(photos).map(([k, p]) => (
        <li key={k} className="overflow-hidden rounded-xl border border-champagne"><div className="relative aspect-[4/3]"><Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover" /></div>
          <p className="p-3 text-xs"><span className="block font-semibold">{p.src.replace("/images/", "")}</span><span className="text-ink/60">{used.get(k)?.join(", ") ?? "Pages et bannières"}</span></p></li>))}</ul></Card>
  );
}

function SettingsTab({ data, set, reset }: P & { reset: () => void }) {
  const s = data.settings; const up = (k: keyof typeof s, v: string) => set({ settings: { ...s, [k]: v } });
  return (
    <Card><h2 className="mb-4 font-semibold">Paramètres du site</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email de contact" type="email" value={s.email} onChange={(e) => up("email", e.target.value)} />
        <Input label="Téléphone" value={s.phone} onChange={(e) => up("phone", e.target.value)} />
        <Input label="TikTok (URL)" value={s.tiktok} onChange={(e) => up("tiktok", e.target.value)} />
        <Input label="Snapchat (URL)" value={s.snapchat} onChange={(e) => up("snapchat", e.target.value)} />
        <Input label="Instagram (URL)" value={s.instagram} onChange={(e) => up("instagram", e.target.value)} />
        <Input label="Acompte (%)" inputMode="numeric" value={s.depositRate} onChange={(e) => up("depositRate", e.target.value)} />
        <Input label="Horaires" className="sm:col-span-2" value={s.hours} onChange={(e) => up("hours", e.target.value)} />
        <Textarea label="Politique d'annulation" className="sm:col-span-2" value={s.cancellation} onChange={(e) => up("cancellation", e.target.value)} />
      </div>
      <button type="button" onClick={reset} className="mt-6 text-sm font-semibold text-red-700 underline">Réinitialiser les données du back-office</button></Card>
  );
}
