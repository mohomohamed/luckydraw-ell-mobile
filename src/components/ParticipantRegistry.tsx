"use client";
import React, { useState, useEffect, useRef } from "react";
import { PARTICIPANTS, WinnerResult } from "@/data/participants";
import { Search, CheckCircle2, Trophy } from "lucide-react";

interface ParticipantRegistryProps {
  winner: WinnerResult | null;
}

export default function ParticipantRegistry({ winner }: ParticipantRegistryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const winnerChipRef = useRef<HTMLDivElement | null>(null);

  const filteredParticipants = PARTICIPANTS.map((num, idx) => ({
    number: num,
    index: idx + 1,
  })).filter((p) => p.number.includes(searchQuery.trim()));

  useEffect(() => {
    if (winner && winnerChipRef.current) {
      winnerChipRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [winner]);

  return (
    <section id="pool" className="max-w-[1024px] mx-auto px-6 py-20">
      <div className="bg-[#101012] border border-white/[0.12] rounded-[32px] p-6 sm:p-10 backdrop-blur-xl">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Participant Registry
              </h3>
              <span className="text-[11px] bg-white/[0.08] text-[#a1a1a6] px-2.5 py-0.5 rounded-full font-mono">
                86 Total
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#86868b]">
              All 86 pre-qualified Maldivian candidate mobile numbers
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search number (+960)..."
              className="bg-black/60 border border-white/[0.12] focus:border-white/[0.35] text-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-2xl outline-none w-full sm:w-[280px] transition-colors placeholder:text-[#6e6e73]"
            />
          </div>
        </div>

        {/* Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[340px] overflow-y-auto pr-2">
          {filteredParticipants.map(({ number, index }) => {
            const isWinner = winner?.number === number;
            return (
              <div
                key={`${number}-${index}`}
                ref={isWinner ? winnerChipRef : null}
                className={`py-2.5 px-3 rounded-xl text-center font-mono text-xs sm:text-sm tabular-nums border transition-all duration-300 flex items-center justify-between ${
                  isWinner
                    ? "bg-[#e5c158]/20 border-[#e5c158]/70 text-[#e5c158] font-bold shadow-[0_0_20px_rgba(229,193,88,0.35)] scale-105"
                    : "bg-white/[0.04] border-white/[0.06] text-[#a1a1a6] hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="text-[10px] text-[#6e6e73] font-sans">#{index}</span>
                <span className="tracking-wider">{number}</span>
                {isWinner ? (
                  <Trophy className="w-3.5 h-3.5 text-[#e5c158] animate-bounce" />
                ) : (
                  <CheckCircle2 className="w-3 h-3 text-[#34c759]/40" />
                )}
              </div>
            );
          })}
        </div>

        {filteredParticipants.length === 0 && (
          <div className="py-12 text-center text-xs text-[#86868b]">
            No participants matched &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </section>
  );
}
