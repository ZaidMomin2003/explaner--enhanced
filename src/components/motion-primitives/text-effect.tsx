'use client'

import { motion, type Variants } from 'framer-motion'

const presetVariants: Record<string, { container: Variants; item: Variants }> = {
    'fade-in-blur': {
        container: {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: 0.05,
                },
            },
        },
        item: {
            hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
            visible: {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: { type: 'spring' as const, bounce: 0.3, duration: 1.5 },
            },
        },
    },
}

interface TextEffectProps {
    children: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
    preset?: string
    per?: 'word' | 'line' | 'char'
    className?: string
    speedSegment?: number
    delay?: number
}

export function TextEffect({
    children,
    as: Tag = 'p',
    preset = 'fade-in-blur',
    per = 'word',
    className,
    speedSegment = 0.05,
    delay = 0,
}: TextEffectProps) {
    const variants = presetVariants[preset] ?? presetVariants['fade-in-blur']

    const splitText = (): string[] => {
        if (per === 'line') return children.split('\n')
        if (per === 'char') return children.split('')
        return children.split(' ')
    }

    const segments = splitText()
    const MotionTag = motion.create(Tag)

    return (
        <MotionTag
            className={className}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: speedSegment,
                        delayChildren: delay,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {segments.map((segment, i) => (
                <motion.span key={i} variants={variants.item} className="inline-block">
                    {segment}
                    {per === 'word' && i < segments.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </MotionTag>
    )
}
