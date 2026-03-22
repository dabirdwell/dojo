import { beltLevels } from "@/data/fallacies";

export default function BeltProgression() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Earn Your Rank
        </h2>
        <p className="text-dojo-muted text-center mb-16 max-w-xl mx-auto">
          Martial arts-inspired progression. Belts are earned through mastery,
          never rushed. ~6 months of daily practice to reach Black Belt.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-dojo-border hidden sm:block" />

          <div className="space-y-6">
            {beltLevels.map((belt, i) => (
              <div key={belt.name} className="relative flex items-start gap-6">
                {/* Belt circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center text-xs font-bold"
                    style={{
                      borderColor: belt.color,
                      backgroundColor: `${belt.color}15`,
                      color: belt.name === "Black Belt" ? "#f0e6d6" : belt.color,
                    }}
                  >
                    {belt.fallacies}
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
                        color: belt.color,
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
