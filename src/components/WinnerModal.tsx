"use client";
import React, { useState, useEffect } from "react";
import { WinnerResult } from "@/data/participants";
import { Trophy, Copy, Check, X } from "lucide-react";

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
      className="fixed inset-0 w-screen h-screen bg-black/85 backdrop-blur-[35px] z-[10000] flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-b from-[#1e1e24]/95 to-[#0e0e12]/98 border border-[#e5c158]/40 rounded-[38px] p-8 sm:p-14 max-w-[580px] w-full text-center shadow-[0_50px_140px_rgba(0,0,0,0.95),0_0_80px_rgba(229,193,88,0.3)] animate-winner-spring"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 flex items-center justify-center text-[#86868b] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Kicker Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e5c158]/15 border border-[#e5c158]/40 text-[#e5c158] rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
          <Trophy className="w-3.5 h-3.5" />
          <span>Official Winner Confirmed</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Congratulations.
        </h2>

        <p className="text-sm sm:text-base text-[#86868b] leading-relaxed mb-8 max-w-md mx-auto">
          You have been selected as the proud winner of the brand-new iPhone 18 Pro Max from ELL Mobile.
        </p>

        {/* Winner Display Container */}
        <div className="bg-[#040406]/90 border border-white/[0.16] rounded-3xl p-6 sm:p-8 mb-8 shadow-inner">
          <div className="text-[11px] tracking-widest text-[#86868b] uppercase mb-1">
            Winning Mobile Number
          </div>
          <div className="font-mono text-4xl sm:text-6xl font-extrabold tracking-wider text-gold-gradient drop-shadow-[0_0_35px_rgba(229,193,88,0.5)] tabular-nums mb-2">
            +960 {winner.number}
          </div>
          <div className="text-xs text-[#6e6e73] font-mono tracking-tight">
            Verified Registration Ticket #{winner.index} of 86 • {winner.timestamp}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={copyToClipboard}
            className="w-full sm:w-auto bg-white hover:bg-[#f5f5f7] active:scale-[0.98] text-black px-7 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-[#34c759]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Winner Number"}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-white/[0.08] hover:bg-white/[0.16] text-[#f5f5f7] px-8 py-3.5 rounded-full text-sm font-medium border border-white/10 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </aside>
  );
}
