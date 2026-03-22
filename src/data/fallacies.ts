export interface FallacyExample {
  argument: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface Fallacy {
  id: string;
  name: string;
  aliases: string[];
  definition: string;
  belt: "white" | "yellow" | "green" | "blue" | "brown" | "black";
  examples: FallacyExample[];
}

export const fallacies: Fallacy[] = [
  {
    id: "ad_hominem",
    name: "Ad Hominem",
    aliases: ["Personal Attack", "Attacking the Person"],
    definition:
      "Attacking the person making the argument rather than the argument itself.",
    belt: "white",
    examples: [
      {
        argument:
          "We shouldn't listen to Dr. Martinez's climate research — she was arrested for protesting in college.",
        correctAnswer: "Ad Hominem",
        options: ["Straw Man", "Ad Hominem", "False Dilemma", "Slippery Slope"],
        explanation:
          "This attacks Dr. Martinez's character instead of addressing her research.",
      },
      {
        argument:
          "You can't trust Jake's opinion on nutrition — he's overweight himself.",
        correctAnswer: "Ad Hominem",
        options: [
          "Ad Hominem",
          "Appeal to Authority",
          "Red Herring",
          "Hasty Generalization",
        ],
        explanation:
          "Jake's weight doesn't invalidate his knowledge about nutrition.",
      },
      {
        argument:
          "The senator's tax reform plan is worthless — she's never run a business in her life.",
        correctAnswer: "Ad Hominem",
        options: [
          "Appeal to Emotion",
          "Bandwagon",
          "Ad Hominem",
          "Circular Reasoning",
        ],
        explanation:
          "Dismissing a policy based on the senator's background rather than the plan's merits.",
      },
    ],
  },
  {
    id: "straw_man",
    name: "Straw Man",
    aliases: ["Misrepresentation"],
    definition:
      "Misrepresenting someone's argument to make it easier to attack.",
    belt: "white",
    examples: [
      {
        argument:
          'Person A: "We should have stricter regulations on pollution." Person B: "My opponent wants to shut down every factory and destroy the economy."',
        correctAnswer: "Straw Man",
        options: [
          "Straw Man",
          "Slippery Slope",
          "False Dilemma",
          "Ad Hominem",
        ],
        explanation:
          "Person B exaggerates Person A's position to something they never said.",
      },
      {
        argument:
          '"Vegetarians think animals are more important than people."',
        correctAnswer: "Straw Man",
        options: [
          "Appeal to Emotion",
          "Straw Man",
          "Hasty Generalization",
          "Red Herring",
        ],
        explanation:
          "This misrepresents the vegetarian position, which is about reducing harm, not ranking species.",
      },
      {
        argument:
          '"People who support gun control want to ban all guns and leave everyone defenseless."',
        correctAnswer: "Straw Man",
        options: [
          "Slippery Slope",
          "False Dilemma",
          "Straw Man",
          "Bandwagon",
        ],
        explanation:
          "Most gun control advocates support regulation, not total bans — this distorts their position.",
      },
    ],
  },
  {
    id: "appeal_to_authority",
    name: "Appeal to Authority",
    aliases: ["Argument from Authority", "Argumentum ad Verecundiam"],
    definition:
      "Claiming something is true because an authority figure says so, especially when they lack relevant expertise.",
    belt: "white",
    examples: [
      {
        argument:
          "This diet must work — a famous actor endorses it on Instagram.",
        correctAnswer: "Appeal to Authority",
        options: [
          "Bandwagon",
          "Appeal to Authority",
          "Hasty Generalization",
          "Ad Hominem",
        ],
        explanation:
          "An actor's fame doesn't make them a nutrition expert.",
      },
      {
        argument:
          "My physics professor says the economy is heading for a crash, so it must be true.",
        correctAnswer: "Appeal to Authority",
        options: [
          "Appeal to Authority",
          "Circular Reasoning",
          "Straw Man",
          "Appeal to Emotion",
        ],
        explanation:
          "Expertise in physics doesn't transfer to economic forecasting.",
      },
      {
        argument:
          "A Nobel Prize-winning chemist says vaccines are dangerous, so we should be worried.",
        correctAnswer: "Appeal to Authority",
        options: [
          "Red Herring",
          "Appeal to Emotion",
          "Appeal to Authority",
          "Slippery Slope",
        ],
        explanation:
          "Nobel-level chemistry expertise doesn't confer authority on immunology or vaccine safety.",
      },
    ],
  },
  {
    id: "appeal_to_emotion",
    name: "Appeal to Emotion",
    aliases: ["Argumentum ad Passiones", "Emotional Appeal"],
    definition:
      "Using emotional manipulation instead of evidence to win an argument.",
    belt: "white",
    examples: [
      {
        argument:
          "If we don't pass this bill, thousands of children will suffer. Do you want that on your conscience?",
        correctAnswer: "Appeal to Emotion",
        options: [
          "Slippery Slope",
          "Appeal to Emotion",
          "Ad Hominem",
          "False Dilemma",
        ],
        explanation:
          "This uses guilt and emotional imagery instead of presenting evidence for the bill's effectiveness.",
      },
      {
        argument:
          "How can you eat meat when you look into the eyes of a helpless animal?",
        correctAnswer: "Appeal to Emotion",
        options: [
          "Straw Man",
          "Red Herring",
          "Appeal to Emotion",
          "Bandwagon",
        ],
        explanation:
          "This substitutes an emotional image for a logical argument about dietary ethics.",
      },
      {
        argument:
          "Think of our brave soldiers — you owe it to them to support this military budget.",
        correctAnswer: "Appeal to Emotion",
        options: [
          "Appeal to Emotion",
          "Appeal to Authority",
          "Circular Reasoning",
          "Hasty Generalization",
        ],
        explanation:
          "Invoking respect for soldiers to bypass analysis of whether the budget is justified.",
      },
    ],
  },
  {
    id: "false_dilemma",
    name: "False Dilemma",
    aliases: ["False Dichotomy", "Either/Or Fallacy", "Black-and-White Thinking"],
    definition:
      "Presenting only two options when more possibilities exist.",
    belt: "yellow",
    examples: [
      {
        argument:
          "You're either with us or against us. There's no middle ground on this issue.",
        correctAnswer: "False Dilemma",
        options: [
          "False Dilemma",
          "Straw Man",
          "Ad Hominem",
          "Bandwagon",
        ],
        explanation:
          "This ignores nuanced positions — one can partially agree, be undecided, or hold a third view.",
      },
      {
        argument:
          "We either ban all social media for kids or accept that they'll be addicted to screens forever.",
        correctAnswer: "False Dilemma",
        options: [
          "Slippery Slope",
          "Appeal to Emotion",
          "False Dilemma",
          "Hasty Generalization",
        ],
        explanation:
          "There are many options between a total ban and no restrictions at all.",
      },
      {
        argument:
          "Either we fund this weapons program or our enemies will destroy us.",
        correctAnswer: "False Dilemma",
        options: [
          "Appeal to Emotion",
          "False Dilemma",
          "Red Herring",
          "Circular Reasoning",
        ],
        explanation:
          "National security involves many strategies beyond this single binary choice.",
      },
    ],
  },
  {
    id: "slippery_slope",
    name: "Slippery Slope",
    aliases: ["Domino Fallacy", "Thin End of the Wedge"],
    definition:
      "Claiming one event will inevitably lead to a chain of negative consequences without justification.",
    belt: "yellow",
    examples: [
      {
        argument:
          "If we allow students to redo one test, soon they'll expect to redo every assignment, and eventually nobody will study at all.",
        correctAnswer: "Slippery Slope",
        options: [
          "Straw Man",
          "Slippery Slope",
          "False Dilemma",
          "Appeal to Emotion",
        ],
        explanation:
          "Each step in this chain is assumed without evidence — one policy doesn't inevitably lead to total collapse.",
      },
      {
        argument:
          "If we legalize marijuana, next it'll be cocaine, then heroin, and society will collapse into drug addiction.",
        correctAnswer: "Slippery Slope",
        options: [
          "Hasty Generalization",
          "Bandwagon",
          "Slippery Slope",
          "Ad Hominem",
        ],
        explanation:
          "Each escalation is assumed, not demonstrated — legalization of one substance doesn't necessitate others.",
      },
      {
        argument:
          "If we let employees work from home one day a week, soon nobody will come to the office and the company culture will die.",
        correctAnswer: "Slippery Slope",
        options: [
          "Appeal to Authority",
          "Slippery Slope",
          "Circular Reasoning",
          "Straw Man",
        ],
        explanation:
          "Flexible work policies don't inevitably lead to total remote work and cultural collapse.",
      },
    ],
  },
  {
    id: "hasty_generalization",
    name: "Hasty Generalization",
    aliases: ["Overgeneralization", "Sweeping Generalization"],
    definition:
      "Drawing a broad conclusion from too few examples or unrepresentative evidence.",
    belt: "yellow",
    examples: [
      {
        argument:
          "I met two rude people from that city, so everyone there must be rude.",
        correctAnswer: "Hasty Generalization",
        options: [
          "Ad Hominem",
          "Hasty Generalization",
          "Straw Man",
          "Bandwagon",
        ],
        explanation:
          "Two people is far too small a sample to characterize an entire city's population.",
      },
      {
        argument:
          "My neighbor bought an electric car and it broke down, so electric cars are unreliable.",
        correctAnswer: "Hasty Generalization",
        options: [
          "Appeal to Authority",
          "False Dilemma",
          "Hasty Generalization",
          "Red Herring",
        ],
        explanation:
          "One person's experience doesn't represent the reliability of all electric cars.",
      },
      {
        argument:
          "I've read three articles about AI failures, so AI technology clearly doesn't work.",
        correctAnswer: "Hasty Generalization",
        options: [
          "Hasty Generalization",
          "Circular Reasoning",
          "Appeal to Emotion",
          "Slippery Slope",
        ],
        explanation:
          "Three articles about failures don't account for the vast number of successful AI applications.",
      },
    ],
  },
  {
    id: "red_herring",
    name: "Red Herring",
    aliases: ["Misdirection", "Irrelevant Conclusion"],
    definition:
      "Introducing an irrelevant topic to divert attention from the original issue.",
    belt: "yellow",
    examples: [
      {
        argument:
          '"Why are you worried about climate change when there are children starving right now?"',
        correctAnswer: "Red Herring",
        options: [
          "False Dilemma",
          "Red Herring",
          "Appeal to Emotion",
          "Ad Hominem",
        ],
        explanation:
          "Child hunger, while important, is unrelated to the validity of climate concerns — both can matter.",
      },
      {
        argument:
          "The CEO was asked about the company's pollution record and responded by talking about their charitable donations.",
        correctAnswer: "Red Herring",
        options: [
          "Straw Man",
          "Appeal to Authority",
          "Red Herring",
          "Circular Reasoning",
        ],
        explanation:
          "Charitable work doesn't address the question about pollution — it's a deliberate topic change.",
      },
      {
        argument:
          '"Sure, the politician lied about their credentials, but what about all the good legislation they\'ve passed?"',
        correctAnswer: "Red Herring",
        options: [
          "Red Herring",
          "Bandwagon",
          "Hasty Generalization",
          "False Dilemma",
        ],
        explanation:
          "Legislative accomplishments don't address the issue of dishonesty about credentials.",
      },
    ],
  },
  {
    id: "circular_reasoning",
    name: "Circular Reasoning",
    aliases: ["Begging the Question", "Petitio Principii"],
    definition:
      "Using the conclusion as a premise — the argument assumes what it's trying to prove.",
    belt: "green",
    examples: [
      {
        argument:
          "The Bible is true because it's the word of God, and we know it's the word of God because the Bible says so.",
        correctAnswer: "Circular Reasoning",
        options: [
          "Appeal to Authority",
          "Circular Reasoning",
          "Straw Man",
          "Red Herring",
        ],
        explanation:
          "The claim relies on itself for proof — the Bible's truth is used to prove the Bible's truth.",
      },
      {
        argument:
          "This is the best restaurant in town because no other restaurant is as good.",
        correctAnswer: "Circular Reasoning",
        options: [
          "Hasty Generalization",
          "Appeal to Emotion",
          "Circular Reasoning",
          "Bandwagon",
        ],
        explanation:
          'Saying "no other is as good" just restates the claim that it\'s the best — no actual evidence is given.',
      },
      {
        argument:
          "Free markets are the most efficient system because they operate through free competition, which is the most efficient mechanism.",
        correctAnswer: "Circular Reasoning",
        options: [
          "False Dilemma",
          "Circular Reasoning",
          "Appeal to Authority",
          "Slippery Slope",
        ],
        explanation:
          "The conclusion (free markets are efficient) is restated as the premise (free competition is efficient).",
      },
    ],
  },
  {
    id: "bandwagon",
    name: "Bandwagon",
    aliases: ["Appeal to Popularity", "Argumentum ad Populum"],
    definition:
      "Arguing something is true or good because many people believe it or do it.",
    belt: "green",
    examples: [
      {
        argument:
          "Millions of people use this supplement, so it must be effective.",
        correctAnswer: "Bandwagon",
        options: [
          "Appeal to Authority",
          "Hasty Generalization",
          "Bandwagon",
          "Ad Hominem",
        ],
        explanation:
          "Popularity of a product says nothing about its actual effectiveness — many popular products are ineffective.",
      },
      {
        argument:
          "Everyone in the office agrees that the new policy is great, so it must be a good idea.",
        correctAnswer: "Bandwagon",
        options: [
          "Bandwagon",
          "Appeal to Emotion",
          "Circular Reasoning",
          "Straw Man",
        ],
        explanation:
          "Group consensus can result from social pressure, not genuine evaluation of the policy.",
      },
      {
        argument:
          "Most people throughout history believed the Earth was the center of the universe, so the idea had real merit.",
        correctAnswer: "Bandwagon",
        options: [
          "Red Herring",
          "Bandwagon",
          "False Dilemma",
          "Appeal to Authority",
        ],
        explanation:
          "Historical popularity doesn't make an idea correct — this was disproven despite widespread belief.",
      },
    ],
  },
];

export const beltLevels = [
  { name: "White Belt", color: "#E8E8E8", fallacies: 10, label: "Fundamentals" },
  { name: "Yellow Belt", color: "#F5D442", fallacies: 18, label: "Foundations" },
  { name: "Green Belt", color: "#4CAF50", fallacies: 26, label: "Intermediate" },
  { name: "Blue Belt", color: "#2196F3", fallacies: 34, label: "Advanced" },
  { name: "Brown Belt", color: "#8D6E63", fallacies: 42, label: "Expert" },
  { name: "Black Belt", color: "#1A1A1A", fallacies: 50, label: "Master" },
] as const;
