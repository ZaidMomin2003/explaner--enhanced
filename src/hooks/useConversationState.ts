import type {
  AssistantMetadata,
  ConversationContextMessage,
  ConversationMessage,
  ConversationState,
  EditOperation,
} from "@/types/conversation";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "explainer-conversation";

function loadPersistedState(): ConversationState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConversationState;
    // Restore without pendingMessage (transient state)
    return { ...parsed, pendingMessage: undefined };
  } catch {
    return null;
  }
}

function persistState(state: ConversationState) {
  if (typeof window === "undefined") return;
  try {
    // Strip large fields (attachedImages, codeSnapshot) to keep localStorage small
    const lightweight: ConversationState = {
      ...state,
      pendingMessage: undefined,
      messages: state.messages.map((m) => ({
        ...m,
        attachedImages: undefined,
        codeSnapshot: m.codeSnapshot ? "[code]" : undefined,
      })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function useConversationState() {
  const [state, setState] = useState<ConversationState>(() => {
    const persisted = loadPersistedState();
    return persisted || {
      messages: [],
      hasManualEdits: false,
      lastGenerationTimestamp: null,
      pendingMessage: undefined,
    };
  });

  // Persist on every state change
  useEffect(() => {
    persistState(state);
  }, [state]);

  // Track the last AI-generated code to detect manual edits
  const lastAiCodeRef = useRef<string>("");

  const addUserMessage = useCallback(
    (content: string, attachedImages?: string[]) => {
      const message: ConversationMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: Date.now(),
        attachedImages,
      };
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
      return message.id;
    },
    [],
  );

  const addAssistantMessage = useCallback(
    (content: string, codeSnapshot: string, metadata?: AssistantMetadata) => {
      const message: ConversationMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content,
        timestamp: Date.now(),
        codeSnapshot,
        metadata,
      };
      lastAiCodeRef.current = codeSnapshot;
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
        hasManualEdits: false,
        lastGenerationTimestamp: Date.now(),
      }));
      return message.id;
    },
    [],
  );

  const addErrorMessage = useCallback(
    (
      content: string,
      errorType: "edit_failed" | "api" | "validation",
      failedEdit?: EditOperation,
    ) => {
      const message: ConversationMessage = {
        id: `error-${Date.now()}`,
        role: "error",
        content,
        timestamp: Date.now(),
        errorType,
        failedEdit,
      };
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
      return message.id;
    },
    [],
  );

  const markManualEdit = useCallback((currentCode: string) => {
    if (currentCode !== lastAiCodeRef.current && lastAiCodeRef.current !== "") {
      setState((prev) => ({
        ...prev,
        hasManualEdits: true,
      }));
    }
  }, []);

  const clearConversation = useCallback(() => {
    lastAiCodeRef.current = "";
    setState({
      messages: [],
      hasManualEdits: false,
      lastGenerationTimestamp: null,
      pendingMessage: undefined,
    });
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("explainer-code");
    }
  }, []);

  const setPendingMessage = useCallback((skills?: string[]) => {
    setState((prev) => ({
      ...prev,
      pendingMessage: {
        skills,
        startedAt: Date.now(),
      },
    }));
  }, []);

  const clearPendingMessage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      pendingMessage: undefined,
    }));
  }, []);

  const getFullContext = useCallback((): ConversationContextMessage[] => {
    return state.messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.role === "user" ? m.content : "[Generated Code]",
        ...(m.role === "user" && m.attachedImages && m.attachedImages.length > 0
          ? { attachedImages: m.attachedImages }
          : {}),
      }));
  }, [state.messages]);

  const getPreviouslyUsedSkills = useCallback((): string[] => {
    const allSkills = new Set<string>();
    state.messages.forEach((m) => {
      if (m.role === "assistant" && m.metadata?.skills) {
        m.metadata.skills.forEach((skill) => allSkills.add(skill));
      }
    });
    return Array.from(allSkills);
  }, [state.messages]);

  const getLastUserAttachedImages = useCallback((): string[] | undefined => {
    for (let i = state.messages.length - 1; i >= 0; i--) {
      const msg = state.messages[i];
      if (
        msg.role === "user" &&
        msg.attachedImages &&
        msg.attachedImages.length > 0
      ) {
        return msg.attachedImages;
      }
    }
    return undefined;
  }, [state.messages]);

  return {
    ...state,
    addUserMessage,
    addAssistantMessage,
    addErrorMessage,
    markManualEdit,
    clearConversation,
    getFullContext,
    getPreviouslyUsedSkills,
    getLastUserAttachedImages,
    setPendingMessage,
    clearPendingMessage,
    isFirstGeneration: state.messages.length === 0,
  };
}
