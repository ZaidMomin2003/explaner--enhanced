import { getCombinedSkillContent, type SkillName } from "@/skills";
import { HAIKU_MODEL, OPUS_MODEL } from "@/types/generation";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { generateObject, streamText } from "ai";
import { z } from "zod";

interface ExplainerRequest {
  prompt: string;
  screenshots?: string[];
  narrationScript?: string;
}

const NarrationSchema = z.object({
  script: z
    .string()
    .describe(
      "Full narration script for the 40-second video. Should be ~100-120 words for natural pacing.",
    ),
});

const EXPLAINER_SYSTEM_PROMPT = `
You are a world-class motion graphics engineer. You generate stunning, broadcast-quality React/Remotion explainer videos.

## VIDEO STRUCTURE (300 frames at 30fps = 10 seconds)

Generate a 4-scene explainer video. Each scene MUST have:
- Smooth opacity crossfade transitions (10 frames overlap)
- Spring-animated entrances for every element (staggered delays)
- At least 2-3 animated elements per scene
- Consistent brand colors throughout

Scene layout:
- Scene 1 (0-75): Brand intro — large animated logo, tagline with fade-in, subtle glow/particles
- Scene 2 (75-150): Problem + Solution — bold headline, brief product description
- Scene 3 (150-225): Feature highlights — 2-3 key features with icons, staggered entrance
- Scene 4 (225-300): CTA — expanding rings, gradient button with shimmer, website URL

## CRITICAL: COMPONENT STRUCTURE

1. Start with ES6 imports
2. Export as: export const MyAnimation = () => { ... };
3. EVERYTHING must be INSIDE the component body — including loadFont():

\`\`\`tsx
export const MyAnimation = () => {
  const { fontFamily } = loadFont();  // MUST be inside component
  const frame = useCurrentFrame();
  // ... rest of code
};
\`\`\`

NEVER put loadFont() or any code outside the export const. This will cause compilation errors.

## AUDIO: LIMIT TO 3 TOTAL Html5Audio TAGS

CRITICAL: Use a MAXIMUM of 3 <Html5Audio> tags total in the entire component.
- 1 for a transition SFX (pick the most impactful moment)
- 1 for CTA ding
- That's it. Do NOT add SFX to every scene transition.

Place SFX in Sequences so they don't mount simultaneously:
\`\`\`tsx
<Sequence from={75} durationInFrames={30}><Html5Audio src={SFX.whoosh} volume={0.25} /></Sequence>
<Sequence from={225} durationInFrames={30}><Html5Audio src={SFX.ding} volume={0.3} /></Sequence>
\`\`\`

## ANIMATION TECHNIQUES (USE ALL OF THESE)

### Scene transitions — crossfade with sectionVisible helper:
\`\`\`tsx
const sectionVisible = (start: number, end: number) =>
  interpolate(frame, [start, start + 10, end - 10, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
\`\`\`

### Spring entrances with stagger:
\`\`\`tsx
const enter = (delay: number, dur = 20) =>
  spring({ frame: Math.max(0, frame - delay), fps, durationInFrames: dur, config: { damping: 14, mass: 0.8 } });
\`\`\`

### Animated counters for stats:
\`\`\`tsx
const counterProgress = interpolate(frame, [startFrame, startFrame + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const displayVal = Math.round(targetValue * counterProgress);
\`\`\`

### Shimmer effects on lines and buttons:
\`\`\`tsx
const shimmer = interpolate(frame % 60, [0, 30, 60], [-200, 500, -200]);
\`\`\`

### Floating particles for depth:
\`\`\`tsx
const particles = Array.from({ length: 8 }, (_, i) => {
  const seed = random("p" + i);
  return { x: seed * width, y: random("py" + i) * height, size: 2 + random("pz" + i) * 3,
    opacity: interpolate(Math.sin(frame * 0.03 + seed * 6), [-1, 1], [0.03, 0.1]) };
});
\`\`\`

### Expanding rings for CTA:
\`\`\`tsx
const rings = Array.from({ length: 3 }, (_, i) => {
  const loopFrame = (frame - ctaStart + i * 25) % 80;
  return { scale: interpolate(loopFrame, [0, 80], [0.3, 2.5]), opacity: interpolate(loopFrame, [0, 20, 80], [0, 0.12, 0]) };
});
\`\`\`

## COMPONENT STRUCTURE

1. Start with ES6 imports
2. Export as: export const MyAnimation = () => { ... };
3. Component body order: hooks → constants → helpers (sectionVisible, enter) → scene variables → sub-components (Sidebar, Pill) → return JSX
4. All constants INSIDE the component body

## AVAILABLE IMPORTS

\`\`\`tsx
import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate, spring, Sequence, Series, Easing, random, Img, Html5Audio, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Circle, Rect, Triangle, Star, Ellipse, Pie } from "@remotion/shapes";
\`\`\`

## AUDIO — SOUND EFFECTS (SFX object)

Available: SFX.whoosh, SFX.whip, SFX.uiSwitch, SFX.mouseClick, SFX.ding, SFX.pageTurn
Place in Sequences: \`<Sequence from={150}><Html5Audio src={SFX.whoosh} volume={0.25} /></Sequence>\`

## DESIGN RULES

- Dark background (#0B0F1A) with subtle grid overlay (backgroundImage with linear-gradient)
- Use loadFont() for Inter font — destructure { fontFamily }
- Radial gradient glows behind key sections (e.g. radial-gradient(ellipse 50% 40% at 50% 45%, #3B82F618 0%, transparent 70%))
- Glassmorphism cards: rgba(255,255,255,0.04) bg, 1px solid rgba(255,255,255,0.08) border, borderRadius 16-24
- Section pill labels with colored dot + uppercase text
- Global vignette overlay at the end: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)
- If screenshots provided, show in browser mockup (chrome bar with 3 dots + <Img>)

## RESERVED NAMES (CRITICAL)
NEVER use these as variable names: spring, interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence

## OUTPUT FORMAT
- Output ONLY code — no explanations, no questions, no markdown fences
- Response must start with "import" and end with "};"
- Generate COMPLETE, PRODUCTION-QUALITY code — do not use placeholders or TODOs
`;

export async function POST(req: Request) {
  const {
    prompt,
    screenshots,
    narrationScript,
  }: ExplainerRequest = await req.json();

  const awsKey = process.env.AWS_ACCESS_KEY_ID;
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.AWS_REGION;

  if (!awsKey || !awsSecret || !awsRegion) {
    return new Response(
      JSON.stringify({ error: "AWS Bedrock environment variables are not set." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const bedrock = createAmazonBedrock({
    region: awsRegion,
    accessKeyId: awsKey,
    secretAccessKey: awsSecret,
  });

  // Step 1: Generate narration if not already provided
  let finalNarration = narrationScript || null;
  if (!finalNarration) {
    try {
      const narrationResult = await generateObject({
        model: bedrock(HAIKU_MODEL),
        system: `You write concise, engaging narration scripts for 10-second SaaS explainer videos.
The script should be ~25-30 words total, split across 4 scenes of 2.5 seconds each.
Use a professional but friendly tone. Focus on benefits, not features.`,
        prompt: `Write a narration script for this product:\n\n${prompt}`,
        schema: NarrationSchema,
      });
      finalNarration = narrationResult.object.script;
      console.log("Generated narration:", finalNarration.length, "chars");
    } catch (error) {
      console.error("Narration generation error:", error);
    }
  }

  // Step 2: Load explainer skill content
  const skills: SkillName[] = [
    "saas-explainer",
    "transitions",
    "sequencing",
    "typography",
  ];
  const skillContent = getCombinedSkillContent(skills);
  const enhancedSystemPrompt = `${EXPLAINER_SYSTEM_PROMPT}\n\n## SKILL-SPECIFIC GUIDANCE\n${skillContent}`;

  // Step 3: Build the mega-prompt for Opus
  let megaPrompt = `Generate a 10-second SaaS explainer video (300 frames at 30fps) based on this description:\n\n${prompt}`;

  if (finalNarration) {
    megaPrompt += `\n\n## NARRATION SCRIPT (time the visuals to match this pacing)\n"${finalNarration}"`;
  }

  megaPrompt += `\n\n## SOUND EFFECTS (MAX 3 Html5Audio tags total)
Add 1 whoosh SFX at the main transition and 1 ding at the CTA. Do NOT add more than 3 Html5Audio tags.
Use: <Sequence from={75} durationInFrames={30}><Html5Audio src={SFX.whoosh} volume={0.25} /></Sequence>`;

  if (screenshots && screenshots.length > 0) {
    megaPrompt += `\n\n## SCREENSHOTS
${screenshots.length} screenshot(s) of the product are attached. Display them in the video inside browser mockup frames using <Img>.`;
  }

  // Step 4: Stream code generation with Opus 4.6
  try {
    const messageContent: Array<
      { type: "text"; text: string } | { type: "image"; image: string }
    > = [{ type: "text" as const, text: megaPrompt }];

    if (screenshots && screenshots.length > 0) {
      for (const img of screenshots) {
        messageContent.push({ type: "image" as const, image: img });
      }
    }

    const messages: Array<{
      role: "user";
      content: Array<
        { type: "text"; text: string } | { type: "image"; image: string }
      >;
    }> = [{ role: "user" as const, content: messageContent }];

    const result = streamText({
      model: bedrock(OPUS_MODEL),
      system: enhancedSystemPrompt,
      messages,
    });

    console.log("Generating explainer video with Opus 4.6 (no thinking)");

    const originalResponse = result.toUIMessageStreamResponse({
      sendReasoning: false,
    });

    // Prepend metadata
    const metadataEvent = `data: ${JSON.stringify({
      type: "metadata",
      skills,
      narration: finalNarration,
    })}\n\n`;

    const originalBody = originalResponse.body;
    if (!originalBody) return originalResponse;

    const reader = originalBody.getReader();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(metadataEvent));
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(stream, { headers: originalResponse.headers });
  } catch (error) {
    console.error("Explainer generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate explainer video." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
