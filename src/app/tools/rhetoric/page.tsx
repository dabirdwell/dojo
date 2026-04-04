import { Metadata } from "next";
import RhetoricAnalyzer from "@/components/rhetoric/RhetoricAnalyzer";

export const metadata: Metadata = {
  title: "Rhetoric Analyzer — Dojo",
  description:
    "Paste any text to identify rhetorical devices, flag fallacies, and highlight persuasion techniques.",
};

export default function RhetoricPage() {
  return <RhetoricAnalyzer />;
}
