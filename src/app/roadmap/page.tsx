'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Sparkles, Check, Clock, Rocket, Lightbulb, ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false })

type ItemStatus = 'live' | 'completed' | 'inception' | 'upcoming'

interface RoadmapItem {
    date: string
    badge: string
    badgeStatus: ItemStatus
    title: string
    description: string
    extra?: string
}

const roadmap: RoadmapItem[] = [
    {
        date: 'MARCH 25, 2026',
        badge: 'TODAY',
        badgeStatus: 'live',
        title: 'Brand Overhaul & Lovable Redesign',
        description: "Launched the new design system focusing on aesthetics and user joy. Introduced the 'Lovable of Video Editing' philosophy across the platform.",
        extra: '84+ people already using this',
    },
    {
        date: 'MARCH 24, 2026',
        badge: 'JUST ADDED',
        badgeStatus: 'live',
        title: 'High-End AI Speech Synthesis',
        description: 'Integrated studio-quality voice generation that perfectly syncs with video timelines. No more robotic voices — full emotional range for explainers.',
    },
    {
        date: 'MARCH 22, 2026',
        badge: 'COMPLETED',
        badgeStatus: 'completed',
        title: '3D Perspective & Mockup Scenes',
        description: 'Added support for 3D UI structures. Flat screenshots are now automatically converted into dynamic 3D scenes with depth and shadow.',
    },
    {
        date: 'MARCH 18, 2026',
        badge: 'COMPLETED',
        badgeStatus: 'completed',
        title: 'After Effects Grade Motions',
        description: 'Launched the complex easing engine. Every transition now feels like it was manually keyframed by a professional motion designer.',
    },
    {
        date: 'MARCH 12, 2026',
        badge: 'COMPLETED',
        badgeStatus: 'completed',
        title: 'JIT Rendering Engine',
        description: 'Implemented Just-In-Time rendering infrastructure. Videos are now generated and previewed live in the browser without server wait times.',
    },
    {
        date: 'MARCH 8, 2026',
        badge: 'INCEPTION',
        badgeStatus: 'inception',
        title: 'Project Alpha Launch',
        description: 'The dream began. First successful conversion of a landing page URL into a multi-scene video timeline.',
    },
    {
        date: 'APRIL 2026',
        badge: 'UP NEXT',
        badgeStatus: 'upcoming',
        title: 'Multi-Language Localization',
        description: "Automatically translate your video scripts and voice-overs into 25+ languages, maintaining your brand's unique tone.",
    },
]

const badgeStyles: Record<ItemStatus, string> = {
    live: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    completed: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    inception: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    upcoming: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
}

const dotStyles: Record<ItemStatus, string> = {
    live: 'bg-emerald-400 shadow-emerald-400/50',
    completed: 'bg-blue-400 shadow-blue-400/50',
    inception: 'bg-amber-400 shadow-amber-400/50',
    upcoming: 'bg-violet-400 shadow-violet-400/50',
}

const BadgeIcon = ({ status }: { status: ItemStatus }) => {
    switch (status) {
        case 'live': return <Rocket className="size-3" />
        case 'completed': return <Check className="size-3" />
        case 'inception': return <Sparkles className="size-3" />
        case 'upcoming': return <Clock className="size-3" />
    }
}

export default function RoadmapPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
            {/* Grid */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
                }}
            />

            {/* Aurora */}
            <div aria-hidden className="pointer-events-none absolute inset-0 h-[60vh] overflow-hidden opacity-25">
                <Aurora
                    colorStops={['#8B5CF6', '#3B82F6', '#10B981']}
                    blend={0.5}
                    amplitude={0.8}
                    speed={0.3}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-background" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/5">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/"><Logo /></Link>
                    <Link href="/" className="text-sm text-white/50 hover:text-white duration-150">← Back to home</Link>
                </div>
            </header>

            <main className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-28">
                {/* Hero */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 backdrop-blur-sm">
                        The Journey So Far
                    </div>
                    <h1 className="mt-8 text-4xl font-bold md:text-5xl lg:text-6xl">
                        Platform{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                            Roadmap.
                        </span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-lg text-base text-white/40">
                        From an idea on March 8th to a fully automated AI video studio. Here&apos;s what we&apos;ve built and where we&apos;re headed.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative mt-16 md:mt-20">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 to-violet-500/40 md:left-1/2 md:-translate-x-px" />

                    <div className="space-y-0">
                        {roadmap.map((item, i) => {
                            const isRight = i % 2 === 0
                            return (
                                <div key={i} className="relative flex gap-6 pb-12 md:gap-0">
                                    {/* Dot */}
                                    <div className="absolute left-[15px] top-1.5 z-10 md:left-1/2 md:-translate-x-1/2">
                                        <div className={`size-[10px] rounded-full shadow-[0_0_8px] ${dotStyles[item.badgeStatus]}`} />
                                    </div>

                                    {/* Desktop layout */}
                                    <div className={`hidden w-full md:flex ${isRight ? '' : 'flex-row-reverse'}`}>
                                        {/* Content side */}
                                        <div className={`w-1/2 ${isRight ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                                            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${badgeStyles[item.badgeStatus]}`}>
                                                <BadgeIcon status={item.badgeStatus} />
                                                {item.badge}
                                            </div>
                                            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-white/45">{item.description}</p>
                                            {item.extra && (
                                                <p className="mt-2 text-xs font-medium text-emerald-400/70">{item.extra}</p>
                                            )}
                                        </div>
                                        {/* Date side */}
                                        <div className={`w-1/2 ${isRight ? 'pl-12' : 'pr-12 text-right'}`}>
                                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/20">{item.date}</p>
                                        </div>
                                    </div>

                                    {/* Mobile layout */}
                                    <div className="ml-10 md:hidden">
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20">{item.date}</p>
                                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${badgeStyles[item.badgeStatus]}">
                                            <BadgeIcon status={item.badgeStatus} />
                                            {item.badge}
                                        </div>
                                        <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-white/45">{item.description}</p>
                                        {item.extra && (
                                            <p className="mt-2 text-xs font-medium text-emerald-400/70">{item.extra}</p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Feature Request CTA */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
                    <div className="flex justify-center">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/20">
                            <Lightbulb className="size-6 text-violet-400" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold">Have a feature request?</h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
                        We build based on what our users need. Share your idea and help shape the future of SaaSVideo.
                    </p>
                    <Button asChild size="lg" className="mt-8 gap-2 rounded-xl px-8">
                        <a href="mailto:hello@saasvideo.online">
                            Submit Idea
                            <ArrowRight className="size-4" />
                        </a>
                    </Button>
                </div>
            </main>
        </div>
    )
}
