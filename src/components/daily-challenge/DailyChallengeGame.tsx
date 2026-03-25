"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { fallacies, type FallacyExample } from "@/data/fallacies";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import ShareScore from "@/components/share-score/ShareScore";

const DAILY_KEY = "dojo-daily-challenge";
const QUESTIONS_PER_DAY = 5;

interface DailyData {
  date: string;
  score: number;
  timeSeconds: number;
  completed: boolean;
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

// Seeded PRNG from date string — deterministic for everyone on the same day
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

interface QuestionState {
  fallacyName: string;
  example: FallacyExample;
}

function getDailyQuestions(): QuestionState[] {
  const today = getTodayString();
  const rng = seededRandom(today);

  // Build pool of all examples
  const pool: QuestionState[] = [];
  for (const fallacy of fallacies) {
    for (const example of fallacy.examples) {
      pool.push({ fallacyName: fallacy.name, example });
    }
  }

  // Shuffle with seeded RNG
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, QUESTIONS_PER_DAY);
}

function loadDailyData(): DailyData | null {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveDailyData(data: DailyData): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(data));
  } catch {}
}

export default function DailyChallengeGame() {
  const questions = useMemo(() => getDailyQuestions(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => new Array(QUESTIONS_PER_DAY).fill(null)
  );
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [previousResult, setPreviousResult] = useState<DailyData | null>(null);
  const [startTime] = useState(() => Date.now());
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);
  const mountRef = useRef(false);

  // Check if already completed today
  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    const saved = loadDailyData();
    if (saved && saved.date === getTodayString() && saved.completed) {
      setAlreadyCompleted(true);
      setPreviousResult(saved);
    }
  }, []);

  const current = questions[currentIndex];

  const handleSelect = useCallback(
    (option: string) => {
      if (revealed) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = option;
        return next;
      });
      setRevealed(true);
    },
    [currentIndex, revealed]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  }, [currentIndex, questions.length]);

  const score = useMemo(
    () =>
      questions.reduce(
        (acc, q, i) =>
          answers[i] === q.example.correctAnswer ? acc + 1 : acc,
        0
      ),
    [questions, answers]
  );

  const elapsedSeconds = useMemo(() => {
    if (!finished) return 0;
    return Math.round((Date.now() - startTime) / 1000);
  }, [finished, startTime]);

  // Award XP and save result
  useEffect(() => {
    if (finished && !xpAwarded) {
      const xp = score * 10 + (score >= 3 ? 15 : 0);
      const result = awardXP("fallacy-flash", xp, score, questions.length);
      if (result.beltChanged && result.newBelt) {
        setEarnedBelt(result.newBelt);
      }
      saveDailyData({
        date: getTodayString(),
        score,
        timeSeconds: elapsedSeconds,
        completed: true,
      });
      setXpAwarded(true);
    }
  }, [finished, xpAwarded, score, questions.length, elapsedSeconds]);

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  // Already completed today
  if (alreadyCompleted && previousResult) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <a href="/" className="text-dojo-muted hover:text-dojo-text text-sm transition-colors">
              ← Back
            </a>
            <div className="text-sm text-dojo-muted">Daily Challenge</div>
            <BeltBadge />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold mb-2">Challenge Complete</h2>
            <p className="text-dojo-muted mb-4">
              You already finished today&apos;s challenge
            </p>

            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-dojo-accent mb-1">
                {previousResult.score}/{QUESTIONS_PER_DAY}
              </div>
              <div className="text-sm text-dojo-muted">
                Completed in {formatTime(previousResult.timeSeconds)}
              </div>
            </div>

            <div className="mb-6">
              <ShareScore
                score={previousResult.score}
                maxScore={QUESTIONS_PER_DAY}
                modeName="Daily Challenge"
              />
            </div>

            <div className="bg-dojo-surface border border-dojo-border rounded-xl p-6">
              <div className="text-2xl mb-2">🌅</div>
              <p className="text-dojo-muted text-sm">
                Come back tomorrow for a new challenge!
              </p>
            </div>

            <a
              href="/"
              className="inline-block mt-6 px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              Back to Dojo
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (finished) {
    const xp = score * 10 + (score >= 3 ? 15 : 0);
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        {earnedBelt && (
          <BeltUpCelebration
            newBelt={earnedBelt}
            onDismiss={() => setEarnedBelt(null)}
          />
        )}
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">
            {score >= 4 ? "🥋" : score >= 3 ? "💪" : "📖"}
          </div>
          <h2 className="text-3xl font-bold mb-2">Daily Challenge Complete</h2>
          <p className="text-dojo-muted mb-2">
            {score}/{QUESTIONS_PER_DAY} correct
          </p>
          <p className="text-dojo-muted text-sm mb-8">
            Time: {formatTime(elapsedSeconds)}
          </p>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              +{xp} XP
            </div>
            <div className="text-sm text-dojo-muted">
              {score * 10} base{score >= 3 ? " + 15 daily bonus" : ""}
            </div>
          </div>

          <div className="mb-6">
            <ShareScore
              score={score}
              maxScore={QUESTIONS_PER_DAY}
              modeName="Daily Challenge"
            />
          </div>

          {/* Review */}
          <div className="space-y-3 text-left mb-8">
            {questions.map((q, i) => {
              const correct = answers[i] === q.example.correctAnswer;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-sm ${
                    correct
                      ? "border-green-800/50 bg-green-900/10"
                      : "border-red-800/50 bg-red-900/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{correct ? "✓" : "✗"}</span>
                    <span className="font-medium">
                      {q.example.correctAnswer}
                    </span>
                  </div>
                  <p className="text-dojo-muted text-xs">
                    {q.example.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-dojo-surface border border-dojo-border rounded-xl p-6 mb-6">
            <div className="text-2xl mb-2">🌅</div>
            <p className="text-dojo-muted text-sm">
              Come back tomorrow for a new challenge!
            </p>
          </div>

          <a
            href="/"
            className="inline-block px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            Back to Dojo
          </a>
        </div>
      </div>
    );
  }

  // Game screen
  const selectedAnswer = answers[currentIndex];
  const isCorrect = selectedAnswer === current.example.correctAnswer;

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
          <div className="text-sm text-dojo-muted flex items-center gap-3">
            <span>📅 Daily Challenge</span>
            <span>
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <BeltBadge />
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (revealed ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
            Identify the Fallacy
          </div>

          <blockquote className="text-lg sm:text-xl leading-relaxed text-dojo-text border-l-2 border-dojo-accent pl-5 mb-10">
            {current.example.argument}
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.example.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isAnswer = option === current.example.correctAnswer;

              let classes =
                "p-4 rounded-lg border text-left font-medium transition-all ";

              if (!revealed) {
                classes +=
                  "border-dojo-border bg-dojo-card hover:border-dojo-accent/60 hover:bg-dojo-accent/5 cursor-pointer";
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

          {revealed && (
            <div className="mt-8 animate-fade-in">
              <div
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? "border-green-800/50 bg-green-900/10"
                    : "border-red-800/50 bg-red-900/10"
                }`}
              >
                <div className="font-semibold mb-1">
                  {isCorrect ? "Correct! +10 XP" : "Not quite."}
                </div>
                <p className="text-sm text-dojo-muted">
                  {current.example.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="mt-6 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                {currentIndex < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
