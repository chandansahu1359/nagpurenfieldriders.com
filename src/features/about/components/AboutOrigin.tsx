import React from "react";
import Image from "next/image";
import { ABOUT_ORIGIN_DATA } from "../data/about.data";
import { Compass, MapPin, Shield, Route } from "lucide-react";

export const AboutOrigin: React.FC = () => {
  return (
    <section
      id="story"
      className="py-24 sm:py-32 bg-[#08080a] relative overflow-hidden border-t border-zinc-900"
      aria-label="The NER Origin Story"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Photography (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
              <Image
                src="/images/community/chai-dhaba-dawn.jpg"
                alt="Nagpur Enfield Riders sharing dawn chai at highway dhaba"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Photo Caption Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
                  AUTHENTIC RIDER ARCHIVE
                </span>
                <p className="text-sm font-semibold text-white">
                  Dawn Rollout • Highway Chai Stop
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  The heart of our brotherhood isn&apos;t horsepower. It&apos;s the warmth of
                  cutting chai on cold morning asphalt.
                </p>
              </div>
            </div>

            {/* Quick Fact Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                  ORIGIN BASE
                </span>
                <span className="text-sm font-bold text-zinc-100 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  Zero Mile Stone
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                  HIGHWAY JUNCTION
                </span>
                <span className="text-sm font-bold text-zinc-100 flex items-center gap-1.5 mt-0.5">
                  <Route className="w-3.5 h-3.5 text-amber-500" />
                  NH44 × NH53
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
                <Compass className="w-3 h-3" />
                <span>{ABOUT_ORIGIN_DATA.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {ABOUT_ORIGIN_DATA.headline}
              </h2>

              <p className="text-lg sm:text-xl text-amber-300 font-medium leading-relaxed">
                {ABOUT_ORIGIN_DATA.intro}
              </p>
            </div>

            <div className="space-y-5 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>{ABOUT_ORIGIN_DATA.narrative1}</p>
              <p>{ABOUT_ORIGIN_DATA.narrative2}</p>
            </div>

            {/* Distinctive Callout: Independent Fraternity Guarantee */}
            <div className="p-5 rounded-xl bg-zinc-900/80 border border-amber-500/30 flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Self-Governed & Rider-Centric
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  NER exists solely for the riders. We do not charge corporate
                  memberships, we do not promote commercial motorcycle sales, and
                  we maintain complete independence to prioritize rider safety,
                  brotherhood, and the authentic highway journey above all else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
