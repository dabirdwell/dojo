export interface ImpromptuTopic {
  id: string;
  category: "foundation" | "current-events" | "abstract" | "counter-argument";
  title: string;
  bullets: string[];
  difficulty: 1 | 2 | 3;
}

export const impromptuTopics: ImpromptuTopic[] = [
  // Foundation components — critical thinking fundamentals
  {
    id: "burden-of-proof",
    category: "foundation",
    title: "Who bears the burden of proof?",
    bullets: [
      "Explain why the person making a claim must provide evidence",
      "Give an example where burden of proof is commonly shifted",
    ],
    difficulty: 1,
  },
  {
    id: "correlation-causation",
    category: "foundation",
    title: "Correlation vs. Causation",
    bullets: [
      "Explain why two things happening together doesn't mean one causes the other",
      "Provide a vivid real-world example",
      "How would you test for actual causation?",
    ],
    difficulty: 1,
  },
  {
    id: "unfalsifiable-claims",
    category: "foundation",
    title: "Why unfalsifiable claims are problematic",
    bullets: [
      "What makes a claim unfalsifiable?",
      "Why is falsifiability important for good reasoning?",
    ],
    difficulty: 2,
  },
  {
    id: "steelmanning-intro",
    category: "foundation",
    title: "The power of steelmanning",
    bullets: [
      "Explain what it means to steelman an argument",
      "Why is this more effective than strawmanning?",
      "Give an example of steelmanning a position you disagree with",
    ],
    difficulty: 1,
  },
  {
    id: "evidence-hierarchy",
    category: "foundation",
    title: "Not all evidence is equal",
    bullets: [
      "Describe the evidence hierarchy from anecdotes to meta-analyses",
      "Why do personal stories feel more convincing than statistics?",
    ],
    difficulty: 2,
  },

  // Current events prompts
  {
    id: "ai-regulation",
    category: "current-events",
    title: "Should AI development be regulated?",
    bullets: [
      "What are the strongest arguments for regulation?",
      "What are the risks of over-regulating?",
      "Propose a balanced framework",
    ],
    difficulty: 2,
  },
  {
    id: "social-media-age",
    category: "current-events",
    title: "Social media age verification",
    bullets: [
      "Should platforms verify users' ages?",
      "What are the privacy trade-offs?",
    ],
    difficulty: 1,
  },
  {
    id: "remote-work-debate",
    category: "current-events",
    title: "Is remote work better for society?",
    bullets: [
      "Consider productivity, mental health, and community impact",
      "Who benefits most? Who is harmed?",
      "What evidence exists on both sides?",
    ],
    difficulty: 2,
  },
  {
    id: "algorithmic-feeds",
    category: "current-events",
    title: "Algorithmic feeds and informed citizenship",
    bullets: [
      "How do recommendation algorithms affect what we believe?",
      "Should users have the right to a chronological feed?",
    ],
    difficulty: 2,
  },
  {
    id: "climate-individual",
    category: "current-events",
    title: "Individual vs. systemic action on climate change",
    bullets: [
      "Is personal carbon footprint reduction meaningful?",
      "Why might focusing on individual action be a distraction?",
      "How do you weigh both perspectives?",
    ],
    difficulty: 3,
  },

  // Abstract reasoning questions
  {
    id: "is-democracy-best",
    category: "abstract",
    title: "Is democracy the best form of governance?",
    bullets: [
      "What assumptions underlie democratic governance?",
      "What are the strongest critiques of democracy?",
    ],
    difficulty: 3,
  },
  {
    id: "free-speech-limits",
    category: "abstract",
    title: "Where should free speech end?",
    bullets: [
      "Present the strongest case for unrestricted speech",
      "Present the strongest case for some limits",
      "How do you decide where the line falls?",
    ],
    difficulty: 3,
  },
  {
    id: "truth-consensus",
    category: "abstract",
    title: "Can truth be determined by consensus?",
    bullets: [
      "When does expert consensus carry weight?",
      "When has consensus been spectacularly wrong?",
    ],
    difficulty: 2,
  },
  {
    id: "moral-relativism",
    category: "abstract",
    title: "Are moral truths universal or culturally relative?",
    bullets: [
      "Give an example supporting universalism",
      "Give an example supporting relativism",
      "Where does your own reasoning land, and why?",
    ],
    difficulty: 3,
  },
  {
    id: "privacy-vs-security",
    category: "abstract",
    title: "Privacy vs. security: a false dilemma?",
    bullets: [
      "Is the trade-off real or manufactured?",
      "What historical examples illuminate this tension?",
    ],
    difficulty: 2,
  },

  // Counter-argument challenges
  {
    id: "counter-meritocracy",
    category: "counter-argument",
    title: "Counter: 'Success is purely based on merit'",
    bullets: [
      "Present the strongest version of the meritocracy argument",
      "Then systematically challenge its assumptions",
      "What evidence complicates the picture?",
    ],
    difficulty: 2,
  },
  {
    id: "counter-tech-progress",
    category: "counter-argument",
    title: "Counter: 'Technology always improves our lives'",
    bullets: [
      "Steelman the techno-optimist position",
      "Identify the hidden costs and who bears them",
    ],
    difficulty: 2,
  },
  {
    id: "counter-tradition",
    category: "counter-argument",
    title: "Counter: 'We should preserve tradition because it works'",
    bullets: [
      "What is the appeal to tradition fallacy?",
      "When IS tradition a valid reason to keep something?",
      "How do you tell the difference?",
    ],
    difficulty: 2,
  },
  {
    id: "counter-data-driven",
    category: "counter-argument",
    title: "Counter: 'Data doesn't lie'",
    bullets: [
      "How can accurate data lead to wrong conclusions?",
      "Give examples of misleading statistics",
    ],
    difficulty: 3,
  },
  {
    id: "counter-both-sides",
    category: "counter-argument",
    title: "Counter: 'We should always hear both sides'",
    bullets: [
      "When is balance appropriate?",
      "When does 'both sides' create a false equivalence?",
      "How do you decide when a debate is settled?",
    ],
    difficulty: 2,
  },
  {
    id: "counter-common-sense",
    category: "counter-argument",
    title: "Counter: 'It's just common sense'",
    bullets: [
      "Why is 'common sense' often invoked to shut down debate?",
      "Give examples where common sense was wrong",
    ],
    difficulty: 1,
  },
  {
    id: "counter-neutrality",
    category: "counter-argument",
    title: "Counter: 'I'm just being objective'",
    bullets: [
      "Can anyone truly be objective?",
      "What biases are invisible to us?",
      "How is the claim of objectivity itself a rhetorical move?",
    ],
    difficulty: 3,
  },
  {
    id: "persuasion-ethics",
    category: "abstract",
    title: "Is persuasion inherently manipulative?",
    bullets: [
      "What distinguishes ethical persuasion from manipulation?",
      "Can rhetoric be a force for good?",
    ],
    difficulty: 2,
  },
  {
    id: "counter-science-settled",
    category: "counter-argument",
    title: "Counter: 'The science is settled'",
    bullets: [
      "What does scientific consensus actually mean?",
      "When is questioning consensus productive vs. obstructive?",
      "How do you distinguish healthy skepticism from denialism?",
    ],
    difficulty: 3,
  },
];

export function getRandomTopic(exclude?: string[]): ImpromptuTopic {
  const available = exclude
    ? impromptuTopics.filter((t) => !exclude.includes(t.id))
    : impromptuTopics;
  const pool = available.length > 0 ? available : impromptuTopics;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const CATEGORY_LABELS: Record<ImpromptuTopic["category"], string> = {
  foundation: "Foundation",
  "current-events": "Current Events",
  abstract: "Abstract Reasoning",
  "counter-argument": "Counter-Argument",
};
