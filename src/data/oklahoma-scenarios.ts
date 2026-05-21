import type { RealWorldScenario } from "./real-world-scenarios";

/**
 * Oklahoma-grounded scenarios for the Real World practice mode.
 * Each scenario is drawn from situations Oklahomans actually encounter in
 * city council meetings, school boards, town halls, and legislative hearings.
 */
export const oklahomaScenarios: RealWorldScenario[] = [
  // ─── FALLACY SPOTTING (7) ──────────────────────────────────────────────

  {
    id: "ok-fs-1",
    category: "fallacy-spotting",
    headline: "Council Member: 'It's the Dollar Store or Nothing for North Tulsa'",
    source: "Tulsa City Council, planning commission hearing",
    context:
      "During debate over a proposed dollar store in a North Tulsa neighborhood that has gone fifteen years without a full grocery store, a council member responded to objections from residents who wanted a real grocer: 'Look, no Whole Foods is coming to this zip code. Either we approve this dollar store today, or that corner stays vacant for another decade. Those are the only two options on the table.'",
    options: [
      "False Dilemma",
      "Appeal to Tradition",
      "Ad Hominem",
      "Hasty Generalization",
    ],
    correctAnswer: "False Dilemma",
    explanation:
      "The council member compresses a complex zoning and economic-development question into two extremes — dollar store or vacant lot. In reality, options include city-backed co-op grocers, mobile markets, tax-increment financing for a regional chain, or simply waiting for a better proposal. The framing eliminates discussion of any middle path.",
    difficulty: 1,
  },
  {
    id: "ok-fs-2",
    category: "fallacy-spotting",
    headline: "Parent at Edmond School Board: 'Let AI Grade Essays, Soon It Raises Our Kids'",
    source: "Edmond Public Schools board meeting",
    context:
      "Speaking against a pilot program that would let teachers use AI to generate first-draft feedback on student essays, a parent told the board: 'First it's just grading help. Then it's lesson planning. Then it's the AI teaching the kids. Before long the parents are out of the loop and Silicon Valley is raising our children for us.'",
    options: [
      "Slippery Slope",
      "Straw Man",
      "Red Herring",
      "Appeal to Authority",
    ],
    correctAnswer: "Slippery Slope",
    explanation:
      "The argument leaps from a narrow proposal — AI-assisted feedback on essays — to an apocalyptic endpoint where parents are 'out of the loop' and tech companies are raising children. Each step in the chain is asserted as inevitable without evidence that it would actually follow.",
    difficulty: 1,
  },
  {
    id: "ok-fs-3",
    category: "fallacy-spotting",
    headline: "Legislator Attacks Bill Sponsor's Past, Not the Bill",
    source: "Oklahoma House energy committee hearing",
    context:
      "During testimony on a bill that would require operators to post bonds for plugging abandoned oil wells, a committee member spent his five minutes attacking the bill's sponsor: 'My colleague filed for personal bankruptcy in 2009. He defaulted on a small-business loan. And now he wants to lecture the oil industry about financial responsibility? I don't think we should take a single one of his numbers seriously.'",
    options: [
      "Ad Hominem",
      "Appeal to Fear",
      "Bandwagon",
      "False Equivalence",
    ],
    correctAnswer: "Ad Hominem",
    explanation:
      "The committee member doesn't engage with the actual policy question — whether a bonding requirement would reduce orphaned wells — and instead attacks the sponsor's personal financial history. Whether the sponsor went through bankruptcy fifteen years ago has no logical bearing on whether the bonding figures in the bill are sound.",
    difficulty: 1,
  },
  {
    id: "ok-fs-4",
    category: "fallacy-spotting",
    headline: "State Rep Distorts Red Flag Bill in Floor Speech",
    source: "Oklahoma House floor debate",
    context:
      "Arguing against a narrowly written extreme risk protection order bill — which allows a judge, after a hearing with notice and the right to counsel, to temporarily restrict firearm access for someone found by clear and convincing evidence to be a danger to themselves or others — a representative said: 'What my colleagues are proposing is that the government just walks up to your house, with no warning, no hearing, no due process, and takes every gun you own because a neighbor doesn't like you. That's what this bill does.'",
    options: [
      "Straw Man",
      "Slippery Slope",
      "Appeal to Tradition",
      "False Cause",
    ],
    correctAnswer: "Straw Man",
    explanation:
      "The representative replaces the actual proposal — judicial hearing, clear and convincing evidence standard, right to counsel — with a cartoon version (no warning, no hearing, neighbor's grudge) and then attacks the cartoon. The actual bill includes the procedural protections he claims it lacks.",
    difficulty: 2,
  },
  {
    id: "ok-fs-5",
    category: "fallacy-spotting",
    headline: "Commentator Links Earthquakes to Wind Farms, Not Wastewater Injection",
    source: "Oklahoma talk radio segment",
    context:
      "A talk-radio host noted that Oklahoma's wind turbine capacity grew sharply between 2010 and 2016, and that the state's earthquake count also rose during that period. 'The numbers don't lie. We built thousands of these turbines, and the ground started shaking. You connect the dots.' No mention was made of the well-documented correlation between wastewater injection from oil and gas operations and induced seismicity, which USGS and Oklahoma Geological Survey have repeatedly identified as the primary driver.",
    options: [
      "False Cause",
      "Hasty Generalization",
      "Bandwagon",
      "Appeal to Authority",
    ],
    correctAnswer: "False Cause",
    explanation:
      "Two things rising during the same period does not mean one caused the other. The actual mechanism for Oklahoma's earthquake swarm has been traced by state and federal geologists to high-volume wastewater injection wells. The host substitutes a politically convenient correlation for the established causal chain.",
    difficulty: 2,
  },
  {
    id: "ok-fs-6",
    category: "fallacy-spotting",
    headline: "Norman Council Member Pivots to Homelessness During Broadband Debate",
    source: "Norman City Council session on municipal broadband",
    context:
      "During a council hearing on whether to build a municipal fiber network to compete with private providers in underserved Cleveland County neighborhoods, a council member spent most of his comment period on a different topic: 'We have people sleeping under the bridges on Lindsey Street. We have a homelessness crisis. And we want to talk about internet for people who already have houses? Get your priorities straight.' The agenda item was the broadband proposal, which had its own line in the capital budget unrelated to housing funds.",
    options: [
      "Red Herring",
      "Straw Man",
      "False Equivalence",
      "Appeal to Emotion",
    ],
    correctAnswer: "Red Herring",
    explanation:
      "Homelessness is a real issue, but it is not the question on the table. The two budget items don't trade off against each other in the way implied. The pivot moves the conversation away from the actual proposal — should the city build a fiber network — to an emotionally charged but separate topic.",
    difficulty: 2,
  },
  {
    id: "ok-fs-7",
    category: "fallacy-spotting",
    headline: "Op-Ed: 'Most States Aren't Pursuing Geothermal — Why Should We?'",
    source: "Oklahoman opinion section",
    context:
      "Opposing a bill that would clarify subsurface rights for closed-loop geothermal projects, a columnist argued: 'Look at a map. Texas isn't doing this. Louisiana isn't doing this. Most oil-and-gas states aren't passing geothermal legislation. If geothermal were really the next big thing, our peers would already be on it. We shouldn't be the outlier here.'",
    options: [
      "Bandwagon",
      "Appeal to Tradition",
      "False Cause",
      "Circular Reasoning",
    ],
    correctAnswer: "Bandwagon",
    explanation:
      "The argument substitutes the choices of other states for an analysis of whether the bill itself is good policy. Other states' inaction may reflect their own political constraints, geology, or industry pressure — none of which is evidence about Oklahoma's geothermal potential or the merits of the specific legislation.",
    difficulty: 2,
  },

  // ─── SOURCE EVALUATION (7) ─────────────────────────────────────────────

  {
    id: "ok-se-1",
    category: "source-evaluation",
    headline: "Industry Report: Fracking Earthquakes 'Greatly Exaggerated'",
    source:
      "Report commissioned by an oil and gas trade association, authored by a consulting firm whose principals are former industry executives",
    context:
      "An oil and gas industry trade group released a 40-page report concluding that the link between hydraulic fracturing operations and Oklahoma's earthquake swarm is 'greatly exaggerated by activists.' The report's methodology section is brief and does not share underlying data. The lead authors are former senior staff at member companies of the trade group. The report does not engage with USGS or Oklahoma Geological Survey publications on induced seismicity.",
    idealCredibility: 2,
    correctAnswer: "2",
    explanation:
      "Multiple structural problems: the funder has a direct financial stake in the conclusion, the authors have prior employment relationships with member companies, the methodology is opaque, and the report does not engage the established peer-reviewed literature. Industry-funded research isn't automatically wrong, but when these factors stack up the prior should be skeptical.",
    difficulty: 2,
  },
  {
    id: "ok-se-2",
    category: "source-evaluation",
    headline: "Study Finds Rural Oklahoma Maternal Mortality Triple State Average",
    source:
      "OU Health Sciences Center, peer-reviewed in a major obstetrics journal, n=4,800 across 26 rural counties",
    context:
      "A multi-year study by researchers at the University of Oklahoma Health Sciences Center followed pregnancy outcomes across 26 rural counties from 2018-2023. Published in a leading obstetrics journal after peer review, the study documents a maternal mortality rate roughly three times the state average in counties without an obstetric unit within 50 miles. Methodology, data, and conflict-of-interest disclosures are public.",
    idealCredibility: 5,
    correctAnswer: "5",
    explanation:
      "This is close to the gold standard: a public university research team, peer-reviewed in a recognized journal, with a large sample, multi-year design, geographic specificity, and full methodological transparency. The funder is a public institution without a commercial stake in any particular policy conclusion.",
    difficulty: 1,
  },
  {
    id: "ok-se-3",
    category: "source-evaluation",
    headline: "Facebook Post: 'The Tulsa Race Massacre Was Greatly Overblown'",
    source:
      "Facebook post by a local pastor with 2,000 followers, citing no historical sources, shared 11,000 times",
    context:
      "A pastor in a small Oklahoma town posted a 600-word essay arguing that contemporaneous accounts of the 1921 Tulsa Race Massacre were 'exaggerated by big-city newspapers' and that 'real historians don't take those death tolls seriously.' The post cites no specific historians, no archival documents, and no peer-reviewed work. It does not engage with the 2001 Oklahoma Commission report or the ongoing forensic excavations at Oaklawn Cemetery. The post went viral within a particular network of Oklahoma political groups.",
    idealCredibility: 1,
    correctAnswer: "1",
    explanation:
      "Anonymous-to-the-discipline authorship (a pastor, not a historian), no cited sources, contradicts established historical record, ignores official state commission findings and active forensic work, and propagates through a closed political network. Virality is not credibility. The 2001 Oklahoma Commission and current Tulsa investigations are the actual primary references.",
    difficulty: 1,
  },
  {
    id: "ok-se-4",
    category: "source-evaluation",
    headline: "State Education Department: 'Reading Scores Up 12% Under New Curriculum'",
    source:
      "Oklahoma State Department of Education press release citing internal assessment data",
    context:
      "The State Department of Education issued a press release announcing a 12% improvement in elementary reading scores following the rollout of a new curriculum championed by the current state superintendent. The figure comes from an internal assessment designed and administered by the department itself, not from external benchmarks like NAEP or independent third-party testing. The methodology document is available on request but not posted online.",
    idealCredibility: 2,
    correctAnswer: "2",
    explanation:
      "The agency reporting the improvement is the same agency that designed the assessment and championed the curriculum — three layers of conflict of interest. Internal self-assessment can be honest, but without external benchmarks like NAEP comparisons or an independent audit, the figure cannot be checked. The right move is to wait for the next NAEP results or independent analysis.",
    difficulty: 2,
  },
  {
    id: "ok-se-5",
    category: "source-evaluation",
    headline: "Oklahoma Policy Institute: Detailed Analysis of State Budget Surplus",
    source:
      "Oklahoma Policy Institute, nonpartisan state policy think tank, methodology and data publicly posted",
    context:
      "A nonpartisan Oklahoma policy think tank published a 60-page analysis of the state's projected $1.2 billion budget surplus, breaking down sources, projected revenue volatility, and the impact of recent tax cuts. The report's spreadsheet of underlying calculations is downloadable, sources are footnoted to the state treasurer and OMES, and the authors disclose their funders (a mix of state foundations and individual donors). The institute is generally seen as left-of-center but has criticized administrations of both parties.",
    idealCredibility: 4,
    correctAnswer: "4",
    explanation:
      "Strong: transparent methodology, downloadable underlying data, public funder disclosure, and a track record of criticizing both parties' fiscal choices. The lean of the institute is worth noting and cross-checking against right-of-center analyses, but methodological transparency is exactly the right standard. Not a 5 because policy analysis is inherently interpretive in ways peer-reviewed natural science is not.",
    difficulty: 3,
  },
  {
    id: "ok-se-6",
    category: "source-evaluation",
    headline: "Out-of-State Think Tank: 'Oklahoma Schools Are Teaching CRT to Kindergartners'",
    source:
      "Report from a national right-of-center policy organization, citing eight anecdotes from unnamed parents",
    context:
      "A national policy organization published a report titled 'The Hidden Curriculum in Oklahoma Schools' alleging that critical race theory is being taught in elementary classrooms across the state. The evidence consists of eight anecdotes from parents who are not named, screenshots of classroom materials whose source schools are not identified, and quotes from one former school board member. No systematic survey of curricula was conducted. The organization has previously published similar reports about a dozen other states.",
    idealCredibility: 2,
    correctAnswer: "2",
    explanation:
      "Anecdotal evidence from anonymous sources, unidentified screenshots, no systematic methodology, and a template-style report that the organization has run in many states. Even setting aside the political framing, the evidence quality cannot support the broad claim in the title. A real curriculum audit would require sampling, identification of specific schools and lessons, and the chance for those schools to respond.",
    difficulty: 2,
  },
  {
    id: "ok-se-7",
    category: "source-evaluation",
    headline: "EPA Region 6 Posts Real-Time Air Quality Data for OKC and Tulsa",
    source:
      "EPA Region 6 monitoring network, instrument-based, publicly accessible API",
    context:
      "The EPA's Region 6 office maintains a network of air quality monitors across Oklahoma City and Tulsa, with real-time PM2.5 and ozone data available through a public API. Instruments are calibrated to federal reference standards and the agency publishes its quality assurance protocols. The data is used by state and local agencies, news outlets, and academic researchers.",
    idealCredibility: 5,
    correctAnswer: "5",
    explanation:
      "Government scientific monitoring with public methodology, instrument-based measurement against federal reference standards, real-time public access, and no commercial stake in the readings. This is the kind of source you should default to trusting on the underlying numbers — though policy interpretations of those numbers are a separate question.",
    difficulty: 1,
  },

  // ─── STEELMAN CHALLENGE (6) ────────────────────────────────────────────

  {
    id: "ok-sc-1",
    category: "steelman-challenge",
    headline: "Oklahoma Should Not Cap Oil and Gas Production to Reduce Earthquakes",
    source: "Energy policy debate, Corporation Commission hearing",
    context:
      "Advocates for stricter limits on wastewater injection point to the well-documented link between disposal volumes and induced seismicity. Industry representatives argue that production caps would devastate the state's economy without delivering proportionate seismic benefit. Steel-man the industry position as charitably and rigorously as possible.",
    correctAnswer:
      "The strongest version concedes the seismic link, notes that operators voluntarily reduced disposal volumes after 2015 with measurable reductions in M3.0+ events, and argues that further reductions should be targeted to specific high-risk formations rather than blanket caps that punish low-risk operators and offshore jobs.",
    explanation:
      "A strong steelman doesn't deny the seismicity link. It accepts the science, points to the actual track record of voluntary reductions and resulting seismic decline, and argues for precision regulation over blunt caps — appealing to evidence about which formations and volumes actually drive the largest events. This is the version regulators have to engage seriously rather than dismiss.",
    difficulty: 2,
  },
  {
    id: "ok-sc-2",
    category: "steelman-challenge",
    headline: "Oklahoma's Permitless Carry Law Makes the State Safer",
    source: "Public safety policy forum",
    context:
      "Since 2019, Oklahomans over 21 (with limited exceptions) have been able to carry a concealed handgun without a permit or training. Opponents cite increased gun deaths and emergency-room data. Proponents argue the law respects constitutional rights and that armed citizens deter crime. Steel-man the proponent argument honestly, using their strongest available evidence and framing.",
    correctAnswer:
      "The strongest version distinguishes between lawful carriers (who pass background checks at purchase and overwhelmingly do not commit crimes) and illegal carriers (who never sought permits anyway), argues that licensing requirements primarily burdened the law-abiding while doing little to constrain criminals, and points to states with similar laws and stable or declining violent crime rates.",
    explanation:
      "A strong steelman doesn't ignore gun-death data — it argues that the relevant variable is who is carrying, not whether a permit was issued. It would cite the FBI data showing concealed carry license holders commit crimes at far lower rates than the general population, acknowledge that the law shifts burden from the lawful to enforcement of unlawful carry, and ask opponents what specific harm the prior permit regime was preventing.",
    difficulty: 3,
  },
  {
    id: "ok-sc-3",
    category: "steelman-challenge",
    headline: "Tribal Sovereignty After McGirt Hurts Oklahoma's Justice System",
    source: "Criminal justice policy debate",
    context:
      "The Supreme Court's 2020 McGirt v. Oklahoma decision recognized that much of eastern Oklahoma remains reservation land for federal criminal jurisdiction purposes. Critics argue the ruling created confusion and let serious offenders escape state prosecution. Defenders point to centuries of broken treaties and the integrity of tribal sovereignty. Steel-man the critic position responsibly — without sliding into anti-Indigenous rhetoric.",
    correctAnswer:
      "The strongest version acknowledges treaty obligations and tribal sovereignty as legitimate but argues that the abrupt jurisdictional shift left specific gaps — backlogged federal courts, double-jeopardy complications for certain pending cases, and victim-services discontinuities — and that the state's interest is in cooperative cross-deputization agreements that honor sovereignty while ensuring no offender falls through procedural cracks.",
    explanation:
      "A strong steelman does not relitigate McGirt as wrongly decided — that's a losing argument and ignores 200 years of treaty law. It focuses on the implementation question: how do federal, state, and tribal systems coordinate so that victims aren't left without recourse during the transition? Cross-deputization compacts, prosecutorial coordination, and federal court capacity are concrete proposals that respect sovereignty.",
    difficulty: 3,
  },
  {
    id: "ok-sc-4",
    category: "steelman-challenge",
    headline: "Oklahoma's Education Savings Account Program Will Improve Schools",
    source: "Education policy debate, State Capitol",
    context:
      "Oklahoma's refundable tax credit for private school tuition (sometimes called an ESA, with caps and income tiers) is one of the largest such programs in the country. Critics argue it drains public schools and primarily benefits families already in private school. Supporters argue it expands parental choice and creates competitive pressure for improvement. Steel-man the support position.",
    correctAnswer:
      "The strongest version argues that monopolies (including geographic public school monopolies in rural districts) tend toward complacency, that choice introduces competitive pressure, and that low-income families historically locked into failing schools by zip code gain options they did not have before — particularly when paired with income-based credit tiering that favors lower-income applicants.",
    explanation:
      "A strong steelman engages the equity concern directly rather than dismissing it. It distinguishes between programs that effectively subsidize wealthy private-school families and programs tiered to expand options for low-income families. It cites Milwaukee, Florida, and Indiana data with appropriate caveats about mixed effects. It does not pretend the policy is costless to public school budgets — it argues the tradeoff is worth it.",
    difficulty: 3,
  },
  {
    id: "ok-sc-5",
    category: "steelman-challenge",
    headline: "Rural Oklahoma Doesn't Need Universal Broadband — It's Not the State's Job",
    source: "Rural infrastructure policy debate",
    context:
      "Advocates argue that rural broadband is essential infrastructure on par with electricity and water, and that state intervention is required because private carriers won't serve low-density areas. Critics argue government broadband projects routinely overrun budgets, crowd out private investment, and aren't a legitimate state function. Steel-man the critic position.",
    correctAnswer:
      "The strongest version accepts that broadband matters and argues that the better lever is removing regulatory and right-of-way barriers that make rural deployment uneconomic for private and cooperative providers, plus targeted federal subsidies through existing USDA programs — rather than state-owned networks that historically have struggled with cost overruns, technology obsolescence, and political capture.",
    explanation:
      "A strong steelman does not deny that rural broadband matters or that markets have failed to deliver it. It argues that the diagnosis (market failure) does not automatically pick the cure (state-owned network). It cites specific municipal broadband cases that underperformed, points to the role of electric cooperatives as a third model, and proposes reform of permitting and pole-attachment rules as a higher-leverage intervention.",
    difficulty: 2,
  },
  {
    id: "ok-sc-6",
    category: "steelman-challenge",
    headline: "Oklahoma Should Keep the Death Penalty",
    source: "Criminal justice reform debate, post-execution review",
    context:
      "Oklahoma has executed more people per capita than nearly any state, with a recent history of botched executions, exoneration cases, and racial disparities documented by researchers. Abolitionists argue these problems are inherent. Supporters argue the death penalty is morally appropriate for the worst crimes and reflects democratic will. Steel-man the supporter position — its strongest version, not its weakest.",
    correctAnswer:
      "The strongest version acknowledges the wrongful-conviction data and procedural failures, argues for narrowing the death penalty to the smallest possible category of cases with the highest evidentiary standards (multiple-victim murders with DNA or video evidence), and contends that for those narrow cases the moral weight of the crime warrants a proportional response that life imprisonment cannot match.",
    explanation:
      "A strong steelman concedes the worst-case empirical critiques — botched executions are real, wrongful convictions are real, racial disparities are real — and retreats to the most defensible territory: an extremely narrow category of cases with overwhelming evidence. It does not pretend the current system works as advertised. It makes the moral argument on its strongest ground while acknowledging the strongest opposing evidence.",
    difficulty: 3,
  },
];

export function getOklahomaScenariosByCategory(
  category: RealWorldScenario["category"]
): RealWorldScenario[] {
  return oklahomaScenarios.filter((s) => s.category === category);
}
