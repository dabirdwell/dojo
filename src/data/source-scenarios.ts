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

  // --- CLICKBAIT: AI-THEMED (3) ---
  {
    id: 21,
    headline: "TERRIFYING: AI Deepfakes Are Now Indistinguishable From Reality — No One Is Safe",
    source: "ViralTechPanic.com",
    snippet:
      "A new AI tool can generate video of any person saying anything in seconds. Experts warn that deepfakes have reached a point where 'no human or computer can tell the difference.' Your identity could be stolen tomorrow.",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Fear-driven clickbait exaggerating deepfake capabilities. While deepfakes are improving, detection tools also advance, and forensic analysis can still identify artifacts. 'No human or computer' is an unattributed, absolutist claim. The unnamed 'experts' and doomsday tone are red flags.",
    checkSuggestions: [
      "Search for peer-reviewed research on current deepfake detection accuracy rates",
      "Check what NIST and DARPA's MediFor program say about detection capabilities",
      "Look for the specific AI tool mentioned and verify its actual capabilities",
    ],
  },
  {
    id: 22,
    headline: "AI Can Now Read Your Thoughts — And Big Tech Is Already Using It",
    source: "DigitalDreadReport.io",
    snippet:
      "Leaked documents reveal that major tech companies have developed AI systems that can decode human thoughts from smartphone sensor data. One anonymous engineer calls it 'the end of mental privacy as we know it.'",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Massively overstates the state of brain-computer interface research. Current neural decoding requires invasive implants or laboratory-grade fMRI machines — not smartphone sensors. 'Leaked documents' and a single anonymous source are classic clickbait fabrication signals.",
    checkSuggestions: [
      "Research the actual state of neural decoding technology and what hardware it requires",
      "Check whether any credible neuroscience outlet has reported on this claim",
      "Verify whether any 'leaked documents' have been published or corroborated",
    ],
  },
  {
    id: 23,
    headline: "AI Art Generator Destroys Entire Creative Industry in Just 6 Months",
    source: "OutrageClickMedia.com",
    snippet:
      "Since AI image generators launched, the creative industry has been 'completely decimated,' with freelance artists reporting zero income. Industry insiders say human art will be 'extinct within a year.'",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Uses absolutist language ('destroys,' 'completely decimated,' 'extinct') to maximize emotional reaction. While AI art tools have disrupted parts of the illustration market, the entire creative industry encompasses far more than digital illustration. No data, surveys, or named sources are provided.",
    checkSuggestions: [
      "Look for actual employment data from the Bureau of Labor Statistics for creative occupations",
      "Check reports from industry groups like the Graphic Artists Guild or AIGA",
      "Search for nuanced reporting on how AI tools are affecting specific creative sub-sectors",
    ],
  },

  // --- LEGITIMATE (3, including 1 AI) ---
  {
    id: 24,
    headline: "EU Passes Comprehensive AI Act Setting Risk-Based Regulation Framework",
    source: "Reuters",
    snippet:
      "The European Parliament voted 523-46 to approve the AI Act, establishing the world's first comprehensive legal framework for artificial intelligence. The law classifies AI systems by risk level, banning social scoring and real-time biometric surveillance with limited exceptions for law enforcement.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Factual reporting from a major wire service with specific vote tallies, named legislative body, and concrete policy details. The language is neutral and descriptive. Reuters is widely regarded as one of the most reliable nonpartisan news sources globally.",
    checkSuggestions: [
      "Verify the vote count on the European Parliament's official legislative tracker",
      "Read the full text of the AI Act on EUR-Lex (EU law database)",
      "Cross-reference with coverage from other wire services (AP, AFP)",
    ],
  },
  {
    id: 25,
    headline: "Japan's Population Falls Below 120 Million for First Time Since 1972",
    source: "The Japan Times / Kyodo News",
    snippet:
      "Japan's Ministry of Internal Affairs reported that the nation's population dropped to 119.8 million as of October 1, a decline of 830,000 from the previous year. The decrease marks the 15th consecutive annual decline. Immigration partially offset the natural population loss.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Precise figures from an official government ministry, reported by Japan's leading English-language newspaper citing the national wire service. The tone is factual, includes relevant context (consecutive years of decline, immigration offset), and avoids sensationalism.",
    checkSuggestions: [
      "Check Japan's Ministry of Internal Affairs and Communications for the original data release",
      "Verify the historical population figures with the Statistics Bureau of Japan",
      "Compare with UN Population Division projections for Japan",
    ],
  },
  {
    id: 26,
    headline: "Breakthrough Malaria Vaccine Shows 77% Efficacy in Phase III Trials",
    source: "The Lancet (press summary via BBC News)",
    snippet:
      "Results published in The Lancet from a Phase III trial across five West African countries show the R21/Matrix-M malaria vaccine achieved 77% efficacy in children aged 5-17 months over a 12-month follow-up. The WHO is reviewing the data for prequalification.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Published in a top-tier peer-reviewed journal, reported by a credible news outlet. Specific efficacy data, trial phase, age group, geographic scope, and follow-up period are all included. The mention of WHO review adds institutional context without overpromising.",
    checkSuggestions: [
      "Read the original study in The Lancet for full methodology and limitations",
      "Check the WHO's position on R21/Matrix-M prequalification status",
      "Look for independent expert commentary on the trial design and results",
    ],
  },

  // --- SATIRE (3) ---
  {
    id: 27,
    headline: "Man Who Has Never Left Suburb Confident He Could Survive in the Wilderness Indefinitely",
    source: "The Onion",
    snippet:
      "Local man Travis Dunford, 41, who once got lost in an IKEA, told friends he could 'easily live off the land' if civilization collapsed. Dunford cited his ownership of a Swiss Army knife and one season of watching Alone as key qualifications.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "Classic Onion format: a fictional 'area man' with comedic overconfidence. The humor lies in the gap between the character's self-assessment and obvious lack of qualifications. Clearly satirical, but headlines can spread without source attribution.",
    checkSuggestions: [
      "Confirm the publication is a known satire outlet (The Onion)",
      "Look for absurd biographical details that signal fictional characters",
      "Note the comedic structure of inflated confidence vs. deflating details",
    ],
  },
  {
    id: 28,
    headline: "Local Council Approves Plan to Fight Climate Change by Painting All Roads White",
    source: "The Daily Mash",
    snippet:
      "Greendale Borough Council voted unanimously to combat rising temperatures by repainting every road surface in reflective white. 'If it works for Greek islands, it can work for the M25,' said Councillor Margaret Phelps, who also proposed installing air conditioning outdoors.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "The Daily Mash is a British satirical publication. The premise takes a real concept (cool roofs and reflective surfaces) and exaggerates it to absurdity. The quote about outdoor air conditioning is a clear satirical signal, but the headline alone could be shared as real.",
    checkSuggestions: [
      "Verify that The Daily Mash is a satirical publication",
      "Check if 'Greendale Borough Council' is a real local authority",
      "Look for the story on any legitimate local government news source",
    ],
  },
  {
    id: 29,
    headline: "Tech Company Announces Revolutionary Product That Is Just a Slightly Larger Rectangle",
    source: "Hard Drive (harddrive.net)",
    snippet:
      "Nexora Technologies unveiled its latest device at a packed keynote event, describing the slightly larger, slightly thinner rectangle as 'the most significant innovation in a generation.' The audience of tech journalists applauded for nine minutes.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "Hard Drive is a satirical tech and gaming publication. This parodies the hype cycle around consumer electronics launches. The fictional company name and absurd details (nine minutes of applause for a rectangle) are satirical indicators, but the format closely mimics real tech journalism.",
    checkSuggestions: [
      "Check if Hard Drive / harddrive.net is a satirical outlet",
      "Verify whether 'Nexora Technologies' is a real company",
      "Note the comedic exaggeration in the audience reaction and product description",
    ],
  },

  // --- MISLEADING STATISTICS (3, including 1 AI) ---
  {
    id: 30,
    headline: "AI Will Replace 80% of All Jobs Within 5 Years, Study Finds",
    source: "FutureWorkAlert.com",
    snippet:
      "A new report claims that 80% of current job roles will be 'significantly impacted' by AI within five years. However, the study was commissioned by an AI automation vendor and defines 'significantly impacted' to include any role where AI could assist with at least one task.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "The headline converts 'significantly impacted' into 'replace,' a major distortion. The study's own definition of impact is so broad (one task affected) that nearly any job qualifies. The funding source — an AI automation vendor — is a clear conflict of interest that inflates findings to create demand for their products.",
    checkSuggestions: [
      "Check who funded and conducted the study — look for conflicts of interest",
      "Examine how 'significantly impacted' is defined versus 'replaced'",
      "Compare with credible forecasts from OECD, McKinsey Global Institute, or the Bureau of Labor Statistics",
    ],
  },
  {
    id: 31,
    headline: "Organic Food Buyers Have 35% Lower Cancer Rates, Major Study Reveals",
    source: "CleanLivingJournal.com",
    snippet:
      "A study of 70,000 adults found that those who reported eating organic food 'most of the time' had a 35% lower incidence of certain cancers compared to those who never ate organic. The study did not adjust for income, education, or overall dietary quality.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "Classic confounding variable problem. People who buy organic food tend to be wealthier, more health-conscious, exercise more, and have better healthcare access. Without controlling for these factors, the 35% figure is meaningless for establishing a causal relationship between organic food and cancer rates.",
    checkSuggestions: [
      "Check whether the study controlled for income, education, exercise, and overall diet",
      "Look for the study in a peer-reviewed journal and read the limitations section",
      "Search for systematic reviews on organic food and cancer outcomes (e.g., from the Annals of Internal Medicine)",
    ],
  },
  {
    id: 32,
    headline: "Homeschooled Students Score 30% Higher on Standardized Tests, Report Shows",
    source: "ParentChoiceAdvocacy.org",
    snippet:
      "A national survey found that homeschooled students scored an average of 30 percentile points higher than public school students on standardized achievement tests. The survey was voluntary, and participation was self-selected by homeschooling families.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "Severe self-selection bias: families who voluntarily submit test scores are likely those whose children perform well. Struggling homeschool students are underrepresented. The source is an advocacy organization with an agenda. A fair comparison would require randomized sampling and controlling for parental education and income.",
    checkSuggestions: [
      "Examine whether the survey used random sampling or self-selected participants",
      "Check the source organization for advocacy bias or funding sources",
      "Look for peer-reviewed research that controls for self-selection and socioeconomic factors",
    ],
  },

  // --- OUT-OF-CONTEXT (3) ---
  {
    id: 33,
    headline: "Health Minister Declares: 'We Cannot Trust Vaccines'",
    source: "HealthSkepticNews.com",
    snippet:
      "At a parliamentary session on public health funding, Health Minister Joanna Whitfield stated: 'We cannot trust vaccines — to distribute themselves. That is why this budget allocates £2.3 billion to cold-chain infrastructure, rural clinics, and community health workers.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline truncates the quote at the dash, converting a strong pro-vaccine funding statement into an anti-vaccine declaration. The minister was actually arguing for more investment in vaccine distribution infrastructure. This is a deliberate misrepresentation through selective editing.",
    checkSuggestions: [
      "Find the full parliamentary transcript or video of the session",
      "Read the complete quote beyond where the headline cuts it",
      "Check the Health Minister's official policy positions on vaccination programs",
    ],
  },
  {
    id: 34,
    headline: "Tech CEO: 'Privacy Is Dead — Get Over It'",
    source: "DataRightsBlog.net",
    snippet:
      "Speaking at a privacy conference, Meridian Systems CEO Lena Park said: 'Privacy is dead — get over it. That is the cynical view that we as an industry must reject. Our company is investing $500 million in end-to-end encryption because privacy is a fundamental right.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline extracts a phrase the CEO was explicitly attributing to cynics before rejecting that position. The full quote shows the speaker arguing forcefully for privacy investment. This reversal of meaning through selective quoting is a common manipulation tactic.",
    checkSuggestions: [
      "Find the full keynote or conference talk transcript",
      "Check the company's actual privacy policies and investments",
      "Compare how other outlets reported the same speech",
    ],
  },
  {
    id: 35,
    headline: "General Tells Congress: 'We Are Not Prepared for War'",
    source: "DefenseAlarmDaily.com",
    snippet:
      "During a Senate Armed Services Committee hearing, General Marcus Reid testified: 'We are not prepared for war — to be fought the way it was fought 30 years ago. Our forces have modernized to meet 21st-century threats, and our readiness posture reflects that transformation.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline truncates mid-sentence to imply military unpreparedness, when the general was actually explaining that the military has evolved beyond outdated warfare models. The full quote is a statement of modernization and confidence, not vulnerability.",
    checkSuggestions: [
      "Read the full Senate Armed Services Committee hearing transcript on congress.gov",
      "Watch the C-SPAN recording of the testimony for full context",
      "Check if the Department of Defense issued a clarification or readiness report",
    ],
  },

  // =============================================
  // NEW SCENARIOS (10) — Content Mega-Pack
  // =============================================

  // --- CLICKBAIT (2) ---
  {
    id: 36,
    headline:
      "Your Bank Account Could Be DRAINED Tomorrow — Banks Aren't Telling You This",
    source: "FinancialDoomWatch.com",
    snippet:
      "An anonymous insider at one of the 'Big Four' banks has revealed a critical flaw in the banking system that could wipe out savings accounts overnight. 'They know about it and they're covering it up,' the whistleblower told us exclusively.",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Classic fear-based clickbait: unnamed 'insider,' vague conspiracy framing, no specific technical detail, and an exclusive anonymous tip with no corroboration. Designed to drive panic clicks without providing actionable or verifiable information.",
    checkSuggestions: [
      "Check if any legitimate financial news outlet has reported this claim",
      "Verify whether FDIC or banking regulators have issued any alerts",
      "Look for the supposed 'whistleblower' statement or leaked documents on credible platforms",
    ],
  },
  {
    id: 37,
    headline:
      "Scientists Discover Children's Brains Are SHRINKING Due to Screen Time",
    source: "ParentAlarmNetwork.com",
    snippet:
      "A shocking new study reveals that children who use tablets and smartphones for more than one hour per day have measurably smaller brain volumes. One pediatrician warns, 'We are witnessing an entire generation of brain damage.'",
    category: "clickbait",
    categoryLabel: "Clickbait",
    idealCredibility: 1,
    biasNotes:
      "Extreme language ('SHRINKING,' 'brain damage,' 'shocking') and a single unnamed pediatrician's quote. The leap from screen time correlation to 'brain shrinking' dramatically overstates any existing research. No study name, journal, or institution is cited.",
    checkSuggestions: [
      "Search PubMed for studies on screen time and pediatric brain volume",
      "Check the American Academy of Pediatrics' position on screen time",
      "Look for the specific study referenced and evaluate its methodology",
    ],
  },

  // --- LEGITIMATE (2) ---
  {
    id: 38,
    headline:
      "Global Carbon Emissions Fell 2.1% in 2025, IEA Report Shows",
    source: "Financial Times",
    snippet:
      "The International Energy Agency's annual report confirms a 2.1% decline in global CO₂ emissions last year, driven primarily by accelerated renewable energy deployment in China and the EU. The IEA's executive director cautioned that the decline remains insufficient to meet Paris Agreement targets and called for tripling clean energy investment by 2030.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Reporting from a respected business newspaper citing an authoritative international institution. Includes specific data, attributes claims to named organizations, and provides both the positive finding and cautionary context. The balanced framing avoids both alarmism and complacency.",
    checkSuggestions: [
      "Access the IEA's report directly on their website for full methodology",
      "Cross-reference with other emissions tracking bodies like the Global Carbon Project",
      "Compare the 2.1% figure with the reduction rate needed for Paris Agreement compliance",
    ],
  },
  {
    id: 39,
    headline:
      "USDA Recalls 2.4 Million Pounds of Ground Beef Over E. Coli Contamination",
    source: "Associated Press",
    snippet:
      "The U.S. Department of Agriculture's Food Safety and Inspection Service issued a Class I recall of approximately 2.4 million pounds of ground beef products from Heartland Meats, Inc. after 37 confirmed E. coli O157:H7 illnesses across 12 states. The products were distributed to retailers and food service operators between January 8 and March 15.",
    category: "legitimate",
    categoryLabel: "Legitimate Breaking News",
    idealCredibility: 5,
    biasNotes:
      "Standard public health reporting from a major wire service. Specific figures (weight recalled, illness count, states affected), named company, precise date range, and official agency attribution. This is the type of reporting that directly serves public safety.",
    checkSuggestions: [
      "Verify the recall on the USDA FSIS recall archive",
      "Check the CDC's outbreak investigation page for illness counts",
      "Look for the specific product codes and distribution details on the FSIS notice",
    ],
  },

  // --- SATIRE (2) ---
  {
    id: 40,
    headline:
      "Man Who Just Learned About Logical Fallacies Insufferable at Every Social Gathering",
    source: "The Onion",
    snippet:
      "Local man Derek Huang, 29, has reportedly made himself unbearable at parties, family dinners, and workplace meetings after completing an online course on critical thinking. 'You just committed an appeal to authority,' Huang told his grandmother when she recommended chicken soup for a cold.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "The Onion's classic character comedy format — a fictional person whose relatable behavior is exaggerated for humor. The joke targets the overenthusiastic application of newly learned concepts, not the concepts themselves. Ironic content for a critical thinking training app.",
    checkSuggestions: [
      "Recognize The Onion as a well-known satirical publication",
      "Look for fictional character names and comedic situational details",
      "Note the self-aware humor about logical fallacy overuse",
    ],
  },
  {
    id: 41,
    headline:
      "Nation's Fact-Checkers Announce They Will Now Just Start Making Stuff Up Too",
    source: "The Babylon Bee",
    snippet:
      "In a joint statement, the nation's leading fact-checking organizations announced they would abandon accuracy altogether. 'Everyone else is making things up and getting millions of clicks. We've been doing this wrong,' said PolitiFact editor Janet Crane, who does not exist.",
    category: "satire",
    categoryLabel: "Satire",
    idealCredibility: 2,
    biasNotes:
      "The Babylon Bee's political satire here plays on distrust of fact-checkers and media. The joke self-identifies as fictional ('who does not exist'). The Babylon Bee has a conservative editorial lean, and this piece reflects skepticism about institutional fact-checking.",
    checkSuggestions: [
      "Identify The Babylon Bee as a satirical publication with conservative leanings",
      "Note the meta-joke: a satirical article about making things up, which itself is made up",
      "Check whether any real fact-checking organization has made such a statement",
    ],
  },

  // --- MISLEADING STATISTICS (2) ---
  {
    id: 42,
    headline:
      "Charter School Students Outperform Public School Peers by 20 Points on State Tests",
    source: "ChoiceInEducation.org",
    snippet:
      "An analysis of state test data found that students in charter schools scored an average of 20 points higher than their public school counterparts. However, the analysis did not account for selective enrollment practices, parental involvement levels, or the fact that several charter schools in the sample had expelled low-performing students before testing periods.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "The headline presents raw score differences without accounting for major confounding factors. Charter schools with selective enrollment or expulsion practices produce inflated comparisons. The advocacy source has a clear interest in promoting charter schools. A fair comparison would require controlling for demographics and selection effects.",
    checkSuggestions: [
      "Check whether the analysis controlled for student demographics and selection effects",
      "Look for peer-reviewed studies using randomized lottery-based comparisons",
      "Investigate the source organization's funding and advocacy positions",
    ],
  },
  {
    id: 43,
    headline: "Meditation Reduces Anxiety by 60%, New Study Claims",
    source: "MindfulLivingDigest.com",
    snippet:
      "A study of 45 participants who completed an 8-week meditation program reported a 60% reduction in self-reported anxiety scores. The study had no control group, relied entirely on self-reported measures, and was funded by a meditation app company seeking Series B funding.",
    category: "misleading-stats",
    categoryLabel: "Misleading Statistics",
    idealCredibility: 2,
    biasNotes:
      "Tiny sample size (45), no control group (placebo effect uncontrolled), self-reported outcomes (subject to bias), and a massive financial conflict of interest. The 60% figure sounds impressive but is essentially meaningless without a control comparison. This is marketing disguised as science.",
    checkSuggestions: [
      "Evaluate the study design: sample size, control group, blinding",
      "Check who funded the research and whether they profit from positive results",
      "Search for meta-analyses of meditation and anxiety from independent researchers",
    ],
  },

  // --- OUT-OF-CONTEXT QUOTES (2) ---
  {
    id: 44,
    headline:
      "University President: 'Free Speech Has Gone Too Far on Campus'",
    source: "CampusWatchdog.com",
    snippet:
      "At a faculty symposium on academic freedom, university president Dr. Maria Santos stated: 'Free speech has gone too far on campus — that is the argument being made by those who would silence uncomfortable research. I reject that premise entirely. This university will defend the right of scholars to pursue truth wherever it leads.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline extracts words the president was quoting and rejecting, not endorsing. The full quote reveals a passionate defense of free speech and academic freedom — the exact opposite of what the headline implies. This is deliberate misattribution through selective quoting.",
    checkSuggestions: [
      "Read the complete quote and identify who is actually making the argument",
      "Check the university's official position statements on academic freedom",
      "Watch or read the full symposium proceedings for context",
    ],
  },
  {
    id: 45,
    headline: "Teacher's Union Leader: 'We Don't Put Students First'",
    source: "ParentAdvocateDaily.com",
    snippet:
      "At a national education conference, union president Marcus Thompson said: 'We don't put students first — at least, that's what our critics love to claim. But the data shows that every dollar invested in teacher retention and professional development translates directly to better student outcomes. Supporting teachers IS putting students first.'",
    category: "out-of-context",
    categoryLabel: "Out-of-Context Quote",
    idealCredibility: 2,
    biasNotes:
      "The headline captures a phrase the speaker was quoting from critics before vigorously rebutting it. The full quote argues that supporting teachers and supporting students are aligned, not opposed. This truncation reverses the speaker's entire message.",
    checkSuggestions: [
      "Find the full conference speech or transcript",
      "Note the rhetorical pattern: speaker quotes critics, then rebuts",
      "Check whether the union has publicly responded to the headline",
    ],
  },
];
