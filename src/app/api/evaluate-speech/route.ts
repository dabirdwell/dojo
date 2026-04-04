import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { transcript, topic, bullets } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: "Missing transcript" },
        { status: 400 }
      );
    }

    if (transcript.length > 5000) {
      return NextResponse.json(
        { error: "Transcript too long (max 5,000 characters)" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `You are a speech and rhetoric coach. Analyze an impromptu speech transcript and provide constructive feedback.

The speaker was given this topic: "${topic}"
With these guiding points: ${JSON.stringify(bullets)}

Analyze the transcript for:
1. Rhetorical devices used (name each one and briefly explain how it was used)
2. Logical structure — was the argument well-organized? Did it have a clear thesis, supporting points, and conclusion?
3. Specific, actionable suggestions for improvement

Respond ONLY with valid JSON, no markdown:
{
  "rhetoricalDevices": [
    { "name": "Device Name", "explanation": "How it was used" }
  ],
  "logicalStructure": "2-3 sentence assessment of the argument's structure and flow.",
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"],
  "overallScore": N
}

overallScore is 1-10 where 10 is exceptional rhetoric and logic. Be encouraging but honest. Limit to 3-5 devices and exactly 3 suggestions.`,
      messages: [
        {
          role: "user",
          content: `Here is my impromptu speech transcript:\n\n"${transcript}"`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const feedback = JSON.parse(responseText);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Speech evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate speech" },
      { status: 500 }
    );
  }
}
