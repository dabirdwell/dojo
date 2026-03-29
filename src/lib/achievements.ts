import { achievements, type Achievement } from "@/data/achievements";
import { loadProgress, type ProgressData } from "@/lib/progress";
import { loadStreak, type StreakData } from "@/lib/daily-challenge";
import { type GameMode } from "@/data/belts";

const STORE_KEY = "dojo-achievements";

export interface AchievementStore {
  unlocked: Record<string, string>; // id -> ISO timestamp
  completedRealWorldIds: string[];
  maxConsecutiveFast: number;
  hadPerfectRound: boolean;
}

function defaultStore(): AchievementStore {
  return {
    unlocked: {},
    completedRealWorldIds: [],
    maxConsecutiveFast: 0,
    hadPerfectRound: false,
  };
}

export function loadAchievementStore(): AchievementStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return { ...defaultStore(), ...data };
    }
  } catch {}
  return defaultStore();
}

export function saveAchievementStore(store: AchievementStore): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {}
}

export function getUnlockedCount(): number {
  const store = loadAchievementStore();
  return Object.keys(store.unlocked).length;
}

export function recordScenariosCompleted(ids: string[]): void {
  const store = loadAchievementStore();
  const set = new Set(store.completedRealWorldIds);
  for (const id of ids) set.add(id);
  store.completedRealWorldIds = Array.from(set);
  saveAchievementStore(store);
}

export function recordConsecutiveFast(count: number): void {
  const store = loadAchievementStore();
  if (count > store.maxConsecutiveFast) {
    store.maxConsecutiveFast = count;
    saveAchievementStore(store);
  }
}

export function recordPerfectRound(): void {
  const store = loadAchievementStore();
  if (!store.hadPerfectRound) {
    store.hadPerfectRound = true;
    saveAchievementStore(store);
  }
}

type ConditionChecker = (
  progress: ProgressData,
  streak: StreakData,
  store: AchievementStore
) => boolean;

const ALL_MODES: GameMode[] = [
  "fallacy-flash",
  "steelman",
  "source-check",
  "daily-brief",
  "civic-check",
  "socratic",
  "real-world",
];

const conditions: Record<string, ConditionChecker> = {
  "first-blood": (p) =>
    Object.values(p.stats).some((s) => s.totalPlays > 0),
  "streak-3": (_p, s) => s.best >= 3,
  "week-warrior": (_p, s) => s.best >= 7,
  "fallacy-finder": (p) => p.stats["fallacy-flash"].totalCorrect >= 10,
  "source-skeptic": (p) => p.stats["source-check"].totalQuestions >= 20,
  "steelman-master": (p) => p.stats.steelman.totalPlays >= 10,
  "belt-up": (p) => p.totalXP >= 50,
  "black-belt": (p) => p.totalXP >= 1500,
  "daily-devotee": (_p, s) => (s.total ?? 0) >= 30,
  "speed-demon": (_p, _s, store) => store.maxConsecutiveFast >= 5,
  "perfect-round": (_p, _s, store) => store.hadPerfectRound,
  "real-world-ready": (_p, _s, store) =>
    store.completedRealWorldIds.length >= 30,
  "argument-architect": (p) => p.stats.steelman.totalPlays >= 5,
  "socratic-scholar": (p) => p.stats.socratic.totalPlays >= 1,
  "renaissance-thinker": (p) =>
    ALL_MODES.every((m) => p.stats[m].totalPlays > 0),
};

/**
 * Check all achievement conditions and unlock any newly met.
 * Returns array of newly unlocked achievements.
 */
export function checkAndUnlockAchievements(): Achievement[] {
  const progress = loadProgress();
  const streak = loadStreak();
  const store = loadAchievementStore();
  const newlyUnlocked: Achievement[] = [];

  for (const achievement of achievements) {
    if (store.unlocked[achievement.id]) continue;
    const check = conditions[achievement.id];
    if (check && check(progress, streak, store)) {
      store.unlocked[achievement.id] = new Date().toISOString();
      newlyUnlocked.push(achievement);
    }
  }

  if (newlyUnlocked.length > 0) {
    saveAchievementStore(store);
  }

  return newlyUnlocked;
}
