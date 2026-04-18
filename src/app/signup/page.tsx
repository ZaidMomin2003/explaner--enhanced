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

export default function SignupPage() {
    const { signUp, user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [name, setName] = useState('')
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
            await signUp(email, password, name)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to create account'
            if (message.includes('email-already-in-use')) {
                setError('An account with this email already exists')
            } else if (message.includes('weak-password')) {
                setError('Password should be at least 6 characters')
            } else if (message.includes('invalid-email')) {
                setError('Please enter a valid email address')
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
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">Start creating explainer videos for free</p>
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
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                            Full name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="h-11 w-full rounded-xl border border-border/50 bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>

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
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                                required
                                minLength={8}
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
                        Create account
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Sign in
                    </Link>
                </p>

                <p className="mt-4 text-center text-xs text-muted-foreground/60">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="hover:text-muted-foreground underline">Terms</Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" className="hover:text-muted-foreground underline">Privacy Policy</Link>
                </p>
            </div>
        </AuthLayout>
    )
}
