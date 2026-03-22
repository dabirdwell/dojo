import Hero from "@/components/landing/Hero";
import GameModes from "@/components/landing/GameModes";
import BeltProgression from "@/components/landing/BeltProgression";
import PricingTable from "@/components/landing/PricingTable";
import DailyBriefCard from "@/components/landing/DailyBriefCard";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Daily Challenge */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
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
            Dojo — Brain Mastery Series
          </p>
          <p className="text-dojo-muted/60 text-xs mt-2">
            Train your mind. Defend your thinking.
          </p>
        </div>
      </footer>
    </main>
  );
}
