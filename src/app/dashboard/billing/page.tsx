'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Logo } from '@/components/logo'
import { UserDropdown } from '@/components/dashboard/UserDropdown'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreditCard, Download, History } from 'lucide-react'

export default function BillingPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) router.replace('/login')
    }, [user, loading, router])

    if (loading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <Link href="/dashboard"><Logo /></Link>
                    <UserDropdown />
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold italic">Billing &amp; Invoices</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage your payment methods and export history.</p>
                </div>

                {/* Current Plan + Payment Method */}
                <div className="rounded-xl border border-border/50 p-6">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        {/* Plan Info */}
                        <div>
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                                Current Plan
                            </span>
                            <h2 className="mt-3 text-2xl font-bold">Free Tier</h2>
                            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
                                You are currently on the free tier. You only pay a flat $29 export fee per video. No hidden subscriptions.
                            </p>
                        </div>

                        {/* Payment Method */}
                        <div className="shrink-0 rounded-lg border border-border/50 bg-white/5 p-4 sm:w-56">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <CreditCard className="size-3.5" />
                                    Payment Method
                                </div>
                                <button className="text-xs font-semibold text-primary hover:underline">
                                    Update
                                </button>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-7 items-center rounded bg-[#1a1f71] px-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">Visa</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">•••• 4242</p>
                                    <p className="text-[11px] text-muted-foreground">Expires 12/28</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment History */}
                <div className="mt-6 rounded-xl border border-border/50 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold italic">Payment History</h2>
                            <p className="mt-0.5 text-sm text-muted-foreground">View and download your past export invoices.</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 rounded-lg text-xs" disabled>
                            <Download className="size-3.5" />
                            Export All
                        </Button>
                    </div>

                    {/* Empty State */}
                    <div className="mt-10 flex flex-col items-center justify-center pb-6 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-white/5">
                            <History className="size-5 text-muted-foreground/50" />
                        </div>
                        <h3 className="mt-4 text-sm font-semibold">No payment history</h3>
                        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
                            You haven&apos;t made any payments yet. Your export history will appear here once you render your first video.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
