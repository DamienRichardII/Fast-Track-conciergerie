export const destinations = {
  cote: [
    { name: "Abidjan", kind: "Capitale économique", text: "Au bord de la lagune Ébrié : hôtels, tables d'exception et quartiers résidentiels comme Cocody, le Plateau ou Marcory.", tone: "sunset" },
    { name: "Assinie", kind: "Station balnéaire", text: "Une bande de sable entre l'océan et la lagune, à l'est d'Abidjan, prisée pour les week-ends et les séjours détente.", tone: "sea" },
    { name: "Îles Ehotilé", kind: "Nature et lagune", text: "Un archipel de la lagune Aby, près d'Aboisso, à découvrir lors d'excursions privées.", tone: "sea" },
    { name: "Yamoussoukro", kind: "Culture", text: "Capitale politique du pays, connue pour la basilique Notre-Dame de la Paix.", tone: "warm" },
    { name: "Parc national de Taï", kind: "Forêt tropicale", text: "Une vaste forêt tropicale dans l'ouest du pays, pour les amateurs de nature et de visites guidées.", tone: "night" },
  ],
  international: [
    { name: "Paris", kind: "Shopping et gastronomie", text: "Boutiques de luxe, hôtels et restaurants : un personal shopper peut organiser votre séjour.", tone: "warm" },
    { name: "Milan", kind: "Mode et design", text: "Une destination de référence pour le shopping sur mesure.", tone: "night" },
    { name: "Londres", kind: "Shopping et hôtels", text: "Boutiques, adresses de prestige et séjours organisés sur demande.", tone: "night" },
    { name: "Dubaï", kind: "Séjours et shopping", text: "Hôtels, villas et expériences exclusives, selon vos envies.", tone: "sunset" },
  ],
} as const;

export const steps = [
  { n: "1", title: "Votre demande", text: "Vous décrivez votre besoin en quelques étapes, ou nous écrivez directement." },
  { n: "2", title: "Notre proposition", text: "Notre équipe vérifie disponibilité et tarif, puis vous envoie une proposition." },
  { n: "3", title: "Confirmation", text: "Votre prestation est confirmée une fois la proposition validée par vos soins." },
];
