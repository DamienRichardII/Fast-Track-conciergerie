/* Textes de la rubrique Jet privé, validés par l'équipe du client. */
export const jetTagline = "Décollez quand vous voulez, d'où vous voulez.";
export const jetIntro = "Vols à la demande à l'international : vous indiquez trajet, dates et nombre de voyageurs, nous revenons vers vous avec une proposition et un tarif clair.";
export const jetSteps = [
  { n: "01", title: "Vols à la demande", text: "Horaires et escales à votre main, aller simple ou aller-retour." },
  { n: "02", title: "Accueil dédié", text: "Salon privé, bagages pris en charge, chauffeur à l'arrivée." },
  { n: "03", title: "Interlocuteur unique", text: "Du devis à l'atterrissage, une personne dédiée et disponible 24/24 7/7 pour vous accompagner." },
] as const;

/* Photos du client pour la page Jet privé (public/media/jet/). */
export const jetPhotos = [
  { src: "/media/jet/01.jpg", alt: "Jet privé et Mercedes Classe G sur le tarmac, en journée", w: 909, h: 1600 },
  { src: "/media/jet/02.jpg", alt: "Portière ouverte d'un SUV au pied du jet, de nuit", w: 900, h: 1200 },
  { src: "/media/jet/03.jpg", alt: "Jet privé de nuit, SUV avec chauffeur au premier plan", w: 1200, h: 1600 },
  { src: "/media/jet/04.jpg", alt: "Porte ouverte d'un jet privé sur le tarmac", w: 1200, h: 1600 },
  { src: "/media/jet/05.jpg", alt: "Jet privé prêt au départ, de nuit", w: 900, h: 1600 },
  { src: "/media/jet/06.jpg", alt: "Cabine d'un jet privé, sièges en cuir", w: 536, h: 1192 },
  { src: "/media/jet/07.jpg", alt: "Cabine d'un jet privé, vue des sièges", w: 676, h: 1201 },
  { src: "/media/jet/08.jpg", alt: "Salon à bord d'un jet privé", w: 675, h: 1200 },
  { src: "/media/jet/09.jpg", alt: "Passagers sur le tarmac, de nuit", w: 1200, h: 1594 },
  { src: "/media/jet/10.jpg", alt: "Accueil des passagers dans un hangar privé", w: 736, h: 1275 },
  { src: "/media/jet/11.jpg", alt: "Coucher de soleil sur le tarmac", w: 736, h: 1308 },
  { src: "/media/jet/12.jpg", alt: "Passagers rejoignant le jet de nuit", w: 900, h: 1600 },
] as const;

/* Vidéo du hero Jet privé. Tant qu'aucune vidéo n'est fournie, le hero utilise une version animée (photo + trajets).
   Pour activer une vidéo : déposer les fichiers dans public/media/jet/ puis renseigner ici, par exemple
   { wide: "/media/jet/hero-wide.mp4", mobile: "/media/jet/hero-mobile.mp4", poster: "/media/jet/poster.jpg" }. */
export const jetVideo: { wide: string; mobile?: string; poster?: string } | null = null;
