'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Globe, Music, Mic, Waves, Sparkles, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NewVideoModalProps {
    open: boolean
    onClose: () => void
    onCreate?: (project: { name: string; url: string; music: boolean; speech: boolean; sfx: boolean; instructions: string; logo: File | null }) => void
}

export function NewVideoModal({ open, onClose, onCreate }: NewVideoModalProps) {
    const [projectName, setProjectName] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [instructions, setInstructions] = useState('')
    const [music, setMusic] = useState(true)
    const [speech, setSpeech] = useState(true)
    const [sfx, setSfx] = useState(false)
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    const removeLogo = () => {
        setLogoFile(null)
        setLogoPreview(null)
        if (fileRef.current) fileRef.current.value = ''
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreate?.({ name: projectName, url: websiteUrl, music, speech, sfx, instructions, logo: logoFile })
        setProjectName('')
        setWebsiteUrl('')
        setInstructions('')
        setMusic(true)
        setSpeech(true)
        setSfx(false)
        removeLogo()
        onClose()
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl shadow-black/40">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                                    <Sparkles className="size-4 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold">New Video</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex size-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white">
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                {/* Project Name + URL row */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-white/50">Project Name</label>
                                        <input
                                            type="text"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            placeholder="My SaaS Explainer"
                                            required
                                            className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-white/50">Website URL</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/25" />
                                            <input
                                                type="url"
                                                value={websiteUrl}
                                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                                placeholder="https://yourapp.com"
                                                required
                                                className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-white/50">Audio Options</label>
                                    <div className="flex gap-2">
                                        <Toggle active={music} onClick={() => setMusic(!music)} icon={<Music className="size-3.5" />} label="Music" />
                                        <Toggle active={speech} onClick={() => setSpeech(!speech)} icon={<Mic className="size-3.5" />} label="Speech" />
                                        <Toggle active={sfx} onClick={() => setSfx(!sfx)} icon={<Waves className="size-3.5" />} label="SFX" />
                                    </div>
                                </div>

                                {/* Logo Upload */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-white/50">Logo (optional)</label>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                    />
                                    {logoPreview ? (
                                        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                                            <img src={logoPreview} alt="Logo preview" className="size-10 rounded-md object-contain" />
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate text-sm font-medium">{logoFile?.name}</p>
                                                <p className="text-[11px] text-white/30">{logoFile && (logoFile.size / 1024).toFixed(1)}KB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeLogo}
                                                className="text-white/30 hover:text-red-400 transition-colors">
                                                <X className="size-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] py-4 text-sm text-white/30 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white/50">
                                            <Upload className="size-4" />
                                            Upload logo
                                        </button>
                                    )}
                                </div>

                                {/* Instructions */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-white/50">Custom Instructions (optional)</label>
                                    <textarea
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        placeholder="e.g. Focus on the pricing page, use a professional tone, keep it under 60 seconds..."
                                        rows={3}
                                        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex items-center justify-end gap-3">
                                <Button type="button" variant="ghost" onClick={onClose} className="rounded-lg text-white/50">
                                    Cancel
                                </Button>
                                <Button type="submit" className="gap-2 rounded-lg px-6" disabled={!projectName || !websiteUrl}>
                                    <Sparkles className="size-3.5" />
                                    Generate
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function Toggle({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-medium transition-all ${
                active
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-white/10 bg-white/[0.02] text-white/30 hover:border-white/15 hover:text-white/50'
            }`}>
            {icon}
            {label}
        </button>
    )
}
