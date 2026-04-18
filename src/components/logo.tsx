import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 text-xl font-bold tracking-tight text-foreground", className)}>
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#logoGrad)"/>
        <path d="M12 14L20 28L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="12" r="2.5" fill="white"/>
      </svg>
      SaaSVideo
    </span>
  )
}
