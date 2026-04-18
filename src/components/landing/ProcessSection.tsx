import { SparkleIcon } from "./SparkleIcon";

const STEPS = [
  {
    num: "01",
    title: "Upload your Vibe",
    description:
      "Drag and drop your screenshots and logos. No complex setup needed.",
  },
  {
    num: "02",
    title: "AI Takes the Wheel",
    description:
      "Director AI writes the script, selects layouts, and generates motion graphics.",
  },
  {
    num: "03",
    title: "Preview & Iterate",
    description:
      "Watch the full video for free. Ask for unlimited AI tweaks at no cost.",
  },
  {
    num: "04",
    title: "Export in 4K",
    description:
      "Pay $29 only when you're ready to download your Hollywood-grade render.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-[#A3E635] text-xs uppercase tracking-widest font-semibold mb-4">
              ★ Ready For Launch
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
              Link to video in
              <br />
              3 simple clicks.
            </h2>
          </div>
          <SparkleIcon className="w-12 h-12 hidden sm:block" />
        </div>

        <p className="text-white/40 text-base mb-16 max-w-lg">
          We've abstracted away the timeline, the keyframes, and the rendering
          so you can focus purely on your product's message.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-[#141414] border border-white/[0.06] rounded-2xl p-8 hover:border-[#A3E635]/20 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#A3E635] font-mono text-sm font-bold bg-[#A3E635]/10 px-2.5 py-1 rounded-md">
                  {step.num}
                </span>
                <h3 className="text-white text-lg font-semibold group-hover:text-[#A3E635] transition-colors">
                  {step.title}
                </h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
