import { type GameMode } from "@/data/belts";

const PROGRESS_KEY = "dojo-progress";

export interface GameStats {
  totalPlays: number;
  totalCorrect: number;
  totalQuestions: number;
  xpEarned: number;
}

export interface ProgressData {
  totalXP: number;
  stats: Record<GameMode, GameStats>;
}

const defaultStats: GameStats = {
  totalPlays: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  xpEarned: 0,
};

function defaultProgress(): ProgressData {
  return {
    totalXP: 0,
    stats: {
      "fallacy-flash": { ...defaultStats },
      steelman: { ...defaultStats },
      "source-check": { ...defaultStats },
      "daily-brief": { ...defaultStats },
    },
  };
}

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      // Merge with defaults to handle missing fields
      const progress = defaultProgress();
      progress.totalXP = data.totalXP ?? 0;
      for (const mode of Object.keys(progress.stats) as GameMode[]) {
        if (data.stats?.[mode]) {
          progress.stats[mode] = { ...defaultStats, ...data.stats[mode] };
        }
      }
      return progress;
    }
  } catch {}
  return defaultProgress();
}

export function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch {}
}

export function awardXP(
  mode: GameMode,
  xp: number,
  correct: number,
  total: number
): ProgressData {
  const progress = loadProgress();
  progress.totalXP += xp;
  progress.stats[mode].totalPlays += 1;
  progress.stats[mode].totalCorrect += correct;
  progress.stats[mode].totalQuestions += total;
  progress.stats[mode].xpEarned += xp;
  saveProgress(progress);
  return progress;
}

export function getTotalAccuracy(progress: ProgressData): number {
  let correct = 0;
  let total = 0;
  for (const stats of Object.values(progress.stats)) {
    correct += stats.totalCorrect;
    total += stats.totalQuestions;
  }
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
