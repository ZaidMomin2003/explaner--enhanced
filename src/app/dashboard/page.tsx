'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/logo'
import { UserDropdown } from '@/components/dashboard/UserDropdown'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Search, Clock, Calendar, ArrowDownAZ, Video, Sparkles, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortMode = 'newest' | 'oldest' | 'a-z'

type ProjectStatus = 'planning' | 'generating' | 'rendered' | 'exported'

interface Project {
    id: string
    name: string
    date: string
    status: ProjectStatus
}

const demoProjects: Project[] = [
    { id: '1', name: 'Hero', date: 'APR 17', status: 'planning' },
    { id: '2', name: 'demopoo', date: 'APR 13', status: 'generating' },
    { id: '3', name: 'wisdom', date: 'APR 13', status: 'planning' },
    { id: '4', name: 'onboarding', date: 'APR 12', status: 'planning' },
    { id: '5', name: 'pricing-flow', date: 'APR 11', status: 'generating' },
    { id: '6', name: 'features-reel', date: 'APR 10', status: 'generating' },
    { id: '7', name: 'launch-teaser', date: 'APR 9', status: 'generating' },
]

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
    planning: { label: 'PLANNING', className: 'bg-primary/10 text-primary' },
    generating: { label: 'GENERATING', className: 'bg-amber-500/10 text-amber-400' },
    rendered: { label: 'RENDERED', className: 'bg-emerald-500/10 text-emerald-400' },
    exported: { label: 'EXPORTED', className: 'bg-violet-500/10 text-violet-400' },
}

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortMode, setSortMode] = useState<SortMode>('newest')

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
            </div>
        )
    }

    if (!user) return null

    const displayName = user.displayName || user.email?.split('@')[0] || 'there'

    const filteredProjects = demoProjects.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <Link href="/dashboard"><Logo /></Link>
                    <UserDropdown />
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Hero Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-3.5 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                Creative Engine v3.1
                            </span>
                        </div>
                        <h1 className="mt-2 text-3xl font-black italic tracking-tight md:text-4xl">
                            studio<span className="text-primary">.</span>
                        </h1>
                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                            Welcome back, <span className="font-semibold text-foreground">{displayName}</span>. Resume your cinematic production workflow.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
                            <input
                                type="text"
                                placeholder="Search productions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-11 w-64 rounded-xl border border-border/50 bg-white/5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                        </div>
                        <Button size="lg" className="gap-2 rounded-xl px-6">
                            <Plus className="size-4" />
                            New Video
                        </Button>
                    </div>
                </div>

                {/* Productions Bar */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                            <LayoutGrid className="size-4 text-primary" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                            Your Productions
                        </span>
                        <span className="text-xs font-bold text-primary">
                            | {filteredProjects.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-white/5 p-1">
                        <SortButton
                            active={sortMode === 'newest'}
                            onClick={() => setSortMode('newest')}
                            icon={<Clock className="size-3.5" />}
                            label="Newest"
                        />
                        <SortButton
                            active={sortMode === 'oldest'}
                            onClick={() => setSortMode('oldest')}
                            icon={<Calendar className="size-3.5" />}
                            label="Oldest"
                        />
                        <SortButton
                            active={sortMode === 'a-z'}
                            onClick={() => setSortMode('a-z')}
                            icon={<ArrowDownAZ className="size-3.5" />}
                            label="A-Z"
                        />
                    </div>
                </div>

                {/* Project Grid */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Create New Card */}
                    <button className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-transparent py-14 transition-colors hover:border-primary/30 hover:bg-white/5">
                        <div className="flex size-14 items-center justify-center rounded-xl border border-border/50 bg-white/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                            <Plus className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
                        </div>
                        <span className="mt-4 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                            Create Prototype
                        </span>
                    </button>

                    {/* Project Cards */}
                    {filteredProjects.map((project) => {
                        const status = statusConfig[project.status]
                        return (
                            <div
                                key={project.id}
                                className="group cursor-pointer rounded-xl border border-border/50 bg-white/[0.02] p-4 transition-all hover:border-border hover:bg-white/5">
                                {/* Thumbnail Area */}
                                <div className="relative flex aspect-[4/3] items-center justify-center rounded-lg bg-white/5">
                                    <span className={cn('absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider', status.className)}>
                                        {status.label}
                                    </span>
                                    <Video className="size-6 text-muted-foreground/30" />
                                </div>

                                {/* Info */}
                                <div className="mt-3">
                                    <h3 className="text-sm font-semibold truncate">{project.name}</h3>
                                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                        <Clock className="size-3" />
                                        {project.date}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

function SortButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                active
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
            )}>
            {icon}
            {label}
        </button>
    )
}
