"use client";

import { useEffect } from "react";
import { type Belt } from "@/data/belts";

interface Props {
  newBelt: Belt;
  onDismiss: () => void;
}

function ShieldIcon({ color, size = 80 }: { color: string; size?: number }) {
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

export default function BeltUpCelebration({ newBelt, onDismiss }: Props) {
  // Auto-dismiss after 2 seconds
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const beltColor =
    newBelt.name === "Black Belt" ? "#f0e6d6" : newBelt.color;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onDismiss}
    >
      {/* Radial glow behind the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${newBelt.color}20 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative bg-dojo-card border border-dojo-border rounded-2xl p-10 text-center max-w-sm mx-4 belt-celebrate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated shield icon with glow */}
        <div
          className="inline-block mb-5 belt-scale-glow"
          style={{
            filter: `drop-shadow(0 0 20px ${newBelt.color}80)`,
          }}
        >
          <ShieldIcon color={beltColor} size={96} />
        </div>

        <h2
          className="text-3xl font-bold mb-1"
          style={{ color: beltColor }}
        >
          {newBelt.name} Earned!
        </h2>
        <p className="text-sm text-dojo-muted mb-4">{newBelt.label}</p>

        {/* Glowing ring */}
        <div
          className="w-20 h-20 rounded-full border-4 mx-auto mb-4 belt-ring-glow"
          style={{
            borderColor: newBelt.color,
            backgroundColor: `${newBelt.color}15`,
            boxShadow: `0 0 40px ${newBelt.color}50, 0 0 80px ${newBelt.color}25`,
          }}
        />

        <p className="text-sm text-dojo-muted">
          Your dedication is paying off. Keep training!
        </p>
      </div>
    </div>
  );
}
