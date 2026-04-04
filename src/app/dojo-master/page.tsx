import type { Metadata } from "next";
import DojoMaster from "@/components/dojo-master/DojoMaster";

export const metadata: Metadata = {
  title: "Dojo Master — Train with Your Sensei",
  description:
    "Conversational AI sensei that adapts to your belt level. Get quizzed on fallacies, run Socratic dialogues, evaluate arguments, and earn belt-advancement challenges.",
};

export default function DojoMasterPage() {
  return <DojoMaster />;
}
