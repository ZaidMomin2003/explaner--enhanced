export function FirebaseFull({ className, height, width }: { className?: string; height?: number; width?: number }) {
  return (
    <svg className={className} height={height} width={width} viewBox="0 0 500 80" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="60" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="72" fontWeight="700" letterSpacing="-1">
        Firebase
      </text>
    </svg>
  )
}
