"use client";
import React from "react";

export default function GlobalNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[44px] bg-black/80 backdrop-blur-[20px] saturate-[180%] z-50 border-b border-white/[0.08]">
      <div className="max-w-[1024px] h-full mx-auto px-4 flex justify-between items-center text-[#d6d6d6]">
        {/* Apple Logo */}
        <a
          href="#"
          className="opacity-80 hover:opacity-100 transition-opacity flex items-center text-white"
          aria-label="Apple"
        >
          <svg
            height="44"
            viewBox="0 0 14 44"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-[14px] h-[44px]"
          >
            <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7846 9.7846 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.1877 3.1877 0 0 0 .7-2.2824 3.2829 3.2829 0 0 0 -2.1222 1.0948 3.0518 3.0518 0 0 0 -.7124 2.2514 2.89 2.89 0 0 0 2.1346-1.0638z" />
          </svg>
        </a>

        {/* Global Links */}
        <nav className="hidden md:flex items-center space-x-7 text-[12px] font-normal tracking-tight">
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">Store</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">Mac</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">iPad</a>
          <a href="#" className="text-white opacity-100 font-medium">iPhone</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">Watch</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">Vision</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">AirPods</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">TV &amp; Home</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">Entertainment</a>
          <a href="#" className="opacity-80 hover:opacity-100 hover:text-white transition-all">Support</a>
        </nav>

        {/* ELL Mobile Partner Tag */}
        <div className="flex items-center">
          <span className="text-[10px] bg-white/[0.12] hover:bg-white/[0.18] transition-colors px-2.5 py-1 rounded-full text-[#f5f5f7] uppercase tracking-[0.05em] font-semibold border border-white/10">
            ELL Mobile
          </span>
        </div>
      </div>
    </header>
  );
}
