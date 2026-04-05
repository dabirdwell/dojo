import {
  belts,
  getBeltForXP,
  getCurriculumLevel,
  CURRICULUM_BELT_ORDER,
  type Belt,
  type CurriculumBeltLevel,
} from "@/data/belts";
import { BELT_TESTS, type BeltTestDef } from "@/data/belt-test-scenarios";

const BELT_TEST_KEY = "dojo-belt-tests";

interface PassedTestInfo {
  passedAt: string;
  score: number;
  totalQuestions: number;
}

export interface BeltTestAttempt {
  level: CurriculumBeltLevel;
  date: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
}

interface BeltTestData {
  passedTests: Partial<Record<CurriculumBeltLevel, PassedTestInfo>>;
  attempts: BeltTestAttempt[];
}

const TEST_LEVELS = new Set(BELT_TESTS.map((t) => t.level));

/**
 * Curriculum transitions: passing a test at `testLevel` unlocks
 * belts up to `maxBeltIndex` in the belts array.
 *
 * Belt indices: 0=White, 1=Yellow, 2=Orange, 3=Green,
 * 4=Blue, 5=Purple, 6=Brown, 7=Red, 8=Black
 */
const TRANSITIONS: { test: CurriculumBeltLevel; maxBeltIndex: number }[] = [
  { test: "white", maxBeltIndex: 2 }, // → up to Orange Belt
  { test: "yellow", maxBeltIndex: 3 }, // → up to Green Belt
  { test: "green", maxBeltIndex: 5 }, // → up to Purple Belt
  { test: "blue", maxBeltIndex: 7 }, // → up to Red Belt
  { test: "brown", maxBeltIndex: 8 }, // → up to Black Belt
];

function emptyData(): BeltTestData {
  return { passedTests: {}, attempts: [] };
}

/**
 * Load belt test data from localStorage. On first load for an existing
 * player (has progress but no test data), auto-credit tests below their
 * current curriculum level so they aren't retroactively demoted.
 */
export function loadBeltTestData(xp?: number): BeltTestData {
  try {
    const raw = localStorage.getItem(BELT_TEST_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  // First-time load — check if existing player needs auto-credit
  const data = emptyData();

  if (xp === undefined) {
    try {
      const progressRaw = localStorage.getItem("dojo-progress");
      if (progressRaw) {
        xp = JSON.parse(progressRaw).totalXP ?? 0;
      }
    } catch {}
  }

  if (xp !== undefined && xp > 0) {
    const belt = getBeltForXP(xp);
    const curriculum = getCurriculumLevel(belt.name);
    const currIdx = CURRICULUM_BELT_ORDER.indexOf(curriculum);

    // Auto-credit all tests at levels BELOW AND INCLUDING current curriculum
    // so existing players keep their current belt
    for (let i = 0; i <= currIdx && i < CURRICULUM_BELT_ORDER.length; i++) {
      const level = CURRICULUM_BELT_ORDER[i];
      if (TEST_LEVELS.has(level)) {
        data.passedTests[level] = {
          passedAt: new Date().toISOString(),
          score: -1, // sentinel: auto-credited
          totalQuestions: -1,
        };
      }
    }

    saveBeltTestData(data);
  }

  return data;
}

export function saveBeltTestData(data: BeltTestData): void {
  try {
    localStorage.setItem(BELT_TEST_KEY, JSON.stringify(data));
  } catch {}
}

/**
 * Effective belt: the minimum of the XP belt and the test-gated belt.
 * Levels without test content are auto-cleared.
 */
export function getEffectiveBelt(xp: number): Belt {
  const data = loadBeltTestData(xp);
  const xpBelt = getBeltForXP(xp);
  const xpBeltIndex = belts.findIndex((b) => b.name === xpBelt.name);

  let maxAllowedIndex = 0; // White Belt is always accessible

  for (const t of TRANSITIONS) {
    if (!TEST_LEVELS.has(t.test) || data.passedTests[t.test]) {
      // No test exists for this level, or test exists and passed
      maxAllowedIndex = t.maxBeltIndex;
    } else {
      // Test exists but not passed — blocked
      break;
    }
  }

  return belts[Math.min(xpBeltIndex, maxAllowedIndex)];
}

/**
 * Check if the user can take a belt test right now.
 */
export function canTakeTest(xp: number): {
  eligible: boolean;
  testLevel: CurriculumBeltLevel | null;
  testDef: BeltTestDef | null;
  cooldownUntil: string | null;
  reason: string;
} {
  const effectiveBelt = getEffectiveBelt(xp);
  const xpBelt = getBeltForXP(xp);

  // If effective belt matches XP belt, no test needed
  if (effectiveBelt.name === xpBelt.name) {
    return {
      eligible: false,
      testLevel: null,
      testDef: null,
      cooldownUntil: null,
      reason: "Your belt is up to date.",
    };
  }

  // Find the next required test
  const currLevel = getCurriculumLevel(effectiveBelt.name);
  const testLevel = currLevel;
  const testDef = BELT_TESTS.find((t) => t.level === testLevel) ?? null;

  if (!testDef) {
    return {
      eligible: false,
      testLevel: null,
      testDef: null,
      cooldownUntil: null,
      reason: "No test available for this level.",
    };
  }

  const data = loadBeltTestData(xp);

  // Already passed
  if (data.passedTests[testLevel]) {
    return {
      eligible: false,
      testLevel: null,
      testDef: null,
      cooldownUntil: null,
      reason: "Already passed.",
    };
  }

  // Check 24h cooldown on last failed attempt
  const lastFailed = [...data.attempts]
    .reverse()
    .find((a) => a.level === testLevel && !a.passed);

  if (lastFailed) {
    const cooldownEnd = new Date(lastFailed.date);
    cooldownEnd.setHours(cooldownEnd.getHours() + 24);
    if (new Date() < cooldownEnd) {
      return {
        eligible: false,
        testLevel,
        testDef,
        cooldownUntil: cooldownEnd.toISOString(),
        reason: "You can retry after a 24-hour cooldown.",
      };
    }
  }

  return { eligible: true, testLevel, testDef, cooldownUntil: null, reason: "" };
}

/**
 * Record a test attempt. Returns whether it passed.
 */
export function recordTestAttempt(
  level: CurriculumBeltLevel,
  score: number,
  totalQuestions: number
): boolean {
  const testDef = BELT_TESTS.find((t) => t.level === level);
  const passingScore = testDef?.passingScore ?? 0.8;
  const passed = score / totalQuestions >= passingScore;

  const data = loadBeltTestData();

  data.attempts.push({
    level,
    date: new Date().toISOString(),
    score,
    totalQuestions,
    passed,
  });

  if (passed) {
    data.passedTests[level] = {
      passedAt: new Date().toISOString(),
      score,
      totalQuestions,
    };
  }

  saveBeltTestData(data);
  return passed;
}

/**
 * Get all test attempts for display in profile.
 */
export function getTestHistory(): BeltTestAttempt[] {
  const data = loadBeltTestData();
  return data.attempts.filter((a) => a.score >= 0); // exclude auto-credited
}
