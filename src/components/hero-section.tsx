'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { HeroHeader } from '@/components/landing/LandingHeader'
import Features from '@/components/features'
import FeaturesSection from '@/components/features-section'
import Pricing from '@/components/pricing'
import FAQsFour from '@/components/faq'
import FooterSection from '@/components/footer-section'
import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false })

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-[100vh] overflow-hidden">
                    <Aurora
                        colorStops={['#3B82F6', '#8B5CF6', '#3B82F6']}
                        blend={0.6}
                        amplitude={1.2}
                        speed={0.5}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-background" />
                </div>

                <section>
                    <div className="relative pt-24 md:pt-36">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="/signup"
                                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                        <span className="text-foreground text-sm">Funded by AWS Startups</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedGroup>

                                <motion.h1
                                    initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }}
                                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                    transition={{ type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.2 }}
                                    className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                    The{' '}
                                    <span
                                        className="inline-block pb-2 pr-1"
                                        style={{
                                            fontFamily: 'var(--font-great-vibes), cursive',
                                            background: 'linear-gradient(to right, #e11d48, #f97316, #f59e0b)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            lineHeight: 1.2,
                                        }}>
                                        Lovable
                                    </span>
                                    {' '}of SaaS Explainer Videos
                                </motion.h1>

                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                    Paste your website URL and get draft one instantly. Make unlimited edits, add speech and music, then pay only when you are satisfied and ready to download.
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-5 text-base">
                                            <Link href="/signup">
                                                <span className="text-nowrap">Start for free</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5">
                                        <Link href="#demo">
                                            <span className="text-nowrap">Watch Demo</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20" id="demo">
                                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl">
                                    <div className="aspect-[15/8] relative w-full overflow-hidden rounded-2xl">
                                        <iframe
                                            src="https://player.vimeo.com/video/1176093594?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                                            className="absolute inset-0 size-full"
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            style={{ border: 'none' }}
                                            title="SaaSVideo Demo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>

                <Features />
                <FeaturesSection />
                <Pricing />
                <FAQsFour />
                <FooterSection />
            </main>
        </>
    )
}
