export interface RideHighlight {
  id: string;
  title: string;
  subtitle: string;
  category:
    | "Weekend Run"
    | "Chai & Breakfast"
    | "Highway Expedition"
    | "Night Stroll"
    | "Forest Trail"
    | "Coastal Run"
    | "Himalayan Pass";
  distanceKm: number;
  durationLabel: string;
  origin: string;
  destination: string;
  terrain: string;
  summary: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
}

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
