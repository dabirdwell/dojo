"use client";

import { useState } from "react";

interface Props {
  score: number;
  maxScore: number;
  modeName: string;
}

export default function ShareScore({ score, maxScore, modeName }: Props) {
  const [copied, setCopied] = useState(false);

  const pct = Math.round((score / maxScore) * 100);
  const text = `I scored ${pct}% on Dojo ${modeName}! 🥋 Train your mind at dojo.humanityandai.com`;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard also failed — do nothing
    }
  }

  return (
    <button
      onClick={handleShare}
      className="px-6 py-2.5 border border-dojo-border hover:border-dojo-accent/60 text-dojo-muted hover:text-dojo-text rounded-lg font-medium transition-colors text-sm flex items-center gap-2 mx-auto"
    >
      {copied ? (
        <>
          <span>✓</span> Copied!
        </>
      ) : (
        <>
          <span>📤</span> Share Your Score
        </>
      )}
    </button>
  );
}
