import {
  Plane, Home, Building2, CarFront, UtensilsCrossed, Palmtree, ShoppingBag, Watch, Scissors, Sparkles, ChefHat,
  type LucideIcon,
} from "lucide-react";

export type ServiceMode = "DIRECT" | "QUOTE";

export type Service = {
  slug: string;
  path: string;
  title: string;
  short: string;
  intro: string;
  icon: LucideIcon;
  mode: ServiceMode;
  cta: string;
  atouts: string[];
};

/* Contenu issu des maquettes validées. Libellés corrigés des fautes visibles sur les visuels IA. */
export const services: Service[] = [
  { slug: "jet-prive", path: "/jet-prive", title: "Jet privé", short: "Jet privé", icon: Plane, mode: "QUOTE",
    intro: "Une liberté sans limites : vols privés, groupes et itinéraires sur mesure, avec accueil VIP à l'aéroport.",
    cta: "Demander un devis",
    atouts: ["Départs depuis Abidjan", "Destinations mondiales", "Service VIP", "Conciergerie aéroport"] },
  { slug: "villas-de-luxe", path: "/villas-de-luxe", title: "Villas de luxe", short: "Villas de luxe", icon: Home, mode: "QUOTE",
    intro: "Des villas d'exception à Abidjan et dans les plus belles destinations.",
    cta: "Voir les villas",
    atouts: ["Villas avec piscine", "Vue mer", "Personnel inclus", "Sécurité 24/7"] },
  { slug: "hotels", path: "/hotels", title: "Hôtels", short: "Hôtels", icon: Building2, mode: "QUOTE",
    intro: "Du boutique-hôtel au palace, réservés pour vous à des tarifs privilégiés.",
    cta: "Demander un hôtel",
    atouts: ["Les plus belles adresses", "Partout dans le monde", "Tarifs privilégiés", "Un seul interlocuteur"] },
  { slug: "location-de-voiture", path: "/location-de-voiture", title: "Location de voiture", short: "Location de voiture", icon: CarFront, mode: "QUOTE",
    intro: "SUV, berlines, 4x4, sportives et véhicules avec chauffeur.",
    cta: "Réserver un véhicule",
    atouts: ["Livraison à domicile", "Chauffeur sur demande", "Assurance incluse", "Location courte ou longue durée"] },
  { slug: "restaurants", path: "/restaurants", title: "Restaurants", short: "Restaurants", icon: UtensilsCrossed, mode: "QUOTE",
    intro: "Tables d'exception, accès VIP et recommandations sur mesure.",
    cta: "Réserver une table",
    atouts: ["Réservations exclusives", "Accès VIP", "Événements privés", "Recommandations sur mesure"] },
  { slug: "activites-touristiques", path: "/activites-touristiques", title: "Expériences à Abidjan", short: "Expériences Abidjan", icon: Palmtree, mode: "QUOTE",
    intro: "Des journées et des sorties pensées pour découvrir Abidjan et la Côte d'Ivoire sans rien avoir à organiser.",
    cta: "Demander un devis",
    atouts: ["Excursions privées", "Guides experts", "Expériences uniques", "Transferts inclus"] },
  { slug: "shopping-europe", path: "/shopping-europe", title: "Shopping sur mesure en Europe", short: "Shopping en Europe", icon: ShoppingBag, mode: "QUOTE",
    intro: "Un personal shopper dédié à Paris, Milan, Londres et ailleurs.",
    cta: "Demander un service",
    atouts: ["Personal shopper dédié", "Accès aux boutiques de luxe", "Gestion des achats", "Livraison internationale sur devis"] },
  { slug: "montres-de-luxe", path: "/montres-de-luxe", title: "Montres de luxe", short: "Montres de luxe", icon: Watch, mode: "QUOTE",
    intro: "Recherche et sourcing de pièces d'exception, sur demande.",
    cta: "Nous contacter",
    atouts: ["Conseil personnalisé", "Achat sur commande", "Livraison sécurisée", "Disponibilité sur demande"] },
  { slug: "barber-a-domicile", path: "/barber-a-domicile", title: "Barber à domicile", short: "Barber à domicile", icon: Scissors, mode: "QUOTE",
    intro: "Coupe, taille de barbe et soins : un barber professionnel se déplace chez vous, à l'hôtel ou en villa.",
    cta: "Réserver un barber",
    atouts: ["Déplacement à domicile", "Coupe et barbe", "Matériel professionnel", "Créneaux sur demande"] },
  { slug: "chef-a-domicile", path: "/chef-a-domicile", title: "Chef cuisine à domicile", short: "Chef à domicile", icon: ChefHat, mode: "QUOTE",
    intro: "Un chef prépare un repas sur mesure chez vous, en villa ou à l'hôtel, du déjeuner au dîner privé.",
    cta: "Réserver un chef",
    atouts: ["Menu sur mesure", "À domicile, en villa ou à l'hôtel", "Régimes et allergies pris en compte", "Disponibilité sur demande"] },
];

/* Conciergerie privée : tout ce qui n'est ni hôtel ni expérience, présenté dans une seule rubrique. */
export const sharedGroup = {
  slug: "conciergerie-privee",
  path: "/conciergerie-privee",
  title: "Conciergerie privée",
  short: "Conciergerie privée",
  icon: Sparkles,
  members: ["shopping-europe", "montres-de-luxe", "villas-de-luxe", "location-de-voiture", "restaurants", "jet-prive", "barber-a-domicile", "chef-a-domicile"],
};

/* Les 3 rubriques de l'accueil, fil conducteur du site. */
export type Entry = { kind: "service"; service: Service } | { kind: "group" };
export const entries: Entry[] = [
  { kind: "service", service: services.find((s) => s.slug === "hotels")! },
  { kind: "service", service: services.find((s) => s.slug === "activites-touristiques")! },
  { kind: "group" },
];

export const nav = [
  { href: "/hotels", label: "Hôtels" },
  { href: "/activites-touristiques", label: "Expériences Abidjan" },
  { href: "/conciergerie-privee", label: "Conciergerie" },
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
];

export const footerNav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

/* URLs réseaux sociaux : à renseigner par le client (aucune URL inventée). Le client n'a pas de compte TikTok ni Instagram pour l'instant : seul Snapchat est affiché. */
export const socials = [
  { name: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "" },
  { name: "Snapchat", href: process.env.NEXT_PUBLIC_SNAPCHAT_URL ?? "" },
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
];
