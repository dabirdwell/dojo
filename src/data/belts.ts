export interface Belt {
  name: string;
  color: string;
  minXP: number;
  maxXP: number | null; // null = no cap (Black Belt)
  label: string;
}

export const belts: Belt[] = [
  { name: "White Belt", color: "#E8E8E8", minXP: 0, maxXP: 49, label: "Beginner" },
  { name: "Yellow Belt", color: "#F5D442", minXP: 50, maxXP: 149, label: "Foundations" },
  { name: "Green Belt", color: "#4CAF50", minXP: 150, maxXP: 299, label: "Intermediate" },
  { name: "Blue Belt", color: "#2196F3", minXP: 300, maxXP: 499, label: "Advanced" },
  { name: "Brown Belt", color: "#795548", minXP: 500, maxXP: 999, label: "Expert" },
  { name: "Black Belt", color: "#1A1A1A", minXP: 1000, maxXP: null, label: "Master" },
];

export function getBeltForXP(xp: number): Belt {
  for (let i = belts.length - 1; i >= 0; i--) {
    if (xp >= belts[i].minXP) return belts[i];
  }
  return belts[0];
}

export function getNextBelt(xp: number): Belt | null {
  const current = getBeltForXP(xp);
  const idx = belts.indexOf(current);
  return idx < belts.length - 1 ? belts[idx + 1] : null;
}

export function getProgressToNextBelt(xp: number): number {
  const current = getBeltForXP(xp);
  const next = getNextBelt(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}

export type GameMode = "fallacy-flash" | "steelman" | "source-check" | "daily-brief" | "civic-check";

export const XP_AWARDS: Record<GameMode, { base: number; description: string }> = {
  "fallacy-flash": { base: 10, description: "10 XP per correct + 25 bonus" },
  steelman: { base: 40, description: "40 XP base + 20 quality bonus" },
  "source-check": { base: 15, description: "Up to 15 XP per source analyzed" },
  "daily-brief": { base: 40, description: "Up to 40 XP per perfect day" },
  "civic-check": { base: 15, description: "15 XP per correct + 30 policy bonus" },
};
