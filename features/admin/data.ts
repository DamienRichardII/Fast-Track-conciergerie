import { services } from "@/lib/services";
import { destinations } from "@/lib/content";
import { site } from "@/lib/site";

export const STATUSES = ["Nouvelle", "En cours", "Devis envoyé", "Confirmée", "Terminée", "Annulée"] as const;
export type Status = (typeof STATUSES)[number];

export type Request = { id: string; ref: string; service: string; client: string; email: string; phone: string; date: string; people: string; status: Status; notes: string; createdAt: string };
export type Message = { id: string; name: string; email: string; text: string; read: boolean; createdAt: string };
export type ServiceRow = { slug: string; title: string; intro: string; visible: boolean };
export type DestRow = { name: string; kind: string; group: "cote" | "international"; visible: boolean };
export type Settings = { email: string; phone: string; tiktok: string; snapchat: string; instagram: string; depositRate: string; cancellation: string; hours: string };
export type AdminData = { requests: Request[]; messages: Message[]; services: ServiceRow[]; destinations: DestRow[]; settings: Settings };

const d = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

export function seed(): AdminData {
  return {
    requests: [
      { id: "r1", ref: "FT-260001", service: "villas-de-luxe", client: "Awa K.", email: "awa@example.com", phone: "+225 07 00 00 00 01", date: "2026-11-14", people: "4", status: "Nouvelle", notes: "Souhaite une villa avec piscine à Cocody.", createdAt: d(0) },
      { id: "r2", ref: "FT-260002", service: "jet-prive", client: "Jean-Marc D.", email: "jm@example.com", phone: "+33 6 00 00 00 02", date: "2026-11-22", people: "3", status: "Devis envoyé", notes: "Abidjan → Paris, aller simple.", createdAt: d(2) },
      { id: "r3", ref: "FT-260003", service: "restaurants", client: "Fatou S.", email: "fatou@example.com", phone: "+225 05 00 00 00 03", date: "2026-11-19", people: "6", status: "Confirmée", notes: "Table en terrasse, anniversaire.", createdAt: d(4) },
      { id: "r4", ref: "FT-260004", service: "barber-a-domicile", client: "Ibrahim T.", email: "ibrahim@example.com", phone: "+225 01 00 00 00 04", date: "2026-11-08", people: "2", status: "En cours", notes: "Coupe et barbe à l'hôtel.", createdAt: d(1) },
      { id: "r5", ref: "FT-260005", service: "location-de-voiture", client: "Mariam B.", email: "mariam@example.com", phone: "+225 07 00 00 00 05", date: "2026-09-02", people: "3", status: "Terminée", notes: "SUV avec chauffeur, 3 jours.", createdAt: d(40) },
    ],
    messages: [
      { id: "m1", name: "Serge A.", email: "serge@example.com", text: "Bonjour, proposez-vous des transferts depuis l'aéroport ?", read: false, createdAt: d(0) },
      { id: "m2", name: "Linda M.", email: "linda@example.com", text: "Je cherche une montre de collection, pouvez-vous m'aider ?", read: true, createdAt: d(3) },
    ],
    services: services.map((s) => ({ slug: s.slug, title: s.title, intro: s.intro, visible: true })),
    destinations: [
      ...destinations.cote.map((x) => ({ name: x.name, kind: x.kind, group: "cote" as const, visible: true })),
      ...destinations.international.map((x) => ({ name: x.name, kind: x.kind, group: "international" as const, visible: true })),
    ],
    settings: {
      email: site.email, phone: site.phone, tiktok: "", snapchat: "", instagram: "",
      depositRate: "30", cancellation: "Annulation gratuite jusqu'à 48 h avant la prestation.", hours: "Lun – Sam, 8 h – 20 h (Abidjan)",
    },
  };
}
