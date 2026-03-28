"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBeltForXP, getNextBelt, getProgressToNextBelt } from "@/data/belts";
import { loadProgress } from "@/lib/progress";

function ShieldIcon({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="28"
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
      <circle cx="12" cy="11" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

export default function BeltBadge() {
  const [xp, setXP] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const progress = loadProgress();
    setXP(progress.totalXP);
  }, []);

  if (!mounted) return null;

  const belt = getBeltForXP(xp);
  const nextBelt = getNextBelt(xp);
  const progress = getProgressToNextBelt(xp);
  const beltColor = belt.name === "Black Belt" ? "#f0e6d6" : belt.color;

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group"
      title="View Profile"
    >
      <div
        className="relative flex-shrink-0 rounded-full p-0.5"
        style={{
          boxShadow: `0 0 10px ${belt.color}50, 0 0 20px ${belt.color}20`,
        }}
      >
        <ShieldIcon color={beltColor} />
      </div>
      <div className="hidden sm:flex flex-col gap-0.5">
        <span className="text-xs font-semibold leading-none" style={{ color: beltColor }}>
          {belt.name}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-20 h-1.5 bg-dojo-card rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: belt.color,
                boxShadow: `0 0 4px ${belt.color}60`,
              }}
            />
          </div>
          <span className="text-[10px] text-dojo-muted">
            {nextBelt ? `${xp}/${nextBelt.minXP}` : `${xp} XP`}
          </span>
        </div>
      </div>
    </Link>
  );
}
