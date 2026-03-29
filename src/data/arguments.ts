export type NodeType = "claim" | "premise" | "evidence" | "assumption";
export type ConnectionType = "supports" | "contradicts" | "qualifies";
export type ArgumentBelt = "white" | "green" | "black";

export interface ArgumentComponent {
  id: string;
  text: string;
}

export interface CorrectClassification {
  componentId: string;
  type: NodeType;
}

export interface CorrectConnection {
  fromId: string;
  toId: string;
  type: ConnectionType;
}

export interface ArgumentFallacy {
  componentId: string;
  fallacyName: string;
  explanation: string;
}

export interface ArgumentScenario {
  id: string;
  title: string;
  text: string;
  belt: ArgumentBelt;
  difficulty: number;
  components: ArgumentComponent[];
  claimId: string;
  classifications: CorrectClassification[];
  connections: CorrectConnection[];
  fallacies: ArgumentFallacy[];
}

export const argumentScenarios: ArgumentScenario[] = [
  // ─── WHITE BELT ───────────────────────────────────────────
  {
    id: "w1",
    title: "Video Games & Violence",
    text: "Video games cause real-world violence. Studies show gamers display more aggressive thoughts in lab settings. My cousin started playing shooters and became more irritable. Therefore, violent games should be banned to protect society.",
    belt: "white",
    difficulty: 1,
    components: [
      { id: "w1a", text: "Violent games should be banned to protect society" },
      { id: "w1b", text: "Video games cause real-world violence" },
      { id: "w1c", text: "Lab studies show increased aggressive thoughts in gamers" },
      { id: "w1d", text: "My cousin became irritable after playing shooters" },
    ],
    claimId: "w1a",
    classifications: [
      { componentId: "w1b", type: "premise" },
      { componentId: "w1c", type: "evidence" },
      { componentId: "w1d", type: "evidence" },
    ],
    connections: [
      { fromId: "w1b", toId: "w1a", type: "supports" },
      { fromId: "w1c", toId: "w1b", type: "supports" },
      { fromId: "w1d", toId: "w1b", type: "supports" },
    ],
    fallacies: [
      {
        componentId: "w1d",
        fallacyName: "Hasty Generalization",
        explanation: "One person's experience doesn't establish a causal link between games and real-world aggression.",
      },
    ],
  },
  {
    id: "w2",
    title: "Organic Food Benefits",
    text: "Everyone should switch to organic food. Organic farming doesn't use synthetic pesticides, which means the food must be healthier. Besides, Dr. Oz recommends organic on his show, so it's the right choice.",
    belt: "white",
    difficulty: 1,
    components: [
      { id: "w2a", text: "Everyone should switch to organic food" },
      { id: "w2b", text: "Organic farming doesn't use synthetic pesticides" },
      { id: "w2c", text: "No synthetic pesticides means the food must be healthier" },
      { id: "w2d", text: "Dr. Oz recommends organic, so it's the right choice" },
    ],
    claimId: "w2a",
    classifications: [
      { componentId: "w2b", type: "premise" },
      { componentId: "w2c", type: "assumption" },
      { componentId: "w2d", type: "premise" },
    ],
    connections: [
      { fromId: "w2b", toId: "w2a", type: "supports" },
      { fromId: "w2c", toId: "w2b", type: "supports" },
      { fromId: "w2d", toId: "w2a", type: "supports" },
    ],
    fallacies: [
      {
        componentId: "w2d",
        fallacyName: "Appeal to Authority",
        explanation: "A TV personality's endorsement doesn't constitute scientific evidence about nutrition.",
      },
    ],
  },
  {
    id: "w3",
    title: "Public Transit Funding",
    text: "Cities should invest more in public transportation. Research shows cities with robust transit have 30% less highway congestion. Reduced car usage also lowers carbon emissions, helping meet climate targets.",
    belt: "white",
    difficulty: 1,
    components: [
      { id: "w3a", text: "Cities should invest more in public transportation" },
      { id: "w3b", text: "Cities with robust transit have 30% less congestion" },
      { id: "w3c", text: "Reduced car usage lowers carbon emissions" },
      { id: "w3d", text: "Lower emissions help meet climate targets" },
    ],
    claimId: "w3a",
    classifications: [
      { componentId: "w3b", type: "evidence" },
      { componentId: "w3c", type: "premise" },
      { componentId: "w3d", type: "premise" },
    ],
    connections: [
      { fromId: "w3b", toId: "w3a", type: "supports" },
      { fromId: "w3c", toId: "w3a", type: "supports" },
      { fromId: "w3d", toId: "w3c", type: "supports" },
    ],
    fallacies: [],
  },
  {
    id: "w4",
    title: "Social Media & Teenagers",
    text: "Social media is destroying teenagers' mental health. If we don't ban it for minors immediately, an entire generation will be unable to form real friendships. You either support a total ban or you don't care about children.",
    belt: "white",
    difficulty: 1,
    components: [
      { id: "w4a", text: "Social media is destroying teenagers' mental health" },
      { id: "w4b", text: "Without a ban, no teenager will form real friendships" },
      { id: "w4c", text: "You either support a total ban or don't care about children" },
    ],
    claimId: "w4a",
    classifications: [
      { componentId: "w4b", type: "premise" },
      { componentId: "w4c", type: "premise" },
    ],
    connections: [
      { fromId: "w4b", toId: "w4a", type: "supports" },
      { fromId: "w4c", toId: "w4a", type: "supports" },
    ],
    fallacies: [
      {
        componentId: "w4b",
        fallacyName: "Slippery Slope",
        explanation: "Jumps from 'no ban' to 'no teenager will have friendships' without justifying the chain of consequences.",
      },
      {
        componentId: "w4c",
        fallacyName: "False Dilemma",
        explanation: "Presents only two options (total ban or indifference) when many intermediate positions exist.",
      },
    ],
  },

  // ─── GREEN BELT ───────────────────────────────────────────
  {
    id: "g1",
    title: "AI Regulation",
    text: "Artificial intelligence must be heavily regulated. Several tech leaders have warned about existential risk from unchecked AI development. The EU has already passed the AI Act, proving regulation is feasible. Some argue regulation stifles innovation, but unregulated industries have historically caused massive harm.",
    belt: "green",
    difficulty: 3,
    components: [
      { id: "g1a", text: "AI must be heavily regulated" },
      { id: "g1b", text: "Tech leaders warn about existential risk from unchecked AI" },
      { id: "g1c", text: "The EU passed the AI Act, proving regulation is feasible" },
      { id: "g1d", text: "Some argue regulation stifles innovation" },
      { id: "g1e", text: "Unregulated industries have historically caused massive harm" },
    ],
    claimId: "g1a",
    classifications: [
      { componentId: "g1b", type: "evidence" },
      { componentId: "g1c", type: "evidence" },
      { componentId: "g1d", type: "premise" },
      { componentId: "g1e", type: "evidence" },
    ],
    connections: [
      { fromId: "g1b", toId: "g1a", type: "supports" },
      { fromId: "g1c", toId: "g1a", type: "supports" },
      { fromId: "g1d", toId: "g1a", type: "contradicts" },
      { fromId: "g1e", toId: "g1d", type: "contradicts" },
    ],
    fallacies: [],
  },
  {
    id: "g2",
    title: "Universal Basic Income",
    text: "Universal basic income would benefit society. A pilot program in Finland showed participants reported higher well-being. Critics say it would make people lazy, but the Finnish data showed no significant decrease in employment. Of course, what worked in Finland's small trial might not scale to larger economies.",
    belt: "green",
    difficulty: 3,
    components: [
      { id: "g2a", text: "Universal basic income would benefit society" },
      { id: "g2b", text: "A Finnish pilot showed participants had higher well-being" },
      { id: "g2c", text: "Critics say UBI would make people lazy" },
      { id: "g2d", text: "Finnish data showed no significant decrease in employment" },
      { id: "g2e", text: "Finland's small trial might not scale to larger economies" },
    ],
    claimId: "g2a",
    classifications: [
      { componentId: "g2b", type: "evidence" },
      { componentId: "g2c", type: "premise" },
      { componentId: "g2d", type: "evidence" },
      { componentId: "g2e", type: "assumption" },
    ],
    connections: [
      { fromId: "g2b", toId: "g2a", type: "supports" },
      { fromId: "g2c", toId: "g2a", type: "contradicts" },
      { fromId: "g2d", toId: "g2c", type: "contradicts" },
      { fromId: "g2e", toId: "g2b", type: "qualifies" },
    ],
    fallacies: [],
  },
  {
    id: "g3",
    title: "Standardized Testing",
    text: "Standardized tests should be eliminated from college admissions. They're biased against low-income students who can't afford test prep. Harvard dropped the SAT requirement and still maintained class quality. Besides, Einstein was a poor test-taker, proving tests don't measure real intelligence.",
    belt: "green",
    difficulty: 3,
    components: [
      { id: "g3a", text: "Standardized tests should be eliminated from admissions" },
      { id: "g3b", text: "Tests are biased against low-income students" },
      { id: "g3c", text: "Harvard dropped the SAT and maintained class quality" },
      { id: "g3d", text: "Einstein was a poor test-taker, proving tests don't measure intelligence" },
    ],
    claimId: "g3a",
    classifications: [
      { componentId: "g3b", type: "premise" },
      { componentId: "g3c", type: "evidence" },
      { componentId: "g3d", type: "evidence" },
    ],
    connections: [
      { fromId: "g3b", toId: "g3a", type: "supports" },
      { fromId: "g3c", toId: "g3a", type: "supports" },
      { fromId: "g3d", toId: "g3a", type: "supports" },
    ],
    fallacies: [
      {
        componentId: "g3d",
        fallacyName: "Hasty Generalization",
        explanation: "One famous person's test performance doesn't prove a universal claim about all test-takers.",
      },
    ],
  },
  {
    id: "g4",
    title: "Remote Work Policies",
    text: "Companies should adopt permanent remote work. Productivity studies from 2020-2023 show remote workers are equally or more productive. Remote work also cuts commuting emissions significantly. However, some employees report feeling isolated, suggesting hybrid models might better balance productivity with well-being.",
    belt: "green",
    difficulty: 3,
    components: [
      { id: "g4a", text: "Companies should adopt permanent remote work" },
      { id: "g4b", text: "Studies show remote workers are equally or more productive" },
      { id: "g4c", text: "Remote work cuts commuting emissions significantly" },
      { id: "g4d", text: "Some employees report feeling isolated" },
      { id: "g4e", text: "Hybrid models might better balance productivity and well-being" },
    ],
    claimId: "g4a",
    classifications: [
      { componentId: "g4b", type: "evidence" },
      { componentId: "g4c", type: "premise" },
      { componentId: "g4d", type: "evidence" },
      { componentId: "g4e", type: "assumption" },
    ],
    connections: [
      { fromId: "g4b", toId: "g4a", type: "supports" },
      { fromId: "g4c", toId: "g4a", type: "supports" },
      { fromId: "g4d", toId: "g4a", type: "contradicts" },
      { fromId: "g4e", toId: "g4a", type: "qualifies" },
    ],
    fallacies: [],
  },

  // ─── BLACK BELT ───────────────────────────────────────────
  {
    id: "b1",
    title: "Healthcare Policy",
    text: "The US must adopt single-payer healthcare. Every other developed nation provides universal coverage and spends less per capita. Insurance companies profit while 27 million Americans lack coverage. Opponents claim wait times would increase, but Canadian emergency care has no significant delays. If we don't act now, healthcare costs will bankrupt the middle class within a decade.",
    belt: "black",
    difficulty: 5,
    components: [
      { id: "b1a", text: "The US must adopt single-payer healthcare" },
      { id: "b1b", text: "Other developed nations provide universal coverage at lower cost" },
      { id: "b1c", text: "Insurers profit while 27 million Americans lack coverage" },
      { id: "b1d", text: "Opponents claim wait times would increase" },
      { id: "b1e", text: "Canadian emergency care has no significant delays" },
      { id: "b1f", text: "Without action, healthcare will bankrupt the middle class in a decade" },
    ],
    claimId: "b1a",
    classifications: [
      { componentId: "b1b", type: "evidence" },
      { componentId: "b1c", type: "evidence" },
      { componentId: "b1d", type: "premise" },
      { componentId: "b1e", type: "evidence" },
      { componentId: "b1f", type: "premise" },
    ],
    connections: [
      { fromId: "b1b", toId: "b1a", type: "supports" },
      { fromId: "b1c", toId: "b1a", type: "supports" },
      { fromId: "b1d", toId: "b1a", type: "contradicts" },
      { fromId: "b1e", toId: "b1d", type: "contradicts" },
      { fromId: "b1f", toId: "b1a", type: "supports" },
    ],
    fallacies: [
      {
        componentId: "b1f",
        fallacyName: "Slippery Slope",
        explanation: "Predicts economic catastrophe within a specific timeframe without supporting data for that projection.",
      },
    ],
  },
  {
    id: "b2",
    title: "Immigration Economics",
    text: "Immigration restrictions should be relaxed because immigrants create economic value. The National Academy of Sciences found immigrants contribute more in taxes over their lifetimes than they receive in benefits. My grandfather came here with nothing and built a successful business, proving immigrants work harder than the native-born. Some worry about wage depression in low-skill sectors, though the evidence suggests this effect is small and temporary.",
    belt: "black",
    difficulty: 5,
    components: [
      { id: "b2a", text: "Immigration restrictions should be relaxed" },
      { id: "b2b", text: "Immigrants create economic value" },
      { id: "b2c", text: "NAS found immigrants contribute more in taxes than they receive" },
      { id: "b2d", text: "My grandfather built a business, proving immigrants work harder" },
      { id: "b2e", text: "Some worry about wage depression in low-skill sectors" },
      { id: "b2f", text: "Evidence suggests wage effects are small and temporary" },
    ],
    claimId: "b2a",
    classifications: [
      { componentId: "b2b", type: "premise" },
      { componentId: "b2c", type: "evidence" },
      { componentId: "b2d", type: "evidence" },
      { componentId: "b2e", type: "premise" },
      { componentId: "b2f", type: "evidence" },
    ],
    connections: [
      { fromId: "b2b", toId: "b2a", type: "supports" },
      { fromId: "b2c", toId: "b2b", type: "supports" },
      { fromId: "b2d", toId: "b2b", type: "supports" },
      { fromId: "b2e", toId: "b2a", type: "contradicts" },
      { fromId: "b2f", toId: "b2e", type: "qualifies" },
    ],
    fallacies: [
      {
        componentId: "b2d",
        fallacyName: "Hasty Generalization",
        explanation: "One family's success story doesn't prove a general claim about all immigrants vs. native-born citizens.",
      },
    ],
  },
  {
    id: "b3",
    title: "Surveillance & Privacy",
    text: "Government surveillance programs should be expanded to prevent terrorism. Since the NSA's programs began, numerous plots have been disrupted. If you have nothing to hide, you have nothing to fear. Critics invoke privacy rights, but the Constitution was written before the internet existed. A single successful attack could kill thousands, making security the top priority.",
    belt: "black",
    difficulty: 5,
    components: [
      { id: "b3a", text: "Government surveillance should be expanded" },
      { id: "b3b", text: "NSA programs have disrupted numerous terror plots" },
      { id: "b3c", text: "If you have nothing to hide, you have nothing to fear" },
      { id: "b3d", text: "The Constitution was written before the internet existed" },
      { id: "b3e", text: "A single attack could kill thousands" },
      { id: "b3f", text: "Critics invoke privacy rights against surveillance" },
    ],
    claimId: "b3a",
    classifications: [
      { componentId: "b3b", type: "evidence" },
      { componentId: "b3c", type: "premise" },
      { componentId: "b3d", type: "premise" },
      { componentId: "b3e", type: "premise" },
      { componentId: "b3f", type: "premise" },
    ],
    connections: [
      { fromId: "b3b", toId: "b3a", type: "supports" },
      { fromId: "b3c", toId: "b3a", type: "supports" },
      { fromId: "b3d", toId: "b3f", type: "contradicts" },
      { fromId: "b3e", toId: "b3a", type: "supports" },
      { fromId: "b3f", toId: "b3a", type: "contradicts" },
    ],
    fallacies: [
      {
        componentId: "b3c",
        fallacyName: "False Dilemma",
        explanation: "Frames surveillance as binary: either hide something or accept monitoring, ignoring legitimate privacy concerns.",
      },
      {
        componentId: "b3d",
        fallacyName: "Red Herring",
        explanation: "The age of the Constitution doesn't address whether its principles about privacy apply to new technology.",
      },
    ],
  },
  {
    id: "b4",
    title: "Education Reform",
    text: "Schools should replace traditional lectures with project-based learning. Finland uses minimal testing and emphasizes creative projects, and Finnish students rank among the top worldwide. Traditional lectures produce passive learners who merely memorize facts. Every education expert agrees project-based learning is superior. However, not all subjects lend themselves equally to project formats, and implementation requires extensive teacher retraining.",
    belt: "black",
    difficulty: 5,
    components: [
      { id: "b4a", text: "Schools should replace lectures with project-based learning" },
      { id: "b4b", text: "Finland uses creative projects with minimal testing" },
      { id: "b4c", text: "Finnish students rank among the top worldwide" },
      { id: "b4d", text: "Lectures produce passive learners who just memorize" },
      { id: "b4e", text: "Every expert agrees project-based learning is superior" },
      { id: "b4f", text: "Not all subjects suit project formats equally" },
      { id: "b4g", text: "Implementation requires extensive teacher retraining" },
    ],
    claimId: "b4a",
    classifications: [
      { componentId: "b4b", type: "evidence" },
      { componentId: "b4c", type: "evidence" },
      { componentId: "b4d", type: "premise" },
      { componentId: "b4e", type: "premise" },
      { componentId: "b4f", type: "premise" },
      { componentId: "b4g", type: "premise" },
    ],
    connections: [
      { fromId: "b4b", toId: "b4a", type: "supports" },
      { fromId: "b4c", toId: "b4b", type: "supports" },
      { fromId: "b4d", toId: "b4a", type: "supports" },
      { fromId: "b4e", toId: "b4a", type: "supports" },
      { fromId: "b4f", toId: "b4a", type: "qualifies" },
      { fromId: "b4g", toId: "b4a", type: "qualifies" },
    ],
    fallacies: [
      {
        componentId: "b4e",
        fallacyName: "Bandwagon",
        explanation: "Claiming universal expert consensus without citing evidence; education experts hold diverse views on pedagogy.",
      },
    ],
  },
];
