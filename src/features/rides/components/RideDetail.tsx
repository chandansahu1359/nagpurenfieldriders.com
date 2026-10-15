import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ride } from "@/types";
import { Badge } from "@/components/ui/Badge";
import {
  RIDE_STATUS_LABELS,
  RIDE_TYPE_LABELS,
} from "@/constants/rides.constants";
import {
  Calendar,
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  Route,
  Mountain,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const RideDetail: React.FC<{ ride: Ride }> = ({ ride }) => {
  return (
    <article className="relative min-h-screen pb-24 overflow-hidden">
      {/* Background road styling */}
      <div className="absolute inset-0 bg-road-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 sm:pb-24 border-b border-zinc-900 bg-gradient-to-b from-black via-zinc-950 to-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-8">
            <Link
              href="/rides/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-wider group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>BACK TO EXPEDITIONS</span>
            </Link>
          </div>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge
              variant={ride.status === "upcoming" ? "amber" : "neutral"}
              size="sm"
            >
              {RIDE_STATUS_LABELS[ride.status] || ride.status.toUpperCase()}
            </Badge>

            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
              {RIDE_TYPE_LABELS[ride.type] || ride.typeLabel}
            </span>

            {ride.displayDate && (
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 pl-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {ride.displayDate}
              </span>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none">
              {ride.title}
            </h1>
            <p className="text-lg sm:text-xl font-mono text-amber-400">
              {ride.subtitle}
            </p>
            <p className="text-base text-zinc-300 leading-relaxed max-w-3xl pt-2">
              {ride.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Photography Showcase */}
      <section className="relative -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
          <Image
            src={ride.coverImage}
            alt={ride.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        </div>
      </section>

      {/* Main Dossier Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Narrative & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            {/* Editorial Overview */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block">
                EXPEDITION OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                THE ROAD & RHYTHM
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{ride.description}</p>
              </div>
            </div>

            {/* Public Highlights */}
            {ride.publicHighlights && ride.publicHighlights.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-zinc-850">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block">
                  ROAD MILESTONES & DISCIPLINE
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
                  KEY HIGHLIGHTS
                </h3>
                <ul className="grid grid-cols-1 gap-3">
                  {ride.publicHighlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-850 text-sm text-zinc-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery Strip */}
            {ride.gallery && ride.gallery.length > 1 && (
              <div className="space-y-4 pt-6 border-t border-zinc-850">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block">
                  PHOTO ARCHIVES
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
                  DISPATCH FRAMES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ride.gallery.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950"
                    >
                      <Image
                        src={imgSrc}
                        alt={`${ride.title} frame ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Telemetry & Specs Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 sticky top-28">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block border-b border-zinc-800 pb-3">
                ROAD TELEMETRY & LOGS
              </span>

              {/* Spec Rows */}
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    ORIGIN
                  </span>
                  <span className="text-white text-right font-bold">
                    {ride.origin}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-500" />
                    DESTINATION
                  </span>
                  <span className="text-white text-right font-bold">
                    {ride.destination}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Route className="w-4 h-4 text-amber-500" />
                    DISTANCE
                  </span>
                  <span className="text-amber-400 text-right font-bold">
                    {ride.distance}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    DURATION
                  </span>
                  <span className="text-white text-right font-bold">
                    {ride.durationLabel}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-amber-500" />
                    TERRAIN
                  </span>
                  <span className="text-white text-right font-bold max-w-[200px]">
                    {ride.terrain}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    ROLLOUT
                  </span>
                  <span className="text-white text-right font-bold">
                    {ride.rolloutTime}
                  </span>
                </div>

                {ride.departureLandmark && (
                  <div className="flex items-start justify-between gap-4 py-2 border-b border-zinc-850">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      ASSEMBLY
                    </span>
                    <span className="text-white text-right font-bold max-w-[180px]">
                      {ride.departureLandmark}
                    </span>
                  </div>
                )}
              </div>

              {/* Ride Character Quote */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 text-xs text-zinc-300 leading-relaxed font-mono">
                <span className="text-amber-500 font-bold block mb-1">
                  ROUTE CHARACTER:
                </span>
                {ride.routeCharacter}
              </div>

              {/* Inquire CTA */}
              <div className="pt-2">
                <Link
                  href="/contact/"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-center"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>INQUIRE ABOUT THIS RIDE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
