"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import ShareScore from "@/components/share-score/ShareScore";
import {
  type DailyData,
  getDailyChallengeType,
  getDailyChallengeTypeLabel,
  getDailyChallengeTypeIcon,
  getDailyFallacyQuestions,
  getDailySourceScenarios,
  getDailySteelmanScenario,
  getTodayString,
  loadDailyData,
  saveDailyData,
  updateStreak,
  getCurrentStreak,
} from "@/lib/daily-challenge";

// ================================================================
// Main orchestrator
// ================================================================

export default function DailyChallengeGame() {
  const challengeType = useMemo(() => getDailyChallengeType(), []);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [previousResult, setPreviousResult] = useState<DailyData | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const mountRef = useRef(false);

  // Check if already completed today
  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    const saved = loadDailyData();
    if (saved && saved.date === getTodayString() && saved.completed) {
      setAlreadyCompleted(true);
      setPreviousResult(saved);
      setStreakCount(getCurrentStreak());
    }
  }, []);

  const handleComplete = useCallback(
    (finalScore: number, finalMaxScore: number) => {
      setScore(finalScore);
      setMaxScore(finalMaxScore);
      setFinished(true);
    },
    []
  );

  // Award XP + update streak on finish
  useEffect(() => {
    if (!finished || xpAwarded) return;
    const xp = score * 10 + (score >= Math.ceil(maxScore / 2) ? 15 : 0);
    const mode =
      challengeType === "steelman"
        ? "steelman"
        : challengeType === "source-check"
          ? "source-check"
          : "fallacy-flash";
    const result = awardXP(mode as "fallacy-flash" | "steelman" | "source-check", xp, score, maxScore);
    if (result.beltChanged && result.newBelt) {
      setEarnedBelt(result.newBelt);
    }
    const streak = updateStreak();
    setStreakCount(streak.current);
    saveDailyData({
      date: getTodayString(),
      type: challengeType,
      score,
      maxScore,
      completed: true,
    });
    setXpAwarded(true);
  }, [finished, xpAwarded, score, maxScore, challengeType]);

  const typeLabel = getDailyChallengeTypeLabel(challengeType);
  const typeIcon = getDailyChallengeTypeIcon(challengeType);

  // ---- Already completed view ----
  if (alreadyCompleted && previousResult) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold mb-2">Challenge Complete</h2>
            <p className="text-dojo-muted mb-6">
              You already finished today&apos;s {typeLabel} challenge
            </p>

            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-4">
              <div className="text-4xl font-bold text-dojo-accent mb-1">
                {previousResult.score}/{previousResult.maxScore}
              </div>
              <div className="text-sm text-dojo-muted">Score</div>
            </div>

            {streakCount > 0 && (
              <div className="bg-dojo-card border border-orange-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-2xl font-bold text-orange-400">
                    {streakCount}
                  </span>
                  <span className="text-dojo-muted">day streak</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <ShareScore
                score={previousResult.score}
                maxScore={previousResult.maxScore}
                modeName="Daily Challenge"
              />
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
      </div>
    );
  }

  // ---- Completion screen ----
  if (finished) {
    const xp = score * 10 + (score >= Math.ceil(maxScore / 2) ? 15 : 0);
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        {earnedBelt && (
          <BeltUpCelebration
            newBelt={earnedBelt}
            onDismiss={() => setEarnedBelt(null)}
          />
        )}
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {score >= Math.ceil(maxScore * 0.8)
              ? "🥋"
              : score >= Math.ceil(maxScore / 2)
                ? "💪"
                : "📖"}
          </div>
          <h2 className="text-3xl font-bold mb-2">Daily Challenge Complete!</h2>
          <p className="text-dojo-muted mb-2">
            {typeIcon} {typeLabel} — {score}/{maxScore} correct
          </p>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-4">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              +{xp} XP
            </div>
            <div className="text-sm text-dojo-muted">
              {score * 10} base
              {score >= Math.ceil(maxScore / 2) ? " + 15 daily bonus" : ""}
            </div>
          </div>

          {/* Streak badge */}
          {streakCount > 0 && (
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🔥</span>
                <div>
                  <div className="text-3xl font-bold text-orange-400">
                    {streakCount}
                  </div>
                  <div className="text-xs text-orange-400/70">
                    {streakCount === 1 ? "Day streak started!" : "Day streak!"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completion badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
            <span>🏅</span> Daily Challenge Badge Earned
          </div>

          <div className="mb-6">
            <ShareScore
              score={score}
              maxScore={maxScore}
              modeName="Daily Challenge"
            />
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

  // ---- Active game screen ----
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      {challengeType === "fallacy-flash" && (
        <FallacyFlashDaily onComplete={handleComplete} />
      )}
      {challengeType === "source-check" && (
        <SourceCheckDaily onComplete={handleComplete} />
      )}
      {challengeType === "steelman" && (
        <SteelmanDaily onComplete={handleComplete} />
      )}
    </div>
  );
}

// ================================================================
// Shared top bar
// ================================================================

function TopBar() {
  return (
    <div className="px-6 py-4 border-b border-dojo-border">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <a
          href="/"
          className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
        >
          ← Back
        </a>
        <div className="text-sm text-dojo-muted flex items-center gap-2">
          <span>📅</span> Daily Challenge
        </div>
        <BeltBadge />
      </div>
    </div>
  );
}

// ================================================================
// Fallacy Flash daily sub-game (5 MCQ)
// ================================================================

function FallacyFlashDaily({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const questions = useMemo(() => getDailyFallacyQuestions(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [revealed, setRevealed] = useState(false);

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
      const finalScore = questions.reduce(
        (acc, q, i) => (answers[i] === q.example.correctAnswer ? acc + 1 : acc),
        0
      );
      onComplete(finalScore, questions.length);
    }
  }, [currentIndex, questions, answers, onComplete]);

  const selectedAnswer = answers[currentIndex];
  const isCorrect = selectedAnswer === current.example.correctAnswer;

  return (
    <>
      {/* Progress bar */}
      <div className="px-6">
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (revealed ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-dojo-muted mt-2 text-right">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
            ⚡ Fallacy Flash — Identify the Fallacy
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
                classes += "border-green-600 bg-green-900/20 text-green-300";
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
    </>
  );
}

// ================================================================
// Source Check daily sub-game (3 credibility ratings)
// ================================================================

const CREDIBILITY_LABELS = ["", "Very Low", "Low", "Medium", "High", "Very High"];

function SourceCheckDaily({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const scenarios = useMemo(() => getDailySourceScenarios(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<(number | null)[]>(
    () => new Array(scenarios.length).fill(null)
  );
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const current = scenarios[currentIndex];

  const handleSelect = useCallback(
    (n: number) => {
      if (revealed) return;
      setSelectedRating(n);
    },
    [revealed]
  );

  const handleConfirm = useCallback(() => {
    if (selectedRating === null || revealed) return;
    setRatings((prev) => {
      const next = [...prev];
      next[currentIndex] = selectedRating;
      return next;
    });
    setRevealed(true);
  }, [selectedRating, revealed, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedRating(null);
      setRevealed(false);
    } else {
      const finalScore = scenarios.reduce((acc, s, i) => {
        const r = ratings[i];
        if (r === null) return acc;
        return acc + (Math.abs(r - s.idealCredibility) <= 1 ? 1 : 0);
      }, 0);
      onComplete(finalScore, scenarios.length);
    }
  }, [currentIndex, scenarios, ratings, onComplete]);

  const isClose =
    selectedRating !== null &&
    Math.abs(selectedRating - current.idealCredibility) <= 1;

  return (
    <>
      {/* Progress bar */}
      <div className="px-6">
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (revealed ? 1 : 0)) / scenarios.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-dojo-muted mt-2 text-right">
            {currentIndex + 1} / {scenarios.length}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
            🔍 Source Check — Rate the Credibility
          </div>

          <div className="bg-dojo-surface border border-dojo-border rounded-xl p-6 mb-8">
            <div className="text-xs text-dojo-muted mb-2">{current.source}</div>
            <h3 className="text-xl font-bold text-dojo-text mb-3">
              {current.headline}
            </h3>
            <p className="text-sm text-dojo-muted leading-relaxed">
              {current.snippet}
            </p>
          </div>

          <p className="text-sm text-dojo-muted mb-4">
            How credible is this source?
          </p>

          <div className="flex gap-2 justify-center mb-4">
            {[1, 2, 3, 4, 5].map((n) => {
              let classes =
                "flex-1 py-3 rounded-lg border text-center font-medium transition-all ";
              if (!revealed) {
                classes +=
                  selectedRating === n
                    ? "border-dojo-accent bg-dojo-accent/20 text-dojo-accent"
                    : "border-dojo-border bg-dojo-card hover:border-dojo-accent/40 cursor-pointer";
              } else if (n === current.idealCredibility) {
                classes += "border-green-600 bg-green-900/20 text-green-300";
              } else if (
                selectedRating === n &&
                n !== current.idealCredibility
              ) {
                const close = Math.abs(n - current.idealCredibility) <= 1;
                classes += close
                  ? "border-yellow-600 bg-yellow-900/20 text-yellow-300"
                  : "border-red-600 bg-red-900/20 text-red-300";
              } else {
                classes +=
                  "border-dojo-border/50 bg-dojo-card/50 text-dojo-muted/50";
              }
              return (
                <button
                  key={n}
                  onClick={() => handleSelect(n)}
                  disabled={revealed}
                  className={classes}
                >
                  <div className="text-lg">{n}</div>
                  <div className="text-[10px] mt-0.5">
                    {CREDIBILITY_LABELS[n]}
                  </div>
                </button>
              );
            })}
          </div>

          {!revealed && selectedRating !== null && (
            <button
              onClick={handleConfirm}
              className="mt-4 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              Submit Rating
            </button>
          )}

          {revealed && (
            <div className="mt-6 animate-fade-in">
              <div
                className={`p-4 rounded-lg border ${
                  isClose
                    ? "border-green-800/50 bg-green-900/10"
                    : "border-red-800/50 bg-red-900/10"
                }`}
              >
                <div className="font-semibold mb-1">
                  {isClose ? "Good eye!" : "Not quite."} Ideal:{" "}
                  {CREDIBILITY_LABELS[current.idealCredibility]} (
                  {current.idealCredibility}/5)
                </div>
                <p className="text-xs text-dojo-muted mb-2">
                  <span className="font-medium text-dojo-text">Category:</span>{" "}
                  {current.categoryLabel}
                </p>
                <p className="text-sm text-dojo-muted">{current.biasNotes}</p>
              </div>
              <button
                onClick={handleNext}
                className="mt-6 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                {currentIndex < scenarios.length - 1
                  ? "Next Source"
                  : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ================================================================
// Steelman daily sub-game (1 writing exercise)
// ================================================================

function SteelmanDaily({
  onComplete,
}: {
  onComplete: (score: number, max: number) => void;
}) {
  const scenario = useMemo(() => getDailySteelmanScenario(), []);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    charity: number;
    strength: number;
    concerns: number;
    feedback: string;
  } | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (response.length < 50 || submitted) return;
    setSubmitted(true);
    setEvaluating(true);

    try {
      const res = await fetch("/api/evaluate-steelman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: scenario.position,
          userResponse: response,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setEvaluation(data);
        const total = data.charity + data.strength + data.concerns;
        const mapped =
          total >= 12 ? 5 : total >= 9 ? 4 : total >= 6 ? 3 : total >= 3 ? 2 : 1;
        setEvaluating(false);
        onComplete(mapped, 5);
      } else {
        setEvaluating(false);
        onComplete(3, 5);
      }
    } catch {
      setEvaluating(false);
      onComplete(3, 5);
    }
  }, [response, submitted, scenario.position, onComplete]);

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
          💪 Steelman — Strengthen This Argument
        </div>

        <div className="bg-dojo-surface border border-dojo-border rounded-xl p-6 mb-6">
          <p className="text-lg font-semibold text-dojo-text mb-2">
            &ldquo;{scenario.position}&rdquo;
          </p>
          <p className="text-sm text-dojo-muted">{scenario.context}</p>
        </div>

        {scenario.hints.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-sm text-dojo-accent hover:text-dojo-accent-hover transition-colors"
            >
              {showHints ? "Hide hints ▴" : "Show hints ▾"}
            </button>
            {showHints && (
              <ul className="mt-2 space-y-1">
                {scenario.hints.map((hint, i) => (
                  <li
                    key={i}
                    className="text-sm text-dojo-muted pl-4 border-l border-dojo-border"
                  >
                    {hint}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="text-sm text-dojo-muted mb-3">
          Write the strongest, most charitable version of this argument:
        </p>

        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          disabled={submitted}
          className="w-full h-48 p-4 bg-dojo-card border border-dojo-border rounded-xl text-dojo-text placeholder-dojo-muted/50 resize-none focus:outline-none focus:border-dojo-accent/60 transition-colors disabled:opacity-50"
          placeholder="Present the most thoughtful, compelling case for this position..."
        />

        <div className="flex items-center justify-between mt-3">
          <span
            className={`text-xs ${response.length >= 50 ? "text-dojo-muted" : "text-red-400"}`}
          >
            {response.length}/50 min characters
          </span>
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={response.length < 50}
              className="px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
              Submit
            </button>
          )}
        </div>

        {evaluating && (
          <div className="mt-8 text-center text-dojo-muted">
            <div className="text-2xl mb-2 animate-spin inline-block">⏳</div>
            <p className="text-sm">Evaluating your argument...</p>
          </div>
        )}

        {evaluation && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6">
              <h4 className="font-semibold mb-4">Evaluation</h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {(
                  [
                    { label: "Charity", value: evaluation.charity },
                    { label: "Strength", value: evaluation.strength },
                    { label: "Concerns", value: evaluation.concerns },
                  ] as const
                ).map((dim) => (
                  <div key={dim.label} className="text-center">
                    <div className="text-2xl font-bold text-dojo-accent">
                      {dim.value}/5
                    </div>
                    <div className="text-xs text-dojo-muted">{dim.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-dojo-muted">{evaluation.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
