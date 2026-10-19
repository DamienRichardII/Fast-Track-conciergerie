import {
  Plane, Home, Building2, CarFront, UtensilsCrossed, Palmtree, ShoppingBag, Watch,
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
    intro: "Séjours d'exception dans les plus beaux hôtels.",
    cta: "Voir les hôtels",
    atouts: ["Hôtels 5 étoiles", "Offres exclusives", "Meilleurs emplacements", "Service concierge"] },
  { slug: "location-de-voiture", path: "/location-de-voiture", title: "Location de voiture", short: "Location de voiture", icon: CarFront, mode: "QUOTE",
    intro: "SUV, berlines, 4x4, sportives et véhicules avec chauffeur.",
    cta: "Réserver un véhicule",
    atouts: ["Livraison à domicile", "Chauffeur sur demande", "Assurance incluse", "Location courte ou longue durée"] },
  { slug: "restaurants", path: "/restaurants", title: "Restaurants", short: "Restaurants", icon: UtensilsCrossed, mode: "QUOTE",
    intro: "Tables d'exception, accès VIP et recommandations sur mesure.",
    cta: "Réserver une table",
    atouts: ["Réservations exclusives", "Accès VIP", "Événements privés", "Recommandations sur mesure"] },
  { slug: "activites-touristiques", path: "/activites-touristiques", title: "Activités touristiques", short: "Activités touristiques", icon: Palmtree, mode: "QUOTE",
    intro: "Excursions privées, sorties en mer et expériences culturelles.",
    cta: "Découvrir les activités",
    atouts: ["Excursions privées", "Guides experts", "Expériences uniques", "Transferts inclus"] },
  { slug: "shopping-europe", path: "/shopping-europe", title: "Shopping sur mesure en Europe", short: "Shopping en Europe", icon: ShoppingBag, mode: "QUOTE",
    intro: "Un personal shopper dédié à Paris, Milan, Londres et ailleurs.",
    cta: "Demander un service",
    atouts: ["Personal shopper dédié", "Accès aux boutiques de luxe", "Gestion des achats", "Livraison internationale sur devis"] },
  { slug: "montres-de-luxe", path: "/montres-de-luxe", title: "Montres de luxe", short: "Montres de luxe", icon: Watch, mode: "QUOTE",
    intro: "Recherche et sourcing de pièces d'exception, sur demande.",
    cta: "Nous contacter",
    atouts: ["Conseil personnalisé", "Achat sur commande", "Livraison sécurisée", "Disponibilité sur demande"] },
];

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

/* URLs réseaux sociaux : à renseigner par le client (aucune URL inventée). */
export const socials = [
  { name: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "" },
  { name: "Snapchat", href: process.env.NEXT_PUBLIC_SNAPCHAT_URL ?? "" },
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
];
