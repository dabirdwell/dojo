import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { argumentText, userMap, correctMap } = await req.json();

    if (!argumentText || !userMap || !correctMap) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: `You evaluate argument maps — visual breakdowns of argument structure. Score the user's structural analysis.

Score on three dimensions (0-5 each):
- structure: Did they correctly identify the main claim, premises, evidence, and assumptions?
- connections: Did they correctly identify how the parts relate (support, contradiction, qualification)?
- fallacies: Did they correctly identify any fallacious reasoning?

Respond ONLY with valid JSON, no markdown:
{"structure":N,"connections":N,"fallacies":N,"feedback":"2-3 sentences of constructive guidance. Note what they did well, then suggest improvements."}`,
      messages: [
        {
          role: "user",
          content: `Argument: "${argumentText}"

User's argument map: ${JSON.stringify(userMap)}
Correct argument map: ${JSON.stringify(correctMap)}

Evaluate how well the user decomposed this argument.`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const evaluation = JSON.parse(text);
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Argument map evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate argument map" },
      { status: 500 }
    );
  }
}
