"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { Camera, ArrowDown } from "lucide-react";

export const GalleryHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".gallery-film-stamp", {
        opacity: 0,
        y: -10,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.3"
        )
        .from(
          ".gallery-subline",
          {
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] md:min-h-[82vh] flex flex-col justify-between overflow-hidden bg-[#040406] text-zinc-100 border-b border-zinc-900"
      aria-label="Visual Photography Prologue"
    >
      {/* Full-Bleed Atmospheric Photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/tank-gloves-macro.jpg"
          alt="Macro golden hour shot of Royal Enfield teardrop tank and weathered gloves"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.62] contrast-[1.08]"
        />
        {/* Fine Darkroom Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040406]/80 via-transparent to-[#040406]/60" />
      </div>

      {/* Top Film Stamp */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        <div className="gallery-film-stamp flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-zinc-400 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            <span>NER VISUAL ARCHIVE</span>
            <span className="text-zinc-600">•</span>
            <span>UNSTAGED 35MM & CINEMA FRAMES</span>
          </div>
          <span className="hidden sm:inline text-zinc-400">
            NAGPUR ZERO MILE • ONGOING MONOGRAPH
          </span>
        </div>
      </div>

      {/* Center / Lower Minimal Magazine Typography */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 my-auto">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-white tracking-tight leading-[0.96] mb-4"
          >
            The Road. <br />
            The People. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              The Memories.
            </span>
          </h1>

          <p className="gallery-subline text-sm sm:text-base lg:text-lg text-zinc-300 font-normal max-w-xl leading-relaxed">
            Unstaged, raw, and authentic moments from the saddles of Nagpur
            Enfield Riders. Photography is the interface.
          </p>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest">
        <div className="flex items-center gap-2 text-amber-400 font-semibold">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>ENTER THE PHOTO MONOGRAPH</span>
        </div>
        <span className="text-[11px] text-zinc-400">CHAPTERS & SPREADS</span>
      </div>
    </section>
  );
};
