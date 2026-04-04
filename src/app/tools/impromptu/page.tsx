import { Metadata } from "next";
import ImpromptuSpeaking from "@/components/impromptu/ImpromptuSpeaking";

export const metadata: Metadata = {
  title: "Impromptu Speaking — Dojo",
  description:
    "Draw a random topic, prep for 30 seconds, then deliver a timed speech. Self-assess and get AI feedback on your rhetoric.",
};

export default function ImpromptuPage() {
  return <ImpromptuSpeaking />;
}
