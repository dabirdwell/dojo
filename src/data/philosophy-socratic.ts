import type { SocraticChain } from "./socratic-scenarios";

/**
 * Socratic chains grounded in Oklahoma and American political life.
 * Each initial claim is something Oklahomans actually say at town halls,
 * dinner tables, and capitol hearings. The questions are designed to be
 * asked across a table without rhetorical heat — they probe assumptions
 * the way Socrates did, not the way a debate opponent does.
 */
export const philosophySocraticChains: SocraticChain[] = [
  {
    id: "tulsa-massacre-old-news",
    topic: "Historical Memory & Repair",
    initialClaim:
      "The Tulsa Race Massacre happened over a hundred years ago. Why are we still talking about it?",
    context:
      "Said at kitchen tables, in committee hearings on HB 1775, in conversations about reparations cases. A claim that frames historical injustice as bygone — and tests whether the past is genuinely past.",
    questions: [
      {
        question:
          "If a thief burned down a family's business and the family never received insurance, never got their land back, and were never compensated — how many years before the loss stops being relevant to that family?",
        expectedInsight:
          "Material harm doesn't expire on a calendar. Greenwood property was destroyed, insurance claims were denied, and survivors received nothing. The descendants inherit the absence of that wealth as surely as other Tulsans inherit its presence.",
        followUp:
          "Does the passage of time itself repair anything, or does repair require an active step that was never taken here?",
      },
      {
        question:
          "Germany has memorials to Holocaust victims every few hundred meters in Berlin, mandatory student study, and no statues of Nazi leaders. What does it tell you that Oklahoma still has a Confederate monument and only began excavating Greenwood mass graves in 2020?",
        expectedInsight:
          "The presence or absence of public memory is a choice societies make. What gets memorialized — and what gets quietly buried — reveals what a society is willing to confront about itself.",
        followUp:
          "If the past is really past, why does it require active suppression to keep it past?",
      },
      {
        question:
          "The 2021 centennial brought attention but no material repair. The Oklahoma Supreme Court dismissed the survivors' reparations case in 2024. Does the persistence of the unresolved legal question affect whether the issue is 'old news'?",
        expectedInsight:
          "An injustice that is still being actively litigated, with elderly survivors still alive when the case was dismissed, is by any reasonable standard a live legal matter — not history.",
        followUp:
          "What would 'resolved' actually look like for this case? Who gets to decide when it's resolved?",
      },
      {
        question:
          "If 'why bring it up' is the question, who benefits from the conversation ending and who benefits from it continuing?",
        expectedInsight:
          "Bryan Stevenson's argument is that silence around historical injustice protects those whose position depends on the inheritance of that injustice being unexamined. 'Why bring it up' is rarely a neutral question.",
        followUp:
          "Can a community heal a wound it refuses to look at?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The Berlin comparison cuts deepest because it removes the abstract argument and replaces it with a concrete contrast. Germany made different choices about memory than Oklahoma did, and the results are visible in landscape. The question forces the listener to explain why the same logic that justifies Holocaust memorials wouldn't apply to Greenwood.",
    finalInsight:
      "Material harm doesn't expire by the clock. Historical reckoning isn't about generating guilt — it's about whether a society can look honestly at itself. The question 'why are we still talking about it' is usually asked by those for whom the talking is the problem, not the underlying injustice. Repair requires confession, then repair, then the universal claim. The order matters.",
    difficulty: 2,
    tags: ["history", "racial-justice", "tulsa", "memory", "stevenson"],
  },
  {
    id: "rural-broadband-choice",
    topic: "Public Goods & Civic Membership",
    initialClaim:
      "If you choose to live out in the country, you can't expect broadband. That's the tradeoff you made.",
    context:
      "Said in arguments against state-funded rural broadband, often framed as personal responsibility. Tests how we decide which infrastructures are 'individual choices' and which are public obligations.",
    questions: [
      {
        question:
          "Was the same argument made about rural electrification in the 1930s? About telephone service? About paved roads?",
        expectedInsight:
          "Every infrastructure we now treat as obviously universal — electricity, phones, paved roads, mail — was once contested as too expensive for rural areas. The Rural Electrification Act passed against the same 'they chose to live out there' arguments now used against broadband.",
        followUp:
          "What changed between 1935 and now that would make broadband a different kind of question than electricity was then?",
      },
      {
        question:
          "If a child in a farmhouse 30 miles from Woodward can't access the same online curriculum as a child in Edmond, did the child make a choice about where to live?",
        expectedInsight:
          "The framing of broadband as an adult lifestyle choice ignores that children inherit their parents' location and inherit the constrained opportunities that come with it. 'Choice' arguments often hide who actually bears the cost.",
        followUp:
          "Does it change the question if we ask not 'whose fault is it' but 'who pays the price'?",
      },
      {
        question:
          "Oklahoma's economy depends on agriculture, oil and gas production, and energy generation — most of which happen in rural areas. Are rural Oklahomans 'consumers' of services or producers of state wealth?",
        expectedInsight:
          "The 'choice to live out there' framing erases the fact that rural Oklahomans produce much of what the state's urban economy depends on. The relationship is reciprocal, not charity.",
        followUp:
          "If rural production sustains urban prosperity, what's the basis for urban-paid infrastructure being treated as a one-way subsidy?",
      },
      {
        question:
          "If we accept the premise that infrastructure follows individual choice, what happens to small towns over a generation? Is the disappearance of rural Oklahoma a choice we are collectively making?",
        expectedInsight:
          "Treating infrastructure as a reward for population density creates a feedback loop: no broadband → no remote work → population leaves → less density → still no broadband. The 'choice' framing accelerates a collective outcome no one explicitly voted for.",
        followUp:
          "Is there any version of rural Oklahoma we want to preserve, and if so, what does that require?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The rural electrification comparison is decisive because it removes the question from abstract values and lands on a historical fact: we already had this exact debate, the 'they chose to live there' side lost, and almost no one today thinks rural electrification was a mistake. The same arguments produced the same outcome before. The question forces consistency.",
    finalInsight:
      "Whether something is 'infrastructure' or 'lifestyle choice' is a political determination, not a natural fact. Electricity, phones, paved roads, mail, and now broadband all followed the same arc: contested as too expensive, then universalized, then forgotten as contested. The argument 'they chose to live there' has been wrong every previous time it was deployed against essential infrastructure.",
    difficulty: 1,
    tags: ["public-goods", "rural", "infrastructure", "civic-membership"],
  },
  {
    id: "police-bad-apples",
    topic: "Systems & Individual Responsibility",
    initialClaim:
      "Police shootings of unarmed people are just bad apples — it's not a systemic problem.",
    context:
      "A common framing in conversations following officer-involved shootings. Tests whether the bad-apple model can survive contact with patterns.",
    questions: [
      {
        question:
          "If a particular barrel produces rotten apples three times more often than other barrels, do we conclude that the barrel is fine and only the apples are bad?",
        expectedInsight:
          "The 'bad apple' metaphor itself originally meant 'one bad apple spoils the barrel' — the spoilage propagates. The contemporary use has inverted the meaning to suggest barrels are inert. Patterns of behavior across institutions point to institutional features, not just individual character.",
        followUp:
          "What features of an institution might make 'bad apples' more or less common — and which of those features are within the institution's control?",
      },
      {
        question:
          "When a hospital has unusually high rates of medical errors, do we say 'it's just bad doctors' or do we audit the system — staffing, protocols, training, accountability?",
        expectedInsight:
          "In almost every other high-stakes profession, we treat persistent error patterns as system signals rather than character signals. Aviation, surgery, nuclear operations all use root-cause analysis. The 'bad apple' framing is uniquely applied to policing in a way it isn't applied elsewhere.",
        followUp:
          "What would it look like to apply aviation-style root-cause analysis to police use-of-force events?",
      },
      {
        question:
          "If officers in one department are protected from civil liability by qualified immunity, shielded from prosecution by friendly local DAs, and protected from internal discipline by union contracts — does the 'apple' even have meaningful incentives to act differently?",
        expectedInsight:
          "Behavior is shaped by consequences. When three layers of protection from consequences exist, the question 'why do bad outcomes recur' isn't really about character — it's about the incentive structure those layers create.",
        followUp:
          "If you redesigned the incentive structure tomorrow, what would you change first?",
      },
      {
        question:
          "Bryan Stevenson argues that the U.S. moved from slavery to terror lynching to segregation to mass incarceration — each replacing the last while preserving racial hierarchy. Does the 'bad apple' frame let us avoid asking whether policing inherited features from earlier institutions?",
        expectedInsight:
          "The historical continuity argument doesn't say every officer is racist — it says institutions carry forward features of the contexts in which they formed. American policing has roots in slave patrols in the South and labor-suppression in the North. Those origins shaped institutional design in ways that persist.",
        followUp:
          "What's the difference between blaming individual officers and acknowledging that they work inside structures they didn't design?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The hospital analogy is the most piercing because it exposes the inconsistency: we don't accept 'bad apple' analysis anywhere else high-stakes errors occur. Aviation, surgery, and nuclear ops all use root-cause analysis. The question forces the listener to explain why policing alone gets the bad-apple exemption — and there's no defensible answer.",
    finalInsight:
      "The bad-apple frame protects institutions from the kind of root-cause analysis we apply to every other high-consequence profession. Acknowledging systemic features doesn't require believing every officer is malicious — it requires recognizing that behavior is shaped by training, incentives, accountability, and inherited institutional design. Stevenson's four-institutions arc (slavery → terror → segregation → mass incarceration) is the historical context that makes the systemic frame inescapable.",
    difficulty: 2,
    tags: ["criminal-justice", "police-reform", "systems-thinking", "stevenson"],
  },
  {
    id: "ubi-makes-lazy",
    topic: "Work, Dignity, and the Floor",
    initialClaim:
      "Universal Basic Income would make people lazy and destroy the work ethic.",
    context:
      "The standard objection to UBI proposals — including Universal Basic Citizenship as outlined in Oklahoma-based Foundation work. Tests the empirical claim and the underlying picture of human motivation.",
    questions: [
      {
        question:
          "The pilot programs in Finland, Stockton, and Kenya all measured the effect of unconditional cash on work hours. What would change your view if the data showed almost no work reduction?",
        expectedInsight:
          "The empirical record from actual UBI pilots shows minimal work reduction — most recipients continued working, some switched to better-fitting jobs, and the largest behavioral changes were in education and caregiving. The 'lazy' prediction is testable, and the tests haven't confirmed it.",
        followUp:
          "If the empirical evidence doesn't support the 'lazy' prediction, where does the confidence in it come from?",
      },
      {
        question:
          "Why does a retired person living on Social Security or a wealthy heir living on inherited wealth not get called lazy, when both receive unconditional income?",
        expectedInsight:
          "The 'lazy' charge is applied selectively. Unconditional income is socially acceptable when it flows to retirees and heirs, and only stigmatized when it would flow to the working-age non-wealthy. The objection isn't really about laziness — it's about who deserves a floor.",
        followUp:
          "What does it tell us that the same income structure changes its moral character depending on who receives it?",
      },
      {
        question:
          "If you had a guaranteed $1,200 a month for the rest of your life, would you stop working? Would your spouse? Your closest friends?",
        expectedInsight:
          "Most people, when honest, recognize that they would still work — for meaning, advancement, social connection, and the goods that $1,200/month cannot buy. The 'lazy' charge is usually applied to other people, not to oneself or one's known circle.",
        followUp:
          "What does it suggest that we assume of strangers what we don't assume of ourselves?",
      },
      {
        question:
          "Oklahoma already has a working-age population doing significant unpaid labor — caregiving for the elderly and children, farm labor that doesn't appear in GDP, volunteer work that sustains rural towns. If UBI freed some of that labor from precarity, would 'less paid work' actually mean 'less work'?",
        expectedInsight:
          "The 'lazy' framing assumes that paid employment is the only real work. A great deal of socially essential labor — particularly in rural and Indigenous communities — is unpaid. UBI may shift the visible composition of work without reducing the real labor performed.",
        followUp:
          "What kinds of work would Oklahoma have more of, under a UBI, that it currently has too little of?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The retiree/heir comparison is the strongest move because it surfaces a contradiction the listener can't easily escape. Social Security is unconditional cash; inherited wealth is unconditional cash; neither is called laziness. The question reveals that the objection isn't really about behavior — it's about who is allowed to receive the floor without judgment.",
    finalInsight:
      "The 'UBI makes people lazy' prediction is empirically testable and has been tested. The pilots show minimal work reduction and meaningful gains in education, caregiving, and entrepreneurship. The persistence of the objection despite the evidence suggests it's not really an empirical claim — it's a claim about whose dignity is conditional on labor and whose isn't. Foundation's UBC argument rests on extending to all what we already extend to retirees and heirs without comment.",
    difficulty: 2,
    tags: ["ubi", "ubc", "work", "foundation", "stoics"],
  },
  {
    id: "ai-classroom-fear",
    topic: "Technology in Public Institutions",
    initialClaim:
      "AI doesn't belong in classrooms — kids need to learn from real teachers, not machines.",
    context:
      "A common framing in school board debates from Edmond to Tahlequah. Tests whether the dichotomy between teachers and AI is the right one — and what's actually at stake.",
    questions: [
      {
        question:
          "Is the proposal usually that AI replaces teachers, or that AI handles tasks teachers currently spend hours on so they can do more direct teaching?",
        expectedInsight:
          "Most AI-in-classroom proposals are tool-augmentation — grading first drafts, generating practice problems, providing feedback at 11pm when no teacher is awake. The 'AI replaces teachers' framing is usually a strawman of what's being discussed.",
        followUp:
          "What changes about the question when we describe it accurately?",
      },
      {
        question:
          "If a rural Oklahoma district can't hire a calculus teacher and uses AI tutoring to give students access to calculus, is that worse than the alternative of no calculus at all?",
        expectedInsight:
          "Comparing AI tools to the ideal of a great human teacher hides the real comparison. The actual choice in many rural districts is between AI-assisted instruction and no instruction in that subject. The relevant baseline is current reality, not the ideal.",
        followUp:
          "What's the right baseline for evaluating any educational technology — the best possible alternative, or the realistic available one?",
      },
      {
        question:
          "What do we mean by 'real teachers'? Are textbooks teachers? Are educational videos teachers? Are calculators teachers? Where on the spectrum of educational tools does AI fall, and why?",
        expectedInsight:
          "Every prior educational technology — books, slide projectors, calculators, computers, Khan Academy — faced the same 'this isn't real teaching' objection. Each was eventually integrated as a tool that good teachers use well and bad teachers use badly. AI is a continuation, not a categorical break.",
        followUp:
          "If history rhymes, what should we worry about specifically with AI that wasn't a concern with previous tools?",
      },
      {
        question:
          "Bacon's 'four idols' included the Idol of the Marketplace — being misled by the connotations of words. Does 'AI' as a word carry connotations that 'tutoring software' or 'feedback engine' would not? Is the fear partly about the label?",
        expectedInsight:
          "The same tool described as 'AI' triggers visceral resistance that 'spell-check' or 'calculator' does not — even when the underlying technology is comparable. Word-fear is doing some of the work that empirical evaluation should be doing.",
        followUp:
          "If you describe the actual feature without the 'AI' label, do your concerns change? Why or why not?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The rural calculus example is most penetrating because it changes the comparison frame. The opponent has been comparing AI to a great human teacher; the question reveals that for many Oklahoma students the real comparison is AI vs. nothing. That reframing makes the absolutist position much harder to hold.",
    finalInsight:
      "The 'AI doesn't belong' framing collapses when examined: most proposals are augmentation not replacement, the realistic baseline in much of Oklahoma is 'no teacher in that subject' not 'great teacher in that subject,' previous educational technologies faced the same objection and were integrated successfully, and the 'AI' label itself triggers responses that a feature-by-feature description would not. The serious questions about AI in classrooms are about specific implementations, oversight, and what students are learning to outsource — not whether AI 'belongs.'",
    difficulty: 2,
    tags: ["education", "ai", "technology", "bacon", "oklahoma-schools"],
  },
  {
    id: "abandoned-well-playground",
    topic: "Externalities and Public Bodies",
    initialClaim:
      "Companies can't be held responsible for abandoned wells from operators that went bankrupt decades ago. It's just bad luck.",
    context:
      "A common response when a small Oklahoma town discovers an unplugged well leaking near a school or playground. Tests how we assign responsibility when the original actor is gone.",
    questions: [
      {
        question:
          "If a homeowner buries toxic waste in their backyard and then sells the house, and the new homeowner gets sick — is the answer 'bad luck' or 'someone is liable'?",
        expectedInsight:
          "We don't usually accept 'the original actor is gone' as an answer for environmental harms. Liability typically follows the property, the asset, or the corporate successor. The 'bad luck' framing is a choice about which liability rules apply.",
        followUp:
          "Why might oil and gas operations have different liability rules than other industries that create long-lasting harms?",
      },
      {
        question:
          "Operating companies pay into a state plugging fund through production fees. If that fund is too small to plug the wells the industry created, who is the fund's underfunding actually a transfer to?",
        expectedInsight:
          "An underfunded plugging fund is a transfer from future Oklahomans (who inherit the wells) to past operators (who profited from production without paying the full cost). 'Bad luck' obscures who benefited from the arrangement.",
        followUp:
          "If we set the fees high enough to cover real plugging costs, who would bear that cost — and is it the right entity?",
      },
      {
        question:
          "Some operators are bought and sold many times before bankruptcy. Does corporate succession law give acquiring companies any obligation for prior liabilities — and if not, why not?",
        expectedInsight:
          "Asset-purchase structures often let acquirers buy the productive wells without the abandonment liabilities, leaving the empty shell to fail. This isn't an accident of bankruptcy — it's a feature of how deals are structured. The 'bad luck' framing hides intentional design.",
        followUp:
          "If you were designing the rules from scratch, would you allow a sale that strips liability from productive assets?",
      },
      {
        question:
          "When a leaking well is found near a playground in a small town, who has the immediate capacity to act — the long-dissolved LLC, the state, the federal government, or the surface owner? Does capacity to act create any obligation to act?",
        expectedInsight:
          "Even when original liability is unrecoverable, the question 'who can act now' has practical answers. The state and federal governments have capacity; the surface owner does not. 'Bad luck' is sometimes a way of declining the responsibility that capacity confers.",
        followUp:
          "Is there a moral difference between 'we cannot find the original actor' and 'we will not use our capacity to fix the harm'?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The underfunded-fund question is most cutting because it makes the cost transparent. An abandoned well is not a cosmic event; it's an asset whose full lifecycle cost wasn't priced into the production that profited from it. Someone bore that cost — and the question reveals it was the future community, not the operator.",
    finalInsight:
      "Calling environmental abandonment 'bad luck' hides a choice. The cost of plugging a well exists regardless — the only question is whether the operator who profited from it pays, or whether the future community absorbs it. Oklahoma's tens of thousands of orphaned wells represent a deliberate transfer of cost across time and across parties. The frame 'no one is responsible' often means 'we have decided not to recover from those who would be responsible.'",
    difficulty: 2,
    tags: ["environmental-policy", "oil-and-gas", "externalities", "phoenix-wells"],
  },
  {
    id: "tradition-confederate-monument",
    topic: "Tradition, Memory, and Symbols",
    initialClaim:
      "Confederate monuments are about heritage, not hate. They should stay up.",
    context:
      "Said in town hall debates from Atoka to McAlester. Tests the heritage claim against the historical record of when and why the monuments were built.",
    questions: [
      {
        question:
          "When were most Confederate monuments actually erected — during the Civil War, immediately after, or decades later?",
        expectedInsight:
          "The vast majority of Confederate monuments were erected in two waves: 1900-1920 (during the Jim Crow consolidation) and 1955-1965 (during the civil rights movement). Almost none were built immediately after the war. The timing matches political moments when white supremacy was being asserted or defended, not commemorations of the dead.",
        followUp:
          "Does the historical timing change what 'heritage' the monuments actually commemorate?",
      },
      {
        question:
          "Germany also lost a war and has soldiers it remembers. Why does no equivalent argument exist for keeping statues of Nazi generals as 'heritage'?",
        expectedInsight:
          "Other societies that lost wars in defense of indefensible causes do not preserve public statues to the losing leadership. The American Confederate monument tradition is exceptional, not normal. The 'heritage' claim only holds if we ignore how other societies handle comparable history.",
        followUp:
          "What does it tell us that the comparison with Germany is unflattering?",
      },
      {
        question:
          "If a monument's defenders insist it is about heritage and not hate, why do white supremacist groups consistently rally to defend the same monuments?",
        expectedInsight:
          "The symbolic meaning of a monument isn't determined by what its defenders say it means. It's also determined by who else identifies with it and rallies around it. When the meaning claimed by defenders and the meaning embraced by white supremacists converge on the same object, the 'heritage' frame becomes harder to sustain.",
        followUp:
          "Is it possible for a symbol's meaning to be honestly disputed even when its allies make the meaning obvious?",
      },
      {
        question:
          "If 'tradition' is the basis for keeping something, can you think of long-lasting traditions we eventually changed because they reflected values we no longer hold?",
        expectedInsight:
          "Slavery was a tradition. Denying women the vote was a tradition. Jim Crow segregation was a tradition. We change traditions all the time when they reflect values we no longer hold. The fact that something is traditional is never, by itself, a reason to keep it.",
        followUp:
          "What would a tradition need to demonstrate, besides longevity, to deserve preservation?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The timing question is the most decisive because it's empirically checkable and undermines the 'heritage' claim at its root. The monuments weren't built to mourn the war dead — they were built decades later, during specific political moments of white supremacy consolidation and resistance to civil rights. That fact alone reshapes the conversation.",
    finalInsight:
      "The 'heritage' claim survives only if we don't examine the historical record. The monuments were built in specific political moments, by specific organizations, with specific messages — and those messages are documented in dedication speeches and newspaper coverage from the time. 'Heritage' is not what those monuments are. The choice to keep or remove them is a present-day choice about what we want our public space to say.",
    difficulty: 2,
    tags: ["tradition", "memory", "symbols", "voltaire", "stevenson"],
  },
  {
    id: "climate-oklahoma-weather",
    topic: "Climate, Uncertainty, and Evidence",
    initialClaim:
      "Climate change is exaggerated. Oklahoma weather has always been wild — tornadoes, droughts, floods, ice storms. Nothing new.",
    context:
      "A common framing in Oklahoma, where extreme weather is a way of life. Tests whether 'always been wild' is the same as 'not changing.'",
    questions: [
      {
        question:
          "If a baseline is variable, does that make changes to the baseline harder to detect, or impossible to detect?",
        expectedInsight:
          "High variability makes change harder to spot in any single year, but doesn't make it impossible to detect with longer time series and statistical methods. Climate science is precisely the discipline that handles this — it's not 'noticing it's hot today,' it's measuring multi-decade trends against variance.",
        followUp:
          "What's the difference between weather (year-to-year variation) and climate (multi-decade averages)?",
      },
      {
        question:
          "Insurance companies set rates based on actual loss data, not political views. What are property insurance rates in tornado alley and along the Mississippi watershed doing — and what does that signal?",
        expectedInsight:
          "Insurance markets are profit-driven and politically neutral. When insurers raise rates, pull out of markets, or refuse to write certain coverage, they're responding to actuarial loss data. The pattern across climate-exposed markets is consistent — and it isn't 'this is normal.'",
        followUp:
          "If you trust markets to reveal information, what is the insurance market revealing about climate risk?",
      },
      {
        question:
          "Oklahoma had four 1,000-year flood events in five years between 2019 and 2023. By definition, a '1,000-year' event has a 0.1% chance in any given year. What's the rough probability of four of them clustering in five years if the underlying probability hasn't changed?",
        expectedInsight:
          "If the base rate were unchanged, the probability of four such events in five years is so low it's effectively a statistical impossibility. Either the events weren't actually 1,000-year events (meaning prior assumptions were wrong) or the underlying probability has shifted. Either way, 'nothing new' doesn't hold.",
        followUp:
          "Which is more likely — that our prior weather assumptions were already wrong, or that something is changing?",
      },
      {
        question:
          "Bacon called 'Idols of the Tribe' the perceptual biases all humans share. Is there a human tendency to discount slow changes against the backdrop of dramatic short-term variation?",
        expectedInsight:
          "Humans are bad at noticing trends inside noisy data. We weight recent dramatic events heavily and underweight slow trends. Climate is exactly the kind of phenomenon our perceptual systems are worst at detecting — which is why we rely on instruments and statistics rather than personal experience.",
        followUp:
          "If our perception is unreliable on this, what should we rely on instead?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The insurance market question is the most penetrating because it bypasses political argument entirely. Insurance companies are not climate activists. If they're raising rates and pulling out of markets, they're responding to actuarial reality. The question forces the listener to either trust market signals (and accept what those signals say) or explain why the market is wrong here in a way it isn't wrong elsewhere.",
    finalInsight:
      "'Always been wild' is true and beside the point. The question isn't whether Oklahoma weather is variable — it's whether the distribution of that variability is shifting. The evidence comes from instruments, insurance markets, multi-decade temperature records, and statistical analysis of extreme-event clustering. Personal perception is the worst tool for the job. Bacon's Idols of the Tribe — our built-in perceptual biases — are exactly what climate science is designed to correct for.",
    difficulty: 2,
    tags: ["climate", "evidence", "bacon", "epistemology", "oklahoma-weather"],
  },
  {
    id: "voucher-school-choice",
    topic: "Markets, Choice, and Equity",
    initialClaim:
      "School choice programs help low-income families escape failing schools. Anyone who opposes them is defending the status quo.",
    context:
      "A claim made in Oklahoma's recent ESA debates. Tests whether 'school choice' as marketed matches school choice as delivered.",
    questions: [
      {
        question:
          "Who actually used Oklahoma's tax credit in its first year — families who were already in private school, or families switching from public to private?",
        expectedInsight:
          "Early data on Oklahoma's program and on similar programs in Arizona and Florida shows the majority of recipients were already in private school. The 'helping low-income families escape failing schools' framing doesn't match the demographic reality of who's been subsidized.",
        followUp:
          "Does the program's actual user base affect whether the moral argument for it still holds?",
      },
      {
        question:
          "If a private school can reject applicants for academic, behavioral, religious, or disability-related reasons, in what sense does the family have 'choice' — and in what sense does the school?",
        expectedInsight:
          "School choice is usually framed as parental choice. But when schools can reject applicants, the actual selector is the school, not the family. 'Choice' is asymmetric: it expands selection rights for those already advantaged and offers conditional admission to others.",
        followUp:
          "How would you redesign the program so that 'choice' was actually held by families rather than by schools?",
      },
      {
        question:
          "What happens to the per-pupil funding base in a rural district where 5% of students take vouchers to a private school 40 miles away? Does the remaining 95% receive better or worse education?",
        expectedInsight:
          "School budgets have high fixed costs (buildings, transportation, administrators). When per-pupil funding leaves but fixed costs remain, the per-pupil cost for remaining students rises — meaning each remaining student gets less. Rural districts are most exposed to this dynamic because they have few options.",
        followUp:
          "Who in rural Oklahoma has the practical ability to use a voucher, and who doesn't?",
      },
      {
        question:
          "If 'choice' is the principle, would you support equally robust choice in healthcare, policing, fire service, and water utilities? If not, what makes education different?",
        expectedInsight:
          "We don't usually apply 'choice' to public goods where universal access matters. The choice framing for education depends on treating education as a consumer good rather than a public good. Whether that framing is right is the actual question being smuggled into the 'choice' rhetoric.",
        followUp:
          "Is education more like a consumer good or more like a public good — and how should that classification be settled?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The 'who actually has the choice' question is most cutting because it exposes a structural reality the marketing of the policy hides. When schools can reject applicants, the family isn't the chooser — the school is. The question dissolves the 'parental choice' frame at its rhetorical foundation.",
    finalInsight:
      "The school choice debate is often conducted in slogans that don't match the program design. Real questions: who actually uses the subsidy, who controls admissions, what happens to the remaining public school students, and whether education is treated as a consumer good or a public good. These are settle-able by evidence, not by rhetoric. The strongest case for choice programs requires engaging these questions rather than asserting them away.",
    difficulty: 3,
    tags: ["education", "vouchers", "markets", "equity", "oklahoma-policy"],
  },
  {
    id: "permitless-carry-safety",
    topic: "Rights, Risks, and Public Safety",
    initialClaim:
      "Permitless carry makes everyone safer. An armed society is a polite society.",
    context:
      "A common framing in Oklahoma's 2019 permitless-carry debate. Tests both the safety claim and the underlying picture of human behavior.",
    questions: [
      {
        question:
          "What does the actual data show about violent crime rates in states that have adopted permitless carry over the past decade compared to those that haven't?",
        expectedInsight:
          "Peer-reviewed studies (RAND, Stanford) find that permitless carry laws are associated with modest increases in violent crime, particularly assault. They are not associated with measurable decreases. The 'safer' claim doesn't survive contact with the comparison data.",
        followUp:
          "If the data doesn't support the 'safer' claim, what does the claim rest on instead?",
      },
      {
        question:
          "The 'armed society is polite society' line comes from a Robert Heinlein science fiction novel about a fictional planet. Are there any actual heavily-armed societies in human history we can look to as evidence?",
        expectedInsight:
          "The maxim is fiction. Heavily-armed societies in actual history — frontier mining towns, post-conflict regions, certain failed states — have generally been violent, not polite. The rhetorical force of the quote comes from its punchiness, not from any empirical basis.",
        followUp:
          "Why does a memorable line from fiction carry argumentative weight that a survey of actual armed societies would not?",
      },
      {
        question:
          "If permitless carry is about respecting constitutional rights, what's the constitutional argument for the age cutoffs and exclusions that even permitless carry laws retain?",
        expectedInsight:
          "Even permitless carry laws retain age limits, felon exclusions, and certain location restrictions — which means everyone implicitly accepts that the right is not absolute. The question isn't 'rights vs. no rights' but 'where do reasonable limits fall' — which is exactly the question that licensing debates were about.",
        followUp:
          "If we already accept that some limits are reasonable, what's the principled basis for the line being where it currently is?",
      },
      {
        question:
          "Most homicides in Oklahoma involve people who knew each other — domestic violence, arguments, drug disputes. Does easier carry change the likelihood that an argument escalates to a fatal outcome?",
        expectedInsight:
          "The 'armed citizens stop crime' framing pictures defensive use against strangers. The actual gun-death data is dominated by suicide, domestic violence, and conflicts between people who know each other. Ease of carry primarily affects these scenarios, not stranger-on-stranger crime.",
        followUp:
          "What does this suggest about the gap between the imagined use case and the actual one?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The data question is the most decisive because it's empirically settlable. There are now enough states with permitless carry laws of varying duration that researchers can measure the effect. The studies are public, the methodology is auditable, and the finding doesn't support the 'safer' claim. The question forces the listener to either engage the evidence or admit they're arguing from values rather than from data.",
    finalInsight:
      "The 'safer' claim is empirically testable and the evidence doesn't support it. The actual debate is about values — how to weigh constitutional principles against measurable harm, where to draw lines that everyone agrees must exist somewhere, and how to address the gun-violence patterns that dominate actual data (suicide, domestic violence, escalated arguments). Rhetorical lines from fiction don't substitute for that argument; they just save people from having to make it.",
    difficulty: 2,
    tags: ["gun-policy", "rights", "evidence", "oklahoma-law"],
  },
  {
    id: "incarceration-solves-crime",
    topic: "Punishment, Deterrence, and Public Safety",
    initialClaim:
      "Mass incarceration brought crime rates down. It worked.",
    context:
      "A common defense of the carceral expansion of the 1990s and 2000s. Tests the causal claim and the question of who paid the costs.",
    questions: [
      {
        question:
          "If incarceration drives down crime, why did Canada — which roughly tripled its police but did not mass-incarcerate — see crime drop in the same period as the U.S.?",
        expectedInsight:
          "Crime fell across most developed countries in the 1990s and 2000s, including countries that did not mass-incarcerate. The cross-national pattern suggests that other factors (demographic shifts, lead removal, policing strategies, economic changes) explain most of the decline. U.S. mass incarceration was concurrent with the drop, not necessarily causal.",
        followUp:
          "If a cross-national pattern exists that the U.S. policy can't explain, what does that suggest about the causal claim?",
      },
      {
        question:
          "Oklahoma has been at or near the top of the U.S. in per-capita incarceration and in female incarceration for decades. Has Oklahoma been correspondingly safer than states with lower incarceration rates?",
        expectedInsight:
          "Oklahoma's violent crime rates are not notably lower than peer states. If high incarceration produced high safety, the highest-incarcerating state would be among the safest. It isn't. The internal comparison undermines the deterrence claim.",
        followUp:
          "What's the simplest explanation for high incarceration without correspondingly high safety?",
      },
      {
        question:
          "Bryan Stevenson notes that 50% of incarcerated people have mental illness and roughly 20% have acute mental illness. If we removed from prisons the people whose primary issue is mental illness or addiction, would the remaining prison population be doing what 'mass incarceration' was supposed to do?",
        expectedInsight:
          "A significant share of incarceration substitutes for the absence of mental health and addiction infrastructure. Treating those populations as 'criminals' incarcerated for public safety obscures that they're warehoused because no other system exists. The 'it worked' frame requires not asking what 'it' is actually doing.",
        followUp:
          "If we redirected even half the carceral spending to mental health and addiction treatment, what would the safety effect be?",
      },
      {
        question:
          "Who paid the cost of the experiment — by neighborhood, race, and family structure — and who experienced the benefits?",
        expectedInsight:
          "The carceral expansion's costs fell overwhelmingly on Black and Indigenous communities, on poor neighborhoods, and on families separated from incarcerated parents. The 'it worked' verdict treats the costs as zero — which they aren't. Even if safety effects were real, the distribution question remains.",
        followUp:
          "Does 'it worked' have to specify who 'it' worked for, or is the verdict allowed to ignore the costs?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The cross-national comparison is the most decisive because it isolates the causal variable. If the U.S. and Canada both saw crime drop and only the U.S. mass-incarcerated, then mass incarceration can't be the necessary cause of the drop. The question forces the listener to explain why their policy was the cause when other countries got the same outcome without it.",
    finalInsight:
      "The 'it worked' verdict requires ignoring cross-national patterns (crime dropped in countries that didn't mass-incarcerate), Oklahoma's own counter-example (high incarceration without high safety), the substitution of incarceration for mental health and addiction infrastructure, and the distribution of who paid the cost. A more honest reading is that crime fell for many overlapping reasons and U.S. mass incarceration was an extraordinarily expensive overshoot — moral and fiscal — whose harms continue.",
    difficulty: 3,
    tags: ["criminal-justice", "incarceration", "stevenson", "oklahoma-policy"],
  },
  {
    id: "if-you-dont-like-it-leave",
    topic: "Loyalty, Voice, and Reform",
    initialClaim:
      "If you don't like Oklahoma, you can leave.",
    context:
      "Said in response to criticism of Oklahoma policy on almost any topic. Tests what 'loyalty' means and who gets to claim it.",
    questions: [
      {
        question:
          "When a parent points out something a child is doing wrong, is the parent expressing love or rejection?",
        expectedInsight:
          "Sustained criticism is usually a sign of investment, not rejection. The people most committed to a place are often the ones most willing to confront its failures. The 'leave if you don't like it' framing inverts the usual logic of loyalty.",
        followUp:
          "Why might the framing be inverted specifically when applied to political criticism?",
      },
      {
        question:
          "Is 'leaving' equally available to all Oklahomans? Who has the resources and family ties to relocate, and who doesn't?",
        expectedInsight:
          "The 'just leave' option is much more available to the wealthy than to the poor, to those without elder care obligations than those with them, to those without rooted family than those with deep ties. It's a class-stratified suggestion that pretends to be universal.",
        followUp:
          "If the option is unequally available, what does suggesting it actually mean as a response?",
      },
      {
        question:
          "Albert Hirschman distinguished 'exit' (leaving) from 'voice' (staying and changing things). What happens to an organization or place where everyone who notices problems exits?",
        expectedInsight:
          "Places sustained only by people who don't notice problems get worse over time. Reform requires that some of the people who see problems stay and work on them. 'Just leave' is a recipe for selecting against the people a place most needs.",
        followUp:
          "If you wanted Oklahoma to improve over the next 50 years, would you rather critics left or stayed?",
      },
      {
        question:
          "When the same speaker says 'love Oklahoma or leave it' and also says 'don't let outsiders tell us what to do,' is the underlying principle about love of place, or about something else?",
        expectedInsight:
          "If insiders aren't allowed to criticize and outsiders aren't allowed to weigh in, the result is no criticism allowed at all. The two framings together aren't about loyalty — they're about silencing critique from any source.",
        followUp:
          "Can a place be made better by a rule that no one is permitted to criticize it?",
      },
    ],
    strongestQuestionIndex: 2,
    strongestExplanation:
      "Hirschman's exit-versus-voice frame is the most penetrating because it provides a vocabulary the listener may not have had. Once you see that criticism is a form of investment and that exit is what disengaged people do, the 'love it or leave it' demand reveals itself as a demand for the wrong kind of relationship to the place.",
    finalInsight:
      "Loyalty and criticism are not opposites. The people most invested in Oklahoma are often the loudest about what needs to change. 'Love it or leave it' selects for disengagement — it asks the people who care enough to push for improvement to exit, leaving the place to those who don't notice problems. A place sustained by that selection gets worse over generations. Real loyalty looks more like sustained voice than silent acceptance.",
    difficulty: 1,
    tags: ["civic-engagement", "loyalty", "voice", "reform"],
  },
  {
    id: "wind-farms-ruin-prairie",
    topic: "Aesthetics, Energy, and Tradeoffs",
    initialClaim:
      "Wind farms are ruining the Oklahoma prairie. They're an eyesore and they have to go.",
    context:
      "Said in town halls in western Oklahoma where turbine projects have multiplied. Tests how we weigh aesthetic costs against other benefits and costs.",
    questions: [
      {
        question:
          "Compared to what landscape baseline? Was the prairie we see today untouched, or already shaped by railroads, oil pumpjacks, transmission lines, irrigation pivots, and highway grids?",
        expectedInsight:
          "The 'natural prairie' baseline doesn't really exist in much of Oklahoma. The current landscape is already heavily engineered. Turbines are added to a worked landscape, not imposed on a wilderness — the question is whether they're worse than what's already there, not whether they disturb an untouched ideal.",
        followUp:
          "What's the right baseline to compare new energy infrastructure against?",
      },
      {
        question:
          "Locke distinguished primary qualities (what's actually in the world) from secondary qualities (what arises from the interaction between the world and our senses). Is 'eyesore' a primary or secondary quality?",
        expectedInsight:
          "Ugliness is a secondary quality — it lives in the relationship between viewer and object, not in the object itself. Different generations and cultures find different things beautiful or ugly. Many people now find pumpjacks picturesque who would have found them ugly when new. The aesthetic judgment may shift; the structures will remain.",
        followUp:
          "How much weight should current aesthetic reactions get in decisions whose consequences last 30+ years?",
      },
      {
        question:
          "Wind farms in western Oklahoma pay landowners substantial lease payments, generate property tax revenue for rural schools, and create maintenance jobs. Who bears the aesthetic cost and who receives the financial benefit — and are they the same people?",
        expectedInsight:
          "The cost-benefit distribution matters. If the people seeing the turbines are largely the same people receiving lease payments and tax revenue, the aesthetic argument is weaker. If the cost falls on one group and the benefit on another, that's a legitimate concern — but it's a distributional concern, not an aesthetic one.",
        followUp:
          "What design or policy changes would address the distributional question without removing the turbines?",
      },
      {
        question:
          "If we removed every visual intrusion from the prairie — turbines, pumpjacks, power lines, roads, fences, towers — what would the resulting landscape support, and could rural Oklahoma communities live in it?",
        expectedInsight:
          "A prairie without any infrastructure is also a prairie without modern rural Oklahoma. The choice isn't between 'natural prairie' and 'industrial prairie' — it's between which infrastructures we accept and which we don't. Turbines are one set; the alternatives also have costs that are easier to overlook because we're used to them.",
        followUp:
          "What makes an infrastructure 'invisible' to us — its actual visual impact, or our familiarity with it?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The baseline question is the most decisive because it dissolves the implicit picture the argument depends on. The 'untouched prairie' is a memory or an ideal, not a current condition. Once the listener has to specify what landscape they're actually defending, the conversation becomes about which infrastructures are acceptable — not whether infrastructure should exist at all.",
    finalInsight:
      "Aesthetic objections are real and worth taking seriously, but they need an honest baseline. The Oklahoma prairie is already a worked landscape, and the question is which infrastructures we accept, not whether to have any. Locke's distinction between primary and secondary qualities is useful here: ugliness lives in the interaction between viewer and object, and that interaction changes over time. The serious question is distributional: who benefits and who bears the cost — and that's answerable through policy, not removal.",
    difficulty: 2,
    tags: ["energy", "rural", "locke", "tradeoffs", "phoenix-wells"],
  },
  {
    id: "abortion-no-exceptions",
    topic: "Moral Absolutes and Civic Pluralism",
    initialClaim:
      "Abortion is murder, full stop. No exceptions.",
    context:
      "A position held by some Oklahomans with deep moral conviction. The Socratic challenge isn't to dismiss the conviction — it's to test what 'no exceptions' actually commits the speaker to.",
    questions: [
      {
        question:
          "If a 12-year-old is pregnant after being raped, and continuing the pregnancy will kill her, does the 'no exceptions' principle require letting her die?",
        expectedInsight:
          "Absolute principles meet real cases. Most people who say 'no exceptions' in the abstract pull back when confronted with cases like life-of-the-mother or child rape. The retreat reveals that the principle isn't actually absolute — it's a default with exceptions that aren't being acknowledged.",
        followUp:
          "If you would allow an exception in that case, what's the principled basis for that exception, and what does it imply about other cases?",
      },
      {
        question:
          "If abortion is murder, should women who have abortions be prosecuted for murder — and serve life sentences or face the death penalty?",
        expectedInsight:
          "The 'murder' framing implies criminal penalties for the woman that almost no anti-abortion advocate is actually willing to support. The selective application of the murder concept (to the procedure but not the patient) reveals that 'murder' is rhetorical positioning, not a fully held legal-moral claim.",
        followUp:
          "If the woman shouldn't be prosecuted for murder, why not — and what does that tell us about whether the term 'murder' is being used literally?",
      },
      {
        question:
          "What about IVF, which routinely creates embryos that are not implanted and are later discarded — is that also murder under the 'life begins at conception' principle?",
        expectedInsight:
          "Strict application of 'life begins at conception' would criminalize most IVF, which currently helps tens of thousands of couples have children each year. Most anti-abortion advocates carve out IVF — but the principle they cite for opposing abortion would forbid it. The inconsistency points to the principle being narrower than stated.",
        followUp:
          "Is the moral status of the embryo different in IVF than in abortion, and if so why?",
      },
      {
        question:
          "Voltaire argued that every law is 'a collectively agreed-upon set of intolerances.' In a religiously and morally pluralistic society, how do we decide which deeply-held convictions get encoded into law and which remain personal matters?",
        expectedInsight:
          "Pluralism doesn't mean every moral view is equally right — it means deciding how to live together when we don't agree. The 'no exceptions' framing assumes one view should govern the choices of those who hold different views. The harder question is what principle determines that, and whether it's a principle the speaker would accept being applied to them on issues they disagree with.",
        followUp:
          "Is there an issue where you would want the state to leave you free to act on your conscience even if a majority disagreed?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The 12-year-old case is the most penetrating because it forces the speaker to either accept a conclusion almost no one actually holds, or admit that 'no exceptions' isn't really the position. Either response moves the conversation forward — the absolute claim cannot survive contact with the concrete case unless the speaker is willing to bite the bullet.",
    finalInsight:
      "Absolute claims usually have exceptions their holders haven't fully thought through. The Socratic move isn't to defeat the conviction but to clarify it — what exceptions exist, and what principles actually justify them. The serious debate about abortion law happens in the space those exceptions open up: when does fetal life acquire moral weight, how is that weighed against the life and autonomy of the pregnant person, and what role does state coercion appropriately play in pluralistic society. The answers vary across thoughtful people; 'no exceptions' usually does not survive examination by the person who said it.",
    difficulty: 3,
    tags: ["ethics", "abortion", "pluralism", "voltaire", "absolutes"],
  },
  {
    id: "mcgirt-tribal-jurisdiction",
    topic: "Sovereignty, Treaties, and Coexistence",
    initialClaim:
      "The McGirt decision is a disaster. Eastern Oklahoma can't have two competing legal systems.",
    context:
      "A common reaction to the 2020 Supreme Court ruling that recognized Muscogee (Creek) Nation jurisdiction over much of eastern Oklahoma. Tests the assumption that sovereignty is zero-sum.",
    questions: [
      {
        question:
          "The U.S. routinely operates with overlapping jurisdictions — federal, state, county, city, tribal. Why is the addition of tribal jurisdiction in eastern Oklahoma uniquely 'disaster' rather than 'one more layer'?",
        expectedInsight:
          "Overlapping jurisdictions are the norm in American law, not the exception. Federal agents, state troopers, county sheriffs, and city police already operate concurrently in every Oklahoma town. Adding tribal jurisdiction is a coordination problem, not a categorically new kind of problem.",
        followUp:
          "What makes tribal jurisdiction feel different from the other layers we accept without comment?",
      },
      {
        question:
          "If a treaty signed in 1832 promised land to the Muscogee Nation 'as long as grass grows and water runs,' and Congress never formally disestablished that reservation, what would it mean for the U.S. to ignore the treaty?",
        expectedInsight:
          "Treaties are the supreme law of the land under the Constitution. Ignoring a treaty isn't pragmatism — it's saying the government is bound by its commitments only when convenient. The McGirt majority opinion is a vindication of constitutional treaty law, not an invention.",
        followUp:
          "If the U.S. can ignore treaties when they become inconvenient, what's the basis for trusting any U.S. commitment in the future?",
      },
      {
        question:
          "Most McGirt-related jurisdictional issues have been addressed through cross-deputization agreements — local tribes and counties working out concurrent enforcement. Is the actual situation in 2026 'two competing systems' or 'overlapping systems learning to coordinate'?",
        expectedInsight:
          "The actual on-the-ground situation has been substantially worked out through cooperative agreements. The 'disaster' framing reflects the early uncertainty rather than the current operational reality. Tribes, counties, and federal prosecutors have spent four years building coordination, and the system functions.",
        followUp:
          "If the predicted 'disaster' didn't materialize, what should that update?",
      },
      {
        question:
          "Bryan Stevenson argues that American institutions still bear the imprint of the racial-difference narrative invented to justify slavery, which paralleled the doctrine of discovery used to justify Indigenous dispossession. Does the framing 'eastern Oklahoma can't have two systems' carry any echo of that older logic?",
        expectedInsight:
          "The assumption that Indigenous sovereignty must yield to settler sovereignty isn't politically neutral — it's the operating premise of two centuries of treaty violation. Hearing 'we can't have two systems' as 'Indigenous claims must yield' rather than 'settler claims must yield' is a choice rooted in inherited frames, not in logic.",
        followUp:
          "If we genuinely treated tribal and state sovereignty as equally legitimate, what would 'coordination problems' look like that we wouldn't currently call 'disasters'?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The overlapping-jurisdictions question is the most piercing because it shows the listener that they already live with — and accept without comment — exactly the kind of legal complexity they claim is intolerable when applied to tribes. The asymmetry is the point: nothing about tribal jurisdiction is harder than what we already manage. The opposition is to the recognition, not the complexity.",
    finalInsight:
      "Overlapping sovereignty is the American norm. Treaties are supreme law. McGirt simply enforces commitments the federal government made and never legally rescinded. The 'disaster' framing has not been borne out by the operational reality, and the predicted chaos has been mostly resolved through cross-deputization compacts. The deeper question — why this particular jurisdictional complexity is uniquely intolerable to some — has answers rooted in the long history of which sovereignties Americans have been taught to take seriously and which to discount.",
    difficulty: 3,
    tags: ["tribal-sovereignty", "mcgirt", "treaties", "stevenson"],
  },
  {
    id: "bible-public-schools",
    topic: "Religion, Education, and the State",
    initialClaim:
      "Public schools should teach the Bible. America is a Christian nation.",
    context:
      "An argument that has played out in Oklahoma school board meetings and at the state superintendent level. Tests both the historical claim and the principle.",
    questions: [
      {
        question:
          "If America is a Christian nation, which Christian denomination's reading of the Bible should public schools teach — Southern Baptist, Catholic, Mormon, Methodist, Pentecostal, Eastern Orthodox, or one of the dozens of others?",
        expectedInsight:
          "There is no neutral 'Christianity' that public schools could teach. Every choice — which translation, which doctrinal interpretation, which canon — implicitly favors one tradition over others. The proposal hides a question (whose Christianity?) that the proposers usually haven't worked out.",
        followUp:
          "Would you be comfortable if a different Christian denomination than yours was the one selected as the school standard?",
      },
      {
        question:
          "If your child's public school taught Quranic interpretation as part of regular curriculum because Muslim families in the district wanted it, would you support that choice on the same principle?",
        expectedInsight:
          "The 'majority religion gets taught' principle, when applied consistently, would require accepting whatever religion happened to be locally dominant. Most people who hold the principle do so only when it favors their religion — which means the principle isn't really 'public schools should teach religion,' but 'public schools should teach my religion.'",
        followUp:
          "If the principle wouldn't survive a role-reversal, what's the actual principle being asserted?",
      },
      {
        question:
          "The First Amendment's Establishment Clause was written by people who had seen religious wars in Europe and state-enforced religion in colonial America. What problem were they trying to solve?",
        expectedInsight:
          "The founders weren't anti-religious — most were religious. They were anti-coercion. They had seen what happens when the state picks a religion: persecution of minorities, religious wars, hollowing out of authentic faith into political conformity. The Establishment Clause protects religion from the state as much as the state from religion.",
        followUp:
          "Does state-promoted Christianity strengthen or weaken authentic Christian practice over time?",
      },
      {
        question:
          "Confucius argued that morality emerges from cultivated virtue, not from imposed rules — and that authentic virtue requires the freedom to choose otherwise. If the Bible is taught as state curriculum, does the resulting belief count as authentic faith or as compliance?",
        expectedInsight:
          "Coerced religious instruction tends to produce either rebellion or shallow conformity, not deep faith. Many of the most thoughtful religious traditions, from Confucianism to early Christianity itself, hold that authentic belief requires voluntary commitment. State-mandated religion may actively damage what it claims to protect.",
        followUp:
          "Is the goal to spread Christian faith, or to assert Christian dominance? They have different policy implications.",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The role-reversal question is the most decisive because it tests whether the principle the speaker is asserting is actually a principle at all. If they would not accept the same rule when applied with a different religion, they don't really hold the principle — they hold a preference dressed as a principle. Most listeners cannot honestly bite the bullet here.",
    finalInsight:
      "'Public schools should teach the Bible' requires answering questions most proposers haven't worked through: which Christianity, what about other religions, what about non-religious families, what does the First Amendment do, and what does coerced religious instruction actually produce. The serious religious case against state religion is older and stronger than the secular case — many of the most committed Christians in American history opposed Establishment because they understood what it does to faith. The proposal usually conflates spreading Christianity with asserting Christian dominance, and they're not the same thing.",
    difficulty: 2,
    tags: ["religion", "education", "first-amendment", "confucius", "voltaire"],
  },
  {
    id: "drag-story-hour-harm",
    topic: "Harm, Tolerance, and Who Decides",
    initialClaim:
      "Drag queen story hour is harmful to children and shouldn't be allowed in public libraries.",
    context:
      "A claim made in library board hearings across Oklahoma. Tests both the empirical claim about harm and the question of who decides what counts as harmful.",
    questions: [
      {
        question:
          "What specific, documented harm has been measured from children attending a drag performer reading a children's book aloud — and who measured it?",
        expectedInsight:
          "There is no peer-reviewed evidence that voluntary attendance at drag story hour produces measurable harm. The harm claim is asserted, not demonstrated. Asking for the evidence usually reveals the claim is operating as moral conviction described as empirical fact.",
        followUp:
          "If the harm cannot be demonstrated empirically, on what basis is it claimed?",
      },
      {
        question:
          "Voltaire's framing was that every law is 'a collectively agreed-upon set of intolerances' — we tolerate most things and forbid those with concrete harm. What's the criterion you'd apply that would forbid drag story hour without also forbidding things you support?",
        expectedInsight:
          "Most criteria that would prohibit drag story hour (offense to certain religious traditions, exposure to ideas parents disagree with, gender presentation different from majority norms) would also prohibit many other things the speaker likely supports. A principled criterion that singles out only drag is hard to articulate.",
        followUp:
          "Does the inability to state a consistent criterion suggest the position is grounded in something other than principle?",
      },
      {
        question:
          "The events are voluntary. Parents bring their children if they want to. Why is forbidding the events different from telling other parents what programming they can choose for their families?",
        expectedInsight:
          "The objection is not really to one's own children attending — they don't have to. The objection is to other people's children being permitted to attend. That's a request that the state forbid other families from making a choice the speaker would not make. Whether that's an acceptable role for the state is a serious question, distinct from whether the speaker personally disapproves.",
        followUp:
          "Where else do we let state authority forbid voluntary family choices we disapprove of — and would we want that principle applied to choices we make?",
      },
      {
        question:
          "Karl Popper's paradox of tolerance says a tolerant society must be intolerant of intolerance to survive. But by that logic, those who would forbid drag story hour are themselves the intolerance the society must oppose. Who decides which intolerance is the one to forbid?",
        expectedInsight:
          "The 'paradox of tolerance' argument cuts both ways. Whoever wields it gets to label opponents as the dangerous intolerance to suppress. That's exactly why Voltaire and Popper argued for a substantive harm criterion rather than a vague intolerance criterion — only concrete harm provides a stopping rule that doesn't collapse into 'whoever has the megaphone decides.'",
        followUp:
          "If we don't have a concrete harm standard, what stops 'intolerance of intolerance' from becoming a tool for whichever side currently holds power?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The harm-evidence question is the most piercing because it forces the speaker to either produce evidence (which doesn't exist) or admit the claim isn't really about measured harm. Once that admission is made — or refused — the conversation moves to its real terrain: moral conviction asserted as fact, and whether that's a sufficient basis for state restriction.",
    finalInsight:
      "The harm framing is usually rhetorical positioning rather than empirical claim. When pressed for evidence, none is produced — because the actual basis is moral disapproval of gender presentation outside traditional norms. That's a position someone can hold; whether it's a basis for state restriction on voluntary activities other families choose for their children is a different question, and it's the one the harm framing tries to skip. Voltaire's criterion — concrete harm — exists precisely to prevent 'I disapprove' from becoming 'the state must forbid.'",
    difficulty: 2,
    tags: ["tolerance", "voltaire", "popper", "library-policy"],
  },
  {
    id: "if-poor-work-harder",
    topic: "Meritocracy, Health, and Responsibility",
    initialClaim:
      "If you can't afford healthcare in this country, you should work harder.",
    context:
      "A claim heard in debates about Medicaid expansion, hospital closures, and rural maternal mortality. Tests the link between effort and access.",
    questions: [
      {
        question:
          "Two adults in adjoining rural Oklahoma counties work equally hard. One has employer-provided insurance through a job that happens to offer it; the other works a similar-paying job that doesn't. Did one work harder than the other?",
        expectedInsight:
          "Employer-provided healthcare in the U.S. is essentially a function of job sector and employer size, not effort. Two equally hardworking people can have completely different healthcare access depending on which company happened to be hiring. The effort-to-access link is much weaker than the framing assumes.",
        followUp:
          "If access doesn't track effort, what is the moral logic of the 'work harder' response actually doing?",
      },
      {
        question:
          "Caregivers — usually women — who stay home with children or aging parents are doing essential labor but typically earn no income and have no employer healthcare. Are they 'not working hard enough'?",
        expectedInsight:
          "An enormous amount of socially essential labor is unpaid and produces no insurance access. Telling unpaid caregivers to 'work harder' either ignores their labor or asks them to abandon it for the labor market — which would require someone else to take over the unpaid work they were doing.",
        followUp:
          "What does it tell us that the framing only counts wage-labor as 'work'?",
      },
      {
        question:
          "A child born in Atoka County has no employment status. Is a sick child without healthcare access expected to 'work harder'?",
        expectedInsight:
          "Children's healthcare access depends on their parents' circumstances, which they did not choose. The 'work harder' framing only addresses adult labor market participants — it has no answer for children, the disabled, or the elderly, which together are most of healthcare's high-cost population.",
        followUp:
          "If the framing doesn't address most of the people who actually need healthcare, what is it really a response to?",
      },
      {
        question:
          "Stoic philosophy holds that virtue is the only intrinsic good and outcomes (like health) are 'indifferents' that don't reflect moral worth. Does the 'work harder' framing implicitly invert this — making the absence of an outcome (health insurance) a sign of moral failure?",
        expectedInsight:
          "Linking access-to-healthcare to moral worth is a contemporary American move that most ethical traditions would reject. The Stoics, Christians, Buddhists, and most other traditions hold that health and material circumstance are not measures of virtue. The 'work harder' framing makes a moral claim few traditions actually support.",
        followUp:
          "If most ethical traditions reject the equation of outcome and virtue, where does the conviction come from in this case?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "The two-equally-hardworking-people example is the most decisive because it isolates the effort variable while changing the outcome. If two equally hard workers can have completely different healthcare access, then access cannot be a measure of effort. The question makes this concrete and undeniable.",
    finalInsight:
      "Healthcare access in the U.S. is tied to specific employers, not to effort. Children, caregivers, the disabled, and the elderly are most of the high-cost population, and none of them are addressed by 'work harder.' The framing makes a moral claim — that absence of insurance reflects absence of virtue — that almost no ethical tradition actually supports. The serious debate about American healthcare is structural and policy-shaped, not moral, and the 'work harder' framing functions to avoid that debate.",
    difficulty: 1,
    tags: ["healthcare", "meritocracy", "stoics", "responsibility"],
  },
  {
    id: "oil-economy-no-choice",
    topic: "Economic Identity and Path Dependence",
    initialClaim:
      "Oklahoma is an oil and gas state. We can't transition to anything else — it's who we are.",
    context:
      "Said in debates about energy diversification, renewable investment, and Phoenix Wells-style community energy. Tests whether economic identity is fate.",
    questions: [
      {
        question:
          "Was Oklahoma always an oil and gas state? When the state was founded in 1907, what was the dominant economy?",
        expectedInsight:
          "Oklahoma was primarily agricultural at statehood — wheat, cotton, cattle. Oil discoveries (Glenn Pool 1905, the Osage fields) transformed the economy, but the transformation was active and recent. 'Who we are' is a historical claim, and the history shows the identity itself was a change from a prior identity.",
        followUp:
          "If oil identity was itself a transition, what does that suggest about whether further transitions are possible?",
      },
      {
        question:
          "Pittsburgh was a steel city, Detroit was an auto city, Appalachia was a coal region. Did 'who we are' protect them when the underlying economic conditions changed?",
        expectedInsight:
          "Economic identity provides no protection against structural shifts. Cities and regions that depended on industries that contracted were not saved by their identity — they were damaged by their failure to diversify before the contraction. 'Who we are' is a story; the structural shift is a force.",
        followUp:
          "What did those regions wish they had done 20 years before the contraction hit?",
      },
      {
        question:
          "Oklahoma has world-class wind resources (top 5 nationally), excellent solar potential, large geothermal reserves, lithium deposits, and the workforce skills for energy production. Is diversification a betrayal of identity or an extension of it?",
        expectedInsight:
          "If Oklahoma's identity is 'energy state,' diversification into wind, solar, geothermal, and lithium is consistent with that identity, not opposed to it. The narrowing of 'energy state' to 'oil and gas state' is itself a choice that limits the identity unnecessarily.",
        followUp:
          "Whose interests are served by the narrower definition of identity?",
      },
      {
        question:
          "Bacon argued that science could end scarcity if knowledge was treated as public good rather than private leverage. If Oklahoma developed publicly-owned energy infrastructure (Phoenix Wells-style) alongside private oil and gas, would that strengthen or weaken the state's energy leadership?",
        expectedInsight:
          "An energy economy that includes public ownership of common resources — wind, geothermal, water — would distribute the benefits more broadly than the current model and provide a buffer against price collapses in any single sector. Treating energy as both private extraction and public commons would make Oklahoma more resilient, not less identifiable.",
        followUp:
          "What would Oklahoma look like in 2050 if it diversified now, versus if it waited until forced to?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The Pittsburgh/Detroit comparison is most cutting because it shows the listener that other proud industrial identities did not survive the underlying economic shift. Identity didn't save those cities; it postponed their reckoning. The example carries the weight of demonstrated history rather than speculation.",
    finalInsight:
      "Economic identity is not fate. Oklahoma was agricultural before it was an oil state, and the transition to oil was itself a chosen change. Other regions with strong industrial identities — Pittsburgh, Detroit, Appalachia — were not protected by 'who we are' when underlying conditions shifted. Oklahoma's deep energy assets are broader than fossil fuels, and diversification is consistent with the state's identity as an energy producer, not opposed to it. The narrower definition is a political choice with identifiable beneficiaries, not a neutral statement of fact.",
    difficulty: 2,
    tags: ["economic-policy", "energy", "identity", "phoenix-wells", "bacon"],
  },
  {
    id: "outsiders-dont-understand",
    topic: "Locality, Authority, and Expertise",
    initialClaim:
      "Outsiders don't understand Oklahoma. We should make our own decisions without federal interference.",
    context:
      "A common framing in debates about Medicaid expansion, federal environmental rules, EPA enforcement, and tribal jurisdiction. Tests the principle and its consistency.",
    questions: [
      {
        question:
          "Oklahoma receives more federal dollars than it sends in federal taxes. Is the federal relationship purely 'interference,' or is it also support that Oklahomans benefit from?",
        expectedInsight:
          "Oklahoma is a net beneficiary of federal spending — agricultural subsidies, military bases, Medicare, Social Security, disaster relief, highway funds, Indian Health Service. The 'interference' framing focuses on rules while ignoring the resources that come with the relationship.",
        followUp:
          "If we accept the resources, on what basis do we reject the rules?",
      },
      {
        question:
          "If the principle is 'locals decide for locals,' does the principle apply within Oklahoma too? Should Tulsa decide for Tulsa without state interference? Should each county decide for itself?",
        expectedInsight:
          "The 'locality' argument scales recursively. If Oklahoma should be free from federal rules, why should Tulsa be subject to state rules it didn't vote for? The principle, consistently applied, would devolve to the household level — which most proponents don't actually support.",
        followUp:
          "What's the principled basis for stopping the devolution at the state level rather than going further or stopping sooner?",
      },
      {
        question:
          "Who counts as an 'outsider'? A born-and-raised Oklahoman who moved away for college and returned at 30? A Texan who has lived here for 40 years? A federal scientist measuring air quality? A descendant of original Indigenous inhabitants?",
        expectedInsight:
          "'Outsider' is doing a lot of unspecified work. Definitions that include some longtime residents while excluding others — or that count federal employees as outsiders but accept federal money as legitimate — reveal that 'outsider' often means 'people whose conclusions I don't like,' not a geographic category.",
        followUp:
          "If the term can't be defined consistently, what is it actually marking?",
      },
      {
        question:
          "When Oklahoma's Indigenous nations make decisions about reservation land that the state government disagrees with, does the 'locals decide for locals' principle apply to them, or does it apply only to the state?",
        expectedInsight:
          "The locality principle, consistently applied, vindicates tribal sovereignty most of all — tribes are the most local government to their members and territory. Most proponents of 'we decide for ourselves' against federal rules do not apply the same principle when tribal nations assert sovereignty against state rules. The selective application reveals the principle isn't really about locality.",
        followUp:
          "What does it tell us that the principle is invoked against federal authority but resisted when tribes invoke it against state authority?",
      },
    ],
    strongestQuestionIndex: 1,
    strongestExplanation:
      "The recursive-locality question is the most penetrating because it tests whether the principle is actually held or merely deployed. If 'locals decide for locals' is the real principle, it shouldn't stop at the state line. The listener has to either accept the recursive implications (which most don't) or admit the principle is a tactical framing, not a commitment.",
    finalInsight:
      "The 'outsiders don't understand' framing is usually deployed selectively. Oklahoma takes federal money while rejecting federal rules, invokes locality against Washington while overriding it against Tulsa and against tribal nations. The principle, applied consistently, would either devolve to households or vindicate tribal sovereignty against state government. The selective application reveals it as a frame, not a principle — and serious local governance is better served by engaging the actual policy substance than by defending a frame that doesn't survive examination.",
    difficulty: 2,
    tags: ["federalism", "locality", "tribal-sovereignty", "consistency"],
  },
];

export const philosophySocraticChainCount = philosophySocraticChains.length;
