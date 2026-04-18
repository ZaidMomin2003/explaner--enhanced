import Link from "next/link";

export function GenerateHeader() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
    >
      {/* Red circle logo mark */}
      <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <span className="text-lg font-bold text-gray-900 tracking-tight">
        SaasStudio
      </span>
    </Link>
  );
}
