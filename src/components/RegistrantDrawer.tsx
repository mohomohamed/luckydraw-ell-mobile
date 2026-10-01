"use client";
import React, { useState } from "react";
import { PARTICIPANTS } from "@/data/participants";
import { X, Search, CheckCircle2, ShieldCheck } from "lucide-react";

interface RegistrantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  winnerNumber?: string | null;
}

export default function RegistrantDrawer({
  isOpen,
  onClose,
  winnerNumber,
}: RegistrantDrawerProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = PARTICIPANTS.map((num, idx) => ({
    num,
    idx: idx + 1,
  })).filter((item) => item.num.includes(query.trim()));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#101014] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-semibold text-white">Verified Registrants</h3>
              <p className="text-xs text-[#86868b] flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34c759]" />
                86 Pre-qualified Maldivian numbers
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#86868b] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative my-4">
            <Search className="w-4 h-4 text-[#86868b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by number..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-[#6e6e73] outline-none focus:border-white/30"
            />
          </div>

          {/* Scroll List */}
          <div className="grid grid-cols-2 gap-2 max-h-[65vh] overflow-y-auto pr-1">
            {filtered.map(({ num, idx }) => {
              const isWinner = winnerNumber === num;
              return (
                <div
                  key={`${num}-${idx}`}
                  className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                    isWinner
                      ? "bg-[#e5c158]/20 border-[#e5c158] text-[#e5c158] font-bold"
                      : "bg-white/[0.03] border-white/[0.06] text-[#a1a1a6]"
                  }`}
                >
                  <span className="text-[#6e6e73] font-sans">#{idx}</span>
                  <span>+960 {num}</span>
                  {isWinner ? (
                    <span className="text-[10px] bg-[#e5c158] text-black font-bold px-1 rounded">WIN</span>
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-[#34c759]/40" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-[#6e6e73] pt-4 border-t border-white/10 text-center">
          Cryptographically verified by ELL Mobile • Malé, Maldives
        </div>
      </div>
    </div>
  );
}
