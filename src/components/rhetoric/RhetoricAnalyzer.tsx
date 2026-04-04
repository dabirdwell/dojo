"use client";

import { useState, useEffect } from "react";
import { rhetoricalExamples } from "@/data/rhetoric-examples";
import { awardXP } from "@/lib/progress";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import BeltUpCelebration from "@/components/belt-up/BeltUpCelebration";
import { type Belt } from "@/data/belts";

interface Annotation {
  quote: string;
  type: "device" | "fallacy" | "technique";
  name: string;
  explanation: string;
}

interface AnalysisResult {
  annotations: Annotation[];
  argumentStrength: number;
  strategySummary: string;
}

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  device: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
  },
  fallacy: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    badge: "bg-red-500/20 text-red-300",
  },
  technique: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300",
  },
};

const DAILY_LIMIT = 3;
const XP_PER_ANALYSIS = 5;
const STORAGE_KEY = "dojo-rhetoric-daily";

function getDailyUsage(): { count: number; date: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (data.date === today) return data;
    }
  } catch {}
  return { count: 0, date: new Date().toISOString().slice(0, 10) };
}

function incrementDailyUsage(): number {
  const usage = getDailyUsage();
  usage.count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  return usage.count;
}

export default function RhetoricAnalyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState<number | null>(null);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [beltUp, setBeltUp] = useState<Belt | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);

  useEffect(() => {
    setDailyUsage(getDailyUsage().count);
  }, []);

  const remainingAnalyses = Math.max(0, DAILY_LIMIT - dailyUsage);

  async function handleAnalyze() {
    if (!text.trim()) return;
    if (remainingAnalyses <= 0) {
      setError("Daily limit reached (3 analyses per day). Come back tomorrow!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setSelectedAnnotation(null);
    setXpAwarded(false);

    try {
      const res = await fetch("/api/analyze-rhetoric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const analysis: AnalysisResult = await res.json();
      setResult(analysis);

      const newCount = incrementDailyUsage();
      setDailyUsage(newCount);

      const xpResult = awardXP("rhetoric", XP_PER_ANALYSIS, 1, 1);
      setXpAwarded(true);
      if (xpResult.beltChanged && xpResult.newBelt) {
        setBeltUp(xpResult.newBelt);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  function loadExample(id: string) {
    const example = rhetoricalExamples.find((e) => e.id === id);
    if (example) {
      setText(example.text);
      setResult(null);
      setSelectedAnnotation(null);
      setXpAwarded(false);
    }
  }

  function getHighlightedText() {
    if (!result) return null;

    const annotations = result.annotations;
    // Find annotation positions in text
    const segments: { start: number; end: number; annotationIdx: number }[] = [];
    for (let i = 0; i < annotations.length; i++) {
      const idx = text.indexOf(annotations[i].quote);
      if (idx !== -1) {
        segments.push({ start: idx, end: idx + annotations[i].quote.length, annotationIdx: i });
      }
    }
    // Sort by start position
    segments.sort((a, b) => a.start - b.start);

    // Remove overlapping segments (keep first occurrence)
    const filtered: typeof segments = [];
    let lastEnd = 0;
    for (const seg of segments) {
      if (seg.start >= lastEnd) {
        filtered.push(seg);
        lastEnd = seg.end;
      }
    }

    // Build JSX
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    for (const seg of filtered) {
      if (seg.start > cursor) {
        parts.push(
          <span key={`t-${cursor}`}>{text.slice(cursor, seg.start)}</span>
        );
      }
      const ann = annotations[seg.annotationIdx];
      const colors = TYPE_COLORS[ann.type];
      const isSelected = selectedAnnotation === seg.annotationIdx;
      parts.push(
        <span
          key={`a-${seg.annotationIdx}`}
          className={`${colors.bg} ${isSelected ? colors.border + " border" : ""} rounded px-0.5 cursor-pointer hover:opacity-80 transition-opacity`}
          onClick={() => setSelectedAnnotation(seg.annotationIdx)}
          title={`${ann.name} (${ann.type})`}
        >
          {text.slice(seg.start, seg.end)}
        </span>
      );
      cursor = seg.end;
    }
    if (cursor < text.length) {
      parts.push(<span key={`t-${cursor}`}>{text.slice(cursor)}</span>);
    }

    return parts;
  }

  const strengthColor =
    result && result.argumentStrength >= 7
      ? "text-green-400"
      : result && result.argumentStrength >= 4
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="min-h-screen bg-dojo-bg text-dojo-text">
      {beltUp && (
        <BeltUpCelebration
          newBelt={beltUp}
          onDismiss={() => setBeltUp(null)}
        />
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-dojo-bg/90 backdrop-blur-md border-b border-dojo-border/50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
            >
              ← Back
            </a>
            <span className="text-sm font-semibold">Rhetoric Analyzer</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-dojo-muted">
              {remainingAnalyses} / {DAILY_LIMIT} analyses left today
            </span>
            <BeltBadge />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Pre-loaded examples */}
        <div className="mb-6">
          <p className="text-sm text-dojo-muted mb-3">
            Try a pre-loaded example or paste your own text:
          </p>
          <div className="flex flex-wrap gap-2">
            {rhetoricalExamples.map((ex) => (
              <button
                key={ex.id}
                onClick={() => loadExample(ex.id)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-dojo-border hover:border-dojo-accent/40 hover:text-dojo-accent transition-colors"
              >
                {ex.category}: {ex.title}
              </button>
            ))}
          </div>
        </div>

        {!result ? (
          /* Input view */
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste any text here — a speech, article, ad, social media post, or argument..."
              className="w-full h-64 bg-dojo-card border border-dojo-border rounded-xl p-4 text-sm leading-relaxed resize-y focus:outline-none focus:border-dojo-accent/50 placeholder:text-dojo-muted/50"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-dojo-muted">
                {text.length} / 10,000 characters
              </span>
              <button
                onClick={handleAnalyze}
                disabled={loading || !text.trim() || remainingAnalyses <= 0}
                className="px-6 py-2.5 bg-dojo-accent hover:bg-dojo-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold rounded-lg transition-colors"
              >
                {loading ? "Analyzing..." : "Analyze Rhetoric"}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </div>
        ) : (
          /* Results view */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Annotated text (2 cols) */}
            <div className="lg:col-span-2">
              <div className="bg-dojo-card border border-dojo-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Annotated Text</h2>
                  <div className="flex gap-3">
                    {(["device", "fallacy", "technique"] as const).map((type) => (
                      <span
                        key={type}
                        className={`text-xs px-2 py-1 rounded ${TYPE_COLORS[type].badge}`}
                      >
                        {type === "device"
                          ? "Rhetorical Device"
                          : type === "fallacy"
                            ? "Fallacy"
                            : "Persuasion"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {getHighlightedText()}
                </div>
              </div>

              {/* Selected annotation detail */}
              {selectedAnnotation !== null && result.annotations[selectedAnnotation] && (
                <div
                  className={`mt-4 border rounded-xl p-4 ${
                    TYPE_COLORS[result.annotations[selectedAnnotation].type].bg
                  } ${TYPE_COLORS[result.annotations[selectedAnnotation].type].border}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        TYPE_COLORS[result.annotations[selectedAnnotation].type].badge
                      }`}
                    >
                      {result.annotations[selectedAnnotation].type}
                    </span>
                    <span className="font-semibold text-sm">
                      {result.annotations[selectedAnnotation].name}
                    </span>
                  </div>
                  <p className="text-sm text-dojo-muted leading-relaxed">
                    {result.annotations[selectedAnnotation].explanation}
                  </p>
                </div>
              )}

              {xpAwarded && (
                <div className="mt-4 text-center text-xs text-dojo-accent">
                  +{XP_PER_ANALYSIS} XP earned
                </div>
              )}
            </div>

            {/* Sidebar summary */}
            <div className="space-y-4">
              {/* Argument strength */}
              <div className="bg-dojo-card border border-dojo-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3">Argument Strength</h3>
                <div className="flex items-end gap-2 mb-3">
                  <span className={`text-4xl font-bold ${strengthColor}`}>
                    {result.argumentStrength}
                  </span>
                  <span className="text-dojo-muted text-sm mb-1">/ 10</span>
                </div>
                <div className="w-full bg-dojo-border rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      result.argumentStrength >= 7
                        ? "bg-green-500"
                        : result.argumentStrength >= 4
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${result.argumentStrength * 10}%` }}
                  />
                </div>
              </div>

              {/* Strategy summary */}
              <div className="bg-dojo-card border border-dojo-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3">Strategy Summary</h3>
                <p className="text-sm text-dojo-muted leading-relaxed">
                  {result.strategySummary}
                </p>
              </div>

              {/* Findings breakdown */}
              <div className="bg-dojo-card border border-dojo-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3">Findings</h3>
                <div className="space-y-2">
                  {(["device", "fallacy", "technique"] as const).map((type) => {
                    const items = result.annotations.filter((a) => a.type === type);
                    if (items.length === 0) return null;
                    return (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${TYPE_COLORS[type].text}`}>
                            {type === "device"
                              ? "Rhetorical Devices"
                              : type === "fallacy"
                                ? "Fallacies"
                                : "Persuasion Techniques"}
                          </span>
                          <span className="text-xs text-dojo-muted">{items.length}</span>
                        </div>
                        <div className="space-y-1">
                          {items.map((item, i) => {
                            const globalIdx = result.annotations.indexOf(item);
                            return (
                              <button
                                key={i}
                                onClick={() => setSelectedAnnotation(globalIdx)}
                                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                                  selectedAnnotation === globalIdx
                                    ? `${TYPE_COLORS[type].bg} ${TYPE_COLORS[type].border}`
                                    : "border-transparent hover:border-dojo-border"
                                }`}
                              >
                                {item.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Analyze another */}
              <button
                onClick={() => {
                  setResult(null);
                  setText("");
                  setSelectedAnnotation(null);
                  setXpAwarded(false);
                }}
                className="w-full px-4 py-2.5 border border-dojo-border hover:border-dojo-accent/40 text-sm font-medium rounded-lg transition-colors"
              >
                Analyze Another Text
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
