import { SparkleIcon } from "./SparkleIcon";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-8">
              Turning Ideas Into
              <br />
              Masterpieces
            </h2>

            {/* Placeholder visual card */}
            <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/[0.06] aspect-[4/3] flex items-end">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4">
                <SparkleIcon className="w-8 h-8" />
              </div>
              <div className="absolute top-4 right-4">
                <SparkleIcon className="w-6 h-6 opacity-50" />
              </div>

              {/* Abstract visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-white/[0.06]" />
                <div className="absolute w-24 h-24 rounded-full border-2 border-[#A3E635]/20" />
                <div className="absolute w-16 h-16 rounded-full bg-[#A3E635]/10" />
              </div>

              {/* Bottom label */}
              <div className="relative z-10 m-4 bg-[#A3E635] text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                A Creative Design Agency
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:pt-16">
            <p className="text-white/50 text-base leading-relaxed mb-8">
              We may be a compact team, but our creativity knows no bounds. By
              staying agile and working hand-in-hand with our clients, we
              transform ideas into cutting-edge designs that make a lasting
              impression.
            </p>

            {/* Visual placeholder with decorative ring */}
            <div className="relative bg-[#141414] rounded-2xl border border-white/[0.06] aspect-[3/2] flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 200 200"
                className="w-40 h-40 opacity-30"
                fill="none"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#A3E635"
                  strokeWidth="1"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="#A3E635"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
                <circle cx="100" cy="100" r="4" fill="#A3E635" />
              </svg>
              {/* Small green accent box */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#A3E635] rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
