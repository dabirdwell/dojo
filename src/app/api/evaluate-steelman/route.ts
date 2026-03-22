import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { position, userResponse } = await req.json();

    if (!position || !userResponse) {
      return NextResponse.json(
        { error: "Missing position or userResponse" },
        { status: 400 }
      );
    }

    if (userResponse.length > 5000) {
      return NextResponse.json(
        { error: "Response too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: `You evaluate steel-man arguments. A steel-man is the strongest possible version of an argument — the opposite of a straw man. Score the user's attempt to construct the best version of a given position.

Score on three dimensions (0-5 each):
- charity: Does this represent the position as its proponents would recognize and accept? Does it assume good faith and real concerns rather than malice or ignorance?
- strength: Is the argument logically sound? Does it identify the strongest reasoning, evidence, or principles that support this position?
- concerns: Does it address the real, substantive concerns that drive people to hold this position? Does it engage with the strongest version rather than the weakest?

Respond ONLY with valid JSON, no markdown:
{"charity":N,"strength":N,"concerns":N,"feedback":"2-3 sentences of constructive guidance. Acknowledge what they did well, then suggest how to make the steel-man even stronger."}`,
      messages: [
        {
          role: "user",
          content: `Position to steel-man: "${position}"

User's steel-man attempt:
"${userResponse}"

Evaluate this steel-man attempt.`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const evaluation = JSON.parse(text);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Steel man evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate response" },
      { status: 500 }
    );
  }
}
