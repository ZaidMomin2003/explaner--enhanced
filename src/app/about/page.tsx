'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/logo'
import { MapPin, Sparkles, Target, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false })

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
            {/* Grid background */}
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

            {/* Aurora background */}
            <div aria-hidden className="pointer-events-none absolute inset-0 h-[70vh] overflow-hidden opacity-40">
                <Aurora
                    colorStops={['#6366F1', '#8B5CF6', '#3B82F6']}
                    blend={0.6}
                    amplitude={1.0}
                    speed={0.3}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-background" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/5">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/"><Logo /></Link>
                    <Link href="/" className="text-sm text-white/50 hover:text-white duration-150">
                        ← Back to home
                    </Link>
                </div>
            </header>

            <main className="relative z-10 mx-auto max-w-4xl px-6 py-20 md:py-28">
                {/* Hero */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
                        <Sparkles className="size-3.5" />
                        About Us
                    </div>
                    <h1 className="mt-8 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                        Built by a founder,<br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                            for founders.
                        </span>
                    </h1>
                </div>

                {/* Founder Card */}
                <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:mt-20">
                    <div className="flex flex-col md:flex-row">
                        {/* Photo side */}
                        <div className="relative md:w-2/5">
                            <div className="aspect-square md:aspect-auto md:h-full">
                                <Image
                                    src="/Zaid.jpg"
                                    alt="Zaid - Founder"
                                    width={500}
                                    height={600}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/30" />
                            <div className="absolute bottom-4 left-4 md:hidden">
                                <h2 className="text-2xl font-bold text-white">Zaid</h2>
                                <div className="flex items-center gap-1.5 text-sm text-white/70">
                                    <MapPin className="size-3" />
                                    Bangalore, India
                                </div>
                            </div>
                        </div>

                        {/* Content side */}
                        <div className="flex-1 p-8 md:p-10">
                            <div className="hidden md:block">
                                <h2 className="text-3xl font-bold">Meet Zaid.</h2>
                                <div className="mt-2 flex items-center gap-2 text-sm text-white/40">
                                    <MapPin className="size-3.5" />
                                    Bangalore, India
                                </div>
                            </div>

                            <p className="mt-6 text-[15px] leading-relaxed text-white/60">
                                Yo! I&apos;m Zaid. I built SaaSVideo because I was tired of seeing incredible solo founders struggle to market their products simply because they couldn&apos;t afford a $2,000 agency video or didn&apos;t know how to use After Effects.
                            </p>
                            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                                I combined my love for programmatic UI generation with the latest AI reasoning models to create a &quot;Vibe Editor&quot;. Now, anyone can generate a pixel-perfect, motion-graphics masterpiece in just 10 minutes.
                            </p>

                            {/* Socials */}
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link
                                    href="https://x.com/zaidbuilds"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
                                    </svg>
                                    @zaidbuilds
                                </Link>
                                <Link
                                    href="http://instagram.com/fallen_zaid"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                                    </svg>
                                    @fallen_zaid
                                </Link>
                                <Link
                                    href="https://in.linkedin.com/in/arshad-momin-a3139b21b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                                    </svg>
                                    LinkedIn
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/15">
                        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                        <div className="relative">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20">
                                <Target className="size-5 text-primary" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold">Our Mission</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/50">
                                To hyper-democratize high-end marketing. We believe that if you can write code to build a great SaaS, you shouldn&apos;t have to learn timeline editing software to show it off to the world. We turn a 2-week agency delay into a 10-minute automated flow.
                            </p>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/15">
                        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-violet-500/5 blur-2xl transition-all group-hover:bg-violet-500/10" />
                        <div className="relative">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 ring-1 ring-violet-500/20">
                                <Eye className="size-5 text-violet-400" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold">Our Vision</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/50">
                                To completely bridge the gap between &quot;I have an idea&quot; and &quot;Here is my stunning launch video.&quot; We envision a future where SaaSVideo is the default render engine for every solo founder and indie maker globally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-white/30">Ready to create your first explainer?</p>
                    <Button asChild size="lg" className="mt-4 rounded-xl px-8">
                        <Link href="/signup">Start for free →</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}
