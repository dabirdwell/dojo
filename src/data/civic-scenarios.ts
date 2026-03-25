export interface CivicScenario {
  id: number;
  title: string;
  billText: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: 1 | 2 | 3;
  tags: string[];
}

export const civicScenarios: CivicScenario[] = [
  // --- Housing (1-3) ---
  {
    id: 1,
    title: "Neighborhood Stability Act",
    billText:
      "This bill caps annual rent increases at 3% for buildings older than 15 years in cities with populations over 100,000. Landlords may apply for hardship exemptions if documented maintenance costs exceed 40% of gross rental income. New construction is exempt for 20 years from certificate of occupancy.\n\nThe bill also creates a state mediation board for rent disputes and allocates $12M annually for tenant legal aid. Enforcement falls to local housing agencies, with fines up to $10,000 per violation.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Caps rent increases at 3% on older buildings in larger cities, with exemptions for new construction and landlord hardship",
      "Freezes all rents statewide and bans landlords from raising prices",
      "Only provides legal aid funding for tenants facing eviction",
      "Deregulates the rental market by exempting new construction from all housing rules",
    ],
    correctIndex: 0,
    explanation:
      "The bill is a targeted rent stabilization measure — not a rent freeze. It applies only to older buildings in larger cities, includes hardship exemptions for landlords, and explicitly exempts new construction for 20 years. The legal aid and mediation provisions are secondary components, not the bill's core mechanism.",
    difficulty: 1,
    tags: ["housing", "rent-control", "tenant-rights"],
  },
  {
    id: 2,
    title: "Community Zoning Modernization Act",
    billText:
      "This bill requires cities receiving state infrastructure funding to allow duplexes and triplexes on any lot currently zoned for single-family housing. Cities retain control over setback requirements, height limits, and design review. The bill does not override historic district protections.\n\nCities have 18 months to update local codes. Non-compliant cities lose 30% of their state infrastructure allocation. The bill includes $50M in planning grants to help smaller municipalities with code updates.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Eliminates all single-family zoning statewide immediately",
      "Ties state infrastructure funding to allowing small multi-family housing on single-family lots, while preserving local design control",
      "Provides optional planning grants for cities that voluntarily upzone",
      "Bans single-family homes and forces all new construction to be apartments",
    ],
    correctIndex: 1,
    explanation:
      "The bill uses a funding incentive (not a mandate) to push cities toward allowing duplexes/triplexes. Cities keep design control and historic protections. It doesn't eliminate single-family zoning — it adds density options. The enforcement mechanism is financial (losing 30% of infrastructure funds), not legal prohibition.",
    difficulty: 2,
    tags: ["housing", "zoning", "infrastructure"],
  },
  {
    id: 3,
    title: "Tenant Safety and Landlord Accountability Act",
    billText:
      "This bill requires landlords to complete habitability inspections every two years for rental properties built before 1990. Inspections cover structural integrity, electrical systems, plumbing, mold, and lead paint. Landlords pay for inspections conducted by state-licensed inspectors.\n\nIf a property fails inspection, landlords have 90 days to remediate. Tenants may withhold rent during remediation if the unit is deemed uninhabitable. The bill creates a public database of inspection results and establishes a $5M fund for emergency relocation of tenants in condemned units.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Allows tenants to stop paying rent for any reason at any time",
      "Only creates a public database of rental property conditions",
      "Mandates biennial habitability inspections for older rentals, with rent withholding only when units are officially deemed uninhabitable",
      "Requires all rental properties regardless of age to pass annual inspections",
    ],
    correctIndex: 2,
    explanation:
      "The bill targets pre-1990 buildings with inspections every two years (not annually, not all buildings). Rent withholding is narrowly allowed — only when a unit is officially deemed uninhabitable after a failed inspection, not at tenant discretion. The public database and relocation fund are supporting provisions.",
    difficulty: 2,
    tags: ["housing", "landlord-liability", "inspections"],
  },

  // --- Education (4-6) ---
  {
    id: 4,
    title: "Parent Choice Education Savings Act",
    billText:
      "This bill creates education savings accounts (ESAs) for families earning below 300% of the federal poverty level. Each qualifying student receives $6,500 annually, deposited into a state-managed account. Funds may be used for private school tuition, tutoring, homeschool materials, or approved online courses.\n\nPublic school per-pupil funding decreases proportionally when students leave for ESA-funded alternatives. The bill requires participating private schools to administer annual standardized testing and publish results. ESA funds not used by June 30 revert to the state general fund.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Provides universal school vouchers to all families regardless of income",
      "Creates income-limited education savings accounts that reduce public school funding when students transfer, with testing requirements for participating private schools",
      "Fully funds public schools while adding a supplemental private school option",
      "Eliminates public school funding and replaces it with a voucher system",
    ],
    correctIndex: 1,
    explanation:
      "The bill is means-tested (below 300% FPL), not universal. Crucially, it explicitly reduces public school funding when students leave — this is the most consequential provision. Participating private schools must test students, but there's no broader accountability beyond publishing scores. Unused funds revert to the state, not to the student.",
    difficulty: 2,
    tags: ["education", "school-choice", "vouchers"],
  },
  {
    id: 5,
    title: "Equitable Schools Funding Formula Act",
    billText:
      "This bill replaces the state's property-tax-based school funding model with a weighted per-pupil formula. Base funding is $9,200 per student. Additional weights: 1.3x for students with disabilities, 1.2x for English language learners, and 1.15x for students qualifying for free lunch.\n\nDistricts with declining enrollment receive three years of transitional funding. The bill phases in over five years and is funded by redirecting existing education revenue — no new taxes. A review board audits distributions annually.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Raises taxes to increase total education spending across the state",
      "Shifts school funding from property taxes to a weighted per-pupil formula, redistributing existing revenue to favor higher-need students",
      "Gives every school district exactly the same amount of money per student",
      "Cuts funding for wealthy school districts and sends it directly to low-income families",
    ],
    correctIndex: 1,
    explanation:
      "The bill restructures how existing money flows — it doesn't raise new revenue. The weighted formula means students cost different amounts (disability, ELL, poverty), so funding is NOT equal per student. It redirects from property-tax-rich districts toward higher-need populations. Declining-enrollment districts get a 3-year cushion, not an immediate cut.",
    difficulty: 2,
    tags: ["education", "funding", "equity"],
  },
  {
    id: 6,
    title: "Transparent Curriculum Standards Act",
    billText:
      "This bill requires school districts to publish all curriculum materials, textbook lists, and supplemental reading lists on a public website updated quarterly. Parents may submit written objections to specific materials, which must be reviewed by a committee within 30 days.\n\nThe review committee includes three teachers, two parents, one librarian, and one school board member. The committee may recommend alternatives but cannot remove materials without a full school board vote. The bill does not apply to college-level or AP courses offered in high schools.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Gives parents veto power to ban any book or material they object to",
      "Requires public posting of curriculum materials and creates a review process for objections, but removal requires a full school board vote",
      "Only applies to library books and has no effect on classroom materials",
      "Mandates state-level approval of all textbooks before districts can adopt them",
    ],
    correctIndex: 1,
    explanation:
      "The bill creates transparency (public posting) and a structured review process, but critically, parents cannot unilaterally remove materials. The committee can only recommend — removal requires a full school board vote. It applies to curriculum materials broadly (not just libraries) but exempts college-level/AP courses.",
    difficulty: 1,
    tags: ["education", "curriculum", "transparency"],
  },

  // --- Technology (7-9) ---
  {
    id: 7,
    title: "Algorithmic Accountability in AI Act",
    billText:
      "This bill requires companies deploying AI systems in hiring, lending, or housing decisions to conduct annual bias audits by independent third parties. Audit results must be filed with the state technology commission and summarized in plain language on the company's website.\n\nCompanies with fewer than 50 employees are exempt. The bill does not regulate AI used in content recommendation, creative tools, or internal business analytics. Penalties range from $5,000 to $50,000 per violation, with a 90-day cure period for first offenses.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Bans all use of AI in business decisions until the technology is proven unbiased",
      "Requires bias audits for AI used in high-stakes decisions (hiring, lending, housing), with exemptions for small businesses and non-decision AI",
      "Regulates all AI systems including content algorithms, chatbots, and recommendation engines",
      "Only requires companies to publish a statement that they use AI, with no auditing",
    ],
    correctIndex: 1,
    explanation:
      "The bill is narrowly scoped: only AI in hiring, lending, and housing — not content recommendation, creative tools, or analytics. Small businesses (under 50 employees) are fully exempt. It mandates independent audits and public disclosure, not a ban. The 90-day cure period for first offenses makes enforcement relatively soft.",
    difficulty: 1,
    tags: ["technology", "AI-regulation", "bias"],
  },
  {
    id: 8,
    title: "Consumer Data Privacy Protection Act",
    billText:
      "This bill gives residents the right to request deletion of personal data held by companies with annual revenue over $25M or that process data on 100,000+ consumers. Companies must respond within 45 days. The bill covers data sold to third parties but exempts data required for legal compliance, fraud prevention, or completing active transactions.\n\nCompanies must provide an opt-out mechanism for data sales and cannot charge different prices to consumers who opt out. The state attorney general has exclusive enforcement authority — there is no private right of action. Violations carry fines of up to $7,500 per intentional violation.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Lets any consumer sue companies directly for data privacy violations",
      "Requires all companies to delete all user data upon any request",
      "Gives consumers deletion and opt-out rights against large companies, enforced only by the attorney general, with exemptions for legal and fraud-prevention data",
      "Only prevents companies from charging more to consumers who opt out of data sales",
    ],
    correctIndex: 2,
    explanation:
      "The bill targets large companies only (revenue or data volume thresholds). Key detail: there is no private right of action — only the AG can enforce it, which dramatically limits enforcement capacity. Data required for legal compliance and fraud prevention is exempt, so companies cannot be forced to delete everything. The no-price-discrimination rule is one provision, not the whole bill.",
    difficulty: 3,
    tags: ["technology", "data-privacy", "consumer-rights"],
  },
  {
    id: 9,
    title: "Rural Broadband Expansion and Access Act",
    billText:
      "This bill allocates $200M over four years for broadband infrastructure in counties where less than 60% of households have access to speeds of 100 Mbps or higher. Grants go to ISPs, municipal networks, and electric cooperatives. Recipients must offer a $30/month low-income plan for five years after receiving funds.\n\nThe bill preempts local ordinances that prohibit municipal broadband networks. It requires grant recipients to begin construction within 18 months and complete buildout within 36 months. ISPs that received prior subsidies for the same areas must demonstrate new coverage before accessing additional funds.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Nationalizes internet service and provides free broadband to all rural areas",
      "Only provides subsidies to existing private ISPs to expand coverage",
      "Funds broadband buildout in underserved rural areas through grants to ISPs and municipal networks, while preempting local bans on municipal broadband",
      "Requires all ISPs to cap prices at $30/month nationwide",
    ],
    correctIndex: 2,
    explanation:
      "The bill funds infrastructure in specifically defined underserved areas (below 60% at 100 Mbps). A crucial provision: it preempts local bans on municipal broadband, enabling public competition with private ISPs. The $30/month plan is a grant condition for recipients, not a national price cap. Prior subsidy recipients face additional scrutiny — they can't double-dip without proving new coverage.",
    difficulty: 2,
    tags: ["technology", "broadband", "rural-access"],
  },

  // --- Healthcare (10-12) ---
  {
    id: 10,
    title: "Medicaid Bridge Coverage Act",
    billText:
      "This bill extends Medicaid eligibility to adults earning up to 138% of the federal poverty level in states that have not yet expanded under the ACA. Federal funding covers 95% of costs for the first three years, declining to 90% thereafter. States must apply to participate and may opt out with 12 months' notice.\n\nThe bill includes a work-reporting requirement: non-disabled adults without dependents must document 80 hours/month of work, education, or community service. Exemptions exist for those in substance abuse treatment, caregivers, and residents of areas with unemployment over 10%.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Mandates universal healthcare coverage for all adults regardless of income",
      "Creates a voluntary federal Medicaid expansion path with work-reporting requirements and generous but declining federal funding",
      "Forces all states to expand Medicaid immediately with no opt-out",
      "Only funds substance abuse treatment programs under Medicaid",
    ],
    correctIndex: 1,
    explanation:
      "The bill is voluntary — states apply to participate and can opt out. The work requirement is a significant condition: 80 hours/month for non-disabled adults without dependents, though exceptions are broad. Federal funding starts high (95%) but declines to 90%, which matters for long-term state budgets. It's not universal coverage — it targets a specific income bracket (up to 138% FPL).",
    difficulty: 2,
    tags: ["healthcare", "medicaid", "expansion"],
  },
  {
    id: 11,
    title: "Prescription Drug Pricing Transparency Act",
    billText:
      "This bill requires pharmaceutical companies to submit justifications to the state health board 60 days before any price increase exceeding 10% in a single year or 25% over three years. Justifications must include manufacturing costs, R&D expenditures, and profit margins. The health board publishes these reports publicly but has no authority to block price increases.\n\nThe bill also requires pharmacy benefit managers (PBMs) to disclose rebate amounts to health plans and prohibits PBMs from using spread pricing. Drug manufacturers that fail to file timely justifications face fines of $1,000 per day.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Caps drug prices and gives the state power to block excessive increases",
      "Requires price-increase justifications and PBM rebate disclosure, but the state cannot actually block any price increase",
      "Only regulates pharmacy benefit managers and has no effect on drug manufacturers",
      "Creates a government board that sets all drug prices in the state",
    ],
    correctIndex: 1,
    explanation:
      "The critical detail: the health board publishes reports but CANNOT block increases. This is a transparency-only measure for drug pricing — companies must explain, not get approval. The PBM provisions (rebate disclosure, spread pricing ban) are separately enforceable. The $1,000/day fine applies only to late filings, not to the price increase itself.",
    difficulty: 3,
    tags: ["healthcare", "drug-pricing", "transparency"],
  },
  {
    id: 12,
    title: "Mental Health Parity Enforcement Act",
    billText:
      "This bill requires health insurers to submit annual compliance reports demonstrating that coverage limits, copays, and prior authorization requirements for mental health services are no more restrictive than for comparable medical/surgical services. The state insurance commissioner reviews reports and may order corrective action.\n\nInsurers found non-compliant face fines of $25,000 per affected plan year. The bill also mandates coverage of three crisis counseling sessions per year without prior authorization and adds licensed clinical social workers to the list of reimbursable providers.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Requires insurers to provide unlimited free mental health services",
      "Enforces equal treatment of mental health and medical coverage through compliance reporting, adds crisis session coverage, and expands reimbursable provider types",
      "Only adds licensed clinical social workers as covered providers",
      "Creates a new state-run mental health system parallel to private insurance",
    ],
    correctIndex: 1,
    explanation:
      "The bill enforces parity — not free or unlimited care. Insurers must prove their mental health restrictions match medical/surgical ones. The three no-prior-auth crisis sessions and LCSW reimbursement are concrete additions, but the parity enforcement is the structural change. Fines are per affected plan year, giving real teeth to compliance.",
    difficulty: 2,
    tags: ["healthcare", "mental-health", "insurance-parity"],
  },

  // --- Energy / Environment (13-15) ---
  {
    id: 13,
    title: "Clean Energy Portfolio Standards Act",
    billText:
      "This bill requires electric utilities serving over 50,000 customers to source 60% of electricity from renewable sources by 2035 and 100% by 2045. Qualifying sources include solar, wind, geothermal, and existing hydroelectric. New nuclear plants qualify but existing nuclear does not count toward the renewable target.\n\nUtilities may purchase renewable energy credits (RECs) from other states to meet up to 25% of their obligation. Non-compliance results in alternative compliance payments of $50/MWh, deposited into a clean energy transition fund. Small rural co-ops are exempt until 2040.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Immediately shuts down all fossil fuel power plants in the state",
      "Sets escalating renewable energy targets for large utilities with REC trading, compliance payments as an alternative, and delayed timelines for rural co-ops",
      "Requires all electricity to come from solar and wind only, banning nuclear power",
      "Only creates a voluntary clean energy fund that utilities can choose to contribute to",
    ],
    correctIndex: 1,
    explanation:
      "The bill sets targets (60% by 2035, 100% by 2045) — not immediate shutdowns. Utilities can buy RECs from other states for up to 25% of their obligation, and can pay $50/MWh instead of complying (a cost-of-non-compliance, not a ban). New nuclear counts; existing nuclear doesn't. Rural co-ops get an extra 5 years. It's a market-mechanism approach, not a command-and-control ban.",
    difficulty: 2,
    tags: ["energy", "renewable-standards", "utilities"],
  },
  {
    id: 14,
    title: "Orphaned Well Cleanup and Remediation Act",
    billText:
      "This bill allocates $85M over five years to plug and remediate orphaned oil and gas wells — wells with no solvent owner responsible for cleanup. Priority is given to wells within one mile of schools, hospitals, or residential areas. The state hires licensed contractors through competitive bidding.\n\nThe bill creates a fee of $0.03 per barrel on active oil production to sustain the fund after initial appropriation. Well operators must post bonds of $25,000 per well for new permits, up from $5,000. Operators transferring wells to companies with less than $1M in assets must receive state approval.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Bans all new oil and gas drilling in the state",
      "Only increases bond requirements for new well permits",
      "Funds cleanup of abandoned wells, raises bond requirements for new wells, adds a per-barrel fee, and restricts well transfers to undercapitalized companies",
      "Requires oil companies to clean up their own orphaned wells at their own expense",
    ],
    correctIndex: 2,
    explanation:
      "The bill addresses orphaned wells (no solvent owner) — it doesn't ban drilling or make current operators clean up others' wells. It has multiple mechanisms: direct cleanup funding ($85M), a sustaining per-barrel fee ($0.03), higher bonds ($25K vs $5K) to prevent future orphaning, and transfer restrictions to stop companies from dumping wells onto shell entities. Each provision targets a different part of the orphaned well cycle.",
    difficulty: 3,
    tags: ["energy", "well-cleanup", "environmental-remediation"],
  },
  {
    id: 15,
    title: "Agricultural Water Rights Modernization Act",
    billText:
      "This bill replaces the 'first in time, first in right' water allocation system with a tiered priority framework. During declared water shortages, municipal and emergency use takes first priority, followed by small farms (under 500 acres), then large agricultural operations, then industrial use. Senior water rights holders receive compensation from a state drought fund when their allocation is reduced.\n\nThe bill creates a real-time water monitoring system using satellite and ground sensors. It also establishes a water credit trading market where rights holders can sell unused allocations. Existing water rights remain valid outside of declared shortage periods.",
    question: "What does this bill ACTUALLY do?",
    options: [
      "Eliminates all existing water rights and nationalizes water distribution",
      "Restructures water priority only during declared shortages, compensates displaced senior rights holders, and creates a water trading market — while preserving existing rights in non-shortage periods",
      "Only creates a satellite monitoring system to track water usage",
      "Gives all water rights to small farmers and cuts off large agricultural operations entirely",
    ],
    correctIndex: 1,
    explanation:
      "The bill changes allocation ONLY during declared shortages — existing rights remain intact otherwise. Senior rights holders get compensation, not elimination. The tiered system prioritizes municipal/emergency use, not just small farms. The water credit trading market is a significant market-based mechanism that lets rights holders monetize unused water. This is reform within the existing system, not replacement of it.",
    difficulty: 3,
    tags: ["environment", "water-rights", "agriculture"],
  },
];
