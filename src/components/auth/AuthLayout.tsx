'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ReactNode } from 'react'

export function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">
            {/* Grid background with inline style for reliability */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
                }}
            />

            {/* Subtle color blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-violet-500/5 blur-3xl"
            />

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block">
                        <Logo />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    )
}
