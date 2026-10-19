export const MONTHS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
export const WEEKDAYS = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

const pad = (n: number) => String(n).padStart(2, "0");
export const toISO = (y: number, m0: number, d: number) => `${y}-${pad(m0 + 1)}-${pad(d)}`;

/** Aujourd'hui en UTC (= Africa/Abidjan, GMT). */
export const todayISO = () => new Date().toISOString().slice(0, 10);

export function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function nightsBetween(a: string, b: string) {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
}

/** Grille du mois (semaines commençant le lundi). null = case vide. */
export function monthGrid(year: number, month0: number): (string | null)[][] {
  const first = new Date(Date.UTC(year, month0, 1));
  const offset = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
  const cells: (string | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => toISO(year, month0, i + 1))];
  while (cells.length % 7) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function formatLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${wd} ${d} ${MONTHS[m - 1]} ${y}`;
}
