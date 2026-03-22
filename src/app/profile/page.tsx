import type { Metadata } from "next";
import ProfileView from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "Your Profile — Dojo",
  description: "Track your belt progression, XP, and game stats.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
