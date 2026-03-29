"use client";

import { useState, useEffect } from "react";
import {
  BELT_CURRICULUM,
  CURRICULUM_BELT_ORDER,
  getCurriculumLevel,
  getBeltForXP,
  type CurriculumBeltLevel,
  type CurriculumBelt,
} from "@/data/belts";
import {
  isMastered,
  hasBeenAttempted,
  getReviewState,
  getNextReviewBatch,
} from "@/lib/spaced-repetition";
import { loadProgress } from "@/lib/progress";

type FallacyStatus = "mastered" | "in-progress" | "locked";

function getFallacyStatus(
  fallacyId: string,
  unlockedLevels: CurriculumBeltLevel[],
  fallacyBelt: CurriculumBeltLevel
): FallacyStatus {
  if (!unlockedLevels.includes(fallacyBelt)) return "locked";
  if (isMastered(fallacyId)) return "mastered";
  if (hasBeenAttempted(fallacyId)) return "in-progress";
  return "in-progress"; // unlocked but not started yet — available to practice
}

function BeltSection({
  belt,
  unlockedLevels,
  isCurrent,
  dueIds,
}: {
  belt: CurriculumBelt;
  unlockedLevels: CurriculumBeltLevel[];
  isCurrent: boolean;
  dueIds: Set<string>;
}) {
  const isUnlocked = unlockedLevels.includes(belt.level);
  const isLocked = !isUnlocked;

  const masteredCount = belt.fallacies.filter((f) => isMastered(f.id)).length;
  const totalCount = belt.fallacies.length;

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        isCurrent
          ? "border-dojo-accent/40 bg-dojo-accent/5"
          : isLocked
          ? "border-dojo-border/40 bg-dojo-card/30 opacity-50"
          : "border-dojo-border bg-dojo-card"
      }`}
    >
      {/* Belt header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-3 rounded-full flex-shrink-0"
          style={{
            backgroundColor: isLocked ? `${belt.color}40` : belt.color,
            boxShadow: isCurrent ? `0 0 12px ${belt.color}50` : "none",
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                color: isLocked
                  ? "#b8a99460"
                  : belt.level === "black"
                  ? "#f0e6d6"
                  : belt.color,
              }}
            >
              {belt.name}
            </span>
            {isCurrent && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-dojo-accent/20 text-dojo-accent font-medium">
                Current
              </span>
            )}
            {isLocked && (
              <span className="text-[10px] uppercase tracking-widest text-dojo-muted/50">
                Locked
              </span>
            )}
          </div>
        </div>
        {isUnlocked && (
          <span className="text-xs text-dojo-muted tabular-nums">
            {masteredCount}/{totalCount}
          </span>
        )}
      </div>

      {/* Mastery bar */}
      {isUnlocked && (
        <div className="h-1 bg-dojo-surface rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(masteredCount / totalCount) * 100}%`,
              backgroundColor: belt.color,
            }}
          />
        </div>
      )}

      {/* Fallacy list */}
      <div className="space-y-2">
        {belt.fallacies.map((fallacy) => {
          const status = getFallacyStatus(fallacy.id, unlockedLevels, belt.level);
          const isDue = dueIds.has(fallacy.id);
          const review = getReviewState(fallacy.id);

          return (
            <div
              key={fallacy.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                status === "locked"
                  ? "text-dojo-muted/30"
                  : status === "mastered"
                  ? "text-dojo-text"
                  : "text-dojo-muted"
              }`}
            >
              {/* Status indicator */}
              <div className="flex-shrink-0 w-5 text-center">
                {status === "mastered" ? (
                  <span className="text-green-500 text-xs font-bold">&#10003;</span>
                ) : status === "in-progress" ? (
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: belt.color }}
                  />
                ) : (
                  <span className="inline-block w-2 h-2 rounded-full border border-dojo-border/40" />
                )}
              </div>

              {/* Fallacy info */}
              <div className="flex-1 min-w-0">
                <span className={status === "mastered" ? "font-medium" : ""}>
                  {fallacy.name}
                </span>
                {status !== "locked" && review && review.attempts > 0 && (
                  <span className="text-xs text-dojo-muted ml-2 tabular-nums">
                    {review.correct}/{review.attempts}
                  </span>
                )}
              </div>

              {/* Review due indicator */}
              {isDue && status !== "locked" && (
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-900/30 text-amber-400 font-medium">
                  Review
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BeltProgress() {
  const [mounted, setMounted] = useState(false);
  const [currentBeltName, setCurrentBeltName] = useState("White Belt");
  const [dueIds, setDueIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const progress = loadProgress();
    const belt = getBeltForXP(progress.totalXP);
    setCurrentBeltName(belt.name);
    setDueIds(new Set(getNextReviewBatch()));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentCurriculumLevel = getCurriculumLevel(currentBeltName);
  const currentIdx = CURRICULUM_BELT_ORDER.indexOf(currentCurriculumLevel);
  const unlockedLevels = CURRICULUM_BELT_ORDER.slice(0, currentIdx + 1);

  return (
    <div>
      <h2 className="text-lg font-semibold text-dojo-text mb-1">
        Fallacy Curriculum
      </h2>
      <p className="text-xs text-dojo-muted mb-5">
        Master each belt&apos;s fallacies through spaced repetition.
        {dueIds.size > 0 && (
          <span className="text-amber-400 ml-1">
            {dueIds.size} due for review.
          </span>
        )}
      </p>

      <div className="space-y-4">
        {BELT_CURRICULUM.map((belt) => {
          const isCurrent = belt.level === currentCurriculumLevel;
          const beltIdx = CURRICULUM_BELT_ORDER.indexOf(belt.level);

          // Show unlocked belts, current, and one preview belt
          if (beltIdx > currentIdx + 1) return null;

          return (
            <BeltSection
              key={belt.level}
              belt={belt}
              unlockedLevels={unlockedLevels}
              isCurrent={isCurrent}
              dueIds={dueIds}
            />
          );
        })}

        {/* Remaining locked belts as collapsed */}
        {currentIdx + 2 < CURRICULUM_BELT_ORDER.length && (
          <div className="text-center py-3 text-xs text-dojo-muted/50 uppercase tracking-widest">
            {CURRICULUM_BELT_ORDER.length - currentIdx - 2} more belt
            {CURRICULUM_BELT_ORDER.length - currentIdx - 2 !== 1 ? "s" : ""} to unlock
          </div>
        )}
      </div>
    </div>
  );
}
