"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RIDE_DESTINATIONS } from "@/features/home/data/destinations.data";
import { RideDestination } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/constants/site";
import {
  Compass,
  MapPin,
  Route,
  Mountain,
  Clock,
  ArrowRight,
  Navigation2,
  ChevronRight,
} from "lucide-react";

export const HomeDestinationMap: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<RideDestination>(
    RIDE_DESTINATIONS[0]
  );

  return (
    <section
      id="destinations"
      className="relative bg-[#08080a] py-24 sm:py-32 border-b border-zinc-900 overflow-hidden"
      aria-label="Riding Distance and Destination Storytelling"
    >
      {/* Background road styling */}
      <div className="absolute inset-0 bg-road-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm" icon={<Compass className="w-3.5 h-3.5" />}>
                ORIGIN: ZERO MILE NAGPUR
              </Badge>
              <a
                href={SITE_CONFIG.zeroMileMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Navigate to Zero Mile Stone coordinates on Google Maps"
                className="text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors underline decoration-zinc-700 hover:decoration-amber-400 underline-offset-4"
              >
                {SITE_CONFIG.zeroMileCoordinates}
              </a>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              FROM ZERO MILE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">
                TO EVERY HORIZON
              </span>
            </h2>
          </div>

          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Nagpur stands at the geographic center of India. For NER riders,
              every rollout begins at the Zero Mile Stone and stretches thousands
              of kilometers into high passes, coastal horizons, and arid deserts.
            </p>
          </div>
        </div>

        {/* Destination Quick Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {RIDE_DESTINATIONS.map((dest) => {
            const isSelected = selectedDestination.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-2.5 border cursor-pointer ${
                  isSelected
                    ? "bg-amber-500 text-zinc-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20 scale-105"
                    : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-zinc-950" : "bg-amber-500"
                  }`}
                />
                <span>{dest.name.split("&")[0]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-zinc-950/20 text-zinc-950" : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {dest.distanceLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Interactive Telemetry & Map Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Radar & Route Vector Matrix (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Visual Compass & Radar Diagram */}
            <div className="relative aspect-square w-full max-w-sm mx-auto flex items-center justify-center">
              {/* Radar concentric rings */}
              <div className="absolute inset-0 rounded-full border border-zinc-800/80" />
              <div className="absolute inset-8 rounded-full border border-zinc-800/60 border-dashed" />
              <div className="absolute inset-20 rounded-full border border-amber-500/10" />

              {/* Crosshair grid lines */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-800" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-zinc-800" />

              {/* Cardinal direction labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-300 font-bold">
                N • LADAKH
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-300 font-bold">
                S • HYDERABAD
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-300 font-bold">
                W • GOA
              </span>
              <span className="absolute top-8 left-8 text-[10px] font-mono text-zinc-300 font-bold">
                NW • RAJASTHAN
              </span>

              {/* Central Zero Mile Node */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center animate-pulse">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">
                    0
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-400 mt-2 tracking-widest uppercase">
                  NAGPUR
                </span>
                <span className="text-[9px] font-mono text-zinc-300">
                  ZERO MILE STONE
                </span>
              </div>

              {/* Destination Nodes on the Radar */}
              {RIDE_DESTINATIONS.map((dest) => {
                const isCurrent = selectedDestination.id === dest.id;

                // Position based on cardinal angle
                const angleRad = (dest.vectorAngleDeg * Math.PI) / 180;
                const radius = 120; // px
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute z-30 flex items-center gap-1.5 p-1 rounded-full transition-transform hover:scale-125 cursor-pointer ${
                      isCurrent ? "scale-110 z-40" : "opacity-70 hover:opacity-100"
                    }`}
                    title={`${dest.name} (${dest.distanceLabel})`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isCurrent
                          ? "bg-white border-amber-400 shadow-md shadow-amber-500/50"
                          : "bg-zinc-800 border-zinc-600"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCurrent ? "bg-amber-500" : "bg-zinc-400"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Radar telemetry readout */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Navigation2 className="w-3.5 h-3.5 text-amber-500 rotate-45" />
                <span>HEADING: {selectedDestination.direction.toUpperCase()}</span>
              </div>
              <span className="text-amber-400">
                {selectedDestination.distanceLabel} FROM ORIGIN
              </span>
            </div>
          </div>

          {/* Right Column: Active Destination Storyboard (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between">
            {/* Top Photography Showcase */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <Image
                src={selectedDestination.image.src}
                alt={selectedDestination.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              {/* Category pill on image */}
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="amber" size="sm">
                  {selectedDestination.category}
                </Badge>
              </div>

              {/* Large Overlay Distance Number */}
              <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase block mb-1">
                    ROADWAY DISTANCE FROM NAGPUR
                  </span>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono text-white tracking-tight flex items-baseline gap-2">
                    <span>{selectedDestination.distanceLabel}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-amber-400 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500/30 w-fit">
                  {selectedDestination.typicalDuration}
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Details */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-2">
                  {selectedDestination.name}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Route className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{selectedDestination.roadRoute}</span>
                </div>
              </div>

              {/* Terrain & Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-semibold mb-2">
                    <Mountain className="w-3.5 h-3.5" />
                    <span>Terrain & Elevation</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedDestination.terrain}
                    {selectedDestination.elevation && (
                      <span className="block mt-1 text-white font-mono font-semibold">
                        Summit Altitude: {selectedDestination.elevation}
                      </span>
                    )}
                  </p>
                </div>

                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-semibold mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Road Highlights</span>
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1">
                    {selectedDestination.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Route Origin verification footnote */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>ROUTE CALCULATED VIA NATIONAL HIGHWAY CORRIDORS</span>
                </div>
                <span className="text-zinc-300">ACTUAL ODOMETER LOGS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
