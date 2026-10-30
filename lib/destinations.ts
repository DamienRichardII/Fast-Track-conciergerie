/* Carte interactive et page Hôtels : exemples de destinations (partout dans le monde, la liste est élargissable) et lieux d'expériences en Côte d'Ivoire. */
export type Region = "villes" | "mer" | "afrique" | "asie";
export type HotelDest = { code: string; name: string; region: Region };

export const regions: { id: Region; title: string; text: string }[] = [
  { id: "villes", title: "Les grandes villes", text: "Capitales et métropoles, du boutique-hôtel au palace." },
  { id: "mer", title: "Bord de mer", text: "Îles, plages et séjours les pieds dans l'eau." },
  { id: "afrique", title: "Afrique et Maghreb", text: "De Marrakech au Cap, en passant par Abidjan." },
  { id: "asie", title: "Asie", text: "Japon, Corée, Vietnam, Thaïlande et bien d'autres." },
];

export const hotelDestinations: HotelDest[] = [
  { code: "CDG", name: "Paris", region: "villes" }, { code: "LHR", name: "Londres", region: "villes" }, { code: "JFK", name: "New York", region: "villes" },
  { code: "MXP", name: "Milan", region: "villes" }, { code: "FCO", name: "Rome", region: "villes" }, { code: "MAD", name: "Madrid", region: "villes" },
  { code: "BCN", name: "Barcelone", region: "villes" }, { code: "AMS", name: "Amsterdam", region: "villes" }, { code: "LIS", name: "Lisbonne", region: "villes" },
  { code: "ATH", name: "Athènes", region: "villes" }, { code: "IST", name: "Istanbul", region: "villes" }, { code: "DXB", name: "Dubaï", region: "villes" },
  { code: "DOH", name: "Doha", region: "villes" }, { code: "LAX", name: "Los Angeles", region: "villes" }, { code: "YYZ", name: "Toronto", region: "villes" },
  { code: "EZE", name: "Buenos Aires", region: "villes" },
  { code: "MIA", name: "Miami", region: "mer" }, { code: "CUN", name: "Cancún", region: "mer" }, { code: "MLE", name: "Maldives", region: "mer" },
  { code: "DPS", name: "Bali", region: "mer" }, { code: "MRU", name: "Île Maurice", region: "mer" }, { code: "SEZ", name: "Seychelles", region: "mer" },
  { code: "ZNZ", name: "Zanzibar", region: "mer" }, { code: "GIG", name: "Rio de Janeiro", region: "mer" }, { code: "SYD", name: "Sydney", region: "mer" },
  { code: "ABJ", name: "Abidjan", region: "afrique" }, { code: "RAK", name: "Marrakech", region: "afrique" }, { code: "CMN", name: "Casablanca", region: "afrique" },
  { code: "CAI", name: "Le Caire", region: "afrique" }, { code: "DKR", name: "Dakar", region: "afrique" }, { code: "ACC", name: "Accra", region: "afrique" },
  { code: "LOS", name: "Lagos", region: "afrique" }, { code: "NBO", name: "Nairobi", region: "afrique" }, { code: "CPT", name: "Le Cap", region: "afrique" },
  { code: "NRT", name: "Tokyo", region: "asie" }, { code: "ICN", name: "Séoul", region: "asie" }, { code: "HAN", name: "Hanoï", region: "asie" },
  { code: "BKK", name: "Bangkok", region: "asie" }, { code: "SIN", name: "Singapour", region: "asie" }, { code: "HKG", name: "Hong Kong", region: "asie" },
];

export type XpPlace = { code: string; name: string; text: string };
export const xpPlaces: XpPlace[] = [
  { code: "ABJ", name: "Abidjan", text: "Du Plateau à Cocody, en demi-journée, ou une soirée street food, avec chauffeur privé." },
  { code: "EHO", name: "Îles Éhotilé", text: "À deux heures d'Abidjan, un parc national de six îles sur la lagune Aby : forêt, mangroves et oiseaux." },
  { code: "ASS", name: "Assinie", text: "Une journée entre océan et lagune : mangroves en pirogue, île et poisson grillé." },
  { code: "YAM", name: "Yamoussoukro", text: "La basilique Notre-Dame de la Paix et la capitale politique du pays, en une journée." },
];
