"use client";

import { type Belt } from "@/data/belts";

interface Props {
  newBelt: Belt;
  onDismiss: () => void;
}

export default function BeltUpCelebration({ newBelt, onDismiss }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in"
      onClick={onDismiss}
    >
      <div
        className="bg-dojo-card border border-dojo-border rounded-2xl p-8 text-center max-w-sm mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🥋</div>
        <h2
          className="text-2xl font-bold mb-1"
          style={{
            color:
              newBelt.name === "Black Belt" ? "#f0e6d6" : newBelt.color,
          }}
        >
          {newBelt.name} Earned!
        </h2>
        <p className="text-sm text-dojo-muted mb-5">{newBelt.label}</p>

        <div
          className="w-20 h-20 rounded-full border-4 mx-auto mb-5"
          style={{
            borderColor: newBelt.color,
            backgroundColor: `${newBelt.color}20`,
            boxShadow: `0 0 40px ${newBelt.color}50`,
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
