'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/logo'
import { UserDropdown } from '@/components/dashboard/UserDropdown'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Save, AlertTriangle, ShieldCheck } from 'lucide-react'

export default function SettingsPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [saving, setSaving] = useState(false)

    const isGoogleUser = user?.providerData?.[0]?.providerId === 'google.com'
    const isGithubUser = user?.providerData?.[0]?.providerId === 'github.com'
    const isOAuthUser = isGoogleUser || isGithubUser
    const providerLabel = isGoogleUser ? 'Google' : isGithubUser ? 'GitHub' : ''

    useEffect(() => {
        if (!loading && !user) router.replace('/login')
    }, [user, loading, router])

    useEffect(() => {
        if (user) {
            setFullName(user.displayName || '')
            setEmail(user.email || '')
        }
    }, [user])

    if (loading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
            </div>
        )
    }

    const handleSave = async () => {
        setSaving(true)
        // Firebase updateProfile will go here
        setTimeout(() => setSaving(false), 1000)
    }

    const handleDeleteAccount = () => {
        // Firebase delete account will go here
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
                    <h1 className="text-2xl font-bold italic">Profile Settings</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage your personal information and security.</p>
                </div>

                {/* General Information */}
                <div className="rounded-xl border border-border/50 p-6">
                    <h2 className="text-lg font-semibold italic">General Information</h2>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="h-11 w-full rounded-lg border border-border/50 bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="h-11 w-full rounded-lg border border-border/50 bg-white/5 px-4 text-sm text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
                            />
                            {isOAuthUser && (
                                <p className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground/60">
                                    Syncing via {providerLabel}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button onClick={handleSave} loading={saving} className="gap-2 rounded-lg">
                            <Save className="size-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Security */}
                <div className="mt-6 rounded-xl border border-border/50 p-6">
                    <h2 className="text-lg font-semibold italic">Security</h2>

                    {isOAuthUser ? (
                        <div className="mt-6 flex flex-col items-center gap-3 py-4 text-center sm:flex-row sm:text-left">
                            <div className="flex-1">
                                <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                                    {providerLabel} Protected
                                </span>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    You are logged in via {providerLabel}. Manage your password in your {providerLabel} Account.
                                </p>
                            </div>
                            <ShieldCheck className="size-10 text-emerald-400/30" />
                        </div>
                    ) : (
                        <div className="mt-6">
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Minimum 8 characters"
                                className="h-11 w-full max-w-sm rounded-lg border border-border/50 bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                            <div className="mt-4">
                                <Button variant="outline" className="rounded-lg" disabled={newPassword.length < 8}>
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Danger Zone */}
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-400" />
                        <div>
                            <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Permanently delete your account and all associated projects. This action is irreversible.
                            </p>
                            <Button
                                variant="outline"
                                onClick={handleDeleteAccount}
                                className="mt-4 rounded-lg border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
