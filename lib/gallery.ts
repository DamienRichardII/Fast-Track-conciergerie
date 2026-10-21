/* Photos et vidéos du client (dossiers public/media, optimisés depuis public/images). */
export type GalleryItem =
  | { type: "image"; src: string; w: number; h: number; alt: string }
  | { type: "video"; src: string; poster: string; w: number; h: number; alt: string };

export const galleries: Record<string, { cover: string; coverAlt: string; title: string; items: GalleryItem[] }> = {
  "villas-de-luxe": {
    cover: "/media/villas/cover.jpg", coverAlt: "Villa de luxe", title: "Nos villas",
    items: [
      { type: "image", src: "/media/villas/01.jpg", w: 1159, h: 1400, alt: "Villa de luxe — photo 1" },
      { type: "image", src: "/media/villas/02.jpg", w: 1079, h: 1304, alt: "Villa de luxe — photo 2" },
      { type: "image", src: "/media/villas/03.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 3" },
      { type: "image", src: "/media/villas/04.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 4" },
      { type: "image", src: "/media/villas/05.jpg", w: 786, h: 1400, alt: "Villa de luxe — photo 5" },
      { type: "image", src: "/media/villas/06.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 6" },
      { type: "image", src: "/media/villas/07.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 7" },
      { type: "image", src: "/media/villas/08.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 8" },
      { type: "image", src: "/media/villas/09.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 9" },
      { type: "image", src: "/media/villas/10.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 10" },
      { type: "image", src: "/media/villas/11.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 11" },
      { type: "image", src: "/media/villas/12.jpg", w: 787, h: 1400, alt: "Villa de luxe — photo 12" },
    ],
  },
  "location-de-voiture": {
    cover: "/media/voiture/cover.jpg", coverAlt: "Véhicule de luxe", title: "Notre flotte",
    items: [
      { type: "image", src: "/media/voiture/01.jpg", w: 787, h: 1400, alt: "Véhicule de luxe — photo 1" },
      { type: "image", src: "/media/voiture/02.jpg", w: 1050, h: 1400, alt: "Véhicule de luxe — photo 2" },
      { type: "image", src: "/media/voiture/03.jpg", w: 1062, h: 1400, alt: "Véhicule de luxe — photo 3" },
      { type: "image", src: "/media/voiture/04.jpg", w: 787, h: 1400, alt: "Véhicule de luxe — photo 4" },
      { type: "image", src: "/media/voiture/05.jpg", w: 787, h: 1400, alt: "Véhicule de luxe — photo 5" },
      { type: "image", src: "/media/voiture/06.jpg", w: 787, h: 1400, alt: "Véhicule de luxe — photo 6" },
      { type: "video", src: "/media/voiture/video-01.mp4", poster: "/media/voiture/video-01.jpg", w: 480, h: 704, alt: "Véhicule de luxe — vidéo 1" },
    ],
  },
  "activites-touristiques": {
    cover: "/media/activites/cover.jpg", coverAlt: "Après-midi à Assinie", title: "Un après-midi à Assinie",
    items: [
      { type: "image", src: "/media/activites/01.jpg", w: 1050, h: 1400, alt: "Après-midi à Assinie — photo 1" },
      { type: "image", src: "/media/activites/02.jpg", w: 787, h: 1400, alt: "Après-midi à Assinie — photo 2" },
      { type: "image", src: "/media/activites/03.jpg", w: 839, h: 1400, alt: "Après-midi à Assinie — photo 3" },
      { type: "image", src: "/media/activites/04.jpg", w: 1026, h: 1400, alt: "Après-midi à Assinie — photo 4" },
      { type: "image", src: "/media/activites/05.jpg", w: 736, h: 1308, alt: "Après-midi à Assinie — photo 5" },
      { type: "image", src: "/media/activites/06.jpg", w: 1050, h: 1400, alt: "Après-midi à Assinie — photo 6" },
      { type: "image", src: "/media/activites/07.jpg", w: 1050, h: 1400, alt: "Après-midi à Assinie — photo 7" },
      { type: "image", src: "/media/activites/08.jpg", w: 1050, h: 1400, alt: "Après-midi à Assinie — photo 8" },
      { type: "image", src: "/media/activites/09.jpg", w: 787, h: 1400, alt: "Après-midi à Assinie — photo 9" },
      { type: "image", src: "/media/activites/10.jpg", w: 933, h: 1400, alt: "Après-midi à Assinie — photo 10" },
      { type: "video", src: "/media/activites/video-01.mp4", poster: "/media/activites/video-01.jpg", w: 480, h: 720, alt: "Après-midi à Assinie — vidéo 1" },
      { type: "video", src: "/media/activites/video-02.mp4", poster: "/media/activites/video-02.jpg", w: 480, h: 720, alt: "Après-midi à Assinie — vidéo 2" },
      { type: "video", src: "/media/activites/video-03.mp4", poster: "/media/activites/video-03.jpg", w: 480, h: 752, alt: "Après-midi à Assinie — vidéo 3" },
      { type: "video", src: "/media/activites/video-04.mp4", poster: "/media/activites/video-04.jpg", w: 480, h: 704, alt: "Après-midi à Assinie — vidéo 4" },
    ],
  },
};
