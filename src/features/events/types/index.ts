export type EventStatus = "all" | "upcoming" | "past";

export type EventType =
  | "all"
  | "meetup"
  | "camping"
  | "safety"
  | "maintenance"
  | "celebration"
  | "social";

export interface CommunityEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  time: string;
  status: "upcoming" | "past";
  type: Exclude<EventType, "all">;
  typeLabel: string;
  location: string;
  venueLandmark: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  highlights: string[];
  featured?: boolean;
  communityCapacityNote?: string;
}

export interface EventFilterState {
  status: EventStatus;
  type: EventType;
  searchQuery: string;
}
