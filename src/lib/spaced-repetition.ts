const STORAGE_KEY = "dojo-spaced-repetition";

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

interface SpacedRepetitionData {
  reviews: Record<string, FallacyReviewState>;
}

function loadData(): SpacedRepetitionData {
  if (typeof window === "undefined") return { reviews: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { reviews: {} };
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

// SM-2 variant with spec intervals: 1d → 3d → 7d → 14d → 30d
const SPEC_INTERVALS = [1, 3, 7, 14, 30];
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Record an attempt and update the review schedule */
export function recordAttempt(fallacyId: string, correct: boolean): void {
  const data = loadData();
  const state = data.reviews[fallacyId] || defaultState(fallacyId);

  state.attempts += 1;
  state.lastSeen = Date.now();

  if (correct) {
    state.correct += 1;
    state.consecutiveCorrect += 1;

    // Use spec intervals for the first 5 correct, then SM-2 growth
    if (state.consecutiveCorrect <= SPEC_INTERVALS.length) {
      state.interval = SPEC_INTERVALS[state.consecutiveCorrect - 1];
    } else {
      state.interval = Math.round(state.interval * state.easeFactor);
    }

    // Increase ease on success (capped)
    state.easeFactor = Math.min(3.0, state.easeFactor + 0.1);
  } else {
    state.consecutiveCorrect = 0;
    state.interval = 1; // Reset to 1 day
    state.easeFactor = Math.max(1.3, state.easeFactor - 0.2);
  }

  state.nextReview = state.lastSeen + state.interval * MS_PER_DAY;
  data.reviews[fallacyId] = state;
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
