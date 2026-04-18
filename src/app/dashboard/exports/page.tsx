'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Logo } from '@/components/logo'
import { UserDropdown } from '@/components/dashboard/UserDropdown'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ExportsPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) router.replace('/login')
    }, [user, loading, router])

    if (loading || !user) return null

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <Link href="/dashboard"><Logo /></Link>
                    <UserDropdown />
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-6 py-12">
                <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground duration-150 mb-6">
                    <ArrowLeft className="size-3.5" /> Back to dashboard
                </Link>
                <h1 className="text-2xl font-bold">Project Exports</h1>
                <p className="mt-2 text-muted-foreground">View and download your rendered videos.</p>
            </main>
        </div>
    )
}
