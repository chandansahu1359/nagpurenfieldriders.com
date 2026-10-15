import { EventType, EventStatus } from "@/types";

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  all: "All Gatherings",
  meetup: "Brotherhood Meet",
  camping: "Wilderness Camp",
  safety: "Safety Briefing",
  maintenance: "Wrench & Grease",
  celebration: "Anniversary / Milestone",
  social: "Social Gathering",
};

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  all: "All Events",
  upcoming: "Scheduled",
  past: "Past Events",
};
