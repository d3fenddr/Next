import type { Circular } from "../types/circular";

const KEY = "circs_extra_v1";

export function getExtraCirculars(): Circular[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Circular[]) : [];
  } catch {
    return [];
  }
}

export function addCircular(c: Omit<Circular, "sn">): Circular {
  const list = getExtraCirculars();
  const next = { ...c, sn: "00" } as Circular; // sn пересчитаем при выводе
  localStorage.setItem(KEY, JSON.stringify([next, ...list]));
  return next;
}

export function clearCirculars() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
