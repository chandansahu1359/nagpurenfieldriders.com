"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Compass } from "lucide-react";

export const FooterHero: React.FC = () => {
  return (
    <div className="relative border-b border-zinc-800/80 overflow-hidden bg-zinc-950">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/destinations/ladakh-pass.jpg"
          alt="Motorcycle journey through the high passes"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.3] contrast-[1.15] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-black/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-90" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36 flex flex-col items-center text-center">
        {/* Origin Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/60 text-xs font-mono tracking-widest text-zinc-300 uppercase mb-8">
          <Compass className="w-3.5 h-3.5 text-amber-500 animate-[spin_10s_linear_infinite]" />
          <span>ZERO MILE STONE • NAGPUR ORIGIN</span>
        </div>

        {/* Large Editorial Statement */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.98] max-w-4xl mb-6">
          THE ROAD DOESN&apos;T <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            END HERE.
          </span>
        </h2>

        {/* Short Emotional Copy */}
        <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed mb-12">
          Every journey leaves tracks on the tarmac. When the engines cool and the
          dust settles, the brotherhood is already looking at the next horizon.
        </p>

        {/* Strong Final Invitations (Not SaaS Conversion) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#connect"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-wider font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 active:scale-95"
          >
            <span>JOIN NER</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="#destinations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-wider font-semibold text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-500/50 transition-all duration-300 active:scale-95"
          >
            <span>EXPLORE RIDES</span>
            <span className="text-zinc-500 text-xs font-mono">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
