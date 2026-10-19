import { randomInt } from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans I, O, 0, 1
export const REF_PATTERN = /^FT-\d{6}-[A-Z2-9]{5}$/;

export function newRef(date = new Date()): string {
  const d = date.toISOString().slice(2, 10).replaceAll("-", "");
  const rand = Array.from({ length: 5 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `FT-${d}-${rand}`;
}
