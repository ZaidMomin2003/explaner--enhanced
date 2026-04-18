"use client";

export function MarqueeText() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-6 mx-6">
            <span className="text-5xl sm:text-7xl font-bold text-white italic">
              Innovate
            </span>
            <span className="text-[#A3E635] text-4xl sm:text-6xl">+</span>
            <span className="text-5xl sm:text-7xl font-bold text-white/20 italic">
              Inspire
            </span>
            <span className="text-[#A3E635] text-4xl sm:text-6xl">+</span>
            <span className="text-5xl sm:text-7xl font-bold text-white italic">
              Create
            </span>
            <span className="text-[#A3E635] text-4xl sm:text-6xl">+</span>
          </div>
        ))}
      </div>
    </section>
  );
}
