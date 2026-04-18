"use client";

import { ChatHistory } from "@/components/ChatSidebar/ChatHistory";
import { ChatInput } from "@/components/ChatSidebar/ChatInput";
import { Button } from "@/components/ui/button";
import { useGenerationApi } from "@/hooks/useGenerationApi";
import type {
  AssistantMetadata,
  ConversationContextMessage,
  ConversationMessage,
  EditOperation,
  ErrorCorrectionContext,
} from "@/types/conversation";
import {
  MODELS,
  type GenerationErrorType,
  type ModelId,
  type StreamPhase,
} from "@/types/generation";
import { MessageSquare, RotateCcw, X } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentType,
} from "react";

export interface FloatingChatRef {
  triggerGeneration: (options?: {
    silent?: boolean;
    attachedImages?: string[];
  }) => void;
}

interface FloatingChatProps {
  messages: ConversationMessage[];
  pendingMessage?: {
    skills?: string[];
    startedAt: number;
  };
  hasManualEdits: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "dark" | "light";
  onCodeGenerated?: (code: string) => void;
  onStreamingChange?: (isStreaming: boolean) => void;
  onStreamPhaseChange?: (phase: StreamPhase) => void;
  onError?: (
    error: string,
    type: GenerationErrorType,
    failedEdit?: EditOperation,
  ) => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  currentCode?: string;
  conversationHistory?: ConversationContextMessage[];
  previouslyUsedSkills?: string[];
  isFollowUp?: boolean;
  onMessageSent?: (prompt: string, attachedImages?: string[]) => void;
  onGenerationComplete?: (
    code: string,
    summary?: string,
    metadata?: AssistantMetadata,
  ) => void;
  onErrorMessage?: (
    message: string,
    errorType: "edit_failed" | "api" | "validation",
  ) => void;
  errorCorrection?: ErrorCorrectionContext;
  onPendingMessage?: (skills?: string[]) => void;
  onClearPendingMessage?: () => void;
  Component?: ComponentType | null;
  fps?: number;
  durationInFrames?: number;
  currentFrame?: number;
}

export const FloatingChat = forwardRef<FloatingChatRef, FloatingChatProps>(
  function FloatingChat(
    {
      messages,
      pendingMessage,
      hasManualEdits,
      isOpen,
      onOpenChange,
      variant = "dark",
      onCodeGenerated,
      onStreamingChange,
      onStreamPhaseChange,
      onError,
      prompt,
      onPromptChange,
      currentCode,
      conversationHistory = [],
      previouslyUsedSkills = [],
      isFollowUp = false,
      onMessageSent,
      onGenerationComplete,
      onErrorMessage,
      errorCorrection,
      onPendingMessage,
      onClearPendingMessage,
      Component,
      fps = 30,
      durationInFrames = 150,
      currentFrame = 0,
    },
    ref,
  ) {
    const [model, setModel] = useState<ModelId>(MODELS[1].id);
    const promptRef = useRef<string>("");
    const { isLoading, runGeneration } = useGenerationApi();
    const isLight = variant === "light";

    useEffect(() => {
      promptRef.current = prompt;
    }, [prompt]);

    const handleGeneration = useCallback(
      async (options?: { silent?: boolean; attachedImages?: string[] }) => {
        const currentPrompt = promptRef.current;
        if (!currentPrompt.trim()) return;
        onPromptChange("");
        await runGeneration(
          currentPrompt,
          model,
          {
            currentCode,
            conversationHistory,
            previouslyUsedSkills,
            isFollowUp,
            hasManualEdits,
            errorCorrection,
            frameImages: options?.attachedImages,
          },
          {
            onCodeGenerated,
            onStreamingChange,
            onStreamPhaseChange,
            onError,
            onMessageSent,
            onGenerationComplete,
            onErrorMessage,
            onPendingMessage,
            onClearPendingMessage,
          },
          options,
        );
      },
      [
        model,
        currentCode,
        conversationHistory,
        previouslyUsedSkills,
        isFollowUp,
        hasManualEdits,
        errorCorrection,
        onPromptChange,
        runGeneration,
        onCodeGenerated,
        onStreamingChange,
        onStreamPhaseChange,
        onError,
        onMessageSent,
        onGenerationComplete,
        onErrorMessage,
        onPendingMessage,
        onClearPendingMessage,
      ],
    );

    useImperativeHandle(ref, () => ({
      triggerGeneration: handleGeneration,
    }));

    useEffect(() => {
      if (isLoading) {
        onOpenChange(true);
      }
    }, [isLoading, onOpenChange]);

    return (
      <>
        {/* Trigger button */}
        {!isOpen && (
          <button
            onClick={() => onOpenChange(true)}
            className={
              isLight
                ? "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-xl border border-gray-200/60 text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-lg shadow-black/[0.06]"
                : "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/[0.06] text-white/50 hover:text-white px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-2xl shadow-black/40"
            }
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Chat</span>
          </button>
        )}

        {/* Chat panel */}
        {isOpen && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-[540px]">
            <div
              className={
                isLight
                  ? "bg-white/95 backdrop-blur-2xl border border-gray-200/70 rounded-2xl shadow-xl shadow-black/[0.08] flex flex-col max-h-[60vh] overflow-hidden"
                  : "bg-[#0c0c0c]/92 backdrop-blur-2xl border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/60 flex flex-col max-h-[60vh] overflow-hidden"
              }
            >
              {/* Header */}
              <div
                className={
                  isLight
                    ? "flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100"
                    : "flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/[0.05]"
                }
              >
                <h3
                  className={
                    isLight
                      ? "text-[11px] font-semibold text-gray-400 uppercase tracking-wider"
                      : "text-[11px] font-medium text-white/30 uppercase tracking-wider"
                  }
                >
                  Assistant
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Start over? This will reset your animation.",
                        )
                      ) {
                        window.location.href = "/";
                      }
                    }}
                    title="Start over"
                    className={
                      isLight
                        ? "text-gray-400 hover:text-gray-700 hover:bg-gray-100 text-xs gap-1 h-7 px-2"
                        : "text-white/20 hover:text-white hover:bg-white/10 text-xs gap-1 h-7 px-2"
                    }
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onOpenChange(false)}
                    className={
                      isLight
                        ? "text-gray-400 hover:text-gray-700 hover:bg-gray-100 h-7 w-7"
                        : "text-white/20 hover:text-white hover:bg-white/10 h-7 w-7"
                    }
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Chat history — wrapped with theme class for CSS overrides */}
              <div
                className={`flex-1 min-h-0 overflow-hidden ${isLight ? "chat-light-theme" : ""}`}
              >
                <ChatHistory
                  messages={messages}
                  pendingMessage={pendingMessage}
                />
              </div>

              {/* Input — wrapped with theme class */}
              <div className={isLight ? "chat-light-theme" : ""}>
                <ChatInput
                  prompt={prompt}
                  onPromptChange={onPromptChange}
                  model={model}
                  onModelChange={setModel}
                  isLoading={isLoading}
                  onSubmit={(attachedImages) =>
                    handleGeneration({ attachedImages })
                  }
                  Component={Component}
                  fps={fps}
                  durationInFrames={durationInFrames}
                  currentFrame={currentFrame}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);
