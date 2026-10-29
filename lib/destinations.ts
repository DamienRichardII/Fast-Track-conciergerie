/* Carte interactive : exemples de destinations d'hôtels, partout dans le monde (la liste est élargissable) et lieux d'expériences en Côte d'Ivoire. */
export type HotelDest = { code: string; name: string };
export const hotelDestinations: HotelDest[] = [
  { code: "CDG", name: "Paris" }, { code: "LHR", name: "Londres" }, { code: "AMS", name: "Amsterdam" }, { code: "MXP", name: "Milan" },
  { code: "FCO", name: "Rome" }, { code: "BCN", name: "Barcelone" }, { code: "MAD", name: "Madrid" }, { code: "LIS", name: "Lisbonne" },
  { code: "ATH", name: "Athènes" }, { code: "IST", name: "Istanbul" },
  { code: "RAK", name: "Marrakech" }, { code: "CMN", name: "Casablanca" }, { code: "CAI", name: "Le Caire" }, { code: "DKR", name: "Dakar" },
  { code: "ACC", name: "Accra" }, { code: "LOS", name: "Lagos" }, { code: "NBO", name: "Nairobi" }, { code: "ZNZ", name: "Zanzibar" },
  { code: "CPT", name: "Le Cap" }, { code: "MRU", name: "Île Maurice" }, { code: "SEZ", name: "Seychelles" },
  { code: "DXB", name: "Dubaï" }, { code: "DOH", name: "Doha" }, { code: "MLE", name: "Maldives" },
  { code: "BKK", name: "Bangkok" }, { code: "SIN", name: "Singapour" }, { code: "DPS", name: "Bali" }, { code: "HKG", name: "Hong Kong" },
  { code: "NRT", name: "Tokyo" }, { code: "SYD", name: "Sydney" },
  { code: "JFK", name: "New York" }, { code: "MIA", name: "Miami" }, { code: "LAX", name: "Los Angeles" }, { code: "YYZ", name: "Toronto" },
  { code: "CUN", name: "Cancún" }, { code: "GIG", name: "Rio de Janeiro" }, { code: "EZE", name: "Buenos Aires" },
];

export type XpPlace = { code: string; name: string; text: string };
export const xpPlaces: XpPlace[] = [
  { code: "ABJ", name: "Abidjan", text: "City tour, découverte du Plateau à Cocody et sorties en ville avec un chauffeur privé." },
  { code: "BAS", name: "Grand Bassam", text: "Un après-midi dans l'ancienne capitale coloniale, entre plage, architecture et artisanat." },
  { code: "ASS", name: "Assinie", text: "Une journée à l'est d'Abidjan : plage, lagune et visite des mangroves." },
  { code: "YAM", name: "Yamoussoukro", text: "La basilique Notre-Dame de la Paix et la capitale politique du pays, en une journée." },
];
