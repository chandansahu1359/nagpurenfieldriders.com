"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { EventsHero } from "./components/EventsHero";
import { EventsFeatured } from "./components/EventsFeatured";
import { EventsFilterBar } from "./components/EventsFilterBar";
import { EventsList } from "./components/EventsList";
import { EventsArchive } from "./components/EventsArchive";
import { EventsEmptyState } from "./components/EventsEmptyState";
import { EVENTS_DATA } from "./data/events.data";
import { EventFilterState } from "./types";

export const EventsPage: React.FC = () => {
  const [filters, setFilters] = useState<EventFilterState>({
    status: "all",
    type: "all",
    searchQuery: "",
  });

  const handleFilterChange = (updates: Partial<EventFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setFilters({
      status: "all",
      type: "all",
      searchQuery: "",
    });
  };

  // Filter events based on criteria
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // Status
      if (filters.status !== "all" && event.status !== filters.status) {
        return false;
      }
      // Type
      if (filters.type !== "all" && event.type !== filters.type) {
        return false;
      }
      // Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesLoc = event.location.toLowerCase().includes(query);
        const matchesVenue = event.venueLandmark.toLowerCase().includes(query);
        const matchesDesc = event.shortDescription.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesVenue && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  // Featured upcoming event
  const featuredEvent = useMemo(() => {
    return EVENTS_DATA.find((e) => e.featured && e.status === "upcoming") || null;
  }, []);

  // Split into upcoming and past
  const upcomingEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.status === "upcoming" && !e.featured);
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.status === "past");
  }, [filteredEvents]);

  // Determine if featured section should display
  const showFeatured =
    featuredEvent &&
    (filters.status === "all" || filters.status === "upcoming") &&
    (filters.type === "all" || featuredEvent.type === filters.type) &&
    !filters.searchQuery.trim();

  return (
    <div className="flex flex-col min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Global Navigation */}
      <Header />

      <main className="flex-1">
        {/* Cinematic Community Gathering Hero */}
        <EventsHero />

        {/* Featured Upcoming Assembly Spotlight */}
        {showFeatured && <EventsFeatured event={featuredEvent} />}

        {/* Interactive Filtering */}
        <EventsFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalCount={filteredEvents.length}
        />

        {/* Empty State */}
        {filteredEvents.length === 0 ? (
          <EventsEmptyState onReset={handleReset} />
        ) : (
          <>
            {/* Upcoming Gatherings */}
            {(filters.status === "all" || filters.status === "upcoming") && (
              <EventsList events={upcomingEvents} />
            )}

            {/* Past Moments Archive */}
            {(filters.status === "all" || filters.status === "past") && (
              <EventsArchive events={pastEvents} />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
