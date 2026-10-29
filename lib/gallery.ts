/* Photos et vidéos du client (dossiers public/media, optimisés depuis public/images). */
export type GalleryItem =
  | { type: "image"; src: string; w: number; h: number; alt: string }
  | { type: "video"; src: string; poster: string; w: number; h: number; alt: string };

/* Au plus 3 photos par activité (demande client), pas de vidéo. */
const top3 = (items: GalleryItem[]): GalleryItem[] => items.filter((i) => i.type === "image").slice(0, 3);

export const galleries: Record<string, { cover: string; coverAlt: string; title: string; items: GalleryItem[] }> = {
  "activites-touristiques": {
    cover: "/media/activites/cover.jpg", coverAlt: "Journée à Assinie", title: "Une journée à Assinie",
    items: top3([
      { type: "image", src: "/media/activites/01.jpg", w: 1050, h: 1400, alt: "Journée à Assinie — photo 1" },
      { type: "image", src: "/media/activites/02.jpg", w: 787, h: 1400, alt: "Journée à Assinie — photo 2" },
      { type: "image", src: "/media/activites/03.jpg", w: 839, h: 1400, alt: "Journée à Assinie — photo 3" },
      { type: "image", src: "/media/activites/04.jpg", w: 1026, h: 1400, alt: "Journée à Assinie — photo 4" },
      { type: "image", src: "/media/activites/05.jpg", w: 736, h: 1308, alt: "Journée à Assinie — photo 5" },
      { type: "image", src: "/media/activites/06.jpg", w: 1050, h: 1400, alt: "Journée à Assinie — photo 6" },
      { type: "image", src: "/media/activites/07.jpg", w: 1050, h: 1400, alt: "Journée à Assinie — photo 7" },
      { type: "image", src: "/media/activites/08.jpg", w: 1050, h: 1400, alt: "Journée à Assinie — photo 8" },
      { type: "image", src: "/media/activites/09.jpg", w: 787, h: 1400, alt: "Journée à Assinie — photo 9" },
      { type: "image", src: "/media/activites/10.jpg", w: 933, h: 1400, alt: "Journée à Assinie — photo 10" },
      { type: "video", src: "/media/activites/video-01.mp4", poster: "/media/activites/video-01.jpg", w: 480, h: 720, alt: "Journée à Assinie — vidéo 1" },
      { type: "video", src: "/media/activites/video-02.mp4", poster: "/media/activites/video-02.jpg", w: 480, h: 720, alt: "Journée à Assinie — vidéo 2" },
      { type: "video", src: "/media/activites/video-03.mp4", poster: "/media/activites/video-03.jpg", w: 480, h: 752, alt: "Journée à Assinie — vidéo 3" },
      { type: "video", src: "/media/activites/video-04.mp4", poster: "/media/activites/video-04.jpg", w: 480, h: 704, alt: "Journée à Assinie — vidéo 4" },
    ]),
  },
};

/* Activités touristiques : une carte par activité, ouvrant sa propre page (photos + vidéos). */
export type Activity = { duration?: "Demi-journée" | "Journée complète" | "Soirée"; slug: string; title: string; blurb: string; cover?: string; coverAlt?: string; items: GalleryItem[] };

export const activities: Activity[] = [
  {
    slug: "journee-a-assinie",
    duration: "Journée complète",
    title: "Une journée à Assinie : visite des mangroves",
    blurb: "Une journée à Assinie, entre océan, lagune et visite des mangroves.",
    cover: galleries["activites-touristiques"].cover,
    coverAlt: galleries["activites-touristiques"].coverAlt,
    items: top3(galleries["activites-touristiques"].items),
  },
  {
    slug: "apres-midi-a-grand-bassam",
    duration: "Demi-journée",
    title: "Un après-midi à Grand Bassam",
    blurb: "Architecture coloniale, marché, plage et table au bord de l'eau.",
    cover: "/media/bassam/cover.jpg",
    coverAlt: "Un après-midi à Grand Bassam",
    items: top3([
      { type: "image", src: "/media/bassam/01.jpg", w: 1320, h: 1298, alt: "Grand Bassam — photo 1" },
      { type: "image", src: "/media/bassam/02.jpg", w: 787, h: 1400, alt: "Grand Bassam — photo 2" },
      { type: "image", src: "/media/bassam/03.jpg", w: 1020, h: 1020, alt: "Grand Bassam — photo 3" },
      { type: "image", src: "/media/bassam/04.jpg", w: 787, h: 1400, alt: "Grand Bassam — photo 4" },
      { type: "image", src: "/media/bassam/05.jpg", w: 1120, h: 1400, alt: "Grand Bassam — photo 5" },
      { type: "image", src: "/media/bassam/06.jpg", w: 787, h: 1400, alt: "Grand Bassam — photo 6" },
      { type: "image", src: "/media/bassam/07.jpg", w: 688, h: 1026, alt: "Grand Bassam — photo 7" },
      { type: "image", src: "/media/bassam/08.jpg", w: 787, h: 1400, alt: "Grand Bassam — photo 8" },
      { type: "image", src: "/media/bassam/09.jpg", w: 1063, h: 1400, alt: "Grand Bassam — photo 9" },
      { type: "video", src: "/media/bassam/video-01.mp4", poster: "/media/bassam/video-01.jpg", w: 480, h: 800, alt: "Grand Bassam — vidéo 1" },
    ]),
  },
  {
    slug: "city-tour-abidjan",
    duration: "Demi-journée",
    title: "City tour Abidjan",
    blurb: "Ponts, tours et monuments : le visage d'Abidjan.",
    cover: "/media/city/cover.jpg",
    coverAlt: "City tour Abidjan",
    items: top3([
      { type: "image", src: "/media/city/01.jpg", w: 933, h: 1400, alt: "City tour Abidjan — photo 1" },
      { type: "image", src: "/media/city/02.jpg", w: 1050, h: 1400, alt: "City tour Abidjan — photo 2" },
      { type: "image", src: "/media/city/03.jpg", w: 787, h: 1400, alt: "City tour Abidjan — photo 3" },
      { type: "image", src: "/media/city/04.jpg", w: 1050, h: 1400, alt: "City tour Abidjan — photo 4" },
      { type: "image", src: "/media/city/05.jpg", w: 787, h: 1400, alt: "City tour Abidjan — photo 5" },
      { type: "image", src: "/media/city/06.jpg", w: 787, h: 1400, alt: "City tour Abidjan — photo 6" },
      { type: "image", src: "/media/city/07.jpg", w: 787, h: 1400, alt: "City tour Abidjan — photo 7" },
      { type: "image", src: "/media/city/08.jpg", w: 1050, h: 1400, alt: "City tour Abidjan — photo 8" },
    ]),
  },
  {
    slug: "night-foodtour",
    duration: "Soirée",
    title: "Night foodtour",
    blurb: "Une soirée pour découvrir Abidjan par sa cuisine, d'adresse en adresse.",
    items: [],
  },
  {
    slug: "quad-tour",
    title: "Quad tour aux îles Éhotilé",
    blurb: "Une sortie à quad aux îles Éhotilé.",
    cover: "/media/quad/cover.jpg",
    coverAlt: "Quad tour",
    items: top3([
      { type: "image", src: "/media/quad/01.jpg", w: 1050, h: 1400, alt: "Quad tour — photo 1" },
      { type: "image", src: "/media/quad/02.jpg", w: 1050, h: 1400, alt: "Quad tour — photo 2" },
      { type: "image", src: "/media/quad/03.jpg", w: 787, h: 1400, alt: "Quad tour — photo 3" },
      { type: "image", src: "/media/quad/04.jpg", w: 1050, h: 1400, alt: "Quad tour — photo 4" },
      { type: "image", src: "/media/quad/05.jpg", w: 1050, h: 1400, alt: "Quad tour — photo 5" },
      { type: "image", src: "/media/quad/06.jpg", w: 787, h: 1400, alt: "Quad tour — photo 6" },
      { type: "image", src: "/media/quad/07.jpg", w: 1050, h: 1400, alt: "Quad tour — photo 7" },
      { type: "image", src: "/media/quad/08.jpg", w: 675, h: 1200, alt: "Quad tour — photo 8" },
      { type: "image", src: "/media/quad/09.jpg", w: 787, h: 1400, alt: "Quad tour — photo 9" },
    ]),
  },
  {
    slug: "basilique-de-yamoussoukro",
    duration: "Journée complète",
    title: "Visite de la basilique de Yamoussoukro",
    blurb: "Vitraux, nef monumentale et esplanade de la basilique Notre-Dame de la Paix.",
    cover: "/media/basilique/cover.jpg",
    coverAlt: "Visite de la basilique de Yamoussoukro",
    items: top3([
      { type: "image", src: "/media/basilique/01.jpg", w: 900, h: 1200, alt: "Basilique de Yamoussoukro — photo 1" },
      { type: "image", src: "/media/basilique/02.jpg", w: 1050, h: 1400, alt: "Basilique de Yamoussoukro — photo 2" },
      { type: "image", src: "/media/basilique/03.jpg", w: 720, h: 1280, alt: "Basilique de Yamoussoukro — photo 3" },
      { type: "image", src: "/media/basilique/04.jpg", w: 720, h: 1280, alt: "Basilique de Yamoussoukro — photo 4" },
      { type: "image", src: "/media/basilique/05.jpg", w: 1050, h: 1400, alt: "Basilique de Yamoussoukro — photo 5" },
      { type: "image", src: "/media/basilique/06.jpg", w: 900, h: 1200, alt: "Basilique de Yamoussoukro — photo 6" },
      { type: "image", src: "/media/basilique/07.jpg", w: 900, h: 1200, alt: "Basilique de Yamoussoukro — photo 7" },
      { type: "image", src: "/media/basilique/08.jpg", w: 928, h: 1400, alt: "Basilique de Yamoussoukro — photo 8" },
      { type: "image", src: "/media/basilique/09.jpg", w: 1050, h: 1400, alt: "Basilique de Yamoussoukro — photo 9" },
      { type: "image", src: "/media/basilique/10.jpg", w: 696, h: 870, alt: "Basilique de Yamoussoukro — photo 10" },
    ]),
  },
];
