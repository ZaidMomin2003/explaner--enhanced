"use client";

import { Loader2 } from "lucide-react";
import type { NextPage } from "next";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimationPlayer } from "../../components/AnimationPlayer";
import { ChatSidebar, type ChatSidebarRef } from "../../components/ChatSidebar";
import { CodeEditor } from "../../components/CodeEditor";
import { PageLayout } from "../../components/PageLayout";
import { TabPanel } from "../../components/TabPanel";
import { examples } from "../../examples/code";
import { useAnimationState } from "../../hooks/useAnimationState";
import { useAutoCorrection } from "../../hooks/useAutoCorrection";
import { useConversationState } from "../../hooks/useConversationState";
import { detectDurationFromCode } from "../../helpers/sanitize-response";
import type {
  AssistantMetadata,
  EditOperation,
  ErrorCorrectionContext,
} from "../../types/conversation";
import type { GenerationErrorType, StreamPhase } from "../../types/generation";
import { ExplainerInput } from "../../components/ExplainerInput";
import {
  extractComponentCode,
  stripMarkdownFences,
} from "../../helpers/sanitize-response";

const MAX_CORRECTION_ATTEMPTS = 3;

const CODE_STORAGE_KEY = "explainer-code";
const DURATION_STORAGE_KEY = "explainer-duration";

function loadPersistedCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CODE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function loadPersistedDuration(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem(DURATION_STORAGE_KEY);
    return val ? parseInt(val, 10) : null;
  } catch {
    return null;
  }
}

function ExplainerPageContent() {
  const persistedCode = loadPersistedCode();
  const persistedDuration = loadPersistedDuration();

  const [durationInFrames, setDurationInFrames] = useState(persistedDuration || 300);
  const [fps, setFps] = useState(30);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamPhase, setStreamPhase] = useState<StreamPhase>("idle");
  const [prompt, setPrompt] = useState("");
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(!!persistedCode);
  const [generationError, setGenerationError] = useState<{
    message: string;
    type: GenerationErrorType;
    failedEdit?: EditOperation;
  } | null>(null);
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionContext | null>(null);

  const {
    messages,
    hasManualEdits,
    pendingMessage,
    addUserMessage,
    addAssistantMessage,
    addErrorMessage,
    markManualEdit,
    getFullContext,
    getPreviouslyUsedSkills,
    getLastUserAttachedImages,
    setPendingMessage,
    clearPendingMessage,
    isFirstGeneration,
  } = useConversationState();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    code,
    Component,
    error: compilationError,
    isCompiling,
    setCode,
    compileCode,
  } = useAnimationState(persistedCode || examples[0]?.code || "");

  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const codeError = compilationError || runtimeError;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStreamingRef = useRef(isStreaming);
  const codeRef = useRef(code);
  const chatSidebarRef = useRef<ChatSidebarRef>(null);

  const { markAsAiGenerated, markAsUserEdited } = useAutoCorrection({
    maxAttempts: MAX_CORRECTION_ATTEMPTS,
    compilationError: codeError,
    generationError,
    isStreaming,
    isCompiling,
    hasGeneratedOnce,
    code,
    errorCorrection,
    onTriggerCorrection: useCallback(
      (correctionPrompt: string, context: ErrorCorrectionContext) => {
        setErrorCorrection(context);
        setPrompt(correctionPrompt);
        const lastImages = getLastUserAttachedImages();
        setTimeout(() => {
          chatSidebarRef.current?.triggerGeneration({
            silent: true,
            attachedImages: lastImages,
          });
        }, 100);
      },
      [getLastUserAttachedImages],
    ),
    onAddErrorMessage: addErrorMessage,
    onClearGenerationError: useCallback(() => setGenerationError(null), []),
    onClearErrorCorrection: useCallback(() => setErrorCorrection(null), []),
  });

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    const wasStreaming = isStreamingRef.current;
    isStreamingRef.current = isStreaming;
    if (wasStreaming && !isStreaming) {
      markAsAiGenerated();
      compileCode(codeRef.current);
      const detected = detectDurationFromCode(codeRef.current, durationInFrames);
      if (detected !== durationInFrames) {
        setDurationInFrames(detected);
        try { localStorage.setItem(DURATION_STORAGE_KEY, String(detected)); } catch { /* ignore */ }
      }
    }
  }, [isStreaming, compileCode, markAsAiGenerated, durationInFrames]);

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      setHasGeneratedOnce(true);
      // Persist code to localStorage
      try { localStorage.setItem(CODE_STORAGE_KEY, newCode); } catch { /* ignore */ }
      if (!isStreamingRef.current) {
        markManualEdit(newCode);
        markAsUserEdited();
      }
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (isStreamingRef.current) return;
      debounceRef.current = setTimeout(() => compileCode(newCode), 500);
    },
    [setCode, compileCode, markManualEdit, markAsUserEdited],
  );

  const handleMessageSent = useCallback(
    (promptText: string, attachedImages?: string[]) => {
      addUserMessage(promptText, attachedImages);
    },
    [addUserMessage],
  );

  const handleGenerationComplete = useCallback(
    (generatedCode: string, summary?: string, metadata?: AssistantMetadata) => {
      const content = summary || "Generated your explainer video. Any edits?";
      addAssistantMessage(content, generatedCode, metadata);
      markAsAiGenerated();
      const detected = detectDurationFromCode(generatedCode, durationInFrames);
      if (detected !== durationInFrames) setDurationInFrames(detected);
    },
    [addAssistantMessage, markAsAiGenerated, durationInFrames],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleStreamingChange = useCallback((streaming: boolean) => {
    setIsStreaming(streaming);
    if (streaming) {
      setGenerationError(null);
      setRuntimeError(null);
      setErrorCorrection(null);
    }
  }, []);

  const handleError = useCallback(
    (message: string, type: GenerationErrorType, failedEdit?: EditOperation) => {
      setGenerationError({ message, type, failedEdit });
    },
    [],
  );

  const handleRuntimeError = useCallback((errorMessage: string) => {
    setRuntimeError(errorMessage);
  }, []);

  // Generate explainer video from prompt + screenshots
  const handleGenerateExplainer = useCallback(
    async (
      userPrompt: string,
      screenshots: string[],
      narrationScript?: string,
    ) => {
      setIsStreaming(true);
      setStreamPhase("generating");
      addUserMessage(
        userPrompt,
        screenshots.length > 0 ? screenshots : undefined,
      );

      try {
        const response = await fetch("/api/generate-explainer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: userPrompt,
            screenshots: screenshots.length > 0 ? screenshots : undefined,
            narrationScript: narrationScript || undefined,
          }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.error || "Generation failed");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let accumulatedText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const rawData = line.slice(6);
            if (rawData === "[DONE]") continue;
            try {
              const event = JSON.parse(rawData);
              if (event.type === "metadata") {
                setPendingMessage(event.skills);
              } else if (event.type === "text-start") {
                setStreamPhase("generating");
              } else if (event.type === "text-delta") {
                accumulatedText += event.delta;
                const codeToShow = stripMarkdownFences(accumulatedText);
                handleCodeChange(codeToShow);
              }
            } catch {
              // ignore parse errors
            }
          }
        }

        let finalCode = stripMarkdownFences(accumulatedText);
        finalCode = extractComponentCode(finalCode);
        handleCodeChange(finalCode);
        clearPendingMessage();
        handleGenerationComplete(finalCode, "Generated your explainer video. Any edits?");
        setHasGeneratedOnce(true);
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Generation failed";
        handleError(msg, "api");
      } finally {
        setIsStreaming(false);
        setStreamPhase("idle");
        clearPendingMessage();
      }
    },
    [
      addUserMessage,
      handleCodeChange,
      handleGenerationComplete,
      handleError,
      setPendingMessage,
      clearPendingMessage,
    ],
  );

  return (
    <PageLayout showLogoAsLink>
      <div className="flex-1 flex flex-col min-[1000px]:flex-row min-w-0 overflow-hidden">
        <ChatSidebar
          ref={chatSidebarRef}
          messages={messages}
          pendingMessage={pendingMessage}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          hasManualEdits={hasManualEdits}
          onCodeGenerated={handleCodeChange}
          onStreamingChange={handleStreamingChange}
          onStreamPhaseChange={setStreamPhase}
          onError={handleError}
          prompt={prompt}
          onPromptChange={setPrompt}
          currentCode={code}
          conversationHistory={getFullContext()}
          previouslyUsedSkills={getPreviouslyUsedSkills()}
          isFollowUp={!isFirstGeneration}
          onMessageSent={handleMessageSent}
          onGenerationComplete={handleGenerationComplete}
          onErrorMessage={addErrorMessage}
          errorCorrection={errorCorrection ?? undefined}
          onPendingMessage={setPendingMessage}
          onClearPendingMessage={clearPendingMessage}
          Component={Component}
          fps={fps}
          durationInFrames={durationInFrames}
          currentFrame={currentFrame}
        />

        <div className="flex-1 flex flex-col min-w-0 pr-12 pb-8 overflow-hidden">
          {!hasGeneratedOnce ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <ExplainerInput
                onGenerate={handleGenerateExplainer}
                isGenerating={isStreaming}
              />
            </div>
          ) : (
            <TabPanel
              codeContent={
                <CodeEditor
                  code={hasGeneratedOnce && !generationError ? code : ""}
                  onChange={handleCodeChange}
                  isStreaming={isStreaming}
                  streamPhase={streamPhase}
                />
              }
              previewContent={
                <AnimationPlayer
                  Component={generationError ? null : Component}
                  durationInFrames={durationInFrames}
                  fps={fps}
                  onDurationChange={setDurationInFrames}
                  onFpsChange={setFps}
                  isCompiling={isCompiling}
                  isStreaming={isStreaming}
                  error={generationError?.message || codeError}
                  errorType={generationError?.type || "compilation"}
                  code={code}
                  onRuntimeError={handleRuntimeError}
                  onFrameChange={setCurrentFrame}
                />
              }
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-foreground" />
    </div>
  );
}

const ExplainerPage: NextPage = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ExplainerPageContent />
  </Suspense>
);

export default ExplainerPage;
