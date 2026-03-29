import type { Metadata } from "next";
import AchievementsView from "@/components/achievements/AchievementsView";

export const metadata: Metadata = {
  title: "Achievements \u2014 Dojo",
  description: "Track your unlocked achievements and progress.",
};

export default function AchievementsPage() {
  return <AchievementsView />;
}
