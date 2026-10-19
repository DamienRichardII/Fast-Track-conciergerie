"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { seed, type AdminData } from "./data";

const KEY = "ft-admin-v1";
const EVT = "ft-admin-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => { window.removeEventListener(EVT, cb); window.removeEventListener("storage", cb); };
}
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };

/** Données du back-office, enregistrées dans ce navigateur (aucun serveur). */
export function useAdminData() {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  const data = useMemo<AdminData>(() => {
    if (raw) { try { return { ...seed(), ...JSON.parse(raw) } as AdminData; } catch { /* données illisibles : repartir de l'exemple */ } }
    return seed();
  }, [raw]);
  const save = useCallback((next: AdminData) => {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* stockage indisponible */ }
    window.dispatchEvent(new Event(EVT));
  }, []);
  const reset = useCallback(() => {
    try { localStorage.removeItem(KEY); } catch { /* idem */ }
    window.dispatchEvent(new Event(EVT));
  }, []);
  return { data, save, reset };
}
