import Link from 'next/link'

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-3xl px-6 py-24">
                <Link href="/" className="text-muted-foreground hover:text-foreground text-sm duration-150">← Back to home</Link>

                <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>
                <p className="text-muted-foreground mt-2 text-sm">Last Updated: March 24, 2026</p>

                <div className="mt-12 space-y-10 text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                        <p className="mt-3 text-muted-foreground">
                            When you use saasvideo.online, we collect information you provide, such as your email address when you create an account, and any data (URLs, screenshots, or text prompts) you input into our AI Director to generate videos. We also collect usage data to improve application performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
                        <p className="mt-3 text-muted-foreground">
                            We use your data solely to generate the videos you request. Your inputs are sent to our AI models strictly for the purpose of script and layout generation. We do not sell your personal data or user-generated content to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">3. Third-Party Services</h2>
                        <p className="mt-3 text-muted-foreground">
                            We use reliable third-party providers for authentication and payments (such as Firebase Auth and Dodo Payments). These services have their own privacy policies. We do not store full credit card details on our servers at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">4. Data Security &amp; Storage</h2>
                        <p className="mt-3 text-muted-foreground">
                            We employ industry-standard security measures to protect your account and the rendering pipeline. Videos you generate are stored securely for you to re-download if necessary. You may request account deletion at any time via your Profile dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">5. Contact</h2>
                        <p className="mt-3 text-muted-foreground">
                            For questions or concerns about how your data is handled, please contact our privacy team at{' '}
                            <a href="mailto:hello@saasvideo.online" className="text-primary hover:underline">hello@saasvideo.online</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
