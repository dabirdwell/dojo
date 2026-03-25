"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { civicScenarios, type CivicScenario } from "@/data/civic-scenarios";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";

interface QuestionState {
  scenario: CivicScenario;
  selectedAnswer: number | null;
  revealed: boolean;
}

function getRandomScenarios(count: number): QuestionState[] {
  const pool = civicScenarios.map((scenario) => ({
    scenario,
    selectedAnswer: null,
    revealed: false,
  }));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Introductory",
  2: "Intermediate",
  3: "Advanced",
};

export default function CivicCheckGame() {
  const [questions] = useState(() => getRandomScenarios(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(10).fill(null)
  );
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (revealed) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = optionIndex;
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

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const score = useMemo(
    () =>
      questions.reduce(
        (acc, q, i) =>
          answers[i] === q.scenario.correctIndex ? acc + 1 : acc,
        0
      ),
    [questions, answers]
  );

  const [xpAwarded, setXpAwarded] = useState(false);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);

  useEffect(() => {
    if (finished && !xpAwarded) {
      const xp = score * 15 + (score >= 7 ? 30 : 0);
      const result = awardXP("civic-check", xp, score, questions.length);
      if (result.beltChanged && result.newBelt) {
        setEarnedBelt(result.newBelt);
      }
      setXpAwarded(true);
    }
  }, [finished, xpAwarded, score, questions.length]);

  if (finished) {
    const xp = score * 15 + (score >= 7 ? 30 : 0);
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
            {score >= 8 ? "🏛" : score >= 5 ? "📜" : "📖"}
          </div>
          <h2 className="text-3xl font-bold mb-2">Analysis Complete</h2>
          <p className="text-dojo-muted mb-8">
            {score}/{questions.length} correct
          </p>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              +{xp} XP
            </div>
            <div className="text-sm text-dojo-muted">
              {score * 15} base{score >= 7 ? " + 30 policy bonus" : ""}
            </div>
          </div>

          {/* Review */}
          <div className="space-y-3 text-left mb-8">
            {questions.map((q, i) => {
              const correct = answers[i] === q.scenario.correctIndex;
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
                    <span className="font-medium">{q.scenario.title}</span>
                  </div>
                  <p className="text-dojo-muted text-xs">
                    {q.scenario.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            Analyze Again
          </button>
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentIndex];
  const isCorrect = selectedAnswer === current.scenario.correctIndex;

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
          <div className="text-sm text-dojo-muted">
            {currentIndex + 1} / {questions.length}
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
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-dojo-muted uppercase tracking-wider">
              Civic Check
            </div>
            <div className="text-xs text-dojo-muted">
              {DIFFICULTY_LABELS[current.scenario.difficulty]} · {current.scenario.tags.join(", ")}
            </div>
          </div>

          {/* Bill title */}
          <h2 className="text-xl sm:text-2xl font-bold text-dojo-text mb-4">
            {current.scenario.title}
          </h2>

          {/* Bill text */}
          <div className="bg-dojo-card border border-dojo-border rounded-lg p-5 mb-6">
            <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
              Bill Summary
            </div>
            <div className="text-sm sm:text-base leading-relaxed text-dojo-text whitespace-pre-line">
              {current.scenario.billText}
            </div>
          </div>

          {/* Question */}
          <p className="text-base font-semibold text-dojo-accent mb-4">
            {current.scenario.question}
          </p>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {current.scenario.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isAnswer = idx === current.scenario.correctIndex;

              let classes =
                "p-4 rounded-lg border text-left text-sm transition-all ";

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
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={revealed}
                  className={classes}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
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
                  {isCorrect ? "Correct! +15 XP" : "Not quite."}
                </div>
                <p className="text-sm text-dojo-muted">
                  {current.scenario.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="mt-6 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                {currentIndex < questions.length - 1
                  ? "Next Bill"
                  : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
