"use client";

import { useState, useEffect } from "react";
import { dailyChallenges } from "@/data/daily-brief-scenarios";

const STREAK_KEY = "dojo-daily-brief-streak";
const HISTORY_KEY = "dojo-daily-brief-history";

function getTodayChallenge() {
  const now = new Date();
  const start = new Date("2026-03-16");
  const diffDays = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const index =
    ((diffDays % dailyChallenges.length) + dailyChallenges.length) %
    dailyChallenges.length;
  return dailyChallenges[index];
}

export default function DailyBriefCard() {
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const challenge = getTodayChallenge();

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STREAK_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setStreak(data.current || 0);
      }
      const histRaw = localStorage.getItem(HISTORY_KEY);
      if (histRaw) {
        const hist = JSON.parse(histRaw);
        if (hist.some((e: { day: number }) => e.day === challenge.day)) {
          setCompleted(true);
        }
      }
    } catch {}
  }, [challenge.day]);

  return (
    <a
      href="/play/daily-brief"
      className="block bg-dojo-card border border-dojo-border rounded-xl p-6 hover:border-dojo-accent/40 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📰</span>
          <div>
            <h3 className="text-lg font-semibold text-dojo-text group-hover:text-dojo-accent transition-colors">
              Daily Brief
            </h3>
            <p className="text-xs text-dojo-muted">
              {completed ? "Completed today" : "Today's challenge"}
            </p>
          </div>
        </div>
        {mounted && streak > 0 && (
          <div className="flex items-center gap-1 text-sm text-orange-400">
            <span>🔥</span>
            <span className="font-semibold">{streak}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-dojo-muted leading-relaxed mb-4">
        <span className="text-dojo-text font-medium">{challenge.topic}</span>
        {" — "}
        Three summaries. One logical error. One missing context. One solid.
        Can you tell which is which?
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
            Logical Error
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            Missing Context
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
            Solid
          </span>
        </div>
        <span className="text-dojo-accent text-sm group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </div>
    </a>
  );
}
