import { z } from "zod";

const TtsRequest = z.object({
  text: z.string().min(1).max(10000),
  voice: z.string().default("aura-2-thalia-en"),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = TtsRequest.safeParse(body);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Invalid request", details: parsed.error.issues }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { text, voice } = parsed.data;
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "DEEPGRAM_API_KEY is not set." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const response = await fetch(
      `https://api.deepgram.com/v1/speak?model=${voice}&encoding=mp3`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Deepgram TTS error:", errorText);
      return new Response(
        JSON.stringify({ error: "TTS generation failed", details: errorText }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Convert audio to base64 data URL for direct use in Remotion
    const audioBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString("base64");
    const dataUrl = `data:audio/mp3;base64,${base64}`;

    return new Response(
      JSON.stringify({ audioUrl: dataUrl, characterCount: text.length }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("TTS error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate speech." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
