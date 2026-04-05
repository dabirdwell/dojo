"use client";

import { useState, useEffect } from "react";
import { type Belt } from "@/data/belts";

interface Props {
  fromBelt: Belt;
  toBelt: Belt;
  score: number;
  totalQuestions: number;
  onContinue: () => void;
}

function ShieldIcon({ color, size = 120 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        fill={`${color}30`}
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

export default function BeltCeremony({
  fromBelt,
  toBelt,
  score,
  totalQuestions,
  onContinue,
}: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1800),
      setTimeout(() => setStage(4), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const beltColor =
    toBelt.name === "Black Belt" ? "#f0e6d6" : toBelt.color;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${toBelt.color}15 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      {stage >= 1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="ceremony-particle absolute rounded-full"
              style={{
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                backgroundColor: toBelt.color,
                opacity: 0.3 + Math.random() * 0.4,
                left: `${10 + Math.random() * 80}%`,
                bottom: "-10px",
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative text-center max-w-md mx-4">
        {/* Outer ring */}
        {stage >= 0 && (
          <div className="flex justify-center mb-6">
            <div
              className="ceremony-ring-expand rounded-full flex items-center justify-center"
              style={{
                width: 180,
                height: 180,
                border: `3px solid ${toBelt.color}40`,
                boxShadow: `0 0 60px ${toBelt.color}20, 0 0 120px ${toBelt.color}10`,
              }}
            >
              {/* Inner ring */}
              <div
                className="ceremony-ring-expand rounded-full flex items-center justify-center"
                style={{
                  width: 150,
                  height: 150,
                  border: `2px solid ${toBelt.color}30`,
                  animationDelay: "0.2s",
                }}
              >
                {/* Shield icon */}
                <div
                  className="belt-scale-glow"
                  style={{
                    filter: `drop-shadow(0 0 30px ${toBelt.color}80)`,
                  }}
                >
                  <ShieldIcon color={beltColor} size={96} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        {stage >= 1 && (
          <div className="ceremony-text-reveal mb-2">
            <p className="text-sm uppercase tracking-[0.3em] text-dojo-muted mb-3">
              Belt Ceremony
            </p>
            <h2
              className="text-4xl font-bold mb-1"
              style={{ color: beltColor }}
            >
              {toBelt.name}
            </h2>
            <p className="text-dojo-muted">{toBelt.label}</p>
          </div>
        )}

        {/* Score */}
        {stage >= 2 && (
          <div className="ceremony-text-reveal my-6">
            <div className="inline-flex items-center gap-3 bg-dojo-card/80 border border-dojo-border rounded-xl px-6 py-3">
              <span className="text-2xl font-bold text-green-400">
                {score}/{totalQuestions}
              </span>
              <span className="text-sm text-dojo-muted">
                passed
              </span>
            </div>
          </div>
        )}

        {/* Transition text */}
        {stage >= 3 && (
          <div className="ceremony-text-reveal mb-8">
            <p className="text-sm text-dojo-muted">
              <span style={{ color: fromBelt.color }}>{fromBelt.name}</span>
              {" "}&#8594;{" "}
              <span style={{ color: beltColor }}>{toBelt.name}</span>
            </p>
            <p className="text-xs text-dojo-muted mt-2">
              New fallacies are now unlocked. Keep training!
            </p>
          </div>
        )}

        {/* Continue button */}
        {stage >= 4 && (
          <div className="ceremony-text-reveal">
            <button
              onClick={onContinue}
              className="px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
              style={{
                backgroundColor: toBelt.color,
                color:
                  toBelt.name === "Yellow Belt" || toBelt.name === "White Belt"
                    ? "#1a1210"
                    : "#fff",
              }}
            >
              Continue to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
