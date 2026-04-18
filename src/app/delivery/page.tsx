import Link from 'next/link'

export default function DeliveryPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-3xl px-6 py-24">
                <Link href="/" className="text-muted-foreground hover:text-foreground text-sm duration-150">← Back to home</Link>

                <h1 className="mt-8 text-4xl font-bold">Service Delivery Policy</h1>
                <p className="text-muted-foreground mt-2 text-sm">Last Updated: March 24, 2026</p>

                <div className="mt-12 space-y-10 text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold">1. Service Overview</h2>
                        <p className="mt-3 text-muted-foreground">
                            saasvideo.online delivers AI-generated SaaS explainer videos as digital files. All services are provided electronically through our web platform. No physical goods are shipped or delivered.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">2. Delivery Method</h2>
                        <p className="mt-3 text-muted-foreground">
                            Upon successful payment of the one-time render fee ($29), your final video is rendered in 4K Ultra-HD MP4 format using our cloud rendering pipeline powered by Remotion and AWS Lambda. The download link is made available directly on your dashboard once rendering is complete.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">3. Delivery Timeline</h2>
                        <p className="mt-3 text-muted-foreground">
                            Most videos are rendered and ready for download within 10 minutes of payment confirmation. In rare cases of high server load, rendering may take up to 30 minutes. You will be notified when your video is ready.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">4. Re-Downloads</h2>
                        <p className="mt-3 text-muted-foreground">
                            All rendered videos remain available for re-download from your account dashboard. There is no expiration on download access as long as your account is active.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">5. Refund &amp; Support</h2>
                        <p className="mt-3 text-muted-foreground">
                            Since all editing and previewing is free before payment, refunds are generally not applicable. If you experience a technical issue with rendering, please contact us at{' '}
                            <a href="mailto:hello@saasvideo.online" className="text-primary hover:underline">hello@saasvideo.online</a>{' '}
                            and we will re-render your video at no additional cost.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
