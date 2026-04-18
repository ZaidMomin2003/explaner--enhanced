import { SparkleIcon } from "./SparkleIcon";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SparkleIcon className="w-5 h-5" />
              <span className="text-white font-semibold">SaaSVideo</span>
            </div>
            <p className="text-white/30 text-sm max-w-xs">
              The generative motion engine for world-class SaaS explainers.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                Product
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="text-white/30 text-sm hover:text-white/60 transition-colors cursor-pointer">
                    About Us
                  </span>
                </li>
                <li>
                  <span className="text-white/30 text-sm hover:text-white/60 transition-colors cursor-pointer">
                    Roadmap
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                Legal
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="text-white/30 text-sm hover:text-white/60 transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-white/30 text-sm hover:text-white/60 transition-colors cursor-pointer">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <span className="text-white/40 text-xs uppercase tracking-widest">
                Live Status
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span className="text-[#A3E635] text-xs font-semibold uppercase">
                Rendering
              </span>
            </div>
            <p className="text-white/20 text-xs mt-1">99.9% Uptime</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 SaaSVideo.online · Secure Payments via Dodo Payments
          </p>
          <p className="text-white/15 text-xs">SSL Encrypted</p>
        </div>
      </div>
    </footer>
  );
}
