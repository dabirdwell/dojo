"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { getMixedSet } from "@/data/real-world-scenarios";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import { recordScenariosCompleted, recordPerfectRound } from "@/lib/achievements";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import ShareScore from "@/components/share-score/ShareScore";

interface Answer {
  // fallacy-spotting
  selectedOption?: string;
  // source-evaluation
  credibilityRating?: number;
  // steelman-challenge
  steelmanText?: string;
  // shared
  revealed: boolean;
  correct: boolean;
}

const STREAK_KEY = "dojo-realworld-streak";

function loadStreak(): { count: number; lastDate: string } {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { count: 0, lastDate: "" };
}

function saveStreak(count: number): void {
  try {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STREAK_KEY, JSON.stringify({ count, lastDate: today }));
  } catch {}
}

const credibilityLabels = [
  "",
  "Not credible",
  "Mostly unreliable",
  "Mixed / Unclear",
  "Mostly credible",
  "Highly credible",
];

const categoryLabels: Record<string, string> = {
  "fallacy-spotting": "Fallacy Spotting",
  "source-evaluation": "Source Evaluation",
  "steelman-challenge": "Steelman Challenge",
};

const categoryIcons: Record<string, string> = {
  "fallacy-spotting": "⚡",
  "source-evaluation": "🔍",
  "steelman-challenge": "🛡",
};

export default function RealWorldGame() {
  const [scenarios] = useState(() => getMixedSet());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() =>
    new Array(10).fill(null).map(() => ({ revealed: false, correct: false }))
  );
  const [finished, setFinished] = useState(false);

  // Per-question state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [credRating, setCredRating] = useState(0);
  const [steelmanText, setSteelmanText] = useState("");
  const [animateNext, setAnimateNext] = useState(false);

  const current = scenarios[currentIndex];
  const currentAnswer = answers[currentIndex];

  // Streak
  const [streak, setStreak] = useState(() => {
    const s = loadStreak();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.lastDate === today || s.lastDate === yesterday) return s.count;
    return 0;
  });

  const handleSubmitFallacy = useCallback(
    (option: string) => {
      if (currentAnswer.revealed) return;
      const isCorrect = option === current.correctAnswer;
      setSelectedOption(option);
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = {
          selectedOption: option,
          revealed: true,
          correct: isCorrect,
        };
        return next;
      });
    },
    [current, currentAnswer, currentIndex]
  );

  const handleSubmitSource = useCallback(() => {
    if (currentAnswer.revealed || credRating === 0) return;
    const ideal = current.idealCredibility ?? 3;
    const diff = Math.abs(credRating - ideal);
    const isCorrect = diff <= 1;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = {
        credibilityRating: credRating,
        revealed: true,
        correct: isCorrect,
      };
      return next;
    });
  }, [current, currentAnswer, currentIndex, credRating]);

  const handleSubmitSteelman = useCallback(() => {
    if (currentAnswer.revealed || steelmanText.trim().length < 20) return;
    // Steelman is always "correct" for XP — it's about practice
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = {
        steelmanText: steelmanText.trim(),
        revealed: true,
        correct: true,
      };
      return next;
    });
  }, [currentAnswer, currentIndex, steelmanText]);

  const handleNext = useCallback(() => {
    setAnimateNext(true);
    setTimeout(() => {
      if (currentIndex < scenarios.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setCredRating(0);
        setSteelmanText("");
      } else {
        setFinished(true);
      }
      setAnimateNext(false);
    }, 200);
  }, [currentIndex, scenarios.length]);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const score = useMemo(
    () => answers.filter((a) => a.correct).length,
    [answers]
  );

  const [xpAwarded, setXpAwarded] = useState(false);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);

  useEffect(() => {
    if (finished && !xpAwarded) {
      const xp = score * 12 + (score >= 7 ? 20 : 0);
      const result = awardXP("real-world", xp, score, scenarios.length);
      if (result.beltChanged && result.newBelt) {
        setEarnedBelt(result.newBelt);
      }
      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      saveStreak(newStreak);

      // Achievement tracking
      recordScenariosCompleted(scenarios.map((s) => s.id));
      if (score === scenarios.length) recordPerfectRound();

      setXpAwarded(true);
    }
  }, [finished, xpAwarded, score, scenarios.length, streak]);

  // ─── RESULTS ────────────────────────────────────────────────────────
  if (finished) {
    const xp = score * 12 + (score >= 7 ? 20 : 0);
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        {earnedBelt && (
          <BeltUpCelebration
            newBelt={earnedBelt}
            onDismiss={() => setEarnedBelt(null)}
          />
        )}
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">
            {score >= 8 ? "🌍" : score >= 5 ? "📰" : "📖"}
          </div>
          <h2 className="text-3xl font-bold mb-2">Round Complete</h2>
          <p className="text-dojo-muted mb-2">
            {score}/{scenarios.length} correct
          </p>

          {streak > 0 && (
            <p className="text-sm text-dojo-accent mb-6">
              🔥 {streak} day streak
            </p>
          )}

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              +{xp} XP
            </div>
            <div className="text-sm text-dojo-muted">
              {score * 12} base{score >= 7 ? " + 20 streak bonus" : ""}
            </div>
          </div>

          <div className="mb-6">
            <ShareScore
              score={score}
              maxScore={scenarios.length}
              modeName="Real World"
            />
          </div>

          {/* Review */}
          <div className="space-y-3 text-left mb-8">
            {scenarios.map((s, i) => {
              const a = answers[i];
              return (
                <div
                  key={s.id}
                  className={`p-3 rounded-lg border text-sm ${
                    a.correct
                      ? "border-green-800/50 bg-green-900/10"
                      : "border-red-800/50 bg-red-900/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{a.correct ? "✓" : "✗"}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-dojo-surface border border-dojo-border">
                      {categoryLabels[s.category]}
                    </span>
                  </div>
                  <div className="font-medium text-dojo-text mb-1">
                    {s.headline}
                  </div>
                  <p className="text-dojo-muted text-xs">{s.explanation}</p>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            Train Again
          </button>
        </div>
      </div>
    );
  }

  // ─── GAME ───────────────────────────────────────────────────────────
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
          <div className="flex items-center gap-3">
            <div className="text-sm text-dojo-muted">
              {currentIndex + 1} / {scenarios.length}
            </div>
            {streak > 0 && (
              <span className="text-xs text-dojo-accent">🔥 {streak}</span>
            )}
          </div>
          <BeltBadge />
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (currentAnswer.revealed ? 1 : 0)) / scenarios.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 flex items-start justify-center px-6 py-8 sm:py-12 transition-opacity duration-200 ${
          animateNext ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-2xl w-full">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{categoryIcons[current.category]}</span>
            <span className="text-xs text-dojo-muted uppercase tracking-wider">
              {categoryLabels[current.category]}
            </span>
            <span className="ml-auto text-xs text-dojo-muted/60">
              {"●".repeat(current.difficulty)}
              {"○".repeat(3 - current.difficulty)}
            </span>
          </div>

          {/* Headline card */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 sm:p-6 mb-8">
            <div className="text-xs text-dojo-muted mb-2">{current.source}</div>
            <h2 className="text-lg sm:text-xl font-bold text-dojo-text leading-snug mb-3">
              {current.headline}
            </h2>
            <p className="text-sm text-dojo-muted leading-relaxed">
              {current.context}
            </p>
          </div>

          {/* ─── FALLACY SPOTTING ───────────────────────────────── */}
          {current.category === "fallacy-spotting" && !currentAnswer.revealed && (
            <div>
              <label className="block text-sm font-semibold text-dojo-text mb-3">
                What fallacy is being committed?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.options!.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSubmitFallacy(option)}
                    className="p-4 rounded-lg border border-dojo-border bg-dojo-card hover:border-dojo-accent/60 hover:bg-dojo-accent/5 cursor-pointer text-left font-medium transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {current.category === "fallacy-spotting" && currentAnswer.revealed && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {current.options!.map((option) => {
                  const isSelected = selectedOption === option;
                  const isAnswer = option === current.correctAnswer;
                  let classes =
                    "p-4 rounded-lg border text-left font-medium transition-all ";
                  if (isAnswer) {
                    classes += "border-green-600 bg-green-900/20 text-green-300";
                  } else if (isSelected && !isAnswer) {
                    classes += "border-red-600 bg-red-900/20 text-red-300";
                  } else {
                    classes += "border-dojo-border/50 bg-dojo-card/50 text-dojo-muted/50";
                  }
                  return (
                    <div key={option} className={classes}>
                      {option}
                    </div>
                  );
                })}
              </div>
              <FeedbackBlock
                correct={currentAnswer.correct}
                explanation={current.explanation}
              />
              <NextButton
                onClick={handleNext}
                isLast={currentIndex >= scenarios.length - 1}
              />
            </div>
          )}

          {/* ─── SOURCE EVALUATION ─────────────────────────────── */}
          {current.category === "source-evaluation" && !currentAnswer.revealed && (
            <div>
              <label className="block text-sm font-semibold text-dojo-text mb-3">
                Rate the credibility of this source (1-5)
              </label>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCredRating(n)}
                    className={`flex-1 py-4 rounded-lg border text-sm font-medium transition-all ${
                      credRating === n
                        ? "border-dojo-accent bg-dojo-accent/20 text-dojo-accent"
                        : "border-dojo-border bg-dojo-card hover:border-dojo-accent/40 text-dojo-muted"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {credRating > 0 && (
                <div className="text-xs text-dojo-muted mb-6">
                  {credibilityLabels[credRating]}
                </div>
              )}
              <button
                onClick={handleSubmitSource}
                disabled={credRating === 0}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  credRating > 0
                    ? "bg-dojo-accent hover:bg-dojo-accent-hover text-white"
                    : "bg-dojo-card text-dojo-muted/50 border border-dojo-border cursor-not-allowed"
                }`}
              >
                Submit Rating
              </button>
            </div>
          )}

          {current.category === "source-evaluation" && currentAnswer.revealed && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm text-dojo-muted">
                  Your rating: <span className="font-bold text-dojo-text">{currentAnswer.credibilityRating}/5</span>
                </div>
                <div className="text-sm text-dojo-muted">
                  Ideal: <span className="font-bold text-dojo-text">{current.idealCredibility}/5</span>
                </div>
              </div>
              <FeedbackBlock
                correct={currentAnswer.correct}
                explanation={current.explanation}
              />
              <NextButton
                onClick={handleNext}
                isLast={currentIndex >= scenarios.length - 1}
              />
            </div>
          )}

          {/* ─── STEELMAN CHALLENGE ────────────────────────────── */}
          {current.category === "steelman-challenge" && !currentAnswer.revealed && (
            <div>
              <label className="block text-sm font-semibold text-dojo-text mb-2">
                Construct the strongest version of this argument
              </label>
              <p className="text-xs text-dojo-muted mb-3">
                Even if you disagree, write the most compelling case you can.
              </p>
              <textarea
                value={steelmanText}
                onChange={(e) => setSteelmanText(e.target.value)}
                placeholder="The strongest version of this argument would be..."
                rows={5}
                className="w-full px-4 py-3 bg-dojo-surface border border-dojo-border rounded-lg text-sm text-dojo-text placeholder-dojo-muted/50 focus:outline-none focus:border-dojo-accent/60 resize-none mb-4"
              />
              <button
                onClick={handleSubmitSteelman}
                disabled={steelmanText.trim().length < 20}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  steelmanText.trim().length >= 20
                    ? "bg-dojo-accent hover:bg-dojo-accent-hover text-white"
                    : "bg-dojo-card text-dojo-muted/50 border border-dojo-border cursor-not-allowed"
                }`}
              >
                Submit Steelman
              </button>
            </div>
          )}

          {current.category === "steelman-challenge" && currentAnswer.revealed && (
            <div className="animate-fade-in">
              {currentAnswer.steelmanText && (
                <div className="p-4 rounded-lg border border-dojo-border bg-dojo-surface mb-4">
                  <div className="text-xs text-dojo-muted mb-1 font-semibold">
                    Your response
                  </div>
                  <p className="text-sm text-dojo-text">
                    {currentAnswer.steelmanText}
                  </p>
                </div>
              )}
              <div className="p-4 rounded-lg border border-green-800/50 bg-green-900/10 mb-4">
                <div className="text-xs text-green-400 mb-1 font-semibold">
                  Model steelman
                </div>
                <p className="text-sm text-dojo-muted">
                  {current.correctAnswer}
                </p>
              </div>
              <FeedbackBlock correct={true} explanation={current.explanation} />
              <NextButton
                onClick={handleNext}
                isLast={currentIndex >= scenarios.length - 1}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackBlock({
  correct,
  explanation,
}: {
  correct: boolean;
  explanation: string;
}) {
  return (
    <div
      className={`p-4 rounded-lg border mb-6 ${
        correct
          ? "border-green-800/50 bg-green-900/10"
          : "border-red-800/50 bg-red-900/10"
      }`}
    >
      <div className="font-semibold mb-1">
        {correct ? "Correct! +12 XP" : "Not quite."}
      </div>
      <p className="text-sm text-dojo-muted">{explanation}</p>
    </div>
  );
}

function NextButton({
  onClick,
  isLast,
}: {
  onClick: () => void;
  isLast: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
    >
      {isLast ? "See Results" : "Next Question"}
    </button>
  );
}
