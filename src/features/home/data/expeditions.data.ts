import { getHomepageRides, Ride } from "@/features/rides";

/**
 * Featured Expeditions for Homepage.
 * 
 * Sourced dynamically from the canonical single source of truth in `@/features/rides`.
 * Any ride with `display.homepage: true` is automatically included here.
 */
export const FEATURED_EXPEDITIONS: Ride[] = getHomepageRides();
