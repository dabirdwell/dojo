"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurriculumBelt } from "@/data/belts";
import { type BeltTestScenario } from "@/data/belt-test-scenarios";
import { loadProgress, awardXP } from "@/lib/progress";
import {
  canTakeTest,
  recordTestAttempt,
  getEffectiveBelt,
} from "@/lib/belt-test";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltCeremony from "@/components/belt-test/BeltCeremony";

type Phase = "loading" | "not-eligible" | "intro" | "testing" | "results" | "ceremony";

interface AnswerState {
  selected: string | null;
  revealed: boolean;
}

export default function BeltTestGame() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [eligibility, setEligibility] = useState<ReturnType<typeof canTakeTest> | null>(null);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scenarios, setScenarios] = useState<BeltTestScenario[]>([]);
  const [xp, setXP] = useState(0);

  useEffect(() => {
    const progress = loadProgress();
    setXP(progress.totalXP);
    const result = canTakeTest(progress.totalXP);
    setEligibility(result);

    if (result.eligible && result.testDef) {
      // Shuffle scenarios for each test attempt
      const shuffled = [...result.testDef.scenarios].sort(() => Math.random() - 0.5);
      setScenarios(shuffled);
      setAnswers(shuffled.map(() => ({ selected: null, revealed: false })));
      setPhase("intro");
    } else {
      setPhase("not-eligible");
    }
  }, []);

  const score = answers.filter(
    (a, i) => a.selected === scenarios[i]?.correctAnswer
  ).length;

  const handleSelect = useCallback(
    (option: string) => {
      setAnswers((prev) => {
        const next = [...prev];
        if (!next[currentIdx].revealed) {
          next[currentIdx] = { selected: option, revealed: true };
        }
        return next;
      });
    },
    [currentIdx]
  );

  const handleNext = useCallback(() => {
    if (currentIdx < scenarios.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      // Test complete — record attempt
      const testLevel = eligibility!.testLevel!;
      const passed = recordTestAttempt(testLevel, score, scenarios.length);

      if (passed) {
        // Award XP
        awardXP("belt-test", 50, score, scenarios.length);
        setPhase("ceremony");
      } else {
        setPhase("results");
      }
    }
  }, [currentIdx, scenarios.length, eligibility, score]);

  // --- Renders ---

  if (phase === "loading") return null;

  if (phase === "not-eligible" && eligibility) {
    const effectiveBelt = getEffectiveBelt(xp);
    const beltColor =
      effectiveBelt.name === "Black Belt" ? "#f0e6d6" : effectiveBelt.color;

    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              &larr; Back
            </Link>
            <span className="text-sm font-medium text-dojo-text">
              Belt Test
            </span>
            <BeltBadge />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div
              className="w-20 h-20 rounded-full border-4 mx-auto mb-6 flex items-center justify-center"
              style={{
                borderColor: effectiveBelt.color,
                backgroundColor: `${effectiveBelt.color}15`,
              }}
            >
              <span className="text-2xl font-bold" style={{ color: beltColor }}>
                {xp}
              </span>
            </div>

            <h1 className="text-xl font-bold text-dojo-text mb-3">
              {eligibility.cooldownUntil
                ? "Cooldown Active"
                : "No Test Available"}
            </h1>

            <p className="text-sm text-dojo-muted mb-6">
              {eligibility.reason}
            </p>

            {eligibility.cooldownUntil && (
              <CooldownTimer until={eligibility.cooldownUntil} />
            )}

            <Link
              href="/profile"
              className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-dojo-card border border-dojo-border text-sm text-dojo-text hover:bg-dojo-surface transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "intro" && eligibility?.testDef) {
    const testDef = eligibility.testDef;
    const currBelt = getCurriculumBelt(testDef.level);
    const beltColor =
      currBelt.level === "black" ? "#f0e6d6" : currBelt.color;

    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link
              href="/profile"
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              &larr; Back
            </Link>
            <span className="text-sm font-medium text-dojo-text">
              Belt Test
            </span>
            <BeltBadge />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-lg text-center animate-fade-in">
            {/* Belt badge */}
            <div
              className="w-16 h-3 rounded-full mx-auto mb-6"
              style={{
                backgroundColor: currBelt.color,
                boxShadow: `0 0 20px ${currBelt.color}50`,
              }}
            />

            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: beltColor }}
            >
              {testDef.name}
            </h1>
            <p className="text-sm text-dojo-muted mb-8">
              {testDef.description}
            </p>

            {/* Test info */}
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8 text-left">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dojo-muted">Questions</span>
                  <span className="text-dojo-text font-medium">
                    {testDef.scenarios.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dojo-muted">Passing Score</span>
                  <span className="text-dojo-text font-medium">
                    {Math.round(testDef.passingScore * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dojo-muted">Format</span>
                  <span className="text-dojo-text font-medium capitalize">
                    {testDef.format.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dojo-muted">Retry Cooldown</span>
                  <span className="text-dojo-text font-medium">24 hours</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-dojo-border">
                <p className="text-xs text-dojo-muted mb-2">
                  Fallacies tested:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currBelt.fallacies.map((f) => (
                    <span
                      key={f.id}
                      className="text-xs px-2 py-1 rounded-md bg-dojo-surface text-dojo-text"
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-dojo-muted mb-6">
              These scenarios are harder than daily practice. Read carefully.
            </p>

            <button
              onClick={() => setPhase("testing")}
              className="px-8 py-3 rounded-xl bg-dojo-accent hover:bg-dojo-accent-hover text-white font-semibold text-sm transition-colors"
            >
              Begin Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "testing" && scenarios.length > 0) {
    const scenario = scenarios[currentIdx];
    const answer = answers[currentIdx];
    const isCorrect = answer.selected === scenario.correctAnswer;

    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <span className="text-sm text-dojo-muted">
              Question {currentIdx + 1} of {scenarios.length}
            </span>
            <span className="text-sm font-medium text-dojo-text">
              Belt Test
            </span>
            <span className="text-sm text-dojo-muted tabular-nums">
              {answers.filter((a, i) => a.revealed && a.selected === scenarios[i].correctAnswer).length}
              /{answers.filter((a) => a.revealed).length} correct
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-dojo-surface">
          <div
            className="h-full bg-dojo-accent transition-all duration-300"
            style={{
              width: `${((currentIdx + (answer.revealed ? 1 : 0)) / scenarios.length) * 100}%`,
            }}
          />
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Passage */}
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-6">
              <p className="text-xs uppercase tracking-wider text-dojo-muted mb-3">
                Identify the fallacy
              </p>
              <p className="text-dojo-text leading-relaxed text-[15px]">
                {scenario.passage}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {scenario.options.map((option) => {
                let optionClass =
                  "border-dojo-border bg-dojo-card hover:border-dojo-muted cursor-pointer";

                if (answer.revealed) {
                  if (option === scenario.correctAnswer) {
                    optionClass =
                      "border-green-500/50 bg-green-500/10 text-green-400";
                  } else if (option === answer.selected) {
                    optionClass =
                      "border-red-500/50 bg-red-500/10 text-red-400";
                  } else {
                    optionClass =
                      "border-dojo-border/40 bg-dojo-card/50 text-dojo-muted/50";
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => !answer.revealed && handleSelect(option)}
                    disabled={answer.revealed}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm transition-all ${optionClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Explanation (after answer) */}
            {answer.revealed && (
              <div className="animate-fade-in">
                <div
                  className={`rounded-xl p-5 mb-6 border ${
                    isCorrect
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold mb-2 ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? "Correct!" : `Incorrect — ${scenario.correctAnswer}`}
                  </p>
                  <p className="text-sm text-dojo-muted leading-relaxed">
                    {scenario.explanation}
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-dojo-accent hover:bg-dojo-accent-hover text-white font-semibold text-sm transition-colors"
                  >
                    {currentIdx < scenarios.length - 1
                      ? "Next Question"
                      : "See Results"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const passed = score / scenarios.length >= (eligibility?.testDef?.passingScore ?? 0.8);
    const needed = Math.ceil(
      (eligibility?.testDef?.passingScore ?? 0.8) * scenarios.length
    );

    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              &larr; Home
            </Link>
            <span className="text-sm font-medium text-dojo-text">
              Test Results
            </span>
            <BeltBadge />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md text-center animate-fade-in">
            <div
              className={`text-6xl font-bold mb-3 ${
                passed ? "text-green-400" : "text-red-400"
              }`}
            >
              {score}/{scenarios.length}
            </div>

            <h2
              className={`text-xl font-bold mb-2 ${
                passed ? "text-green-400" : "text-red-400"
              }`}
            >
              {passed ? "Test Passed!" : "Not Yet"}
            </h2>

            <p className="text-sm text-dojo-muted mb-8">
              {passed
                ? "Congratulations! You've demonstrated mastery."
                : `You needed ${needed} correct. You can retry after 24 hours.`}
            </p>

            {/* Question review */}
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 mb-6 text-left">
              <p className="text-xs uppercase tracking-wider text-dojo-muted mb-3">
                Review
              </p>
              <div className="space-y-2">
                {scenarios.map((s, i) => {
                  const correct = answers[i].selected === s.correctAnswer;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={`flex-shrink-0 w-5 text-center ${
                          correct ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {correct ? "\u2713" : "\u2717"}
                      </span>
                      <span className="text-dojo-muted flex-1 truncate">
                        {s.correctAnswer}
                      </span>
                      {!correct && (
                        <span className="text-xs text-red-400/70">
                          chose: {answers[i].selected}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Link
                href="/profile"
                className="px-6 py-2.5 rounded-lg bg-dojo-card border border-dojo-border text-sm text-dojo-text hover:bg-dojo-surface transition-colors"
              >
                View Profile
              </Link>
              <Link
                href="/play/fallacy-flash"
                className="px-6 py-2.5 rounded-lg bg-dojo-accent hover:bg-dojo-accent-hover text-white text-sm font-semibold transition-colors"
              >
                Practice More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "ceremony" && eligibility?.testLevel) {
    const effectiveBelt = getEffectiveBelt(xp + 50); // post-XP award
    const prevBelt = getEffectiveBelt(xp); // pre-test belt

    return (
      <BeltCeremony
        fromBelt={prevBelt}
        toBelt={effectiveBelt}
        score={score}
        totalQuestions={scenarios.length}
        onContinue={() => router.push("/profile")}
      />
    );
  }

  return null;
}

function CooldownTimer({ until }: { until: string }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    function update() {
      const diff = new Date(until).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining("Ready to retry!");
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setRemaining(`${hours}h ${mins}m remaining`);
    }
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [until]);

  return (
    <p className="text-sm text-amber-400 font-medium">{remaining}</p>
  );
}
