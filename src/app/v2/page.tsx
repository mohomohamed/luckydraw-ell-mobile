"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PARTICIPANTS } from "@/data/participants";
import { soundEngine } from "@/lib/audio";
import RegistrantDrawer from "@/components/RegistrantDrawer";
import { Volume2, VolumeX } from "lucide-react";

interface ConfettiPiece {
  id: number;
  left: string;
  x: string;
  r: string;
  delay: string;
  bg: string;
}

export default function LuckyDrawV2() {
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [displayName, setDisplayName] = useState("Ready to Draw");
  const [participantText, setParticipantText] = useState("");
  const [statusText, setStatusText] = useState("Press start to select one random winner.");
  const [isShuffling, setIsShuffling] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [winningNumber, setWinningNumber] = useState<string | null>(null);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setEnabled(next);
  };

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const formatNumber = (num: string) => {
    if (num.length === 7) {
      return `+960 ${num.slice(0, 3)} ${num.slice(3)}`;
    }
    return `+960 ${num}`;
  };

  const triggerConfetti = () => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 42; i++) {
      let bg = "#f1ff54";
      if (i % 3 === 1) bg = "#ffffff";
      if (i % 3 === 2) bg = "#8c8c92";

      pieces.push({
        id: i,
        left: `${Math.random() * 100}%`,
        x: `${(Math.random() - 0.5) * 260}px`,
        r: `${Math.random() * 900 - 450}deg`,
        delay: `${Math.random() * 0.25}s`,
        bg,
      });
    }
    setConfettiPieces(pieces);
    setTimeout(() => {
      setConfettiPieces([]);
    }, 2200);
  };

  const drawWinner = async () => {
    if (drawing) return;

    setDrawing(true);
    setIsWinner(false);
    setIsShuffling(true);
    setStatusText("Selecting randomly…");
    setParticipantText("");

    // Crypto random pick
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    const targetIdx = cryptoArray[0] % PARTICIPANTS.length;
    const targetNum = PARTICIPANTS[targetIdx];

    // Fast shuffle (28 ticks @ 45ms)
    for (let i = 0; i < 28; i++) {
      const randIdx = Math.floor(Math.random() * PARTICIPANTS.length);
      setDisplayName(formatNumber(PARTICIPANTS[randIdx]));
      soundEngine.playTick(1.0);
      await wait(45);
    }

    // Controlled slowdown curve matching mockup
    const delays = [65, 75, 90, 110, 135, 165, 205, 255, 320, 420];
    for (let i = 0; i < delays.length; i++) {
      const randIdx = Math.floor(Math.random() * PARTICIPANTS.length);
      setDisplayName(formatNumber(PARTICIPANTS[randIdx]));
      soundEngine.playTick(0.85 + (i / delays.length) * 0.45);
      await wait(delays[i]);
    }

    await wait(180);

    // Final winner announcement
    setIsShuffling(false);
    setWinningNumber(targetNum);
    setDisplayName(formatNumber(targetNum));
    setParticipantText(`Participant #${String(targetIdx + 1).padStart(2, "0")}`);
    setIsWinner(true);
    setHasDrawn(true);
    setStatusText("Winner selected · Tap number to copy");

    // Flash & celebration
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 650);

    soundEngine.playCelebrationChime();
    triggerConfetti();

    setDrawing(false);
  };

  const copyNumber = () => {
    if (!winningNumber) return;
    navigator.clipboard.writeText(`+960${winningNumber}`).then(() => {
      setStatusText(`Copied +960${winningNumber} to clipboard`);
      setTimeout(() => {
        setStatusText("Winner selected · Tap number to copy");
      }, 2500);
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-[#f5f5f3] flex flex-col justify-between items-center p-4 sm:p-7 relative select-none font-sans overflow-x-hidden">
      {/* Background ambient lighting */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(241,255,84,.08), transparent 28%), radial-gradient(circle at 50% 50%, rgba(255,255,255,.025), transparent 50%)",
        }}
      />

      {/* Screen flash on winner */}
      {flashActive && (
        <div
          className="fixed inset-0 pointer-events-none z-50 animate-v2-flash"
          style={{ background: "rgba(241,255,84,.12)" }}
        />
      )}

      {/* 42-piece confetti strips matching mockup */}
      {confettiPieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="absolute -top-5 w-2 h-4 rounded-[2px] animate-v2-confetti"
              style={
                {
                  left: piece.left,
                  backgroundColor: piece.bg,
                  "--x": piece.x,
                  "--r": piece.r,
                  animationDelay: piece.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[1100px] relative z-10 flex flex-col justify-between min-h-[calc(100vh-3.5rem)]">
        {/* Topbar */}
        <header className="flex items-center justify-between text-[13px] text-[#8c8c92] mb-5">
          <div className="flex items-center gap-2.5 font-[750] text-[#f5f5f3] tracking-[-0.02em]">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: "#f1ff54",
                boxShadow: "0 0 20px rgba(241,255,84,.45)",
              }}
            />
            <span>Lucky Draw</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <button
              onClick={() => setDrawerOpen(true)}
              className="hover:text-[#f5f5f3] transition-colors cursor-pointer"
            >
              86 Registrants
            </button>
            <span className="text-white/10">•</span>
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute sound" : "Unmute sound"}
              className="hover:text-[#f5f5f3] transition-colors cursor-pointer flex items-center gap-1"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
            <span className="text-white/10">•</span>
            <Link
              href="/"
              className="text-[#8c8c92] hover:text-[#f1ff54] transition-colors"
            >
              v1: Orbital
            </Link>
          </div>
        </header>

        {/* Central Stage */}
        <section
          className="relative min-h-[min(72vh,700px)] rounded-[32px] border border-white/[0.08] p-7 sm:p-12 md:p-16 flex items-center justify-center overflow-hidden my-auto"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,.025), rgba(255,255,255,.012))",
            boxShadow: "0 35px 100px rgba(0,0,0,.35)",
          }}
        >
          {/* 48px Grid Overlay with soft vertical mask */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />

          {/* Stage Content */}
          <div className="w-full max-w-[820px] text-center relative z-10">
            {/* Eyebrow */}
            <div className="text-xs uppercase tracking-[0.18em] text-[#8c8c92] mb-[18px]">
              86 Participants
            </div>

            {/* Typographic Draw Display */}
            <div className="min-h-[240px] flex items-center justify-center p-4 sm:p-7 relative">
              <div>
                <div
                  onClick={isWinner ? copyNumber : undefined}
                  className={`text-[clamp(44px,8vw,92px)] leading-[0.95] font-black tracking-[-0.065em] max-w-full break-words transition-all duration-[180ms] ${
                    isShuffling
                      ? "opacity-75 blur-[0.35px] scale-[0.985] text-[#f5f5f3]"
                      : isWinner
                      ? "scale-[1.04] text-[#f1ff54] cursor-pointer"
                      : "text-[#f5f5f3]"
                  }`}
                  style={
                    isWinner
                      ? {
                          textShadow: "0 0 36px rgba(241,255,84,.12)",
                        }
                      : undefined
                  }
                  title={isWinner ? "Click to copy" : undefined}
                >
                  {displayName}
                </div>
                <div className="mt-[18px] text-[13px] tracking-[0.08em] uppercase text-[#8c8c92] min-h-[18px] font-mono">
                  {participantText}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-[34px] flex justify-center">
              <button
                onClick={drawWinner}
                disabled={drawing}
                className="border-0 min-w-[210px] rounded-full px-7 py-4 font-[850] text-[15px] tracking-[-0.01em] cursor-pointer transition-all duration-[180ms] disabled:opacity-45 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]"
                style={{
                  backgroundColor: "#f1ff54",
                  color: "#0b0b0c",
                  boxShadow: "0 10px 30px rgba(241,255,84,.08)",
                }}
              >
                {drawing ? "Drawing…" : hasDrawn ? "Draw Again" : "Start Draw"}
              </button>
            </div>

            {/* Status */}
            <div className="mt-4 text-xs text-[#8c8c92] min-h-[18px]">
              {statusText}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-[18px] text-xs text-[#8c8c92]">
          <div className="inline-flex items-center gap-2">
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{
                backgroundColor: "#f1ff54",
                boxShadow: "0 0 14px rgba(241,255,84,.6)",
              }}
            />
            <span>
              <strong className="text-[#f5f5f3] font-bold">86</strong> eligible participants
            </span>
          </div>
          <div>One winner · fair random draw</div>
        </footer>
      </div>

      {/* Registrant Drawer */}
      <RegistrantDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        winnerNumber={winningNumber}
      />
    </div>
  );
}
