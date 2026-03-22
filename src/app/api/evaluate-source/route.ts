import { NextRequest, NextResponse } from "next/server";
import { sourceScenarios, type SourceScenario } from "@/data/source-scenarios";

interface EvaluationRequest {
  scenarioId: number;
  credibilityRating: number;
  biasIdentification: string;
  checkSuggestion: string;
}

interface FeedbackItem {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
}

function evaluateCredibility(
  rating: number,
  scenario: SourceScenario
): FeedbackItem {
  const diff = Math.abs(rating - scenario.idealCredibility);
  let score: number;
  let feedback: string;

  if (diff === 0) {
    score = 30;
    feedback = `Spot on! This ${scenario.categoryLabel.toLowerCase()} deserves a ${scenario.idealCredibility}/5.`;
  } else if (diff === 1) {
    score = 20;
    feedback = `Close — the ideal rating is ${scenario.idealCredibility}/5. ${scenario.biasNotes.split(".")[0]}.`;
  } else if (diff === 2) {
    score = 10;
    feedback = `The ideal rating is ${scenario.idealCredibility}/5. ${scenario.biasNotes}`;
  } else {
    score = 0;
    feedback = `Way off — this is a ${scenario.categoryLabel.toLowerCase()} and warrants a ${scenario.idealCredibility}/5. ${scenario.biasNotes}`;
  }

  return { category: "Credibility Rating", score, maxScore: 30, feedback };
}

function evaluateBias(
  identification: string,
  scenario: SourceScenario
): FeedbackItem {
  const text = identification.toLowerCase().trim();

  if (text.length < 10) {
    return {
      category: "Bias Identification",
      score: 0,
      maxScore: 40,
      feedback: `Your response was too brief. Here's what to look for: ${scenario.biasNotes}`,
    };
  }

  // Keywords by category that indicate good bias identification
  const categoryKeywords: Record<string, string[]> = {
    clickbait: [
      "clickbait", "sensational", "vague", "unnamed", "no evidence",
      "emotional", "fear", "exaggerat", "unsubstantiat", "no source",
      "manipulat", "bait", "mislead", "hype",
    ],
    legitimate: [
      "reliable", "factual", "credible", "neutral", "wire service",
      "named", "specific", "data", "official", "nonpartisan",
      "balanced", "verified", "trustworthy",
    ],
    satire: [
      "satire", "satirical", "humor", "joke", "parody", "onion",
      "comedy", "absurd", "fictional", "fake", "not real", "mocking",
      "tongue-in-cheek",
    ],
    "misleading-stats": [
      "misleading", "statistic", "correlation", "causation", "sample",
      "base rate", "cherry", "small number", "percent", "methodology",
      "conflict of interest", "observational", "confound",
    ],
    "out-of-context": [
      "out of context", "truncat", "cut off", "full quote", "misquot",
      "selective", "cherry-pick", "incomplete", "mislead", "edited",
      "taken out", "stripped",
    ],
  };

  const keywords = categoryKeywords[scenario.category] || [];
  const matchCount = keywords.filter((kw) => text.includes(kw)).length;

  // Also check for general critical thinking terms
  const generalKeywords = [
    "bias", "source", "evidence", "credib", "verify", "unreliable",
    "agenda", "conflict", "motive", "framing", "manipulat", "mislead",
  ];
  const generalMatches = generalKeywords.filter((kw) =>
    text.includes(kw)
  ).length;

  const totalSignals = matchCount * 2 + generalMatches;
  // Also factor in response length as a proxy for thoughtfulness
  const lengthBonus = text.length > 100 ? 2 : text.length > 50 ? 1 : 0;
  const rawScore = totalSignals + lengthBonus;

  let score: number;
  let feedback: string;

  if (rawScore >= 6) {
    score = 40;
    feedback = `Excellent analysis! You identified key issues with this ${scenario.categoryLabel.toLowerCase()}.`;
  } else if (rawScore >= 4) {
    score = 30;
    feedback = `Good identification of bias. For a more complete analysis: ${scenario.biasNotes}`;
  } else if (rawScore >= 2) {
    score = 20;
    feedback = `You're on the right track. Key points to note: ${scenario.biasNotes}`;
  } else if (rawScore >= 1) {
    score = 10;
    feedback = `Some relevant observations, but dig deeper. ${scenario.biasNotes}`;
  } else {
    score = 5;
    feedback = `Try to be more specific about what makes this source problematic (or credible). ${scenario.biasNotes}`;
  }

  return { category: "Bias Identification", score, maxScore: 40, feedback };
}

function evaluateCheckSuggestion(
  suggestion: string,
  scenario: SourceScenario
): FeedbackItem {
  const text = suggestion.toLowerCase().trim();

  if (text.length < 10) {
    return {
      category: "Verification Strategy",
      score: 0,
      maxScore: 30,
      feedback: `Your response was too brief. Good strategies: ${scenario.checkSuggestions.join("; ")}.`,
    };
  }

  // Check for actionable verification strategies
  const verificationKeywords = [
    "check", "verify", "search", "look", "find", "read", "cross-reference",
    "compare", "confirm", "original", "source", "database", "peer-review",
    "official", "transcript", "full quote", "study", "data", "pubmed",
    "government", "research", "independent", "multiple sources",
    "fact-check", "snopes", "reuters", "associated press",
  ];

  const matches = verificationKeywords.filter((kw) =>
    text.includes(kw)
  ).length;
  const lengthBonus = text.length > 80 ? 2 : text.length > 40 ? 1 : 0;
  const rawScore = matches + lengthBonus;

  let score: number;
  let feedback: string;

  if (rawScore >= 5) {
    score = 30;
    feedback = `Strong verification strategy! You identified actionable steps to check this claim.`;
  } else if (rawScore >= 3) {
    score = 22;
    feedback = `Good approach. Also consider: ${scenario.checkSuggestions[0]}.`;
  } else if (rawScore >= 2) {
    score = 15;
    feedback = `Reasonable start. Better strategies include: ${scenario.checkSuggestions.join("; ")}.`;
  } else if (rawScore >= 1) {
    score = 8;
    feedback = `Try to suggest specific, actionable steps. For example: ${scenario.checkSuggestions.join("; ")}.`;
  } else {
    score = 3;
    feedback = `Think about where you'd actually go to verify this. Suggestions: ${scenario.checkSuggestions.join("; ")}.`;
  }

  return { category: "Verification Strategy", score, maxScore: 30, feedback };
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluationRequest = await request.json();
    const { scenarioId, credibilityRating, biasIdentification, checkSuggestion } = body;

    const scenario = sourceScenarios.find((s) => s.id === scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: "Scenario not found" },
        { status: 404 }
      );
    }

    if (credibilityRating < 1 || credibilityRating > 5) {
      return NextResponse.json(
        { error: "Credibility rating must be 1-5" },
        { status: 400 }
      );
    }

    const feedbackItems: FeedbackItem[] = [
      evaluateCredibility(credibilityRating, scenario),
      evaluateBias(biasIdentification, scenario),
      evaluateCheckSuggestion(checkSuggestion, scenario),
    ];

    const totalScore = feedbackItems.reduce((sum, item) => sum + item.score, 0);
    const maxScore = feedbackItems.reduce((sum, item) => sum + item.maxScore, 0);

    return NextResponse.json({
      totalScore,
      maxScore,
      feedbackItems,
      scenarioCategory: scenario.categoryLabel,
      idealCredibility: scenario.idealCredibility,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
