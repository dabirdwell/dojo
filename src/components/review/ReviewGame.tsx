"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { fallacies, type FallacyExample } from "@/data/fallacies";
import {
  getCurriculumLevel,
  getUnlockedFallacyIds,
  BELT_CURRICULUM,
  type CurriculumBeltLevel,
} from "@/data/belts";
import { loadProgress } from "@/lib/progress";
import { getEffectiveBelt } from "@/lib/belt-test";
import {
  getPrioritizedReviewBatch,
  getReviewState,
  recordReview,
  type ReviewRating,
} from "@/lib/spaced-repetition";
import BeltBadge from "@/components/belt-badge/BeltBadge";

interface ReviewQuestion {
  fallacyId: string;
  fallacyName: string;
  example: FallacyExample;
  beltLevel: CurriculumBeltLevel | null;
}

function getBeltForFallacy(fallacyId: string): CurriculumBeltLevel | null {
  for (const belt of BELT_CURRICULUM) {
    if (belt.fallacies.some((f) => f.id === fallacyId)) {
      return belt.level;
    }
  }
  return null;
}

function buildReviewQuestions(): ReviewQuestion[] {
  const progress = loadProgress();
  const belt = getEffectiveBelt(progress.totalXP);
  const curriculumLevel = getCurriculumLevel(belt.name);

  // Get current belt's fallacy IDs for prioritization
  const currentBeltFallacies = BELT_CURRICULUM.find(
    (b) => b.level === curriculumLevel
  )?.fallacies.map((f) => f.id) ?? [];

  const dueIds = getPrioritizedReviewBatch(currentBeltFallacies);
  const unlockedIds = new Set(getUnlockedFallacyIds(belt.name));

  // Only include fallacies that are both due and unlocked
  const eligibleIds = dueIds.filter((id) => unlockedIds.has(id));

  // Build questions from eligible fallacies
  const questions: ReviewQuestion[] = [];
  for (const id of eligibleIds) {
    const fallacy = fallacies.find((f) => f.id === id);
    if (!fallacy || fallacy.examples.length === 0) continue;

    // Pick a random example
    const example = fallacy.examples[Math.floor(Math.random() * fallacy.examples.length)];
    questions.push({
      fallacyId: id,
      fallacyName: fallacy.name,
      example,
      beltLevel: getBeltForFallacy(id),
    });
  }

  return questions;
}

const BELT_COLORS: Record<string, string> = {
  white: "#E8E8E8",
  yellow: "#F5D442",
  green: "#4CAF50",
  blue: "#2196F3",
  brown: "#795548",
  black: "#1A1A1A",
};

const RATING_CONFIG: { rating: ReviewRating; label: string; sublabel: string; color: string }[] = [
  { rating: "again", label: "Again", sublabel: "Forgot it", color: "text-red-400 border-red-800/50 bg-red-900/10 hover:border-red-600/60" },
  { rating: "hard", label: "Hard", sublabel: "Struggled", color: "text-amber-400 border-amber-800/50 bg-amber-900/10 hover:border-amber-600/60" },
  { rating: "good", label: "Good", sublabel: "Got it", color: "text-green-400 border-green-800/50 bg-green-900/10 hover:border-green-600/60" },
  { rating: "easy", label: "Easy", sublabel: "Instant", color: "text-blue-400 border-blue-800/50 bg-blue-900/10 hover:border-blue-600/60" },
];

export default function ReviewGame() {
  const [questions] = useState(() => buildReviewQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState(false);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<
    { fallacyName: string; correct: boolean; rating: ReviewRating | null }[]
  >([]);

  const current = questions[currentIndex] ?? null;
  const totalDue = questions.length;

  const handleSelect = useCallback(
    (option: string) => {
      if (revealed) return;
      setSelectedAnswer(option);
      setRevealed(true);
    },
    [revealed]
  );

  const handleRate = useCallback(
    (rating: ReviewRating) => {
      if (!current || rated) return;
      const correct = selectedAnswer === current.example.correctAnswer;
      recordReview(current.fallacyId, correct, rating);
      setResults((prev) => [
        ...prev,
        { fallacyName: current.fallacyName, correct, rating },
      ]);
      setRated(true);
    },
    [current, selectedAnswer, rated]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setRevealed(false);
      setRated(false);
    } else {
      setFinished(true);
    }
  }, [currentIndex, questions.length]);

  const score = useMemo(
    () => results.filter((r) => r.correct).length,
    [results]
  );

  // Empty state: no reviews due
  if (totalDue === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              &larr; Back
            </Link>
            <span className="text-sm font-medium text-dojo-text">
              Spaced Review
            </span>
            <BeltBadge />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-6 opacity-60">&#128203;</div>
            <h2 className="text-xl font-bold text-dojo-text mb-3">
              No Reviews Due
            </h2>
            <p className="text-dojo-muted text-sm mb-6">
              All caught up! Play Fallacy Flash to encounter new fallacies,
              then come back when they&apos;re due for review.
            </p>
            <Link
              href="/play/fallacy-flash"
              className="inline-block px-6 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              Play Fallacy Flash
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Finished state
  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">
            {score === totalDue ? "&#11088;" : score >= totalDue * 0.7 ? "&#128170;" : "&#128218;"}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-dojo-text">
            Review Complete
          </h2>
          <p className="text-dojo-muted mb-8">
            {score}/{totalDue} correct
          </p>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-2 text-center">
              {(["again", "hard", "good", "easy"] as const).map((r) => {
                const count = results.filter((res) => res.rating === r).length;
                return (
                  <div key={r}>
                    <div className="text-lg font-bold text-dojo-text">
                      {count}
                    </div>
                    <div className="text-xs text-dojo-muted capitalize">
                      {r}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review details */}
          <div className="space-y-2 text-left mb-8">
            {results.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border text-sm ${
                  r.correct
                    ? "border-green-800/50 bg-green-900/10"
                    : "border-red-800/50 bg-red-900/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{r.correct ? "\u2713" : "\u2717"}</span>
                  <span className="font-medium text-dojo-text">
                    {r.fallacyName}
                  </span>
                  <span className="text-xs text-dojo-muted capitalize ml-auto">
                    {r.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 py-3 border border-dojo-border text-dojo-muted hover:text-dojo-text rounded-lg font-medium transition-colors text-center"
            >
              Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              Review Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active review
  if (!current) return null;

  const isCorrect = selectedAnswer === current.example.correctAnswer;
  const reviewState = getReviewState(current.fallacyId);
  const intervalDisplay = reviewState
    ? `Interval: ${reviewState.interval >= 1 ? Math.round(reviewState.interval) + "d" : "<1d"}`
    : "";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-dojo-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            &larr; Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm text-dojo-muted">
              {currentIndex + 1} / {totalDue}
            </div>
            {current.beltLevel && (
              <div
                className="w-6 h-2 rounded-full"
                style={{ backgroundColor: BELT_COLORS[current.beltLevel] ?? "#666" }}
                title={`${current.beltLevel} belt fallacy`}
              />
            )}
          </div>
          <BeltBadge />
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (rated ? 1 : 0)) / totalDue) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-amber-400 uppercase tracking-wider font-medium">
              Spaced Review
            </span>
            {intervalDisplay && (
              <span className="text-xs text-dojo-muted">
                &middot; {intervalDisplay}
              </span>
            )}
          </div>

          {/* Argument */}
          <blockquote className="text-lg sm:text-xl leading-relaxed text-dojo-text border-l-2 border-amber-500 pl-5 mb-10">
            {current.example.argument}
          </blockquote>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.example.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isAnswer = option === current.example.correctAnswer;

              let classes =
                "p-4 rounded-lg border text-left font-medium transition-all ";

              if (!revealed) {
                classes +=
                  "border-dojo-border bg-dojo-card hover:border-amber-500/60 hover:bg-amber-900/5 cursor-pointer";
              } else if (isAnswer) {
                classes +=
                  "border-green-600 bg-green-900/20 text-green-300";
              } else if (isSelected && !isAnswer) {
                classes += "border-red-600 bg-red-900/20 text-red-300";
              } else {
                classes +=
                  "border-dojo-border/50 bg-dojo-card/50 text-dojo-muted/50";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={revealed}
                  className={classes}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback + Rating */}
          {revealed && (
            <div className="mt-8 animate-fade-in">
              <div
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? "border-green-800/50 bg-green-900/10"
                    : "border-red-800/50 bg-red-900/10"
                }`}
              >
                <div className="font-semibold mb-1 text-dojo-text">
                  {isCorrect ? "Correct!" : `Not quite \u2014 ${current.example.correctAnswer}`}
                </div>
                <p className="text-sm text-dojo-muted">
                  {current.example.explanation}
                </p>
              </div>

              {/* Difficulty rating */}
              {!rated && (
                <div className="mt-6">
                  <p className="text-xs text-dojo-muted uppercase tracking-wider mb-3 text-center">
                    How difficult was this?
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {RATING_CONFIG.map(({ rating, label, sublabel, color }) => (
                      <button
                        key={rating}
                        onClick={() => handleRate(rating)}
                        className={`p-3 rounded-lg border text-center transition-all ${color}`}
                      >
                        <div className="font-semibold text-sm">{label}</div>
                        <div className="text-[10px] opacity-70">{sublabel}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Next button (only after rating) */}
              {rated && (
                <button
                  onClick={handleNext}
                  className="mt-6 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-colors"
                >
                  {currentIndex < questions.length - 1
                    ? "Next Review"
                    : "See Results"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
