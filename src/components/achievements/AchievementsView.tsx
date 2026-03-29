"use client";

import { useState, useEffect } from "react";
import { achievements } from "@/data/achievements";
import {
  loadAchievementStore,
  type AchievementStore,
} from "@/lib/achievements";
import BeltBadge from "@/components/belt-badge/BeltBadge";

export default function AchievementsView() {
  const [store, setStore] = useState<AchievementStore | null>(null);

  useEffect(() => {
    setStore(loadAchievementStore());
  }, []);

  if (!store) return null;

  const unlockedCount = Object.keys(store.unlocked).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-dojo-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-dojo-muted hover:text-dojo-text text-sm transition-colors"
          >
            &larr; Back
          </a>
          <BeltBadge />
        </div>
      </div>

      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Achievements</h1>
          <p className="text-dojo-muted mb-4">
            {unlockedCount} / {achievements.length} unlocked
          </p>

          {/* Progress bar */}
          <div className="h-2 bg-dojo-card rounded-full overflow-hidden mb-10">
            <div
              className="h-full bg-dojo-accent rounded-full transition-all duration-500"
              style={{
                width: `${(unlockedCount / achievements.length) * 100}%`,
              }}
            />
          </div>

          {/* Achievement grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((a) => {
              const unlockedAt = store.unlocked[a.id];
              return (
                <div
                  key={a.id}
                  className={`p-5 rounded-xl border transition-all ${
                    unlockedAt
                      ? "bg-dojo-card border-dojo-accent/30"
                      : "bg-dojo-surface border-dojo-border opacity-50 grayscale"
                  }`}
                >
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <h3 className="font-bold text-dojo-text mb-1">{a.title}</h3>
                  <p className="text-xs text-dojo-muted mb-2">
                    {a.description}
                  </p>
                  {unlockedAt ? (
                    <p className="text-xs text-dojo-accent">
                      Unlocked{" "}
                      {new Date(unlockedAt).toLocaleDateString()}
                    </p>
                  ) : (
                    <p className="text-xs text-dojo-muted/50">Locked</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
