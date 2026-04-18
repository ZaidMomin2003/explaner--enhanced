export function SparkleIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 0C32 0 38 26 32 32C26 38 0 32 0 32C0 32 26 26 32 32C38 38 64 32 64 32C64 32 38 38 32 32C26 26 32 64 32 64C32 64 26 38 32 32C38 26 32 0 32 0Z"
        fill="#A3E635"
      />
    </svg>
  );
}

export function StarBurst({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 8-pointed star */}
      <path
        d="M40 0L44.5 30.5L64 8L49.5 35.5L80 40L49.5 44.5L64 72L44.5 49.5L40 80L35.5 49.5L16 72L30.5 44.5L0 40L30.5 35.5L16 8L35.5 30.5L40 0Z"
        fill="#A3E635"
      />
    </svg>
  );
}
