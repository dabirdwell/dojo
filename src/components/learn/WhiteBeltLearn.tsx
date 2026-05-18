"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { fallacies, type Fallacy, type FallacyExample } from "@/data/fallacies";

type Stage = "teach" | "quiz";

interface Lesson {
  fallacy: Fallacy;
  example: FallacyExample;
}

const WHITE_BELT_FALLACY_IDS = [
  "ad_hominem",
  "straw_man",
  "appeal_to_authority",
  "appeal_to_emotion",
  "false_dilemma",
  "slippery_slope",
];

function buildLessons(): Lesson[] {
  return WHITE_BELT_FALLACY_IDS.map((id) => {
    const fallacy = fallacies.find((f) => f.id === id)!;
    return { fallacy, example: fallacy.examples[0] };
  });
}

export default function WhiteBeltLearn() {
  const lessons = useMemo(buildLessons, []);
  const total = lessons.length;

  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("teach");
  const [answers, setAnswers] = useState<(string | null)[]>(() =>
    new Array(total).fill(null)
  );
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = lessons[index];

  const score = useMemo(
    () =>
      lessons.reduce(
        (acc, l, i) =>
          answers[i] === l.example.correctAnswer ? acc + 1 : acc,
        0
      ),
    [lessons, answers]
  );

  // Progress: 2 substeps per lesson (teach, quiz). Quiz unrevealed counts as half.
  const stepsCompleted =
    index * 2 + (stage === "quiz" ? 1 : 0) + (revealed ? 1 : 0);
  const totalSteps = total * 2;
  const progress = (stepsCompleted / totalSteps) * 100;

  const handleStartQuiz = useCallback(() => {
    setStage("quiz");
    setRevealed(false);
  }, []);

  const handleAnswer = useCallback(
    (option: string) => {
      if (revealed) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = option;
        return next;
      });
      setRevealed(true);
    },
    [index, revealed]
  );

  const handleNext = useCallback(() => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setStage("teach");
      setRevealed(false);
    } else {
      setFinished(true);
    }
  }, [index, total]);

  if (finished) {
    return <EndScreen score={score} total={total} />;
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-dojo-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/learn"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            ← Lessons
          </Link>
          <div className="text-sm text-dojo-muted">
            <span className="text-dojo-text font-semibold">{index + 1}</span> /{" "}
            {total}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#E8E8E8" }}
            />
            <span className="text-xs text-dojo-muted tracking-wide">
              White Belt
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-6 py-10">
        <div className="max-w-2xl w-full">
          {stage === "teach" && (
            <TeachCard
              key={`teach-${index}`}
              fallacy={current.fallacy}
              onContinue={handleStartQuiz}
            />
          )}
          {stage === "quiz" && (
            <QuizCard
              key={`quiz-${index}`}
              fallacy={current.fallacy}
              example={current.example}
              selected={answers[index]}
              revealed={revealed}
              onAnswer={handleAnswer}
              onNext={handleNext}
              isLast={index === total - 1}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function TeachCard({
  fallacy,
  onContinue,
}: {
  fallacy: Fallacy;
  onContinue: () => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
        Lesson
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-dojo-text tracking-tight mb-2">
        {fallacy.name}
      </h2>
      {fallacy.mnemonic && (
        <p className="text-base text-dojo-accent italic mb-8">
          &ldquo;{fallacy.mnemonic}&rdquo;
        </p>
      )}

      {fallacy.plainExplanation && (
        <div className="mb-8">
          <p className="text-lg leading-relaxed text-dojo-text">
            {fallacy.plainExplanation}
          </p>
        </div>
      )}

      {fallacy.realWorldExample && (
        <div className="mb-8 p-5 rounded-xl border border-dojo-border bg-dojo-card/60">
          <div className="text-[10px] uppercase tracking-wider text-dojo-muted mb-2">
            In the wild
          </div>
          <blockquote className="text-dojo-text border-l-2 border-dojo-accent/60 pl-4 mb-3 italic">
            {fallacy.realWorldExample.quote}
          </blockquote>
          <p className="text-sm text-dojo-muted mb-2">
            {fallacy.realWorldExample.context}
          </p>
          <p className="text-sm text-dojo-muted/90">
            <span className="text-dojo-text font-medium">Why it works: </span>
            {fallacy.realWorldExample.whyItWorks}
          </p>
        </div>
      )}

      {fallacy.spotIt && (
        <div className="mb-10 p-5 rounded-xl border border-dojo-accent/30 bg-dojo-accent/5">
          <div className="text-[10px] uppercase tracking-wider text-dojo-accent mb-2 font-semibold">
            The test
          </div>
          <p className="text-dojo-text leading-relaxed">{fallacy.spotIt}</p>
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full py-3.5 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
      >
        Try spotting it →
      </button>
    </div>
  );
}

function QuizCard({
  fallacy,
  example,
  selected,
  revealed,
  onAnswer,
  onNext,
  isLast,
}: {
  fallacy: Fallacy;
  example: FallacyExample;
  selected: string | null;
  revealed: boolean;
  onAnswer: (option: string) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const isCorrect = selected === example.correctAnswer;

  return (
    <div className="animate-fade-in">
      <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
        Your turn — spot the {fallacy.name}
      </div>

      <blockquote className="text-lg sm:text-xl leading-relaxed text-dojo-text border-l-2 border-dojo-accent pl-5 mb-10">
        {example.argument}
      </blockquote>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {example.options.map((option) => {
          const isSelected = selected === option;
          const isAnswer = option === example.correctAnswer;

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
              onClick={() => onAnswer(option)}
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
              {isCorrect ? "Got it." : "Not quite — that's the trick at work."}
            </div>
            <p className="text-sm text-dojo-muted">{example.explanation}</p>
          </div>

          <button
            onClick={onNext}
            className="mt-6 w-full py-3.5 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            {isLast ? "Finish lesson" : "Next fallacy →"}
          </button>
        </div>
      )}
    </div>
  );
}

function EndScreen({ score, total }: { score: number; total: number }) {
  const allCorrect = score === total;
  const headline = allCorrect
    ? "Clean sweep."
    : score >= total - 1
      ? "Almost perfect."
      : score >= total / 2
        ? "Good start."
        : "Worth another pass.";

  const subhead = allCorrect
    ? "You spotted every trick. Time to try them under pressure."
    : score >= total / 2
      ? "You're seeing the patterns. Practice will lock them in."
      : "These take repetition. Run a round of Fallacy Flash and they'll stick.";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="text-6xl mb-6">{allCorrect ? "🥋" : "📖"}</div>
        <h2 className="text-3xl font-bold text-dojo-text mb-2">{headline}</h2>
        <p className="text-dojo-muted mb-8">{subhead}</p>

        <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8">
          <div className="text-4xl font-bold text-dojo-accent mb-1">
            {score} / {total}
          </div>
          <div className="text-sm text-dojo-muted">spotted on first try</div>
        </div>

        <div className="space-y-3">
          <Link
            href="/play/fallacy-flash"
            className="block w-full py-3.5 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            Practice in Fallacy Flash →
          </Link>
          <Link
            href="/learn"
            className="block w-full py-3 border border-dojo-border text-dojo-muted hover:text-dojo-text hover:border-dojo-accent/40 rounded-lg font-medium transition-colors"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    </main>
  );
}
