import { beltLevels } from "@/data/fallacies";

function ShieldIcon({ color, size = 64 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

export default function BeltProgression() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Earn Your Rank
        </h2>
        <p className="text-dojo-muted text-center mb-16 max-w-xl mx-auto">
          Martial arts-inspired progression. Nine belts earned through mastery,
          never rushed. ~6 months of daily practice to reach Black Belt.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-dojo-border hidden sm:block" />

          <div className="space-y-6">
            {beltLevels.map((belt, i) => (
              <div key={belt.name} className="relative flex items-start gap-6">
                {/* Shield icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-16 h-16 flex items-center justify-center"
                    style={{
                      filter: `drop-shadow(0 0 8px ${belt.color}40)`,
                    }}
                  >
                    <ShieldIcon color={belt.color} size={56} />
                  </div>
                </div>

                {/* Belt info */}
                <div className="flex-1 bg-dojo-card border border-dojo-border rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-dojo-text">
                      {belt.name}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${belt.color}20`,
                        color: belt.name === "Black Belt" ? "#f0e6d6" : belt.color,
                        border: `1px solid ${belt.color}40`,
                      }}
                    >
                      {belt.label}
                    </span>
                  </div>
                  <p className="text-sm text-dojo-muted">
                    Master {belt.fallacies} fallacies. Pass the{" "}
                    {belt.name.split(" ")[0]} Belt Kata — a combined challenge
                    across all game modes. Minimum score:{" "}
                    {70 + i * 3}%.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
