"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/constants/site";
import { registerGSAP } from "@/lib/gsap";
import { ArrowDown, ArrowUpRight, Compass, ShieldAlert, Sparkles } from "lucide-react";

export const HomeHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(telemetryRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 25,
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
          actionsRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#08080a] pt-24 pb-16"
      aria-label="Nagpur Enfield Riders Hero"
    >
      {/* Background Photography with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-cinematic.jpg"
          alt="Royal Enfield rider parked on an Indian national highway at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.45] contrast-[1.1] scale-105"
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-black/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-road-grid opacity-30" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Origin & Telemetry Pill */}
        <div
          ref={telemetryRef}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
        >
          <a
            href={SITE_CONFIG.zeroMileMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Navigate to Zero Mile Stone coordinates on Google Maps"
            aria-label={`Open coordinates ${SITE_CONFIG.zeroMileCoordinates} on Google Maps`}
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-amber-400 hover:text-amber-300 bg-zinc-900/90 hover:bg-zinc-800/90 px-3.5 py-1.5 rounded-full border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
            <span>INDIA ZERO MILE STONE • {SITE_CONFIG.zeroMileCoordinates}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase bg-zinc-900/80 px-3.5 py-1.5 rounded-full border border-zinc-800">
            EST. INDEPENDENT RIDERS
          </span>
        </div>

        {/* Editorial Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase max-w-5xl leading-[1.05] sm:leading-[1] mb-6 drop-shadow-2xl"
        >
          ONE COMMUNITY. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            COUNTLESS ROADS.
          </span>
        </h1>

        {/* Subtitle / Philosophy */}
        <p
          ref={subheadRef}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed mb-10 text-balance"
        >
          {SITE_CONFIG.heroSubheadline}
        </p>

        {/* Direct Action Buttons */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            href="#destinations"
            size="lg"
            variant="primary"
            icon={<ArrowDown className="w-4 h-4" />}
          >
            Explore The Journeys
          </Button>

          <Button
            href="#numbers"
            size="lg"
            variant="outline"
            icon={<Sparkles className="w-4 h-4 text-amber-400" />}
          >
            The Scale & Proof
          </Button>
        </div>

        {/* Bottom Horizon Road Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 opacity-80">
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            <span>NH44 • NORTH TO SOUTH</span>
            <span className="text-amber-500">•</span>
            <span>NH53 • EAST TO WEST</span>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};
