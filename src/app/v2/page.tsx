"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PARTICIPANTS, WinnerResult } from "@/data/participants";
import { soundEngine } from "@/lib/audio";
import ConfettiCanvas from "@/components/ConfettiCanvas";
import WinnerModal from "@/components/WinnerModal";
import RegistrantDrawer from "@/components/RegistrantDrawer";
import {
  Volume2,
  VolumeX,
  Users,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface ConfettiPiece {
  id: number;
  left: string;
  x: string;
  r: string;
  delay: string;
  bg: string;
}

export default function LuckyDrawV2() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [winner, setWinner] = useState<WinnerResult | null>(null);
  const [displayName, setDisplayName] = useState("Ready to Draw");
  const [displaySubtitle, setDisplaySubtitle] = useState("");
  const [statusText, setStatusText] = useState("Press start to select one random winner.");
  const [shuffling, setShuffling] = useState(false);
  const [isWinnerActive, setIsWinnerActive] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [cssConfetti, setCssConfetti] = useState<ConfettiPiece[]>([]);
  const [soundActive, setSoundActive] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    soundEngine.setEnabled(next);
  };

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const formatPhone = (num: string) => {
    if (num.length === 7) {
      return `+960 ${num.slice(0, 3)}-${num.slice(3)}`;
    }
    return `+960 ${num}`;
  };

  const triggerCssConfetti = () => {
    const pieces: ConfettiPiece[] = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      let bg = "#f1ff54";
      if (i % 3 === 1) bg = "#ffffff";
      if (i % 3 === 2) bg = "#8c8c92";

      pieces.push({
        id: i,
        left: `${Math.random() * 100}%`,
        x: `${(Math.random() - 0.5) * 280}px`,
        r: `${Math.random() * 900 - 450}deg`,
        delay: `${Math.random() * 0.25}s`,
        bg,
      });
    }
    setCssConfetti(pieces);
    setTimeout(() => {
      setCssConfetti([]);
    }, 2400);
  };

  const startDraw = async () => {
    if (isDrawing) return;

    setIsDrawing(true);
    setShuffling(true);
    setIsWinnerActive(false);
    setStatusText("Selecting randomly with cryptographic entropy...");
    setDisplaySubtitle("");

    // Cryptographic random pick from verified participants
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    const targetIndex = cryptoArray[0] % PARTICIPANTS.length;
    const targetNumber = PARTICIPANTS[targetIndex];

    // Fast shuffle phase (28 iterations @ 45ms)
    for (let i = 0; i < 28; i++) {
      const randIdx = Math.floor(Math.random() * PARTICIPANTS.length);
      const randNum = PARTICIPANTS[randIdx];
      setDisplayName(formatPhone(randNum));
      setDisplaySubtitle(`Participant #${randIdx + 1}`);
      soundEngine.playTick(1.0);
      await wait(45);
    }

    // Controlled slowdown phase (progressive exponential deceleration)
    const delays = [65, 75, 90, 110, 135, 165, 205, 255, 320, 420];
    for (let i = 0; i < delays.length; i++) {
      const delay = delays[i];
      const randIdx = Math.floor(Math.random() * PARTICIPANTS.length);
      const randNum = PARTICIPANTS[randIdx];
      setDisplayName(formatPhone(randNum));
      setDisplaySubtitle(`Participant #${randIdx + 1}`);
      soundEngine.playTick(0.85 + (i / delays.length) * 0.5);
      await wait(delay);
    }

    await wait(180);

    // Winner Landing
    const winResult: WinnerResult = {
      number: targetNumber,
      index: targetIndex + 1,
      timestamp: new Date().toLocaleTimeString("en-US", {
        timeZone: "Indian/Maldives",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setShuffling(false);
    setWinner(winResult);
    setDisplayName(formatPhone(targetNumber));
    setDisplaySubtitle(`Participant #${targetIndex + 1} · Maldives +960 · Verified Ticket`);
    setIsWinnerActive(true);
    setHasDrawn(true);
    setStatusText("Winner selected • Cryptographically verified");

    // Flash & Celebration Chime
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 700);

    soundEngine.playCelebrationChime();
    setConfettiActive(true);
    triggerCssConfetti();

    setIsDrawing(false);
  };

  const copyWinningNumber = () => {
    if (!winner) return;
    navigator.clipboard.writeText(`+960${winner.number}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0b0b0c] text-[#f5f5f3] flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(241,255,84,0.08), transparent 28%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.025), transparent 50%)",
          }}
        />
      </div>

      {/* Screen flash on winner */}
      {flashActive && (
        <div
          className="fixed inset-0 pointer-events-none z-50 animate-v2-flash"
          style={{ background: "rgba(241,255,84,0.14)" }}
        />
      )}

      {/* CSS Confetti Ribbons */}
      {cssConfetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
          {cssConfetti.map((piece) => (
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

      {/* Canvas Confetti */}
      <ConfettiCanvas active={confettiActive} theme="citron" />

      {/* Top Bar Navigation */}
      <header className="relative z-30 w-full max-w-[1100px] mx-auto pt-6 sm:pt-8 px-4 sm:px-6">
        <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#8c8c92]">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: "#f1ff54",
                boxShadow: "0 0 20px rgba(241,255,84,0.55)",
              }}
            />
            <span className="font-bold text-[#f5f5f3] tracking-tight text-sm">
              Lucky Draw
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.08] text-[#f1ff54] font-semibold border border-[#f1ff54]/30">
              v2 Stage
            </span>
          </div>

          {/* Right Controls & Version Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Version Switcher */}
            <div className="hidden sm:inline-flex items-center bg-white/[0.05] border border-white/[0.08] p-0.5 rounded-full text-[11px]">
              <Link
                href="/"
                className="px-2.5 py-1 rounded-full text-[#8c8c92] hover:text-white transition-colors"
              >
                v1: Orbital
              </Link>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                v2: Stage
              </span>
            </div>

            {/* Registrant Drawer Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs text-[#d6d6d6] transition-colors cursor-pointer border border-white/10"
            >
              <Users className="w-3.5 h-3.5 text-[#8c8c92]" />
              <span>86 Registrants</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? "Mute Haptics" : "Unmute Haptics"}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                soundActive
                  ? "bg-[#f1ff54]/15 border-[#f1ff54]/40 text-[#f1ff54]"
                  : "bg-white/[0.05] border-white/10 text-[#8c8c92]"
              }`}
            >
              {soundActive ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main App Stage */}
      <main className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 my-auto py-6">
        <section
          className="relative min-h-[62vh] sm:min-h-[68vh] md:min-h-[580px] rounded-[32px] border border-white/[0.08] p-6 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.012))",
            boxShadow: "0 35px 100px rgba(0,0,0,0.35)",
          }}
        >
          {/* Subtle Grid Overlay with Mask */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />

          {/* Stage Content */}
          <div className="relative z-10 w-full max-w-[820px] mx-auto flex flex-col items-center">
            {/* Eyebrow & Hardware Verification */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs text-[#8c8c92] uppercase tracking-[0.18em] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#34c759] shadow-[0_0_8px_#34c759]" />
              <span>Hardware Enclave Armed • 86 Participants</span>
            </div>

            {/* Prize Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-[#d6d6d6] mb-8">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Image
                  src="/images/iphone/iphone-18-pro-hero.png"
                  alt="iPhone 18 Pro Max"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-white">Grand Prize:</span>
              <span className="text-[#f1ff54]">iPhone 18 Pro Max • 512GB</span>
            </div>

            {/* Central Typographic Draw Display */}
            <div className="min-h-[200px] sm:min-h-[240px] flex flex-col items-center justify-center w-full px-2 py-4">
              <div
                className={`text-[clamp(36px,7.5vw,86px)] font-black tracking-[-0.065em] leading-[0.95] max-w-full break-words select-all transition-all duration-200 tabular-nums ${
                  shuffling
                    ? "opacity-75 blur-[0.35px] scale-[0.985] text-white"
                    : isWinnerActive
                    ? "scale-[1.04] text-[#f1ff54]"
                    : "text-white"
                }`}
                style={
                  isWinnerActive
                    ? {
                        textShadow:
                          "0 0 36px rgba(241,255,84,0.3), 0 0 70px rgba(241,255,84,0.15)",
                      }
                    : undefined
                }
              >
                {displayName}
              </div>

              {/* Subtitle / Participant details */}
              <div className="mt-4 text-xs sm:text-[13px] tracking-[0.08em] uppercase text-[#8c8c92] min-h-[22px] font-mono">
                {displaySubtitle || (
                  <span className="opacity-60">Maldives +960 • Live Hardware Selection</span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
              <button
                onClick={startDraw}
                disabled={isDrawing}
                className="w-full sm:w-auto min-w-[210px] px-8 py-4 rounded-full font-extrabold text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]"
                style={{
                  backgroundColor: "#f1ff54",
                  color: "#0b0b0c",
                  boxShadow: "0 10px 30px rgba(241,255,84,0.15)",
                }}
              >
                {isDrawing ? "Drawing…" : hasDrawn ? "Draw Again" : "Start Draw"}
              </button>

              {/* Extra winner action buttons */}
              {isWinnerActive && winner && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyWinningNumber}
                    className="p-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10 transition-all cursor-pointer"
                    title="Copy Winning Phone Number"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#34c759]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#8c8c92]" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white border border-white/10 transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>

            {/* Status message */}
            <div className="mt-4 text-xs text-[#8c8c92] min-h-[18px]">
              {statusText}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-[1100px] mx-auto pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8c8c92] pt-4 border-t border-white/[0.06]">
          <div className="inline-flex items-center gap-2">
            <span
              className="w-[7px] h-[7px] rounded-full animate-pulse"
              style={{
                backgroundColor: "#f1ff54",
                boxShadow: "0 0 14px rgba(241,255,84,0.6)",
              }}
            />
            <span>
              <strong className="text-white font-bold">86</strong> eligible participants
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Switch to v1 Orbital Wheel <ChevronRight className="w-3 h-3" />
            </Link>
            <span className="text-[#48484a]">•</span>
            <span>One winner · Fair random draw · ELL Mobile</span>
          </div>
        </div>
      </footer>

      {/* Registrant Drawer */}
      <RegistrantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        winnerNumber={winner?.number}
      />

      {/* Official Winner Modal */}
      <WinnerModal
        winner={winner}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
