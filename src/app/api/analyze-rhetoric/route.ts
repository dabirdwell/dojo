import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Missing text to analyze" },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: "Text too long (max 10,000 characters)" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: `You are a rhetoric analysis expert. Analyze the given text and identify:

1. Rhetorical devices (e.g., repetition, metaphor, rhetorical questions, tricolon, anaphora, antithesis, hyperbole, alliteration)
2. Logical fallacies (e.g., ad hominem, straw man, false dilemma, appeal to emotion, appeal to authority, slippery slope, bandwagon, hasty generalization, red herring, circular reasoning)
3. Persuasion techniques (e.g., social proof, scarcity, authority, fear appeal, loaded language, false equivalence, cherry-picking, anecdotal evidence)

For each item found, identify:
- The exact quote from the text
- The type (one of: "device", "fallacy", "technique")
- The specific name of the device/fallacy/technique
- A brief explanation of how it works in context

Also provide:
- An overall argument strength rating from 1-10 (where 10 is logically sound and well-supported, 1 is deeply flawed)
- A brief summary of the overall rhetorical strategy

Respond ONLY with valid JSON, no markdown:
{
  "annotations": [
    {
      "quote": "exact quote from text",
      "type": "device" | "fallacy" | "technique",
      "name": "Name of Device/Fallacy/Technique",
      "explanation": "Brief explanation"
    }
  ],
  "argumentStrength": N,
  "strategySummary": "2-3 sentence summary of the overall rhetorical strategy used."
}

Find at least 5 items but no more than 15. Prioritize the most significant and interesting findings.`,
      messages: [
        {
          role: "user",
          content: `Analyze the rhetoric in this text:\n\n"${text}"`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const analysis = JSON.parse(responseText);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Rhetoric analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze text" },
      { status: 500 }
    );
  }
}
