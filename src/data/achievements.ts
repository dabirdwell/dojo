export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: "first-blood",
    title: "First Blood",
    description: "Complete your first challenge",
    icon: "\u{1FA78}",
  },
  {
    id: "streak-3",
    title: "Streak of 3",
    description: "Maintain a 3-day practice streak",
    icon: "\u{1F525}",
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "Maintain a 7-day practice streak",
    icon: "\u2694\uFE0F",
  },
  {
    id: "fallacy-finder",
    title: "Fallacy Finder",
    description: "Correctly identify 10 fallacies",
    icon: "\u{1F50E}",
  },
  {
    id: "source-skeptic",
    title: "Source Skeptic",
    description: "Rate 20 sources",
    icon: "\u{1F9D0}",
  },
  {
    id: "steelman-master",
    title: "Steelman Master",
    description: "Complete 10 steelman challenges",
    icon: "\u{1F6E1}\uFE0F",
  },
  {
    id: "belt-up",
    title: "Belt Up",
    description: "Earn your first belt upgrade",
    icon: "\u{1F94B}",
  },
  {
    id: "black-belt",
    title: "Black Belt",
    description: "Reach black belt",
    icon: "\u2B1B",
  },
  {
    id: "daily-devotee",
    title: "Daily Devotee",
    description: "Complete 30 daily challenges",
    icon: "\u{1F4C5}",
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Answer 5 in a row under 5 seconds each",
    icon: "\u26A1",
  },
  {
    id: "perfect-round",
    title: "Perfect Round",
    description: "Get a perfect score in a game round",
    icon: "\u{1F4AF}",
  },
  {
    id: "real-world-ready",
    title: "Real World Ready",
    description: "Complete all 30 real-world scenarios",
    icon: "\u{1F30D}",
  },
  {
    id: "argument-architect",
    title: "Argument Architect",
    description: "Build 5 valid arguments",
    icon: "\u{1F3D7}\uFE0F",
  },
  {
    id: "socratic-scholar",
    title: "Socratic Scholar",
    description: "Complete all Socratic chains",
    icon: "\u{1F3DB}\uFE0F",
  },
  {
    id: "renaissance-thinker",
    title: "Renaissance Thinker",
    description: "Use every game mode at least once",
    icon: "\u{1F3A8}",
  },
];
