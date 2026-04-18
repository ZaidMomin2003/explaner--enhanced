"use client";

import { Loader2, Code, Play } from "lucide-react";
import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimationPlayer } from "../../components/AnimationPlayer";
import { CodeEditor } from "../../components/CodeEditor";
import {
  FloatingChat,
  FloatingChatRef,
  SnapshotNav,
} from "../../components/FloatingChat";
import { GenerateHeader } from "../../components/GenerateHeader";
import { RenderControls } from "../../components/AnimationPlayer/RenderControls";
import { SettingsModal } from "../../components/AnimationPlayer/SettingsModal";
import { examples } from "../../examples/code";
import { useAnimationState } from "../../hooks/useAnimationState";
import { useAutoCorrection } from "../../hooks/useAutoCorrection";
import { useConversationState } from "../../hooks/useConversationState";
import { cn } from "../../lib/utils";
import type {
  AssistantMetadata,
  EditOperation,
  ErrorCorrectionContext,
} from "../../types/conversation";
import type { GenerationErrorType, StreamPhase } from "../../types/generation";
import { detectDurationFromCode } from "../../helpers/sanitize-response";

const MAX_CORRECTION_ATTEMPTS = 3;
const GEN_CODE_KEY = "generate-code";
const GEN_DURATION_KEY = "generate-duration";

type ViewMode = "preview" | "code";

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";
  const willAutoStart = Boolean(initialPrompt);

  const persistedCode =
    typeof window !== "undefined" ? localStorage.getItem(GEN_CODE_KEY) : null;
  const persistedDuration =
    typeof window !== "undefined"
      ? localStorage.getItem(GEN_DURATION_KEY)
      : null;

  const [durationInFrames, setDurationInFrames] = useState(
    persistedDuration
      ? parseInt(persistedDuration, 10)
      : examples[0]?.durationInFrames || 150,
  );
  const [fps, setFps] = useState(examples[0]?.fps || 30);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isStreaming, setIsStreaming] = useState(willAutoStart);
  const [streamPhase, setStreamPhase] = useState<StreamPhase>(
    willAutoStart ? "reasoning" : "idle",
  );
  const [prompt, setPrompt] = useState(initialPrompt);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(
    !!persistedCode && !willAutoStart,
  );
  const [generationError, setGenerationError] = useState<{
    message: string;
    type: GenerationErrorType;
    failedEdit?: EditOperation;
  } | null>(null);
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionContext | null>(null);

  const [isUIVisible, setIsUIVisible] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");

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

  const {
    code,
    Component,
    error: compilationError,
    isCompiling,
    setCode,
    compileCode,
  } = useAnimationState(
    (!willAutoStart && persistedCode) || examples[0]?.code || "",
  );

  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const codeError = compilationError || runtimeError;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStreamingRef = useRef(isStreaming);
  const codeRef = useRef(code);
  const floatingChatRef = useRef<FloatingChatRef>(null);

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
          floatingChatRef.current?.triggerGeneration({
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
      const detected = detectDurationFromCode(
        codeRef.current,
        durationInFrames,
      );
      if (detected !== durationInFrames) {
        setDurationInFrames(detected);
        try {
          localStorage.setItem(GEN_DURATION_KEY, String(detected));
        } catch {
          /* ignore */
        }
      }
    }
  }, [isStreaming, compileCode, markAsAiGenerated]);

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      setHasGeneratedOnce(true);
      try {
        localStorage.setItem(GEN_CODE_KEY, newCode);
      } catch {
        /* ignore */
      }
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
      addAssistantMessage(
        summary || "Generated your animation, any follow up edits?",
        generatedCode,
        metadata,
      );
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
    (
      message: string,
      type: GenerationErrorType,
      failedEdit?: EditOperation,
    ) => {
      setGenerationError({ message, type, failedEdit });
    },
    [],
  );

  const handleRuntimeError = useCallback((errorMessage: string) => {
    setRuntimeError(errorMessage);
  }, []);

  const handleRestoreSnapshot = useCallback(
    (snapshotCode: string) => {
      setCode(snapshotCode);
      compileCode(snapshotCode);
      try {
        localStorage.setItem(GEN_CODE_KEY, snapshotCode);
      } catch {
        /* ignore */
      }
    },
    [setCode, compileCode],
  );

  const handleUIOpen = useCallback((open: boolean) => {
    setIsUIVisible(open);
  }, []);

  useEffect(() => {
    if (initialPrompt && !hasAutoStarted && floatingChatRef.current) {
      setHasAutoStarted(true);
      const storedImagesJson = sessionStorage.getItem("initialAttachedImages");
      let storedImages: string[] | undefined;
      if (storedImagesJson) {
        try {
          storedImages = JSON.parse(storedImagesJson);
        } catch {
          /* ignore */
        }
        sessionStorage.removeItem("initialAttachedImages");
      }
      setTimeout(() => {
        floatingChatRef.current?.triggerGeneration({
          attachedImages: storedImages,
        });
      }, 100);
    }
  }, [initialPrompt, hasAutoStarted]);

  return (
    <div className="h-screen w-screen bg-[#f7f7f8] overflow-hidden relative generate-light-theme">
      {/* ===== LAYER 0: Full-screen video/code ===== */}
      <div className="absolute inset-0">
        {viewMode === "preview" ? (
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
            immersive
          />
        ) : (
          <CodeEditor
            code={hasGeneratedOnce && !generationError ? code : ""}
            onChange={handleCodeChange}
            isStreaming={isStreaming}
            streamPhase={streamPhase}
          />
        )}
      </div>

      {/* ===== LAYER 1: UI Overlay ===== */}
      {isUIVisible && (
        <>
          {/* Top bar: Logo + Tabs + Undo/Redo */}
          <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Left group */}
              <div className="flex items-center gap-3 pointer-events-auto">
                <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-gray-200/60 shadow-sm px-3 py-2">
                  <GenerateHeader />
                </div>

                {/* Tab switcher */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200/60 bg-white/90 backdrop-blur-xl shadow-sm">
                  <button
                    onClick={() => setViewMode("code")}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer",
                      viewMode === "code"
                        ? "bg-red-600 text-white"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                    )}
                  >
                    <Code className="w-3.5 h-3.5" />
                    Code
                  </button>
                  <button
                    onClick={() => setViewMode("preview")}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-colors border-l border-gray-200/60 cursor-pointer",
                      viewMode === "preview"
                        ? "bg-red-600 text-white"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                    )}
                  >
                    <Play className="w-3.5 h-3.5" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Right group: Undo/Redo */}
              <div className="pointer-events-auto">
                <SnapshotNav
                  messages={messages}
                  onRestoreSnapshot={handleRestoreSnapshot}
                  isStreaming={isStreaming}
                  variant="light"
                />
              </div>
            </div>
          </div>

          {/* Bottom-left: Render controls */}
          <div className="absolute bottom-4 left-4 z-40">
            <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-gray-200/60 shadow-sm p-2">
              <RenderControls
                code={code}
                durationInFrames={durationInFrames}
                fps={fps}
              />
            </div>
          </div>

          {/* Bottom-right: Settings */}
          <div className="absolute bottom-4 right-4 z-40">
            <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-gray-200/60 shadow-sm p-2">
              <SettingsModal
                durationInFrames={durationInFrames}
                onDurationChange={setDurationInFrames}
                fps={fps}
                onFpsChange={setFps}
              />
            </div>
          </div>
        </>
      )}

      {/* ===== LAYER 2: Chat ===== */}
      <FloatingChat
        ref={floatingChatRef}
        messages={messages}
        pendingMessage={pendingMessage}
        hasManualEdits={hasManualEdits}
        isOpen={isUIVisible}
        onOpenChange={handleUIOpen}
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
        variant="light"
      />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#f7f7f8]">
      <Loader2 className="w-8 h-8 animate-spin text-red-600" />
    </div>
  );
}

const GeneratePage: NextPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GeneratePageContent />
    </Suspense>
  );
};

export default GeneratePage;
