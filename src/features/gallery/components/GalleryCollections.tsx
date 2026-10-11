"use client";

import React from "react";
import Image from "next/image";
import { GalleryCollection } from "../types";
import { BookOpen, ArrowRight } from "lucide-react";

interface GalleryCollectionsProps {
  collections: GalleryCollection[];
  selectedCollection: string;
  onSelectCollection: (slug: string) => void;
}

export const GalleryCollections: React.FC<GalleryCollectionsProps> = ({
  collections,
  selectedCollection,
  onSelectCollection,
}) => {
  return (
    <section
      aria-label="Editorial Photo Chapters"
      className="py-12 md:py-20 bg-[#060608] border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-850">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">
                CURATED PHOTO ESSAYS • CHAPTERS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Featured Road Chapters
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm font-normal">
            Intentionally curated monographs exploring specific terrains,
            tea rituals, and night skies.
          </p>
        </div>

        {/* Chapters Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => {
            const isSelected = selectedCollection === col.slug;
            const romanNumerals = ["I", "II", "III", "IV"];
            return (
              <div
                key={col.id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  onSelectCollection(isSelected ? "all" : col.slug)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCollection(isSelected ? "all" : col.slug);
                  }
                }}
                className={`group cursor-pointer relative rounded-2xl overflow-hidden border bg-zinc-950 transition-all duration-300 flex flex-col justify-between min-h-[340px] text-left focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isSelected
                    ? "border-amber-500 ring-2 ring-amber-500/50 shadow-2xl shadow-amber-500/10"
                    : "border-zinc-850 hover:border-zinc-700"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={col.coverImage}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.62]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                </div>

                {/* Chapter Number Badge */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                    CHAPTER {romanNumerals[idx] || `0${idx + 1}`}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                    {col.photoCount} Photos
                  </span>
                </div>

                {/* Chapter Story Bottom */}
                <div className="relative z-10 p-5 mt-auto">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 block mb-1">
                    {col.location}
                  </span>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight leading-snug mb-2 group-hover:text-amber-300 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 mb-4 font-normal">
                    {col.description}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                    <span className="text-zinc-400 text-[11px]">{col.date}</span>
                    <span className="text-amber-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isSelected ? "Active Chapter" : "Explore Essay"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
