export interface SteelManScenario {
  id: string;
  category: "politics" | "tech-ethics" | "social";
  position: string;
  context: string;
  hints: string[];
  difficulty: 1 | 2 | 3;
  tags: string[];
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
    difficulty: 2,
    tags: ["immigration", "labor", "policy"],
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
    difficulty: 3,
    tags: ["constitutional-rights", "public-safety", "governance"],
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
    difficulty: 2,
    tags: ["healthcare", "economics", "governance"],
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
    difficulty: 3,
    tags: ["democracy", "federalism", "representation"],
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
    difficulty: 3,
    tags: ["economics", "taxation", "inequality"],
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
    difficulty: 2,
    tags: ["privacy", "public-safety", "artificial-intelligence"],
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
    difficulty: 3,
    tags: ["free-speech", "misinformation", "platform-power"],
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
    difficulty: 2,
    tags: ["privacy", "technology", "consumer-rights"],
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
    difficulty: 1,
    tags: ["youth-safety", "technology", "mental-health"],
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
    difficulty: 2,
    tags: ["artificial-intelligence", "existential-risk", "labor"],
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
    difficulty: 2,
    tags: ["education", "equity", "assessment"],
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
    difficulty: 3,
    tags: ["culture", "free-expression", "identity"],
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
    difficulty: 2,
    tags: ["free-speech", "accountability", "social-media"],
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
    difficulty: 3,
    tags: ["inequality", "social-mobility", "philosophy"],
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
    difficulty: 2,
    tags: ["free-speech", "education", "tolerance"],
  },

  // =============================================
  // NEW SCENARIOS (15) — Sprint 2
  // =============================================

  // --- Politics (5) ---
  {
    id: "universal-basic-income",
    category: "politics",
    position:
      "Every citizen should receive a universal basic income regardless of employment status.",
    context:
      "Often dismissed as 'paying people to be lazy,' but there are substantial economic and social arguments for providing a basic income floor.",
    hints: [
      "Consider how automation is displacing jobs faster than retraining can keep up",
      "Think about the massive bureaucracy of means-tested welfare and how UBI simplifies it",
      "What do pilot programs in Finland, Stockton, and Kenya actually show?",
      "How might a guaranteed floor enable entrepreneurship and risk-taking?",
    ],
    difficulty: 2,
    tags: ["economics", "welfare", "automation"],
  },
  {
    id: "mandatory-voting",
    category: "politics",
    position: "Voting should be mandatory for all eligible citizens.",
    context:
      "Critics call this an infringement on freedom, but proponents argue it addresses fundamental democratic representation problems.",
    hints: [
      "Consider how voluntary voting skews toward wealthier and older demographics",
      "Think about the legitimacy granted by genuine full participation",
      "How does mandatory voting reduce the influence of extreme polarization?",
      "What can we learn from Australia, where mandatory voting has worked for a century?",
    ],
    difficulty: 2,
    tags: ["democracy", "civic-duty", "representation"],
  },
  {
    id: "student-debt-forgiveness",
    category: "politics",
    position:
      "The government should forgive most or all outstanding student loan debt.",
    context:
      "Often framed as 'rewarding bad decisions,' but there are broader economic and equity arguments about systemic issues in higher education financing.",
    hints: [
      "Consider the macroeconomic drag of debt on homeownership and family formation",
      "Think about the historical shift from publicly funded to debt-financed higher education",
      "How did predatory lending and for-profit institutions target vulnerable populations?",
      "What is the comparison to other government write-offs like corporate bailouts?",
    ],
    difficulty: 2,
    tags: ["education", "economics", "equity"],
  },
  {
    id: "defunding-police",
    category: "politics",
    position:
      "Significant portions of police budgets should be redirected to social services.",
    context:
      "Often caricatured as wanting no law enforcement, but the actual policy position is about resource reallocation to better address root causes of crime.",
    hints: [
      "Consider how much police time is spent responding to mental health crises and homelessness",
      "Think about the evidence for violence intervention and community health programs",
      "Compare outcomes between enforcement-first and prevention-first spending",
      "What do pilot programs in cities like Denver and Eugene actually show?",
    ],
    difficulty: 3,
    tags: ["criminal-justice", "public-safety", "social-services"],
  },
  {
    id: "criminal-justice-reform",
    category: "politics",
    position:
      "The criminal justice system should prioritize rehabilitation over punishment.",
    context:
      "Often seen as 'soft on crime,' but there is substantial evidence that rehabilitation-focused systems produce better outcomes for public safety.",
    hints: [
      "Consider recidivism rates under punitive vs. rehabilitative approaches",
      "Think about the economic costs of mass incarceration ($80B+ annually in the US)",
      "What does the evidence from Nordic prison systems show about reoffending?",
      "How does incarceration affect families and communities beyond the individual?",
    ],
    difficulty: 2,
    tags: ["incarceration", "rehabilitation", "public-safety"],
  },

  // --- Tech Ethics (5) ---
  {
    id: "social-media-age-restrict",
    category: "tech-ethics",
    position:
      "Social media platforms should be legally required to verify users are at least 16 years old.",
    context:
      "Critics argue this is unenforceable or amounts to surveillance, but growing evidence links early social media use to developmental harm.",
    hints: [
      "Consider the emerging research linking social media to teen anxiety and depression",
      "Think about the consent problem — can a 12-year-old meaningfully consent to data collection?",
      "What parallels exist with other age-restricted activities like driving or alcohol?",
      "How does the responsibility gap between platforms and parents currently fail children?",
    ],
    difficulty: 1,
    tags: ["youth-safety", "regulation", "mental-health"],
  },
  {
    id: "ai-in-education",
    category: "tech-ethics",
    position:
      "AI tutoring systems should replace traditional homework and become central to K-12 education.",
    context:
      "Often met with fears about replacing teachers or enabling cheating, but there are compelling arguments about personalized learning and equity.",
    hints: [
      "Consider how one-on-one tutoring consistently outperforms classroom instruction (Bloom's 2-sigma problem)",
      "Think about the equity gap — wealthy families hire tutors while others cannot",
      "How can AI identify and address individual learning gaps in real time?",
      "What if the teacher's role shifted from lecturer to mentor and facilitator?",
    ],
    difficulty: 2,
    tags: ["education", "artificial-intelligence", "equity"],
  },
  {
    id: "right-to-repair",
    category: "tech-ethics",
    position:
      "Manufacturers should be legally required to provide repair tools, parts, and documentation to consumers.",
    context:
      "Companies argue this compromises safety and intellectual property, but there are strong arguments about ownership rights and environmental impact.",
    hints: [
      "Consider the e-waste crisis — 50M+ tons annually, much of it from unrepairable devices",
      "Think about the historical norm: cars, appliances, and tools were always repairable",
      "How do repair restrictions disproportionately affect rural and low-income communities?",
      "What role does planned obsolescence play in corporate revenue models?",
    ],
    difficulty: 1,
    tags: ["consumer-rights", "environment", "ownership"],
  },
  {
    id: "algorithmic-transparency",
    category: "tech-ethics",
    position:
      "Companies should be required to publicly disclose how their algorithms make decisions that affect people.",
    context:
      "Often resisted as threatening trade secrets or being technically infeasible, but the case for transparency grows as algorithmic decisions affect hiring, lending, and criminal justice.",
    hints: [
      "Consider documented cases of algorithmic bias in hiring, lending, and parole decisions",
      "Think about the accountability gap when consequential decisions are opaque",
      "What parallels exist with financial disclosure and food labeling requirements?",
      "How could transparency actually build rather than erode consumer trust?",
    ],
    difficulty: 3,
    tags: ["transparency", "bias", "regulation"],
  },
  {
    id: "data-privacy-regulation",
    category: "tech-ethics",
    position:
      "Governments should implement strict data privacy regulations similar to or exceeding the EU's GDPR.",
    context:
      "Often opposed as stifling innovation or being too burdensome for small businesses, but there are compelling arguments about fundamental rights and market correction.",
    hints: [
      "Consider the massive information asymmetry between companies and users",
      "Think about the long-term economic value of consumer trust in digital services",
      "How do data breaches create real, measurable harm for individuals?",
      "Why has the 'notice and consent' model failed to protect people in practice?",
    ],
    difficulty: 2,
    tags: ["privacy", "regulation", "digital-rights"],
  },

  // --- Social Issues (5) ---
  {
    id: "nuclear-energy",
    category: "social",
    position:
      "Nuclear energy should be a central part of the strategy to combat climate change.",
    context:
      "Often dismissed due to fears about safety and waste, but there are strong arguments about nuclear's essential role in reliable, low-carbon energy production.",
    hints: [
      "Consider the carbon footprint comparison — nuclear is comparable to wind and solar per kWh",
      "Think about modern reactor designs (Gen IV, SMRs) and how they address historical safety concerns",
      "What is the intermittency problem with relying on renewables alone?",
      "How much land and resources do different energy sources actually require?",
    ],
    difficulty: 2,
    tags: ["energy", "climate", "environment"],
  },
  {
    id: "remote-work-mandates",
    category: "social",
    position:
      "Companies should be required to offer remote work options for any role that can be performed remotely.",
    context:
      "Critics argue this infringes on business autonomy and harms collaboration, but there are significant equity and productivity arguments for remote work.",
    hints: [
      "Consider the disability and caregiving access improvements remote work provides",
      "Think about the environmental impact of commuting (transportation is the largest emissions sector)",
      "What does the productivity evidence from Stanford and other studies actually show?",
      "How does remote work expand job access beyond expensive metro areas?",
    ],
    difficulty: 1,
    tags: ["labor", "equity", "environment"],
  },
  {
    id: "space-exploration-funding",
    category: "social",
    position:
      "Government spending on space exploration should be significantly increased, even at the cost of other programs.",
    context:
      "Often mocked as frivolous when there are problems on Earth, but there are practical, strategic, and existential arguments for space investment.",
    hints: [
      "Consider technology spinoffs — GPS, memory foam, water purification, and medical imaging all came from space research",
      "Think about asteroid mining and how it could address resource scarcity",
      "What is the existential risk argument for becoming multi-planetary?",
      "How does NASA's budget (~0.5% of federal spending) compare to what people assume it is?",
    ],
    difficulty: 2,
    tags: ["science", "investment", "existential-risk"],
  },
  {
    id: "immigration-points-system",
    category: "social",
    position:
      "Immigration policy should be restructured around a points-based system prioritizing skills and economic contribution.",
    context:
      "Often criticized as dehumanizing or elitist, but countries like Canada and Australia have built successful immigration systems around this model.",
    hints: [
      "Consider how points systems can actually increase total immigration numbers",
      "Think about the economic evidence from Canada and Australia's outcomes",
      "How might a transparent points system reduce discrimination compared to discretionary decisions?",
      "What is the right balance between economic immigration and humanitarian obligations?",
    ],
    difficulty: 3,
    tags: ["immigration", "economics", "policy"],
  },
  {
    id: "four-day-work-week",
    category: "social",
    position:
      "A four-day, 32-hour work week should become the standard, with no reduction in pay.",
    context:
      "Often dismissed as economically unrealistic, but there is growing evidence from large-scale trials and historical precedent for shorter work weeks.",
    hints: [
      "Consider the productivity evidence from Iceland's and the UK's large-scale trials",
      "Think about the historical pattern — we moved from 6-day to 5-day weeks with similar objections",
      "How does the current burnout and mental health crisis relate to overwork?",
      "What does rising automation and output-per-worker suggest about the need for fewer hours?",
    ],
    difficulty: 1,
    tags: ["labor", "productivity", "well-being"],
  },

  // =============================================
  // NEW SCENARIOS (10) — Content Mega-Pack
  // =============================================

  {
    id: "gun-control-ban-semi-auto",
    category: "politics",
    position:
      "Civilian ownership of semi-automatic firearms should be banned.",
    context:
      "Often dismissed as 'wanting to disarm law-abiding citizens,' but there are evidence-based public health and policy arguments for restricting high-capacity weapons.",
    hints: [
      "Consider the statistical relationship between firearm availability and mass casualty events",
      "Think about how other high-income countries with strict gun laws compare on gun deaths per capita",
      "What does the public health framework — treating gun violence as an epidemic — suggest about access reduction?",
      "How do military-designed weapon features differ from those needed for hunting or home defense?",
    ],
    difficulty: 3,
    tags: ["gun-control", "public-health", "policy"],
  },
  {
    id: "open-borders-immigration",
    category: "politics",
    position:
      "Countries should move toward open borders with minimal immigration restrictions.",
    context:
      "Easily mocked as 'naive' or 'suicidal,' but there are serious economic, moral, and historical arguments for dramatically freer migration.",
    hints: [
      "Consider the economic research estimating that open borders could double world GDP by unlocking trapped labor productivity",
      "Think about the moral arbitrariness of birthplace — why should where you're born determine your life opportunities?",
      "How did the relatively open borders of the 19th-century U.S. and EU's Schengen zone actually work in practice?",
      "What would happen if labor could move as freely as capital and goods already do?",
    ],
    difficulty: 3,
    tags: ["immigration", "economics", "human-rights"],
  },
  {
    id: "single-payer-healthcare",
    category: "politics",
    position:
      "The U.S. should replace private insurance with a single-payer healthcare system.",
    context:
      "Often attacked as 'socialism' or 'government takeover,' but most developed nations use some form of universal coverage with strong outcomes data.",
    hints: [
      "Consider the administrative overhead — the U.S. spends 34% of healthcare dollars on administration vs. 17% in Canada",
      "Think about the bargaining power a single payer has to negotiate drug prices and procedure costs",
      "How does the fragmented U.S. system create coverage gaps that produce worse aggregate outcomes?",
      "What do international comparisons of life expectancy, infant mortality, and per-capita spending actually show?",
    ],
    difficulty: 2,
    tags: ["healthcare", "economics", "policy"],
  },
  {
    id: "ai-licensing-moratorium",
    category: "tech-ethics",
    position:
      "Governments should require pre-approval licensing for training AI models above a certain capability threshold.",
    context:
      "Tech companies argue this kills innovation, but there are compelling arguments from nuclear and pharmaceutical regulation precedents.",
    hints: [
      "Consider the precedent: we already require pre-approval for drugs, nuclear reactors, and aircraft — why not powerful AI?",
      "Think about the asymmetry: companies capture benefits while society bears catastrophic risks",
      "What happens when capability growth outpaces our ability to understand what these systems will do?",
      "How does the 'move fast and break things' philosophy scale when the things being broken are labor markets or democratic processes?",
    ],
    difficulty: 3,
    tags: ["artificial-intelligence", "regulation", "governance"],
  },
  {
    id: "school-vouchers",
    category: "social",
    position:
      "Parents should receive government-funded vouchers to send their children to any school, including private and religious ones.",
    context:
      "Critics call this 'defunding public schools,' but there are genuine arguments about educational freedom, competition, and equity for low-income families.",
    hints: [
      "Consider how wealthy families already have school choice through residential selection — vouchers extend this to lower-income families",
      "Think about the competitive pressure argument: when schools must compete for students, quality may improve",
      "What does the evidence from Milwaukee, Indiana, and Sweden's voucher programs actually show?",
      "How does one-size-fits-all schooling fail children with different learning needs, values, or circumstances?",
    ],
    difficulty: 2,
    tags: ["education", "equity", "school-choice"],
  },
  {
    id: "minimum-wage-25",
    category: "politics",
    position:
      "The federal minimum wage should be raised to at least $22 per hour.",
    context:
      "Often dismissed as a 'job killer,' but there is substantial evidence that moderate minimum wage increases have smaller employment effects than classical theory predicts.",
    hints: [
      "Consider the Card-Krueger natural experiment and subsequent replications showing minimal job losses",
      "Think about the monopsony model — in concentrated labor markets, employers pay below competitive wages",
      "How does a higher wage floor reduce turnover costs and increase productivity through efficiency wages?",
      "What has actually happened in cities like Seattle and states that raised their minimums significantly?",
    ],
    difficulty: 2,
    tags: ["economics", "labor", "inequality"],
  },
  {
    id: "nuclear-phase-out",
    category: "social",
    position:
      "Nuclear power should be phased out entirely, even to fight climate change.",
    context:
      "Often dismissed as irrational fear, but there are real economic, environmental justice, and risk arguments against nuclear energy.",
    hints: [
      "Consider the full lifecycle costs: nuclear plants consistently run over budget and over schedule (Vogtle, Hinkley Point C, Olkiluoto)",
      "Think about environmental justice — uranium mining disproportionately affects Indigenous communities",
      "What is the unresolved waste storage problem? No country has a permanent repository operating at scale",
      "How do the plummeting costs of renewables plus storage change the economic case for new nuclear?",
    ],
    difficulty: 2,
    tags: ["energy", "environment", "economics"],
  },
  {
    id: "social-media-no-ban-minors",
    category: "tech-ethics",
    position:
      "Banning minors from social media would cause more harm than it prevents.",
    context:
      "Feels counterintuitive when headlines focus on teen mental health crises, but there are real arguments about digital literacy, social connection, and enforcement costs.",
    hints: [
      "Consider that LGBTQ+ youth, rural teens, and those with disabilities often rely on online communities for essential support",
      "Think about enforcement: age verification at scale requires mass identity surveillance — a cure potentially worse than the disease",
      "What does the evidence actually show about causation vs. correlation between social media and teen mental health?",
      "How might prohibition drive teens to unmoderated, unmonitored platforms that are actually more dangerous?",
    ],
    difficulty: 2,
    tags: ["youth-safety", "digital-rights", "mental-health"],
  },
  {
    id: "mandatory-office-return",
    category: "social",
    position:
      "Companies are right to mandate full-time return to office for all employees.",
    context:
      "Easy to dismiss as backward-thinking management, but there are legitimate arguments about collaboration, mentorship, and organizational culture.",
    hints: [
      "Consider the mentorship and apprenticeship model — junior employees learn by osmosis and proximity to senior colleagues",
      "Think about weak-tie networks: spontaneous hallway conversations generate cross-team innovation that Zoom can't replicate",
      "What does the research on remote work show about career advancement disparities for remote vs. in-office workers?",
      "How does physical presence strengthen organizational culture and trust in ways that are hard to measure but real?",
    ],
    difficulty: 1,
    tags: ["labor", "management", "culture"],
  },
  {
    id: "meat-consumption-tax",
    category: "social",
    position:
      "Governments should impose heavy taxes on meat consumption to fight climate change and improve public health.",
    context:
      "Often ridiculed as 'nanny state' overreach, but there are strong environmental, public health, and economic externality arguments for pricing meat's true costs.",
    hints: [
      "Consider that livestock produces 14.5% of global greenhouse emissions — more than all transportation combined",
      "Think about the externality argument: meat prices don't reflect the environmental, health, and antibiotic resistance costs society bears",
      "How do existing 'sin taxes' on tobacco and sugar-sweetened beverages provide a precedent and effectiveness model?",
      "What does the WHO classification of processed meat as a Group 1 carcinogen suggest about public health policy?",
    ],
    difficulty: 2,
    tags: ["environment", "public-health", "policy"],
  },
];

export const categoryLabels: Record<SteelManScenario["category"], string> = {
  politics: "Politics & Policy",
  "tech-ethics": "Tech Ethics",
  social: "Social Issues",
};
