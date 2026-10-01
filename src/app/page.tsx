"use client";
import React, { useState } from "react";
import GlobalNav from "@/components/GlobalNav";
import LocalNav from "@/components/LocalNav";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import LuckyDrawArena from "@/components/LuckyDrawArena";
import ParticipantRegistry from "@/components/ParticipantRegistry";
import GlobalFooter from "@/components/GlobalFooter";
import WinnerModal from "@/components/WinnerModal";
import ConfettiCanvas from "@/components/ConfettiCanvas";
import { WinnerResult } from "@/data/participants";

export default function Home() {
  const [winner, setWinner] = useState<WinnerResult | null>(null);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [liveNumber, setLiveNumber] = useState("777••••");
  const [isDrawing, setIsDrawing] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleWinnerRevealed = (selectedWinner: WinnerResult) => {
    setWinner(selectedWinner);
    setIsWinnerModalOpen(true);
    setConfettiActive(true);

    // Turn off confetti generator after 6 seconds
    setTimeout(() => {
      setConfettiActive(false);
    }, 6000);
  };

  return (
    <main className="min-h-screen bg-black text-[#f5f5f7] relative selection:bg-[#e5c158]/30 selection:text-white">
      {/* 1. Apple Global Navigation (44px) */}
      <GlobalNav />

      {/* 2. Apple Sticky Local Navigation (52px) */}
      <LocalNav />

      {/* 3. Cinematic Hero Section with Finish Switcher & Dynamic Island Chassis */}
      <HeroSection currentDisplayNumber={liveNumber} isDrawing={isDrawing} />

      {/* 4. Apple Pro Highlights (Bento Grid) */}
      <BentoGrid />

      {/* 5. Lucky Draw Selection Arena (Orbital Wheel + Optical Slot Ticker) */}
      <LuckyDrawArena
        onWinnerRevealed={handleWinnerRevealed}
        onLiveNumberChange={setLiveNumber}
        onDrawStateChange={setIsDrawing}
      />

      {/* 6. Participant Registry Explorer (86 Verified Maldivian Customers) */}
      <ParticipantRegistry winner={winner} />

      {/* 7. Apple Global Footer */}
      <GlobalFooter />

      {/* 8. Apple Sheet Modal for Winner Announcement */}
      <WinnerModal
        winner={isWinnerModalOpen ? winner : null}
        onClose={() => setIsWinnerModalOpen(false)}
      />

      {/* 9. Canvas Titanium & Gold Particle Engine */}
      <ConfettiCanvas active={confettiActive} />
    </main>
  );
}
