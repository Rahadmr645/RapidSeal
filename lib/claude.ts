import Anthropic from "@anthropic-ai/sdk";
import type { Proposal } from "./types";

const MODEL = "claude-3-5-sonnet-20241022";

export function getAnthropic(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("Missing ANTHROPIC_API_KEY");
  return new Anthropic({ apiKey: key });
}

export type GeneratedProposal = Pick<
  Proposal,
  "title" | "brief" | "content"
> & { summary?: string };

export async function generateProposal(brief: string): Promise<GeneratedProposal> {
  const client = getAnthropic();

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are a proposal writer. Given this project brief, output ONLY valid JSON (no markdown) with keys:
title (string), brief (string, echo or refine the brief), summary (string, 2 sentences), content (object with sections: overview, scope, timeline, investment, terms — each string in markdown).

Brief:
${brief}`,
      },
    ],
  });

  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Claude did not return parseable JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]) as GeneratedProposal;
  if (!parsed.title || !parsed.content) {
    throw new Error("Invalid proposal shape from model");
  }
  return {
    title: parsed.title,
    brief: parsed.brief ?? brief,
    summary: parsed.summary,
    content: parsed.content,
  };
}
