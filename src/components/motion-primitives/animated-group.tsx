'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

interface AnimatedGroupProps {
    children: React.ReactNode
    className?: string
    variants?: {
        container?: Variants
        item?: Variants
    }
}

export function AnimatedGroup({ children, className, variants }: AnimatedGroupProps) {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                ...(variants?.container?.visible as Record<string, unknown>)?.transition as Record<string, unknown>,
            },
        },
        ...variants?.container,
    }

    const itemVariants: Variants = variants?.item ?? {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring' as const, bounce: 0.3, duration: 1 },
        },
    }

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {React.Children.map(children, (child, i) => (
                <motion.div key={i} variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    )
}
