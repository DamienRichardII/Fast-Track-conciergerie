/* Photographies libres de droits (Unsplash), en attendant les photos du client. */
export const photos = {
  jet: { src: "/images/jet.jpg", alt: "Jet privé sur le tarmac au coucher du soleil" },
  villa: { src: "/images/villa.jpg", alt: "Villa de luxe avec piscine à débordement face à la mer" },
  villaPiscine: { src: "/images/villa-piscine.jpg", alt: "Villa moderne avec piscine" },
  hotel: { src: "/images/hotel.jpg", alt: "Hôtel de luxe avec piscine et palmiers" },
  voiture: { src: "/images/voiture.jpg", alt: "SUV de luxe" },
  restaurant: { src: "/images/restaurant.jpg", alt: "Table gastronomique dressée" },
  restaurantSalle: { src: "/images/restaurant-salle.jpg", alt: "Salle de restaurant élégante" },
  activites: { src: "/images/activites.jpg", alt: "Plage tropicale et eau turquoise" },
  shopping: { src: "/images/shopping.jpg", alt: "Boutique de luxe" },
  montres: { src: "/images/montres.jpg", alt: "Montre de luxe en gros plan" },
  abidjan: { src: "/images/abidjan.jpg", alt: "Vue sur la lagune et les tours d'Abidjan", pos: "50% 90%" },
  plage: { src: "/images/plage.jpg", alt: "Plage tropicale bordée de palmiers" },
  foret: { src: "/images/foret.jpg", alt: "Forêt tropicale dans la brume" },
  canopee: { src: "/images/foret-canopee.jpg", alt: "Canopée d'une forêt tropicale" },
  paysage: { src: "/images/paysage.jpg", alt: "Fleuve et campagne vus du ciel" },
  paris: { src: "/images/paris.jpg", alt: "Tour Eiffel et la Seine au crépuscule" },
  milan: { src: "/images/milan.jpg", alt: "Cathédrale de Milan" },
  londres: { src: "/images/londres.jpg", alt: "Tower Bridge à Londres" },
  dubai: { src: "/images/dubai.jpg", alt: "Burj Al Arab et le front de mer de Dubaï vus du ciel" },
  villaSoir: { src: "/images/villa-soir.jpg", alt: "Villa avec piscine au crépuscule" },
} as const;
export type PhotoKey = keyof typeof photos;

export const servicePhoto: Record<string, PhotoKey> = {
  "jet-prive": "jet", "villas-de-luxe": "villa", hotels: "hotel", "location-de-voiture": "voiture",
  restaurants: "restaurant", "activites-touristiques": "activites", "shopping-europe": "shopping", "montres-de-luxe": "montres",
};
export const destinationPhoto: Record<string, PhotoKey> = {
  Abidjan: "abidjan", Assinie: "plage", "Îles Ehotilé": "canopee", Yamoussoukro: "paysage", "Parc national de Taï": "foret",
  Paris: "paris", Milan: "milan", Londres: "londres", Dubaï: "dubai",
};
