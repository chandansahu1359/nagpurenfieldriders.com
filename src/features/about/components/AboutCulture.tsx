import React from "react";
import { ABOUT_CULTURE_PILLARS } from "../data/about.data";
import { Check, ShieldCheck } from "lucide-react";

export const AboutCulture: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 bg-[#08080a] relative overflow-hidden border-t border-zinc-900"
      aria-label="NER Culture & Five Pillars"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>COMMUNITY DNA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            THE FIVE PILLARS OF NER CULTURE
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            A motorcycle club is defined by what it tolerates and what it honors.
            Our brotherhood is anchored in five steadfast pillars that govern
            every rollout from Zero Mile.
          </p>
        </div>

        {/* Pillars Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_CULTURE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="group relative rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/40 p-8 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Index number & Tagline */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-black text-amber-500/80 group-hover:text-amber-400 transition-colors">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800">
                    {pillar.tagline}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Principles Checklist */}
              <div className="pt-6 border-t border-zinc-800/60 space-y-2">
                {pillar.principles.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Sixth Special Card: The Road Pledge */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-950 border border-amber-500/30 p-8 flex flex-col justify-between text-zinc-200">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 block mb-4">
                THE BROTHERHOOD PLEDGE
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-3">
                UNITED BY PASSION, PROTECTED BY DISCIPLINE
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                When you ride with Nagpur Enfield Riders, you don&apos;t just ride
                for yourself. You ride for the person in your mirror, the machine
                ahead, and the honor of every rider who shares our roads.
              </p>
            </div>

            <div className="pt-6 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
              • NO RIDER LEFT BEHIND •
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
