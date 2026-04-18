'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { DollarSign, Link2, Image as ImageIcon, Megaphone, Mail, ArrowRight, Sparkles, Check } from 'lucide-react'
import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false })

const steps = [
    {
        step: '01',
        title: 'Apply via Email',
        description: 'Send us a quick intro at hello@saasvideo.online. Tell us about your audience and how you plan to promote.',
        icon: <Mail className="size-5" />,
    },
    {
        step: '02',
        title: 'Get Your Unique Link',
        description: 'Once approved, you receive a personal referral link and access to our affiliate dashboard.',
        icon: <Link2 className="size-5" />,
    },
    {
        step: '03',
        title: 'Share & Earn',
        description: 'Promote SaaSVideo to your audience. Every purchase made through your link earns you $5 instantly.',
        icon: <DollarSign className="size-5" />,
    },
]

const perks = [
    'Official brochures and marketing assets',
    'Pre-made social media graphics',
    'Freedom to create your own content',
    'Real-time earnings dashboard',
    'No cap on referrals or earnings',
    'Priority support for affiliates',
]

export default function AffiliatePage() {
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
            <div aria-hidden className="pointer-events-none absolute inset-0 h-[70vh] overflow-hidden opacity-30">
                <Aurora
                    colorStops={['#10B981', '#3B82F6', '#8B5CF6']}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.3}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-background" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/5">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/"><Logo /></Link>
                    <Link href="/" className="text-sm text-white/50 hover:text-white duration-150">← Back to home</Link>
                </div>
            </header>

            <main className="relative z-10 mx-auto max-w-4xl px-6 py-20 md:py-28">
                {/* Hero */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-sm">
                        <Sparkles className="size-3.5" />
                        Affiliate Program
                    </div>
                    <h1 className="mt-8 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                        Earn{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #10B981, #3B82F6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                            $5 per sale
                        </span>
                        <br />by sharing SaaSVideo.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
                        Join our affiliate program and earn for every customer you refer. No limits, no caps, just pure recurring income for spreading the word.
                    </p>
                </div>

                {/* Big earning card */}
                <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                    <div className="flex flex-col items-center gap-2 border-b border-white/5 py-10 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">You earn per purchase</p>
                        <p className="text-7xl font-black tracking-tight md:text-8xl">
                            <span className="text-4xl text-white/40 md:text-5xl">$</span>
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #10B981, #34D399)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                5
                            </span>
                        </p>
                        <p className="text-sm text-white/40">out of every $29 render fee</p>
                    </div>

                    <div className="grid gap-0 divide-y divide-white/5 md:grid-cols-3 md:divide-x md:divide-y-0">
                        <div className="p-6 text-center">
                            <p className="text-3xl font-bold">17%</p>
                            <p className="mt-1 text-xs text-white/40">Commission rate</p>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-3xl font-bold">∞</p>
                            <p className="mt-1 text-xs text-white/40">No earning cap</p>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-3xl font-bold">30d</p>
                            <p className="mt-1 text-xs text-white/40">Cookie duration</p>
                        </div>
                    </div>
                </div>

                {/* How it works */}
                <div className="mt-20">
                    <h2 className="text-center text-2xl font-bold md:text-3xl">How it works</h2>
                    <p className="mt-2 text-center text-sm text-white/40">Three simple steps to start earning</p>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {steps.map((s) => (
                            <div key={s.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/15">
                                <div className="absolute -right-6 -top-6 size-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                                <div className="relative">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-emerald-400/60">{s.step}</span>
                                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                                            {s.icon}
                                        </div>
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/50">{s.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What you get */}
                <div className="mt-20">
                    <h2 className="text-center text-2xl font-bold md:text-3xl">What you get</h2>
                    <p className="mt-2 text-center text-sm text-white/40">Everything you need to promote effectively</p>

                    <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-5">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                                <ImageIcon className="size-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Affiliate Toolkit</p>
                                <p className="text-xs text-white/40">Brochures, graphics & full creative freedom</p>
                            </div>
                        </div>
                        <ul className="mt-5 space-y-3.5">
                            {perks.map((perk, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                                        <Check className="size-3 text-emerald-400" />
                                    </div>
                                    <span className="text-sm text-white/70">{perk}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/[0.02] to-blue-500/10 p-10 text-center backdrop-blur-xl">
                    <div className="flex justify-center">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                            <Megaphone className="size-6 text-emerald-400" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold md:text-3xl">Ready to start earning?</h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
                        Drop us an email with a quick intro about yourself and your audience. We&apos;ll get you set up within 24 hours.
                    </p>
                    <Button asChild size="lg" className="mt-8 gap-2 rounded-xl px-8">
                        <a href="mailto:hello@saasvideo.online">
                            <Mail className="size-4" />
                            hello@saasvideo.online
                            <ArrowRight className="size-4" />
                        </a>
                    </Button>
                    <p className="mt-4 text-xs text-white/25">No application fee. No minimum audience size.</p>
                </div>
            </main>
        </div>
    )
}
