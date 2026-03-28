"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getDailyChallengeType,
  getDailyChallengeTypeLabel,
  getDailyChallengeTypeIcon,
  getDailyChallengeTypeDescription,
  getCurrentStreak,
  isDailyCompleted,
} from "@/lib/daily-challenge";

export default function DailyChallengeCard() {
  const [mounted, setMounted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);

  const type = getDailyChallengeType();
  const label = getDailyChallengeTypeLabel(type);
  const icon = getDailyChallengeTypeIcon(type);
  const description = getDailyChallengeTypeDescription(type);

  useEffect(() => {
    setMounted(true);
    setStreak(getCurrentStreak());
    setCompleted(isDailyCompleted());
  }, []);

  return (
    <div className="bg-dojo-card border border-dojo-border rounded-xl p-8 relative overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-dojo-accent/5 blur-[60px] pointer-events-none" />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-dojo-accent">
              Daily Challenge
            </span>
            {mounted && completed && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                ✓ Complete
              </span>
            )}
          </div>
          {mounted && streak > 0 && (
            <div className="flex items-center gap-1.5 text-orange-400">
              <span className="text-lg">🔥</span>
              <span className="font-bold text-lg">{streak}</span>
              <span className="text-xs text-orange-400/70">day streak</span>
            </div>
          )}
        </div>

        {/* Challenge type display */}
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-dojo-text">{label}</h3>
            <p className="text-sm text-dojo-muted">{description}</p>
          </div>
        </div>

        {/* Type-specific tags */}
        <div className="flex gap-2 mb-6">
          {type === "fallacy-flash" && (
            <>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                5 Questions
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Multiple Choice
              </span>
            </>
          )}
          {type === "source-check" && (
            <>
              <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                3 Sources
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Credibility Rating
              </span>
            </>
          )}
          {type === "steelman" && (
            <>
              <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                1 Scenario
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Free Writing
              </span>
            </>
          )}
        </div>

        {/* Big Start button */}
        <Link
          href="/play/daily"
          className={`block w-full py-4 rounded-lg font-bold text-lg text-center transition-colors ${
            completed
              ? "bg-dojo-surface border border-dojo-border text-dojo-muted hover:text-dojo-text"
              : "bg-dojo-accent hover:bg-dojo-accent-hover text-white"
          }`}
        >
          {completed ? "View Results" : "Start"}
        </Link>
      </div>
    </div>
  );
}
