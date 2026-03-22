const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Genuinely useful — not a teaser.",
    features: [
      "Fallacy Flash (multiple choice) — Unlimited",
      "Fallacy Flash (free-text) — 3/day",
      "Steel Man — 1/day",
      "Source Check — 2/day",
      "Debate Dojo — 1/day",
      "Daily Brief — Full access",
      "Belt advancement — Full access",
      "Streak tracking — Full access",
      "Debate history — Last 7 days",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    description: "Unlimited depth for serious thinkers.",
    features: [
      "Everything in Free, plus:",
      "Fallacy Flash (free-text) — Unlimited",
      "Steel Man — Unlimited",
      "Source Check — Unlimited",
      "Debate Dojo — Unlimited",
      "Full debate transcript history",
      "Advanced analytics dashboard",
      "Priority content updates",
    ],
    cta: "Go Pro",
    featured: true,
  },
];

export default function PricingTable() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Simple Pricing
        </h2>
        <p className="text-dojo-muted text-center mb-16 max-w-xl mx-auto">
          Free tier is genuinely useful. Pro unlocks volume and depth, not basic
          functionality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-8 border ${
                tier.featured
                  ? "border-dojo-accent bg-dojo-accent/5"
                  : "border-dojo-border bg-dojo-card"
              }`}
            >
              {tier.featured && (
                <div className="text-xs text-dojo-accent font-semibold uppercase tracking-wider mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-dojo-text mb-1">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-dojo-text">
                  {tier.price}
                </span>
                <span className="text-dojo-muted text-sm">{tier.period}</span>
              </div>
              <p className="text-sm text-dojo-muted mb-6">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-dojo-muted flex items-start gap-2"
                  >
                    <span className="text-dojo-accent mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  tier.featured
                    ? "bg-dojo-accent hover:bg-dojo-accent-hover text-white"
                    : "border border-dojo-border hover:border-dojo-muted text-dojo-text"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
