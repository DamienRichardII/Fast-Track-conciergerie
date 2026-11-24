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

/* Vidéos fournies par le client (public/media/jet/), en boucle et sans son.
   - jetHomeVideo : bloc Jet privé de la page d'accueil (même vidéo que le hero).
   - jetHeroVideo : hero de la page Jet privé. */
export const jetHeroVideo = { src: "/media/jet/hero.mp4", poster: "/media/jet/hero-poster.jpg" };
export const jetHomeVideo = jetHeroVideo; /* même vidéo que la page Jet privé, à la demande du client */

/* Flotte proposée par notre partenaire Jet Groupe International (flyjetgroupe.com). Photos : public/media/flotte/. */
export const jetFleet = [
  { name: "Citation Mustang", cat: "Jet très léger", pax: "4 à 5", range: 1150, text: "Idéal pour les trajets courts et régionaux, avec une consommation très maîtrisée.", src: "/media/flotte/1.webp", w: 1200, h: 675 },
  { name: "Citation Jet 2", cat: "Jet léger", pax: "6 à 7", range: 1500, text: "Le juste équilibre entre performances, confort et coûts d'exploitation.", src: "/media/flotte/2.webp", w: 1200, h: 800 },
  { name: "Citation VI", cat: "Jet léger", pax: "7 à 8", range: 2200, text: "Vitesse et autonomie remarquables, avec une cabine où l'on se tient debout.", src: "/media/flotte/9.webp", w: 1024, h: 683 },
  { name: "Citation Sovereign", cat: "Jet intermédiaire", pax: "8 à 9", range: 2700, text: "Autonomie transcontinentale et cabine spacieuse, hauteur debout.", src: "/media/flotte/3.webp", w: 1200, h: 600 },
  { name: "Falcon 900", cat: "Grand jet", pax: "12 à 14", range: 4500, text: "Grande autonomie et fiabilité de ses trois moteurs.", src: "/media/flotte/4.webp", w: 783, h: 391 },
  { name: "Global 6000", cat: "Très long courrier", pax: "13 à 16", range: 6000, text: "Vols intercontinentaux sans escale, dans un confort de cabine inégalé.", src: "/media/flotte/5.webp", w: 1200, h: 800 },
  { name: "Global Express", cat: "Très long courrier", pax: "14 à 19", range: 5900, text: "Cabine spacieuse avec espaces de vie distincts pour travailler ou se détendre.", src: "/media/flotte/6.webp", w: 1200, h: 800 },
  { name: "Boeing Business Jet", cat: "Avion de ligne VIP", pax: "25 à 50", range: 6000, plus: true, text: "Le summum de l'aviation privée : chambres et salles de réunion à taille réelle.", src: "/media/flotte/7.webp", w: 1200, h: 778 },
  { name: "Embraer Lineage 1000", cat: "Avion de ligne VIP", pax: "13 à 19", range: 4500, text: "Cinq espaces en cabine, dont une suite parentale avec lit et douche.", src: "/media/flotte/8.webp", w: 1200, h: 675 },
] as { name: string; cat: string; pax: string; range: number; plus?: boolean; text: string; src: string; w: number; h: number }[];
