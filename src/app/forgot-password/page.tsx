'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { ArrowLeft, Mail } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await resetPassword(email)
            setSubmitted(true)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to send reset email'
            if (message.includes('user-not-found')) {
                setError('No account found with this email')
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
                {!submitted ? (
                    <>
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold">Reset your password</h1>
                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Enter your email and we&apos;ll send you a link to reset your password
                            </p>
                        </div>

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

                            <Button type="submit" className="h-11 w-full rounded-xl text-sm font-medium" loading={loading}>
                                Send reset link
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="size-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold">Check your email</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            We&apos;ve sent a password reset link to{' '}
                            <span className="font-medium text-foreground">{email}</span>
                        </p>
                        <p className="mt-4 text-xs text-muted-foreground/60">
                            Didn&apos;t receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-primary hover:underline">
                                try again
                            </button>
                        </p>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground duration-150">
                        <ArrowLeft className="size-3.5" />
                        Back to sign in
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}
