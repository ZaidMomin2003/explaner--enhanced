'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/logo'
import { UserDropdown } from '@/components/dashboard/UserDropdown'
import { NewVideoModal } from '@/components/dashboard/NewVideoModal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Search, Clock, Calendar, ArrowDownAZ, Video, Sparkles, LayoutGrid, List, Trash2, Music, Mic, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Project, createProject, deleteProject, subscribeToProjects } from '@/lib/projects'

type SortMode = 'newest' | 'oldest' | 'a-z'
type ViewMode = 'grid' | 'list'

const statusConfig: Record<Project['status'], { label: string; className: string }> = {
    planning: { label: 'PLANNING', className: 'bg-primary/10 text-primary' },
    generating: { label: 'GENERATING', className: 'bg-amber-500/10 text-amber-400' },
    rendered: { label: 'RENDERED', className: 'bg-emerald-500/10 text-emerald-400' },
    exported: { label: 'EXPORTED', className: 'bg-violet-500/10 text-violet-400' },
}

function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
}

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [projectsLoading, setProjectsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortMode, setSortMode] = useState<SortMode>('newest')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [newVideoOpen, setNewVideoOpen] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (!loading && !user) router.replace('/login')
    }, [user, loading, router])

    // Subscribe to Firestore projects
    useEffect(() => {
        if (!user) return
        setProjectsLoading(true)
        const unsubscribe = subscribeToProjects(user.uid, (data) => {
            setProjects(data)
            setProjectsLoading(false)
        })
        return () => unsubscribe()
    }, [user])

    if (loading || projectsLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
            </div>
        )
    }

    if (!user) return null

    const displayName = user.displayName || user.email?.split('@')[0] || 'there'

    const handleCreate = async (data: { name: string; url: string; music: boolean; speech: boolean; sfx: boolean; instructions: string }) => {
        await createProject(user.uid, data)
    }

    const handleDelete = async (id: string) => {
        setDeleting(true)
        await deleteProject(user.uid, id)
        setDeleting(false)
        setDeleteConfirm(null)
    }

    // Filter & sort
    let filtered = projects.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (sortMode === 'oldest') filtered = [...filtered].sort((a, b) => a.createdAt - b.createdAt)
    else if (sortMode === 'a-z') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    // 'newest' is default from Firestore orderBy

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <Link href="/dashboard"><Logo /></Link>
                    <UserDropdown />
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Hero */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-3.5 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Creative Engine v3.1</span>
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
                        <Button size="lg" className="gap-2 rounded-xl px-6" onClick={() => setNewVideoOpen(true)}>
                            <Plus className="size-4" />
                            New Video
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                            <LayoutGrid className="size-4 text-primary" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">Your Productions</span>
                        <span className="text-xs font-bold text-primary">| {filtered.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-white/5 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors', viewMode === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
                                <LayoutGrid className="size-3.5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors', viewMode === 'list' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>
                                <List className="size-3.5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-white/5 p-1">
                            <SortButton active={sortMode === 'newest'} onClick={() => setSortMode('newest')} icon={<Clock className="size-3.5" />} label="Newest" />
                            <SortButton active={sortMode === 'oldest'} onClick={() => setSortMode('oldest')} icon={<Calendar className="size-3.5" />} label="Oldest" />
                            <SortButton active={sortMode === 'a-z'} onClick={() => setSortMode('a-z')} icon={<ArrowDownAZ className="size-3.5" />} label="A-Z" />
                        </div>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <button onClick={() => setNewVideoOpen(true)} className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-transparent py-14 transition-colors hover:border-primary/30 hover:bg-white/5">
                            <div className="flex size-14 items-center justify-center rounded-xl border border-border/50 bg-white/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                                <Plus className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
                            </div>
                            <span className="mt-4 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">Create Prototype</span>
                        </button>

                        {filtered.map((project) => {
                            const status = statusConfig[project.status]
                            return (
                                <div key={project.id} className="group relative cursor-pointer rounded-xl border border-border/50 bg-white/[0.02] p-4 transition-all hover:border-border hover:bg-white/5">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm(project.id) }}
                                        className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-lg bg-black/50 text-white/0 opacity-0 backdrop-blur-sm transition-all group-hover:text-white/50 group-hover:opacity-100 hover:!text-red-400">
                                        <Trash2 className="size-3.5" />
                                    </button>
                                    <div className="relative flex aspect-[4/3] items-center justify-center rounded-lg bg-white/5">
                                        <span className={cn('absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider', status.className)}>
                                            {status.label}
                                        </span>
                                        <Video className="size-6 text-muted-foreground/30" />
                                        <div className="absolute bottom-2.5 right-2.5 flex gap-1">
                                            {project.music && <span className="flex size-5 items-center justify-center rounded bg-white/10"><Music className="size-2.5 text-white/40" /></span>}
                                            {project.speech && <span className="flex size-5 items-center justify-center rounded bg-white/10"><Mic className="size-2.5 text-white/40" /></span>}
                                            {project.sfx && <span className="flex size-5 items-center justify-center rounded bg-white/10"><Waves className="size-2.5 text-white/40" /></span>}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="truncate text-sm font-semibold">{project.name}</h3>
                                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                            <Clock className="size-3" />
                                            {formatDate(project.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="mt-8">
                        {filtered.length === 0 && projects.length === 0 ? (
                            <EmptyState onNew={() => setNewVideoOpen(true)} />
                        ) : filtered.length === 0 ? (
                            <div className="py-12 text-center text-sm text-muted-foreground">No projects match &quot;{searchQuery}&quot;</div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-border/50">
                                <div className="grid grid-cols-[1fr_120px_100px_80px_40px] items-center gap-4 border-b border-white/5 bg-white/[0.02] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white/30">
                                    <span>Project</span>
                                    <span>Status</span>
                                    <span>Audio</span>
                                    <span>Date</span>
                                    <span />
                                </div>
                                {filtered.map((project) => {
                                    const status = statusConfig[project.status]
                                    return (
                                        <div key={project.id} className="group grid grid-cols-[1fr_120px_100px_80px_40px] items-center gap-4 border-b border-white/5 px-5 py-3.5 transition-colors last:border-0 hover:bg-white/[0.03]">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                                                    <Video className="size-4 text-muted-foreground/40" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium">{project.name}</p>
                                                    <p className="truncate text-[11px] text-white/25">{project.url}</p>
                                                </div>
                                            </div>
                                            <span className={cn('w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider', status.className)}>
                                                {status.label}
                                            </span>
                                            <div className="flex gap-1.5">
                                                {project.music && <Music className="size-3.5 text-white/30" />}
                                                {project.speech && <Mic className="size-3.5 text-white/30" />}
                                                {project.sfx && <Waves className="size-3.5 text-white/30" />}
                                            </div>
                                            <span className="text-[11px] text-muted-foreground">{formatDate(project.createdAt)}</span>
                                            <button
                                                onClick={() => setDeleteConfirm(project.id)}
                                                className="flex size-7 items-center justify-center rounded-lg text-white/0 opacity-0 transition-all group-hover:text-white/40 group-hover:opacity-100 hover:!text-red-400">
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'grid' && filtered.length === 0 && projects.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-sm text-muted-foreground">No projects match &quot;{searchQuery}&quot;</p>
                    </div>
                )}

                {viewMode === 'grid' && projects.length === 0 && (
                    <div className="mt-4"><EmptyState onNew={() => setNewVideoOpen(true)} /></div>
                )}
            </main>

            <NewVideoModal open={newVideoOpen} onClose={() => setNewVideoOpen(false)} onCreate={handleCreate} />

            {deleteConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !deleting && setDeleteConfirm(null)} />
                    <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-background p-6 shadow-2xl">
                        <h3 className="text-lg font-semibold">Delete project?</h3>
                        <p className="mt-2 text-sm text-muted-foreground">This action cannot be undone. The project and all its data will be permanently removed.</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setDeleteConfirm(null)} className="rounded-lg" disabled={deleting}>Cancel</Button>
                            <Button onClick={() => handleDelete(deleteConfirm)} className="rounded-lg bg-red-500 text-white hover:bg-red-600" loading={deleting}>Delete</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function EmptyState({ onNew }: { onNew: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5">
                <Video className="size-7 text-muted-foreground/30" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">No productions yet</h3>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">Create your first video project to get started with the AI studio.</p>
            <Button onClick={onNew} className="mt-6 gap-2 rounded-xl">
                <Plus className="size-4" />
                Create your first video
            </Button>
        </div>
    )
}

function SortButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                active ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
            )}>
            {icon}
            {label}
        </button>
    )
}
