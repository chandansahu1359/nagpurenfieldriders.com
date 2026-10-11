import React from "react";
import Image from "next/image";
import { ABOUT_PHILOSOPHY_DATA } from "../data/about.data";
import { Sparkles, Gauge, HeartHandshake, Eye } from "lucide-react";

export const AboutPhilosophy: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-900"
      aria-label="NER Riding Philosophy"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading Block */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{ABOUT_PHILOSOPHY_DATA.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            {ABOUT_PHILOSOPHY_DATA.headline}
          </h2>

          <p className="text-lg sm:text-xl text-zinc-400 font-normal">
            {ABOUT_PHILOSOPHY_DATA.subhead}
          </p>
        </div>

        {/* Cinematic Philosophy Feature Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl mb-16">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src="/images/destinations/ladakh-pass.jpg"
              alt="Himalayan mountain pass road ridden by touring motorcycles"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-[0.4] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-black/50 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="max-w-2xl space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-100 italic leading-snug">
                  &ldquo;{ABOUT_PHILOSOPHY_DATA.statement}&rdquo;
                </p>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                  — {ABOUT_PHILOSOPHY_DATA.quoteAuthor}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Philosophy Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white tracking-wide">
              Cadence Over Speed
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We do not race the clock. We tour at rhythmic, consistent cruising
              speeds where machines run smooth, fuel lasts, and riders absorb the
              landscape.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white tracking-wide">
              Mutual Respect
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Whether you ride a classic 350, a modern 650 twin, or a rugged
              Himalayan, every rider in formation holds equal rank and equal
              responsibility.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white tracking-wide">
              Mindfulness & Craft
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Roadcraft is a discipline. Reading weather patterns, anticipating
              highway hazards, and maintaining sharp mechanical awareness make
              great riders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
