"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WinnerResult } from "@/data/participants";
import { Trophy, Copy, Check, X, Sparkles } from "lucide-react";

interface WinnerModalProps {
  winner: WinnerResult | null;
  onClose: () => void;
}

export default function WinnerModal({ winner, onClose }: WinnerModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!winner) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`+960${winner.number}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <aside
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 w-screen h-screen bg-black/85 backdrop-blur-[35px] z-[10000] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-b from-[#1c1c22]/98 to-[#0a0a0e]/98 border border-[#e5c158]/40 rounded-[38px] p-6 sm:p-10 max-w-[560px] w-full text-center shadow-[0_50px_140px_rgba(0,0,0,0.95),0_0_80px_rgba(229,193,88,0.25)] animate-winner-spring"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 flex items-center justify-center text-[#86868b] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Kicker Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#e5c158]/15 border border-[#e5c158]/40 text-[#e5c158] rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
          <Trophy className="w-3.5 h-3.5" />
          <span>Official Winner Confirmed</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          Congratulations.
        </h2>

        <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed mb-5 max-w-sm mx-auto">
          You have been selected as the official winner of the brand-new iPhone 18 Pro Max courtesy of ELL Mobile.
        </p>

        {/* Official iPhone 18 Pro Prize Showcase */}
        <div className="relative w-full max-w-[260px] h-[140px] mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#e5c158]/10 rounded-full blur-2xl pointer-events-none" />
          <Image
            src="/images/iphone/iphone-18-pro-hero.png"
            alt="iPhone 18 Pro Max"
            width={280}
            height={140}
            className="object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
            priority
          />
        </div>

        <div className="text-[11px] font-medium tracking-wide text-[#e5c158] flex items-center justify-center gap-1 mb-4">
          <Sparkles className="w-3 h-3 text-[#e5c158]" />
          <span>Grand Prize: iPhone 18 Pro Max • 512GB Natural Titanium</span>
        </div>

        {/* Winner Display Container */}
        <div className="bg-[#040406]/90 border border-white/[0.16] rounded-2xl p-4 sm:p-5 mb-6 shadow-inner">
          <div className="text-[10px] tracking-widest text-[#86868b] uppercase mb-0.5">
            Winning Mobile Number
          </div>
          <div className="font-mono text-3xl sm:text-5xl font-extrabold tracking-wider text-gold-gradient drop-shadow-[0_0_30px_rgba(229,193,88,0.5)] tabular-nums mb-1">
            +960 {winner.number}
          </div>
          <div className="text-[11px] text-[#6e6e73] font-mono tracking-tight">
            Verified Registration Ticket #{winner.index} of 86 • {winner.timestamp}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={copyToClipboard}
            className="w-full sm:w-auto bg-white hover:bg-[#f5f5f7] active:scale-[0.98] text-black px-6 py-3 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-[#34c759]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Winner Number"}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-white/[0.08] hover:bg-white/[0.16] text-[#f5f5f7] px-7 py-3 rounded-full text-xs sm:text-sm font-medium border border-white/10 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </aside>
  );
}
