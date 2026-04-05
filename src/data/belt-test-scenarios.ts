import type { CurriculumBeltLevel } from "@/data/belts";

export interface BeltTestScenario {
  id: string;
  passage: string;
  fallacyId: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface BeltTestDef {
  level: CurriculumBeltLevel;
  name: string;
  description: string;
  scenarios: BeltTestScenario[];
  passingScore: number;
  format: "multiple-choice" | "free-text";
}

export const BELT_TESTS: BeltTestDef[] = [
  {
    level: "white",
    name: "White Belt Graduation",
    description:
      "Prove your mastery of the four foundational fallacies: Ad Hominem, Straw Man, Appeal to Authority, and Appeal to Emotion.",
    passingScore: 0.8,
    format: "multiple-choice",
    scenarios: [
      {
        id: "wt-1",
        passage:
          "A former factory worker submitted a detailed safety report documenting cracks in load-bearing equipment. The plant manager responded at the board meeting: \"This report comes from a man who was terminated last year for chronic tardiness. He clearly has an axe to grind, and his so-called findings reflect personal bitterness, not genuine safety concerns. I'd recommend we file this away and move on.\"",
        fallacyId: "ad_hominem",
        correctAnswer: "Ad Hominem",
        options: ["Red Herring", "Ad Hominem", "Appeal to Emotion", "Straw Man"],
        explanation:
          "The plant manager attacks the worker's character and employment history rather than evaluating the documented safety findings. Whether or not the worker was fired for tardiness has no bearing on whether the equipment cracks he documented are real.",
      },
      {
        id: "wt-2",
        passage:
          "Senator Rivera has introduced a detailed campaign finance reform bill. Her opponent responded in a press conference: \"Senator Rivera lectures us about money in politics, yet public records show she accepted $500,000 from a major lobbying group just last quarter. How can we take her reform proposals seriously when she is part of the very system she claims to want to fix?\"",
        fallacyId: "ad_hominem",
        correctAnswer: "Ad Hominem",
        options: [
          "Straw Man",
          "Appeal to Authority",
          "Ad Hominem",
          "Hasty Generalization",
        ],
        explanation:
          "The opponent targets the senator's personal behavior rather than analyzing the merits of the reform bill itself. Even if the senator is hypocritical, her bill could still contain sound policy proposals. The logic of legislation stands or falls independently of its author's conduct.",
      },
      {
        id: "wt-3",
        passage:
          "Professor Yang proposed incorporating more collaborative group projects into the engineering curriculum. At the faculty meeting, a colleague responded: \"What Professor Yang is really suggesting is that we eliminate individual assessment entirely and let students coast on the work of their more talented peers. If we abandon rigorous individual evaluation, we'll be graduating engineers who can't solve problems on their own.\"",
        fallacyId: "straw_man",
        correctAnswer: "Straw Man",
        options: [
          "Slippery Slope",
          "Straw Man",
          "Hasty Generalization",
          "Appeal to Emotion",
        ],
        explanation:
          "Professor Yang suggested adding group projects, not eliminating individual assessment. The colleague distorts her moderate proposal into the extreme position of abandoning all individual evaluation, making it much easier to attack.",
      },
      {
        id: "wt-4",
        passage:
          "During a city council meeting about a proposed 20% increase in urban green space over the next decade, an opposing council member stated: \"The mayor apparently believes that converting productive commercial real estate into empty parks is the answer to all our urban challenges. While businesses struggle and tax revenue declines, he wants us to plant trees instead of creating jobs.\"",
        fallacyId: "straw_man",
        correctAnswer: "Straw Man",
        options: [
          "Ad Hominem",
          "False Dilemma",
          "Straw Man",
          "Appeal to Authority",
        ],
        explanation:
          "A 20% increase in green space doesn't mean converting all commercial land to parks, nor did the mayor claim it would solve all problems. The opponent inflates the proposal into something far more extreme than what was actually proposed.",
      },
      {
        id: "wt-5",
        passage:
          "Renowned quantum physicist Dr. Elaine Hawthorne, winner of the Nobel Prize in Physics, stated in a podcast interview that the Mediterranean diet is unquestionably the optimal eating pattern for human longevity. The host concluded: \"With an intellect like hers, I think we can trust this dietary recommendation carries real weight.\"",
        fallacyId: "appeal_to_authority",
        correctAnswer: "Appeal to Authority",
        options: [
          "Appeal to Authority",
          "Bandwagon",
          "Ad Hominem",
          "Hasty Generalization",
        ],
        explanation:
          "Dr. Hawthorne's Nobel Prize in physics does not make her an authority on nutrition or longevity. Her brilliance in quantum mechanics is irrelevant to evaluating dietary science. Credible diet recommendations require expertise in nutritional science and epidemiology.",
      },
      {
        id: "wt-6",
        passage:
          "Three-time Olympic gold medalist and national hero Maria Chen publicly endorsed a new K-12 educational software platform, calling it \"transformative\" for her own children's learning. The company's marketing team featured her endorsement prominently, noting: \"With her extraordinary track record of excellence and discipline, Maria Chen's judgment on what drives success speaks for itself.\"",
        fallacyId: "appeal_to_authority",
        correctAnswer: "Appeal to Authority",
        options: [
          "Appeal to Emotion",
          "Appeal to Authority",
          "Bandwagon",
          "Straw Man",
        ],
        explanation:
          "Maria Chen's athletic achievements do not qualify her to evaluate educational software. The marketing leverages her celebrity status and unrelated competitive success rather than citing educators, researchers, or controlled studies of the software's effectiveness.",
      },
      {
        id: "wt-7",
        passage:
          "At a school board hearing on a proposed 10% budget reduction to the after-school program, a parent testified: \"If you cut even a single dollar from this program, you are abandoning the most vulnerable children in our community. These kids will be left on dangerous streets with nowhere to go. Do you want their safety on your conscience? Every board member who votes yes on this cut is telling these families that their children don't matter.\"",
        fallacyId: "appeal_to_emotion",
        correctAnswer: "Appeal to Emotion",
        options: [
          "False Dilemma",
          "Slippery Slope",
          "Appeal to Emotion",
          "Ad Hominem",
        ],
        explanation:
          "While concern for children is legitimate, this argument relies on guilt and fear rather than addressing whether a 10% reduction would actually eliminate the program, what specific impacts it would have, or whether the remaining budget could still serve students effectively.",
      },
      {
        id: "wt-8",
        passage:
          "The town council is considering replacing an 80-year-old wooden footbridge with a modern concrete structure after engineers flagged structural concerns. At the public meeting, a resident pleaded: \"This bridge has been the backdrop of thousands of wedding photos, first kisses, and family memories for generations. Our grandparents courted on this bridge. Tearing it down tears out the soul of our community. Some things are worth more than engineering reports.\"",
        fallacyId: "appeal_to_emotion",
        correctAnswer: "Appeal to Emotion",
        options: [
          "Appeal to Authority",
          "Red Herring",
          "Straw Man",
          "Appeal to Emotion",
        ],
        explanation:
          "The argument relies entirely on nostalgia and emotional attachment. While the bridge may have sentimental value, the engineering concerns about structural safety are factual questions that emotional arguments cannot address. Sentiment doesn't determine whether a bridge is safe to cross.",
      },
    ],
  },
  {
    level: "yellow",
    name: "Yellow Belt Graduation",
    description:
      "Prove your mastery of four intermediate fallacies: False Dilemma, Slippery Slope, Hasty Generalization, and Red Herring.",
    passingScore: 0.8,
    format: "multiple-choice",
    scenarios: [
      {
        id: "yt-1",
        passage:
          "A tech industry lobbyist addressed Congress: \"As we debate data privacy regulation, the choice before us is stark. We can either allow technology companies the freedom to innovate with user data, fueling the AI revolution that will define global competitiveness — or we can impose heavy-handed regulations that strangle the industry in red tape, causing thousands of layoffs and ceding technological leadership to China. The question is whether America chooses progress or managed decline.\"",
        fallacyId: "false_dilemma",
        correctAnswer: "False Dilemma",
        options: [
          "Slippery Slope",
          "False Dilemma",
          "Appeal to Emotion",
          "Hasty Generalization",
        ],
        explanation:
          "This presents only two extreme outcomes — total deregulation or innovation-crushing overregulation — while ignoring many possible middle-ground approaches such as targeted transparency requirements, opt-in data sharing frameworks, or sector-specific guidelines.",
      },
      {
        id: "yt-2",
        passage:
          "At a project review meeting, the lead developer told the team: \"The client wants major revisions to the user interface. Here's the reality: we can either ship the product as-is and meet our contractual deadline in three weeks, or we go back to the drawing board on the UI, which pushes delivery back by at least two months and puts the whole contract at risk. There's no in-between here — we need to decide now.\"",
        fallacyId: "false_dilemma",
        correctAnswer: "False Dilemma",
        options: [
          "Red Herring",
          "False Dilemma",
          "Straw Man",
          "Appeal to Authority",
        ],
        explanation:
          "The developer presents only two options when several alternatives exist: incorporating the highest-priority UI changes within the timeline, delivering in phases, negotiating a modest extension, or addressing cosmetic issues in a post-launch patch.",
      },
      {
        id: "yt-3",
        passage:
          "During a state legislature debate on allowing independently trained nurse practitioners to prescribe medications in underserved rural areas, an opposing senator argued: \"If we grant prescribing rights to nurse practitioners today, we set a precedent that erodes professional boundaries. Next, pharmacists will demand the same authority. Then physician assistants in every specialty. Before long, wellness coaches and naturopaths with weekend certifications will be writing prescriptions, and we'll have systematically dismantled the standards that keep patients safe.\"",
        fallacyId: "slippery_slope",
        correctAnswer: "Slippery Slope",
        options: [
          "Hasty Generalization",
          "Straw Man",
          "Slippery Slope",
          "False Dilemma",
        ],
        explanation:
          "Expanding prescribing rights for specifically trained nurse practitioners in targeted settings doesn't automatically lead to unqualified people prescribing medications. Each step in this claimed chain would require its own legislative process, evidence review, and political approval — none of which follows inevitably from the first policy change.",
      },
      {
        id: "yt-4",
        passage:
          "A school board member argued against allowing students to use personal laptops during supervised study halls: \"If we let students bring laptops to study hall, the next request will be smartphones in every classroom. After that, they'll want headphones during lectures, then streaming access during free periods. Within two years, you'll have students watching movies in calculus class. We need to hold the line here or we'll lose all control over the learning environment.\"",
        fallacyId: "slippery_slope",
        correctAnswer: "Slippery Slope",
        options: [
          "Slippery Slope",
          "Red Herring",
          "Appeal to Emotion",
          "Bandwagon",
        ],
        explanation:
          "Permitting laptops during a supervised study hall does not inevitably lead to unrestricted entertainment in academic classes. Each policy change would be a separate decision with its own evaluation. The argument assumes an unstoppable cascade without providing evidence that one step necessitates the next.",
      },
      {
        id: "yt-5",
        passage:
          "A company's VP of Operations presented to the executive team: \"We piloted the new project management platform with a six-person team from the marketing department over a two-week period. Four out of six team members reported they preferred the legacy system, and average task completion time increased by 12%. The data is clear — this software is a downgrade. I recommend we cancel the company-wide rollout to all 2,000 employees immediately.\"",
        fallacyId: "hasty_generalization",
        correctAnswer: "Hasty Generalization",
        options: [
          "Hasty Generalization",
          "False Dilemma",
          "Appeal to Authority",
          "Bandwagon",
        ],
        explanation:
          "A two-week trial with six people from one department is far too small and limited to draw reliable conclusions about software for 2,000 employees across the entire organization. Preferences may vary by department, role, and learning curve. A rigorous evaluation would need a larger sample, longer timeline, and multiple departments.",
      },
      {
        id: "yt-6",
        passage:
          "After a weekend trip to Tokyo, a travel blogger wrote: \"I visited eight restaurants across two neighborhoods, and every single one had impeccable service — attentive staff, precise timing, and spotless interiors. Japan clearly has an unmatched cultural commitment to service excellence that Western countries fundamentally lack. Our entire hospitality industry should study and adopt the Japanese model of customer care.\"",
        fallacyId: "hasty_generalization",
        correctAnswer: "Hasty Generalization",
        options: [
          "Straw Man",
          "Red Herring",
          "Hasty Generalization",
          "Appeal to Emotion",
        ],
        explanation:
          "Eight restaurants in two neighborhoods of one city over a weekend cannot represent an entire nation's service culture, let alone justify sweeping comparisons between civilizations. The sample is tiny, geographically concentrated, and likely biased toward tourist-facing establishments.",
      },
      {
        id: "yt-7",
        passage:
          "A journalist asked the CEO of a chemical company about a regulatory report confirming that their factory had been discharging toxic compounds into a nearby river, causing measurable harm to local fish populations. The CEO responded: \"What I think is really important to focus on here is the broader picture of our community engagement. Over the past decade, we've invested $50 million in local infrastructure, built three schools, funded 200 college scholarships, and provided healthcare access to thousands of families. That's the real story of our company's impact on this region.\"",
        fallacyId: "red_herring",
        correctAnswer: "Red Herring",
        options: [
          "Ad Hominem",
          "Straw Man",
          "Appeal to Authority",
          "Red Herring",
        ],
        explanation:
          "The CEO's community investments, while potentially commendable, are completely irrelevant to the specific question about toxic chemical discharge and environmental damage. The response diverts attention from the documented pollution without addressing, denying, or explaining the regulatory findings.",
      },
      {
        id: "yt-8",
        passage:
          "When a reporter pressed Councilmember Torres about the city's new transit project — now 40% over its original $200 million budget — she responded: \"I find it interesting that critics fixate on budget figures while ignoring the real crisis facing our residents. Every morning, tens of thousands of commuters sit in soul-crushing gridlock, losing hours of their lives. Families miss dinners. Workers arrive late and stressed. That human cost of inaction is what this council should be focused on, not spreadsheet debates.\"",
        fallacyId: "red_herring",
        correctAnswer: "Red Herring",
        options: [
          "False Dilemma",
          "Red Herring",
          "Slippery Slope",
          "Hasty Generalization",
        ],
        explanation:
          "While traffic congestion may justify building transit, it doesn't address the specific question of why the project is $80 million over budget. The councilmember redirects the conversation to a related but different topic rather than explaining or defending the cost overruns.",
      },
    ],
  },
];
