"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-0 px-4 overflow-hidden">
      {/* ── Background light rays ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-center vertical rays */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-40"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 0%, transparent 0deg, rgba(234,120,40,0.12) 10deg, transparent 20deg, rgba(234,120,40,0.08) 30deg, transparent 40deg, rgba(234,120,40,0.14) 50deg, transparent 60deg, rgba(234,120,40,0.06) 70deg, transparent 80deg, rgba(234,120,40,0.10) 90deg, transparent 100deg, rgba(234,120,40,0.12) 110deg, transparent 120deg, rgba(234,120,40,0.08) 130deg, transparent 140deg, rgba(234,120,40,0.14) 150deg, transparent 160deg, rgba(234,120,40,0.06) 170deg, transparent 180deg)",
            maskImage: "linear-gradient(to bottom, white 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 0%, transparent 100%)",
          }}
        />
        {/* Warm ambient glow top */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#EA7828]/[0.07] blur-[100px]" />
      </div>

      {/* ── Floating star decorations ── */}
      <FloatingStar className="absolute top-40 left-[12%] w-10 h-10 sm:w-14 sm:h-14 opacity-70" delay={0} />
      <FloatingStar className="absolute top-56 right-[10%] w-16 h-16 sm:w-24 sm:h-24 opacity-90" delay={0.3} />
      <FloatingStar className="absolute top-[420px] left-[8%] w-8 h-8 opacity-50 hidden lg:block" delay={0.6} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-full px-5 py-2 mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M8 0L9.2 5.8L14.4 2.4L10.2 6.8L16 8L10.2 9.2L14.4 13.6L9.2 10.2L8 16L6.8 10.2L1.6 13.6L5.8 9.2L0 8L5.8 6.8L1.6 2.4L6.8 5.8L8 0Z"
              fill="#EA7828"
            />
          </svg>
          <span className="text-white/70 text-sm font-medium">
            We are launching soon. Stay Tuned
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
        >
          Take Control Of Your
          <br />
          Financial{" "}
          <span
            className="bg-gradient-to-r from-[#EA7828] to-[#E8A04E] bg-clip-text text-transparent"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
          >
            Growth
          </span>
          <span className="inline-block ml-1 align-top">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none" className="inline -mt-2">
              <path
                d="M8 0L9.2 5.8L14.4 2.4L10.2 6.8L16 8L10.2 9.2L14.4 13.6L9.2 10.2L8 16L6.8 10.2L1.6 13.6L5.8 9.2L0 8L5.8 6.8L1.6 2.4L6.8 5.8L8 0Z"
                fill="#EA7828"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mb-10"
        >
          AI-powered money management that helps you grow savings without
          changing your lifestyle.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/explainer"
            className="relative inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm text-white overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #EA7828 0%, #D4621A 100%)",
              boxShadow:
                "0 0 24px rgba(234,120,40,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            Start Saving Today
          </Link>
          <Link
            href="/explainer"
            className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white/[0.08] transition-colors"
          >
            Watch Demo
          </Link>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Glow behind dashboard */}
          <div className="absolute -inset-8 bg-[#EA7828]/[0.08] blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute inset-x-0 -bottom-4 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

          {/* Dashboard card */}
          <div className="relative z-10 rounded-t-2xl border border-white/[0.08] bg-[#141414] overflow-hidden shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] bg-[#111]">
              {/* Logo area */}
              <div className="flex items-center gap-2 pr-4 border-r border-white/[0.06]">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-[#EA7828] to-[#D4621A]" />
                <span className="text-white/80 text-xs font-semibold">FaiPy</span>
              </div>
              {/* Nav items */}
              <div className="flex items-center gap-4 text-[10px] text-white/40">
                <span>📄</span>
                <span>⭐</span>
                <span className="text-white/60">Dashboards</span>
                <span className="text-white/40">Default</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-28 h-5 rounded-full bg-white/[0.06]" />
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-white/[0.06]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex min-h-[320px]">
              {/* Sidebar */}
              <div className="w-40 border-r border-white/[0.06] p-4 hidden sm:block">
                <p className="text-[10px] text-white/30 mb-3">Favorites &nbsp; Recently</p>
                <div className="space-y-2.5 text-[11px] text-white/50">
                  <p>› Overview</p>
                  <p>› Projects</p>
                </div>
                <p className="text-[10px] text-white/30 mt-5 mb-3">Dashboards</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-white/[0.04] rounded-md px-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EA7828]" />
                    <span className="text-[11px] text-white/70">Overview</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[11px] text-white/40">eCommerce</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[11px] text-white/40">Projects</span>
                  </div>
                </div>
                <p className="text-[10px] text-white/30 mt-5 mb-3">Pages</p>
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="text-[11px] text-white/40">User Profile</span>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white/80 text-sm font-semibold">Overview</p>
                  <span className="text-[11px] text-white/40 border border-white/[0.06] rounded px-2 py-0.5">Today ▾</span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Views", value: "7,265", change: "+11.01%", up: true },
                    { label: "Visits", value: "3,671", change: "-0.03%", up: false },
                    { label: "New Users", value: "256", change: "+15.03%", up: true },
                    { label: "Active Users", value: "2,318", change: "+6.08%", up: true },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"
                    >
                      <p className="text-[10px] text-white/40 mb-1">{stat.label}</p>
                      <p className="text-white/90 text-lg font-bold leading-none">{stat.value}</p>
                      <p className={`text-[10px] mt-1 ${stat.up ? "text-green-400" : "text-red-400"}`}>
                        {stat.change} ↗
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-[11px] text-white/50 mb-3">
                      <span className="text-white/70 font-medium">Total Users</span>
                      &nbsp;&nbsp;Total Projects&nbsp;&nbsp;Operating Status
                    </p>
                    {/* Fake chart */}
                    <div className="h-24 relative">
                      <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                        <path
                          d="M0 60 C50 55 100 40 150 45 C200 50 250 20 300 30 C350 40 380 15 400 20"
                          stroke="#EA7828"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M0 60 C50 55 100 40 150 45 C200 50 250 20 300 30 C350 40 380 15 400 20 L400 80 L0 80Z"
                          fill="url(#chartGrad)"
                          opacity="0.15"
                        />
                        <path
                          d="M0 65 C80 60 160 50 240 55 C320 60 360 45 400 50"
                          stroke="white"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          opacity="0.15"
                          fill="none"
                        />
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EA7828" />
                            <stop offset="100%" stopColor="#EA7828" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Right panel - Traffic */}
                  <div className="w-36 hidden lg:block">
                    <p className="text-[11px] text-white/70 font-medium mb-3">Traffic by Website</p>
                    <div className="space-y-2 text-[10px] text-white/40">
                      <div className="flex items-center justify-between">
                        <span>Google</span>
                        <div className="w-12 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="w-3/4 h-full bg-[#EA7828] rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>YouTube</span>
                        <div className="w-12 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="w-1/2 h-full bg-[#EA7828]/60 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications panel */}
              <div className="w-44 border-l border-white/[0.06] p-4 hidden xl:block">
                <p className="text-[11px] text-white/70 font-medium mb-3">Notifications</p>
                <div className="space-y-3">
                  {[
                    { icon: "🐛", text: "You fixed a bug.", time: "Just now" },
                    { icon: "👤", text: "New user registered.", time: "59 minutes ago" },
                    { icon: "🐛", text: "You fixed a bug.", time: "12 hours ago" },
                    { icon: "🔔", text: "Andi Lane subscribed.", time: "Today, 11:59 AM" },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs">{n.icon}</span>
                      <div>
                        <p className="text-[10px] text-white/60 leading-tight">{n.text}</p>
                        <p className="text-[9px] text-white/30">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-white/70 font-medium mt-5 mb-3">Activities</p>
                <div className="space-y-3">
                  {[
                    { icon: "🎨", text: "Changed the style.", time: "Just now" },
                    { icon: "🚀", text: "Released a new version.", time: "59 minutes ago" },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs">{a.icon}</span>
                      <div>
                        <p className="text-[10px] text-white/60 leading-tight">{a.text}</p>
                        <p className="text-[9px] text-white/30">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Floating 3D-style star decoration ── */
function FloatingStar({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-full h-full"
        animate={{ rotate: [0, 8, -8, 0], y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <defs>
          <linearGradient id={`starGrad-${delay}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#EA7828" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        {/* 4-pointed star */}
        <path
          d="M32 4 L38 26 L60 32 L38 38 L32 60 L26 38 L4 32 L26 26 Z"
          fill={`url(#starGrad-${delay})`}
        />
        {/* Highlight */}
        <path
          d="M32 4 L38 26 L60 32 L38 38 L32 60 L26 38 L4 32 L26 26 Z"
          fill="white"
          opacity="0.15"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        />
      </motion.svg>
    </motion.div>
  );
}
