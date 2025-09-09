import type { Staff } from "../types/staff";
import { STAFF_BASE } from "./staff-data";

const EXTRA_KEY = "staff_extra_v1";
const OVERRIDES_KEY = "staff_overrides_v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export function getExtraStaff(): Staff[] {
  if (typeof window === "undefined") return [];
  return safeParse<Staff[]>(localStorage.getItem(EXTRA_KEY), []);
}

export function setExtraStaff(list: Staff[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXTRA_KEY, JSON.stringify(list));
}

export function getOverrides(): Record<string, Staff> {
  if (typeof window === "undefined") return {};
  return safeParse<Record<string, Staff>>(localStorage.getItem(OVERRIDES_KEY), {});
}

export function setOverrides(m: Record<string, Staff>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(m));
}

export function getStaffById(id: string): Staff | undefined {
  const extra = getExtraStaff().find(s => s.id === id);
  if (extra) return extra;
  const overrides = getOverrides();
  if (overrides[id]) return overrides[id];
  return STAFF_BASE.find(s => s.id === id);
}

export function getAllStaff(): Staff[] {
  const overrides = getOverrides();
  const baseWithOverrides = STAFF_BASE.map(s => overrides[s.id] ?? s);
  return [...getExtraStaff(), ...baseWithOverrides];
}

export function addStaff(s: Omit<Staff, "id">): Staff {
  const item: Staff = { ...s, id: `x-${Date.now()}` };
  const list = getExtraStaff();
  setExtraStaff([item, ...list]);
  return item;
}

export function updateStaff(id: string, patch: Partial<Staff>) {
  const extras = getExtraStaff();
  const idx = extras.findIndex(s => s.id === id);
  if (idx >= 0) {
    extras[idx] = { ...extras[idx], ...patch };
    setExtraStaff(extras);
    return;
  }
  const base = STAFF_BASE.find(s => s.id === id);
  if (!base) return;
  const overrides = getOverrides();
  overrides[id] = { ...base, ...(overrides[id] ?? {}), ...patch, id };
  setOverrides(overrides);
}
