export type RealWorldCategory =
  | "fallacy-spotting"
  | "source-evaluation"
  | "steelman-challenge";

export interface RealWorldScenario {
  id: string;
  category: RealWorldCategory;
  headline: string;
  source: string;
  context: string;
  correctAnswer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  /** Multiple choice options — only for fallacy-spotting */
  options?: string[];
  /** Ideal credibility rating 1-5 — only for source-evaluation */
  idealCredibility?: number;
}

export const realWorldScenarios: RealWorldScenario[] = [
  // ─── FALLACY SPOTTING (10) ─────────────────────────────────────────────

  {
    id: "fs-1",
    category: "fallacy-spotting",
    headline: "Senator Dismisses Climate Bill Over Sponsor's Vacation",
    source: "National Policy Review",
    context:
      "During a Senate hearing, a lawmaker argued against a carbon reduction bill by pointing out that its sponsor recently flew on a private jet to a resort. 'How can we trust someone who doesn't even follow their own rules?' the senator said.",
    options: ["Ad Hominem", "Straw Man", "Appeal to Authority", "Red Herring"],
    correctAnswer: "Ad Hominem",
    explanation:
      "This attacks the person proposing the bill rather than the bill's content. Whether the sponsor is hypocritical has no bearing on whether the policy itself would reduce emissions effectively.",
    difficulty: 1,
  },
  {
    id: "fs-2",
    category: "fallacy-spotting",
    headline: "Tech CEO: 'Either We Adopt AI Now or Lose Everything'",
    source: "Business Insider Weekly",
    context:
      "A prominent tech executive told shareholders that the company must immediately integrate AI into every product line. 'It's simple — we either go all-in on AI right now, or our competitors will destroy us within two years. There is no middle ground.'",
    options: [
      "False Dilemma",
      "Slippery Slope",
      "Appeal to Fear",
      "Bandwagon",
    ],
    correctAnswer: "False Dilemma",
    explanation:
      "The CEO presents only two extreme options — full AI adoption or total failure — ignoring the many possible strategies between these poles, such as selective integration, phased rollouts, or investing in other competitive advantages.",
    difficulty: 1,
  },
  {
    id: "fs-3",
    category: "fallacy-spotting",
    headline: "Health Advocate: 'Renowned Doctor Endorses New Supplement'",
    source: "Wellness Today",
    context:
      "A marketing campaign for a new dietary supplement features an endorsement from a famous cardiac surgeon. 'Dr. M. Reynolds, one of the world's top heart surgeons, takes NutraPeak every morning. If it's good enough for the best, it's good enough for you.'",
    options: [
      "Appeal to Authority",
      "Ad Hominem",
      "Hasty Generalization",
      "Circular Reasoning",
    ],
    correctAnswer: "Appeal to Authority",
    explanation:
      "A cardiac surgeon's expertise is in heart surgery, not nutrition or supplement science. Their personal endorsement doesn't constitute scientific evidence for the supplement's efficacy.",
    difficulty: 1,
  },
  {
    id: "fs-4",
    category: "fallacy-spotting",
    headline: "Columnist: 'Allow Phone Voting, Next We'll Have AI Picking Our Leaders'",
    source: "The Daily Observer",
    context:
      "In an op-ed opposing a mobile voting pilot program, a columnist wrote: 'First they want us to vote from our phones. Next it'll be voting from smartwatches. Then they'll say AI can vote on our behalf. Before you know it, algorithms will be choosing our presidents.'",
    options: [
      "Slippery Slope",
      "Straw Man",
      "False Cause",
      "Appeal to Tradition",
    ],
    correctAnswer: "Slippery Slope",
    explanation:
      "The argument leaps from a specific proposal (mobile voting) to an absurd endpoint (AI choosing leaders) through a chain of unsupported escalations. Each step in the chain is presented as inevitable without evidence.",
    difficulty: 2,
  },
  {
    id: "fs-5",
    category: "fallacy-spotting",
    headline: "Opponent Distorts Universal Pre-K Proposal in Debate",
    source: "Metro News Network",
    context:
      "During a city council debate on universal pre-kindergarten, a council member said: 'My opponent wants the government to raise our children from birth. This is state-sponsored parenting, plain and simple.' The actual proposal covers 4-year-olds for 3 hours per day.",
    options: [
      "Straw Man",
      "Ad Hominem",
      "Red Herring",
      "False Equivalence",
    ],
    correctAnswer: "Straw Man",
    explanation:
      "The opponent exaggerates the proposal from '3 hours of pre-K for 4-year-olds' to 'government raising children from birth,' then attacks this distorted version. The actual proposal is far more limited than what's being argued against.",
    difficulty: 2,
  },
  {
    id: "fs-6",
    category: "fallacy-spotting",
    headline: "Commentator Links Rising Crime to New Immigration Policy",
    source: "Evening Standard Report",
    context:
      "A news commentator noted that crime rates rose 8% in the quarter after a new immigration policy took effect. 'The numbers don't lie — this policy brought crime to our city.' No analysis of other factors like economic conditions, policing changes, or seasonal patterns was mentioned.",
    options: [
      "False Cause",
      "Hasty Generalization",
      "Appeal to Fear",
      "Slippery Slope",
    ],
    correctAnswer: "False Cause",
    explanation:
      "Correlation is assumed to be causation. The crime increase happened after the policy change, but many other factors could explain it. Without controlling for variables like economic shifts, policing resources, or seasonal trends, the causal claim is unfounded.",
    difficulty: 2,
  },
  {
    id: "fs-7",
    category: "fallacy-spotting",
    headline: "Pundit: 'Millions of Parents Can't Be Wrong About Homeschooling'",
    source: "Family Values Forum",
    context:
      "In a segment on education reform, a television pundit argued: 'Over 3 million families in this country have chosen homeschooling. That many parents making the same choice is all the evidence you need that it works better than public schools.'",
    options: [
      "Bandwagon",
      "Appeal to Authority",
      "Circular Reasoning",
      "False Dilemma",
    ],
    correctAnswer: "Bandwagon",
    explanation:
      "The argument assumes that popularity equals effectiveness. The number of families choosing homeschooling doesn't constitute evidence about educational outcomes. Many factors drive schooling decisions beyond academic performance.",
    difficulty: 2,
  },
  {
    id: "fs-8",
    category: "fallacy-spotting",
    headline: "Economist Defends Tax Plan with Circular Logic",
    source: "The Fiscal Times",
    context:
      "When asked why a proposed flat tax would grow the economy, an economic advisor responded: 'The flat tax is pro-growth because it stimulates economic expansion. Economic expansion is what happens when you have a pro-growth tax policy like the flat tax.'",
    options: [
      "Circular Reasoning",
      "False Cause",
      "Appeal to Authority",
      "Red Herring",
    ],
    correctAnswer: "Circular Reasoning",
    explanation:
      "The advisor's argument is circular: the flat tax is pro-growth because it causes growth, and growth happens because the tax is pro-growth. No independent evidence or mechanism is provided — the conclusion is simply restated as the premise.",
    difficulty: 3,
  },
  {
    id: "fs-9",
    category: "fallacy-spotting",
    headline: "Union Leader Pivots to Executive Pay During Safety Debate",
    source: "Labor & Industry Report",
    context:
      "During a workplace safety hearing about factory ventilation standards, a union leader spent most of their testimony discussing CEO compensation packages. 'When executives make 300x what workers earn, how can we even talk about ventilation filters?'",
    options: [
      "Red Herring",
      "Straw Man",
      "Ad Hominem",
      "False Equivalence",
    ],
    correctAnswer: "Red Herring",
    explanation:
      "While executive pay may be a legitimate concern, it's irrelevant to the specific question of ventilation standards. Introducing this topic diverts attention from the actual safety issue under discussion.",
    difficulty: 3,
  },
  {
    id: "fs-10",
    category: "fallacy-spotting",
    headline: "Op-Ed Equates Social Media Moderation with Government Censorship",
    source: "The Liberty Chronicle",
    context:
      "An opinion piece argues: 'When a social media platform removes a post for misinformation, that is no different from a government banning books. Both are censorship of ideas, and both should be equally condemned under the First Amendment.'",
    options: [
      "False Equivalence",
      "Slippery Slope",
      "Appeal to Emotion",
      "Straw Man",
    ],
    correctAnswer: "False Equivalence",
    explanation:
      "The argument equates two fundamentally different things: a private company enforcing its terms of service versus government suppression of speech. The First Amendment applies to government action, not private platform policies. The power dynamics and legal frameworks are entirely different.",
    difficulty: 3,
  },

  // ─── SOURCE EVALUATION (10) ───────────────────────────────────────────

  {
    id: "se-1",
    category: "source-evaluation",
    headline: "Study Finds Mediterranean Diet Reduces Heart Disease Risk by 30%",
    source: "The New England Journal of Medicine (peer-reviewed study, n=7,447)",
    context:
      "A large randomized controlled trial conducted over 5 years across multiple medical centers found that participants following a Mediterranean diet supplemented with olive oil or nuts had significantly fewer cardiovascular events than the control group.",
    idealCredibility: 5,
    correctAnswer: "5",
    explanation:
      "This is a gold-standard source: a peer-reviewed study in a top medical journal, with a large sample size, randomized controlled design, and multi-year follow-up. The methodology is transparent and the journal has rigorous editorial standards.",
    difficulty: 1,
  },
  {
    id: "se-2",
    category: "source-evaluation",
    headline: "EXPOSED: The Superfood Big Pharma Doesn't Want You to Know About",
    source: "NaturalCuresRevealed.com (health blog, no author listed)",
    context:
      "An anonymous blog post claims that a common berry can cure diabetes, heart disease, and cancer. The article cites no studies but includes affiliate links to supplements. The site's 'About' page says it is 'dedicated to truths the mainstream won't tell you.'",
    idealCredibility: 1,
    correctAnswer: "1",
    explanation:
      "Multiple red flags: anonymous authorship, no cited studies, extraordinary medical claims, affiliate links indicating financial motivation, conspiracy-adjacent framing ('Big Pharma doesn't want you to know'), and no editorial oversight.",
    difficulty: 1,
  },
  {
    id: "se-3",
    category: "source-evaluation",
    headline: "New AI Regulation Bill Could Stifle Innovation, Industry Group Warns",
    source: "TechLobby Association press release",
    context:
      "A technology industry lobbying group issued a press release arguing that proposed AI safety regulations would cost the economy $500 billion and push AI development overseas. The release cites an internal economic analysis but does not share the methodology.",
    idealCredibility: 2,
    correctAnswer: "2",
    explanation:
      "Industry lobbying groups have a clear financial interest in opposing regulation. The $500B figure comes from their own unpublished analysis with hidden methodology. While the concerns may have some validity, this source has an obvious conflict of interest and lacks transparency.",
    difficulty: 2,
  },
  {
    id: "se-4",
    category: "source-evaluation",
    headline: "Teachers Report Declining Student Attention Spans Since Pandemic",
    source: "National Education Association survey of 2,100 teachers",
    context:
      "A professional teachers' association surveyed its members about classroom challenges. 78% reported shorter student attention spans compared to pre-pandemic levels. The survey was self-selected (voluntary response) and limited to union members.",
    idealCredibility: 3,
    correctAnswer: "3",
    explanation:
      "The source is a credible professional organization, but the survey has methodological limitations: voluntary response bias (teachers with stronger opinions are more likely to respond), subjective self-reporting, and a sample limited to union members rather than all teachers.",
    difficulty: 2,
  },
  {
    id: "se-5",
    category: "source-evaluation",
    headline: "Minimum Wage Increase Led to 15% Restaurant Job Losses, Study Claims",
    source: "Free Market Policy Center (think tank funded by restaurant industry)",
    context:
      "A policy think tank published a report finding significant job losses following a state minimum wage increase. The study was funded by a restaurant industry trade group. The methodology section notes they compared only two cities over a 6-month window.",
    idealCredibility: 2,
    correctAnswer: "2",
    explanation:
      "The funding source creates a clear conflict of interest — the restaurant industry has a financial stake in opposing minimum wage increases. The methodology is weak (two cities, short timeframe), making it easy to cherry-pick results. The think tank's name signals ideological framing.",
    difficulty: 2,
  },
  {
    id: "se-6",
    category: "source-evaluation",
    headline: "WHO Reports Global Measles Cases Up 79% in First Two Months of Year",
    source: "World Health Organization official bulletin",
    context:
      "The WHO published surveillance data showing a sharp increase in measles cases worldwide, attributed primarily to declining vaccination rates in several regions. The data aggregates reports from 194 member states through standardized reporting systems.",
    idealCredibility: 5,
    correctAnswer: "5",
    explanation:
      "The WHO is the authoritative international body for global health data, using standardized reporting from nearly all countries. Their surveillance systems are well-established, the data is transparent, and they have no commercial interest in the findings.",
    difficulty: 1,
  },
  {
    id: "se-7",
    category: "source-evaluation",
    headline: "Electric Vehicles Actually Produce More Lifetime Emissions, Expert Says",
    source: "YouTube video by automotive influencer (2.3M subscribers)",
    context:
      "A popular car review YouTuber published a video arguing that when you factor in battery manufacturing, mining, and grid electricity sources, EVs produce more total emissions than modern diesel vehicles. The video cites one 2019 study and personal calculations.",
    idealCredibility: 2,
    correctAnswer: "2",
    explanation:
      "While popular, a YouTuber is not an authoritative source for lifecycle emissions analysis. Relying on a single older study and personal calculations rather than the body of peer-reviewed literature is a red flag. The creator may also have audience incentive to produce contrarian content.",
    difficulty: 2,
  },
  {
    id: "se-8",
    category: "source-evaluation",
    headline: "Congressional Budget Office Projects Deficit Impact of Healthcare Bill",
    source: "Congressional Budget Office (CBO) official score",
    context:
      "The CBO released its official cost estimate for a proposed healthcare expansion bill, projecting a $1.2 trillion increase in the deficit over 10 years. The CBO is a nonpartisan agency that provides economic analysis to Congress regardless of which party is in power.",
    idealCredibility: 4,
    correctAnswer: "4",
    explanation:
      "The CBO is a respected nonpartisan institution with strong methodology. However, long-range economic projections inherently involve uncertainty, and CBO scores have been notably off on some past legislation. Highly credible as projections go, but not infallible.",
    difficulty: 3,
  },
  {
    id: "se-9",
    category: "source-evaluation",
    headline: "Breaking: Internal Memo Reveals Company Knew About Safety Defect",
    source: "Major newspaper investigative report citing leaked documents",
    context:
      "A well-known newspaper's investigative team published a report based on leaked internal memos showing that an automaker knew about a braking defect for 18 months before issuing a recall. The paper says it verified the documents with three independent sources.",
    idealCredibility: 4,
    correctAnswer: "4",
    explanation:
      "Major newspaper investigative teams follow editorial standards and verify documents with multiple sources. The specificity of claims (18 months, three sources) adds credibility. However, leaked documents can be selectively curated, and the full context of internal deliberations may be missing.",
    difficulty: 3,
  },
  {
    id: "se-10",
    category: "source-evaluation",
    headline: "Poll: 62% of Voters Support Universal Basic Income",
    source: "Online poll by partisan political blog (self-selected respondents)",
    context:
      "A political blog known for progressive advocacy published results from an online poll of its readers showing strong support for UBI. The poll was open to anyone visiting the site, with no demographic weighting or sampling methodology described.",
    idealCredibility: 1,
    correctAnswer: "1",
    explanation:
      "This fails basic polling methodology: self-selected respondents from a politically aligned readership produce extreme selection bias. No demographic weighting, no random sampling, and the hosting site's ideology virtually guarantees skewed results. This tells you what the blog's readers think, not what voters think.",
    difficulty: 1,
  },

  // ─── STEELMAN CHALLENGE (10) ──────────────────────────────────────────

  {
    id: "sc-1",
    category: "steelman-challenge",
    headline: "Schools Should Ban Smartphones Entirely",
    source: "Education Policy Debate",
    context:
      "Several countries and US states have enacted or proposed complete smartphone bans in K-12 schools. Proponents argue that phones are the primary driver of declining attention spans, cyberbullying, and falling test scores.",
    correctAnswer:
      "The strongest version acknowledges legitimate educational uses of phones but argues the net harm outweighs benefits given current evidence on attention fragmentation and social comparison.",
    explanation:
      "A strong steelman would cite specific research (e.g., studies showing improved test scores after phone bans), acknowledge the loss of educational apps, and propose the ban as a reversible policy experiment rather than a permanent moral stance.",
    difficulty: 1,
  },
  {
    id: "sc-2",
    category: "steelman-challenge",
    headline: "Social Media Companies Should Not Moderate Content",
    source: "Free Speech Policy Forum",
    context:
      "Some advocates argue that social media platforms should function as neutral carriers, like phone companies, without making editorial judgments about user content beyond what's strictly illegal.",
    correctAnswer:
      "The strongest version argues that concentrated moderation power creates ideological gatekeeping risks, that decentralized user tools (blocking, filtering) better serve diverse communities than top-down rules.",
    explanation:
      "A strong steelman avoids absolutism ('no rules at all') and instead focuses on the structural concern: who decides what millions can say? It might propose alternative architectures (community moderation, user-controlled filters) rather than simply demanding platforms do nothing.",
    difficulty: 2,
  },
  {
    id: "sc-3",
    category: "steelman-challenge",
    headline: "Universal Basic Income Would Replace the Need to Work",
    source: "Economic Policy Institute",
    context:
      "Critics of UBI argue it would destroy work ethic and create dependency. Proponents counter that automation is eliminating jobs faster than new ones are created, and that a basic income floor would enable entrepreneurship and caregiving.",
    correctAnswer:
      "The strongest pro-UBI argument focuses on the changing nature of work, evidence from pilot programs showing minimal work reduction, and the inefficiency of means-tested welfare bureaucracies.",
    explanation:
      "A strong steelman doesn't just say 'people deserve money.' It addresses the economic transition argument, cites pilot data (Finland, Stockton), acknowledges inflation concerns, and frames UBI as simplifying an existing patchwork of welfare programs rather than creating an entirely new entitlement.",
    difficulty: 2,
  },
  {
    id: "sc-4",
    category: "steelman-challenge",
    headline: "Nuclear Energy Is Essential for Climate Goals",
    source: "Energy & Climate Review",
    context:
      "Despite public fears and high construction costs, some climate scientists argue nuclear power is indispensable for decarbonizing the grid. Opponents cite Chernobyl, Fukushima, waste storage, and cost overruns.",
    correctAnswer:
      "The strongest version argues that nuclear provides reliable baseload power that renewables alone cannot match, has the lowest lifecycle carbon emissions per kWh, and that modern reactor designs address historical safety concerns.",
    explanation:
      "A strong steelman acknowledges legitimate safety and cost concerns but argues with data: nuclear's deaths-per-TWh are the lowest of any energy source, modern designs are passively safe, and intermittent renewables need either nuclear or massive storage infrastructure that doesn't yet exist at scale.",
    difficulty: 2,
  },
  {
    id: "sc-5",
    category: "steelman-challenge",
    headline: "Standardized Testing Should Be Eliminated from College Admissions",
    source: "Higher Education Policy Brief",
    context:
      "Many universities went test-optional during the pandemic and some made it permanent. Critics of standardized testing argue it measures wealth and test-prep access more than aptitude. Defenders say it's the most objective metric available.",
    correctAnswer:
      "The strongest defense of keeping tests argues they are the only common metric across wildly different high schools, that GPA inflation makes grades unreliable, and that removing tests actually advantages wealthy applicants who have better extracurriculars and essays.",
    explanation:
      "A strong steelman for keeping tests doesn't claim they're perfect — it argues they're the least-bad option. Without a common yardstick, admissions relies more on subjective factors (essays, recommendations, activities) that correlate even more strongly with family wealth than test scores do.",
    difficulty: 3,
  },
  {
    id: "sc-6",
    category: "steelman-challenge",
    headline: "Remote Work Is Worse for Career Development",
    source: "Workplace Strategy Report",
    context:
      "Some employers are mandating return-to-office, arguing remote workers miss out on mentorship, spontaneous collaboration, and promotion opportunities. Remote work advocates counter with productivity data and quality-of-life benefits.",
    correctAnswer:
      "The strongest version argues that informal knowledge transfer, mentorship through observation, and network-building happen disproportionately in person — and these matter most early in careers when people lack established reputations.",
    explanation:
      "A strong steelman doesn't deny remote productivity gains. It focuses on what's hard to measure: tacit knowledge transfer, serendipitous connections, and the observable fact that junior employees promoted fastest tend to have high in-office visibility. It could propose hybrid models targeting early-career workers.",
    difficulty: 2,
  },
  {
    id: "sc-7",
    category: "steelman-challenge",
    headline: "AI Development Should Be Paused Until Regulations Catch Up",
    source: "Tech Ethics Quarterly",
    context:
      "An open letter signed by researchers and tech leaders called for a 6-month pause on training AI systems more powerful than current models. Critics say a pause is unenforceable and would cede leadership to countries that don't pause.",
    correctAnswer:
      "The strongest version argues that the pace of capability development has outrun our understanding of risks, that competitive pressure creates a race-to-the-bottom on safety, and that a coordinated pause — even if imperfect — buys time for essential safety research.",
    explanation:
      "A strong steelman acknowledges enforcement challenges but argues that even imperfect coordination is better than none — similar to how nuclear arms treaties had verification gaps but still reduced risk. It focuses on the asymmetry: the cost of pausing is temporary delay, while the cost of a major AI failure could be irreversible.",
    difficulty: 3,
  },
  {
    id: "sc-8",
    category: "steelman-challenge",
    headline: "Healthcare Should Be Fully Market-Based, Not Government-Run",
    source: "Health Economics Debate",
    context:
      "Free-market advocates argue that government involvement in healthcare creates inefficiency, reduces innovation, and leads to rationing. Single-payer advocates point to lower costs and universal coverage in other countries.",
    correctAnswer:
      "The strongest market argument focuses on how price signals drive innovation and efficiency, that most medical breakthroughs originate in market-driven systems, and that direct-pay models (like LASIK and cosmetic surgery) show consistent price drops and quality improvements.",
    explanation:
      "A strong steelman doesn't ignore the uninsured — it argues that market failures in healthcare stem from existing distortions (employer tax breaks, opaque pricing, certificate-of-need laws) and that fixing these would work better than adding more government. LASIK's price trajectory is a genuinely compelling data point.",
    difficulty: 3,
  },
  {
    id: "sc-9",
    category: "steelman-challenge",
    headline: "Voting Age Should Be Lowered to 16",
    source: "Democracy & Participation Review",
    context:
      "Several countries and US cities allow 16-year-olds to vote in some elections. Proponents argue this builds civic habits early. Opponents say teenagers lack the maturity and knowledge for informed voting.",
    correctAnswer:
      "The strongest version argues that 16-year-olds pay taxes, can drive and work, and that voting while still in school (with civics education) creates lifelong voting habits — addressing the problem of declining youth turnout.",
    explanation:
      "A strong steelman doesn't just say 'old enough to work, old enough to vote.' It cites evidence from countries where 16-year-olds vote (Austria, Scotland) showing higher subsequent turnout, argues the civics-class reinforcement effect, and acknowledges that many adult voters also lack deep policy knowledge.",
    difficulty: 2,
  },
  {
    id: "sc-10",
    category: "steelman-challenge",
    headline: "Zoning Laws Should Be Dramatically Relaxed to Solve Housing",
    source: "Urban Policy Quarterly",
    context:
      "YIMBY ('Yes In My Backyard') advocates argue that restrictive zoning is the primary cause of the housing affordability crisis. Opponents worry about neighborhood character, infrastructure strain, and displacement of existing residents.",
    correctAnswer:
      "The strongest opposition argument focuses on infrastructure capacity (schools, transit, water), the risk that upzoning primarily benefits developers and new high-income residents while displacing existing communities, and that housing markets are more complex than simple supply-and-demand.",
    explanation:
      "A strong steelman against upzoning doesn't just say 'I like my neighborhood.' It argues with evidence that upzoning in hot markets often produces luxury housing first, that infrastructure investment must precede density, and that community stability has measurable value (social capital, mutual aid networks) that markets don't price.",
    difficulty: 3,
  },
];

export function getScenariosByCategory(
  category: RealWorldCategory
): RealWorldScenario[] {
  return realWorldScenarios.filter((s) => s.category === category);
}

export function getRandomScenarios(count: number): RealWorldScenario[] {
  const pool = [...realWorldScenarios];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function getMixedSet(): RealWorldScenario[] {
  const fallacies = getScenariosByCategory("fallacy-spotting");
  const sources = getScenariosByCategory("source-evaluation");
  const steelmans = getScenariosByCategory("steelman-challenge");

  const pick = (arr: RealWorldScenario[], n: number) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  };

  // 4 fallacy + 3 source + 3 steelman = 10 per round
  const set = [...pick(fallacies, 4), ...pick(sources, 3), ...pick(steelmans, 3)];

  // Shuffle the final set
  for (let i = set.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [set[i], set[j]] = [set[j], set[i]];
  }
  return set;
}
