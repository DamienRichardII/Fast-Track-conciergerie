/* Événements & bons plans. Contenu d'exemple tiré des demandes du client : dates et détails à confirmer,
   à remplacer par la programmation réelle (modifier uniquement ce fichier). */
export type EventItem = {
  slug: string;
  tag: string;
  title: string;
  date: string;
  place: string;
  blurb: string;
  image: string;
  cta: string;
};

export const events: EventItem[] = [
  { slug: "match-cote-d-ivoire-france", tag: "Sport", title: "Côte d'Ivoire – France", date: "Date à confirmer", place: "Afrique",
    blurb: "Vivez le match en tribune VIP : places, transferts et accueil sur mesure.", image: "/media/events/sport.jpg", cta: "Réserver ma place VIP" },
  { slug: "concerts-du-moment", tag: "Concert", title: "Concerts du moment", date: "Programmation à venir", place: "Afrique",
    blurb: "Les grandes dates de la saison, avec places VIP sur demande.", image: "/media/events/concert.jpg", cta: "Demander une place VIP" },
  { slug: "rolex-edition-rare", tag: "Montres", title: "Rolex : sortie d'une pièce rare", date: "Sortie prochaine", place: "Sur commande",
    blurb: "Une référence rare qui arrive : notre équipe vous accompagne pour l'obtenir.", image: "/images/montres.jpg", cta: "Me faire accompagner" },
  { slug: "feu-d-artifice-vip", tag: "Événement", title: "Feu d'artifice en VIP", date: "Date à confirmer", place: "Abidjan",
    blurb: "Profitez du feu d'artifice depuis un emplacement privilégié.", image: "/media/events/feu.jpg", cta: "Réserver mon emplacement" },
];

export const eventLink = (e: EventItem, wa: string) =>
  `${wa}?text=${encodeURIComponent(`Bonjour Fast Track Conciergerie, je souhaite des informations : ${e.title} (${e.tag}).`)}`;
