import type { Metadata } from "next";
import DailyBriefGame from "@/components/daily-brief/DailyBriefGame";

export const metadata: Metadata = {
  title: "Daily Brief — Dojo",
  description:
    "Daily critical thinking challenge: identify the logical error, missing context, and solid reporting in three news summaries.",
};

export default function DailyBriefPage() {
  return <DailyBriefGame />;
}
