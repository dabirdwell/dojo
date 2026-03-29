"use client";

import { useState, useEffect, useRef } from "react";
import { type Achievement } from "@/data/achievements";
import { checkAndUnlockAchievements } from "@/lib/achievements";

export default function AchievementToast() {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [current, setCurrent] = useState<Achievement | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Listen for progress updates and check achievements
  useEffect(() => {
    const handler = () => {
      const newly = checkAndUnlockAchievements();
      if (newly.length > 0) {
        setQueue((prev) => [...prev, ...newly]);
      }
    };
    window.addEventListener("dojo-progress-updated", handler);
    handler();
    return () => window.removeEventListener("dojo-progress-updated", handler);
  }, []);

  // Process queue — show one toast at a time
  useEffect(() => {
    if (queue.length > 0 && !current) {
      const [next, ...rest] = queue;
      setQueue(rest);
      setCurrent(next);
      setVisible(true);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        timeoutRef.current = setTimeout(() => setCurrent(null), 400);
      }, 3000);
    }
  }, [queue, current]);

  if (!current) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-[60] flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto ${
          visible ? "toast-enter" : "toast-exit"
        }`}
      >
        <div className="bg-dojo-card border border-dojo-accent/40 rounded-xl px-6 py-4 flex items-center gap-4 shadow-lg shadow-dojo-accent/10">
          <span className="text-3xl">{current.icon}</span>
          <div>
            <div className="text-xs text-dojo-accent font-semibold uppercase tracking-wider">
              Achievement Unlocked
            </div>
            <div className="text-dojo-text font-bold">{current.title}</div>
            <div className="text-dojo-muted text-xs">
              {current.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
