import Link from 'next/link'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-3xl px-6 py-24">
                <Link href="/" className="text-muted-foreground hover:text-foreground text-sm duration-150">← Back to home</Link>

                <h1 className="mt-8 text-4xl font-bold">Terms &amp; Conditions</h1>
                <p className="text-muted-foreground mt-2 text-sm">Last Updated: March 24, 2026</p>

                <div className="mt-12 space-y-10 text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold">1. Introduction</h2>
                        <p className="mt-3 text-muted-foreground">
                            These Terms &amp; Conditions govern your use of saasvideo.online. By accessing or using our platform, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">2. Services</h2>
                        <p className="mt-3 text-muted-foreground">
                            saasvideo.online provides AI-powered video generation services for SaaS products. Generating previews is free. You only pay the specified flat fee to export and download the final video file without watermarks.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
                        <p className="mt-3 text-muted-foreground">
                            Upon full payment and download of a video file, you are granted a full, commercial, royalty-free license to use that specific video. You retain all ownership rights to the assets (URLs, text, screenshots) you upload to our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">4. User Responsibilities</h2>
                        <p className="mt-3 text-muted-foreground">
                            You are responsible for ensuring that you have the rights to any content, URLs, or assets you provide to our AI engine. You agree not to use saasvideo.online for any unlawful or prohibited purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">5. Contact</h2>
                        <p className="mt-3 text-muted-foreground">
                            If you have any questions regarding these terms, please contact us at{' '}
                            <a href="mailto:hello@saasvideo.online" className="text-primary hover:underline">hello@saasvideo.online</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
