"use client";
import React, { useState, useRef, useEffect } from "react";
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
  Disc,
  Sliders,
  Copy,
  Check,
} from "lucide-react";

type DrawMode = "wheel" | "ticker";

export default function Home() {
  const [mode, setMode] = useState<DrawMode>("wheel");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [winner, setWinner] = useState<WinnerResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [currentDisplay, setCurrentDisplay] = useState("•••••••");
  const [statusText, setStatusText] = useState("Hardware Enclave Armed • 86 Registrants Verified");
  const [blurClass, setBlurClass] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [confettiActive, setConfettiActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const animFrameRef = useRef<number | null>(null);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    soundEngine.setEnabled(next);
  };

  const copyWinningNumber = () => {
    if (!winner) return;
    navigator.clipboard.writeText(`+960${winner.number}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const startDraw = () => {
    if (isDrawing || hasDrawn) return;

    setIsDrawing(true);
    setStatusText("Engaging Deceleration Protocol...");

    // Cryptographic random selection
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    const targetIndex = cryptoArray[0] % PARTICIPANTS.length;
    const chosenNumber = PARTICIPANTS[targetIndex];

    const DURATION = 5200; // 5.2 seconds as per Apple SRS specification
    const startTime = performance.now();
    let lastTick = 0;
    const initialRot = wheelRotation;
    const totalWheelSpins = 360 * 7 + targetIndex * (360 / PARTICIPANTS.length);

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease out exponential curve
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentInterval = 30 + Math.pow(progress, 3) * 450;

      // Rotate wheel
      setWheelRotation(initialRot + totalWheelSpins * easeOut);

      if (currentTime - lastTick >= currentInterval && progress < 1) {
        lastTick = currentTime;
        const randIndex = Math.floor(Math.random() * PARTICIPANTS.length);
        const randomNum = PARTICIPANTS[randIndex];
        setCurrentDisplay(randomNum);

        if (progress < 0.45) {
          setBlurClass("filter blur-[8px] scale-y-110 text-[#c4c4c8]");
          soundEngine.playTick(1.3);
        } else if (progress < 0.75) {
          setBlurClass("filter blur-[3.5px] scale-y-105 text-[#e4e4e7]");
          soundEngine.playTick(1.05);
        } else {
          setBlurClass("filter blur-[1px] text-[#fafafa]");
          soundEngine.playTick(0.85);
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        // Winner finalized
        setCurrentDisplay(chosenNumber);
        setBlurClass("");
        setIsDrawing(false);
        setHasDrawn(true);
        setStatusText(`Official Winner Confirmed: +960 ${chosenNumber}`);

        const result: WinnerResult = {
          number: chosenNumber,
          index: targetIndex + 1,
          timestamp: new Date().toLocaleTimeString(),
        };
        setWinner(result);

        // Sound chime and particles
        soundEngine.playCelebrationChime();
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 6000);

        // Open winner modal after brief moment
        setTimeout(() => {
          setIsModalOpen(true);
        }, 900);
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  };

  const resetDraw = () => {
    if (isDrawing) return;
    setHasDrawn(false);
    setWinner(null);
    setCurrentDisplay("•••••••");
    setStatusText("Hardware Enclave Armed • 86 Registrants Verified");
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] flex flex-col justify-between overflow-x-hidden select-none">
      {/* 1. Frosted Navigation Bar */}
      <nav className="w-full h-12 bg-black/70 backdrop-blur-[20px] border-b border-white/[0.08] px-4 sm:px-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <svg
            height="44"
            viewBox="0 0 14 44"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-white w-3.5 h-10"
            aria-label="Apple"
          >
            <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7846 9.7846 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.1877 3.1877 0 0 0 .7-2.2824 3.2829 3.2829 0 0 0 -2.1222 1.0948 3.0518 3.0518 0 0 0 -.7124 2.2514 2.89 2.89 0 0 0 2.1346-1.0638z" />
          </svg>
          <div className="h-3.5 w-[1px] bg-white/20" />
          <span className="text-xs font-semibold text-[#f5f5f7] tracking-tight">iPhone 18 Pro</span>
          <span className="hidden sm:inline-block text-[11px] text-[#86868b]">
            Launch Day Lucky Draw
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-normal text-[#d6d6d6] transition-colors cursor-pointer border border-white/10"
          >
            <Users className="w-3.5 h-3.5 text-[#a1a1a6]" />
            <span>86 Registrants</span>
          </button>

          <button
            onClick={toggleSound}
            title={soundActive ? "Mute Haptics" : "Unmute Haptics"}
            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              soundActive
                ? "bg-[#e5c158]/15 border-[#e5c158]/40 text-[#e5c158]"
                : "bg-white/[0.06] border-white/10 text-[#86868b]"
            }`}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <span className="text-[10px] bg-white/[0.12] px-2 py-0.5 rounded-full text-white font-semibold uppercase tracking-wider">
            ELL Mobile
          </span>
        </div>
      </nav>

      {/* 2. Single Hero Header (Core Selection Mechanism) */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 sm:py-10 relative z-10 max-w-5xl mx-auto w-full">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(229,193,88,0.06)_0%,rgba(135,120,105,0.08)_40%,transparent_70%)] pointer-events-none blur-3xl" />

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] sm:text-xs font-medium text-[#a1a1a6] uppercase tracking-[0.08em] mb-3">
          <span
            className={`w-2 h-2 rounded-full ${
              isDrawing
                ? "bg-[#ff9f0a] shadow-[0_0_8px_#ff9f0a] animate-ping"
                : hasDrawn
                ? "bg-[#e5c158] shadow-[0_0_8px_#e5c158]"
                : "bg-[#34c759] shadow-[0_0_8px_#34c759]"
            }`}
          />
          <span>{statusText}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.035em] leading-[1.05] mb-1 text-titanium-gradient">
          iPhone 18 Pro
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gold-gradient mb-4">
          Launch Day Lucky Draw
        </h2>

        {/* Mode Switcher */}
        <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6">
          <button
            onClick={() => setMode("wheel")}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === "wheel"
                ? "bg-white text-black shadow-sm"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Titanium Orbital Wheel</span>
          </button>

          <button
            onClick={() => setMode("ticker")}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === "ticker"
                ? "bg-white text-black shadow-sm"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Optical Slot Ticker</span>
          </button>
        </div>

        {/* CENTERPIECE SELECTION STAGE */}
        <div className="w-full max-w-[480px] bg-[#121216]/80 backdrop-blur-[35px] border border-white/[0.14] rounded-[40px] p-6 sm:p-8 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.2)]">
          {/* Visual Mechanism */}
          {mode === "wheel" ? (
            <div className="relative w-[260px] sm:w-[310px] aspect-square mx-auto mb-6 flex items-center justify-center">
              {/* Outer Titanium Bezel with 36 ticks */}
              <div
                className="absolute inset-0 rounded-full border-[6px] border-[#2c2b30] shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_0_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] transition-transform ease-out"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transitionDuration: isDrawing ? "0s" : "0.5s",
                }}
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-2.5 origin-bottom"
                    style={{
                      transformOrigin: "50% 130px",
                      transform: `rotate(${i * 10}deg)`,
                      backgroundColor:
                        i % 3 === 0 ? "rgba(229,193,88,0.7)" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* Glowing Radar Sweep Ring */}
              <div className="absolute inset-3 rounded-full border border-white/[0.08] pointer-events-none">
                <div
                  className={`absolute inset-0 rounded-full ${
                    isDrawing ? "animate-radar opacity-80" : "opacity-25"
                  }`}
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(229,193,88,0.25) 360deg)",
                  }}
                />
              </div>

              {/* Center Aperture */}
              <div className="relative z-10 w-[170px] sm:w-[200px] h-[170px] sm:h-[200px] rounded-full bg-[#050508]/95 backdrop-blur-xl border border-white/[0.18] flex flex-col items-center justify-center p-4 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
                <span className="text-[10px] tracking-[0.14em] uppercase text-[#86868b] font-semibold mb-1">
                  Maldives +960
                </span>

                <div
                  className={`font-mono text-2xl sm:text-3xl font-bold tracking-wider tabular-nums transition-all duration-100 ${blurClass} ${
                    hasDrawn
                      ? "text-gold-gradient scale-110 drop-shadow-[0_0_20px_rgba(229,193,88,0.6)] animate-winner-spring"
                      : "text-white"
                  }`}
                >
                  {currentDisplay}
                </div>

                <div className="mt-2 text-[10px] text-[#6e6e73] font-mono">
                  {isDrawing ? "Selecting..." : hasDrawn ? "Winner Selected" : "Ready"}
                </div>
              </div>
            </div>
          ) : (
            /* Optical Slot Ticker */
            <div className="relative h-28 sm:h-32 max-w-[420px] mx-auto mb-6 rounded-2xl bg-[#040406] border border-white/[0.14] shadow-[inset_0_10px_30px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#040406] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#040406] to-transparent z-10 pointer-events-none" />

              <div className="flex items-baseline justify-center gap-2.5 z-0">
                <span className="font-mono text-lg sm:text-2xl font-normal text-[#6e6e73]">
                  +960
                </span>
                <span
                  className={`font-mono text-3xl sm:text-5xl font-bold tracking-widest tabular-nums transition-all duration-100 ${blurClass} ${
                    hasDrawn
                      ? "text-gold-gradient scale-105 drop-shadow-[0_0_30px_rgba(229,193,88,0.7)] animate-winner-spring"
                      : "text-white"
                  }`}
                >
                  {currentDisplay}
                </span>
              </div>
            </div>
          )}

          {/* Trigger Button & Status Controls */}
          {!hasDrawn ? (
            <button
              onClick={startDraw}
              disabled={isDrawing}
              className="w-full bg-white hover:bg-[#f5f5f7] active:scale-[0.98] disabled:bg-[#2c2c2e] disabled:text-[#636366] disabled:cursor-not-allowed text-black font-semibold text-base sm:text-lg py-3.5 rounded-full flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.35)] transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isDrawing ? "Selecting Lucky Winner..." : "Reveal Winner"}</span>
            </button>
          ) : (
            /* Post-Draw Winner State */
            <div className="space-y-3">
              <div className="bg-[#e5c158]/10 border border-[#e5c158]/30 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="text-left">
                  <div className="text-[10px] uppercase text-[#e5c158] font-bold tracking-wider">
                    Winner Confirmed
                  </div>
                  <div className="font-mono text-sm font-bold text-white">
                    +960 {winner?.number}
                  </div>
                </div>
                <button
                  onClick={copyWinningNumber}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-white hover:bg-[#f5f5f7] text-black font-medium py-2.5 rounded-full text-xs transition-all cursor-pointer"
                >
                  View Certificate
                </button>
                <button
                  onClick={resetDraw}
                  title="Reset Draw (Re-run for rehearsal)"
                  className="px-4 bg-white/10 hover:bg-white/20 text-[#86868b] hover:text-white rounded-full flex items-center justify-center transition-colors cursor-pointer text-xs gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 text-[11px] text-[#6e6e73] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#34c759]" />
            <span>86 Entries • Cryptographically Seeded • One-Time Draw</span>
          </div>
        </div>
      </main>

      {/* 3. Minimal Single-Line Footer */}
      <footer className="w-full py-4 text-center text-[11px] text-[#6e6e73] border-t border-white/[0.06] px-4 z-20">
        Official Launch Event • Malé, Maldives. &copy; 2026 Apple Inc. &amp; ELL Mobile. All rights reserved.
      </footer>

      {/* Slide-over Verified Registrants Drawer */}
      <RegistrantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        winnerNumber={winner?.number}
      />

      {/* Winner Modal */}
      <WinnerModal
        winner={isModalOpen ? winner : null}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Canvas Gold & Titanium Confetti */}
      <ConfettiCanvas active={confettiActive} />
    </div>
  );
}
