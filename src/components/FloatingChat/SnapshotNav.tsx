"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ConversationMessage } from "@/types/conversation";
import { Redo2, Undo2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface SnapshotNavProps {
  messages: ConversationMessage[];
  onRestoreSnapshot: (code: string) => void;
  isStreaming: boolean;
  variant?: "dark" | "light";
}

export function SnapshotNav({
  messages,
  onRestoreSnapshot,
  isStreaming,
  variant = "dark",
}: SnapshotNavProps) {
  const isLight = variant === "light";

  const snapshots = useMemo(() => {
    return messages.filter(
      (m) =>
        m.role === "assistant" &&
        m.codeSnapshot &&
        m.codeSnapshot !== "[code]",
    );
  }, [messages]);

  const [currentIndex, setCurrentIndex] = useState(snapshots.length - 1);

  useEffect(() => {
    setCurrentIndex(snapshots.length - 1);
  }, [snapshots.length]);

  const canUndo = currentIndex > 0 && !isStreaming;
  const canRedo = currentIndex < snapshots.length - 1 && !isStreaming;

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    const snapshot = snapshots[newIndex];
    if (snapshot?.codeSnapshot) {
      onRestoreSnapshot(snapshot.codeSnapshot);
    }
  }, [canUndo, currentIndex, snapshots, onRestoreSnapshot]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    const snapshot = snapshots[newIndex];
    if (snapshot?.codeSnapshot) {
      onRestoreSnapshot(snapshot.codeSnapshot);
    }
  }, [canRedo, currentIndex, snapshots, onRestoreSnapshot]);

  if (snapshots.length < 2) return null;

  return (
    <div
      className={
        isLight
          ? "flex items-center gap-1 bg-white/90 backdrop-blur-xl rounded-xl border border-gray-200/60 shadow-sm p-1"
          : "flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/[0.08] p-1"
      }
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={!canUndo}
            onClick={handleUndo}
            className={
              isLight
                ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-7 w-7 disabled:opacity-30"
                : "text-white/60 hover:text-white hover:bg-white/10 h-7 w-7 disabled:opacity-30"
            }
          >
            <Undo2 className="w-3.5 h-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Previous version
        </TooltipContent>
      </Tooltip>

      <span
        className={
          isLight
            ? "text-[10px] text-gray-400 font-mono px-1 min-w-[2.5rem] text-center"
            : "text-[10px] text-white/30 font-mono px-1 min-w-[2.5rem] text-center"
        }
      >
        {currentIndex + 1}/{snapshots.length}
      </span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={!canRedo}
            onClick={handleRedo}
            className={
              isLight
                ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-7 w-7 disabled:opacity-30"
                : "text-white/60 hover:text-white hover:bg-white/10 h-7 w-7 disabled:opacity-30"
            }
          >
            <Redo2 className="w-3.5 h-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Next version
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
