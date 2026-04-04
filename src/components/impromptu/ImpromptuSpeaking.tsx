"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ImpromptuTopic,
  getRandomTopic,
  CATEGORY_LABELS,
} from "@/data/impromptu-topics";
import { awardXP } from "@/lib/progress";
import { type Belt } from "@/data/belts";

type Phase = "setup" | "prep" | "speaking" | "assessment" | "results";

interface SelfRating {
  clarity: number;
  structure: number;
  confidence: number;
  persuasiveness: number;
}

interface SpeechResult {
  topic: ImpromptuTopic;
  duration: 60 | 90;
  selfRating: SelfRating;
  xpEarned: number;
  date: string;
  hasRecording: boolean;
}

interface AIFeedback {
  rhetoricalDevices: { name: string; explanation: string }[];
  logicalStructure: string;
  suggestions: string[];
  overallScore: number;
}

const PREP_SECONDS = 30;

export default function ImpromptuSpeaking() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [topic, setTopic] = useState<ImpromptuTopic>(() => getRandomTopic());
  const [duration, setDuration] = useState<60 | 90>(60);
  const [timeLeft, setTimeLeft] = useState(PREP_SECONDS);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [selfRating, setSelfRating] = useState<SelfRating>({
    clarity: 3,
    structure: 3,
    confidence: 3,
    persuasiveness: 3,
  });
  const [result, setResult] = useState<SpeechResult | null>(null);
  const [earnedBelt, setEarnedBelt] = useState<Belt | null>(null);
  const [transcript, setTranscript] = useState("");
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [recentTopicIds, setRecentTopicIds] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = useCallback(
    (seconds: number, onComplete: () => void) => {
      setTimeLeft(seconds);
      if (timerRef.current) clearInterval(timerRef.current);
      const start = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - start) / 1000);
        const remaining = seconds - elapsed;
        if (remaining <= 0) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setTimeLeft(0);
          onComplete();
        } else {
          setTimeLeft(remaining);
        }
      }, 250);
    },
    []
  );

  const startPrep = () => {
    setPhase("prep");
    startTimer(PREP_SECONDS, () => {
      setPhase("speaking");
      startTimer(duration, finishSpeaking);
    });
  };

  const finishSpeaking = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopRecording();
    setPhase("assessment");
  }, []);

  // Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      // User denied mic or not supported — just continue without recording
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  };

  const submitAssessment = () => {
    const xp = duration === 90 ? 15 : 10;
    const xpResult = awardXP("impromptu", xp, 1, 1);
    if (xpResult.beltChanged && xpResult.newBelt) {
      setEarnedBelt(xpResult.newBelt);
    }

    const speechResult: SpeechResult = {
      topic,
      duration,
      selfRating,
      xpEarned: xp,
      date: new Date().toISOString(),
      hasRecording: !!audioURL,
    };
    setResult(speechResult);

    // Save to localStorage history
    try {
      const key = "dojo-impromptu-history";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(speechResult);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {}

    setPhase("results");
  };

  const requestFeedback = async () => {
    if (!transcript.trim()) return;
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const res = await fetch("/api/evaluate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: transcript.trim(),
          topic: topic.title,
          bullets: topic.bullets,
        }),
      });
      if (!res.ok) throw new Error("Failed to get feedback");
      const data: AIFeedback = await res.json();
      setAiFeedback(data);
    } catch {
      setFeedbackError("Could not get AI feedback. Please try again.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const newRound = () => {
    const updated = [...recentTopicIds, topic.id].slice(-5);
    setRecentTopicIds(updated);
    setTopic(getRandomTopic(updated));
    setPhase("setup");
    setTimeLeft(PREP_SECONDS);
    setAudioURL(null);
    setSelfRating({ clarity: 3, structure: 3, confidence: 3, persuasiveness: 3 });
    setResult(null);
    setEarnedBelt(null);
    setTranscript("");
    setAiFeedback(null);
    setFeedbackError(null);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const timerPercent =
    phase === "prep"
      ? ((PREP_SECONDS - timeLeft) / PREP_SECONDS) * 100
      : phase === "speaking"
        ? ((duration - timeLeft) / duration) * 100
        : 0;

  return (
    <div className="min-h-screen bg-dojo-bg text-dojo-text">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-dojo-bg/80 backdrop-blur-md border-b border-dojo-border/50">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <a
            href="/"
            className="text-sm font-bold text-dojo-text tracking-wide hover:text-dojo-accent transition-colors"
          >
            Dojo
          </a>
          <span className="text-xs text-dojo-muted">Impromptu Speaking</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">🎤</div>
          <h1 className="text-3xl font-bold mb-2">Impromptu Speaking</h1>
          <p className="text-dojo-muted text-sm">
            Draw a topic. 30 seconds to prepare. Then speak.
          </p>
        </div>

        {/* === SETUP PHASE === */}
        {phase === "setup" && (
          <div className="space-y-6">
            {/* Topic card */}
            <TopicCard topic={topic} />

            {/* Duration choice */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDuration(60)}
                className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                  duration === 60
                    ? "border-dojo-accent bg-dojo-accent/10 text-dojo-accent"
                    : "border-dojo-border text-dojo-muted hover:border-dojo-accent/40"
                }`}
              >
                60 seconds
              </button>
              <button
                onClick={() => setDuration(90)}
                className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                  duration === 90
                    ? "border-dojo-accent bg-dojo-accent/10 text-dojo-accent"
                    : "border-dojo-border text-dojo-muted hover:border-dojo-accent/40"
                }`}
              >
                90 seconds
                <span className="block text-xs text-dojo-muted mt-0.5">
                  +5 bonus XP
                </span>
              </button>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  const updated = [...recentTopicIds, topic.id].slice(-5);
                  setRecentTopicIds(updated);
                  setTopic(getRandomTopic(updated));
                }}
                className="px-4 py-2 text-sm rounded-lg border border-dojo-border text-dojo-muted hover:border-dojo-accent/40 hover:text-dojo-text transition-colors"
              >
                Shuffle topic
              </button>
              <button
                onClick={startPrep}
                className="px-8 py-3 bg-dojo-accent text-white rounded-lg font-semibold hover:bg-dojo-accent-hover transition-colors"
              >
                Start Prep Timer
              </button>
            </div>
          </div>
        )}

        {/* === PREP PHASE === */}
        {phase === "prep" && (
          <div className="space-y-6">
            <TopicCard topic={topic} />
            <TimerDisplay
              label="PREP TIME"
              timeLeft={timeLeft}
              percent={timerPercent}
              color="text-yellow-400"
              formatTime={formatTime}
            />
            <p className="text-center text-dojo-muted text-sm">
              Organize your thoughts. Speaking starts automatically.
            </p>
          </div>
        )}

        {/* === SPEAKING PHASE === */}
        {phase === "speaking" && (
          <div className="space-y-6">
            <TopicCard topic={topic} compact />
            <TimerDisplay
              label="SPEAKING"
              timeLeft={timeLeft}
              percent={timerPercent}
              color={timeLeft <= 10 ? "text-red-400" : "text-green-400"}
              formatTime={formatTime}
            />

            <div className="flex justify-center gap-3">
              {!isRecording && !audioURL && (
                <button
                  onClick={startRecording}
                  className="px-4 py-2 text-sm rounded-lg border border-dojo-border text-dojo-muted hover:border-red-400/40 hover:text-red-400 transition-colors"
                >
                  Record audio
                </button>
              )}
              {isRecording && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  Recording...
                </div>
              )}
              <button
                onClick={finishSpeaking}
                className="px-6 py-2 bg-dojo-accent text-white rounded-lg font-semibold hover:bg-dojo-accent-hover transition-colors"
              >
                I&apos;m done
              </button>
            </div>
          </div>
        )}

        {/* === ASSESSMENT PHASE === */}
        {phase === "assessment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center">Self-Assessment</h2>
            <p className="text-dojo-muted text-sm text-center">
              Rate your performance honestly — self-awareness is a skill too.
            </p>

            {audioURL && (
              <div className="bg-dojo-card border border-dojo-border rounded-lg p-4">
                <p className="text-xs text-dojo-muted mb-2">Your recording:</p>
                <audio src={audioURL} controls className="w-full" />
              </div>
            )}

            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 space-y-5">
              {(
                ["clarity", "structure", "confidence", "persuasiveness"] as const
              ).map((dim) => (
                <RatingRow
                  key={dim}
                  label={dim.charAt(0).toUpperCase() + dim.slice(1)}
                  value={selfRating[dim]}
                  onChange={(v) =>
                    setSelfRating((prev) => ({ ...prev, [dim]: v }))
                  }
                />
              ))}
            </div>

            <button
              onClick={submitAssessment}
              className="w-full py-3 bg-dojo-accent text-white rounded-lg font-semibold hover:bg-dojo-accent-hover transition-colors"
            >
              Submit Assessment
            </button>
          </div>
        )}

        {/* === RESULTS PHASE === */}
        {phase === "results" && result && (
          <div className="space-y-6">
            {earnedBelt && (
              <div className="bg-dojo-card border border-dojo-accent/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-bold text-lg">Belt Promotion!</p>
                <p className="text-dojo-muted text-sm">
                  You earned{" "}
                  <span
                    className="font-semibold"
                    style={{ color: earnedBelt.color }}
                  >
                    {earnedBelt.name}
                  </span>
                </p>
              </div>
            )}

            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 text-center">
              <p className="text-dojo-accent text-3xl font-bold">
                +{result.xpEarned} XP
              </p>
              <p className="text-dojo-muted text-sm mt-1">
                {result.duration}s speech on &ldquo;{result.topic.title}&rdquo;
              </p>
            </div>

            {/* Self-ratings summary */}
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6">
              <h3 className="font-semibold mb-3">Your Self-Rating</h3>
              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(result.selfRating) as [string, number][]).map(
                  ([k, v]) => (
                    <div key={k} className="text-center">
                      <p className="text-2xl font-bold text-dojo-text">{v}/5</p>
                      <p className="text-xs text-dojo-muted capitalize">{k}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Transcript + AI feedback */}
            <div className="bg-dojo-card border border-dojo-border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold">
                Want AI feedback?{" "}
                <span className="text-xs text-dojo-muted font-normal">
                  (optional)
                </span>
              </h3>
              <p className="text-dojo-muted text-xs">
                Type or paste what you said and get feedback on rhetorical
                devices, logical structure, and suggestions.
              </p>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your speech transcript here..."
                rows={5}
                className="w-full bg-dojo-bg border border-dojo-border rounded-lg p-3 text-sm text-dojo-text placeholder-dojo-muted/50 focus:outline-none focus:border-dojo-accent/50 resize-y"
              />
              <button
                onClick={requestFeedback}
                disabled={!transcript.trim() || feedbackLoading}
                className="px-6 py-2 bg-dojo-accent text-white rounded-lg font-medium hover:bg-dojo-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {feedbackLoading ? "Analyzing..." : "Get AI Feedback"}
              </button>
              {feedbackError && (
                <p className="text-red-400 text-sm">{feedbackError}</p>
              )}
            </div>

            {/* AI Feedback display */}
            {aiFeedback && (
              <div className="bg-dojo-card border border-dojo-accent/30 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  AI Feedback
                  <span className="text-xs text-dojo-muted font-normal">
                    Score: {aiFeedback.overallScore}/10
                  </span>
                </h3>

                {aiFeedback.rhetoricalDevices.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-dojo-muted mb-2">
                      Rhetorical Devices Detected
                    </h4>
                    <ul className="space-y-2">
                      {aiFeedback.rhetoricalDevices.map((d, i) => (
                        <li
                          key={i}
                          className="text-sm bg-dojo-bg rounded-lg p-3"
                        >
                          <span className="font-medium text-dojo-accent">
                            {d.name}
                          </span>
                          <span className="text-dojo-muted">
                            {" "}
                            &mdash; {d.explanation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-dojo-muted mb-2">
                    Logical Structure
                  </h4>
                  <p className="text-sm text-dojo-text/90 bg-dojo-bg rounded-lg p-3">
                    {aiFeedback.logicalStructure}
                  </p>
                </div>

                {aiFeedback.suggestions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-dojo-muted mb-2">
                      Suggestions for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {aiFeedback.suggestions.map((s, i) => (
                        <li
                          key={i}
                          className="text-sm text-dojo-text/90 flex items-start gap-2"
                        >
                          <span className="text-dojo-accent mt-0.5">
                            &#x25B8;
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <button
                onClick={newRound}
                className="px-8 py-3 bg-dojo-accent text-white rounded-lg font-semibold hover:bg-dojo-accent-hover transition-colors"
              >
                New Topic
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-lg border border-dojo-border text-dojo-muted hover:text-dojo-text hover:border-dojo-accent/40 transition-colors"
              >
                Back to Dojo
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Sub-components ---

function TopicCard({
  topic,
  compact,
}: {
  topic: ImpromptuTopic;
  compact?: boolean;
}) {
  return (
    <div className="bg-dojo-card border border-dojo-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${
            topic.category === "foundation"
              ? "border-blue-400/30 text-blue-400"
              : topic.category === "current-events"
                ? "border-green-400/30 text-green-400"
                : topic.category === "abstract"
                  ? "border-purple-400/30 text-purple-400"
                  : "border-orange-400/30 text-orange-400"
          }`}
        >
          {CATEGORY_LABELS[topic.category]}
        </span>
        <span className="text-xs text-dojo-muted">
          {"★".repeat(topic.difficulty)}
          {"☆".repeat(3 - topic.difficulty)}
        </span>
      </div>
      <h2 className={`font-bold mb-3 ${compact ? "text-lg" : "text-xl"}`}>
        {topic.title}
      </h2>
      <ul className="space-y-2">
        {topic.bullets.map((b, i) => (
          <li
            key={i}
            className="text-sm text-dojo-muted flex items-start gap-2"
          >
            <span className="text-dojo-accent mt-0.5">&#x25B8;</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimerDisplay({
  label,
  timeLeft,
  percent,
  color,
  formatTime,
}: {
  label: string;
  timeLeft: number;
  percent: number;
  color: string;
  formatTime: (s: number) => string;
}) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-bold tracking-widest text-dojo-muted uppercase">
        {label}
      </p>
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-dojo-border"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${color} transition-all duration-300`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-4xl font-mono font-bold ${color}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
}

function RatingRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-dojo-muted">{value}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
              n <= value
                ? "bg-dojo-accent/20 border-dojo-accent/50 text-dojo-accent"
                : "bg-dojo-bg border-dojo-border text-dojo-muted hover:border-dojo-accent/30"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
