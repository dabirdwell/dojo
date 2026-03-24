"use client";

import { useState, useCallback } from "react";
import {
  steelmanScenarios,
  categoryLabels,
  type SteelManScenario,
} from "@/data/steelman-scenarios";
import { type Belt } from "@/data/belts";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";

type GamePhase = "select" | "write" | "evaluating" | "result";

interface Evaluation {
  charity: number;
  strength: number;
  concerns: number;
  feedback: string;
}

const difficultyLabel: Record<1 | 2 | 3, { text: string; color: string }> = {
  1: { text: "Beginner", color: "text-green-400 border-green-400/30" },
  2: { text: "Intermediate", color: "text-yellow-400 border-yellow-400/30" },
  3: { text: "Advanced", color: "text-red-400 border-red-400/30" },
};

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ScoreBar({ label, score, max = 5 }: { label: string; score: number; max?: number }) {
  const pct = (score / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-dojo-muted">{label}</span>
        <span className="font-mono font-semibold">{score}/{max}</span>
      </div>
      <div className="h-2 bg-dojo-card rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor:
              pct >= 80 ? "#4CAF50" : pct >= 50 ? "#F5D442" : "#c0392b",
          }}
        />
      </div>
    </div>
  );
}

export default function SteelManGame() {
  const [phase, setPhase] = useState<GamePhase>("select");
  const [scenario, setScenario] = useState<SteelManScenario | null>(null);
  const [userText, setUserText] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [sessionScores, setSessionScores] = useState<Evaluation[]>([]);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);

  const handleSelectScenario = useCallback((s: SteelManScenario) => {
    setScenario(s);
    setUserText("");
    setEvaluation(null);
    setError(null);
    setShowHints(false);
    setPhase("write");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!scenario || userText.trim().length < 50) return;

    setPhase("evaluating");
    setError(null);

    try {
      const res = await fetch("/api/evaluate-steelman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: scenario.position,
          userResponse: userText.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Evaluation failed");
      }

      const data: Evaluation = await res.json();
      setEvaluation(data);
      setCompletedIds((prev) => new Set(prev).add(scenario.id));
      setSessionScores((prev) => [...prev, data]);
      const total = data.charity + data.strength + data.concerns;
      const xp = 40 + (total >= 12 ? 20 : 0);
      const goodEval = total >= 9 ? 1 : 0;
      const result = awardXP("steelman", xp, goodEval, 1);
      if (result.beltChanged && result.newBelt) {
        setEarnedBelt(result.newBelt);
      }
      setPhase("result");
    } catch {
      setError("Could not evaluate your response. Please try again.");
      setPhase("write");
    }
  }, [scenario, userText]);

  const handleBack = useCallback(() => {
    setPhase("select");
    setScenario(null);
    setUserText("");
    setEvaluation(null);
    setError(null);
    setShowHints(false);
  }, []);

  const handleTryAnother = useCallback(() => {
    // Pick a random uncompleted scenario
    const remaining = steelmanScenarios.filter((s) => !completedIds.has(s.id));
    if (remaining.length === 0) {
      handleBack();
      return;
    }
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    handleSelectScenario(next);
  }, [completedIds, handleBack, handleSelectScenario]);

  // --- Selection screen ---
  if (phase === "select") {
    const grouped = {
      politics: steelmanScenarios.filter((s) => s.category === "politics"),
      "tech-ethics": steelmanScenarios.filter((s) => s.category === "tech-ethics"),
      social: steelmanScenarios.filter((s) => s.category === "social"),
    };

    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <a
              href="/"
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              &larr; Back
            </a>
            <BeltBadge />
          </div>
        </div>

        <div className="flex-1 px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-4xl mb-4">🛡</div>
              <h1 className="text-3xl font-bold mb-3">Steel Man Training</h1>
              <p className="text-dojo-muted max-w-lg mx-auto">
                Choose a position and construct the strongest possible argument
                for it — even if you disagree. This is the most important skill
                for honest discourse.
              </p>
              {sessionScores.length > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-dojo-card rounded-lg border border-dojo-border text-sm">
                  <span className="text-dojo-muted">Session:</span>
                  <span className="font-mono font-semibold text-dojo-accent">
                    {sessionScores.length} completed
                  </span>
                  <span className="text-dojo-muted">&middot;</span>
                  <span className="font-mono">
                    avg{" "}
                    {(
                      sessionScores.reduce(
                        (a, s) => a + s.charity + s.strength + s.concerns,
                        0
                      ) /
                      sessionScores.length /
                      3
                    ).toFixed(1)}
                    /5
                  </span>
                </div>
              )}
            </div>

            {(
              Object.entries(grouped) as [SteelManScenario["category"], SteelManScenario[]][]
            ).map(([cat, scenarios]) => (
              <div key={cat} className="mb-10">
                <h2 className="text-xs uppercase tracking-wider text-dojo-muted mb-4">
                  {categoryLabels[cat]}
                </h2>
                <div className="space-y-3">
                  {shuffleArray(scenarios).map((s) => {
                    const done = completedIds.has(s.id);
                    const diff = difficultyLabel[s.difficulty];
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleSelectScenario(s)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          done
                            ? "border-green-800/40 bg-green-900/5 hover:border-green-700/60"
                            : "border-dojo-border bg-dojo-card hover:border-dojo-accent/50 hover:bg-dojo-accent/5"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-dojo-text">
                              &ldquo;{s.position}&rdquo;
                            </p>
                            <p className="text-xs text-dojo-muted mt-1">
                              {s.context}
                            </p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${diff.color}`}>
                                {diff.text}
                              </span>
                              {s.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs text-dojo-muted/60 px-1.5 py-0.5 rounded bg-dojo-surface"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          {done && (
                            <span className="text-green-500 text-sm shrink-0">
                              &#10003;
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Writing screen ---
  if (phase === "write" || phase === "evaluating") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-4 border-b border-dojo-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              &larr; Scenarios
            </button>
            <BeltBadge />
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-dojo-muted uppercase tracking-wider">
                Construct the strongest argument for this position
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded border ${difficultyLabel[scenario!.difficulty].color}`}>
                {difficultyLabel[scenario!.difficulty].text}
              </span>
            </div>

            <blockquote className="text-lg sm:text-xl leading-relaxed text-dojo-text border-l-2 border-dojo-accent pl-5 mb-6">
              {scenario!.position}
            </blockquote>

            <p className="text-sm text-dojo-muted mb-6">{scenario!.context}</p>

            {/* Hints toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs text-dojo-accent hover:text-dojo-accent-hover transition-colors"
              >
                {showHints ? "Hide hints \u25B2" : "Show hints \u25BC"}
              </button>
              {showHints && (
                <ul className="mt-3 space-y-2 animate-fade-in">
                  {scenario!.hints.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs text-dojo-muted/80 flex items-start gap-2"
                    >
                      <span className="text-dojo-accent mt-0.5">&#x25B8;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Text area */}
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              disabled={phase === "evaluating"}
              placeholder="Write the strongest possible version of this argument. Be charitable — represent the position as its best proponents would. Aim for at least a few sentences."
              className="w-full h-48 sm:h-56 p-4 bg-dojo-card border border-dojo-border rounded-lg text-dojo-text placeholder:text-dojo-muted/40 resize-none focus:outline-none focus:border-dojo-accent/60 transition-colors disabled:opacity-50"
            />

            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-xs ${
                  userText.trim().length < 50
                    ? "text-dojo-muted/50"
                    : "text-dojo-muted"
                }`}
              >
                {userText.trim().length} characters
                {userText.trim().length < 50 && " (min 50)"}
              </span>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg border border-red-800/50 bg-red-900/10 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={phase === "evaluating" || userText.trim().length < 50}
              className="mt-6 w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
              {phase === "evaluating" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Evaluating...
                </span>
              ) : (
                "Submit for Evaluation"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Result screen ---
  if (phase === "result" && evaluation) {
    const total = evaluation.charity + evaluation.strength + evaluation.concerns;
    const xp = 40 + (total >= 12 ? 20 : 0);

    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        {earnedBelt && (
          <BeltUpCelebration newBelt={earnedBelt} onDismiss={() => setEarnedBelt(null)} />
        )}
        <div className="max-w-md w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {total >= 13 ? "🥋" : total >= 9 ? "🛡" : "📖"}
            </div>
            <h2 className="text-3xl font-bold mb-2">Evaluation Complete</h2>
            <p className="text-dojo-muted">
              {total}/15 total score
            </p>
          </div>

          {/* XP */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 mb-6 text-center">
            <div className="text-3xl font-bold text-dojo-accent mb-1">
              +{xp} XP
            </div>
            <div className="text-sm text-dojo-muted">
              40 base{total >= 12 ? " + 20 quality bonus" : ""}
            </div>
          </div>

          {/* Score breakdown */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 mb-6 space-y-4">
            <ScoreBar label="Charity of Interpretation" score={evaluation.charity} />
            <ScoreBar label="Logical Strength" score={evaluation.strength} />
            <ScoreBar label="Addressing Real Concerns" score={evaluation.concerns} />
          </div>

          {/* Feedback */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 mb-8">
            <div className="text-xs uppercase tracking-wider text-dojo-muted mb-2">
              Feedback
            </div>
            <p className="text-sm text-dojo-text leading-relaxed">
              {evaluation.feedback}
            </p>
          </div>

          {/* Your response (collapsed) */}
          <details className="mb-8">
            <summary className="text-xs text-dojo-muted cursor-pointer hover:text-dojo-text transition-colors">
              View your response
            </summary>
            <div className="mt-3 p-4 bg-dojo-card border border-dojo-border rounded-lg text-sm text-dojo-muted leading-relaxed">
              {userText}
            </div>
          </details>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleTryAnother}
              className="flex-1 py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              Try Another
            </button>
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-dojo-card hover:bg-dojo-surface border border-dojo-border text-dojo-text rounded-lg font-semibold transition-colors"
            >
              All Scenarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
