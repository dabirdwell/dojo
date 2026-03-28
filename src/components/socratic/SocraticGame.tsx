"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { socraticChains, type SocraticChain } from "@/data/socratic-scenarios";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import ShareScore from "@/components/share-score/ShareScore";

interface RoundState {
  chain: SocraticChain;
  selectedQuestion: number | null;
  revealed: boolean;
}

function shuffleChains(): RoundState[] {
  const pool = socraticChains.map((chain) => ({
    chain,
    selectedQuestion: null,
    revealed: false,
  }));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Introductory",
  2: "Intermediate",
  3: "Advanced",
};

export default function SocraticGame() {
  const [rounds] = useState(shuffleChains);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(rounds.length).fill(null)
  );
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = rounds[currentIndex];

  const handleSelect = useCallback(
    (questionIndex: number) => {
      if (revealed) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = questionIndex;
        return next;
      });
      setRevealed(true);
    },
    [currentIndex, revealed]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < rounds.length - 1) {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  }, [currentIndex, rounds.length]);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const score = useMemo(
    () =>
      rounds.reduce(
        (acc, r, i) =>
          answers[i] === r.chain.strongestQuestionIndex ? acc + 1 : acc,
        0
      ),
    [rounds, answers]
  );

  const [xpAwarded, setXpAwarded] = useState(false);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);

  useEffect(() => {
    if (finished && !xpAwarded) {
      const xp = score * 15 + (score >= 4 ? 25 : 0);
      const result = awardXP("socratic", xp, score, rounds.length);
      if (result.beltChanged && result.newBelt) {
        setEarnedBelt(result.newBelt);
      }
      setXpAwarded(true);
    }
  }, [finished, xpAwarded, score, rounds.length]);

  if (finished) {
    const xp = score * 15 + (score >= 4 ? 25 : 0);
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
            {score >= 4 ? "🏛" : score >= 3 ? "🤔" : "💭"}
          </div>
          <h2 className="text-3xl font-bold mb-2">Examination Complete</h2>
          <p className="text-dojo-muted mb-8">
            {score}/{rounds.length} strongest questions identified
          </p>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              +{xp} XP
            </div>
            <div className="text-sm text-dojo-muted">
              {score * 15} base{score >= 4 ? " + 25 insight bonus" : ""}
            </div>
          </div>

          <div className="mb-6">
            <ShareScore
              score={score}
              maxScore={rounds.length}
              modeName="Socratic"
            />
          </div>

          {/* Review */}
          <div className="space-y-3 text-left mb-8">
            {rounds.map((r, i) => {
              const correct =
                answers[i] === r.chain.strongestQuestionIndex;
              const strongestQ =
                r.chain.questions[r.chain.strongestQuestionIndex];
              return (
                <div
                  key={r.chain.id}
                  className={`p-3 rounded-lg border text-sm ${
                    correct
                      ? "border-green-800/50 bg-green-900/10"
                      : "border-red-800/50 bg-red-900/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{correct ? "✓" : "✗"}</span>
                    <span className="font-medium">
                      &ldquo;{r.chain.initialClaim}&rdquo;
                    </span>
                  </div>
                  <p className="text-dojo-muted text-xs">
                    Strongest: &ldquo;{strongestQ.question}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            Question Again
          </button>
        </div>
      </div>
    );
  }

  const selectedQuestion = answers[currentIndex];
  const isCorrect = selectedQuestion === current.chain.strongestQuestionIndex;
  const strongestQ =
    current.chain.questions[current.chain.strongestQuestionIndex];

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
            {currentIndex + 1} / {rounds.length}
          </div>
          <BeltBadge />
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (revealed ? 1 : 0)) / rounds.length) * 100}%`,
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
              Socratic Questioning
            </div>
            <div className="text-xs text-dojo-muted">
              {DIFFICULTY_LABELS[current.chain.difficulty]} ·{" "}
              {current.chain.tags.join(", ")}
            </div>
          </div>

          {/* Topic */}
          <div className="text-sm text-dojo-accent font-medium mb-2">
            {current.chain.topic}
          </div>

          {/* Thesis */}
          <div className="bg-dojo-card border border-dojo-border rounded-lg p-5 mb-4">
            <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
              Thesis
            </div>
            <div className="text-lg sm:text-xl font-semibold leading-relaxed text-dojo-text">
              &ldquo;{current.chain.initialClaim}&rdquo;
            </div>
          </div>

          {/* Context */}
          <p className="text-sm text-dojo-muted mb-6 leading-relaxed">
            {current.chain.context}
          </p>

          {/* Prompt */}
          <p className="text-base font-semibold text-dojo-accent mb-4">
            Which question most powerfully challenges this thesis?
          </p>

          {/* Question options */}
          <div className="grid grid-cols-1 gap-3">
            {current.chain.questions.map((q, idx) => {
              const isSelected = selectedQuestion === idx;
              const isStrongest =
                idx === current.chain.strongestQuestionIndex;

              let classes =
                "p-4 rounded-lg border text-left text-sm transition-all ";

              if (!revealed) {
                classes +=
                  "border-dojo-border bg-dojo-card hover:border-dojo-accent/60 hover:bg-dojo-accent/5 cursor-pointer";
              } else if (isStrongest) {
                classes +=
                  "border-green-600 bg-green-900/20 text-green-300";
              } else if (isSelected && !isStrongest) {
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
                  &ldquo;{q.question}&rdquo;
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {revealed && (
            <div className="mt-8 animate-fade-in space-y-4">
              <div
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? "border-green-800/50 bg-green-900/10"
                    : "border-red-800/50 bg-red-900/10"
                }`}
              >
                <div className="font-semibold mb-1">
                  {isCorrect ? "Correct! +15 XP" : "Not the strongest."}
                </div>
                <p className="text-sm text-dojo-muted">
                  {current.chain.strongestExplanation}
                </p>
              </div>

              {/* Expected insight */}
              <div className="p-4 rounded-lg border border-dojo-border bg-dojo-card">
                <div className="text-xs text-dojo-muted uppercase tracking-wider mb-2">
                  Expected Insight
                </div>
                <p className="text-sm text-dojo-text leading-relaxed">
                  {strongestQ.expectedInsight}
                </p>
              </div>

              {/* Follow-up question */}
              <div className="p-4 rounded-lg border border-dojo-accent/30 bg-dojo-accent/5">
                <div className="text-xs text-dojo-accent uppercase tracking-wider mb-2">
                  Follow-up Question
                </div>
                <p className="text-sm text-dojo-text leading-relaxed italic">
                  &ldquo;{strongestQ.followUp}&rdquo;
                </p>
              </div>

              <button
                onClick={handleNext}
                className="mt-2 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                {currentIndex < rounds.length - 1
                  ? "Next Thesis"
                  : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
