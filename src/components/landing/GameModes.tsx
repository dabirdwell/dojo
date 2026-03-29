const gameModes = [
  {
    name: "Fallacy Flash",
    icon: "⚡",
    href: "/play/fallacy-flash",
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
    href: "/play/steelman",
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
    href: "/play/source-check",
    description:
      "Evaluate claims paired with citations for reliability. Learn the evidence hierarchy from meta-analyses down to anonymous social media posts.",
    features: [
      "Source reliability scoring",
      "Claim-source alignment checks",
      "Missing context identification",
    ],
  },
  {
    name: "Argument Map",
    icon: "🗺️",
    href: "/play/argument-map",
    description:
      "Visually decompose arguments into claims, premises, and evidence — then draw the connections. The single highest-impact critical thinking technique (0.70 SD gain).",
    features: [
      "SVG argument tree builds as you play",
      "Identify claims, premises, evidence & assumptions",
      "AI-scored at Green belt and above",
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
    name: "Daily Challenge",
    icon: "📅",
    href: "/play/daily",
    description:
      "Same 5-question fallacy challenge for everyone, every day. Compete on score and speed, then come back tomorrow for a fresh set.",
    features: [
      "New challenge every 24 hours",
      "Same questions for all players",
      "Score + time tracking",
    ],
  },
  {
    name: "Daily Brief",
    icon: "📰",
    href: "/play/daily-brief",
    description:
      "Daily challenge: three news summaries — one has a logical error, one is missing context, one is solid. Identify which is which and explain why.",
    features: [
      "New challenge every day",
      "Streak tracking",
      "Pre-built scenarios — no API needed",
    ],
  },
  {
    name: "Socratic",
    icon: "🏛",
    href: "/play/socratic",
    description:
      "Examine common beliefs through Socratic questioning. Read a thesis, then identify which of four probing questions most powerfully challenges the claim.",
    features: [
      "5 chains across meritocracy, tech, democracy, speech & tradition",
      "Reveals hidden assumptions and uncomfortable conclusions",
      "Expected insights and follow-up questions after each round",
    ],
  },
  {
    name: "Civic Check",
    icon: "📋",
    href: "/play/civic-check",
    description:
      "Read real policy proposal summaries and identify what a bill actually does — versus what it claims, how it's commonly misread, or what its opponents say.",
    features: [
      "15 scenarios across housing, education, tech, health & energy",
      "Fictionalized bills based on real legislative patterns",
      "Builds policy literacy and close-reading skills",
    ],
  },
  {
    name: "Real World",
    icon: "🌍",
    href: "/play/real-world",
    description:
      "Practice with real-world scenarios: spot fallacies in political claims, evaluate media sources, and steelman controversial positions. Mixed-format rounds keep you sharp.",
    features: [
      "30 scenarios across fallacy spotting, source evaluation & steelmanning",
      "Anonymized examples from AI policy, climate, healthcare & economics",
      "Score tracking with streak counter",
    ],
  },
];

export default function GameModes() {
  return (
    <section id="game-modes" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Ten Ways to Train
        </h2>
        <p className="text-dojo-muted text-center mb-16 max-w-xl mx-auto">
          Each mode targets a different critical thinking skill. Together, they
          build a complete reasoning toolkit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameModes.map((mode) => {
            const content = (
              <>
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
              </>
            );

            const classes =
              "bg-dojo-card border border-dojo-border rounded-xl p-6 hover:border-dojo-accent/40 transition-colors";

            return mode.href ? (
              <a key={mode.name} href={mode.href} className={classes + " block"}>
                {content}
              </a>
            ) : (
              <div key={mode.name} className={classes}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
