/**
 * Canonical Ride Type Definitions
 * 
 * Provides a canonical, type-safe representation of motorcycle expeditions
 * and journeys organized by Nagpur Enfield Riders (NER).
 */

export type RideStatus = "upcoming" | "completed" | "ongoing" | "cancelled";

export type RideFilterStatus = "all" | "upcoming" | "completed";

export type RideType =
  | "breakfast"
  | "weekend"
  | "long"
  | "night"
  | "camping"
  | "touring"
  | "special";

export type RideFilterType = "all" | RideType;

export interface RideDisplayConfig {
  /** Surface this ride in the featured expeditions showcase on the Homepage */
  homepage: boolean;

  /** Surface this ride on the public /rides/ page ledger and archive */
  ridesPage: boolean;

  /** Surface as the premier featured editorial dossier on /rides/ */
  featured: boolean;
}

export interface Ride {
  /** Unique permanent identifier */
  id: string;

  /** URL/anchor friendly slug */
  slug: string;

  /** Main ride title */
  title: string;

  /** Editorial subtitle / descriptor (e.g. "Weekend Forest & Mountain Run") */
  subtitle: string;

  /** ISO 8601 Date (YYYY-MM-DD) for sorting & programmatic comparison */
  date: string;

  /** Formatted date string for editorial display (e.g. "22 NOV 2026") */
  displayDate: string;

  /** Lifecycle status */
  status: RideStatus;

  /** Controlled ride classification */
  type: RideType;

  /** Human-readable format label (e.g. "Weekend Ride", "Breakfast Ride") */
  typeLabel: string;

  /** Starting point landmark */
  origin: string;

  /** Destination landmark or territory */
  destination: string;

  /** Terrain & elevation summary (e.g. "Mountain Curves & Forest Canopy") */
  terrain: string;

  /** Formatted distance string (e.g. "320 KM Roundtrip", "1,850 KM Interstate") */
  distance: string;

  /** Approximate numeric distance in kilometers for filtering and telemetry */
  distanceKm: number;

  /** Duration label (e.g. "Single Day / 8 Hours", "7 Days / 6 Nights") */
  durationLabel: string;

  /** Concise 1-2 sentence overview for cards and listings */
  shortDescription: string;

  /** Comprehensive editorial narrative for detailed views */
  description: string;

  /** Primary photographic asset URL */
  coverImage: string;

  /** Image asset collection */
  gallery: string[];

  /** Topical tags for filtering & badges */
  tags: string[];

  /** Bullet points of road highlights, mandates & experiences */
  publicHighlights: string[];

  /** Staging & departure landmark */
  departureLandmark: string;

  /** Scheduled rollout time */
  rolloutTime: string;

  /** Technical road description */
  routeCharacter: string;

  /** Optional intermediate route waypoint */
  midwayWaypoint?: string;

  /** Presentation and visibility flags */
  display: RideDisplayConfig;
}

export interface RideFilterState {
  status: RideFilterStatus;
  type: RideFilterType;
  searchQuery: string;
}

// Backwards compatibility alias
export type RideHighlight = Ride;

export interface CommunityPillar {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  metrics?: {
    value: string;
    label: string;
  };
}
