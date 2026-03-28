export interface SocraticQuestion {
  question: string;
  expectedInsight: string;
  followUp: string;
}

export interface SocraticChain {
  id: string;
  topic: string;
  initialClaim: string;
  context: string;
  questions: SocraticQuestion[];
  strongestQuestionIndex: number;
  strongestExplanation: string;
  finalInsight: string;
  difficulty: 1 | 2 | 3;
  tags: string[];
}

export const socraticChains: SocraticChain[] = [
  {
    id: "success-hard-work",
    topic: "Meritocracy & Success",
    initialClaim:
      "Success is purely the result of hard work and determination.",
    context:
      "A widely held belief that motivates effort but may also justify inequality and ignore structural factors.",
    questions: [
      {
        question:
          "Can you think of someone who works extremely hard but hasn't achieved conventional success?",
        expectedInsight:
          "Hard work alone doesn't guarantee success — other factors are clearly at play.",
        followUp:
          "What factors besides effort might explain the gap between hard work and success?",
      },
      {
        question:
          "If two equally hardworking people are born in different countries — one wealthy, one impoverished — would you expect the same outcomes?",
        expectedInsight:
          "Starting conditions like birthplace, family wealth, and access to education massively influence outcomes regardless of effort.",
        followUp:
          "How much of 'success' do you think is determined before a person makes their first choice?",
      },
      {
        question:
          "Were there lucky breaks, timing, or connections in the careers of successful people you admire?",
        expectedInsight:
          "Even highly accomplished people benefit from timing, networks, and chance events they didn't earn.",
        followUp:
          "Does acknowledging luck diminish the value of hard work, or does it add nuance to how we understand success?",
      },
      {
        question:
          "If success is purely about hard work, does that mean unsuccessful people simply didn't try hard enough?",
        expectedInsight:
          "The belief that success equals effort implies that failure equals laziness — a conclusion most people find uncomfortable when examined directly.",
        followUp:
          "What are the consequences of a society that attributes all outcomes to individual effort?",
      },
    ],
    strongestQuestionIndex: 3,
    strongestExplanation:
      "This question is the most penetrating because it reveals the uncomfortable logical conclusion: if success equals effort, then failure must equal laziness — a reductio ad absurdum that forces direct confrontation with the claim's implications.",
    finalInsight:
      "Hard work matters, but it operates within systems of opportunity, luck, and structural advantage. Recognizing this doesn't devalue effort — it leads to more accurate and compassionate judgments about both success and failure.",
    difficulty: 1,
    tags: ["meritocracy", "inequality", "assumptions"],
  },
  {
    id: "technology-progress",
    topic: "Technology & Progress",
    initialClaim: "Technology always makes our lives better.",
    context:
      "A default assumption in modern culture that equates technological progress with human improvement, rarely questioned in everyday life.",
    questions: [
      {
        question:
          "Can you name a technology that solved one problem but created a new, different problem?",
        expectedInsight:
          "Technologies often involve tradeoffs — social media connects us globally but increases anxiety; cars enable mobility but cause pollution and urban sprawl.",
        followUp:
          "If technology creates new problems while solving old ones, how do we measure whether we're actually better off?",
      },
      {
        question:
          "Has there been a technology in your own life that you initially loved but later felt made things worse?",
        expectedInsight:
          "Personal experience often reveals that 'better' is more nuanced than marketing promises — convenience can come at the cost of attention, privacy, or well-being.",
        followUp:
          "Why do we tend to adopt technologies before fully understanding their long-term effects?",
      },
      {
        question:
          "Who tends to benefit most from a new technology, and who tends to bear the costs?",
        expectedInsight:
          "Technology's benefits and burdens are distributed unevenly — the creators and early adopters often benefit while displaced workers, communities, and the environment absorb costs.",
        followUp:
          "Does it change your view of 'progress' if the costs fall disproportionately on people who didn't choose the technology?",
      },
      {
        question:
          "Is it possible for a society to choose NOT to adopt a technology? What would that require?",
        expectedInsight:
          "Technological adoption often feels inevitable, but it results from choices — market incentives, regulations, and cultural values all shape what we adopt and what we don't.",
        followUp:
          "If we can choose, what criteria should guide which technologies we embrace and which we resist?",
      },
    ],
    strongestQuestionIndex: 2,
    strongestExplanation:
      "This question cuts deepest because it exposes who actually benefits and who bears the cost — revealing that 'better for everyone' hides a distributional assumption that often doesn't hold.",
    finalInsight:
      "Technology is a powerful tool, but 'progress' is not automatic or universal. Every technology embodies tradeoffs, distributes benefits unevenly, and reflects the values of those who create and deploy it. Critical engagement — not blanket optimism or pessimism — leads to better outcomes.",
    difficulty: 1,
    tags: ["technology", "progress", "tradeoffs"],
  },
  {
    id: "majority-rule",
    topic: "Democracy & Decision-Making",
    initialClaim:
      "The majority should always decide — that's what democracy means.",
    context:
      "Majority rule is the most familiar form of democratic decision-making, but equating it with democracy itself obscures important tensions and protections.",
    questions: [
      {
        question:
          "If 51% of people voted to take away the rights of the other 49%, would that be a just outcome?",
        expectedInsight:
          "Pure majority rule can become tyranny of the majority — democratic systems need protections for minorities that override simple vote counts.",
        followUp:
          "What mechanisms exist in democratic systems to prevent this kind of outcome?",
      },
      {
        question:
          "Are there decisions in your life where you'd be uncomfortable letting a majority vote override your personal choice?",
        expectedInsight:
          "Most people recognize certain domains — religion, speech, bodily autonomy — where majority preferences shouldn't control individual choices, revealing that even democracy believers set limits on majority power.",
        followUp:
          "How do we decide which decisions are appropriate for majority rule and which are not?",
      },
      {
        question:
          "If a majority votes based on misinformation or emotional manipulation, is the outcome still legitimate?",
        expectedInsight:
          "The quality of democratic decisions depends on the quality of information and deliberation — a manipulated majority vote undermines the very principle it claims to uphold.",
        followUp:
          "What does this suggest about the relationship between democracy and education or media quality?",
      },
      {
        question:
          "Should the majority of today be able to make permanent decisions that future generations can't easily reverse?",
        expectedInsight:
          "Temporal majority rule raises deep questions — current voters shouldn't be able to irreversibly bind future generations who had no voice in the decision.",
        followUp:
          "How do concepts like constitutional amendments, supermajority requirements, and environmental law try to address this?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "This question is the most penetrating because it immediately surfaces the classic 'tyranny of the majority' problem — a direct counter-example that forces a distinction between majority rule and justice.",
    finalInsight:
      "Democracy is more than majority rule — it's a system of self-governance that balances majority decision-making with minority protections, deliberative processes, and intergenerational responsibility. Reducing democracy to 'the majority decides' misses most of what makes democratic governance valuable.",
    difficulty: 2,
    tags: ["democracy", "majority-rule", "rights"],
  },
  {
    id: "censorship-protection",
    topic: "Speech & Censorship",
    initialClaim:
      "Harmful speech should be censored to protect people from its effects.",
    context:
      "A position that feels compassionate and protective, but raises fundamental questions about who decides what's harmful and the unintended consequences of speech restrictions.",
    questions: [
      {
        question:
          "Who would you trust to decide what counts as 'harmful speech'? A government? A corporation? A committee of experts?",
        expectedInsight:
          "Any censor must be given power, and that power can be — and historically has been — abused. The 'who decides' question reveals that censorship always concentrates power in someone's hands.",
        followUp:
          "Can you think of historical examples where speech that was censored as 'harmful' turned out to be important or true?",
      },
      {
        question:
          "If speech critical of powerful institutions could be labeled 'harmful' and suppressed, what would that mean for accountability and reform?",
        expectedInsight:
          "Censorship frameworks designed to protect the vulnerable can be co-opted to protect the powerful — civil rights speech, labor organizing, and LGBTQ+ advocacy were all once classified as 'harmful.'",
        followUp:
          "How do we distinguish between speech that genuinely harms vulnerable people and speech that merely challenges those in power?",
      },
      {
        question:
          "Does censoring a harmful idea make it go away, or does it push it underground where it becomes harder to identify and counter?",
        expectedInsight:
          "Suppressed ideas often gain an aura of forbidden truth. Counter-speech, education, and open debate may be more effective at reducing genuine harm than prohibition.",
        followUp:
          "Is there a middle ground between unrestricted speech and censorship — for example, counter-speech obligations, labeling, or platform design changes?",
      },
      {
        question:
          "If you grew up in a society where the government censored speech 'for your protection,' how would you evaluate whether it was actually protecting you or controlling you?",
        expectedInsight:
          "From inside a censored system, it's difficult to know what you're missing — which is precisely why censorship is so dangerous. The inability to evaluate the censor's decisions is built into the system.",
        followUp:
          "What safeguards would be necessary to make any speech restriction trustworthy and accountable?",
      },
    ],
    strongestQuestionIndex: 3,
    strongestExplanation:
      "This question is the most devastating because it reveals an epistemic impossibility built into censorship itself: from inside a censored system, you cannot evaluate what you're missing — making the censor's decisions fundamentally uncheckable.",
    finalInsight:
      "The impulse to censor harmful speech comes from a good place — wanting to prevent genuine suffering. But the mechanics of censorship create dangerous concentrations of power, historical track records show frequent abuse, and the suppression of ideas often backfires. The challenge is finding ways to reduce genuine harm without creating tools of control that can be turned against the vulnerable.",
    difficulty: 3,
    tags: ["free-speech", "censorship", "power"],
  },
  {
    id: "tradition-value",
    topic: "Tradition & Change",
    initialClaim:
      "Traditions should be preserved because they've stood the test of time.",
    context:
      "An appeal to the longevity of practices as evidence of their value — a common and emotionally powerful argument that deserves careful examination.",
    questions: [
      {
        question:
          "Can you think of a tradition that lasted for centuries but is now widely considered wrong?",
        expectedInsight:
          "Slavery, child labor, denying women the vote — many long-lasting traditions were eventually recognized as unjust. Longevity alone doesn't confer moral validity.",
        followUp:
          "If long-lasting traditions can be wrong, what does that tell us about using 'it's always been this way' as a justification?",
      },
      {
        question:
          "What factors besides genuine value might explain why a tradition persists?",
        expectedInsight:
          "Traditions can persist through inertia, power structures, social pressure, and fear of change — not because they were continuously evaluated and found worthy.",
        followUp:
          "How can we tell the difference between a tradition that persists because it's valuable and one that persists because change is difficult?",
      },
      {
        question:
          "Is there a tradition you personally follow that you've never really questioned? What would happen if you did?",
        expectedInsight:
          "Many traditions operate below the level of conscious choice — we follow them because they're familiar, not because we've evaluated them. Questioning a tradition isn't the same as rejecting it.",
        followUp:
          "Does a tradition become more meaningful if you continue it after conscious evaluation rather than out of habit?",
      },
      {
        question:
          "Could a tradition be valuable for reasons different from the ones originally given for it?",
        expectedInsight:
          "Traditions may provide community cohesion, identity, or ritual structure even when their original justifications are outdated — the value shifts over time but can still be real.",
        followUp:
          "If the original reason for a tradition no longer holds, should we find new reasons, modify it, or let it go?",
      },
    ],
    strongestQuestionIndex: 0,
    strongestExplanation:
      "This question is the most penetrating because it provides an immediate, undeniable counter-example — slavery, child labor, denying women the vote — that directly disproves the claim that longevity confers value.",
    finalInsight:
      "Traditions carry real value — community, continuity, identity, accumulated wisdom. But 'it has lasted' is not the same as 'it is good.' The most robust traditions are those that can withstand scrutiny, adapt to new understanding, and survive not because they're unquestioned but because they remain genuinely valuable when questioned.",
    difficulty: 1,
    tags: ["tradition", "assumptions", "critical-thinking"],
  },
];
