import { WORLD } from "@/lib/mapData";

/* Trajets d'exemple affichés sur la carte : n'importe quel autre vol est possible sur demande. */
export const flightRoutes: readonly (readonly [string, string])[] = [
  ["ABJ", "CDG"], ["ABJ", "DXB"], ["ABJ", "JFK"], ["ABJ", "CPT"], ["CDG", "JFK"],
  ["LHR", "DXB"], ["DXB", "SIN"], ["MIA", "GIG"], ["LAX", "JFK"], ["MXP", "MRU"],
];

type Pt = readonly [number, number];
const pts = WORLD.pts as Record<string, Pt>;
export const hasPoint = (code: string) => code in pts;

/** Arc de cercle approché par une courbe de Bézier, bombé vers le haut de la carte. */
export function arc(a: string, b: string, lift = 0.22): string {
  const [ax, ay] = pts[a];
  const [bx, by] = pts[b];
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const d = Math.hypot(bx - ax, by - ay);
  return `M${ax},${ay} Q${mx},${my - d * lift} ${bx},${by}`;
}

/** Silhouette d'avion vue du dessus, nez vers +x (s'oriente seule le long d'un chemin). */
export const PLANE = "M8 0 L1 -1.6 L-3 -6 L-4.4 -6 L-2.6 -1.4 L-6.5 -1.2 L-7.6 -3 L-8.8 -3 L-7.8 0 L-8.8 3 L-7.6 3 L-6.5 1.2 L-2.6 1.4 L-4.4 6 L-3 6 L1 1.6 Z";

/** Silhouette d'avion à l'échelle voulue (calculée dans le tracé : pas de transform à combiner avec l'animation). */
export const planePath = (k = 1) => PLANE.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round(Number(n) * k * 100) / 100));
