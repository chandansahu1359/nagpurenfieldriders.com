"use client";

import React, { useState, useMemo } from "react";
import { EventsHero } from "./components/EventsHero";
import { EventsFeatured } from "./components/EventsFeatured";
import { EventsFilterBar } from "./components/EventsFilterBar";
import { EventsList } from "./components/EventsList";
import { EventsArchive } from "./components/EventsArchive";
import { EventsEmptyState } from "./components/EventsEmptyState";
import { EVENTS_DATA } from "./data/events.data";
import { EventFilterState } from "@/types";

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

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      if (filters.status !== "all" && event.status !== filters.status) {
        return false;
      }
      if (filters.type !== "all" && event.type !== filters.type) {
        return false;
      }
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

  const featuredEvent = useMemo(() => {
    return EVENTS_DATA.find((e) => e.featured && e.status === "upcoming") || null;
  }, []);

  const upcomingEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.status === "upcoming" && !e.featured);
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents.filter((e) => e.status === "past");
  }, [filteredEvents]);

  const showFeatured =
    featuredEvent &&
    (filters.status === "all" || filters.status === "upcoming") &&
    (filters.type === "all" || featuredEvent.type === filters.type) &&
    !filters.searchQuery.trim();

  return (
    <div className="flex flex-col w-full">
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
    </div>
  );
};
