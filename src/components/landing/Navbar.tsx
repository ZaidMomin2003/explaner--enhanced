"use client";

import Link from "next/link";
import { SparkleIcon } from "./SparkleIcon";

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export function Navbar({ onScrollTo }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto bg-[#1a1a1a]/90 backdrop-blur-xl rounded-full border border-white/[0.06] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SparkleIcon className="w-5 h-5" />
          <span className="text-white font-semibold text-sm">SaaSVideo</span>
        </div>

        <div className="hidden sm:flex items-center gap-8">
          <button
            onClick={() => onScrollTo("about")}
            className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => onScrollTo("services")}
            className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => onScrollTo("process")}
            className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => onScrollTo("pricing")}
            className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </div>

        <Link
          href="/explainer"
          className="bg-[#A3E635] text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#bef264] transition-colors"
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}
