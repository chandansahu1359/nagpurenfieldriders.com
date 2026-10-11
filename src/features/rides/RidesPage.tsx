"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { RidesHero } from "./components/RidesHero";
import { RidesFeatured } from "./components/RidesFeatured";
import { RidesFilterBar } from "./components/RidesFilterBar";
import { RidesList } from "./components/RidesList";
import { RidesArchive } from "./components/RidesArchive";
import { RidesEmptyState } from "./components/RidesEmptyState";
import {
  getRidesForRidesPage,
  getFeaturedRide,
} from "./data/rides.data";
import { RideFilterState } from "./types";

const DEFAULT_FILTERS: RideFilterState = {
  status: "upcoming",
  type: "all",
  searchQuery: "",
};

export const RidesPage: React.FC = () => {
  const [filters, setFilters] = useState<RideFilterState>(DEFAULT_FILTERS);

  const handleFilterChange = (updates: Partial<RideFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Base list of rides designated for the public /rides/ page
  const pageRides = useMemo(() => getRidesForRidesPage(), []);

  // Filter rides based on user selection
  const filteredRides = useMemo(() => {
    return pageRides.filter((ride) => {
      // Status filter
      if (filters.status !== "all" && ride.status !== filters.status) {
        return false;
      }
      // Type filter
      if (filters.type !== "all" && ride.type !== filters.type) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = ride.title.toLowerCase().includes(query);
        const matchesDest = ride.destination.toLowerCase().includes(query);
        const matchesTerrain = ride.terrain.toLowerCase().includes(query);
        const matchesDesc = ride.shortDescription.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDest && !matchesTerrain && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [pageRides, filters]);

  // Featured upcoming ride
  const featuredRide = useMemo(() => {
    return getFeaturedRide();
  }, []);

  // Partition into upcoming and completed
  const upcomingRides = useMemo(() => {
    return filteredRides.filter((r) => r.status === "upcoming" && !r.display.featured);
  }, [filteredRides]);

  const completedRides = useMemo(() => {
    return filteredRides.filter((r) => r.status === "completed");
  }, [filteredRides]);

  // Determine if featured section should display
  const showFeatured =
    featuredRide &&
    (filters.status === "all" || filters.status === "upcoming") &&
    (filters.type === "all" || featuredRide.type === filters.type) &&
    !filters.searchQuery.trim();

  return (
    <div className="flex flex-col min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Global Navigation */}
      <Header />

      <main className="flex-1">
        {/* Cinematic Journal Hero */}
        <RidesHero />

        {/* Next Official Rollout Editorial Banner */}
        {showFeatured && <RidesFeatured ride={featuredRide} />}

        {/* Interactive Discovery Filters */}
        <RidesFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalCount={filteredRides.length}
        />

        {/* Empty State */}
        {filteredRides.length === 0 ? (
          <RidesEmptyState onReset={handleReset} />
        ) : (
          <>
            {/* Upcoming Rides Section */}
            {(filters.status === "all" || filters.status === "upcoming") && (
              <RidesList rides={upcomingRides} />
            )}

            {/* Completed Visual Archive */}
            {(filters.status === "all" || filters.status === "completed") && (
              <RidesArchive rides={completedRides} />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
