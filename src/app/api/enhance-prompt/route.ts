import { HAIKU_MODEL } from "@/types/generation";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { generateObject } from "ai";
import { z } from "zod";

const EnhanceRequest = z.object({
  prompt: z.string().min(1).max(5000),
});

const EnhancedPromptSchema = z.object({
  productName: z.string().describe("Product or company name extracted from the prompt"),
  enhancedPrompt: z
    .string()
    .describe(
      "A detailed, structured prompt for generating a 40-second SaaS explainer video. Include product name, tagline, 3 key features with descriptions, target audience, CTA text, and suggested brand colors.",
    ),
  narrationScript: z
    .string()
    .describe(
      "A ~100-120 word voiceover narration script for the 40-second video, split naturally across 8 scenes.",
    ),
});

export type EnhancedPrompt = z.infer<typeof EnhancedPromptSchema>;

const ENHANCE_SYSTEM = `You are an expert at turning rough SaaS product descriptions into detailed explainer video briefs.

Given a short description of a SaaS product, expand it into:
1. A clear product name
2. A detailed prompt that includes: product name, tagline, 3 key features with short descriptions, target audience, CTA text, and 2-3 brand color suggestions (as hex codes)
3. A voiceover narration script (~100-120 words) for a 40-second explainer video

The narration should follow this 4-scene structure (2.5 seconds each):
- Scene 1: Brand intro hook
- Scene 2: Problem + solution
- Scene 3: Key feature highlights
- Scene 4: Call to action

Keep the tone professional but friendly. Be concise and punchy. Total script ~25-30 words.`;

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = EnhanceRequest.safeParse(body);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const awsKey = process.env.AWS_ACCESS_KEY_ID;
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.AWS_REGION;

  if (!awsKey || !awsSecret || !awsRegion) {
    return new Response(
      JSON.stringify({ error: "AWS Bedrock environment variables are not set." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const bedrock = createAmazonBedrock({
      region: awsRegion,
      accessKeyId: awsKey,
      secretAccessKey: awsSecret,
    });

    const result = await generateObject({
      model: bedrock(HAIKU_MODEL),
      system: ENHANCE_SYSTEM,
      prompt: `Enhance this into a detailed explainer video brief:\n\n"${parsed.data.prompt}"`,
      schema: EnhancedPromptSchema,
    });

    return new Response(JSON.stringify(result.object), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Enhance prompt error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to enhance prompt." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
