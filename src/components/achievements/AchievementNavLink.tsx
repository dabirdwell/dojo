"use client";

import { useState, useEffect } from "react";
import { getUnlockedCount } from "@/lib/achievements";

export default function AchievementNavLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getUnlockedCount());
    const handler = () => setCount(getUnlockedCount());
    window.addEventListener("dojo-progress-updated", handler);
    return () => window.removeEventListener("dojo-progress-updated", handler);
  }, []);

  return (
    <a
      href="/achievements"
      className="flex items-center gap-1.5 text-sm text-dojo-muted hover:text-dojo-text transition-colors"
    >
      <span>Achievements</span>
      {count > 0 && (
        <span className="bg-dojo-accent text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </a>
  );
}
