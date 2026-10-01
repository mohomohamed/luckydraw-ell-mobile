"use client";
import React, { useState, useRef, useEffect } from "react";
import { PARTICIPANTS, WinnerResult } from "@/data/participants";
import { soundEngine } from "@/lib/audio";
import { Play, Volume2, VolumeX, Sparkles, Disc, Sliders } from "lucide-react";

interface LuckyDrawArenaProps {
  onWinnerRevealed: (winner: WinnerResult) => void;
  onLiveNumberChange?: (num: string) => void;
  onDrawStateChange?: (isDrawing: boolean) => void;
}

type DrawMode = "ticker" | "wheel";

export default function LuckyDrawArena({
  onWinnerRevealed,
  onLiveNumberChange,
  onDrawStateChange,
}: LuckyDrawArenaProps) {
  const [mode, setMode] = useState<DrawMode>("wheel");
  const [isDrawing, setIsDrawing] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [currentDisplay, setCurrentDisplay] = useState("•••••••");
  const [statusText, setStatusText] = useState("System Idle • 86 Registrants Verified");
  const [blurClass, setBlurClass] = useState("");
  const [isWinnerHighlight, setIsWinnerHighlight] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  const animFrameRef = useRef<number | null>(null);

  // Synchronize sound engine toggle
  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    soundEngine.setEnabled(nextState);
  };

  const startDraw = () => {
    if (isDrawing) return;

    setIsDrawing(true);
    if (onDrawStateChange) onDrawStateChange(true);
    setIsWinnerHighlight(false);
    setStatusText("Engaging Deceleration Protocol...");

    // Pick cryptographically secure random winner
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    const targetIndex = cryptoArray[0] % PARTICIPANTS.length;
    const winningNumber = PARTICIPANTS[targetIndex];

    const DURATION = 5200; // 5.2 seconds as per Apple SRS (4-6 seconds)
    const startTime = performance.now();
    let lastTick = 0;
    let initialRotation = wheelRotation;
    const totalWheelSpins = 360 * 6 + (targetIndex * (360 / PARTICIPANTS.length));

    const updateLoop = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease out exponential curve
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentInterval = 32 + Math.pow(progress, 3) * 440;

      // Update wheel rotation smoothly
      const currentRot = initialRotation + totalWheelSpins * easeOut;
      setWheelRotation(currentRot);

      if (currentTime - lastTick >= currentInterval && progress < 1) {
        lastTick = currentTime;
        const randIndex = Math.floor(Math.random() * PARTICIPANTS.length);
        const randomNum = PARTICIPANTS[randIndex];
        setCurrentDisplay(randomNum);
        if (onLiveNumberChange) onLiveNumberChange(randomNum);

        // Sound & Blur mapping
        if (progress < 0.45) {
          setBlurClass("filter blur-[8px] scale-y-110 text-[#d4d4d8]");
          soundEngine.playTick(1.3);
        } else if (progress < 0.78) {
          setBlurClass("filter blur-[3.5px] scale-y-105 text-[#e4e4e7]");
          soundEngine.playTick(1.05);
        } else {
          setBlurClass("filter blur-[1px] text-[#fafafa]");
          soundEngine.playTick(0.85);
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(updateLoop);
      } else {
        // Draw completed
        setCurrentDisplay(winningNumber);
        if (onLiveNumberChange) onLiveNumberChange(winningNumber);
        setBlurClass("");
        setIsWinnerHighlight(true);
        setStatusText(`Official Winner Confirmed: +960 ${winningNumber}`);
        setIsDrawing(false);
        if (onDrawStateChange) onDrawStateChange(false);

        // Play harmonic chime
        soundEngine.playCelebrationChime();

        // Reveal winner modal after brief dramatic pause
        setTimeout(() => {
          onWinnerRevealed({
            number: winningNumber,
            index: targetIndex + 1,
            timestamp: new Date().toLocaleTimeString(),
          });
        }, 850);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="draw" className="relative py-24 sm:py-32 px-6 overflow-hidden border-y border-white/[0.08] bg-[radial-gradient(ellipse_at_50%_20%,rgba(35,33,45,0.45)_0%,rgba(0,0,0,0.98)_75%)]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e5c158]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[840px] mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] text-[#e5c158] mb-2">
          Selection Protocol
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-8">
          Reveal the Lucky Winner.
        </h2>

        {/* Mode Selector Pill */}
        <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-8">
          <button
            onClick={() => setMode("wheel")}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === "wheel"
                ? "bg-white text-black shadow-md shadow-white/10"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Titanium Orbital Wheel</span>
          </button>

          <button
            onClick={() => setMode("ticker")}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === "ticker"
                ? "bg-white text-black shadow-md shadow-white/10"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Optical Slot Ticker</span>
          </button>
        </div>

        {/* iOS Selection Card */}
        <div className="bg-[#121216]/80 backdrop-blur-[40px] border border-white/[0.14] rounded-[38px] p-6 sm:p-12 shadow-[0_40px_120px_-25px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.2)] relative">
          {/* iOS Status Bar */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/[0.06] border border-white/[0.1] rounded-full text-xs font-medium text-[#a1a1a6] mb-8">
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isDrawing
                  ? "bg-[#ff9f0a] shadow-[0_0_12px_#ff9f0a] animate-apple-pulse"
                  : isWinnerHighlight
                  ? "bg-[#e5c158] shadow-[0_0_12px_#e5c158]"
                  : "bg-[#34c759] shadow-[0_0_8px_#34c759]"
              }`}
            />
            <span>{statusText}</span>
          </div>

          {/* MODE 1: Titanium Orbital Wheel (Apple Pro Inspired) */}
          {mode === "wheel" && (
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square mx-auto my-4 flex items-center justify-center">
              {/* Outer Titanium Bezel */}
              <div
                className="absolute inset-0 rounded-full border-[8px] border-[#2c2b30] shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_0_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] transition-transform ease-out"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transitionDuration: isDrawing ? "0s" : "0.5s",
                }}
              >
                {/* Dial Ticks (86 ticks representing each customer) */}
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-white/20 origin-bottom"
                    style={{
                      transformOrigin: "50% 180px",
                      transform: `rotate(${i * 10}deg)`,
                      backgroundColor: i % 3 === 0 ? "rgba(229,193,88,0.7)" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* Glowing Radar Sweep Ring */}
              <div className="absolute inset-4 rounded-full border border-white/[0.08] pointer-events-none">
                <div
                  className={`absolute inset-0 rounded-full ${
                    isDrawing ? "animate-radar opacity-80" : "opacity-30"
                  }`}
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(229,193,88,0.25) 360deg)",
                  }}
                />
              </div>

              {/* Center Winner Lens (Glass Aperture) */}
              <div className="relative z-10 w-[240px] sm:w-[270px] h-[240px] sm:h-[270px] rounded-full bg-[#050508]/90 backdrop-blur-xl border border-white/[0.18] flex flex-col items-center justify-center p-6 shadow-[inset_0_0_35px_rgba(0,0,0,0.9),0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="text-[10px] tracking-[0.16em] uppercase text-[#86868b] font-semibold mb-1">
                  Maldives +960
                </div>

                <div
                  className={`font-mono text-3xl sm:text-4xl font-bold tracking-wider tabular-nums transition-all duration-100 ${blurClass} ${
                    isWinnerHighlight
                      ? "text-gold-gradient scale-110 drop-shadow-[0_0_25px_rgba(229,193,88,0.6)] animate-winner-spring"
                      : "text-white drop-shadow-md"
                  }`}
                >
                  {currentDisplay}
                </div>

                <div className="mt-3 text-[11px] text-[#6e6e73] font-mono tracking-tight">
                  {isDrawing ? "Scrambling..." : isWinnerHighlight ? "Winner Verified" : "Ready"}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: Optical Slot Ticker */}
          {mode === "ticker" && (
            <div className="relative h-32 sm:h-36 max-w-[540px] mx-auto my-6 rounded-[28px] bg-[#040406] border border-white/[0.14] shadow-[inset_0_12px_35px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden">
              {/* Top/Bottom Gradient Shadows */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#040406] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#040406] to-transparent z-10 pointer-events-none" />

              <div className="flex items-baseline justify-center gap-3.5 z-0">
                <span className="font-mono text-xl sm:text-3xl font-normal text-[#6e6e73] tracking-wide">
                  +960
                </span>
                <span
                  className={`font-mono text-4xl sm:text-6xl font-bold tracking-widest tabular-nums transition-all duration-100 ${blurClass} ${
                    isWinnerHighlight
                      ? "text-gold-gradient scale-105 drop-shadow-[0_0_35px_rgba(229,193,88,0.7)] animate-winner-spring"
                      : "text-white"
                  }`}
                >
                  {currentDisplay}
                </span>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <button
              onClick={startDraw}
              disabled={isDrawing}
              className="bg-white hover:bg-[#f5f5f7] active:scale-[0.97] disabled:bg-[#2c2c2e] disabled:text-[#636366] disabled:cursor-not-allowed text-black font-semibold text-lg sm:text-xl px-10 py-4 rounded-full flex items-center gap-3 cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.25)] hover:shadow-[0_8px_45px_rgba(255,255,255,0.4)] transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{isDrawing ? "Selecting Winner..." : "Reveal Winner"}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? "Mute Haptic Audio" : "Unmute Haptic Audio"}
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                soundActive
                  ? "bg-[#e5c158]/15 border-[#e5c158]/50 text-[#e5c158] shadow-[0_0_20px_rgba(229,193,88,0.2)]"
                  : "bg-white/[0.06] border-white/10 text-[#86868b] hover:text-white"
              }`}
            >
              {soundActive ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          <div className="mt-6 text-xs text-[#6e6e73]">
            Verified 86 entries • 5.2s deceleration • Grade 5 Titanium Physics
          </div>
        </div>
      </div>
    </section>
  );
}
