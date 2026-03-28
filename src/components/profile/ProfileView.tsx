"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  belts,
  getBeltForXP,
  getNextBelt,
  getProgressToNextBelt,
  XP_AWARDS,
  type GameMode,
} from "@/data/belts";
import { loadProgress, getTotalAccuracy, type ProgressData } from "@/lib/progress";

const MODE_LABELS: Record<GameMode, { name: string; icon: string }> = {
  "fallacy-flash": { name: "Fallacy Flash", icon: "lightning" },
  steelman: { name: "Steel Man", icon: "shield" },
  "source-check": { name: "Source Check", icon: "search" },
  "daily-brief": { name: "Daily Brief", icon: "newspaper" },
  "civic-check": { name: "Civic Check", icon: "landmark" },
  socratic: { name: "Socratic", icon: "question" },
};

export default function ProfileView() {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) return null;

  const belt = getBeltForXP(progress.totalXP);
  const nextBelt = getNextBelt(progress.totalXP);
  const progressPct = getProgressToNextBelt(progress.totalXP);
  const accuracy = getTotalAccuracy(progress);

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
                {nextBelt.minXP - progress.totalXP} XP to go
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

          {/* Game Mode Stats */}
          <div>
            <h2 className="text-lg font-semibold text-dojo-text mb-4">
              Game Mode Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.keys(MODE_LABELS) as GameMode[]).map((mode) => {
                const stats = progress.stats[mode];
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
                const achieved = progress.totalXP >= b.minXP;
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
