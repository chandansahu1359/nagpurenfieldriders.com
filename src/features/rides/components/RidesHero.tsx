"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { Compass, ArrowRight, Gauge, MapPin, Navigation } from "lucide-react";

export const RidesHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const routeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".rides-telemetry", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            x: -30,
            duration: 0.9,
          },
          "-=0.3"
        )
        .from(
          ".rides-lead-text",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          routeTrackRef.current,
          {
            opacity: 0,
            scaleX: 0.95,
            duration: 0.8,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-zinc-800 bg-[#070709]"
      aria-label="Rides Journal Highway Departure"
    >
      {/* Background Highway Dawn Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/rides/dawn-pack.jpg"
          alt="Nagpur Enfield Riders cruising open highway in staggered formation at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.62] contrast-[1.12]"
        />
        {/* Layered Highway Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/95 via-[#070709]/60 to-transparent" />
        {/* Directional Speed Overlay Line */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(245,158,11,0.04)_50%,transparent_100%)] pointer-events-none" />
      </div>

      {/* 1. TOP TELEMETRY STRIP (Origin & Compass Coordinates) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        <div className="rides-telemetry flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-amber-400 font-bold">DISPATCH: ACTIVE HIGHWAY</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">ZERO MILE ORIGIN (NAGPUR)</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              21.1458° N, 79.0882° E
            </span>
            <span className="text-zinc-600">/</span>
            <span className="flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-amber-500" />
              ALTITUDE: 310M
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-semibold">STAGGERED PACK ONLY</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN DIRECTIONAL TYPOGRAPHY & DESTINATION LOG */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 my-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/70 border border-amber-500/40 text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Gauge className="w-3.5 h-3.5" />
            <span>THE ROADS WE RIDE • EXPEDITION CHRONICLES</span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6"
          >
            The Road <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Is Calling.
            </span>
          </h1>

          <p className="rides-lead-text text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed mb-8">
            Every throttle roll begins at India&apos;s geographical center.
            Follow our odometer through morning mist, tiger buffer corridors,
            winding mountain ghats, and coastal borderlands.
          </p>
        </div>
      </div>

      {/* 3. HIGHWAY WAYPOINT TRACKER (Kinetic Journey Milestone Ribbon) */}
      <div className="relative z-10 w-full border-t border-zinc-800 bg-black/80 backdrop-blur-md py-4">
        <div
          ref={routeTrackRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              RADIAL EXPEDITION CORRIDORS FROM NAGPUR
            </span>
            <span className="hidden md:inline text-zinc-400">
              ODOMETER PROGRESSION
            </span>
          </div>

          {/* Waypoints Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-amber-500 font-bold">KM 000</span>
                <span className="text-xs font-display font-bold text-white uppercase">ZERO MILE</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">ORIGIN</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-amber-400/80 font-bold">KM 160</span>
                <span className="text-xs font-display font-bold text-zinc-200 uppercase">PENCH BUFFER</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-amber-400/80 font-bold">KM 320</span>
                <span className="text-xs font-display font-bold text-zinc-200 uppercase">SATPURA GHATS</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-amber-400/80 font-bold">KM 1,850</span>
                <span className="text-xs font-display font-bold text-zinc-200 uppercase">KONKAN COAST</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between col-span-2 sm:col-span-1">
              <div>
                <span className="block text-[10px] text-amber-400/80 font-bold">KM 2,400</span>
                <span className="text-xs font-display font-bold text-zinc-200 uppercase">LADAKH PASSES</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono font-bold">ALPINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
