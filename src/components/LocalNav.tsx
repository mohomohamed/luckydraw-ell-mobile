"use client";
import React from "react";

interface LocalNavProps {
  onTriggerDraw?: () => void;
}

export default function LocalNav({ onTriggerDraw }: LocalNavProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-[44px] h-[52px] bg-black/80 backdrop-blur-[20px] saturate-[180%] border-b border-white/[0.12] z-40">
      <div className="max-w-[1024px] h-full mx-auto px-5 flex justify-between items-center">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("hero");
          }}
          className="flex items-baseline space-x-2 text-white font-semibold text-[20px] tracking-tight hover:opacity-90 transition-opacity"
        >
          <span>iPhone 18 Pro</span>
          <span className="text-xs font-normal text-[#86868b]">Launch Event</span>
        </a>

        <div className="flex items-center space-x-6 text-[12px]">
          <ul className="hidden sm:flex items-center space-x-5 text-[#86868b]">
            <li>
              <button
                onClick={() => scrollTo("hero")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("highlights")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Highlights
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("draw")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                The Draw
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("pool")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Registrants
              </button>
            </li>
          </ul>

          <button
            onClick={() => {
              scrollTo("draw");
              if (onTriggerDraw) onTriggerDraw();
            }}
            className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-[12px] font-normal px-3.5 py-1 rounded-full transition-all cursor-pointer shadow-sm shadow-[#0071e3]/30"
          >
            Reveal Winner
          </button>
        </div>
      </div>
    </nav>
  );
}
