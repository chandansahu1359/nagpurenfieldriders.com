import React from "react";
import Image from "next/image";
import { Ride } from "../types";
import {
  Calendar,
  MapPin,
  Route,
  Clock,
  ArrowRight,
  ShieldCheck,
  Milestone,
} from "lucide-react";

interface RidesListProps {
  rides: Ride[];
}

export const RidesList: React.FC<RidesListProps> = ({ rides }) => {
  if (rides.length === 0) return null;

  return (
    <section
      aria-label="Upcoming Expeditions Ledger"
      className="py-12 md:py-20 bg-[#070709]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Milestone className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">
                ROLLOUT SCHEDULE • UPCOMING CORRIDORS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              The Journey Ahead
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            Strict staggered formation rolls. Every rider must be fully armored,
            mechanically inspected, and committed to group discipline.
          </p>
        </div>

        {/* Highway Route Ledger Strips (NOT generic cards) */}
        <div className="space-y-6">
          {rides.map((ride) => {
            return (
              <article
                key={ride.id}
                className="relative rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 hover:border-amber-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
              >
                {/* 1. Left Telemetry & Odometer Block (lg:col-span-3) */}
                <div className="lg:col-span-3 p-6 sm:p-8 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-850 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {ride.typeLabel}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {ride.displayDate}
                      </span>
                    </div>

                    <div className="my-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                        ESTIMATED ODOMETER
                      </span>
                      <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {ride.distance}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{ride.rolloutTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span className="truncate">{ride.departureLandmark}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Middle Route Narrative (lg:col-span-5) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-amber-500 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                      DESTINATION: {ride.destination}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug mb-3 group-hover:text-amber-400 transition-colors">
                      {ride.title}
                    </h3>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                      {ride.shortDescription}
                    </p>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 text-xs font-mono text-zinc-400 mb-4">
                      <span className="text-zinc-500 block text-[10px] uppercase mb-0.5">
                        TERRAIN & ROAD PROFILE
                      </span>
                      <span className="text-zinc-200">{ride.routeCharacter}</span>
                    </div>

                    <div className="space-y-1">
                      {ride.publicHighlights.slice(0, 2).map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2 text-xs text-zinc-400"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-zinc-900">
                    <a
                      href="/contact/"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 font-bold transition-colors"
                    >
                      Connect With Ride Marshals
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* 3. Right Road Photographic Window (lg:col-span-4) */}
                <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full overflow-hidden">
                  <Image
                    src={ride.coverImage}
                    alt={ride.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden" />
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />

                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 uppercase">
                    {ride.terrain}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
