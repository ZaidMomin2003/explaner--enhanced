'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Settings, Download, CreditCard, LogOut, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TourModal } from './TourModal'

export function UserDropdown() {
    const { user, signOut } = useAuth()
    const [open, setOpen] = useState(false)
    const [tourOpen, setTourOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    if (!user) return null

    const initial = (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
    const displayName = user.displayName || user.email?.split('@')[0] || 'User'

    return (
        <>
            <div ref={ref} className="relative flex items-center gap-3">
                <button
                    onClick={() => setTourOpen(true)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground duration-150">
                    <HelpCircle className="size-4" />
                    <span className="hidden sm:inline">Tour</span>
                </button>

                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3 rounded-full border border-border/50 bg-white/5 py-1.5 pl-1.5 pr-4 transition-colors hover:bg-white/10">
                    <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                        {initial}
                    </div>
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium leading-tight">{displayName}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">Studio Pro</p>
                    </div>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border/50 bg-background shadow-2xl shadow-black/30">

                            <div className="border-b border-border/30 px-5 py-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                    Authenticated as
                                </p>
                                <p className="mt-1 truncate text-sm font-medium">{user.email}</p>
                            </div>

                            <div className="py-2">
                                <DropdownLink href="/dashboard/settings" icon={<Settings className="size-5" />} label="Studio Settings" onClick={() => setOpen(false)} />
                                <DropdownLink href="/dashboard/exports" icon={<Download className="size-5" />} label="Project Exports" onClick={() => setOpen(false)} />
                                <DropdownLink href="/dashboard/billing" icon={<CreditCard className="size-5" />} label="Billing Portal" onClick={() => setOpen(false)} />
                            </div>

                            <div className="border-t border-border/30 py-2">
                                <button
                                    onClick={() => { setOpen(false); signOut() }}
                                    className="flex w-full items-center gap-3 px-5 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10">
                                    <LogOut className="size-5" />
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <TourModal open={tourOpen} onClose={() => setTourOpen(false)} />
        </>
    )
}

function DropdownLink({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 px-5 py-3 text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-foreground">
            {icon}
            {label}
        </Link>
    )
}
