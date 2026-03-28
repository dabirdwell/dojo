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
  belt: "white" | "yellow" | "orange" | "green" | "blue" | "purple" | "brown" | "red" | "black";
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
      {
        argument:
          "The researcher's findings on vaccine safety are meaningless — she didn't even go to an Ivy League school.",
        correctAnswer: "Ad Hominem",
        options: ["Ad Hominem", "Appeal to Authority", "Bandwagon", "Red Herring"],
        explanation:
          "The researcher's alma mater does not determine the validity of her scientific findings.",
      },
      {
        argument:
          "Why would we listen to a 22-year-old city council candidate? She's barely out of college and probably still lives with her parents.",
        correctAnswer: "Ad Hominem",
        options: [
          "Straw Man",
          "Ad Hominem",
          "Hasty Generalization",
          "Appeal to Emotion",
        ],
        explanation:
          "The candidate's age and living situation are irrelevant to the quality of her policy proposals.",
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
      {
        argument:
          '"Anyone who questions the effectiveness of lockdowns wants grandma to die."',
        correctAnswer: "Straw Man",
        options: ["Straw Man", "Appeal to Emotion", "False Dilemma", "Ad Hominem"],
        explanation:
          "Questioning a specific policy is not the same as wanting people to die — this distorts the critic's position.",
      },
      {
        argument:
          '"Environmentalists want us all to live in caves and give up modern technology."',
        correctAnswer: "Straw Man",
        options: [
          "Slippery Slope",
          "Straw Man",
          "Red Herring",
          "Bandwagon",
        ],
        explanation:
          "Most environmentalists advocate for sustainable technology, not abandoning technology altogether.",
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
      {
        argument:
          "Elon Musk says we should be worried about population decline, so it must be the most important issue facing humanity.",
        correctAnswer: "Appeal to Authority",
        options: [
          "Bandwagon",
          "Appeal to Authority",
          "Hasty Generalization",
          "False Cause",
        ],
        explanation:
          "Being a successful entrepreneur doesn't make someone an authority on demographics or public policy priorities.",
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
      {
        argument:
          "Imagine your child walking home from school alone, passing through dark alleys. That's why we need a $50 million surveillance system on every block.",
        correctAnswer: "Appeal to Emotion",
        options: [
          "Slippery Slope",
          "Appeal to Emotion",
          "False Dilemma",
          "Red Herring",
        ],
        explanation:
          "The emotional scenario about children's safety is used to bypass rational analysis of whether the proposed surveillance system is effective or proportionate.",
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
      {
        argument:
          "You either support this trade deal exactly as written, or you're an isolationist who wants to cut off America from the global economy.",
        correctAnswer: "False Dilemma",
        options: [
          "False Dilemma",
          "Ad Hominem",
          "Straw Man",
          "Slippery Slope",
        ],
        explanation:
          "One can support international trade while still wanting to negotiate different terms — these aren't the only two positions.",
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
      {
        argument:
          "If we allow the government to mandate one vaccine, they'll soon mandate all medical procedures, and eventually they'll control every aspect of our health decisions.",
        correctAnswer: "Slippery Slope",
        options: [
          "False Dilemma",
          "Appeal to Emotion",
          "Slippery Slope",
          "Straw Man",
        ],
        explanation:
          "Vaccine mandates have existed for decades without leading to government control of all medical decisions — each step in this chain is assumed, not demonstrated.",
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
      {
        argument:
          "My startup failed, and my friend's startup failed too. Clearly, starting a business is a guaranteed way to lose money.",
        correctAnswer: "Hasty Generalization",
        options: [
          "Hasty Generalization",
          "False Cause",
          "Appeal to Emotion",
          "Sunk Cost Fallacy",
        ],
        explanation:
          "Two failed startups is far too small a sample to conclude that all businesses are doomed to fail.",
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
      {
        argument:
          "When asked about declining reading scores, the school board pointed to the new gym equipment and the school's winning basketball season.",
        correctAnswer: "Red Herring",
        options: [
          "Red Herring",
          "Appeal to Emotion",
          "False Cause",
          "Straw Man",
        ],
        explanation:
          "Athletic achievements, while positive, are irrelevant to the question about declining reading scores.",
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
      {
        argument:
          "We know this news source is trustworthy because they always report the truth, and we know they report the truth because they're a trustworthy source.",
        correctAnswer: "Circular Reasoning",
        options: [
          "Appeal to Authority",
          "Circular Reasoning",
          "Bandwagon",
          "Equivocation",
        ],
        explanation:
          "Trustworthiness is used to prove truth-telling, which is used to prove trustworthiness — the argument chases its own tail.",
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
      {
        argument:
          "This cryptocurrency must be a good investment — over 10 million people have bought it in the last month alone.",
        correctAnswer: "Bandwagon",
        options: [
          "Bandwagon",
          "Appeal to Authority",
          "False Cause",
          "Hasty Generalization",
        ],
        explanation:
          "Mass purchasing behavior doesn't indicate sound investment value — market bubbles are driven by exactly this kind of herd mentality.",
      },
    ],
  },
  {
    id: "whataboutism",
    name: "Whataboutism",
    aliases: ["Appeal to Hypocrisy", "Two Wrongs Make a Right"],
    definition:
      "Deflecting criticism by pointing to someone else's wrongdoing instead of addressing the original issue.",
    belt: "green",
    examples: [
      {
        argument:
          "Why are you criticizing our country's human rights record? What about the way the U.S. treats immigrants at its border?",
        correctAnswer: "Whataboutism",
        options: [
          "Red Herring",
          "Whataboutism",
          "Ad Hominem",
          "False Dilemma",
        ],
        explanation:
          "Pointing to another country's failings does not address or justify the original human rights criticism.",
      },
      {
        argument:
          "Sure, the oil company caused a massive spill, but what about all the pollution from electric vehicle battery production?",
        correctAnswer: "Whataboutism",
        options: [
          "Whataboutism",
          "Straw Man",
          "Appeal to Emotion",
          "Hasty Generalization",
        ],
        explanation:
          "EV battery concerns, however valid, do not excuse or address the specific oil spill under discussion.",
      },
      {
        argument:
          "People complain about misinformation on Twitter, but what about all the biased reporting from mainstream media?",
        correctAnswer: "Whataboutism",
        options: [
          "Bandwagon",
          "False Dilemma",
          "Whataboutism",
          "Circular Reasoning",
        ],
        explanation:
          "Media bias is a separate issue that does not resolve concerns about misinformation on social platforms.",
      },
      {
        argument:
          "You're upset that I didn't vote? What about the millions of people who voted for a corrupt candidate — that's way worse.",
        correctAnswer: "Whataboutism",
        options: [
          "Appeal to Emotion",
          "Whataboutism",
          "Slippery Slope",
          "Tu Quoque",
        ],
        explanation:
          "Other voters' choices do not address the original criticism about failing to participate in the election.",
      },
      {
        argument:
          "Why are we investigating this company's tax evasion when there are politicians who haven't paid their taxes either?",
        correctAnswer: "Whataboutism",
        options: [
          "Whataboutism",
          "Red Herring",
          "Tu Quoque",
          "False Dilemma",
        ],
        explanation:
          "Politicians' tax issues, however serious, do not justify or address the company's alleged tax evasion.",
      },
    ],
  },
  {
    id: "tu_quoque",
    name: "Tu Quoque",
    aliases: ["Appeal to Hypocrisy", "You Too Fallacy"],
    definition:
      "Dismissing someone's argument by accusing them of acting inconsistently with their own claim, rather than addressing the argument itself.",
    belt: "green",
    examples: [
      {
        argument:
          "My doctor told me to stop smoking, but I've seen her smoke outside the hospital. Why should I listen to her advice?",
        correctAnswer: "Tu Quoque",
        options: [
          "Ad Hominem",
          "Tu Quoque",
          "Red Herring",
          "Appeal to Authority",
        ],
        explanation:
          "The doctor's personal habit does not invalidate the medical evidence that smoking is harmful.",
      },
      {
        argument:
          "The climate activist flew on a private jet to the summit, so their argument about reducing carbon emissions is worthless.",
        correctAnswer: "Tu Quoque",
        options: [
          "Hasty Generalization",
          "Whataboutism",
          "Tu Quoque",
          "Straw Man",
        ],
        explanation:
          "The activist's personal carbon footprint does not refute the scientific case for reducing emissions.",
      },
      {
        argument:
          "You're telling me to budget my money? You went bankrupt two years ago! I don't need your financial advice.",
        correctAnswer: "Tu Quoque",
        options: [
          "Tu Quoque",
          "Appeal to Emotion",
          "Bandwagon",
          "False Dilemma",
        ],
        explanation:
          "A person's past financial mistakes do not make their current budgeting advice logically incorrect.",
      },
      {
        argument:
          "You're lecturing me about work-life balance? I've seen you answer emails at midnight. Your advice is hypocritical and worthless.",
        correctAnswer: "Tu Quoque",
        options: ["Ad Hominem", "Tu Quoque", "Red Herring", "Straw Man"],
        explanation:
          "The speaker's personal habits don't invalidate the advice — good counsel can come from imperfect practitioners.",
      },
    ],
  },
  {
    id: "false_cause",
    name: "False Cause",
    aliases: ["Post Hoc", "Correlation vs. Causation", "Non Causa Pro Causa"],
    definition:
      "Assuming that because two things are correlated or one followed the other, one must have caused the other.",
    belt: "blue",
    examples: [
      {
        argument:
          "Ever since they put up 5G towers in our neighborhood, more people have been getting headaches. The towers are clearly causing health problems.",
        correctAnswer: "False Cause",
        options: [
          "Slippery Slope",
          "False Cause",
          "Hasty Generalization",
          "Appeal to Emotion",
        ],
        explanation:
          "The timing of the towers and the headaches may be coincidental — correlation alone does not prove causation.",
      },
      {
        argument:
          "Our company started using a new project management tool last quarter, and revenue went up 15%. The tool is driving our growth.",
        correctAnswer: "False Cause",
        options: [
          "Appeal to Authority",
          "Bandwagon",
          "False Cause",
          "Circular Reasoning",
        ],
        explanation:
          "Revenue growth could be caused by many factors; the new tool's adoption happening first does not prove it caused the increase.",
      },
      {
        argument:
          "Crime rates dropped after the city installed more streetlights, proving that better lighting prevents crime.",
        correctAnswer: "False Cause",
        options: [
          "False Cause",
          "Red Herring",
          "False Dilemma",
          "Straw Man",
        ],
        explanation:
          "The drop in crime could be due to other factors like seasonal changes, policing, or economic shifts — the streetlights alone are not proven causal.",
      },
      {
        argument:
          "I started wearing my lucky socks and then won three games in a row. The socks are clearly the reason we're winning.",
        correctAnswer: "False Cause",
        options: [
          "Hasty Generalization",
          "False Cause",
          "Bandwagon",
          "Circular Reasoning",
        ],
        explanation:
          "Temporal coincidence between wearing socks and winning doesn't establish a causal relationship — many other factors determine game outcomes.",
      },
    ],
  },
  {
    id: "appeal_to_nature",
    name: "Appeal to Nature",
    aliases: ["Naturalistic Fallacy", "Natural is Better"],
    definition:
      "Arguing that something is good because it is natural, or bad because it is unnatural.",
    belt: "blue",
    examples: [
      {
        argument:
          "I only give my kids natural herbal remedies — chemicals from pharmaceutical companies can't be good for you because they're artificial.",
        correctAnswer: "Appeal to Nature",
        options: [
          "Appeal to Emotion",
          "Appeal to Nature",
          "False Dilemma",
          "Hasty Generalization",
        ],
        explanation:
          "Whether a substance is natural or synthetic says nothing about its safety or efficacy — arsenic is natural and aspirin is synthetic.",
      },
      {
        argument:
          "Organic food is always healthier than conventionally grown food because it's produced the way nature intended.",
        correctAnswer: "Appeal to Nature",
        options: [
          "Bandwagon",
          "Appeal to Authority",
          "Appeal to Nature",
          "Circular Reasoning",
        ],
        explanation:
          "The label 'organic' does not automatically guarantee superior health outcomes — naturalness is not a reliable measure of nutritional value.",
      },
      {
        argument:
          "Humans aren't meant to stare at screens all day — it's unnatural, and that's why it's bad for mental health.",
        correctAnswer: "Appeal to Nature",
        options: [
          "Slippery Slope",
          "False Cause",
          "Appeal to Nature",
          "Red Herring",
        ],
        explanation:
          "Something being evolutionarily novel does not automatically make it harmful — the health effects of screens require evidence, not appeals to what is 'natural.'",
      },
      {
        argument:
          "We shouldn't use lab-grown meat because it's not how nature intended us to get protein. If it's artificial, it can't be as good for you.",
        correctAnswer: "Appeal to Nature",
        options: [
          "Appeal to Nature",
          "False Dilemma",
          "Hasty Generalization",
          "Appeal to Emotion",
        ],
        explanation:
          "Whether food is 'natural' or lab-produced says nothing about its nutritional value or safety — the naturalness of a source doesn't determine its health effects.",
      },
    ],
  },
  {
    id: "equivocation",
    name: "Equivocation",
    aliases: ["Ambiguity", "Double Meaning"],
    definition:
      "Using a word with multiple meanings in different parts of an argument, making the conclusion misleading.",
    belt: "blue",
    examples: [
      {
        argument:
          "The sign says 'fine for parking here,' so it must be perfectly fine to park in this spot.",
        correctAnswer: "Equivocation",
        options: [
          "Circular Reasoning",
          "Equivocation",
          "Straw Man",
          "Red Herring",
        ],
        explanation:
          "The word 'fine' is used as a noun (a monetary penalty) on the sign but interpreted as an adjective (acceptable) in the conclusion.",
      },
      {
        argument:
          "Scientists say we should question everything. I'm questioning the science on vaccines. So I'm doing exactly what scientists recommend.",
        correctAnswer: "Equivocation",
        options: [
          "Equivocation",
          "Appeal to Authority",
          "Tu Quoque",
          "Bandwagon",
        ],
        explanation:
          "The word 'question' shifts from rigorous peer-reviewed inquiry to casual personal skepticism, which are fundamentally different activities.",
      },
      {
        argument:
          "The Constitution protects our right to bear arms. A nuclear weapon is a type of arm. Therefore, the Constitution protects my right to own nuclear weapons.",
        correctAnswer: "Equivocation",
        options: [
          "Slippery Slope",
          "False Dilemma",
          "Equivocation",
          "Whataboutism",
        ],
        explanation:
          "The word 'arms' is shifted from its historical meaning of personal firearms to an absurdly broad interpretation that includes weapons of mass destruction.",
      },
      {
        argument:
          "Evolution is 'just a theory.' And a theory is just a guess. So evolution is basically just a guess.",
        correctAnswer: "Equivocation",
        options: [
          "Equivocation",
          "Straw Man",
          "Circular Reasoning",
          "Appeal to Authority",
        ],
        explanation:
          "The word 'theory' in everyday language means 'guess,' but in science it means a well-substantiated explanation supported by evidence — conflating these meanings is misleading.",
      },
    ],
  },
  {
    id: "sunk_cost",
    name: "Sunk Cost Fallacy",
    aliases: ["Throwing Good Money After Bad", "Concorde Fallacy"],
    definition:
      "Continuing a course of action because of previously invested resources (time, money, effort), even when it's no longer rational to do so.",
    belt: "brown",
    examples: [
      {
        argument:
          "I've already spent three years in this graduate program and I'm miserable, but I can't quit now — it would mean those three years were wasted.",
        correctAnswer: "Sunk Cost Fallacy",
        options: [
          "Appeal to Emotion",
          "False Dilemma",
          "Sunk Cost Fallacy",
          "Slippery Slope",
        ],
        explanation:
          "The three years are gone regardless — future decisions should be based on expected future outcomes, not past investments that cannot be recovered.",
      },
      {
        argument:
          "We've already invested $50 million into this fighter jet project. Even though it's over budget and underperforming, canceling it now would waste all that money.",
        correctAnswer: "Sunk Cost Fallacy",
        options: [
          "Sunk Cost Fallacy",
          "Bandwagon",
          "False Cause",
          "Appeal to Authority",
        ],
        explanation:
          "The $50 million is already spent whether the project continues or not — the rational choice depends on future costs and benefits, not past expenditures.",
      },
    ],
  },
  {
    id: "loaded_question",
    name: "Loaded Question",
    aliases: ["Complex Question", "Plurium Interrogationum"],
    definition:
      "Asking a question that contains an unjustified assumption, making any direct answer an admission of that assumption.",
    belt: "brown",
    examples: [
      {
        argument:
          "Have you stopped spreading conspiracy theories on your podcast yet?",
        correctAnswer: "Loaded Question",
        options: [
          "Ad Hominem",
          "Loaded Question",
          "Straw Man",
          "Circular Reasoning",
        ],
        explanation:
          "The question presupposes that the person was spreading conspiracy theories — answering 'yes' or 'no' both accept that unproven premise.",
      },
      {
        argument:
          "When is the government going to admit that the new tax policy was designed to hurt the middle class?",
        correctAnswer: "Loaded Question",
        options: [
          "Appeal to Emotion",
          "False Dilemma",
          "Loaded Question",
          "Whataboutism",
        ],
        explanation:
          "The question embeds the unproven claim that the policy was intentionally designed to harm the middle class, forcing any answer to accept that framing.",
      },
    ],
  },
];

export const beltLevels = [
  { name: "White Belt", color: "#E8E8E8", fallacies: 6, label: "Fundamentals" },
  { name: "Yellow Belt", color: "#F5D442", fallacies: 12, label: "Foundations" },
  { name: "Orange Belt", color: "#FF9800", fallacies: 18, label: "Developing" },
  { name: "Green Belt", color: "#4CAF50", fallacies: 24, label: "Intermediate" },
  { name: "Blue Belt", color: "#2196F3", fallacies: 30, label: "Advanced" },
  { name: "Purple Belt", color: "#9C27B0", fallacies: 36, label: "Specialist" },
  { name: "Brown Belt", color: "#795548", fallacies: 42, label: "Expert" },
  { name: "Red Belt", color: "#F44336", fallacies: 46, label: "Elite" },
  { name: "Black Belt", color: "#1A1A1A", fallacies: 50, label: "Master" },
] as const;
