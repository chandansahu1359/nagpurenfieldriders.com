"use client";

import React, { useEffect, useRef } from "react";
import { COMMUNITY_STATS } from "@/features/home/data/stats.data";
import { registerGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";
import { Activity, ShieldCheck, Gauge } from "lucide-react";

export const HomeStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      countersRef.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = COMMUNITY_STATS[index].value;

        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="numbers"
      ref={containerRef}
      className="relative bg-[#0b0b0e] py-24 sm:py-32 border-y border-zinc-900/80 overflow-hidden"
      aria-label="Community Statistics and Scale"
    >
      {/* Background road grid */}
      <div className="absolute inset-0 bg-road-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="flex flex-col gap-3">
            <div>
              <Badge variant="amber" size="sm" icon={<Gauge className="w-3.5 h-3.5" />}>
                SCALE & ROAD PROOF
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              THE SCALE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                THE BROTHERHOOD
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              We don&apos;t measure ourselves in words. We measure in early morning
              rollouts, shared breakfasts, endless ribbons of asphalt, and the count
              of riders who make it home safe every ride.
            </p>
          </div>
        </div>

        {/* Editorial Asymmetric Stat Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {COMMUNITY_STATS.map((stat, i) => (
            <div
              key={stat.id}
              className="relative group bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-colors" />

              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300 block mb-3">
                  {stat.sublabel}
                </span>

                <div className="flex items-baseline gap-1 font-mono">
                  <span
                    ref={(el) => {
                      countersRef.current[i] = el;
                    }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
                  >
                    {stat.value}
                  </span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500">
                    {stat.suffix}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-900 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>ALL METRICS COMPILED FROM OFFICIAL NER RIDE LOGS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>NAGPUR HQ • LIVE LOG ARCHIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
