'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { motion } from 'framer-motion'
import { Home, Sparkles } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <Link href="/" className="mb-12">
                <Logo />
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 1 }}>
                <h1 className="text-[10rem] font-black leading-none tracking-tighter text-foreground/10 md:text-[14rem]">
                    404
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="-mt-10 max-w-lg">
                <h2 className="text-2xl font-bold md:text-3xl">
                    This page ran away faster than your last developer
                </h2>
                <p className="mt-4 text-muted-foreground">
                    We looked everywhere — under the server, behind the database, even asked the intern. 
                    It&apos;s gone. Probably building its own startup.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 rounded-2xl border border-border/50 bg-white/5 p-6 backdrop-blur-sm max-w-md w-full">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-amber-400">
                    <Sparkles className="size-4" />
                    LOST PAGE DISCOUNT
                    <Sparkles className="size-4" />
                </div>
                <p className="mt-2 text-2xl font-bold">Get your first video for $19</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    You found our secret 404 page. Use code <span className="font-mono font-semibold text-foreground">LOST404</span> at checkout. 
                    Because getting lost should come with perks.
                </p>
                <Button asChild size="lg" className="mt-5 w-full rounded-xl">
                    <Link href="/signup">Claim $10 Off</Link>
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6">
                <Button asChild variant="ghost" className="gap-2 text-muted-foreground">
                    <Link href="/">
                        <Home className="size-4" />
                        Back to safety
                    </Link>
                </Button>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-12 max-w-sm text-xs text-muted-foreground/50">
                Fun fact: This 404 page was built faster than most SaaS explainer videos. 
                Speaking of which... we can make yours in 10 minutes. Just saying. 👀
            </motion.p>
        </div>
    )
}
