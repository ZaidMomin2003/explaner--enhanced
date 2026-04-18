'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Globe, Wand2, MessageSquare, Film, Download, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TourCard {
    step: number
    title: string
    description: string
    icon: React.ReactNode
    bullets: string[]
    accent: string
}

const tourCards: TourCard[] = [
    {
        step: 1,
        title: 'Welcome to SaaSVideo Studio',
        description: "Your AI-powered motion designer. Think of it as the 'Lovable' for video creation. Transform your SaaS UI into high-converting explainers in seconds.",
        icon: <Sparkles className="size-6" />,
        bullets: ['Start by creating a new project', 'Paste your app URL', 'Let the AI analyze your brand'],
        accent: 'from-blue-500 to-indigo-500',
    },
    {
        step: 2,
        title: 'Paste Your URL',
        description: 'Drop in your website or landing page URL. Our AI crawls it to extract screenshots, brand colors, logos, and copy automatically.',
        icon: <Globe className="size-6" />,
        bullets: ['Auto-extracts screenshots & assets', 'Detects brand colors & fonts', 'No manual uploads needed'],
        accent: 'from-violet-500 to-purple-500',
    },
    {
        step: 3,
        title: 'AI Generates Your Draft',
        description: 'The Director AI writes a script, picks the best layouts, and generates pixel-perfect motion graphics. Your first draft is ready in under a minute.',
        icon: <Wand2 className="size-6" />,
        bullets: ['Auto-generated storyboard', 'Smart scene transitions', 'Professional motion graphics'],
        accent: 'from-amber-500 to-orange-500',
    },
    {
        step: 4,
        title: 'Edit with Natural Language',
        description: "Just type what you want changed. Say 'move the hero up' or 'add a fade-in' and the AI handles the motion logic instantly. Unlimited edits, zero cost.",
        icon: <MessageSquare className="size-6" />,
        bullets: ['Chat-based editing interface', 'Add speech & background music', 'Unlimited free revisions'],
        accent: 'from-emerald-500 to-teal-500',
    },
    {
        step: 5,
        title: 'Export When Ready',
        description: "Preview your full video for free. When you're 100% satisfied, pay the one-time $29 fee to render and download your 4K video with commercial license.",
        icon: <Download className="size-6" />,
        bullets: ['4K Ultra-HD MP4 export', 'AI native voice-over included', 'Full commercial license'],
        accent: 'from-rose-500 to-pink-500',
    },
]

interface TourModalProps {
    open: boolean
    onClose: () => void
}

export function TourModal({ open, onClose }: TourModalProps) {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)

    const goTo = (index: number) => {
        setDirection(index > current ? 1 : -1)
        setCurrent(index)
    }

    const next = () => {
        if (current < tourCards.length - 1) goTo(current + 1)
    }

    const prev = () => {
        if (current > 0) goTo(current - 1)
    }

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -60 && current < tourCards.length - 1) next()
        else if (info.offset.x > 60 && current > 0) prev()
    }

    const card = tourCards[current]

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9, rotateY: dir > 0 ? 8 : -8 }),
        center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9, rotateY: dir > 0 ? -8 : 8 }),
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">

                    {/* Header */}
                    <div className="absolute left-6 top-6 md:left-10 md:top-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Interactive</p>
                        <h2 className="mt-1 text-2xl font-black italic text-foreground">Project Tour</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white md:right-10 md:top-10">
                        <X className="size-5" />
                    </button>

                    {/* Card Area */}
                    <div className="relative flex w-full max-w-md items-center justify-center px-6" style={{ perspective: 1200 }}>
                        {/* Stacked cards behind */}
                        {current < tourCards.length - 1 && (
                            <div className="absolute inset-x-6 top-4 h-full rounded-2xl border border-white/5 bg-white/[0.03] blur-[1px]" />
                        )}
                        {current < tourCards.length - 2 && (
                            <div className="absolute inset-x-10 top-8 h-full rounded-2xl border border-white/[0.03] bg-white/[0.02] blur-[2px]" />
                        )}

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={handleDragEnd}
                                className="w-full cursor-grab active:cursor-grabbing">

                                <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-2xl">
                                    {/* Accent bar */}
                                    <div className={`h-1 w-full bg-gradient-to-r ${card.accent}`} />

                                    <div className="p-7">
                                        {/* Icon */}
                                        <div className={`mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}>
                                            {card.icon}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold leading-tight">{card.title}</h3>

                                        {/* Description */}
                                        <p className="mt-3 text-sm leading-relaxed text-white/50">{card.description}</p>

                                        {/* Bullets */}
                                        <ul className="mt-6 space-y-3">
                                            {card.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <div className={`flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${card.accent} shadow-sm`}>
                                                        <Film className="size-3 text-white" />
                                                    </div>
                                                    <span className="text-sm font-medium text-white/80">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Progress */}
                                        <div className="mt-7 flex items-center justify-between">
                                            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25">
                                                Card {card.step} of {tourCards.length}
                                            </p>
                                            <div className="flex gap-1.5">
                                                {tourCards.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => goTo(i)}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                                                            ? `w-6 bg-gradient-to-r ${card.accent}`
                                                            : 'w-1.5 bg-white/15 hover:bg-white/25'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4 px-6">
                        {current === tourCards.length - 1 ? (
                            <Button onClick={onClose} size="lg" className="w-full rounded-xl text-sm font-bold uppercase tracking-wider">
                                I&apos;m Ready to Build
                            </Button>
                        ) : (
                            <Button onClick={next} variant="outline" size="lg" className="w-full rounded-xl border-white/10 bg-white/5 text-sm font-bold uppercase tracking-wider hover:bg-white/10">
                                Next
                            </Button>
                        )}

                        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/20">
                            <button onClick={prev} disabled={current === 0} className="transition-colors hover:text-white/40 disabled:opacity-30">
                                <ChevronLeft className="size-4" />
                            </button>
                            Swipe cards to explore
                            <button onClick={next} disabled={current === tourCards.length - 1} className="transition-colors hover:text-white/40 disabled:opacity-30">
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
