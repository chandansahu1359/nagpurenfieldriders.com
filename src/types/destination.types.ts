export type CardinalDirection =
  | "North"
  | "South"
  | "East"
  | "West"
  | "Northwest"
  | "Northeast"
  | "Central";

export interface RideDestination {
  id: string;
  name: string;
  state: string;
  distanceKm: number;
  distanceLabel: string;
  roadRoute: string;
  terrain: string;
  elevation?: string;
  direction: CardinalDirection;
  typicalDuration: string;
  highlights: string[];
  image: {
    src: string;
    alt: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  vectorAngleDeg: number;
  category: "Epic Tour" | "Coastal Run" | "Himalayan Pass" | "Desert Odyssey" | "Forest Trail";
  isIllustrativePlaceholder?: boolean;
}
