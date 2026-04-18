"use client";

import { useImageAttachments } from "@/hooks/useImageAttachments";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Loader2,
  Paperclip,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

interface ExplainerInputProps {
  onGenerate: (
    prompt: string,
    screenshots: string[],
    narrationScript?: string,
  ) => void;
  isGenerating: boolean;
}

const DEMO_PROMPT = `ScholarAI is an AI-powered study companion that transforms any topic into structured study materials. Students paste a topic or upload lecture notes, and ScholarAI generates comprehensive study notes, interactive flashcards, and adaptive quizzes.

Product: ScholarAI
Tagline: "Study Smarter with AI"
Website: scholarai.vercel.app
Target Audience: College students and lifelong learners

Key Features:
1. AI Study Notes — Generates organized, detailed notes from any topic with key concepts highlighted
2. Smart Flashcards — Creates spaced-repetition flashcards that adapt to your learning pace
3. Adaptive Quizzes — Tests your knowledge with AI-generated questions that get harder as you improve

Brand Colors: Primary #3B82F6 (blue), Secondary #06B6D4 (cyan), Accent #8B5CF6 (purple), Background #0B0F1A (dark navy)
CTA: "Try ScholarAI Free"
Social Proof: "Used by 10,000+ students across 50 universities"`;

export function ExplainerInput({
  onGenerate,
  isGenerating,
}: ExplainerInputProps) {
  const [prompt, setPrompt] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [narrationScript, setNarrationScript] = useState<string | null>(null);
  const {
    attachedImages,
    isDragging,
    fileInputRef,
    removeImage,
    handleFileSelect,
    handlePaste,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    canAddMore,
    error: imageError,
    clearError,
  } = useImageAttachments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt.trim(), attachedImages, narrationScript ?? undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const res = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      if (!res.ok) throw new Error("Failed to enhance");
      const data = await res.json();
      setPrompt(data.enhancedPrompt);
      setNarrationScript(data.narrationScript);
      setEnhanced(true);
    } catch (err) {
      console.error("Enhance error:", err);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">
        Create an Explainer Video
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Describe your SaaS product, add screenshots, and we'll generate a
        40-second explainer video with voiceover and animations.
      </p>

      <form onSubmit={handleSubmit}>
        <div
          className={`bg-background-elevated rounded-xl border p-5 transition-colors ${
            isDragging ? "border-blue-500 bg-blue-500/10" : "border-border"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Image error */}
          {imageError && (
            <div className="mb-3 p-2 rounded-lg bg-background-error border border-destructive/20 flex items-center justify-between">
              <p className="text-xs text-destructive-foreground">{imageError}</p>
              <button type="button" onClick={clearError}>
                <X className="w-3 h-3 text-destructive-foreground" />
              </button>
            </div>
          )}

          {/* Screenshot previews */}
          {attachedImages.length > 0 && (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1 pt-1">
              {attachedImages.map((img, index) => (
                <div key={index} className="relative flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Screenshot ${index + 1}`}
                    className="h-20 w-auto rounded border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 bg-background border border-border rounded-full p-0.5 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Prompt textarea */}
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (enhanced) setEnhanced(false);
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={
              isDragging
                ? "Drop screenshots here..."
                : "Describe your SaaS product... e.g. 'ScholarAI is an AI-powered study app that generates notes, flashcards, and quizzes from any topic. Target audience: college students.'"
            }
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground-dim focus:outline-none resize-none overflow-y-auto text-base min-h-[80px] max-h-[240px]"
            style={{ fieldSizing: "content" }}
            disabled={isGenerating}
          />

          {/* Narration preview */}
          {narrationScript && enhanced && (
            <div className="mt-3 mb-1 p-3 rounded-lg bg-background border border-border-dim">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400">
                  AI Narration Script
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {narrationScript}
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              {/* Enhance button */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleEnhance}
                disabled={!prompt.trim() || isEnhancing || isGenerating}
                className={`text-xs gap-1.5 ${enhanced ? "text-purple-400" : "text-muted-foreground hover:text-foreground"}`}
              >
                {isEnhancing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {isEnhancing
                  ? "Enhancing..."
                  : enhanced
                    ? "Enhanced ✓"
                    : "Enhance with AI"}
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isGenerating || !canAddMore}
                className="text-muted-foreground hover:text-foreground"
                title="Add screenshots (paste or drag & drop)"
              >
                <Paperclip className="w-5 h-5" />
              </Button>

              <Button
                type="submit"
                size="icon-sm"
                disabled={!prompt.trim() || isGenerating}
                loading={isGenerating}
                className="bg-foreground text-background hover:bg-gray-200"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground-dim mt-4">
          Powered by Claude Opus 4.6 · Deepgram Aura-2 · Tip: click "Enhance with AI" to expand your prompt
        </p>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => {
              setPrompt(DEMO_PROMPT);
              setEnhanced(false);
              setNarrationScript(null);
            }}
            disabled={isGenerating}
            className="text-xs text-primary hover:text-primary-hover transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 hover:border-primary/40"
          >
            🎬 Try Demo — ScholarAI Explainer
          </button>
        </div>
      </form>
    </div>
  );
}
