/* Expériences à Abidjan et en Côte d'Ivoire : descriptifs fournis par l'équipe du client.
   Une vue par expérience ; « Réserver » ouvre directement le formulaire. */
export type Duration = "Demi-journée" | "Journée" | "Soirée";

export type Experience = {
  slug: string;
  title: string;
  place: string;
  duration: Duration;
  text: string;
  includes: string[];
  note?: string;
  /** Photo réelle du client, si disponible (sinon fond sobre en attendant). */
  cover?: string;
  coverAlt?: string;
};

const TRANSPORT = "Chauffeur et véhicule climatisé";
const GUIDE = "Guide francophone / anglophone";
const DRINKS = "Rafraîchissements à bord";
const MEAL = "Repas compris";

export const experiences: Experience[] = [
  {
    slug: "abidjan-plateau-cocody", title: "Abidjan : du Plateau à Cocody", place: "Abidjan", duration: "Demi-journée",
    text: "Les tours du Plateau, la cathédrale Saint-Paul, les avenues de Cocody et les points de vue sur la lagune Ébrié, avec un chauffeur privé. Visite du marché de Treichville.",
    includes: [TRANSPORT, GUIDE, DRINKS, MEAL],
    cover: "/media/city/cover.jpg", coverAlt: "Abidjan, du Plateau à Cocody",
  },
  {
    slug: "night-street-food", title: "Night street food", place: "Abidjan", duration: "Soirée",
    text: "Une tournée dans les meilleures adresses de rue à la tombée de la nuit : garba, alloco, poisson braisé, brochettes… Des adresses choisies et quelqu'un avec vous d'un arrêt à l'autre, avec chauffeur privé.",
    includes: [TRANSPORT, GUIDE, "Dégustations"],
    note: "Merci de nous préciser s'il y a des allergies.",
  },
  {
    slug: "yamoussoukro-basilique", title: "Yamoussoukro et sa basilique", place: "Yamoussoukro", duration: "Journée",
    text: "Environ trois heures de route vers la capitale politique, pour visiter la basilique Notre-Dame de la Paix, l'une des plus grandes églises du monde, et la ville qui l'entoure, avec chauffeur privé.",
    includes: [TRANSPORT, GUIDE, DRINKS, "Entrée dans la basilique", MEAL],
    cover: "/media/basilique/cover.jpg", coverAlt: "La basilique de Yamoussoukro",
  },
  {
    slug: "assinie-mangroves", title: "Assinie et ses mangroves", place: "Assinie", duration: "Journée",
    text: "Direction Assinie, entre l'océan et la lagune. Une balade en pirogue dans les mangroves de la lagune, au calme, avec un guide. Traversée en bateau vers une petite île pour une journée farniente : baignade et poisson grillé au déjeuner.",
    includes: [TRANSPORT, GUIDE, DRINKS, MEAL],
    cover: "/media/activites/cover.jpg", coverAlt: "Assinie",
  },
  {
    slug: "iles-ehotile", title: "Parc national des îles Éhotilé", place: "Îles Éhotilé", duration: "Journée",
    text: "À deux heures d'Abidjan, un parc national de six îles posées sur la lagune Aby. On les rejoint en bateau pour découvrir la forêt, les mangroves, les oiseaux et l'histoire du peuple Éhotilé, pour qui certaines îles sont sacrées.",
    includes: [TRANSPORT, GUIDE, DRINKS, "Entrée du parc national", MEAL],
  },
];

export const experienceBySlug = (slug?: string) => experiences.find((e) => e.slug === slug);
