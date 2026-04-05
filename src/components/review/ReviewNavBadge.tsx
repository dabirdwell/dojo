"use client";

import { useState, useEffect } from "react";
import { getDueCount } from "@/lib/spaced-repetition";

export default function ReviewNavBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getDueCount());
    const handler = () => setCount(getDueCount());
    window.addEventListener("dojo-progress-updated", handler);
    return () => window.removeEventListener("dojo-progress-updated", handler);
  }, []);

  return (
    <a
      href="/review"
      className="flex items-center gap-1.5 text-xs font-medium text-dojo-muted hover:text-dojo-text transition-colors"
    >
      <span>Review</span>
      {count > 0 && (
        <span className="bg-amber-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </a>
  );
}
