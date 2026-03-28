import Hero from "@/components/landing/Hero";
import GameModes from "@/components/landing/GameModes";
import BeltProgression from "@/components/landing/BeltProgression";
import PricingTable from "@/components/landing/PricingTable";
import DailyBriefCard from "@/components/landing/DailyBriefCard";
import DailyChallengeCard from "@/components/landing/DailyChallengeCard";
import BeltBadge from "@/components/belt-badge/BeltBadge";

export default function Home() {
  return (
    <main>
      {/* Top nav with belt display */}
      <nav className="sticky top-0 z-40 bg-dojo-bg/80 backdrop-blur-md border-b border-dojo-border/50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-bold text-dojo-text tracking-wide">
            Dojo
          </span>
          <BeltBadge />
        </div>
      </nav>

      <Hero />

      {/* Daily Challenge — prominent */}
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
            A Brain Mastery app by{" "}
            <a
              href="https://humanityandai.com"
              className="text-dojo-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Humanity &amp; AI
            </a>
          </p>
          <p className="text-dojo-muted/60 text-xs mt-2">
            Train your mind. Defend your thinking.
          </p>
        </div>
      </footer>
    </main>
  );
}
