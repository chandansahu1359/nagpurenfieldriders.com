import { RideHighlight } from "@/types";

export const FEATURED_EXPEDITIONS: RideHighlight[] = [
  {
    id: "pench-sunrise-run",
    title: "Pench Canopy Dawn Patrol",
    subtitle: "Weekend Forest Run",
    category: "Forest Trail",
    distanceKm: 180,
    durationLabel: "Single Day / 6 Hours",
    origin: "Nagpur Zero Mile",
    destination: "Pench Tiger Reserve Border",
    terrain: "NH44 Elevated Wildlife Corridor & Forest S-Curves",
    summary:
      "A fast dawn sprint across the elevated green corridor through teak forests. The crisp morning chill, dew on visors, and steaming breakfast at the forest perimeter.",
    tags: ["Weekend Ride", "Canopy Highway", "Breakfast Run"],
    image: {
      src: "/images/destinations/pench-forest.jpg",
      alt: "Morning motorcycle ride through Pench forest corridor",
    },
  },
  {
    id: "konkan-coastal-odyssey",
    title: "Western Ghats to Arabian Surf",
    subtitle: "Annual Monsoon / Winter Tour",
    category: "Coastal Run",
    distanceKm: 950,
    durationLabel: "5 Days / 4 Nights",
    origin: "Nagpur Zero Mile",
    destination: "Vagator & South Goa",
    terrain: "Deccan Plateau, Chorla Ghat Hairpins & Coastal Tarmac",
    summary:
      "Descending through mist-laden Western Ghats down to sun-soaked coastal highways. The transition from dry plateau to humid sea breeze in a single continuous expedition.",
    tags: ["Ghats Twisties", "Coastal Highway", "Multi-Day Tour"],
    image: {
      src: "/images/destinations/goa-coastal.jpg",
      alt: "Cruising down coastal road along Goa coastline",
    },
  },
  {
    id: "ladakh-trans-himalaya",
    title: "Zero Mile to Roof of the World",
    subtitle: "Flagship High Altitude Odyssey",
    category: "Himalayan Pass",
    distanceKm: 1750,
    durationLabel: "14 Days Trans-India",
    origin: "Nagpur Zero Mile",
    destination: "Khardung La (17,582 ft)",
    terrain: "Plains, Rohtang / Zoji La Axis, High Altitude Glacial Passes",
    summary:
      "The definitive test of man and machine. Starting from central India's heat, climbing past the tree line into thin air, frozen water crossings, and high mountain silence.",
    tags: ["High Altitude", "Khardung La", "Flagship Expedition"],
    image: {
      src: "/images/destinations/ladakh-pass.jpg",
      alt: "Adventure motorcycle crossing mountain pass in Ladakh",
    },
  },
];
