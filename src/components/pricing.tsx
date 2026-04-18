import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
    return (
        <div className="relative py-16 md:py-32" id="pricing">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">The studio grade of video generation</h2>
                </div>

                <div className="mt-8 md:mt-20">
                    <div className="bg-card relative rounded-3xl border shadow-2xl shadow-zinc-950/5">
                        <div className="grid items-center gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="pb-12 text-center md:pb-0 md:pr-12">
                                <h3 className="text-2xl font-semibold">Studio Render</h3>
                                <p className="mt-2 text-lg">One-time license per video</p>
                                <span className="mb-6 mt-12 inline-block text-6xl font-bold">
                                    <span className="text-4xl">$</span>29
                                </span>

                                <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="#">Start for free</Link>
                                    </Button>
                                </div>

                                <p className="text-muted-foreground mt-12 text-sm">Includes: Unlimited edits and previews, 4K export, AI voice-over, and commercial license</p>
                            </div>

                            <div className="relative">
                                <ul
                                    role="list"
                                    className="space-y-4">
                                    {['Unlimited Edits & Previews', 'Remove All Watermarks', '4K Ultra-HD MP4 Export', 'AI Native Voice-over', 'Commercial License'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-muted-foreground mt-6 text-sm">Zero subscription fees. Zero manual keyframing. Pay only for the hardware time when you&apos;re ready to download.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
