"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ABOUT_HERO_DATA } from "../data/about.data";
import { Button } from "@/components/ui/Button";
import { registerGSAP } from "@/lib/gsap";
import { Compass, ArrowDown, ArrowUpRight } from "lucide-react";

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".about-hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          subheadRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          quoteRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#08080a] pt-32 pb-20"
      aria-label="About Nagpur Enfield Riders Hero"
    >
      {/* Background Photography with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-cinematic.jpg"
          alt="Nagpur Enfield Riders on open highway"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.38] contrast-[1.15] scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/65 to-black/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
        <div className="absolute inset-0 bg-road-grid opacity-25" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Origin & Badge */}
        <div className="about-hero-badge flex flex-wrap items-center justify-center gap-3 mb-6">
          <a
            href={ABOUT_HERO_DATA.coordinatesUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open coordinates ${ABOUT_HERO_DATA.coordinates} on Google Maps`}
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-amber-400 hover:text-amber-300 bg-zinc-900/90 hover:bg-zinc-800/90 px-4 py-1.5 rounded-full border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
            <span>ZERO MILE STONE • {ABOUT_HERO_DATA.coordinates}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition-colors" />
          </a>

          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase bg-zinc-900/80 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {ABOUT_HERO_DATA.badge}
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.05] sm:leading-[1] mb-6 drop-shadow-2xl"
        >
          NAGPUR ENFIELD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            RIDERS
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p
          ref={subheadRef}
          className="text-lg sm:text-2xl md:text-3xl text-zinc-200 font-light max-w-3xl leading-snug tracking-wide mb-8 text-balance"
        >
          {ABOUT_HERO_DATA.subtitle}
        </p>

        {/* Quote Block */}
        <div
          ref={quoteRef}
          className="max-w-2xl px-6 py-4 rounded-xl bg-zinc-950/60 border border-zinc-850 backdrop-blur-sm mb-10"
        >
          <p className="text-xs sm:text-sm text-zinc-400 italic leading-relaxed">
            &ldquo;{ABOUT_HERO_DATA.quote}&rdquo;
          </p>
        </div>

        {/* Scroll down button */}
        <div className="pt-2">
          <Button
            href="#story"
            variant="outline"
            size="md"
            icon={<ArrowDown className="w-4 h-4" />}
          >
            Read Our Story
          </Button>
        </div>
      </div>
    </section>
  );
};
