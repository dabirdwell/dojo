const STORAGE_KEY = "dojo-spaced-repetition";

export type ReviewRating = "again" | "hard" | "good" | "easy";

export interface FallacyReviewState {
  fallacyId: string;
  attempts: number;
  correct: number;
  lastSeen: number;
  nextReview: number;
  easeFactor: number;
  interval: number; // days
  consecutiveCorrect: number;
}

export interface ReviewStats {
  totalReviews: number;
  currentStreak: number; // consecutive days with at least one review
  longestStreak: number;
  lastReviewDate: string; // ISO date string (YYYY-MM-DD)
  reviewHistory: string[]; // ISO date strings of days with reviews
}

interface SpacedRepetitionData {
  reviews: Record<string, FallacyReviewState>;
  stats: ReviewStats;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function defaultStats(): ReviewStats {
  return {
    totalReviews: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastReviewDate: "",
    reviewHistory: [],
  };
}

function loadData(): SpacedRepetitionData {
  if (typeof window === "undefined") return { reviews: {}, stats: defaultStats() };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        reviews: parsed.reviews ?? {},
        stats: { ...defaultStats(), ...parsed.stats },
      };
    }
  } catch {}
  return { reviews: {}, stats: defaultStats() };
}

function saveData(data: SpacedRepetitionData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function defaultState(fallacyId: string): FallacyReviewState {
  return {
    fallacyId,
    attempts: 0,
    correct: 0,
    lastSeen: 0,
    nextReview: 0,
    easeFactor: 2.5,
    interval: 0,
    consecutiveCorrect: 0,
  };
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function updateStreak(stats: ReviewStats): void {
  const today = todayStr();
  const yesterday = yesterdayStr();

  if (stats.lastReviewDate === today) {
    // Already reviewed today, no streak change
    return;
  }

  if (stats.lastReviewDate === yesterday) {
    // Continuing streak
    stats.currentStreak += 1;
  } else if (stats.lastReviewDate === "") {
    // First ever review
    stats.currentStreak = 1;
  } else {
    // Streak broken
    stats.currentStreak = 1;
  }

  stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
  stats.lastReviewDate = today;

  // Track unique review days (keep last 90 days)
  if (!stats.reviewHistory.includes(today)) {
    stats.reviewHistory.push(today);
    if (stats.reviewHistory.length > 90) {
      stats.reviewHistory = stats.reviewHistory.slice(-90);
    }
  }
}

// SM-2 quality mapping: again=0, hard=3, good=4, easy=5
const QUALITY_MAP: Record<ReviewRating, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

// SM-2 variant with spec intervals: 1d → 3d → 7d → 14d → 30d
const SPEC_INTERVALS = [1, 3, 7, 14, 30];

/** Record an attempt and update the review schedule (used by FallacyFlash) */
export function recordAttempt(fallacyId: string, correct: boolean): void {
  recordReview(fallacyId, correct, correct ? "good" : "again");
}

/** Record a review with SM-2 quality rating */
export function recordReview(
  fallacyId: string,
  correct: boolean,
  rating: ReviewRating
): void {
  const data = loadData();
  const state = data.reviews[fallacyId] || defaultState(fallacyId);
  const quality = QUALITY_MAP[rating];

  state.attempts += 1;
  state.lastSeen = Date.now();

  if (correct && quality >= 3) {
    state.correct += 1;
    state.consecutiveCorrect += 1;

    // Use spec intervals for the first 5 correct, then SM-2 growth
    if (state.consecutiveCorrect <= SPEC_INTERVALS.length) {
      state.interval = SPEC_INTERVALS[state.consecutiveCorrect - 1];
    } else {
      state.interval = Math.round(state.interval * state.easeFactor);
    }

    // SM-2 ease factor adjustment based on quality
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
    const efDelta = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    state.easeFactor = Math.max(1.3, Math.min(3.0, state.easeFactor + efDelta));

    // Easy rating gets a bonus interval bump
    if (rating === "easy") {
      state.interval = Math.round(state.interval * 1.3);
    }
  } else {
    state.consecutiveCorrect = 0;
    state.interval = rating === "hard" ? 1 : 0.5; // "again" reviews sooner
    state.easeFactor = Math.max(1.3, state.easeFactor - 0.2);
  }

  state.nextReview = state.lastSeen + state.interval * MS_PER_DAY;
  data.reviews[fallacyId] = state;

  // Update global stats
  data.stats.totalReviews += 1;
  updateStreak(data.stats);

  saveData(data);
}

/** Returns fallacy IDs that are due for review today */
export function getNextReviewBatch(): string[] {
  const data = loadData();
  const now = Date.now();

  return Object.values(data.reviews)
    .filter((r) => r.nextReview <= now && r.attempts > 0)
    .sort((a, b) => a.nextReview - b.nextReview)
    .map((r) => r.fallacyId);
}

/** Get review-due fallacy IDs prioritized by belt level */
export function getPrioritizedReviewBatch(currentBeltFallacyIds: string[]): string[] {
  const due = getNextReviewBatch();
  const currentBeltSet = new Set(currentBeltFallacyIds);

  // Sort: current belt fallacies first, then by how overdue they are
  const currentBeltDue = due.filter((id) => currentBeltSet.has(id));
  const otherDue = due.filter((id) => !currentBeltSet.has(id));

  return [...currentBeltDue, ...otherDue];
}

/** Get review state for a single fallacy */
export function getReviewState(fallacyId: string): FallacyReviewState | null {
  const data = loadData();
  return data.reviews[fallacyId] || null;
}

/** Mastery = 5 correct identifications across spaced intervals */
export function isMastered(fallacyId: string): boolean {
  const state = getReviewState(fallacyId);
  if (!state) return false;
  return state.consecutiveCorrect >= 5;
}

/** Get all review states */
export function getAllReviewStates(): Record<string, FallacyReviewState> {
  return loadData().reviews;
}

/** Count of fallacies currently due for review */
export function getDueCount(): number {
  return getNextReviewBatch().length;
}

/** Check if a fallacy has ever been attempted */
export function hasBeenAttempted(fallacyId: string): boolean {
  const state = getReviewState(fallacyId);
  return state !== null && state.attempts > 0;
}

/** Get review statistics */
export function getReviewStats(): ReviewStats {
  const data = loadData();
  // Recalculate streak in case days have passed since last review
  const stats = data.stats;
  const today = todayStr();
  const yesterday = yesterdayStr();

  if (
    stats.lastReviewDate !== "" &&
    stats.lastReviewDate !== today &&
    stats.lastReviewDate !== yesterday
  ) {
    // Streak is broken
    stats.currentStreak = 0;
    saveData(data);
  }

  return stats;
}

/** Get mastery rate: percentage of attempted fallacies that are mastered */
export function getMasteryRate(): number {
  const reviews = getAllReviewStates();
  const attempted = Object.values(reviews).filter((r) => r.attempts > 0);
  if (attempted.length === 0) return 0;
  const mastered = attempted.filter((r) => r.consecutiveCorrect >= 5);
  return Math.round((mastered.length / attempted.length) * 100);
}

/** Get upcoming review schedule: fallacies grouped by next review date */
export function getUpcomingSchedule(): { date: string; fallacyIds: string[] }[] {
  const reviews = getAllReviewStates();
  const now = Date.now();
  const schedule: Record<string, string[]> = {};

  for (const state of Object.values(reviews)) {
    if (state.attempts === 0) continue;
    const reviewDate = state.nextReview <= now
      ? todayStr()
      : new Date(state.nextReview).toISOString().split("T")[0];
    if (!schedule[reviewDate]) schedule[reviewDate] = [];
    schedule[reviewDate].push(state.fallacyId);
  }

  return Object.entries(schedule)
    .map(([date, fallacyIds]) => ({ date, fallacyIds }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 7); // Next 7 days
}

/** Count of mastered fallacies */
export function getMasteredCount(): number {
  const reviews = getAllReviewStates();
  return Object.values(reviews).filter((r) => r.consecutiveCorrect >= 5).length;
}
