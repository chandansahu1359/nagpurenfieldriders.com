import React from "react";
import Image from "next/image";
import { ABOUT_EXPERIENCES } from "../data/about.data";
import { Compass, Flame } from "lucide-react";

export const AboutExperiences: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 bg-[#08080a] relative overflow-hidden border-t border-zinc-900"
      aria-label="The Spectrum of NER Road Experiences"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>THE SPECTRUM OF ROADS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            HOW WE EXPERIENCE THE SUBCONTINENT
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            From the quiet chill of dawn breakfast rides to grueling multi-day
            trans-Himalayan passes, our rides span diverse formats designed for
            every level of Royal Enfield touring enthusiast.
          </p>
        </div>

        {/* 2x2 Editorial Photo Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ABOUT_EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 aspect-[16/10] sm:aspect-[16/9] shadow-2xl transition-all duration-500 hover:border-amber-500/40"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center brightness-[0.55] contrast-[1.1] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 bg-zinc-950/80 px-3 py-1 rounded-full border border-amber-500/30 backdrop-blur-sm">
                  {exp.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {exp.subhead}
                </span>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explorer Radar Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            RADIAL EXPEDITIONS OUTWARD FROM ZERO MILE STONE • ALL HIGHWAYS WELCOME
          </p>
        </div>
      </div>
    </section>
  );
};
