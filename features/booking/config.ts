export type Field = {
  name: string;
  label: string;
  type: "text" | "select" | "textarea" | "date";
  options?: string[];
  required?: boolean;
  /** Champ obligatoire seulement si un autre champ vaut une valeur donnée */
  requiredIf?: { field: string; equals: string };
  placeholder?: string;
};

export type ServiceForm = {
  dateMode: "range" | "single" | "none";
  dateRequired: boolean;
  dateLabel: string;
  /** Demande une heure souhaitée (date unique) */
  time: boolean;
  participantsLabel?: string;
  participantsRequired?: boolean;
  fields: Field[];
};

/* Formulaires par prestation, issus du cahier des charges. */
export const serviceForms: Record<string, ServiceForm> = {
  "jet-prive": {
    dateMode: "single", dateRequired: true, dateLabel: "Date de départ souhaitée", time: true,
    participantsLabel: "Passagers", participantsRequired: true,
    fields: [
      { name: "depart", label: "Départ", type: "text", required: true, placeholder: "Abidjan" },
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "trajet", label: "Type de trajet", type: "select", required: true, options: ["Aller simple", "Aller-retour"] },
      { name: "retour", label: "Date de retour", type: "date", requiredIf: { field: "trajet", equals: "Aller-retour" } },
      { name: "preferences", label: "Préférences", type: "textarea" },
    ],
  },
  "villas-de-luxe": {
    dateMode: "range", dateRequired: true, dateLabel: "Dates du séjour souhaitées", time: false,
    participantsLabel: "Voyageurs", participantsRequired: true,
    fields: [
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "equipements", label: "Équipements souhaités", type: "textarea", placeholder: "Piscine, vue mer, personnel…" },
    ],
  },
  hotels: {
    dateMode: "range", dateRequired: true, dateLabel: "Arrivée et départ souhaités", time: false,
    participantsLabel: "Voyageurs", participantsRequired: true,
    fields: [
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "categorie", label: "Catégorie", type: "select", options: ["5 étoiles", "4 étoiles", "Peu importe"] },
      { name: "chambre", label: "Type de chambre", type: "select", options: ["Chambre", "Suite", "Autre"] },
    ],
  },
  "location-de-voiture": {
    dateMode: "range", dateRequired: true, dateLabel: "Début et fin de location souhaités", time: false,
    participantsLabel: "Passagers",
    fields: [
      { name: "categorie", label: "Catégorie", type: "select", required: true, options: ["SUV", "Berline", "4x4", "Sportive", "Van", "Véhicule avec chauffeur"] },
      { name: "lieu", label: "Lieu de prise en charge", type: "text", required: true },
      { name: "options", label: "Options supplémentaires", type: "textarea", placeholder: "Livraison à domicile, chauffeur…" },
    ],
  },
  restaurants: {
    dateMode: "single", dateRequired: true, dateLabel: "Date souhaitée", time: true,
    participantsLabel: "Nombre de personnes", participantsRequired: true,
    fields: [
      { name: "ville", label: "Ville", type: "text", required: true, placeholder: "Abidjan" },
      { name: "cuisine", label: "Type de cuisine", type: "select", options: ["Gastronomique", "Internationale", "Africaine", "Fusion", "Rooftop", "Autre"] },
      { name: "preferences", label: "Préférences particulières", type: "textarea" },
    ],
  },
  "activites-touristiques": {
    dateMode: "single", dateRequired: true, dateLabel: "Date souhaitée", time: false,
    participantsLabel: "Participants", participantsRequired: true,
    fields: [
      { name: "type", label: "Type d'activité", type: "select", required: true, options: ["Excursion privée", "Sortie en mer", "Expérience culturelle", "Activité exclusive", "Visite guidée"] },
      { name: "lieu", label: "Lieu souhaité", type: "text" },
    ],
  },
  "shopping-europe": {
    dateMode: "single", dateRequired: false, dateLabel: "Date souhaitée (facultatif)", time: false,
    fields: [
      { name: "ville", label: "Ville", type: "select", required: true, options: ["Paris", "Milan", "Londres", "Autre"] },
      { name: "budget", label: "Budget indicatif", type: "text" },
      { name: "marques", label: "Marques recherchées", type: "textarea" },
      { name: "livraison", label: "Livraison internationale (sur devis)", type: "select", options: ["Oui", "Non"] },
    ],
  },
  "barber-a-domicile": {
    dateMode: "single", dateRequired: true, dateLabel: "Date souhaitée", time: true,
    participantsLabel: "Nombre de personnes", participantsRequired: true,
    fields: [
      { name: "ville", label: "Ville", type: "text", required: true, placeholder: "Abidjan" },
      { name: "adresse", label: "Lieu de la prestation", type: "select", required: true, options: ["Domicile", "Hôtel", "Villa", "Autre"] },
      { name: "prestation", label: "Prestation souhaitée", type: "select", required: true, options: ["Coupe", "Coupe et barbe", "Barbe seule", "Soin du visage", "Autre"] },
      { name: "preferences", label: "Précisions", type: "textarea" },
    ],
  },
  "montres-de-luxe": {
    dateMode: "none", dateRequired: false, dateLabel: "", time: false,
    fields: [
      { name: "demande", label: "Type de demande", type: "select", required: true, options: ["Achat", "Sourcing d'une référence"] },
      { name: "marque", label: "Marque", type: "text", required: true },
      { name: "reference", label: "Référence recherchée", type: "text" },
      { name: "budget", label: "Budget indicatif", type: "text" },
    ],
  },
};
