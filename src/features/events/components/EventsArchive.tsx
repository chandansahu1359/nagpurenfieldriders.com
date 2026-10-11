"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CommunityEvent } from "../types";
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  X,
  Users,
  HeartHandshake,
} from "lucide-react";

interface EventsArchiveProps {
  events: CommunityEvent[];
}

export const EventsArchive: React.FC<EventsArchiveProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(
    null
  );

  React.useEffect(() => {
    if (!selectedEvent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  if (events.length === 0) return null;

  return (
    <section
      aria-label="Past Community Moments Scrapbook"
      className="py-16 md:py-24 bg-[#08080b] border-t border-zinc-850 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">
                COMMUNITY MEMORIES • THE SCRAPBOOK
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Moments That Forged Us
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-normal leading-relaxed">
            The brotherhood is forged off the saddle. A visual retrospective
            of our foundation assemblies, rain-soaked tea evenings, and civic
            road-safety drives.
          </p>
        </div>

        {/* Memory Scrapbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => {
            return (
              <article
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Top Community Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                      MEMORY #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300 border border-white/10">
                      {event.typeLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-mono uppercase text-amber-400 block font-semibold">
                      {event.location}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {event.displayDate}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-snug mb-2 group-hover:text-amber-300 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {event.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-850 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                    <span className="text-zinc-500 text-[11px]">
                      {event.venueLandmark}
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
                      Read Memory <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Accessible Event Memory Modal */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEvent(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-200">
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden mb-6 border border-zinc-850">
              <Image
                src={selectedEvent.coverImage}
                alt={selectedEvent.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  {selectedEvent.typeLabel} • {selectedEvent.displayDate}
                </span>
                <h3
                  id="event-modal-title"
                  className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
                >
                  {selectedEvent.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-850 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">
                    LOCATION
                  </span>
                  <span className="text-zinc-200 font-bold">
                    {selectedEvent.location}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">
                    SCHEDULE
                  </span>
                  <span className="text-amber-400 font-bold">
                    {selectedEvent.time}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">
                    STATUS
                  </span>
                  <span className="text-zinc-200 font-semibold uppercase">
                    Past Gathering
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                  GATHERING NARRATIVE
                </h4>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                  {selectedEvent.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3 font-bold">
                  MOMENT HIGHLIGHTS
                </h4>
                <ul className="space-y-2">
                  {selectedEvent.highlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-850 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500 uppercase">
                  Nagpur Enfield Riders Community Memories
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Close Memory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
