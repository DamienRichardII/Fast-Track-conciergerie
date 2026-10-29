/* Carte interactive : destinations d'hôtels proposées en exemple (la liste est élargissable) et lieux d'expériences en Côte d'Ivoire. */
export type HotelDest = { code: string; name: string };
export const hotelDestinations: HotelDest[] = [
  { code: "CDG", name: "Paris" }, { code: "LHR", name: "Londres" }, { code: "MXP", name: "Milan" }, { code: "FCO", name: "Rome" },
  { code: "BCN", name: "Barcelone" }, { code: "LIS", name: "Lisbonne" }, { code: "IST", name: "Istanbul" }, { code: "RAK", name: "Marrakech" },
  { code: "DXB", name: "Dubaï" }, { code: "JFK", name: "New York" }, { code: "MIA", name: "Miami" }, { code: "BKK", name: "Bangkok" },
];

export type XpPlace = { code: string; name: string; text: string };
export const xpPlaces: XpPlace[] = [
  { code: "ABJ", name: "Abidjan", text: "City tour, découverte du Plateau à Cocody et sorties en ville avec un chauffeur privé." },
  { code: "BAS", name: "Grand Bassam", text: "Un après-midi dans l'ancienne capitale coloniale, entre plage, architecture et artisanat." },
  { code: "ASS", name: "Assinie", text: "Plage, détente et sortie en lagune, à l'est d'Abidjan." },
  { code: "YAM", name: "Yamoussoukro", text: "La basilique Notre-Dame de la Paix et la capitale politique du pays, en une journée." },
];
