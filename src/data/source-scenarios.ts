export type ScenarioCategory =
  | "clickbait"
  | "legitimate"
  | "satire"
  | "misleading-stats"
  | "out-of-context";

export interface SourceScenario {
  id: number;
  headline: string;
  source: string;
  snippet: string;
  category: ScenarioCategory;
  categoryLabel: string;
  idealCredibility: number;
  biasNotes: string;
  checkSuggestions: string[];
}

export const sourceScenarios: SourceScenario[] = [
  // --- CLICKBAIT (4) ---
  {
    id: 1,
    headline: "Doctors HATE This One Trick That Melts Belly Fat Overnight",
    source: "ViralHealthNow.com",
    snippet:
      "A revolutionary discovery from a small lab has the medical establishment scrambling. One simple ingredient, found in every kitchen, has been shown to eliminate visceral fat while you sleep.",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Classic clickbait formula: emotional capitalization, vague 'doctors' as antagonists, promises of effortless results. No named researchers, no study citations, no specific ingredient named.",
    checkSuggestions: [
      "Search for the specific claim on PubMed or medical databases",
      "Check if any named researchers or institutions are cited",
      "Look for the same claim on established health sites like Mayo Clinic or NHS",
    ],
  },
  {
    id: 2,
    headline: "This City Just Banned Wi-Fi in Schools — What They Found Will Shock You",
    source: "TruthWatchDaily.net",
    snippet:
      "After removing wireless internet from all public schools, one European city saw student test scores rise by 40% in just one semester. Officials say the results are 'unprecedented.'",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Uses shock-value framing and an unnamed 'European city.' A 40% test score jump in one semester from a single variable change is extraordinary and unsubstantiated. No officials are named.",
    checkSuggestions: [
      "Identify the specific city and verify the policy exists",
      "Check education research databases for studies on Wi-Fi and test scores",
      "Look for the quoted officials by name",
    ],
  },
  {
    id: 3,
    headline: "EXPOSED: The Ingredient in Your Toothpaste That's Destroying Your Brain",
    source: "NaturalTruthMedia.com",
    snippet:
      "Big Pharma doesn't want you to know that a common ingredient in 97% of toothpaste brands has been linked to cognitive decline. An underground network of scientists is finally speaking out.",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Conspiracy framing ('Big Pharma doesn't want you to know'), unnamed 'underground scientists,' deliberately vague about which ingredient. Designed to provoke fear and clicks.",
    checkSuggestions: [
      "Identify the specific ingredient being referenced",
      "Check FDA and dental association positions on toothpaste ingredients",
      "Search for peer-reviewed research on the claimed link",
    ],
  },
  {
    id: 4,
    headline: "She Quit Her Job and Made $47,000 in One Month — Her Secret? You Won't Believe It",
    source: "HustleBoss.io",
    snippet:
      "Former teacher Sarah K. turned a simple side project into a six-figure business using a method anyone can replicate. Thousands are already following her blueprint.",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Survivorship bias baked into the framing. Uses a first-name-only testimonial, vague 'method,' and social proof ('thousands') without evidence. Likely leads to a paid course or affiliate scheme.",
    checkSuggestions: [
      "Search for the full name and verify the person exists",
      "Check if the site is affiliated with a paid product or course",
      "Look for independent verification of the income claims",
    ],
  },

  // --- LEGITIMATE BREAKING NEWS (4) ---
  {
    id: 5,
    headline: "Federal Reserve Raises Interest Rates by 0.25% Amid Cooling Inflation",
    source: "Associated Press",
    snippet:
      "The Federal Reserve on Wednesday raised its benchmark interest rate by a quarter percentage point, bringing the target range to 5.50%-5.75%. Chair Jerome Powell signaled the central bank remains data-dependent on future decisions.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Neutral, factual reporting from a major wire service. Specific numbers, named officials, and measured language. AP is widely regarded as a reliable, nonpartisan source.",
    checkSuggestions: [
      "Verify the rate numbers against the Federal Reserve's own press release",
      "Cross-reference with other wire services (Reuters, AFP)",
      "Check the Fed's official statement on their website",
    ],
  },
  {
    id: 6,
    headline: "WHO Declares End to Global Health Emergency for Mpox",
    source: "Reuters",
    snippet:
      "The World Health Organization officially declared an end to the mpox public health emergency of international concern on Thursday, citing declining case counts across all regions. Director-General Dr. Tedros Adhanom Ghebreyesus urged continued surveillance.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Reuters is a major wire service known for factual, nonpartisan reporting. The article names the official, quotes the WHO, and uses measured language consistent with institutional announcements.",
    checkSuggestions: [
      "Check the WHO's official website for the declaration",
      "Verify with a second major news source",
      "Review the WHO's mpox situation reports for context",
    ],
  },
  {
    id: 7,
    headline: "6.2 Magnitude Earthquake Strikes Off the Coast of Chile; No Tsunami Warning Issued",
    source: "USGS / BBC News",
    snippet:
      "A 6.2 magnitude earthquake was recorded at 3:14 AM local time approximately 80 km west of Valparaíso, Chile. The USGS confirmed the depth at 35 km. Chilean emergency services reported no immediate casualties or structural damage.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Precise data (magnitude, time, location, depth), named institutional sources (USGS, Chilean emergency services), factual tone. This is standard disaster reporting from credible outlets.",
    checkSuggestions: [
      "Verify earthquake details on the USGS earthquake tracker",
      "Check Chile's national seismological center (CSN)",
      "Look for Pacific Tsunami Warning Center bulletins",
    ],
  },
  {
    id: 8,
    headline: "Supreme Court Rules 6-3 to Uphold State Voter ID Requirements",
    source: "NPR",
    snippet:
      "In a closely watched case, the Supreme Court ruled Thursday that states may require photo identification to vote, rejecting arguments that such laws disproportionately burden minority voters. Justice Roberts wrote the majority opinion; Justice Sotomayor dissented.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 4,
    biasNotes:
      "NPR is generally reliable but has a slight center-left editorial lean. The reporting itself is factual, naming justices and the vote split. Worth cross-checking with outlets of different editorial perspectives for framing differences.",
    checkSuggestions: [
      "Read the actual Supreme Court opinion on supremecourt.gov",
      "Compare framing across outlets with different editorial leans",
      "Check SCOTUSblog for expert legal analysis",
    ],
  },

  // --- SATIRE (4) ---
  {
    id: 9,
    headline: "Area Man Confident He Could Resolve Middle East Conflict If Given 20 Minutes and a Whiteboard",
    source: "The Onion",
    snippet:
      "Local resident Greg Pullman, 34, told reporters Tuesday he was 'pretty sure' he could broker lasting peace in the Middle East if someone would just let him sketch out his ideas. 'It's not that complicated,' said Pullman, who has never left Ohio.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "The Onion is a well-known satirical publication. This is clearly labeled humor — the absurd premise and comedic details are hallmarks of satire. The danger is when such headlines are shared without the source attribution.",
    checkSuggestions: [
      "Check if the publication is a known satire outlet",
      "Look for absurd or comedic details that signal humor",
      "Verify whether the 'person' quoted actually exists",
    ],
  },
  {
    id: 10,
    headline: "New Study Finds 100% of People Who Drink Water Eventually Die",
    source: "ScienceSatireWeekly.com",
    snippet:
      "Researchers at the Institute for Obvious Conclusions released a groundbreaking paper this week confirming a long-suspected correlation between water consumption and mortality. 'The data is irrefutable,' said lead researcher Dr. No One.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "A parody of scientific reporting using technically true but meaningless correlation. The fictional institution name and researcher name ('Dr. No One') are satirical signals. This mimics the 'dihydrogen monoxide' joke format.",
    checkSuggestions: [
      "Check if the 'Institute for Obvious Conclusions' is a real institution",
      "Notice the researcher's name as a satirical flag",
      "Recognize the technically-true-but-meaningless correlation pattern",
    ],
  },
  {
    id: 11,
    headline: "Nation's Dog Owners Admit They Just Use 'Good Boy' As Universal Response to All Behavior",
    source: "The Babylon Bee",
    snippet:
      "A sweeping survey of American dog owners revealed that 94% use the phrase 'good boy' regardless of whether their pet has fetched a ball, destroyed furniture, or committed a minor felony.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "The Babylon Bee is a satirical publication (with a conservative editorial lean in its political satire). This piece is lighthearted observational humor. As with all satire, the risk is sharing headlines out of context.",
    checkSuggestions: [
      "Verify the publication is a known satire outlet",
      "Check if the 'survey' is real or fabricated for humor",
      "Note the comedic exaggeration ('minor felony')",
    ],
  },
  {
    id: 12,
    headline: "Government Announces Plan to Replace All Roads with Trampolines by 2030",
    source: "DailyMash.co.uk",
    snippet:
      "The Department of Transportation unveiled an ambitious infrastructure plan that would see every paved road in the country replaced with interconnected trampolines. Officials say commute times could be cut in half 'if everyone bounces in the same direction.'",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "The Daily Mash is a British satirical website. The premise is absurd on its face, but the formal tone mimics real government announcements — a common satire technique that can fool skimmers who only read headlines.",
    checkSuggestions: [
      "Check if DailyMash.co.uk is a satirical publication",
      "Evaluate whether the premise is physically possible",
      "Look for the story on any legitimate government or news site",
    ],
  },

  // --- MISLEADING STATISTICS (4) ---
  {
    id: 13,
    headline: "Crime Rate Doubles in City After New Policy Enacted",
    source: "CivicAlert.org",
    snippet:
      "Reported crimes in Maplewood jumped from 4 incidents to 8 in the month following the city council's new community policing initiative. Critics say the policy has made the city less safe.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "A 100% increase sounds alarming but the base numbers are tiny (4 to 8). This is a classic base-rate fallacy — small absolute numbers can produce dramatic-sounding percentages. Also conflates correlation with causation.",
    checkSuggestions: [
      "Look at the absolute numbers, not just the percentage change",
      "Check the historical crime trend over a longer period",
      "Determine if the increase is within normal statistical variation",
    ],
  },
  {
    id: 14,
    headline: "9 Out of 10 Dentists Recommend New Supplement for Gum Health",
    source: "PureSmile Labs (press release)",
    snippet:
      "In a recent survey conducted by PureSmile Labs, 9 out of 10 dental professionals recommended VitaGum daily supplements for improved gum health. The product is now available in stores nationwide.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "The survey was conducted by the company selling the product — a massive conflict of interest. 'Dental professionals' is vague (could include dental assistants, students). Sample size and methodology are not disclosed.",
    checkSuggestions: [
      "Check who funded and conducted the survey",
      "Look for the sample size and methodology",
      "Search for independent studies on the supplement's effectiveness",
    ],
  },
  {
    id: 15,
    headline: "Study: People Who Eat Chocolate Live 2 Years Longer",
    source: "HealthDigestToday.com",
    snippet:
      "A new observational study of 1,200 adults found that regular chocolate consumers lived an average of 2.1 years longer than non-consumers. Researchers noted the association but cautioned that further study is needed.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "The headline presents a correlation as causation. The study is observational (cannot prove causation), and the researchers' own caution is buried in the snippet. Confounding variables (income, lifestyle) are not addressed in the headline.",
    checkSuggestions: [
      "Distinguish between correlation and causation in the study design",
      "Look for confounding variables (do chocolate eaters differ in other ways?)",
      "Check if the study was peer-reviewed and where it was published",
    ],
  },
  {
    id: 16,
    headline: "Unemployment Falls to Record Low of 2.1%, Government Reports",
    source: "NationalEconomicReview.com",
    snippet:
      "The latest jobs report shows unemployment at a historic 2.1%. However, the figure uses the U-3 measure, which excludes discouraged workers and those working part-time for economic reasons. The broader U-6 measure stands at 8.4%.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 3,
    biasNotes:
      "The headline uses the most favorable metric (U-3) while the full picture (U-6 at 8.4%) tells a different story. This is cherry-picking statistics — technically true but misleading. Credit: the snippet does include the broader measure.",
    checkSuggestions: [
      "Check which unemployment measure is being used (U-3 vs U-6)",
      "Compare with Bureau of Labor Statistics official releases",
      "Look at labor force participation rate for fuller context",
    ],
  },

  // --- OUT-OF-CONTEXT QUOTES (4) ---
  {
    id: 17,
    headline: "Senator Admits: 'We Don't Care About Working Families'",
    source: "PoliticalEdge.com",
    snippet:
      "During a heated committee hearing, Senator Williams stated: 'We don't care about working families — that's what my opponents want you to believe. In reality, this bill is designed specifically to help them.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline isolates the first half of a sentence that was actually the senator quoting opponents' criticism before rebutting it. This is a textbook example of strategic quote truncation to reverse the speaker's meaning.",
    checkSuggestions: [
      "Find the full quote and its surrounding context",
      "Watch or read the full committee hearing transcript",
      "Check if other outlets reported the same quote differently",
    ],
  },
  {
    id: 18,
    headline: "CEO Tells Employees: 'Your Jobs Are Not Safe'",
    source: "WorkplaceInsider.net",
    snippet:
      "In an all-hands meeting, CEO Diana Torres told staff: 'Your jobs are not safe — from disruption by outdated processes. That's why we're investing $200 million in modernization to future-proof every role here.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline cuts the quote at the dash, transforming a message about investment and job protection into a threat. The full quote says the opposite of what the headline implies.",
    checkSuggestions: [
      "Read the full quote beyond the headline",
      "Look for the original transcript or recording of the meeting",
      "Check if the company issued a statement clarifying the context",
    ],
  },
  {
    id: 19,
    headline: "Scientist Says 'There's No Point in Reducing Emissions'",
    source: "EnergyPolicyBrief.com",
    snippet:
      "Climate researcher Dr. Amara Osei stated at a conference: 'There's no point in reducing emissions — if we only focus on one country. This is a global challenge requiring coordinated international action across all major economies.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline strips away the conditional clause that completely changes the meaning. Dr. Osei is arguing for more ambitious international cooperation, not against emissions reduction.",
    checkSuggestions: [
      "Find the full conference talk or transcript",
      "Check the researcher's published positions on climate policy",
      "Compare how other outlets reported the same speech",
    ],
  },
  {
    id: 20,
    headline: "Coach After Loss: 'Our Players Gave Up'",
    source: "SportsBuzzDaily.com",
    snippet:
      "Post-game, Coach Rivera said: 'Our players gave up — any idea that they would coast on past success. They fought hard tonight. Sometimes the other team just plays better.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "Another truncated quote. The coach was actually praising the team's effort and sportsmanship. The headline reverses the sentiment entirely by stopping mid-sentence.",
    checkSuggestions: [
      "Watch the full post-game press conference",
      "Read the complete quote in context",
      "Check team-affiliated media for the full transcript",
    ],
  },
];
