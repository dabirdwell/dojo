export interface SteelManScenario {
  id: string;
  category: "politics" | "tech-ethics" | "social";
  position: string;
  context: string;
  hints: string[];
}

export const steelmanScenarios: SteelManScenario[] = [
  // --- Politics (5) ---
  {
    id: "immigration-restrict",
    category: "politics",
    position: "Countries should strictly limit immigration.",
    context:
      "This is often dismissed as xenophobia, but there are legitimate policy arguments about labor markets, public services, and integration capacity.",
    hints: [
      "Consider wage impacts on low-income workers",
      "Think about infrastructure and public service capacity",
      "What are the integration challenges communities face?",
    ],
  },
  {
    id: "gun-rights",
    category: "politics",
    position: "Citizens should have the right to own firearms with minimal regulation.",
    context:
      "Often reduced to 'they just like guns,' but the position draws on constitutional, historical, and practical arguments about self-defense and state power.",
    hints: [
      "Consider the historical context of armed citizenry",
      "Think about rural communities where police response is slow",
      "What role does self-defense play for vulnerable populations?",
    ],
  },
  {
    id: "universal-healthcare-oppose",
    category: "politics",
    position: "Government-run universal healthcare is a bad idea.",
    context:
      "Frequently dismissed as 'wanting people to die,' but there are serious economic and quality-of-care arguments worth engaging with.",
    hints: [
      "Consider innovation incentives in pharmaceutical development",
      "Think about wait times and resource allocation",
      "What are the efficiency arguments for market competition?",
    ],
  },
  {
    id: "electoral-college",
    category: "politics",
    position: "The Electoral College should be preserved, not replaced by popular vote.",
    context:
      "Often called 'undemocratic,' but defenders argue it serves structural purposes in a federal republic.",
    hints: [
      "Consider why smaller states might need proportional influence",
      "Think about coalition-building across diverse regions",
      "What happens to rural issues under pure popular vote?",
    ],
  },
  {
    id: "tax-cuts-wealthy",
    category: "politics",
    position: "Tax cuts for high earners stimulate economic growth that benefits everyone.",
    context:
      "Often mocked as 'trickle-down,' but supply-side economics has genuine theoretical foundations worth understanding.",
    hints: [
      "Consider capital investment and job creation incentives",
      "Think about international competitiveness for business",
      "What evidence exists for growth effects of lower marginal rates?",
    ],
  },

  // --- Tech Ethics (5) ---
  {
    id: "ai-surveillance",
    category: "tech-ethics",
    position: "AI-powered surveillance cameras should be deployed in all public spaces.",
    context:
      "Easily dismissed as 'Orwellian,' but proponents have genuine safety arguments and point to real crime reduction data.",
    hints: [
      "Consider the impact on violent crime in high-risk areas",
      "Think about accountability when police misconduct occurs",
      "What safeguards could address privacy concerns?",
    ],
  },
  {
    id: "social-media-no-moderate",
    category: "tech-ethics",
    position: "Social media companies should not moderate political content.",
    context:
      "Often called 'enabling misinformation,' but the position raises important questions about who decides truth and the history of censorship.",
    hints: [
      "Consider the power concentration when companies decide truth",
      "Think about historical examples of censorship harming dissidents",
      "What are the risks of politically biased moderation?",
    ],
  },
  {
    id: "data-collection",
    category: "tech-ethics",
    position: "Companies collecting user data provides more benefit than harm to consumers.",
    context:
      "Usually framed as pure exploitation, but there are genuine arguments about personalization, free services, and medical research.",
    hints: [
      "Consider how free services are funded",
      "Think about medical breakthroughs from large datasets",
      "What personalization benefits do users actually value?",
    ],
  },
  {
    id: "child-smartphone-ban",
    category: "tech-ethics",
    position: "Children under 16 should be banned from using smartphones.",
    context:
      "Critics call this 'moral panic,' but there is growing evidence about developmental impacts and valid concerns about children's capacity to consent to data collection.",
    hints: [
      "Consider the mental health research on adolescents",
      "Think about informed consent and developing brains",
      "What does the precautionary principle suggest here?",
    ],
  },
  {
    id: "ai-replace-jobs",
    category: "tech-ethics",
    position: "We should slow down AI development even if it means losing competitive advantage.",
    context:
      "Often dismissed as 'Luddism,' but there are serious arguments about existential risk, labor displacement, and the pace of societal adaptation.",
    hints: [
      "Consider the alignment problem and catastrophic risk",
      "Think about the speed of displacement vs. retraining",
      "What historical parallels exist for technology regulation?",
    ],
  },

  // --- Social Issues (5) ---
  {
    id: "standardized-testing",
    category: "social",
    position: "Standardized testing should remain central to college admissions.",
    context:
      "Frequently attacked as 'biased and reductive,' but defenders argue tests provide an objective signal that actually helps disadvantaged students.",
    hints: [
      "Consider how tests level the playing field vs. subjective criteria",
      "Think about grade inflation across different school systems",
      "What happens to first-generation students without objective metrics?",
    ],
  },
  {
    id: "cultural-appropriation",
    category: "social",
    position: "The concept of 'cultural appropriation' is overused and counterproductive.",
    context:
      "Often called 'dismissing real harm,' but there are thoughtful arguments about cultural exchange, artistic freedom, and the difference between appreciation and exploitation.",
    hints: [
      "Consider how cultures have always evolved through exchange",
      "Think about who gets to define the boundaries of a culture",
      "What is the difference between harmful exploitation and mutual enrichment?",
    ],
  },
  {
    id: "cancel-culture",
    category: "social",
    position: "Public shaming campaigns ('cancel culture') do more harm than good.",
    context:
      "Defenders of accountability dismiss this as 'wanting no consequences,' but there are serious arguments about proportionality, mob dynamics, and rehabilitation.",
    hints: [
      "Consider the disproportionate impact on non-public figures",
      "Think about whether permanent punishment allows growth",
      "What are the chilling effects on honest discourse?",
    ],
  },
  {
    id: "meritocracy",
    category: "social",
    position: "Meritocracy is a myth and the concept itself causes harm.",
    context:
      "Often dismissed as 'making excuses,' but there are substantive arguments about structural barriers, luck, and how the meritocratic narrative justifies inequality.",
    hints: [
      "Consider how starting conditions affect outcomes",
      "Think about the psychological burden on those who 'fail' in a 'fair' system",
      "What does research say about the role of luck vs. effort?",
    ],
  },
  {
    id: "free-speech-campus",
    category: "social",
    position: "Universities should allow all speakers, including those with offensive views.",
    context:
      "Critics say this 'platforms hate,' but proponents draw on deep liberal traditions about the marketplace of ideas and the purpose of academic institutions.",
    hints: [
      "Consider the historical role of universities in challenging orthodoxy",
      "Think about who decides which views are too offensive",
      "What are the costs of insulating students from disagreeable ideas?",
    ],
  },
];

export const categoryLabels: Record<SteelManScenario["category"], string> = {
  politics: "Politics & Policy",
  "tech-ethics": "Tech Ethics",
  social: "Social Issues",
};
