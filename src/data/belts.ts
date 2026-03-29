export interface Belt {
  name: string;
  color: string;
  minXP: number;
  maxXP: number | null; // null = no cap (Black Belt)
  label: string;
}

export const belts: Belt[] = [
  { name: "White Belt", color: "#E8E8E8", minXP: 0, maxXP: 49, label: "Beginner" },
  { name: "Yellow Belt", color: "#F5D442", minXP: 50, maxXP: 124, label: "Foundations" },
  { name: "Orange Belt", color: "#FF9800", minXP: 125, maxXP: 224, label: "Developing" },
  { name: "Green Belt", color: "#4CAF50", minXP: 225, maxXP: 374, label: "Intermediate" },
  { name: "Blue Belt", color: "#2196F3", minXP: 375, maxXP: 549, label: "Advanced" },
  { name: "Purple Belt", color: "#9C27B0", minXP: 550, maxXP: 749, label: "Specialist" },
  { name: "Brown Belt", color: "#795548", minXP: 750, maxXP: 999, label: "Expert" },
  { name: "Red Belt", color: "#F44336", minXP: 1000, maxXP: 1499, label: "Elite" },
  { name: "Black Belt", color: "#1A1A1A", minXP: 1500, maxXP: null, label: "Master" },
];

export function getBeltForXP(xp: number): Belt {
  for (let i = belts.length - 1; i >= 0; i--) {
    if (xp >= belts[i].minXP) return belts[i];
  }
  return belts[0];
}

export function getNextBelt(xp: number): Belt | null {
  const current = getBeltForXP(xp);
  const idx = belts.indexOf(current);
  return idx < belts.length - 1 ? belts[idx + 1] : null;
}

export function getProgressToNextBelt(xp: number): number {
  const current = getBeltForXP(xp);
  const next = getNextBelt(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}

export type GameMode = "fallacy-flash" | "steelman" | "source-check" | "daily-brief" | "civic-check" | "socratic" | "real-world" | "argument-map";

export const XP_AWARDS: Record<GameMode, { base: number; description: string }> = {
  "fallacy-flash": { base: 10, description: "10 XP per correct + 25 bonus" },
  steelman: { base: 40, description: "40 XP base + 20 quality bonus" },
  "source-check": { base: 15, description: "Up to 15 XP per source analyzed" },
  "daily-brief": { base: 40, description: "Up to 40 XP per perfect day" },
  "civic-check": { base: 15, description: "15 XP per correct + 30 policy bonus" },
  socratic: { base: 15, description: "15 XP per correct + 25 insight bonus" },
  "real-world": { base: 12, description: "12 XP per correct + 20 streak bonus" },
  "argument-map": { base: 15, description: "15 XP base + up to 35 accuracy bonus" },
};

// --- Belt → Fallacy Curriculum ---

export type CurriculumBeltLevel = "white" | "yellow" | "green" | "blue" | "brown" | "black";

export interface CurriculumFallacy {
  id: string;
  name: string;
  description: string;
  example: string;
  belt: CurriculumBeltLevel;
  difficulty: number;
}

export interface CurriculumBelt {
  level: CurriculumBeltLevel;
  name: string;
  color: string;
  fallacies: CurriculumFallacy[];
}

export const CURRICULUM_BELT_ORDER: CurriculumBeltLevel[] = [
  "white", "yellow", "green", "blue", "brown", "black",
];

export const BELT_CURRICULUM: CurriculumBelt[] = [
  {
    level: "white",
    name: "White Belt",
    color: "#E8E8E8",
    fallacies: [
      {
        id: "ad_hominem",
        name: "Ad Hominem",
        description: "Attacking the person making the argument rather than the argument itself.",
        example: "We shouldn't listen to Dr. Martinez's climate research — she was arrested for protesting in college.",
        belt: "white",
        difficulty: 1,
      },
      {
        id: "straw_man",
        name: "Straw Man",
        description: "Misrepresenting someone's argument to make it easier to attack.",
        example: "\"We should have stricter pollution regulations.\" → \"My opponent wants to shut down every factory.\"",
        belt: "white",
        difficulty: 1,
      },
      {
        id: "appeal_to_authority",
        name: "Appeal to Authority",
        description: "Claiming something is true because an authority figure said so, regardless of their relevant expertise.",
        example: "This diet must work — a famous actor endorses it on Instagram.",
        belt: "white",
        difficulty: 1,
      },
      {
        id: "appeal_to_emotion",
        name: "Appeal to Emotion",
        description: "Using emotional manipulation instead of logical reasoning to win an argument.",
        example: "If you don't support this bill, you clearly don't care about children's futures.",
        belt: "white",
        difficulty: 1,
      },
    ],
  },
  {
    level: "yellow",
    name: "Yellow Belt",
    color: "#F5D442",
    fallacies: [
      {
        id: "false_dilemma",
        name: "False Dilemma",
        description: "Presenting only two options when more exist.",
        example: "You're either with us or against us — there's no middle ground on this policy.",
        belt: "yellow",
        difficulty: 2,
      },
      {
        id: "slippery_slope",
        name: "Slippery Slope",
        description: "Claiming one event will inevitably lead to extreme consequences without justification.",
        example: "If we allow students to redo one test, soon they'll expect to redo every assignment and nobody will study.",
        belt: "yellow",
        difficulty: 2,
      },
      {
        id: "hasty_generalization",
        name: "Hasty Generalization",
        description: "Drawing a broad conclusion from too few examples.",
        example: "I met two rude people from that city, so everyone there must be unfriendly.",
        belt: "yellow",
        difficulty: 2,
      },
      {
        id: "red_herring",
        name: "Red Herring",
        description: "Introducing an irrelevant topic to divert attention from the original issue.",
        example: "Why worry about the budget deficit when there are so many potholes on our roads?",
        belt: "yellow",
        difficulty: 2,
      },
    ],
  },
  {
    level: "green",
    name: "Green Belt",
    color: "#4CAF50",
    fallacies: [
      {
        id: "circular_reasoning",
        name: "Circular Reasoning",
        description: "Using the conclusion as a premise — the argument assumes what it's trying to prove.",
        example: "The Bible is true because it's the word of God, and we know it's the word of God because the Bible says so.",
        belt: "green",
        difficulty: 3,
      },
      {
        id: "whataboutism",
        name: "Whataboutism",
        description: "Deflecting criticism by pointing to someone else's wrongdoing instead of addressing the issue.",
        example: "Sure our company pollutes, but what about the factories in China that are far worse?",
        belt: "green",
        difficulty: 3,
      },
      {
        id: "post_hoc",
        name: "Post Hoc",
        description: "Assuming that because one event followed another, the first caused the second.",
        example: "I wore my lucky socks and we won the game — the socks must be why we won.",
        belt: "green",
        difficulty: 3,
      },
      {
        id: "bandwagon",
        name: "Bandwagon",
        description: "Arguing something is true or good because many people believe it or do it.",
        example: "Everyone is investing in crypto right now, so it must be a smart financial decision.",
        belt: "green",
        difficulty: 3,
      },
    ],
  },
  {
    level: "blue",
    name: "Blue Belt",
    color: "#2196F3",
    fallacies: [
      {
        id: "equivocation",
        name: "Equivocation",
        description: "Using a word with multiple meanings in different parts of an argument as if the meaning is the same.",
        example: "The sign said 'fine for parking here,' so I parked — it must be fine to park here.",
        belt: "blue",
        difficulty: 4,
      },
      {
        id: "composition_division",
        name: "Composition / Division",
        description: "Assuming what's true of a part is true of the whole, or vice versa.",
        example: "Every player on the team is a star, so the team must be the best in the league.",
        belt: "blue",
        difficulty: 4,
      },
      {
        id: "appeal_to_ignorance",
        name: "Appeal to Ignorance",
        description: "Claiming something is true because it hasn't been proven false, or vice versa.",
        example: "Nobody has proven that ghosts don't exist, therefore they must be real.",
        belt: "blue",
        difficulty: 4,
      },
      {
        id: "moving_goalposts",
        name: "Moving the Goalposts",
        description: "Continuously changing the criteria for proof or acceptance after they've been met.",
        example: "\"Show me one study.\" → \"That's just one study, show me a meta-analysis.\" → \"That's just academics...\"",
        belt: "blue",
        difficulty: 4,
      },
    ],
  },
  {
    level: "brown",
    name: "Brown Belt",
    color: "#795548",
    fallacies: [
      {
        id: "affirming_consequent",
        name: "Affirming the Consequent",
        description: "Assuming that if A causes B, then observing B means A must have occurred.",
        example: "If it rains, the ground gets wet. The ground is wet, therefore it must have rained.",
        belt: "brown",
        difficulty: 5,
      },
      {
        id: "base_rate_neglect",
        name: "Base Rate Neglect",
        description: "Ignoring general statistical probabilities in favor of specific but less reliable information.",
        example: "The test is 99% accurate and you tested positive, so you almost certainly have the disease. (Ignoring that only 1 in 10,000 people have it.)",
        belt: "brown",
        difficulty: 5,
      },
      {
        id: "survivorship_bias",
        name: "Survivorship Bias",
        description: "Drawing conclusions from successes while ignoring the failures that are no longer visible.",
        example: "Bill Gates dropped out of college and became a billionaire, so college isn't necessary for success.",
        belt: "brown",
        difficulty: 5,
      },
      {
        id: "simpsons_paradox",
        name: "Simpson's Paradox",
        description: "A trend that appears in groups of data reverses when the groups are combined.",
        example: "Hospital A has better survival rates in every department, yet Hospital B has better rates overall because it handles more difficult cases.",
        belt: "brown",
        difficulty: 5,
      },
    ],
  },
  {
    level: "black",
    name: "Black Belt",
    color: "#1A1A1A",
    fallacies: [
      {
        id: "compound_rhetoric",
        name: "Compound Rhetoric",
        description: "Identifying multiple fallacies layered together in a single persuasive argument.",
        example: "Everyone agrees (bandwagon) that Dr. Smith, a known fraud (ad hominem), is wrong — if we listen to him, society will collapse (slippery slope).",
        belt: "black",
        difficulty: 5,
      },
      {
        id: "novel_identification",
        name: "Novel Identification",
        description: "Recognizing fallacious reasoning patterns that don't fit neatly into standard categories.",
        example: "The algorithm recommended it and 50,000 users liked it, so it must be factually accurate. (A blend of authority, bandwagon, and automation bias.)",
        belt: "black",
        difficulty: 5,
      },
      {
        id: "teaching_others",
        name: "Teaching Others",
        description: "Explaining why an argument is fallacious in a way that helps others understand the error.",
        example: "Can you explain to a friend why 'correlation doesn't equal causation' applies to the claim that ice cream sales cause drowning?",
        belt: "black",
        difficulty: 5,
      },
      {
        id: "meta_analysis",
        name: "Rhetorical Meta-Analysis",
        description: "Analyzing the overall persuasion strategy behind a body of arguments, not just individual fallacies.",
        example: "A political campaign uses fear (emotion), false dilemmas, and cherry-picked stats (survivorship bias) in sequence to manufacture urgency.",
        belt: "black",
        difficulty: 5,
      },
    ],
  },
];

/** Map XP-based belt name to its curriculum level */
export function getCurriculumLevel(beltName: string): CurriculumBeltLevel {
  const map: Record<string, CurriculumBeltLevel> = {
    "White Belt": "white",
    "Yellow Belt": "yellow",
    "Orange Belt": "yellow",
    "Green Belt": "green",
    "Blue Belt": "blue",
    "Purple Belt": "blue",
    "Brown Belt": "brown",
    "Red Belt": "brown",
    "Black Belt": "black",
  };
  return map[beltName] || "white";
}

/** Get all curriculum belt levels unlocked at this belt */
export function getUnlockedCurriculumBelts(beltName: string): CurriculumBeltLevel[] {
  const level = getCurriculumLevel(beltName);
  const idx = CURRICULUM_BELT_ORDER.indexOf(level);
  return CURRICULUM_BELT_ORDER.slice(0, idx + 1);
}

/** Get all fallacy IDs unlocked at this belt level */
export function getUnlockedFallacyIds(beltName: string): string[] {
  const levels = getUnlockedCurriculumBelts(beltName);
  return BELT_CURRICULUM
    .filter((b) => levels.includes(b.level))
    .flatMap((b) => b.fallacies.map((f) => f.id));
}

/** Get the curriculum belt data for a given level */
export function getCurriculumBelt(level: CurriculumBeltLevel): CurriculumBelt {
  return BELT_CURRICULUM.find((b) => b.level === level)!;
}

/** Flat list of all curriculum fallacies */
export function getAllCurriculumFallacies(): CurriculumFallacy[] {
  return BELT_CURRICULUM.flatMap((b) => b.fallacies);
}
