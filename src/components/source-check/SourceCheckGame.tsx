"use client";

import { useState, useCallback, useMemo } from "react";
import { sourceScenarios, type SourceScenario } from "@/data/source-scenarios";

interface FeedbackItem {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
}

interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  feedbackItems: FeedbackItem[];
  scenarioCategory: string;
  idealCredibility: number;
}

interface RoundResult {
  scenario: SourceScenario;
  credibilityRating: number;
  evaluation: EvaluationResult;
}

function getRandomScenarios(count: number): SourceScenario[] {
  const pool = [...sourceScenarios];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

const credibilityLabels = [
  "",
  "Not credible",
  "Mostly unreliable",
  "Mixed / Unclear",
  "Mostly credible",
  "Highly credible",
];

export default function SourceCheckGame() {
  const [scenarios] = useState(() => getRandomScenarios(8));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [credibilityRating, setCredibilityRating] = useState(0);
  const [biasText, setBiasText] = useState("");
  const [checkText, setCheckText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<EvaluationResult | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [finished, setFinished] = useState(false);

  const current = scenarios[currentIndex];

  const handleSubmit = useCallback(async () => {
    if (credibilityRating === 0 || !biasText.trim() || !checkText.trim()) return;
    setEvaluating(true);

    try {
      const res = await fetch("/api/evaluate-source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: current.id,
          credibilityRating,
          biasIdentification: biasText,
          checkSuggestion: checkText,
        }),
      });

      const evaluation: EvaluationResult = await res.json();
      setCurrentFeedback(evaluation);
      setResults((prev) => [
        ...prev,
        { scenario: current, credibilityRating, evaluation },
      ]);
    } catch {
      setCurrentFeedback({
        totalScore: 0,
        maxScore: 100,
        feedbackItems: [
          { category: "Error", score: 0, maxScore: 100, feedback: "Failed to evaluate. Please try again." },
        ],
        scenarioCategory: "Unknown",
        idealCredibility: 0,
      });
    } finally {
      setEvaluating(false);
    }
  }, [current, credibilityRating, biasText, checkText]);

  const handleNext = useCallback(() => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setCredibilityRating(0);
      setBiasText("");
      setCheckText("");
      setCurrentFeedback(null);
    } else {
      setFinished(true);
    }
  }, [currentIndex, scenarios.length]);

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const totalXP = useMemo(
    () =>
      results.reduce((sum, r) => {
        const pct = r.evaluation.totalScore / r.evaluation.maxScore;
        return sum + Math.round(pct * 15);
      }, 0),
    [results]
  );

  // --- RESULTS SCREEN ---
  if (finished) {
    const totalScore = results.reduce((s, r) => s + r.evaluation.totalScore, 0);
    const totalMax = results.reduce((s, r) => s + r.evaluation.maxScore, 0);
    const pct = Math.round((totalScore / totalMax) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="text-6xl mb-6">
            {pct >= 80 ? "🔍" : pct >= 50 ? "📰" : "📖"}
          </div>
          <h2 className="text-3xl font-bold mb-2">Session Complete</h2>
          <p className="text-dojo-muted mb-2">
            {totalScore}/{totalMax} points ({pct}%)
          </p>

          <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-dojo-accent mb-1">
              +{totalXP} XP
            </div>
            <div className="text-sm text-dojo-muted">
              Source analysis mastery
            </div>
          </div>

          {/* Review */}
          <div className="space-y-4 text-left mb-8">
            {results.map((r, i) => {
              const rpct = Math.round(
                (r.evaluation.totalScore / r.evaluation.maxScore) * 100
              );
              return (
                <div
                  key={i}
                  className={`p-4 rounded-lg border text-sm ${
                    rpct >= 70
                      ? "border-green-800/50 bg-green-900/10"
                      : rpct >= 40
                        ? "border-yellow-800/50 bg-yellow-900/10"
                        : "border-red-800/50 bg-red-900/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-dojo-text truncate mr-2">
                      {r.scenario.headline.length > 50
                        ? r.scenario.headline.slice(0, 50) + "..."
                        : r.scenario.headline}
                    </span>
                    <span className="text-xs text-dojo-muted whitespace-nowrap">
                      {r.evaluation.totalScore}/{r.evaluation.maxScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-dojo-muted">
                    <span className="px-2 py-0.5 rounded bg-dojo-surface border border-dojo-border">
                      {r.evaluation.scenarioCategory}
                    </span>
                    <span>
                      You rated: {r.credibilityRating}/5 — Ideal:{" "}
                      {r.evaluation.idealCredibility}/5
                    </span>
                  </div>
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

  // --- GAME SCREEN ---
  const canSubmit =
    credibilityRating > 0 && biasText.trim().length > 0 && checkText.trim().length > 0;

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
            {currentIndex + 1} / {scenarios.length}
          </div>
          <div className="text-sm font-mono text-dojo-accent">Source Check</div>
        </div>
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (currentFeedback ? 1 : 0)) / scenarios.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-6 py-8 sm:py-12">
        <div className="max-w-2xl w-full">
          <div className="text-xs text-dojo-muted uppercase tracking-wider mb-3">
            Evaluate This Source
          </div>

          {/* Headline card */}
          <div className="bg-dojo-card border border-dojo-border rounded-xl p-5 sm:p-6 mb-8">
            <div className="text-xs text-dojo-muted mb-2">{current.source}</div>
            <h2 className="text-lg sm:text-xl font-bold text-dojo-text leading-snug mb-3">
              {current.headline}
            </h2>
            <p className="text-sm text-dojo-muted leading-relaxed">
              {current.snippet}
            </p>
          </div>

          {!currentFeedback ? (
            <>
              {/* 1. Credibility Rating */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dojo-text mb-3">
                  1. Rate Credibility (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setCredibilityRating(n)}
                      className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${
                        credibilityRating === n
                          ? "border-dojo-accent bg-dojo-accent/20 text-dojo-accent"
                          : "border-dojo-border bg-dojo-card hover:border-dojo-accent/40 text-dojo-muted"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {credibilityRating > 0 && (
                  <div className="text-xs text-dojo-muted mt-2">
                    {credibilityLabels[credibilityRating]}
                  </div>
                )}
              </div>

              {/* 2. Bias Identification */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dojo-text mb-2">
                  2. Identify Potential Bias
                </label>
                <p className="text-xs text-dojo-muted mb-2">
                  What bias, manipulation, or credibility issues do you see?
                </p>
                <textarea
                  value={biasText}
                  onChange={(e) => setBiasText(e.target.value)}
                  placeholder="e.g., The headline uses sensational language to provoke fear..."
                  rows={3}
                  className="w-full px-4 py-3 bg-dojo-surface border border-dojo-border rounded-lg text-sm text-dojo-text placeholder-dojo-muted/50 focus:outline-none focus:border-dojo-accent/60 resize-none"
                />
              </div>

              {/* 3. What to Check */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-dojo-text mb-2">
                  3. What Would You Check?
                </label>
                <p className="text-xs text-dojo-muted mb-2">
                  How would you verify or debunk this claim?
                </p>
                <textarea
                  value={checkText}
                  onChange={(e) => setCheckText(e.target.value)}
                  placeholder="e.g., I would search for the original study on PubMed and check..."
                  rows={3}
                  className="w-full px-4 py-3 bg-dojo-surface border border-dojo-border rounded-lg text-sm text-dojo-text placeholder-dojo-muted/50 focus:outline-none focus:border-dojo-accent/60 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit || evaluating}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  canSubmit && !evaluating
                    ? "bg-dojo-accent hover:bg-dojo-accent-hover text-white"
                    : "bg-dojo-card text-dojo-muted/50 border border-dojo-border cursor-not-allowed"
                }`}
              >
                {evaluating ? "Evaluating..." : "Submit Analysis"}
              </button>
            </>
          ) : (
            /* Feedback */
            <div className="animate-fade-in">
              {/* Score summary */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-dojo-accent">
                  {currentFeedback.totalScore}/{currentFeedback.maxScore}
                </div>
                <div>
                  <div className="text-sm font-semibold text-dojo-text">
                    {currentFeedback.scenarioCategory}
                  </div>
                  <div className="text-xs text-dojo-muted">
                    Ideal credibility: {currentFeedback.idealCredibility}/5 — You
                    rated: {credibilityRating}/5
                  </div>
                </div>
              </div>

              {/* Feedback items */}
              <div className="space-y-3 mb-8">
                {currentFeedback.feedbackItems.map((item, i) => {
                  const pct = item.score / item.maxScore;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border text-sm ${
                        pct >= 0.7
                          ? "border-green-800/50 bg-green-900/10"
                          : pct >= 0.4
                            ? "border-yellow-800/50 bg-yellow-900/10"
                            : "border-red-800/50 bg-red-900/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-dojo-text">
                          {item.category}
                        </span>
                        <span className="text-xs text-dojo-muted">
                          {item.score}/{item.maxScore}
                        </span>
                      </div>
                      <p className="text-dojo-muted text-xs leading-relaxed">
                        {item.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
              >
                {currentIndex < scenarios.length - 1
                  ? "Next Headline"
                  : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
