const gameModes = [
  {
    name: "Fallacy Flash",
    icon: "⚡",
    description:
      "Rapid fallacy identification — the core drill. Read a short argument, spot the logical error. Progresses from multiple choice to free-text identification as you advance.",
    features: [
      "Spaced repetition scheduling",
      "Timed challenges at higher belts",
      "AI-evaluated free-text at Brown+",
    ],
  },
  {
    name: "Steel Man",
    icon: "🛡",
    description:
      "Construct the strongest version of an argument you disagree with. The single most important skill for democratic discourse.",
    features: [
      "AI-scored on charity, evidence & steelmanning",
      "Real-world policy positions",
      "Constructive feedback on every attempt",
    ],
  },
  {
    name: "Source Check",
    icon: "🔍",
    description:
      "Evaluate claims paired with citations for reliability. Learn the evidence hierarchy from meta-analyses down to anonymous social media posts.",
    features: [
      "Source reliability scoring",
      "Claim-source alignment checks",
      "Missing context identification",
    ],
  },
  {
    name: "Debate Dojo",
    icon: "🥊",
    description:
      "Live argument practice against an AI opponent scored on logic, not rhetoric. The signature mode — the reason people tell their friends.",
    features: [
      "Structured exchange format",
      "AI uses fallacies you must spot",
      "Post-debate scorecard for both sides",
    ],
  },
  {
    name: "Daily Brief",
    icon: "📰",
    description:
      "Apply critical thinking to current events. Curated daily summaries where you identify claims, evaluate sources, and spot fallacies in real-world reporting.",
    features: [
      "1-3 curated items daily",
      "Bipartisan source selection",
      "Human-verified accuracy",
    ],
  },
];

export default function GameModes() {
  return (
    <section id="game-modes" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Five Ways to Train
        </h2>
        <p className="text-dojo-muted text-center mb-16 max-w-xl mx-auto">
          Each mode targets a different critical thinking skill. Together, they
          build a complete reasoning toolkit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameModes.map((mode) => (
            <div
              key={mode.name}
              className="bg-dojo-card border border-dojo-border rounded-xl p-6 hover:border-dojo-accent/40 transition-colors"
            >
              <div className="text-3xl mb-4">{mode.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-dojo-text">
                {mode.name}
              </h3>
              <p className="text-dojo-muted text-sm leading-relaxed mb-4">
                {mode.description}
              </p>
              <ul className="space-y-2">
                {mode.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-dojo-muted/80 flex items-start gap-2"
                  >
                    <span className="text-dojo-accent mt-0.5">&#x25B8;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
