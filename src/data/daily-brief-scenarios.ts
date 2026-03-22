export type SummaryType = "logical-error" | "missing-context" | "solid";

export interface BriefSummary {
  id: string;
  headline: string;
  source: string;
  body: string;
  type: SummaryType;
  explanation: string;
}

export interface DailyChallenge {
  day: number;
  date: string;
  topic: string;
  summaries: [BriefSummary, BriefSummary, BriefSummary];
}

export const dailyChallenges: DailyChallenge[] = [
  {
    day: 1,
    date: "2026-03-16",
    topic: "Urban Transit Expansion",
    summaries: [
      {
        id: "1a",
        headline: "City Council Approves $2.3B Light Rail Extension",
        source: "Metro Tribune",
        body: "The city council voted 8-3 to approve a 12-mile light rail extension connecting the downtown core to the eastern suburbs. The project, expected to take 5 years, will serve an estimated 45,000 daily riders. Transit officials cited successful ridership growth on existing lines, which have exceeded projections by 18% since 2023. Federal matching funds will cover 40% of the cost, with the remainder split between municipal bonds and a dedicated transit sales tax approved by voters in 2024.",
        type: "solid",
        explanation:
          "This summary provides specific figures, attributes claims to named sources, mentions the funding breakdown, and references verifiable facts like the voter-approved tax and federal matching funds. The ridership projections are grounded in existing data.",
      },
      {
        id: "1b",
        headline: "Light Rail Will Transform Eastern Suburbs Into Economic Powerhouse",
        source: "City Development Weekly",
        body: "The new light rail extension will bring unprecedented economic growth to the eastern suburbs. Since public transit always increases property values, homeowners along the route can expect their investments to appreciate by 30-50%. Businesses in the corridor will see foot traffic double within the first year of operation, based on the universal pattern that transit drives commerce. The $2.3B investment will pay for itself through increased tax revenue alone.",
        type: "logical-error",
        explanation:
          "This contains multiple logical errors: the hasty generalization that transit 'always' increases property values (it depends on many factors), the unsupported claim of 30-50% appreciation, and the assumption that the investment 'will pay for itself' — a conclusion that doesn't follow from the premises provided. The word 'universal' signals an overgeneralization fallacy.",
      },
      {
        id: "1c",
        headline: "Eastern Light Rail Faces Opposition From Resident Groups",
        source: "Suburban Sentinel",
        body: "Several neighborhood associations have voiced strong opposition to the planned light rail extension, citing noise concerns and potential disruption during construction. A petition with 3,200 signatures was submitted to the council before the vote. Opponents argue the money would be better spent on road improvements and bus rapid transit alternatives.",
        type: "missing-context",
        explanation:
          "While factually reported, this summary omits critical context: the council vote result (8-3 approval), the existing ridership data that supports expansion, the federal funding component, and any response from transit advocates. By only presenting opposition, it creates a misleading picture of a decided issue.",
      },
    ],
  },
  {
    day: 2,
    date: "2026-03-17",
    topic: "AI in Healthcare Diagnostics",
    summaries: [
      {
        id: "2a",
        headline: "AI Diagnostic Tool Catches Cancers Doctors Miss — Hospitals Rush to Adopt",
        source: "TechHealth Insider",
        body: "A new AI diagnostic system has detected early-stage cancers that human radiologists missed in 94% of tested cases. Since machines don't get tired or distracted, AI will inevitably replace human diagnosticians entirely within the decade. Three major hospital networks have already signed contracts worth $180M combined, proving the technology's superiority over traditional methods.",
        type: "logical-error",
        explanation:
          "The 94% detection stat may be real, but the conclusion that AI will 'inevitably replace' human diagnosticians is a non sequitur — detecting missed cases in a test set doesn't prove AI can handle all diagnostic scenarios. The appeal to inevitability is a logical leap. Additionally, hospital contracts 'proving superiority' is a fallacy of irrelevant proof — purchasing decisions don't validate clinical outcomes.",
      },
      {
        id: "2b",
        headline: "FDA Clears PathwayAI System for Breast Cancer Screening Assistance",
        source: "Medical Device Journal",
        body: "The FDA has granted 510(k) clearance to PathwayAI's breast cancer screening assistant, making it the third AI-powered diagnostic aid to receive regulatory approval this year. In clinical trials across 14 hospitals, the system improved radiologist detection rates by 11.3% when used as a second reader, while reducing false positives by 7.2%. The system is designed to augment, not replace, human judgment, with final diagnostic decisions remaining with physicians. Pricing starts at $45,000 per installation with annual licensing fees.",
        type: "solid",
        explanation:
          "This summary names specific products, cites FDA regulatory status, provides exact trial results with context (14 hospitals, specific improvement percentages), clarifies the tool's role as augmentation rather than replacement, and includes practical details like pricing. Claims are measured and appropriately scoped.",
      },
      {
        id: "2c",
        headline: "Hospitals Adopt AI Cancer Screening After Promising Trial Results",
        source: "National Health Report",
        body: "Several hospital networks are integrating AI tools into their cancer screening workflows following positive trial outcomes. The technology has shown potential to improve detection rates. Healthcare administrators say the tools could help address radiologist shortages in underserved areas.",
        type: "missing-context",
        explanation:
          "This summary is vague where precision matters: no specific products, no trial data, no FDA status, no discussion of limitations or false positive rates. By omitting the regulatory framework, actual performance numbers, and the augmentation-vs-replacement distinction, it leaves readers unable to evaluate the significance or reliability of the adoption trend.",
      },
    ],
  },
  {
    day: 3,
    date: "2026-03-18",
    topic: "Renewable Energy Grid Transition",
    summaries: [
      {
        id: "3a",
        headline: "Wind Farm Opposition Grows in Rural Counties",
        source: "Heartland Gazette",
        body: "Farmers in three Midwestern counties are pushing back against proposed wind farm installations, citing concerns about property values, noise pollution, and harm to bird populations. County commissioner Tom Braddock called the projects 'an assault on our way of life.' A local survey found 62% of respondents opposed the installations.",
        type: "missing-context",
        explanation:
          "The summary omits several key contextual factors: the economic benefits to participating landowners (lease payments), the project's role in state renewable energy mandates, any environmental impact studies already conducted, and that the 62% survey was local and self-selected — not representative of broader public opinion on renewable energy. It also doesn't mention that property value concerns have been studied extensively with mixed results.",
      },
      {
        id: "3b",
        headline: "Midwest Grid Operator Reports Record Renewable Output in February",
        source: "Energy Markets Daily",
        body: "The Midcontinent Independent System Operator (MISO) reported that wind and solar sources generated 38.4% of total electricity in February, a record for the grid region. The milestone was aided by above-average wind speeds and 2.1 GW of new capacity that came online in Q4 2025. Grid reliability metrics remained stable, with frequency deviation within normal bands. Natural gas generation dropped to 29.1%, its lowest share since MISO began tracking in 2005. Battery storage deployments, now totaling 1.8 GW across the region, helped manage intermittency during low-wind periods.",
        type: "solid",
        explanation:
          "This summary is data-rich and precise: it names the grid operator (MISO), provides exact percentages and capacity figures, addresses the reliability question directly with frequency deviation data, and acknowledges the role of battery storage in managing intermittency. It contextualizes the record with specific contributing factors rather than making sweeping claims.",
      },
      {
        id: "3c",
        headline: "Renewable Energy Now Cheaper Than Fossil Fuels — The Transition Is Complete",
        source: "Green Future Magazine",
        body: "With solar panel costs dropping 89% over the past decade and wind energy costs falling by 70%, renewable energy is now definitively cheaper than fossil fuels everywhere. Since renewables are cheaper, there is no longer any economic argument against a full transition. Countries that haven't switched entirely are simply choosing pollution over progress. The energy transition is effectively complete — the only remaining step is political will.",
        type: "logical-error",
        explanation:
          "While the cost reduction figures are broadly accurate, the conclusions contain multiple logical errors: the equivocation fallacy (generation cost ≠ total system cost including storage, transmission, and grid upgrades), false dichotomy (countries face complex tradeoffs beyond 'pollution vs. progress'), and the non sequitur that cheaper generation means the transition is 'complete' — ignoring grid infrastructure, storage, and baseload challenges.",
      },
    ],
  },
  {
    day: 4,
    date: "2026-03-19",
    topic: "Housing Market and Remote Work",
    summaries: [
      {
        id: "4a",
        headline: "Remote Workers Are Destroying Small Town America",
        source: "Urban Policy Review",
        body: "The influx of remote workers into small towns has driven housing prices up by 40-60% in popular relocation destinations. Since these workers earn big-city salaries, local residents simply cannot compete. Every remote worker who moves to a small town displaces a local family. If this trend continues, small-town culture will be completely erased within a generation, replaced by a homogeneous tech-worker monoculture.",
        type: "logical-error",
        explanation:
          "This contains the fallacy of composition (assuming every remote worker displaces a local family — many buy previously vacant or new-build homes), a slippery slope argument (small-town culture 'completely erased within a generation'), and false cause (attributing all price increases to remote workers when historically low inventory, institutional buying, and low interest rates also contributed). The inflammatory framing ('destroying') signals opinion disguised as analysis.",
      },
      {
        id: "4b",
        headline: "Boise Housing Market Cools as Remote Work Policies Shift",
        source: "Idaho Business Review",
        body: "Boise's housing market has seen a 12% year-over-year price decline after two years of rapid appreciation driven partly by remote worker migration. Median home prices dropped from $485,000 to $427,000. Real estate analysts point to several factors: major employers including Amazon, Dell, and JPMorgan have implemented return-to-office mandates affecting roughly 30% of their remote workforce. Meanwhile, housing inventory has increased 34% as new construction projects approved during the boom reach completion. Local first-time buyer applications have increased 22% as affordability improves.",
        type: "solid",
        explanation:
          "This summary is well-sourced with specific data points (exact prices, percentages, named companies), acknowledges multiple contributing factors rather than a single cause, and presents both sides of the market shift — declining prices and improving affordability for locals. The analysis is measured and avoids sweeping predictions.",
      },
      {
        id: "4c",
        headline: "Remote Work Migration Reshapes Mountain West Real Estate",
        source: "Western Housing Trends",
        body: "Cities across the Mountain West continue to see real estate impacts from remote work migration patterns. Population growth in mid-size cities has outpaced major metros for the third consecutive year. Housing affordability remains a top concern for local officials and long-time residents in affected communities.",
        type: "missing-context",
        explanation:
          "This summary is too vague to be useful: no specific cities, no price data, no comparison of how much growth is remote-work-driven versus other factors like natural population growth or retiree migration. It omits the recent cooling trend, return-to-office mandates, and new construction — all of which are changing the narrative. A reader is left with an outdated impression of a one-directional trend.",
      },
    ],
  },
  {
    day: 5,
    date: "2026-03-20",
    topic: "Social Media Age Verification",
    summaries: [
      {
        id: "5a",
        headline: "Senate Passes Bipartisan Social Media Age Verification Bill",
        source: "Congressional Monitor",
        body: "The Senate passed the Digital Minors Protection Act (DMPA) in a 78-19 vote, requiring social media platforms with over 10 million US users to verify users are 16 or older before allowing account creation. The bill mandates third-party age verification services rather than self-reporting, with fines up to $50,000 per violation. Tech industry groups have signaled likely legal challenges on First Amendment and privacy grounds. The bill now moves to the House, where the Technology and Commerce Committee chair has scheduled hearings for April. Similar laws in Utah and Louisiana have faced mixed results in court.",
        type: "solid",
        explanation:
          "This summary provides the bill name, exact vote count, specific provisions (age threshold, verification method, penalty amounts), notes the expected legal challenges with specific constitutional grounds, tracks the legislative timeline, and references precedent from state-level laws. It presents both the legislative action and anticipated opposition.",
      },
      {
        id: "5b",
        headline: "New Age Verification Law Will Finally Protect Children Online",
        source: "Family Safety Network",
        body: "Congress has taken a historic step to protect children by passing age verification requirements. Since children's brains are not fully developed until age 25, exposing them to social media is inherently harmful, making age restrictions the obvious solution. Countries like China have already implemented strict youth internet controls with great success. Any opposition to this bill is effectively arguing in favor of harming children.",
        type: "logical-error",
        explanation:
          "Multiple logical errors: the false equivalence between brain development (age 25) and the bill's age threshold (16), the appeal to authority fallacy using China's internet controls (which serve fundamentally different purposes and operate in a different rights framework), and the false dilemma that opposition equals supporting harm to children — ignoring legitimate concerns about privacy, implementation, and efficacy.",
      },
      {
        id: "5c",
        headline: "Tech Industry Responds to Age Verification Legislation",
        source: "Digital Commerce Report",
        body: "Major technology companies have expressed concerns about the recently passed age verification legislation. Industry representatives argue the requirements could create privacy risks and implementation challenges. Some civil liberties organizations have also raised questions about the approach.",
        type: "missing-context",
        explanation:
          "This summary strips out all meaningful detail: no bill name, no vote margin (which showed strong bipartisan support), no specific provisions, no specific companies or organizations quoted, and no mention of the actual privacy and constitutional arguments being made. It reduces a nuanced policy debate to vague 'concerns' and 'questions,' leaving readers unable to form an informed opinion.",
      },
    ],
  },
  {
    day: 6,
    date: "2026-03-21",
    topic: "Water Scarcity and Agriculture",
    summaries: [
      {
        id: "6a",
        headline: "Colorado River Basin States Reach Historic Water-Sharing Agreement",
        source: "Western Water Policy Journal",
        body: "After 18 months of negotiations, the seven Colorado River Basin states have signed a new water-sharing framework reducing total allocations by 15% from 2000-level baselines. California agreed to the largest absolute cuts (500,000 acre-feet annually), while Arizona and Nevada will reduce agricultural withdrawals by 20% and 25% respectively. The agreement includes $4.2B in federal funding for water recycling infrastructure, fallowing compensation for farmers, and tiered conservation incentives. The deal averts potential federal intervention threatened under a 2025 executive order. Lake Mead levels, currently at 32% capacity, are projected to stabilize within 3 years under the new framework.",
        type: "solid",
        explanation:
          "Highly detailed with specific allocation cuts by state, dollar amounts for infrastructure funding, the mechanism (federal funding for conservation incentives), current reservoir data, and timeline projections. It contextualizes the agreement within the broader regulatory landscape (federal intervention threat) and provides measurable outcomes.",
      },
      {
        id: "6b",
        headline: "The Water Crisis Is a Myth — There's Plenty for Everyone",
        source: "Agricultural Freedom Press",
        body: "Despite alarmist media coverage, the so-called water crisis in the American West is vastly overstated. The Colorado River has always had dry periods, and Lake Mead has been lower before. Since water is a renewable resource that falls from the sky as rain, long-term shortages are physically impossible. The real problem isn't water scarcity — it's government overregulation preventing farmers from accessing the water that rightfully belongs to them. Any water-sharing agreement is just another excuse to expand federal control over private property.",
        type: "logical-error",
        explanation:
          "Contains multiple logical errors: the appeal to nature fallacy (rain is renewable, therefore shortages are impossible — ignoring that consumption can exceed recharge rates), the red herring (shifting from hydrological data to a political argument about regulation), and the straw man (characterizing conservation agreements as 'federal control over private property'). The claim that Lake Mead 'has been lower before' without context is misleading — current levels are near historic lows.",
      },
      {
        id: "6c",
        headline: "Western States Negotiate New Water Allocation Framework",
        source: "National Policy Digest",
        body: "Representatives from Colorado River Basin states have finalized a new water-sharing agreement after lengthy negotiations. The deal involves reduced water allocations for several states and includes federal funding for water infrastructure improvements. Officials say the agreement addresses long-standing concerns about water sustainability in the region.",
        type: "missing-context",
        explanation:
          "This summary is accurate but uninformative: it omits the specific reduction percentages, which states bear the largest cuts, the dollar amounts involved, Lake Mead's current status, the federal intervention threat that motivated the deal, and any farmer compensation details. Without these specifics, a reader cannot evaluate whether the agreement is adequate, fair, or likely to succeed.",
      },
    ],
  },
  {
    day: 7,
    date: "2026-03-22",
    topic: "Cryptocurrency Regulation",
    summaries: [
      {
        id: "7a",
        headline: "Crypto Regulation Will Kill Innovation — America Will Fall Behind",
        source: "Digital Asset Advocate",
        body: "The proposed cryptocurrency regulatory framework would be catastrophic for American innovation. Every major technological revolution — the internet, social media, smartphones — succeeded precisely because the government stayed out of the way. Since crypto is the next great technological revolution, any regulation will inevitably destroy it. Companies will simply move overseas to friendlier jurisdictions, and the US will become a technological backwater. The EU's regulatory approach has already driven all crypto innovation out of Europe entirely.",
        type: "logical-error",
        explanation:
          "Contains a false analogy (the internet actually had significant government involvement including DARPA funding and eventual regulation), the slippery slope that any regulation will 'inevitably destroy' crypto, and a factually incorrect claim that regulation has driven 'all' crypto innovation out of Europe — the EU remains a significant crypto market. The false dichotomy between zero regulation and destruction ignores the spectrum of regulatory approaches.",
      },
      {
        id: "7b",
        headline: "SEC Finalizes Comprehensive Digital Asset Regulatory Framework",
        source: "Financial Regulation Report",
        body: "The SEC has published its final rule on digital asset classification and oversight, ending a three-year rulemaking process. The framework creates three asset categories: digital securities (subject to full SEC oversight), digital commodities (CFTC oversight), and utility tokens (lighter-touch FTC consumer protection rules). Exchanges must register under the appropriate regime within 18 months. The rule includes a small-project exemption for tokens with market caps under $50M, addressing industry concerns about startup compliance costs. Commissioner Zhang dissented, arguing the utility token category is too broadly defined. Major exchanges Coinbase and Kraken have issued statements supporting the framework's 'regulatory clarity.'",
        type: "solid",
        explanation:
          "This summary names the specific agency, describes the three-category framework with oversight assignments, includes the compliance timeline, notes the small-project exemption addressing a real industry concern, includes the dissent for balance, and cites specific industry reactions. It enables readers to understand both what happened and the range of perspectives.",
      },
      {
        id: "7c",
        headline: "New Crypto Rules Draw Mixed Reactions From Industry",
        source: "Business & Markets Weekly",
        body: "The cryptocurrency industry is adjusting to new regulatory requirements announced by federal agencies. Some companies have expressed support for clearer rules, while others worry about compliance costs. The regulations are expected to affect how digital assets are classified and traded in the United States.",
        type: "missing-context",
        explanation:
          "This summary conveys almost no actual information: it doesn't name the SEC, describe the three-category framework, mention the 18-month timeline, note the small-project exemption, or quote any specific company reactions. The phrase 'mixed reactions' without substance gives readers no basis to understand the debate. It's the journalistic equivalent of saying 'something happened and people had opinions.'",
      },
    ],
  },
];
