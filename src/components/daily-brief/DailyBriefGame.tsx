"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  dailyChallenges,
  type DailyChallenge,
} from "@/data/daily-brief-scenarios";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import ShareScore from "@/components/share-score/ShareScore";

type PlayerLabel = "logical-error" | "missing-context" | "solid";

const labelDisplay: Record<PlayerLabel, { name: string; color: string }> = {
  "logical-error": { name: "Logical Error", color: "text-red-400" },
  "missing-context": { name: "Missing Context", color: "text-yellow-400" },
  solid: { name: "Solid Reporting", color: "text-green-400" },
};

const STREAK_KEY = "dojo-daily-brief-streak";
const HISTORY_KEY = "dojo-daily-brief-history";

interface StreakData {
  current: number;
  best: number;
  lastCompleted: string | null;
}

interface HistoryEntry {
  day: number;
  date: string;
  score: number;
  maxScore: number;
}

function getStreakData(): StreakData {
  if (typeof window === "undefined") return { current: 0, best: 0, lastCompleted: null };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { current: 0, best: 0, lastCompleted: null };
}

function saveStreakData(data: StreakData) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveHistory(history: HistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getTodayChallenge(): DailyChallenge {
  const now = new Date();
  const start = new Date("2026-03-16");
  const diffDays = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = ((diffDays % dailyChallenges.length) + dailyChallenges.length) % dailyChallenges.length;
  return dailyChallenges[index];
}

export default function DailyBriefGame() {
  const [challenge] = useState(getTodayChallenge);
  const [labels, setLabels] = useState<Record<string, PlayerLabel | null>>({});
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [streak, setStreak] = useState<StreakData>({ current: 0, best: 0, lastCompleted: null });
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);

  useEffect(() => {
    const s = getStreakData();
    const h = getHistory();
    setStreak(s);
    setHistory(h);
    if (h.some((e) => e.day === challenge.day)) {
      setAlreadyCompleted(true);
    }
  }, [challenge.day]);

  const allLabeled = useMemo(() => {
    return challenge.summaries.every((s) => labels[s.id] != null);
  }, [challenge.summaries, labels]);

  const allExplained = useMemo(() => {
    return challenge.summaries.every(
      (s) => (explanations[s.id] || "").trim().length >= 20
    );
  }, [challenge.summaries, explanations]);

  const canSubmit = allLabeled && allExplained && !submitted;

  const usedLabels = useMemo(() => {
    const used = new Set<PlayerLabel>();
    Object.values(labels).forEach((l) => {
      if (l) used.add(l);
    });
    return used;
  }, [labels]);

  const results = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    const details = challenge.summaries.map((s) => {
      const playerLabel = labels[s.id];
      const isCorrect = playerLabel === s.type;
      if (isCorrect) correct++;
      return { summary: s, playerLabel, isCorrect };
    });
    return { correct, total: 3, details };
  }, [submitted, challenge.summaries, labels]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    let correct = 0;
    challenge.summaries.forEach((s) => {
      if (labels[s.id] === s.type) correct++;
    });

    const today = new Date().toISOString().split("T")[0];
    const currentStreak = getStreakData();
    const currentHistory = getHistory();

    if (!currentHistory.some((e) => e.day === challenge.day)) {
      const newEntry: HistoryEntry = {
        day: challenge.day,
        date: today,
        score: correct,
        maxScore: 3,
      };
      const newHistory = [...currentHistory, newEntry];
      saveHistory(newHistory);
      setHistory(newHistory);

      let newCurrent = currentStreak.current;
      if (currentStreak.lastCompleted) {
        const last = new Date(currentStreak.lastCompleted);
        const now = new Date(today);
        const diff = Math.floor(
          (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff === 1) {
          newCurrent += 1;
        } else if (diff > 1) {
          newCurrent = 1;
        }
      } else {
        newCurrent = 1;
      }

      const newBest = Math.max(currentStreak.best, newCurrent);
      const newStreak: StreakData = {
        current: newCurrent,
        best: newBest,
        lastCompleted: today,
      };
      saveStreakData(newStreak);
      setStreak(newStreak);

      const xp = correct === 3 ? 40 : correct * 12;
      const xpResult = awardXP("daily-brief", xp, correct, 3);
      if (xpResult.beltChanged && xpResult.newBelt) {
        setEarnedBelt(xpResult.newBelt);
      }
    }
  }, [challenge, labels]);

  const setLabel = useCallback(
    (summaryId: string, label: PlayerLabel) => {
      if (submitted) return;
      setLabels((prev) => {
        // If another summary already has this label, clear it
        const next: Record<string, PlayerLabel | null> = { ...prev };
        for (const key of Object.keys(next)) {
          if (next[key] === label && key !== summaryId) {
            next[key] = null;
          }
        }
        next[summaryId] = prev[summaryId] === label ? null : label;
        return next;
      });
    },
    [submitted]
  );

  if (alreadyCompleted && !submitted) {
    const pastEntry = history.find((e) => e.day === challenge.day);
    return (
      <div className="min-h-screen bg-dojo-bg text-dojo-text">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <a
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            ← Back
          </a>

          <div className="mt-8 text-center">
            <div className="text-4xl mb-4">📰</div>
            <h1 className="text-3xl font-bold mb-2">Daily Brief</h1>
            <p className="text-dojo-muted mb-8">
              You&apos;ve already completed today&apos;s challenge!
            </p>

            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-6">
              <div className="text-5xl mb-3">🔥</div>
              <p className="text-2xl font-bold">{streak.current}-day streak</p>
              <p className="text-dojo-muted text-sm mt-1">
                Best: {streak.best} days
              </p>
              {pastEntry && (
                <p className="text-dojo-muted text-sm mt-3">
                  Today&apos;s score: {pastEntry.score}/{pastEntry.maxScore} correct
                </p>
              )}
            </div>

            <p className="text-dojo-muted text-sm">
              Come back tomorrow for a new challenge.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dojo-bg text-dojo-text">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <a
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            ← Back
          </a>
          <div className="flex items-center gap-4">
            <div className="text-sm text-dojo-muted flex items-center gap-1.5">
              <span className="text-orange-400">🔥</span>
              <span>{streak.current}</span>
            </div>
            <span className="text-xs font-medium text-dojo-accent bg-dojo-accent/10 px-2 py-1 rounded">
              Day {challenge.day}
            </span>
            <BeltBadge />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">📰</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Daily Brief</h1>
          <p className="text-dojo-muted text-sm max-w-lg mx-auto">
            Three news summaries about <strong className="text-dojo-text">{challenge.topic}</strong>.
            One has a logical error, one is missing critical context, and one is solid.
            Label each and explain your reasoning.
          </p>
        </div>

        {/* Summaries */}
        <div className="space-y-6 mb-8">
          {challenge.summaries.map((summary, i) => {
            const currentLabel = labels[summary.id];
            const result = results?.details.find(
              (d) => d.summary.id === summary.id
            );

            return (
              <div
                key={summary.id}
                className={`bg-dojo-card border rounded-xl p-5 transition-all ${
                  result
                    ? result.isCorrect
                      ? "border-green-500/50"
                      : "border-red-500/50"
                    : currentLabel
                    ? "border-dojo-accent/40"
                    : "border-dojo-border"
                }`}
              >
                {/* Summary header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs text-dojo-muted/60 uppercase tracking-wider">
                      Summary {String.fromCharCode(65 + i)}
                    </span>
                    <h3 className="text-base font-semibold mt-1 leading-snug">
                      {summary.headline}
                    </h3>
                    <p className="text-xs text-dojo-muted mt-1">
                      {summary.source}
                    </p>
                  </div>
                  {result && (
                    <span
                      className={`text-lg flex-shrink-0 ${
                        result.isCorrect ? "" : ""
                      }`}
                    >
                      {result.isCorrect ? "✓" : "✗"}
                    </span>
                  )}
                </div>

                {/* Body */}
                <p className="text-sm text-dojo-muted leading-relaxed mb-4">
                  {summary.body}
                </p>

                {/* Label buttons */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(
                    Object.keys(labelDisplay) as PlayerLabel[]
                  ).map((label) => {
                    const isSelected = currentLabel === label;
                    const isUsedElsewhere =
                      usedLabels.has(label) && !isSelected;
                    return (
                      <button
                        key={label}
                        onClick={() => setLabel(summary.id, label)}
                        disabled={submitted || isUsedElsewhere}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          isSelected
                            ? label === "logical-error"
                              ? "bg-red-500/20 border-red-500/50 text-red-300"
                              : label === "missing-context"
                              ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300"
                              : "bg-green-500/20 border-green-500/50 text-green-300"
                            : isUsedElsewhere
                            ? "border-dojo-border/30 text-dojo-muted/30 cursor-not-allowed"
                            : "border-dojo-border text-dojo-muted hover:border-dojo-muted"
                        }`}
                      >
                        {labelDisplay[label].name}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation input */}
                {currentLabel && !submitted && (
                  <div className="animate-fade-in">
                    <textarea
                      value={explanations[summary.id] || ""}
                      onChange={(e) =>
                        setExplanations((prev) => ({
                          ...prev,
                          [summary.id]: e.target.value,
                        }))
                      }
                      placeholder={`Why is this "${labelDisplay[currentLabel].name}"? (min 20 characters)`}
                      className="w-full bg-dojo-surface border border-dojo-border rounded-lg px-3 py-2 text-sm text-dojo-text placeholder:text-dojo-muted/40 focus:outline-none focus:border-dojo-accent/50 resize-none"
                      rows={2}
                    />
                    <p className="text-xs text-dojo-muted/50 mt-1">
                      {(explanations[summary.id] || "").trim().length}/20 characters minimum
                    </p>
                  </div>
                )}

                {/* Result feedback */}
                {result && (
                  <div className="animate-fade-in mt-4 space-y-3">
                    <div
                      className={`text-sm font-medium ${
                        result.isCorrect ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {result.isCorrect
                        ? "Correct!"
                        : `Incorrect — this is actually "${
                            labelDisplay[summary.type].name
                          }"`}
                    </div>
                    {result.playerLabel && (
                      <div className="text-xs text-dojo-muted/60">
                        Your label:{" "}
                        <span className={labelDisplay[result.playerLabel].color}>
                          {labelDisplay[result.playerLabel].name}
                        </span>
                      </div>
                    )}
                    <div className="bg-dojo-surface/50 border border-dojo-border/50 rounded-lg p-3">
                      <p className="text-xs text-dojo-muted leading-relaxed">
                        {summary.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Results */}
        {!submitted ? (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${
                canSubmit
                  ? "bg-dojo-accent hover:bg-dojo-accent-hover text-white"
                  : "bg-dojo-card border border-dojo-border text-dojo-muted/50 cursor-not-allowed"
              }`}
            >
              Submit Analysis
            </button>
            {!allLabeled && (
              <p className="text-xs text-dojo-muted/50 mt-3">
                Label all three summaries (each label can only be used once)
              </p>
            )}
            {allLabeled && !allExplained && (
              <p className="text-xs text-dojo-muted/50 mt-3">
                Explain your reasoning for each summary (min 20 characters)
              </p>
            )}
          </div>
        ) : (
          results && (
            <div className="animate-fade-in">
              {earnedBelt && (
                <BeltUpCelebration newBelt={earnedBelt} onDismiss={() => setEarnedBelt(null)} />
              )}
              <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">
                  {results.correct === 3
                    ? "🏆"
                    : results.correct >= 2
                    ? "👏"
                    : "🤔"}
                </div>
                <h2 className="text-2xl font-bold mb-1">
                  {results.correct}/{results.total} Correct
                </h2>
                <p className="text-dojo-muted text-sm mb-4">
                  {results.correct === 3
                    ? "Perfect! You identified all three correctly."
                    : results.correct === 2
                    ? "Great analysis — one slipped through."
                    : results.correct === 1
                    ? "Tricky set. Review the explanations above."
                    : "Tough one. The explanations above break it down."}
                </p>

                <div className="mb-4">
                  <ShareScore score={results.correct} maxScore={results.total} modeName="Daily Brief" />
                </div>

                <div className="flex items-center justify-center gap-6 text-sm">
                  <div>
                    <span className="text-orange-400">🔥</span>{" "}
                    <span className="font-semibold">{streak.current}</span>
                    <span className="text-dojo-muted ml-1">streak</span>
                  </div>
                  <div>
                    <span className="text-dojo-muted">Best:</span>{" "}
                    <span className="font-semibold">{streak.best}</span>
                  </div>
                </div>

                <p className="text-dojo-muted/60 text-xs mt-6">
                  Come back tomorrow for a new challenge.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
