import { fallacies, type FallacyExample } from "@/data/fallacies";
import {
  steelmanScenarios,
  type SteelManScenario,
} from "@/data/steelman-scenarios";
import {
  sourceScenarios,
  type SourceScenario,
} from "@/data/source-scenarios";

export type DailyChallengeType = "fallacy-flash" | "source-check" | "steelman";

const STREAK_KEY = "dojo-daily-streak";
const DAILY_KEY = "dojo-daily-challenge";

export interface StreakData {
  current: number;
  best: number;
  lastCompletedDate: string;
  total: number;
}

export interface DailyData {
  date: string;
  type: DailyChallengeType;
  score: number;
  maxScore: number;
  completed: boolean;
}

export function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

// Seeded PRNG — deterministic for everyone on the same day
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

// Pick today's challenge type deterministically from the date
export function getDailyChallengeType(): DailyChallengeType {
  const today = getTodayString();
  const rng = seededRandom("daily-type-" + today);
  const types: DailyChallengeType[] = [
    "fallacy-flash",
    "source-check",
    "steelman",
  ];
  return types[Math.floor(rng() * types.length)];
}

export function getDailyChallengeTypeLabel(type: DailyChallengeType): string {
  const labels: Record<DailyChallengeType, string> = {
    "fallacy-flash": "Fallacy Flash",
    "source-check": "Source Check",
    steelman: "Steelman",
  };
  return labels[type];
}

export function getDailyChallengeTypeIcon(type: DailyChallengeType): string {
  const icons: Record<DailyChallengeType, string> = {
    "fallacy-flash": "⚡",
    "source-check": "🔍",
    steelman: "💪",
  };
  return icons[type];
}

export function getDailyChallengeTypeDescription(
  type: DailyChallengeType
): string {
  const desc: Record<DailyChallengeType, string> = {
    "fallacy-flash": "Spot the logical fallacy in 5 arguments",
    "source-check": "Rate the credibility of 3 news sources",
    steelman: "Construct the strongest version of an argument",
  };
  return desc[type];
}

// ========== Scenario pickers (date-seeded) ==========

export interface DailyFallacyQuestion {
  fallacyName: string;
  example: FallacyExample;
}

export function getDailyFallacyQuestions(): DailyFallacyQuestion[] {
  const today = getTodayString();
  const rng = seededRandom(today);
  const pool: DailyFallacyQuestion[] = [];
  for (const f of fallacies) {
    for (const ex of f.examples) {
      pool.push({ fallacyName: f.name, example: ex });
    }
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 5);
}

export function getDailySourceScenarios(): SourceScenario[] {
  const today = getTodayString();
  const rng = seededRandom("source-" + today);
  const shuffled = [...sourceScenarios];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 3);
}

export function getDailySteelmanScenario(): SteelManScenario {
  const today = getTodayString();
  const rng = seededRandom("steel-" + today);
  const idx = Math.floor(rng() * steelmanScenarios.length);
  return steelmanScenarios[idx];
}

// ========== Streak tracking ==========

export function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return { current: 0, best: 0, lastCompletedDate: "", total: 0, ...data };
    }
  } catch {}
  return { current: 0, best: 0, lastCompletedDate: "", total: 0 };
}

function saveStreak(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {}
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Returns current live streak (0 if broken). */
export function getCurrentStreak(): number {
  const streak = loadStreak();
  const today = getTodayString();
  const yesterday = getYesterdayString();
  if (
    streak.lastCompletedDate === today ||
    streak.lastCompletedDate === yesterday
  ) {
    return streak.current;
  }
  return 0;
}

/** Call after completing today's challenge. Returns updated streak. */
export function updateStreak(): StreakData {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  const streak = loadStreak();

  if (streak.lastCompletedDate === today) {
    return streak; // already recorded today
  }

  if (streak.lastCompletedDate === yesterday) {
    streak.current += 1;
  } else {
    streak.current = 1; // streak broken or first time
  }

  streak.lastCompletedDate = today;
  streak.best = Math.max(streak.best, streak.current);
  streak.total = (streak.total ?? 0) + 1;
  saveStreak(streak);

  // Notify listeners (achievement system)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("dojo-progress-updated"));
  }

  return streak;
}

// ========== Daily completion persistence ==========

export function loadDailyData(): DailyData | null {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveDailyData(data: DailyData): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(data));
  } catch {}
}

export function isDailyCompleted(): boolean {
  const data = loadDailyData();
  return data?.date === getTodayString() && data?.completed === true;
}
