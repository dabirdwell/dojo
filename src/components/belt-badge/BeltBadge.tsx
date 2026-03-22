"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBeltForXP, getProgressToNextBelt } from "@/data/belts";
import { loadProgress } from "@/lib/progress";

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
  const progress = getProgressToNextBelt(xp);

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      title="View Profile"
    >
      <div
        className="w-6 h-6 rounded-full border-2 flex-shrink-0"
        style={{
          borderColor: belt.color,
          backgroundColor: `${belt.color}20`,
          boxShadow: `0 0 6px ${belt.color}40`,
        }}
      />
      <div className="hidden sm:flex flex-col">
        <span className="text-xs font-medium" style={{ color: belt.color }}>
          {belt.name}
        </span>
        <div className="w-16 h-1 bg-dojo-card rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: belt.color,
            }}
          />
        </div>
      </div>
    </Link>
  );
}
