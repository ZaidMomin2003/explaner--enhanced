'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { SocialButtons } from '@/components/auth/SocialButtons'
import { Divider } from '@/components/auth/Divider'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
    const { signIn, user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!authLoading && user) {
            router.replace('/dashboard')
        }
    }, [user, authLoading, router])

    if (authLoading || user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signIn(email, password)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to sign in'
            if (message.includes('invalid-credential') || message.includes('wrong-password') || message.includes('user-not-found')) {
                setError('Invalid email or password')
            } else if (message.includes('too-many-requests')) {
                setError('Too many attempts. Please try again later')
            } else {
                setError('Something went wrong. Please try again')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <div className="rounded-2xl border border-border/50 bg-background/80 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">Sign in to your account to continue</p>
                </div>

                <SocialButtons />
                <Divider />

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="h-11 w-full rounded-xl border border-border/50 bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="h-11 w-full rounded-xl border border-border/50 bg-white/5 px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="h-11 w-full rounded-xl text-sm font-medium" loading={loading}>
                        Sign in
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}
