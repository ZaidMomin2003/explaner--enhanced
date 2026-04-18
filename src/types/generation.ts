export const MODELS = [
  { id: "opus-4-6", name: "Claude Opus 4.6", bedrockModel: "us.anthropic.claude-opus-4-6-v1" },
  { id: "sonnet-4-6", name: "Claude Sonnet 4.6", bedrockModel: "us.anthropic.claude-sonnet-4-6" },
  { id: "sonnet-4-5", name: "Claude Sonnet 4.5", bedrockModel: "us.anthropic.claude-sonnet-4-5-20250929-v1:0" },
  { id: "sonnet-4", name: "Claude Sonnet 4", bedrockModel: "us.anthropic.claude-sonnet-4-20250514-v1:0" },
  { id: "haiku-4-5", name: "Claude Haiku 4.5", bedrockModel: "us.anthropic.claude-haiku-4-5-20251001-v1:0" },
] as const;

// Internal model IDs for routing (not exposed in UI dropdown)
export const HAIKU_MODEL = "us.anthropic.claude-haiku-4-5-20251001-v1:0";
export const OPUS_MODEL = "us.anthropic.claude-opus-4-6-v1";
export const SONNET_MODEL = "us.anthropic.claude-sonnet-4-6";

export type ModelId = (typeof MODELS)[number]["id"];

export type StreamPhase = "idle" | "reasoning" | "generating";

export type GenerationErrorType = "validation" | "api";
