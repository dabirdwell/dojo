"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  belts,
  getBeltForXP,
  getNextBelt,
  XP_AWARDS,
  type GameMode,
  CURRICULUM_BELT_ORDER,
  getCurriculumBelt,
} from "@/data/belts";
import { loadProgress, getTotalAccuracy, type ProgressData } from "@/lib/progress";
import {
  getEffectiveBelt,
  canTakeTest,
  getTestHistory,
  type BeltTestAttempt,
} from "@/lib/belt-test";
import BeltProgress from "@/components/BeltProgress";

const MODE_LABELS: Record<GameMode, { name: string; icon: string }> = {
  "fallacy-flash": { name: "Fallacy Flash", icon: "lightning" },
  steelman: { name: "Steel Man", icon: "shield" },
  "source-check": { name: "Source Check", icon: "search" },
  "daily-brief": { name: "Daily Brief", icon: "newspaper" },
  "civic-check": { name: "Civic Check", icon: "landmark" },
  socratic: { name: "Socratic", icon: "question" },
  "real-world": { name: "Real World", icon: "globe" },
  "argument-map": { name: "Argument Map", icon: "map" },
  rhetoric: { name: "Rhetoric Analyzer", icon: "microscope" },
  impromptu: { name: "Impromptu Speaking", icon: "microphone" },
  "belt-test": { name: "Belt Tests", icon: "scroll" },
};

const CURRICULUM_LABELS: Record<string, string> = {
  white: "White Belt",
  yellow: "Yellow Belt",
  green: "Green Belt",
  blue: "Blue Belt",
  brown: "Brown Belt",
  black: "Black Belt",
};

export default function ProfileView() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [testEligibility, setTestEligibility] = useState<ReturnType<typeof canTakeTest> | null>(null);
  const [testHistory, setTestHistory] = useState<BeltTestAttempt[]>([]);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    setTestEligibility(canTakeTest(p.totalXP));
    setTestHistory(getTestHistory());
  }, []);

  if (!progress) return null;

  const belt = getEffectiveBelt(progress.totalXP);
  const xpBelt = getBeltForXP(progress.totalXP);
  const nextBelt = getNextBelt(belt.minXP);
  const progressPct = nextBelt
    ? Math.min(100, Math.round(((progress.totalXP - belt.minXP) / (nextBelt.minXP - belt.minXP)) * 100))
    : 100;
  const accuracy = getTotalAccuracy(progress);

  // Show test-gated message if XP qualifies for higher belt
  const isTestGated = xpBelt.name !== belt.name;

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
          <span className="text-sm font-medium text-dojo-text">Profile</span>
          <div className="w-12" />
        </div>
      </div>

      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Belt Display */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div
                className="w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto"
                style={{
                  borderColor: belt.color,
                  backgroundColor: `${belt.color}15`,
                  boxShadow: `0 0 30px ${belt.color}30`,
                }}
              >
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{
                      color: belt.name === "Black Belt" ? "#f0e6d6" : belt.color,
                    }}
                  >
                    {progress.totalXP}
                  </div>
                  <div className="text-xs text-dojo-muted">XP</div>
                </div>
              </div>
            </div>

            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: belt.name === "Black Belt" ? "#f0e6d6" : belt.color }}
            >
              {belt.name}
            </h1>
            <p className="text-sm text-dojo-muted">{belt.label}</p>
          </div>

          {/* Take the Test CTA */}
          {isTestGated && testEligibility?.eligible && testEligibility.testLevel && (
            <Link
              href="/test/belt"
              className="block bg-dojo-accent/10 border-2 border-dojo-accent/40 rounded-xl p-5 text-center hover:border-dojo-accent/70 transition-all group"
            >
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-10 h-3 rounded-full"
                  style={{
                    backgroundColor: getCurriculumBelt(testEligibility.testLevel).color,
                    boxShadow: `0 0 10px ${getCurriculumBelt(testEligibility.testLevel).color}50`,
                  }}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-dojo-accent group-hover:text-dojo-accent-hover transition-colors">
                    Take the {CURRICULUM_LABELS[testEligibility.testLevel]} Test
                  </p>
                  <p className="text-xs text-dojo-muted">
                    You have enough XP to advance. Prove your mastery!
                  </p>
                </div>
                <span className="text-dojo-accent text-lg ml-auto">&#8594;</span>
              </div>
            </Link>
          )}

          {/* Cooldown notice */}
          {isTestGated && testEligibility?.cooldownUntil && (
            <div className="bg-dojo-card border border-amber-900/30 rounded-xl p-5 text-center">
              <p className="text-sm text-amber-400 font-medium mb-1">
                Belt Test Cooldown Active
              </p>
              <p className="text-xs text-dojo-muted">
                {testEligibility.reason}
              </p>
            </div>
          )}

          {/* Progress to Next Belt */}
          {nextBelt && (
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-5">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-dojo-muted">Progress to {nextBelt.name}</span>
                <span className="text-dojo-text font-medium">
                  {progress.totalXP} / {nextBelt.minXP} XP
                </span>
              </div>
              <div className="h-3 bg-dojo-surface rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPct}%`,
                    backgroundColor: nextBelt.color,
                  }}
                />
              </div>
              <p className="text-xs text-dojo-muted mt-2">
                {isTestGated
                  ? "Pass the belt test to advance"
                  : `${nextBelt.minXP - progress.totalXP} XP to go`}
              </p>
            </div>
          )}

          {nextBelt === null && (
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 text-center">
              <p className="text-dojo-text font-medium">
                Maximum rank achieved. True mastery.
              </p>
            </div>
          )}

          {/* Total Accuracy */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 text-center">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              {accuracy}%
            </div>
            <div className="text-sm text-dojo-muted">Overall Accuracy</div>
          </div>

          {/* Belt Test History */}
          {testHistory.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-dojo-text mb-4">
                Belt Test History
              </h2>
              <div className="space-y-2">
                {testHistory
                  .slice()
                  .reverse()
                  .map((attempt, i) => {
                    const currBelt = CURRICULUM_BELT_ORDER.includes(attempt.level)
                      ? getCurriculumBelt(attempt.level)
                      : null;
                    const pct = Math.round(
                      (attempt.score / attempt.totalQuestions) * 100
                    );
                    return (
                      <div
                        key={`${attempt.date}-${i}`}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          attempt.passed
                            ? "border-green-500/20 bg-green-500/5"
                            : "border-red-500/20 bg-red-500/5"
                        }`}
                      >
                        <div
                          className="w-8 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: currBelt?.color ?? "#666",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-dojo-text">
                              {CURRICULUM_LABELS[attempt.level] ?? attempt.level} Test
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${
                                attempt.passed
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {attempt.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <span className="text-xs text-dojo-muted">
                            {new Date(attempt.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-sm font-bold ${
                              attempt.passed ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {attempt.score}/{attempt.totalQuestions}
                          </span>
                          <div className="text-xs text-dojo-muted">{pct}%</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Fallacy Curriculum */}
          <BeltProgress />

          {/* Game Mode Stats */}
          <div>
            <h2 className="text-lg font-semibold text-dojo-text mb-4">
              Game Mode Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.keys(MODE_LABELS) as GameMode[]).map((mode) => {
                const stats = progress.stats[mode];
                if (!stats) return null;
                const modeAccuracy =
                  stats.totalQuestions > 0
                    ? Math.round(
                        (stats.totalCorrect / stats.totalQuestions) * 100
                      )
                    : 0;
                return (
                  <div
                    key={mode}
                    className="bg-dojo-card border border-dojo-border rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-dojo-text text-sm">
                        {MODE_LABELS[mode].name}
                      </h3>
                      <span className="text-xs text-dojo-muted">
                        {XP_AWARDS[mode].description}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-dojo-text">
                          {stats.totalPlays}
                        </div>
                        <div className="text-xs text-dojo-muted">Plays</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-dojo-accent">
                          {stats.xpEarned}
                        </div>
                        <div className="text-xs text-dojo-muted">XP</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-dojo-text">
                          {modeAccuracy}%
                        </div>
                        <div className="text-xs text-dojo-muted">Accuracy</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Belt Roadmap */}
          <div>
            <h2 className="text-lg font-semibold text-dojo-text mb-4">
              Belt Roadmap
            </h2>
            <div className="space-y-2">
              {belts.map((b) => {
                const achieved = belt.minXP >= b.minXP;
                const isCurrent = b.name === belt.name;
                return (
                  <div
                    key={b.name}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      isCurrent
                        ? "border-dojo-accent/50 bg-dojo-accent/5"
                        : "border-dojo-border bg-dojo-card/50"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 flex-shrink-0"
                      style={{
                        borderColor: achieved ? b.color : `${b.color}40`,
                        backgroundColor: achieved
                          ? `${b.color}20`
                          : "transparent",
                        opacity: achieved ? 1 : 0.4,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: achieved
                              ? b.name === "Black Belt"
                                ? "#f0e6d6"
                                : b.color
                              : "#b8a99480",
                          }}
                        >
                          {b.name}
                        </span>
                        {isCurrent && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-dojo-accent/20 text-dojo-accent">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-dojo-muted">
                        {b.minXP}
                        {b.maxXP ? `–${b.maxXP}` : "+"} XP &middot; {b.label}
                      </span>
                    </div>
                    {achieved && (
                      <span className="text-green-500 text-sm">&#10003;</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
