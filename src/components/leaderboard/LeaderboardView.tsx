"use client";

import { useState, useEffect, useRef } from "react";
import { getBeltForXP } from "@/data/belts";
import { loadProgress } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";

const LEADERBOARD_KEY = "dojo-leaderboard";

interface LeaderboardEntry {
  name: string;
  score: number;
  belt: string;
  beltColor: string;
  isUser?: boolean;
}

// Seed data — 10 anonymous thinkers
const SEED_ENTRIES: LeaderboardEntry[] = [
  { name: "Thinker_42", score: 1250, belt: "Black Belt", beltColor: "#1A1A1A" },
  { name: "LogicOwl_88", score: 980, belt: "Brown Belt", beltColor: "#795548" },
  { name: "Reasoner_7", score: 870, belt: "Brown Belt", beltColor: "#795548" },
  { name: "ClearMind_13", score: 720, belt: "Brown Belt", beltColor: "#795548" },
  { name: "Debater_55", score: 540, belt: "Brown Belt", beltColor: "#795548" },
  { name: "Skeptic_31", score: 430, belt: "Blue Belt", beltColor: "#2196F3" },
  { name: "Analyst_19", score: 350, belt: "Blue Belt", beltColor: "#2196F3" },
  { name: "Prober_66", score: 260, belt: "Green Belt", beltColor: "#4CAF50" },
  { name: "Curious_44", score: 175, belt: "Green Belt", beltColor: "#4CAF50" },
  { name: "Novice_99", score: 80, belt: "Yellow Belt", beltColor: "#F5D442" },
];

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveLeaderboard(entries: LeaderboardEntry[]): void {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {}
}

function getMergedLeaderboard(userEntries: LeaderboardEntry[]): LeaderboardEntry[] {
  const all = [...SEED_ENTRIES, ...userEntries];
  all.sort((a, b) => b.score - a.score);
  return all;
}

export default function LeaderboardView() {
  const [userEntries, setUserEntries] = useState<LeaderboardEntry[]>([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [anonName, setAnonName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    const saved = loadLeaderboard();
    setUserEntries(saved);
    if (saved.some((e) => e.isUser)) {
      setHasSubmitted(true);
    }
  }, []);

  const leaderboard = getMergedLeaderboard(userEntries);

  function handleSubmit() {
    if (!anonName.trim()) return;
    const progress = loadProgress();
    const belt = getBeltForXP(progress.totalXP);
    const entry: LeaderboardEntry = {
      name: anonName.trim(),
      score: progress.totalXP,
      belt: belt.name,
      beltColor: belt.color,
      isUser: true,
    };

    // Remove previous user entry, add new one
    const updated = userEntries.filter((e) => !e.isUser);
    updated.push(entry);
    setUserEntries(updated);
    saveLeaderboard(updated);
    setShowSubmit(false);
    setHasSubmitted(true);
  }

  function getBeltDot(color: string, name: string) {
    const displayColor = name === "Black Belt" ? "#f0e6d6" : color;
    return (
      <span
        className="inline-block w-3 h-3 rounded-full border"
        style={{
          backgroundColor: `${displayColor}30`,
          borderColor: displayColor,
        }}
      />
    );
  }

  function getRankDisplay(rank: number) {
    if (rank === 1) return <span className="text-lg">🥇</span>;
    if (rank === 2) return <span className="text-lg">🥈</span>;
    if (rank === 3) return <span className="text-lg">🥉</span>;
    return <span className="text-sm text-dojo-muted font-mono">#{rank}</span>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-dojo-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            ← Back
          </a>
          <div className="text-sm text-dojo-muted">Leaderboard</div>
          <BeltBadge />
        </div>
      </div>

      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🏆</div>
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-dojo-muted text-sm">
              Top thinkers ranked by total XP
            </p>
          </div>

          {/* Submit score */}
          {!hasSubmitted && !showSubmit && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowSubmit(true)}
                className="px-6 py-2.5 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                Submit Your Score
              </button>
            </div>
          )}

          {showSubmit && (
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8 animate-fade-in">
              <p className="text-sm text-dojo-muted mb-4">
                Choose an anonymous name to appear on the leaderboard.
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={anonName}
                  onChange={(e) => setAnonName(e.target.value)}
                  placeholder="e.g., Thinker_42"
                  maxLength={20}
                  className="flex-1 px-4 py-2.5 bg-dojo-surface border border-dojo-border rounded-lg text-dojo-text placeholder-dojo-muted/50 focus:outline-none focus:border-dojo-accent/60"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!anonName.trim()}
                  className="px-6 py-2.5 bg-dojo-accent hover:bg-dojo-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {hasSubmitted && (
            <div className="text-center mb-8">
              <button
                onClick={() => {
                  setShowSubmit(true);
                  setHasSubmitted(false);
                }}
                className="px-4 py-2 border border-dojo-border hover:border-dojo-accent/60 text-dojo-muted hover:text-dojo-text rounded-lg text-sm transition-colors"
              >
                Update Your Score
              </button>
            </div>
          )}

          {/* Leaderboard table */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[60px_1fr_100px_120px] px-4 py-3 border-b border-dojo-border text-xs text-dojo-muted uppercase tracking-wider">
              <div>Rank</div>
              <div>Name</div>
              <div className="text-right">XP</div>
              <div className="text-right">Belt</div>
            </div>

            {/* Rows */}
            {leaderboard.map((entry, i) => {
              const rank = i + 1;
              const isUserRow = entry.isUser;
              return (
                <div
                  key={`${entry.name}-${i}`}
                  className={`grid grid-cols-[60px_1fr_100px_120px] px-4 py-3 items-center border-b border-dojo-border/50 last:border-b-0 ${
                    isUserRow
                      ? "bg-dojo-accent/10 border-l-2 border-l-dojo-accent"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankDisplay(rank)}
                  </div>
                  <div className="font-medium text-sm">
                    {entry.name}
                    {isUserRow && (
                      <span className="ml-2 text-xs text-dojo-accent">(you)</span>
                    )}
                  </div>
                  <div className="text-right text-sm font-mono text-dojo-muted">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-right text-sm flex items-center justify-end gap-2">
                    {getBeltDot(entry.beltColor, entry.belt)}
                    <span className="text-dojo-muted text-xs">{entry.belt}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Future integration note */}
          <p className="text-center text-dojo-muted/50 text-xs mt-8">
            Local leaderboard — global rankings coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
