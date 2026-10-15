"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/constants/site";
import {
  Compass,
  MapPin,
  Route,
  Mountain,
  ArrowRight,
  Navigation2,
  TreePine,
  Sun,
  Shield,
} from "lucide-react";

interface JourneyCorridor {
  id: string;
  name: string;
  cardinalDirection: string;
  terrainType: string;
  highwayAxis: string;
  vectorAngleDeg: number;
  image: {
    src: string;
    alt: string;
  };
  narrative: string;
  terrainSpecs: string[];
  ridingEthos: string;
}

const JOURNEY_CORRIDORS: JourneyCorridor[] = [
  {
    id: "central-forest",
    name: "Satpura & Pench Forest Corridor",
    cardinalDirection: "North / Northeast Corridor",
    terrainType: "Teak Canopy & Wildlife Overpasses",
    highwayAxis: "NH44 Elevated Wildlife Corridor & NH47 Axis",
    vectorAngleDeg: -45,
    image: {
      src: "/images/destinations/pench-forest.jpg",
      alt: "Riding through misty forest roads in Pench Reserve near Nagpur",
    },
    narrative:
      "Dense teak forests, crisp dawn mist, and sweeping highway curves cutting past wildlife sanctuaries right outside Nagpur. A proving ground for formation discipline and throttle control.",
    terrainSpecs: [
      "Protected forest canopy with ambient cooling",
      "Disciplined formation speed through wildlife corridors",
      "Technical sweeping curves and ghat transitions",
    ],
    ridingEthos: "Quiet throttle, strict formation spacing, environmental awareness.",
  },
  {
    id: "western-ghats",
    name: "Western Ghats & Coastal Corridors",
    cardinalDirection: "Southwest Axis",
    terrainType: "Deccan Plateau & Ghat Hairpins",
    highwayAxis: "NH53 & NH48 Cross-State Arteries",
    vectorAngleDeg: -150,
    image: {
      src: "/images/destinations/goa-coastal.jpg",
      alt: "Cruising down coastal roads along the Arabian sea in Goa",
    },
    narrative:
      "Trans-Maharashtra endurance cruising. From the black-soil plains of Vidarbha across the volcanic Deccan plateau, descending through historic mountain ghats to coastal tarmac.",
    terrainSpecs: [
      "Multi-climate transition from central plains to misty ghats",
      "Demanding downhill hairpin switchbacks and technical braking",
      "Long-distance endurance pacing and pack fuel management",
    ],
    ridingEthos: "Sustained rhythm, corner entry discipline, pack stamina.",
  },
  {
    id: "high-altitude",
    name: "Northern Himalayan Passes",
    cardinalDirection: "North Axis",
    terrainType: "High Altitude Passes & Glacial Plateaus",
    highwayAxis: "NH44 Trans-India North Corridor",
    vectorAngleDeg: -90,
    image: {
      src: "/images/destinations/ladakh-pass.jpg",
      alt: "Royal Enfield rider touring through high mountain passes in Ladakh",
    },
    narrative:
      "Thin air, cold winds, and rugged mountain corridors. The ultimate endurance test for machine carburetion, rider fortitude, and mutual roadside camaraderie across sub-zero passes.",
    terrainSpecs: [
      "Drastic elevation changes up to extreme high passes",
      "Variable glacial gravel, rock beds and water crossings",
      "Unforgiving temperatures demanding complete rider preparedness",
    ],
    ridingEthos: "Complete mechanical solidarity, oxygen discipline, steady pacing.",
  },
  {
    id: "desert-frontier",
    name: "Western Arid Horizons",
    cardinalDirection: "Northwest Axis",
    terrainType: "Open Desert Highways & Golden Dunes",
    highwayAxis: "NH46 & NH27 Interstate Route",
    vectorAngleDeg: -120,
    image: {
      src: "/images/destinations/rajasthan-desert.jpg",
      alt: "Motorcycle on vast straight desert road at sunset",
    },
    narrative:
      "Unbroken horizons, long open-throttle stretches, and starry desert skies. An odyssey that celebrates the deep, hypnotic cadence of Royal Enfield single-cylinder cruising.",
    terrainSpecs: [
      "Expansive straightaways with sustained crosswind exposure",
      "High thermal variance between blazing noon and cold desert dusk",
      "Remote fuel stops requiring rigorous route planning",
    ],
    ridingEthos: "Heat hydration discipline, constant tire monitoring, open-road focus.",
  },
];

export const HomeDestinationMap: React.FC = () => {
  const [activeCorridor, setActiveCorridor] = useState<JourneyCorridor>(
    JOURNEY_CORRIDORS[0]
  );

  return (
    <section
      id="destinations"
      className="relative bg-[#08080a] py-24 sm:py-32 border-b border-zinc-900 overflow-hidden"
      aria-label="Routes from Zero Mile Journey Showcase"
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
              {SITE_CONFIG.zeroMileCoordinates && (
                <span className="text-xs font-mono text-zinc-400">
                  {SITE_CONFIG.zeroMileCoordinates}
                </span>
              )}
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
              Nagpur sits at the geographic center of the Indian subcontinent.
              For Nagpur Enfield Riders, every rollout radiates outward from the Zero
              Mile Stone into high passes, dense teak forests, and open highway horizons.
            </p>
          </div>
        </div>

        {/* Corridor Quick Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {JOURNEY_CORRIDORS.map((corridor) => {
            const isSelected = activeCorridor.id === corridor.id;
            return (
              <button
                key={corridor.id}
                type="button"
                onClick={() => setActiveCorridor(corridor)}
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
                <span>{corridor.name.split("&")[0]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-zinc-950/20 text-zinc-950" : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {corridor.cardinalDirection.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Corridor Telemetry & Storyboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Radial Vector Matrix (5 cols) */}
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
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400 font-bold">
                N • HIMALAYAN AXIS
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400 font-bold">
                S • DECCAN HIGHWAYS
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 font-bold">
                W • GHATS & COAST
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 font-bold">
                E • FORESTS
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
                <span className="text-[9px] font-mono text-zinc-400">
                  ZERO MILE ORIGIN
                </span>
              </div>

              {/* Corridor Interactive Nodes */}
              {JOURNEY_CORRIDORS.map((corridor) => {
                const isCurrent = activeCorridor.id === corridor.id;
                const angleRad = (corridor.vectorAngleDeg * Math.PI) / 180;
                const radius = 120;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                return (
                  <button
                    key={corridor.id}
                    type="button"
                    onClick={() => setActiveCorridor(corridor)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute z-30 flex items-center gap-1.5 p-1 rounded-full transition-transform hover:scale-125 cursor-pointer ${
                      isCurrent ? "scale-110 z-40" : "opacity-70 hover:opacity-100"
                    }`}
                    title={corridor.name}
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

            {/* Radar Telemetry Readout */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Navigation2 className="w-3.5 h-3.5 text-amber-500 rotate-45" />
                <span>ORIENTATION: {activeCorridor.cardinalDirection.toUpperCase()}</span>
              </div>
              <span className="text-amber-400 font-bold uppercase">
                {activeCorridor.terrainType.split("&")[0]}
              </span>
            </div>
          </div>

          {/* Right Column: Active Corridor Storyboard (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between">
            {/* Photography Showcase */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <Image
                src={activeCorridor.image.src}
                alt={activeCorridor.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              {/* Highway Tag */}
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="amber" size="sm" icon={<Route className="w-3 h-3" />}>
                  {activeCorridor.highwayAxis}
                </Badge>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
                  TERRAIN CORRIDOR
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-wide">
                  {activeCorridor.name}
                </h3>
              </div>
            </div>

            {/* Telemetry Details */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeCorridor.narrative}
              </p>

              {/* Terrain & Ethos Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-semibold mb-2">
                    <Mountain className="w-3.5 h-3.5" />
                    <span>Terrain Characteristics</span>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    {activeCorridor.terrainSpecs.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-semibold mb-2">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Riding Ethos</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {activeCorridor.ridingEthos}
                  </p>
                </div>
              </div>

              {/* Route Link */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>DEPARTURE BASE: ZERO MILE STONE, CIVIL LINES</span>
                </div>
                <Link
                  href="/rides/"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  <span>VIEW RIDE ARCHIVE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
