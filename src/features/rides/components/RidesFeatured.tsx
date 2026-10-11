import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ride } from "../types";
import {
  Calendar,
  MapPin,
  Route,
  Clock,
  ArrowRight,
  ShieldCheck,
  Compass,
  Gauge,
  Milestone,
} from "lucide-react";

interface RidesFeaturedProps {
  ride: Ride;
}

export const RidesFeatured: React.FC<RidesFeaturedProps> = ({ ride }) => {
  return (
    <section
      aria-label="Next Expedition Waypoint Dossier"
      className="py-12 md:py-20 bg-[#060608] border-b border-zinc-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expedition Header Dossier Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-850">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-500" />
              NEXT OFFICIAL EXPEDITION
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              {ride.displayDate} • DEPARTURE PROTOCOL ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <Milestone className="w-4 h-4 text-amber-500" />
            <span>TOTAL DISTANCE:</span>
            <span className="text-white font-bold">{ride.distance}</span>
          </div>
        </div>

        {/* Route Progression Graphic Bar */}
        <div className="mb-8 p-4 rounded-xl bg-zinc-950 border border-zinc-850">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase text-zinc-500 mb-2">
            <span>ROUTE WAYPOINT PROGRESSION</span>
            <span className="text-amber-500 font-semibold">ESTIMATED ROLLOUT: {ride.rolloutTime}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono font-medium">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{ride.origin}</span>
            </div>
            <div className="hidden sm:block flex-1 mx-4 border-t border-dashed border-zinc-700" />
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              <span>{ride.midwayWaypoint || ride.routeCharacter}</span>
            </div>
            <div className="hidden sm:block flex-1 mx-4 border-t border-dashed border-zinc-700" />
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{ride.destination}</span>
            </div>
          </div>
        </div>

        {/* Cinematic Wide Panorama Layout */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
          {/* Panoramic Image Window */}
          <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[500px]">
            <Image
              src={ride.coverImage}
              alt={ride.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center filter brightness-[0.78] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-transparent to-zinc-950/40" />

            {/* Overlaid Destination Stamp */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/40">
                {ride.typeLabel}
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/10">
                {ride.terrain}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {ride.destination}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none mb-3">
                {ride.title}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal max-w-2xl">
                {ride.description}
              </p>
            </div>
          </div>

          {/* Technical Telemetry & Operational Matrix Bar */}
          <div className="p-6 sm:p-8 bg-zinc-950/95 border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Specs Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 uppercase block text-[10px] mb-1">
                  CIVIL ROLLOUT LANDMARK
                </span>
                <span className="text-zinc-200 font-bold block">
                  {ride.departureLandmark}
                </span>
                <span className="text-amber-500 text-[11px] mt-0.5 block">
                  {ride.rolloutTime}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 uppercase block text-[10px] mb-1">
                  ROAD PROFILE
                </span>
                <span className="text-zinc-200 font-semibold block leading-tight">
                  {ride.routeCharacter}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 uppercase block text-[10px] mb-1">
                  FORMATION MANDATE
                </span>
                <span className="text-amber-400 font-bold block">
                  Staggered Double-File
                </span>
                <span className="text-zinc-400 text-[11px] block">
                  Lead & Sweep Marshals Active
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-black font-display font-bold uppercase text-xs tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Inquire With Dispatch Desk
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about#protocols"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                View Formation Protocol
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
