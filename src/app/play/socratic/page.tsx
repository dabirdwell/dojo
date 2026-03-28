import type { Metadata } from "next";
import SocraticGame from "@/components/socratic/SocraticGame";

export const metadata: Metadata = {
  title: "Socratic Questioning — Dojo",
  description:
    "Examine common beliefs through Socratic questioning. Identify the most powerful challenge to each thesis.",
};

export default function SocraticPage() {
  return <SocraticGame />;
}
