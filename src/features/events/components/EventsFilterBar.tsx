"use client";

import React from "react";
import { EventFilterState, EventStatus, EventType } from "../types";
import { EVENT_CATEGORIES, EVENT_STATUS_OPTIONS } from "../data/events.data";
import { Search, X, CalendarDays, Users } from "lucide-react";

interface EventsFilterBarProps {
  filters: EventFilterState;
  onFilterChange: (newFilters: Partial<EventFilterState>) => void;
  onReset: () => void;
  totalCount: number;
}

export const EventsFilterBar: React.FC<EventsFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalCount,
}) => {
  const isFiltered =
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.searchQuery.trim().length > 0;

  return (
    <div className="w-full bg-[#0a0a0d] border-b border-zinc-800 sticky top-16 md:top-20 z-20 backdrop-blur-md bg-opacity-95 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Calendar Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800 self-start">
            {EVENT_STATUS_OPTIONS.map((opt) => {
              const active = filters.status === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    onFilterChange({ status: opt.value as EventStatus })
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-amber-500 text-black font-bold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  {opt.value === "upcoming" && (
                    <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-black" : "bg-emerald-400"} animate-pulse`} />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-72">
              <CalendarDays className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assembly, workshop, venue..."
                value={filters.searchQuery}
                onChange={(e) =>
                  onFilterChange({ searchQuery: e.target.value })
                }
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors font-mono"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => onFilterChange({ searchQuery: "" })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5 text-amber-500" />
                Reset
              </button>
            )}

            <div className="hidden sm:flex items-center font-mono text-xs text-zinc-500 shrink-0">
              <Users className="w-3.5 h-3.5 text-amber-500 mr-1" />
              <span className="text-zinc-300 font-semibold">{totalCount}</span>
              &nbsp;{totalCount === 1 ? "Session" : "Sessions"}
            </div>
          </div>
        </div>

        {/* Nature of Assembly Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 mt-3 border-t border-zinc-900">
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px] uppercase tracking-wider shrink-0 pr-2">
            <span>Nature:</span>
          </div>

          {EVENT_CATEGORIES.map((cat) => {
            const active = filters.type === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onFilterChange({ type: cat.value as EventType })}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all ${
                  active
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/60 font-bold"
                    : "bg-zinc-950 text-zinc-400 border border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
