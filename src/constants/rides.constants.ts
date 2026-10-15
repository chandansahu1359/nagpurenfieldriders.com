import { RideType, RideStatus, RideFilterStatus, RideFilterType } from "@/types";

export const RIDE_TYPE_LABELS: Record<RideType, string> = {
  breakfast: "Breakfast Ride",
  weekend: "Weekend Ride",
  long: "Long Haul",
  night: "Night Ride",
  camping: "Camping Ride",
  touring: "Touring Expedition",
  special: "Special Expedition",
};

export const RIDE_STATUS_LABELS: Record<RideStatus, string> = {
  upcoming: "Upcoming Rollout",
  completed: "Completed Run",
  ongoing: "Rolling Now",
  cancelled: "Stand Down",
};

export const RIDE_FILTER_STATUS_LABELS: Record<RideFilterStatus, string> = {
  all: "All Dispatches",
  upcoming: "Upcoming",
  completed: "Archive",
};

export const RIDE_FILTER_TYPE_LABELS: Record<RideFilterType, string> = {
  all: "All Formats",
  breakfast: "Breakfast",
  weekend: "Weekend",
  long: "Long Haul",
  night: "Night",
  camping: "Camping",
  touring: "Touring",
  special: "Special",
};
