import React from "react";
import Image from "next/image";
import { getHomepageRides } from "@/features/rides";
import { Badge } from "@/components/ui/Badge";
import { Compass, MapPin, Timer } from "lucide-react";

export const HomeFeaturedExpeditions: React.FC = () => {
  const expeditions = getHomepageRides();

  return (
    <section
      id="expeditions"
      className="relative bg-[#08080a] py-24 sm:py-32 border-b border-zinc-900 overflow-hidden"
      aria-label="Featured Expeditions and Formats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="flex flex-col gap-3">
            <div>
              <Badge variant="amber" size="sm" icon={<Compass className="w-3.5 h-3.5" />}>
                EXPEDITION ARCHIVE
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              ROADS THAT SHAPE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                THE RIDER
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              From fast morning forest sprints across the Madhya Pradesh border
              to multi-week high-altitude climbs into Himalayan rarefied air,
              every ride has a distinct rhythm.
            </p>
          </div>
        </div>

        {/* Featured Expeditions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expeditions.map((exp) => (
            <div
              key={exp.id}
              className="group bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={exp.coverImage}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="amber" size="sm">
                      {exp.typeLabel}
                    </Badge>
                  </div>

                  {/* Distance watermark */}
                  <div className="absolute bottom-3 right-4 z-10 text-right">
                    <span className="text-2xl font-black font-mono text-white">
                      {exp.distanceKm}+
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 block -mt-1">
                      KILOMETRES
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                      {exp.subtitle}
                    </span>
                    <h3 className="text-xl font-bold uppercase text-white tracking-wide group-hover:text-amber-400 transition-colors">
                      {exp.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {exp.shortDescription}
                  </p>

                  <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{exp.origin} → {exp.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{exp.durationLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags footer */}
              <div className="px-6 sm:px-7 pb-6 pt-2 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
