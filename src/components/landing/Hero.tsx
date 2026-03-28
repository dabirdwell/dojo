import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6">
      {/* Background accent glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-dojo-accent/5 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-dojo-accent/30 bg-dojo-accent/10 text-dojo-accent text-sm font-medium tracking-wide">
          Brain Mastery Series
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="text-dojo-text">Dojo</span>
        </h1>

        <p className="text-xl sm:text-2xl text-dojo-muted mb-4 font-light">
          Train your mind. Defend your thinking.
        </p>

        <p className="text-base text-dojo-muted/80 max-w-xl mx-auto mb-10 leading-relaxed">
          A gamified critical thinking trainer that makes fallacy detection,
          argument construction, and source evaluation second nature — framed as
          martial arts training for the mind.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/play/fallacy-flash"
            className="px-8 py-3.5 bg-dojo-accent hover:bg-dojo-accent-hover text-white rounded-lg font-semibold transition-colors text-lg"
          >
            Start Training
          </Link>
          <a
            href="#game-modes"
            className="px-8 py-3.5 border border-dojo-border hover:border-dojo-muted text-dojo-muted hover:text-dojo-text rounded-lg font-semibold transition-colors text-lg"
          >
            Explore Modes
          </a>
        </div>

        {/* Quick nav */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            href="/play/daily"
            className="text-sm text-dojo-muted hover:text-dojo-accent transition-colors flex items-center gap-1.5"
          >
            <span>📅</span> Daily Challenge
          </Link>
          <span className="text-dojo-border">|</span>
          <Link
            href="/leaderboard"
            className="text-sm text-dojo-muted hover:text-dojo-accent transition-colors flex items-center gap-1.5"
          >
            <span>🏆</span> Leaderboard
          </Link>
        </div>

        {/* Stat bar */}
        <div className="mt-16 flex justify-center gap-8 sm:gap-16 text-center">
          {[
            { value: "50", label: "Fallacies" },
            { value: "6", label: "Game Modes" },
            { value: "9", label: "Belt Ranks" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-dojo-accent">
                {stat.value}
              </div>
              <div className="text-sm text-dojo-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
