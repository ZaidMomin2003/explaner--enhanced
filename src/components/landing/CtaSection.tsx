import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-12 sm:p-16 text-center relative overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#A3E635]/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#A3E635]/20 rounded-br-2xl" />

          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-4 relative z-10">
            Stop Waiting.
            <br />
            Start Shipping.
          </h2>
          <p className="text-white/40 text-base mb-8 max-w-md mx-auto relative z-10">
            The era of manual keyframes is over. Get started for free and join
            124+ founders already building their dream explainers.
          </p>
          <Link
            href="/explainer"
            className="inline-flex items-center gap-2 bg-[#A3E635] text-black font-bold px-8 py-4 rounded-xl text-sm hover:bg-[#bef264] transition-colors relative z-10"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-4 mt-4 relative z-10">
            <span className="text-[#A3E635] text-[10px] font-semibold uppercase tracking-widest">
              Founding Member Deal
            </span>
            <span className="text-white/20 text-[10px] uppercase tracking-widest">
              Instant Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
