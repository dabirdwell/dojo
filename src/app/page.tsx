import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import GameModes from "@/components/landing/GameModes";
import BeltProgression from "@/components/landing/BeltProgression";
import PricingTable from "@/components/landing/PricingTable";
import DailyBriefCard from "@/components/landing/DailyBriefCard";
import DailyChallengeCard from "@/components/landing/DailyChallengeCard";
import BeltBadge from "@/components/belt-badge/BeltBadge";
import AchievementNavLink from "@/components/achievements/AchievementNavLink";
import ReviewNavBadge from "@/components/review/ReviewNavBadge";

export default function Home() {
  return (
    <main>
      {/* Top nav with belt display */}
      <nav className="sticky top-0 z-40 bg-dojo-bg/80 backdrop-blur-md border-b border-dojo-border/50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-bold text-dojo-text tracking-wide">
            Dojo
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/tools/rhetoric"
              className="text-xs font-medium text-dojo-muted hover:text-dojo-text transition-colors"
            >
              Rhetoric Analyzer
            </a>
            <a
              href="/tools/impromptu"
              className="text-xs font-medium text-dojo-muted hover:text-dojo-text transition-colors"
            >
              Impromptu Speaking
            </a>
            <a
              href="/dojo-master"
              className="text-xs font-medium text-dojo-accent hover:text-dojo-accent-hover transition-colors"
            >
              Train with Sensei
            </a>
            <ReviewNavBadge />
            <AchievementNavLink />
            <BeltBadge />
          </div>
        </div>
      </nav>

      <Hero />

      <div className="h-px bg-gradient-to-r from-transparent via-dojo-border to-transparent" />
      <HowItWorks />

      {/* Daily Challenge — prominent */}
      <div className="h-px bg-gradient-to-r from-transparent via-dojo-border to-transparent" />
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <DailyChallengeCard />
          <DailyBriefCard />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-dojo-border to-transparent" />
      <GameModes />

      <div className="h-px bg-gradient-to-r from-transparent via-dojo-border to-transparent" />
      <BeltProgression />

      <div className="h-px bg-gradient-to-r from-transparent via-dojo-border to-transparent" />
      <PricingTable />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-dojo-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-dojo-muted text-sm">
            Part of the{" "}
            <span className="text-dojo-text font-medium">Brain Mastery</span>{" "}
            series
          </p>
          <p className="text-dojo-muted/80 text-sm mt-2">
            Built by{" "}
            <a
              href="https://humanityandai.com"
              className="text-dojo-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              humanityandai.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
