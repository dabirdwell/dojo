"use client";

import { useEffect } from "react";
import { type Belt } from "@/data/belts";

interface Props {
  newBelt: Belt;
  onDismiss: () => void;
}

export default function BeltUpCelebration({ newBelt, onDismiss }: Props) {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const beltColor =
    newBelt.name === "Black Belt" ? "#f0e6d6" : newBelt.color;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
      onClick={onDismiss}
    >
      {/* Radial glow behind the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${newBelt.color}15 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative bg-dojo-card border border-dojo-border rounded-2xl p-10 text-center max-w-sm mx-4 belt-celebrate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated belt icon */}
        <div className="text-7xl mb-5 belt-icon-pulse">🥋</div>

        <h2
          className="text-3xl font-bold mb-1"
          style={{ color: beltColor }}
        >
          {newBelt.name} Earned!
        </h2>
        <p className="text-sm text-dojo-muted mb-6">{newBelt.label}</p>

        {/* Belt glow ring */}
        <div
          className="w-24 h-24 rounded-full border-4 mx-auto mb-6 belt-ring-glow"
          style={{
            borderColor: newBelt.color,
            backgroundColor: `${newBelt.color}15`,
            boxShadow: `0 0 60px ${newBelt.color}40, 0 0 120px ${newBelt.color}20`,
          }}
        />

        <p className="text-sm text-dojo-muted mb-6">
          Your dedication is paying off. Keep training!
        </p>

        <button
          onClick={onDismiss}
          className="px-6 py-2.5 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
