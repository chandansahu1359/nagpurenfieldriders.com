import React from "react";
import Image from "next/image";
import { CommunityEvent } from "../types";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Users,
} from "lucide-react";

interface EventsListProps {
  events: CommunityEvent[];
}

export const EventsList: React.FC<EventsListProps> = ({ events }) => {
  if (events.length === 0) return null;

  return (
    <section
      aria-label="Upcoming Community Gatherings Calendar"
      className="py-12 md:py-20 bg-[#0a0a0d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">
                COMMUNITY SCHEDULE • CALENDAR OF EVENTS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Upcoming Gatherings
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            Hands-on workshops, road safety sessions, and casual breakfasts.
            Both veteran Enfield riders and prospective members are welcomed.
          </p>
        </div>

        {/* Community Calendar Ledger (NOT generic alternating cards) */}
        <div className="space-y-6">
          {events.map((event) => {
            return (
              <article
                key={event.id}
                className="relative rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 hover:border-amber-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
              >
                {/* 1. Left Date Pillar (lg:col-span-3) */}
                <div className="lg:col-span-3 p-6 sm:p-8 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-850 flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 inline-block mb-3">
                      {event.typeLabel}
                    </span>

                    <div className="my-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                        CALENDAR DATE
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {event.displayDate}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Middle Event Agenda (lg:col-span-5) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider block mb-1">
                      VENUE: {event.venueLandmark}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug mb-3 group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                      {event.shortDescription}
                    </p>

                    {event.communityCapacityNote && (
                      <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs font-mono text-zinc-400 mb-4 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{event.communityCapacityNote}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      {event.highlights.slice(0, 2).map((hl, hIdx) => (
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
                      Inquire via Community Desk
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* 3. Right Community Photographic Window (lg:col-span-4) */}
                <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full overflow-hidden">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden" />
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />

                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 uppercase">
                    {event.location}
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
