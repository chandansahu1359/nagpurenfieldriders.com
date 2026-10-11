"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { Users, Coffee, Flame, Wrench, Shield, CalendarDays } from "lucide-react";

export const EventsHero: React.FC = () => {
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

      tl.from(".events-bulletin-tag", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".events-photo-card",
          {
            opacity: 0,
            scale: 0.96,
            stagger: 0.15,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".events-pillar-item",
          {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-[#0a0a0d] border-b border-zinc-800 text-zinc-100 overflow-hidden"
      aria-label="Community Gatherings Bulletin"
    >
      {/* Warm Ambient Radial Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Community Season Marquee */}
        <div className="events-bulletin-tag flex flex-wrap items-center justify-between gap-3 pb-4 mb-10 border-b border-zinc-800 text-xs font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-amber-500" />
            <span className="text-amber-400 font-bold">COMMUNITY GATHERING BULLETIN</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">SEASON 2026–27</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OPEN GATHERINGS & TECHNICAL SESSIONS</span>
          </div>
        </div>

        {/* Editorial Poster Header & Layered Photographs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Bold Club Manifesto Typography */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono uppercase tracking-widest font-semibold mb-4">
              <Users className="w-3.5 h-3.5" />
              THE PEOPLE BEHIND THE HELMETS
            </span>

            <h1
              ref={headlineRef}
              className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6"
            >
              We Ride As A Pack. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500">
                We Gather As Brothers.
              </span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-8">
              Motorcycles bring us to the road; shared tea, campfire debates,
              mechanics clinics, and genuine friendships keep us together.
              Discover upcoming assemblies across the Nagpur region.
            </p>

            {/* Quick Next Gathering Callout */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/30 inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="text-zinc-400 uppercase">NEXT GATHERING:</span>
                <span className="text-white font-bold">28 NOV 2026</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-zinc-800" />
              <div className="text-amber-400 font-semibold">
                Winter Starlight Camp & Rider Assembly
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Community Moments */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl events-photo-card">
              <Image
                src="/images/events/dhaba-assembly.jpg"
                alt="Nagpur Enfield Riders gathered together over chai and conversations"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center filter brightness-[0.82] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Coffee className="w-3.5 h-3.5" />
                  KADAK CHAI & STORIES
                </span>
                <span className="text-[11px] text-zinc-400">HIGHWAY ASSEMBLY</span>
              </div>
            </div>

            {/* Floating Overlapping Night Camp Accent Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 p-4 rounded-2xl bg-zinc-950 border border-amber-500/40 shadow-2xl hidden sm:flex items-center gap-3 max-w-xs events-photo-card">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono">
                <span className="text-white font-bold block">Wilderness Campfires</span>
                <span className="text-zinc-400 text-[11px]">Under the Vidarbha skies</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Community Gathering Formats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-zinc-850">
          <div className="events-pillar-item p-4 rounded-xl bg-zinc-950/60 border border-zinc-850">
            <Coffee className="w-5 h-5 text-amber-500 mb-2" />
            <span className="font-display text-sm font-bold text-white uppercase block mb-1">
              Chai & Meetups
            </span>
            <span className="text-xs text-zinc-400 font-normal leading-relaxed">
              Relaxed weekend conversations and prospective rider welcomes.
            </span>
          </div>

          <div className="events-pillar-item p-4 rounded-xl bg-zinc-950/60 border border-zinc-850">
            <Flame className="w-5 h-5 text-amber-500 mb-2" />
            <span className="font-display text-sm font-bold text-white uppercase block mb-1">
              Wilderness Camps
            </span>
            <span className="text-xs text-zinc-400 font-normal leading-relaxed">
              Bonfires, cooling exhausts, and starlight acoustic nights.
            </span>
          </div>

          <div className="events-pillar-item p-4 rounded-xl bg-zinc-950/60 border border-zinc-850">
            <Shield className="w-5 h-5 text-amber-500 mb-2" />
            <span className="font-display text-sm font-bold text-white uppercase block mb-1">
              Formation Drills
            </span>
            <span className="text-xs text-zinc-400 font-normal leading-relaxed">
              Hand signal rehearsals, lead/sweep radio drills, safety reviews.
            </span>
          </div>

          <div className="events-pillar-item p-4 rounded-xl bg-zinc-950/60 border border-zinc-850">
            <Wrench className="w-5 h-5 text-amber-500 mb-2" />
            <span className="font-display text-sm font-bold text-white uppercase block mb-1">
              DIY Moto Clinics
            </span>
            <span className="text-xs text-zinc-400 font-normal leading-relaxed">
              Hands-on clutch cables, tire tubes, and electrical repair workshops.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
