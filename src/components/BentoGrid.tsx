import React from "react";
import { Cpu, Volume2, ShieldCheck, Sparkles } from "lucide-react";

export default function BentoGrid() {
  return (
    <section id="highlights" className="max-w-[1024px] mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="mb-14">
        <div className="text-xs sm:text-sm font-semibold text-[#a1a1a6] uppercase tracking-[0.08em] mb-2">
          Get the highlights.
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-titanium-gradient leading-[1.08]">
          Built to shatter expectations.
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Tile 1: Grand Prize */}
        <article className="md:col-span-8 bg-[#101012] border border-white/[0.12] hover:border-white/[0.25] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e5c158] mb-3">
              <Sparkles className="w-4 h-4 text-[#e5c158]" />
              <span>Launch Day Grand Prize</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
              iPhone 18 Pro Max • 512GB
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] leading-relaxed max-w-xl">
              A monolithic Grade 5 titanium enclosure enveloping the fastest neural processing engine
              ever conceived. Paired with a complimentary official MagSafe ecosystem and 12-month
              AppleCare+ courtesy of ELL Mobile.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-titanium-gradient tabular-nums">
              Natural Titanium
            </div>
            <div className="text-xs sm:text-sm text-[#86868b] mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34c759] inline-block" />
              Pre-configured with official Maldivian eSIM profile readiness.
            </div>
          </div>
        </article>

        {/* Tile 2: Candidate Pool */}
        <article className="md:col-span-4 bg-[#101012] border border-white/[0.12] hover:border-white/[0.25] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#a1a1a6] mb-3">
              Candidate Pool
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
              86 Entries
            </h3>
            <p className="text-sm text-[#86868b] leading-relaxed">
              Selected exclusively from the first 200 registered inquiries who fulfilled pre-launch
              qualification standards.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm text-[#86868b] mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34c759]" />
              Uniform cryptographically seeded RNG distribution.
            </div>
          </div>
        </article>

        {/* Tile 3: A20 Pro Chip */}
        <article className="md:col-span-6 bg-[#101012] border border-white/[0.12] hover:border-white/[0.25] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#a1a1a6]">
              Processing Power
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#2997ff]">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">
            A20 Pro Chip. Beyond Pro.
          </h3>
          <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
            Groundbreaking 2-nanometer architecture driving real-time ray-traced reflections, on-device
            generative intelligence, and unprecedented thermal efficiency.
          </p>
        </article>

        {/* Tile 4: Acoustic Engineering */}
        <article className="md:col-span-6 bg-[#101012] border border-white/[0.12] hover:border-white/[0.25] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#a1a1a6]">
              Acoustic Engineering
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#e5c158]">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">
            Bespoke Haptic Audio Engine.
          </h3>
          <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
            Utilizes zero-dependency native Web Audio synthesis to generate mechanical haptic ticks
            during the shuffle sequence, culminating in an Apple-tuned harmonic chime.
          </p>
        </article>
      </div>
    </section>
  );
}
