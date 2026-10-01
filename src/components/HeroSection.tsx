"use client";
import React, { useState } from "react";
import { ArrowDown, Users, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  currentDisplayNumber?: string;
  isDrawing?: boolean;
}

type FinishKey = "Natural Titanium" | "Desert Titanium" | "White Titanium" | "Black Titanium";

const FINISH_CONFIGS: Record<
  FinishKey,
  {
    dotColor: string;
    borderColor: string;
    glowShadow: string;
    ambientBg: string;
  }
> = {
  "Natural Titanium": {
    dotColor: "#9c958d",
    borderColor: "#36363d",
    glowShadow: "0 0 90px rgba(197, 169, 142, 0.25)",
    ambientBg: "rgba(156, 149, 141, 0.15)",
  },
  "Desert Titanium": {
    dotColor: "#c5a98e",
    borderColor: "#4a3f35",
    glowShadow: "0 0 90px rgba(229, 193, 88, 0.3)",
    ambientBg: "rgba(197, 169, 142, 0.18)",
  },
  "White Titanium": {
    dotColor: "#e2e4e1",
    borderColor: "#525258",
    glowShadow: "0 0 90px rgba(255, 255, 255, 0.25)",
    ambientBg: "rgba(226, 228, 225, 0.12)",
  },
  "Black Titanium": {
    dotColor: "#3b3a3e",
    borderColor: "#222225",
    glowShadow: "0 0 90px rgba(80, 80, 95, 0.35)",
    ambientBg: "rgba(59, 58, 62, 0.2)",
  },
};

export default function HeroSection({
  currentDisplayNumber = "777••••",
  isDrawing = false,
}: HeroSectionProps) {
  const [selectedFinish, setSelectedFinish] = useState<FinishKey>("Natural Titanium");
  const config = FINISH_CONFIGS[selectedFinish];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Ribbon Banner */}
      <aside className="bg-[#1d1d1f] py-3 px-4 text-center text-[13px] text-[#86868b] border-b border-white/[0.08]">
        Official ELL Mobile Launch Event • Malé, Maldives. Verified pool of 86 customers.{" "}
        <button
          onClick={() => scrollTo("draw")}
          className="text-[#2997ff] hover:underline cursor-pointer font-medium ml-1 inline-flex items-center gap-1"
        >
          Go straight to live draw &rarr;
        </button>
      </aside>

      {/* Cinematic Hero */}
      <header
        id="hero"
        className="relative min-h-[94vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 overflow-hidden bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(135,120,105,0.22),transparent_75%),radial-gradient(circle_at_50%_60%,rgba(30,30,35,0.25),transparent_70%)]"
      >
        {/* Ambient Finish Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[120px] pointer-events-none transition-all duration-700"
          style={{ background: config.ambientBg }}
        />

        {/* Eyebrow */}
        <div className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-[#a1a1a6] mb-2 uppercase tracking-[0.08em]">
          ELL Mobile Exclusive Event
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-[-0.04em] leading-[1.02] mb-2 text-titanium-gradient">
          iPhone 18 Pro
        </h1>

        {/* Subheadline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-gold-gradient mb-5">
          Forged in titanium.
        </h2>

        {/* Tagline */}
        <p className="max-w-[700px] text-base sm:text-lg md:text-xl text-[#86868b] leading-relaxed mx-auto mb-9">
          A breathtaking fusion of Grade 5 titanium, the paradigm-shifting A20 Pro neural engine,
          and a 48MP Fusion quad-prism telephoto array. One registered Maldivian customer is about
          to claim the future today.
        </p>

        {/* Hero CTA Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 z-10">
          <button
            onClick={() => scrollTo("draw")}
            className="bg-white hover:bg-[#f5f5f7] active:scale-[0.98] text-black px-7 py-3.5 rounded-full text-base font-medium flex items-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.28)] transition-all"
          >
            <span>Go to Selection Stage</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => scrollTo("pool")}
            className="bg-white/[0.08] hover:bg-white/[0.14] active:scale-[0.98] text-[#f5f5f7] px-6 py-3.5 rounded-full text-base font-normal border border-white/[0.14] backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#a1a1a6]" />
            <span>View 86 Registrants</span>
          </button>
        </div>

        {/* Finish Selector */}
        <div className="flex flex-col items-center gap-3 z-10">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/[0.08]">
            {(Object.keys(FINISH_CONFIGS) as FinishKey[]).map((finish) => {
              const active = selectedFinish === finish;
              return (
                <button
                  key={finish}
                  onClick={() => setSelectedFinish(finish)}
                  title={finish}
                  aria-label={finish}
                  className={`w-6 h-6 rounded-full relative cursor-pointer transition-transform duration-200 ${
                    active ? "scale-110" : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: FINISH_CONFIGS[finish].dotColor,
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.6)",
                  }}
                >
                  {active && (
                    <span className="absolute -inset-1 rounded-full border-2 border-[#0071e3]" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-[#86868b] tracking-wide font-normal">
            {selectedFinish} finish
          </div>
        </div>

        {/* Hardware Chassis Device Stage */}
        <div className="mt-12 w-full max-w-[440px] sm:max-w-[480px] relative z-10 animate-float">
          <div
            className="relative w-full aspect-[9/17.8] max-h-[500px] mx-auto rounded-[54px] bg-[#08080a] border-[4px] p-5 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden"
            style={{
              borderColor: config.borderColor,
              boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.15), 0 40px 100px -20px rgba(0, 0, 0, 0.95), ${config.glowShadow}`,
            }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-3.5 w-28 h-7 bg-black rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.25)] z-20 flex items-center justify-between px-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  isDrawing ? "bg-[#ff9f0a] shadow-[0_0_8px_#ff9f0a] animate-ping" : "bg-[#34c759] shadow-[0_0_8px_#34c759]"
                }`}
              />
              <span className="text-[9px] font-semibold text-[#a1a1a6] tracking-wider uppercase">
                {isDrawing ? "Shuffling" : "Draw Active"}
              </span>
            </div>

            {/* Inner Screen Card */}
            <div className="w-full h-full rounded-[42px] bg-[radial-gradient(circle_at_center,rgba(38,38,48,0.45)_0%,rgba(6,6,8,0.98)_75%)] flex flex-col items-center justify-center p-6 border border-white/[0.06] text-center relative overflow-hidden">
              <div className="text-[11px] tracking-[0.14em] text-[#9999a0] uppercase font-semibold mb-3">
                Verified Maldives Pool
              </div>

              <div className="font-mono text-3xl sm:text-4xl font-bold tracking-widest text-titanium-gradient mb-3 tabular-nums drop-shadow-md">
                {currentDisplayNumber}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e5c158]/15 border border-[#e5c158]/40 rounded-full text-[#e5c158] text-[11px] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Hardware Enclave Armed</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
