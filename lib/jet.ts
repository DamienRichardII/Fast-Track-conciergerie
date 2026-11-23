/* Textes de la rubrique Jet privé, validés par l'équipe du client. */
export const jetTagline = "Décollez quand vous voulez, d'où vous voulez.";
export const jetIntro = "Vols à la demande à l'international : vous indiquez trajet, dates et nombre de voyageurs, nous revenons vers vous avec une proposition et un tarif clair.";
export const jetSteps = [
  { n: "01", title: "Vols à la demande", text: "Horaires et escales à votre main, aller simple ou aller-retour." },
  { n: "02", title: "Accueil dédié", text: "Salon privé, bagages pris en charge, chauffeur à l'arrivée." },
  { n: "03", title: "Interlocuteur unique", text: "Du devis à l'atterrissage, une personne dédiée et disponible 24/24 7/7 pour vous accompagner." },
] as const;

/* Vidéo du hero Jet privé. Tant qu'aucune vidéo n'est fournie, le hero utilise une version animée (photo + trajets).
   Pour activer une vidéo : déposer les fichiers dans public/media/jet/ puis renseigner ici, par exemple
   { wide: "/media/jet/hero-wide.mp4", mobile: "/media/jet/hero-mobile.mp4", poster: "/media/jet/poster.jpg" }. */
export const jetVideo: { wide: string; mobile?: string; poster?: string } | null = null;
