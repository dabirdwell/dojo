import Link from "next/link";
import { belts } from "@/data/belts";

const modeProgression = [
  { name: "Fallacy Flash", icon: "⚡", description: "Spot the error" },
  { name: "Source Check", icon: "🔍", description: "Evaluate claims" },
  { name: "Steelman", icon: "🛡", description: "Build stronger arguments" },
  { name: "Socratic", icon: "🏛", description: "Question assumptions" },
  { name: "Competitive", icon: "🥊", description: "Test under pressure" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-16">
      {/* Background accent glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-dojo-accent/5 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-4xl mx-auto">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dojo-accent/30 bg-dojo-accent/10 text-dojo-accent text-sm font-medium tracking-wide">
          Brain Mastery Series
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
          <span className="text-dojo-text">Train Your Thinking</span>
        </h1>

        <p className="text-xl sm:text-2xl text-dojo-muted mb-12 font-light">
          Five modes. One sharper mind.
        </p>

        {/* Mode progression visual */}
        <div className="mb-14">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {modeProgression.map((mode, i) => (
              <div key={mode.name} className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-dojo-card border border-dojo-border flex items-center justify-center text-2xl sm:text-3xl hover:border-dojo-accent/40 transition-colors">
                    {mode.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs text-dojo-muted font-medium whitespace-nowrap">
                    {mode.name}
                  </span>
                </div>
                {i < modeProgression.length - 1 && (
                  <span className="text-dojo-border text-lg sm:text-xl mb-5">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-14">
          <Link
            href="/play/fallacy-flash"
            className="inline-block px-10 py-4 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors text-lg shadow-lg shadow-dojo-accent/20"
          >
            Start Training
          </Link>
        </div>

        {/* Belt progression preview */}
        <div className="mb-14">
          <p className="text-sm text-dojo-muted mb-4 font-medium uppercase tracking-wider">
            Belt Progression
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            {belts.map((belt, i) => (
              <div key={belt.name} className="flex items-center gap-1 sm:gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: belt.color,
                      backgroundColor: `${belt.color}15`,
                      boxShadow: `0 0 8px ${belt.color}30`,
                    }}
                  >
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                      style={{ backgroundColor: belt.color }}
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-dojo-muted whitespace-nowrap">
                    {belt.name.split(" ")[0]}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-dojo-muted/60">
                    {belt.minXP} XP
                  </span>
                </div>
                {i < belts.length - 1 && (
                  <span className="text-dojo-border/50 text-xs mb-6">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex justify-center gap-6 sm:gap-12 text-center flex-wrap">
          {[
            { value: "200+", label: "Scenarios" },
            { value: "30", label: "Real-World Challenges" },
            { value: "Daily", label: "Challenges" },
            { value: "AI", label: "Argument Builder" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl sm:text-2xl font-bold text-dojo-accent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-dojo-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
