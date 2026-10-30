export const STATUSES = ["Nouvelle", "En cours", "Devis envoyé", "Confirmée", "Terminée", "Annulée"] as const;
export type Status = (typeof STATUSES)[number];

export type AdminRequest = {
  id: number; ref: string; service: string; client: string; email: string; phone: string;
  startDate: string | null; endDate: string | null; participants: number | null;
  status: Status; notes: string; data: Record<string, unknown>; createdAt: string;
};
export type AdminMessage = { id: number; ref: string; name: string; email: string; phone: string; subject: string; body: string; read: boolean; createdAt: string };
export type AdminClient = { id: number; name: string; email: string; phone: string; role: string; requests: number; createdAt: string };
export type AdminExperience = { slug: string; title: string; place: string; duration: string; body: string; includes: string[]; note: string; visible: boolean };
export type AdminSnapshot = {
  requests: AdminRequest[]; messages: AdminMessage[]; clients: AdminClient[]; experiences: AdminExperience[];
};

