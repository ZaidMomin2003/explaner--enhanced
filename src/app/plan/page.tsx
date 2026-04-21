"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { examplePrompts } from "@/examples/prompts";
import { useImageAttachments } from "@/hooks/useImageAttachments";
import { MODELS, type ModelId } from "@/types/generation";
import {
    ArrowUp,
    BarChart3,
    Disc,
    Hash,
    MessageCircle,
    Paperclip,
    SquareArrowOutUpRight,
    Type,
    X,
    Sparkles,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const iconMap: Record<string, LucideIcon> = {
    Type,
    MessageCircle,
    Hash,
    BarChart3,
    Disc,
};

export default function PlanPage() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [model, setModel] = useState<ModelId>("sonnet-4-6");
    const [isNavigating, setIsNavigating] = useState(false);

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
        error,
        clearError,
    } = useImageAttachments();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(clearError, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isNavigating) return;
        setIsNavigating(true);
        if (attachedImages.length > 0) {
            sessionStorage.setItem("initialAttachedImages", JSON.stringify(attachedImages));
        } else {
            sessionStorage.removeItem("initialAttachedImages");
        }
        const params = new URLSearchParams({ prompt, model });
        router.push(`/generate?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
            {/* Grid background */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
                }}
            />

            {/* Header */}
            <header className="relative z-10 border-b border-white/5">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/code-examples"
                            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                            View examples
                            <SquareArrowOutUpRight className="size-3" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        AI Motion Studio
                    </span>
                </div>

                <h1 className="text-4xl font-bold text-center mb-2 md:text-5xl">
                    What do you want to create?
                </h1>
                <p className="text-sm text-white/40 text-center mb-10 max-w-md">
                    Describe your animation and our AI will generate production-ready motion graphics in seconds.
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                    <div
                        className={`overflow-hidden rounded-2xl border transition-colors ${isDragging
                            ? "border-primary bg-primary/5"
                            : "border-white/10 bg-white/[0.03]"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {/* Error */}
                        {error && (
                            <div className="px-5 pt-4">
                                <ErrorDisplay
                                    error={error}
                                    variant="inline"
                                    size="md"
                                    onDismiss={clearError}
                                />
                            </div>
                        )}

                        {/* Image previews */}
                        {attachedImages.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto px-5 pt-4 pb-1">
                                {attachedImages.map((img, index) => (
                                    <div key={index} className="relative flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={img}
                                            alt={`Attached ${index + 1}`}
                                            className="h-16 w-auto rounded-lg border border-white/10 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-background border border-white/10 text-white/50 hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <X className="size-2.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Textarea */}
                        <div className="px-5 pt-4 pb-2">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onPaste={handlePaste}
                                placeholder={
                                    isDragging
                                        ? "Drop images here..."
                                        : "Describe your animation... (paste or drop images)"
                                }
                                className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-white/25 focus:outline-none min-h-[80px] max-h-[200px]"
                                style={{ fieldSizing: "content" } as React.CSSProperties}
                                disabled={isNavigating}
                            />
                        </div>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        {/* Bottom bar */}
                        <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
                            <Select
                                value={model}
                                onValueChange={(value) => setModel(value as ModelId)}
                                disabled={isNavigating}
                            >
                                <SelectTrigger className="w-auto border-none bg-transparent text-xs text-white/40 hover:text-white/70 transition-colors">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-white/10 bg-background">
                                    {MODELS.map((m) => (
                                        <SelectItem
                                            key={m.id}
                                            value={m.id}
                                            className="text-foreground text-xs focus:bg-white/5"
                                        >
                                            {m.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex items-center gap-1.5">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isNavigating || !canAddMore}
                                    className="text-white/30 hover:text-white/60"
                                    title="Attach images"
                                >
                                    <Paperclip className="size-4" />
                                </Button>

                                <Button
                                    type="submit"
                                    size="icon-sm"
                                    disabled={!prompt.trim() || isNavigating}
                                    loading={isNavigating}
                                    className="bg-primary text-white hover:bg-primary/90 rounded-lg"
                                >
                                    <ArrowUp className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Prompt examples */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <span className="text-[11px] text-white/20 mr-1">Try:</span>
                        {examplePrompts.map((example) => {
                            const Icon = iconMap[example.icon];
                            return (
                                <button
                                    key={example.id}
                                    type="button"
                                    onClick={() => setPrompt(example.prompt)}
                                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/50 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/70"
                                >
                                    <Icon className="size-3" />
                                    {example.headline}
                                </button>
                            );
                        })}
                    </div>
                </form>
            </main>
        </div>
    );
}
