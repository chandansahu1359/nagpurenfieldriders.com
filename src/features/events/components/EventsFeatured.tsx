import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityEvent } from "../types";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Flame,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";

interface EventsFeaturedProps {
  event: CommunityEvent;
}

export const EventsFeatured: React.FC<EventsFeaturedProps> = ({ event }) => {
  return (
    <section
      aria-label="Featured Community Gathering Invitation"
      className="py-12 md:py-20 bg-[#070709] border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pass Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-3 border-b border-zinc-850">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              SPOTLIGHT COMMUNITY PASS • SEASON HEADLINER
            </span>
          </div>

          <span className="font-mono text-xs text-zinc-400 uppercase">
            VENUE: {event.location}
          </span>
        </div>

        {/* Gathering Invitation Pass Card (NOT a generic card) */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Event Invitation Details (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Date Block Tag */}
              <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-6">
                <div className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-mono font-black text-sm">
                  {event.displayDate}
                </div>
                <div className="text-xs font-mono text-amber-300 font-semibold">
                  {event.time} • OVERNIGHT WILDERNESS ASSEMBLY
                </div>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4">
                {event.title}
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {event.description}
              </p>

              {/* Gathering Logistics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-zinc-850 text-xs font-mono text-zinc-300 mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">
                      VENUE & LANDMARK
                    </span>
                    <span>{event.venueLandmark}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">
                      ELIGIBILITY
                    </span>
                    <span>{event.communityCapacityNote || "Open to community riders"}</span>
                  </div>
                </div>
              </div>

              {/* What To Expect */}
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                  COMMUNITY HIGHLIGHTS:
                </span>
                {event.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-zinc-300"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 text-black font-display font-bold uppercase text-xs tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Register Interest via Dispatch Desk
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about#culture"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Community Code of Conduct
              </Link>
            </div>
          </div>

          {/* Right Column: Warm Bonfire Image (lg:col-span-5) */}
          <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center filter brightness-[0.85] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden" />
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />

            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase">
              {event.typeLabel}
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              <span className="text-amber-400 font-bold block mb-1">
                BONFIRE & STARGAZING
              </span>
              <span>Engines cool, conversations ignite under the Milky Way.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
