"use client";

import React from "react";
import { GalleryCategory, GalleryFilterState } from "../types";
import { GALLERY_CATEGORIES, GALLERY_COLLECTIONS } from "../data/gallery.data";
import { Search, X, Camera, Layers } from "lucide-react";

interface GalleryFilterBarProps {
  filters: GalleryFilterState;
  onFilterChange: (newFilters: Partial<GalleryFilterState>) => void;
  onReset: () => void;
  totalCount: number;
}

export const GalleryFilterBar: React.FC<GalleryFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalCount,
}) => {
  const isFiltered =
    filters.category !== "all" ||
    filters.collection !== "all" ||
    filters.searchQuery.trim().length > 0;

  const activeCollectionObj = GALLERY_COLLECTIONS.find(
    (c) => c.slug === filters.collection
  );

  return (
    <div className="w-full bg-[#040406] border-b border-zinc-900 sticky top-16 md:top-20 z-20 backdrop-blur-md bg-opacity-95 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Photography-First Minimal Text Links (NOT a dashboard tab bar) */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
            {GALLERY_CATEGORIES.map((cat) => {
              const active = filters.category === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() =>
                    onFilterChange({ category: cat.value as GalleryCategory })
                  }
                  className={`text-xs font-mono uppercase tracking-widest transition-colors shrink-0 relative py-1 ${
                    active
                      ? "text-amber-400 font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Minimal Search & Count */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Camera className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search frame, location..."
                value={filters.searchQuery}
                onChange={(e) =>
                  onFilterChange({ searchQuery: e.target.value })
                }
                className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors font-mono"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => onFilterChange({ searchQuery: "" })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
              >
                <X className="w-3 h-3 text-amber-500" />
                Reset
              </button>
            )}

            <span className="hidden sm:inline font-mono text-xs text-zinc-500 shrink-0">
              <span className="text-zinc-300 font-bold">{totalCount}</span> Frames
            </span>
          </div>
        </div>

        {/* Active Chapter Indicator */}
        {activeCollectionObj && (
          <div className="flex items-center gap-2 pt-3 mt-3 border-t border-zinc-900 text-xs font-mono">
            <span className="text-zinc-500 uppercase flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-500" />
              ACTIVE CHAPTER:
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {activeCollectionObj.title}
              <button
                type="button"
                onClick={() => onFilterChange({ collection: "all" })}
                className="hover:text-white ml-1"
                aria-label="Clear active chapter filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
