/**
 * Global Ride and Community Types
 * 
 * Re-exports canonical Ride types from the rides feature module
 * and defines related community pillars.
 */

export * from "@/features/rides/types";

// Re-export Ride as RideHighlight for backwards compatibility
export type { Ride as RideHighlight } from "@/features/rides/types";

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
