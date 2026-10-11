export type RideStatus = "all" | "upcoming" | "completed";

export type RideType =
  | "all"
  | "breakfast"
  | "weekend"
  | "long"
  | "night"
  | "camping"
  | "touring"
  | "special";

export interface Ride {
  id: string;
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  status: "upcoming" | "completed";
  type: Exclude<RideType, "all">;
  typeLabel: string;
  destination: string;
  terrain: string;
  distance: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  publicHighlights: string[];
  departureLandmark: string;
  rolloutTime: string;
  routeCharacter: string;
  featured?: boolean;
}

export interface RideFilterState {
  status: RideStatus;
  type: RideType;
  searchQuery: string;
}
