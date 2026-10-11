"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { SITE_CONFIG } from "@/constants/site";
import {
  Compass,
  ArrowLeft,
  Home,
  MapPin,
  Calendar,
  Camera,
  Shield,
  ArrowUpRight,
  Radio,
  Navigation,
} from "lucide-react";

const WAYPOINTS = [
  {
    code: "WP-01",
    title: "The Rides",
    subtitle: "The Roads We Ride",
    description:
      "Explore breakfast rollouts, forest corridors, and cross-country mountain expeditions.",
    href: "/rides/",
    icon: Compass,
    badge: "EXPEDITIONS",
  },
  {
    code: "WP-02",
    title: "Events & Gatherings",
    subtitle: "Beyond The Highway",
    description:
      "Community assemblies, wilderness campouts, roadside mechanical clinics, and assemblies.",
    href: "/events/",
    icon: Calendar,
    badge: "MEETUPS",
  },
  {
    code: "WP-03",
    title: "Visual Gallery",
    subtitle: "The Memories We Bring Home",
    description:
      "High-mileage editorial chronicles, raw highway archives, and memories from the saddle.",
    href: "/gallery/",
    icon: Camera,
    badge: "ARCHIVES",
  },
  {
    code: "WP-04",
    title: "About The Pack",
    subtitle: "Brotherhood From Zero Mile",
    description:
      "Our independent origin story, highway safety code, rider culture, and Nagpur roots.",
    href: "/about/",
    icon: Shield,
    badge: "HERITAGE",
  },
];

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Global Navigation Header */}
      <Header />

      {/* Main 404 Body */}
      <main className="flex-1 relative flex flex-col justify-center overflow-hidden py-16 lg:py-24">
        {/* Background Atmosphere & Radar Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Ambient Amber Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]" />
          
          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Concentric Radar Rings */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-zinc-800/40 opacity-40" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-amber-500/10 opacity-60" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-zinc-800/60 opacity-60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Centerpiece Hero Block */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Status Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest shadow-lg shadow-amber-500/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
              <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>OFF-GRID PROTOCOL • ERROR 404</span>
            </div>

            {/* Giant Monospace 404 Display */}
            <div className="relative mb-6 select-none">
              <span
                className="text-8xl sm:text-9xl md:text-[160px] font-black font-mono tracking-tighter leading-none bg-gradient-to-b from-white via-zinc-300 to-zinc-700 bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  textShadow: "0 0 60px rgba(245, 158, 11, 0.15)",
                }}
              >
                404
              </span>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest font-bold">
                  WAYPOINT NOT FOUND
                </span>
              </div>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-6 mb-4 leading-tight">
              THE ASPHALT ENDED HERE.
            </h1>

            {/* Narrative Explanation */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
              You’ve ventured off the marked formation corridor. The coordinates you entered do not correspond to any known pass, basecamp, or pack rally in our road archive.
            </p>

            {/* Telemetry Coordinate Box */}
            <div className="w-full max-w-lg p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>ORIGIN: ZERO MILE STONE</span>
              </div>
              <div className="text-amber-500/90 font-semibold">
                {SITE_CONFIG.zeroMileCoordinates}
              </div>
            </div>

            {/* Primary Navigation Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 w-full">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Return to Zero Mile (Home)</span>
              </Link>

              <button
                onClick={handleGoBack}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Retrace Your Path (Back)</span>
              </button>

              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-all"
              >
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>Dispatch Desk (Contact)</span>
              </Link>
            </div>
          </div>

          {/* Alternative Waypoints Grid */}
          <div className="mt-20 pt-12 border-t border-zinc-900">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
                  KNOWN EXPEDITION CORRIDORS
                </span>
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                  Reroute To Active Coordinates
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Choose a verified road segment below
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WAYPOINTS.map((wp) => {
                const IconComponent = wp.icon;
                return (
                  <Link
                    key={wp.code}
                    href={wp.href}
                    className="group relative flex flex-col justify-between p-5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Top Meta Header */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500/90 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {wp.badge}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600">
                          {wp.code}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 mb-2">
                        <IconComponent className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {wp.title}
                        </h3>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {wp.description}
                      </p>
                    </div>

                    {/* Bottom Action Hint */}
                    <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                      <span>Reroute Trail</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
