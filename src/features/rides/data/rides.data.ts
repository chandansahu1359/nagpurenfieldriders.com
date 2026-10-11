import { Ride } from "../types";

/**
 * Canonical Single Source of Truth for Nagpur Enfield Riders (NER) Expeditions.
 * 
 * Every organized ride, rollout, and highway expedition is declared exactly once here.
 * Components across the website (Homepage, /rides/, /about/, etc.) query this collection
 * via selectors and display configuration flags rather than maintaining separate arrays.
 */
export const RIDES_DATA: Ride[] = [
  {
    id: "satpura-ghat-dawn-run",
    slug: "satpura-ghat-dawn-run",
    title: "Satpura Mist & Forest Ghats",
    subtitle: "Weekend Forest & Mountain Run",
    date: "2026-11-22",
    displayDate: "22 NOV 2026",
    status: "upcoming",
    type: "weekend",
    typeLabel: "Weekend Ride",
    origin: "Nagpur Zero Mile",
    destination: "Satpura Hills via Betul Border",
    terrain: "Mountain Curves & Forest Canopy",
    distance: "320 KM Roundtrip",
    distanceKm: 320,
    durationLabel: "Single Day / 8 Hours",
    shortDescription:
      "A two-stroke of dawn air, climbing through the Satpura elevation curves as morning mist settles over the Sal forests.",
    description:
      "Departing under cold morning shadows from Zero Mile, the pack rolls northwest through NH47 before peeling off into undulating ghat tarmac. With elevation shifting and ambient temperatures dropping, this ride is calibrated for rhythmic throttle control and disciplined formation riding through sweeping tree corridors.",
    coverImage: "/images/rides/satpura-ghats.jpg",
    gallery: [
      "/images/rides/satpura-ghats.jpg",
      "/images/rides/dawn-pack.jpg",
      "/images/community/chai-dhaba-dawn.jpg",
    ],
    tags: ["Satpura Ghats", "Forest Canopy", "Weekend Ride"],
    publicHighlights: [
      "Crisp dawn ascent into Satpura ridge curves",
      "Staggered formation through dense forest reserves",
      "Roadside roadside chai stop along state border lines",
      "Return cruise before late afternoon highway congestion",
    ],
    departureLandmark: "Zero Mile Stone, Civil Lines, Nagpur",
    rolloutTime: "05:00 AM Sharp",
    routeCharacter: "Smooth national corridor branching into technical ghat sweeping curves",
    midwayWaypoint: "NH47 Betul Interstate Corridor",
    display: {
      homepage: false,
      ridesPage: true,
      featured: true,
    },
  },
  {
    id: "pench-buffer-dawn-patrol",
    slug: "pench-buffer-dawn-patrol",
    title: "Pench Tiger Corridor Breakfast Rollout",
    subtitle: "Weekend Forest Run",
    date: "2026-12-06",
    displayDate: "06 DEC 2026",
    status: "upcoming",
    type: "breakfast",
    typeLabel: "Breakfast Ride",
    origin: "Nagpur Zero Mile",
    destination: "Pench Buffer Fringe, MP Border",
    terrain: "NH44 Elevated Wildlife Corridor & Forest S-Curves",
    distance: "160 KM Roundtrip",
    distanceKm: 160,
    durationLabel: "Single Day / 6 Hours",
    shortDescription:
      "A crisp winter morning blast along the famed elevated forest corridor of NH44, concluding at a rustic dhaba for hot poha and ginger tea.",
    description:
      "The classic Sunday ritual for Nagpur Enfield Riders. We roll out before sunrise, cruising as a tight staggered unit over the iconic elevated wildlife passes on NH44. The air cools noticeably as we brush past tiger country, pulling into our regular breakfast halt just as the sun breaks the horizon.",
    coverImage: "/images/destinations/pench-forest.jpg",
    gallery: [
      "/images/destinations/pench-forest.jpg",
      "/images/community/chai-dhaba-dawn.jpg",
    ],
    tags: ["Weekend Ride", "Canopy Highway", "Breakfast Run"],
    publicHighlights: [
      "Winter morning chill cutting across the Vidarbha plains",
      "Cruising the world-class elevated forest highway corridor",
      "Traditional hot roadside breakfast and rider fellowship",
      "Early midday return keeping the rest of Sunday open",
    ],
    departureLandmark: "Zero Mile Monument, Nagpur",
    rolloutTime: "05:30 AM",
    routeCharacter: "Fast, disciplined highway cruising with gentle wildlife overpasses",
    midwayWaypoint: "NH44 Elevated Wildlife Overpass",
    display: {
      homepage: true,
      ridesPage: true,
      featured: false,
    },
  },
  {
    id: "tarkeshwar-starlight-night-cruise",
    slug: "tarkeshwar-starlight-night-cruise",
    title: "Vidarbha Starlight Night Run",
    subtitle: "Nocturnal Highway Run",
    date: "2026-12-19",
    displayDate: "19 DEC 2026",
    status: "upcoming",
    type: "night",
    typeLabel: "Night Ride",
    origin: "Nagpur Zero Mile",
    destination: "Outer Ring Expressway to Umred Bypass",
    terrain: "Night Highway & Clear Skies",
    distance: "110 KM Loop",
    distanceKm: 110,
    durationLabel: "Single Evening / 4 Hours",
    shortDescription:
      "Empty tarmac under the winter constellations. Single beam headlights carving through calm nocturnal air.",
    description:
      "When the city settles into silence, the true mechanical rhythm of Royal Enfield singles comes alive. This controlled night cruise emphasizes precision lighting, rear tail discipline, and zero-distraction cruising across open bypass corridors.",
    coverImage: "/images/events/camping-bonfire.jpg",
    gallery: ["/images/events/camping-bonfire.jpg"],
    tags: ["Night Ride", "Outer Ring Road", "Starlight Cruise"],
    publicHighlights: [
      "Cool nocturnal temperatures with minimal commuter traffic",
      "Strict lighting protocol and high-vis reflective compliance",
      "Midnight tea stall debriefing at the highway junction",
    ],
    departureLandmark: "Zero Mile Stone, Nagpur",
    rolloutTime: "09:30 PM",
    routeCharacter: "Wide bypass tarmac with long sightlines and ambient moonlight",
    midwayWaypoint: "Outer Ring Expressway Junction",
    display: {
      homepage: false,
      ridesPage: true,
      featured: false,
    },
  },
  {
    id: "chikhaldara-monsoon-expedition-2026",
    slug: "chikhaldara-monsoon-expedition-2026",
    title: "Chikhaldara Cloudburst Escarpment",
    subtitle: "Melghat Plateau Monsoon Tour",
    date: "2026-08-15",
    displayDate: "15 AUG 2026",
    status: "completed",
    type: "weekend",
    typeLabel: "Weekend Ride",
    origin: "Nagpur Zero Mile",
    destination: "Chikhaldara Plateau, Melghat",
    terrain: "Monsoon Ghats & Water Crossings",
    distance: "460 KM Roundtrip",
    distanceKm: 460,
    durationLabel: "3 Days / 2 Nights",
    shortDescription:
      "Three days of cloud-soaked climbing, coffee plantation twists, and waterproof boots through the Melghat plateau.",
    description:
      "Nagpur Enfield Riders tackled the torrential southwest monsoon climbs up to Vidarbha's sole hill station. Rains lashed the headlight glass as steady thumps echoed off rocky canyon walls, forging deeper rider bonds through weather discipline.",
    coverImage: "/images/rides/dawn-pack.jpg",
    gallery: [
      "/images/rides/dawn-pack.jpg",
      "/images/rides/satpura-ghats.jpg",
    ],
    tags: ["Monsoon Ghats", "Melghat", "Hill Station"],
    publicHighlights: [
      "Navigating low visibility fog at 1,118m elevation",
      "Zero mechanical retirements across challenging wet hairpins",
      "Melghat forest buffer immersion under active rainfall",
    ],
    departureLandmark: "Zero Mile Stone, Nagpur",
    rolloutTime: "04:30 AM",
    routeCharacter: "Heavy rain mountain ascent with slick corners and misty hairpins",
    midwayWaypoint: "Amravati Bypass to Ghat Base",
    display: {
      homepage: false,
      ridesPage: true,
      featured: false,
    },
  },
  {
    id: "konkan-coastal-long-haul-2026",
    slug: "konkan-coastal-long-haul-2026",
    title: "Western Ghats to Konkan Sea Breeze",
    subtitle: "Annual Monsoon / Winter Tour",
    date: "2026-01-26",
    displayDate: "26 JAN 2026",
    status: "completed",
    type: "touring",
    typeLabel: "Touring",
    origin: "Nagpur Zero Mile",
    destination: "South Konkan Coast via Kolhapur",
    terrain: "Deccan Plateau, Chorla Ghat Hairpins & Coastal Tarmac",
    distance: "1,850 KM Interstate",
    distanceKm: 1850,
    durationLabel: "7 Days / 6 Nights",
    shortDescription:
      "An enduring overland trans-Maharashtra journey from the geometric center of India to the roaring Arabian tides.",
    description:
      "Seven days on the road. From the black soil cotton belt of Vidarbha across the Deccan volcanic plateau down through Amboli Ghat to pristine Konkan fishing hamlets. A masterclass in long-distance pack stamina and endurance packing.",
    coverImage: "/images/destinations/goa-coastal.jpg",
    gallery: [
      "/images/destinations/goa-coastal.jpg",
      "/images/community/chai-dhaba-dawn.jpg",
    ],
    tags: ["Ghats Twisties", "Coastal Highway", "Multi-Day Tour"],
    publicHighlights: [
      "Endurance mileage pacing: 350-450 km daily legs",
      "Descending the historic Amboli Ghat hairpin drops",
      "Sunset motorcycle line-up overlooking the Arabian Sea",
    ],
    departureLandmark: "Zero Mile Stone, Nagpur",
    rolloutTime: "04:00 AM",
    routeCharacter: "Multi-day continental touring across diverse geological terrains",
    midwayWaypoint: "Kolhapur Plateau & Amboli Descent",
    display: {
      homepage: true,
      ridesPage: true,
      featured: false,
    },
  },
  {
    id: "great-himalayan-cross-pass-2025",
    slug: "great-himalayan-cross-pass-2025",
    title: "High Altitude Passes of Ladakh",
    subtitle: "Flagship High Altitude Odyssey",
    date: "2025-07-12",
    displayDate: "12 JUL 2025",
    status: "completed",
    type: "special",
    typeLabel: "Special Expedition",
    origin: "Nagpur Zero Mile",
    destination: "Leh, Chang La & Nubra Valley",
    terrain: "Plains, Rohtang / Zoji La Axis, High Altitude Glacial Passes",
    distance: "2,400 KM Alpine Leg",
    distanceKm: 2400,
    durationLabel: "14 Days Trans-India",
    shortDescription:
      "Thin air, cold winds, and Himalayan rock corridors where every machine thump is tested against gravity and oxygen levels.",
    description:
      "A signature multi-week expedition undertaken by experienced NER endurance riders. Navigating water crossings, sub-zero dawn starts, and pass summits above 17,500 feet with complete camaraderie and mechanical mutual-aid.",
    coverImage: "/images/destinations/ladakh-pass.jpg",
    gallery: [
      "/images/destinations/ladakh-pass.jpg",
      "/images/gallery/tank-gloves-macro.jpg",
    ],
    tags: ["High Altitude", "Khardung La", "Flagship Expedition"],
    publicHighlights: [
      "Ascents above 17,500 ft elevation with tuned carburetion/EFI",
      "Meltwater river crossings negotiated without single breakdown",
      "Zero Mile flag flown high at Himalayan mountain ridges",
    ],
    departureLandmark: "Zero Mile Base / Transport staging point",
    rolloutTime: "Dawn",
    routeCharacter: "Extreme high-altitude gravel passes, river beds and glacial plateaus",
    midwayWaypoint: "Manali & Zoji La Axis",
    display: {
      homepage: true,
      ridesPage: true,
      featured: false,
    },
  },
  {
    id: "tadoba-fringe-sunset-run-2025",
    slug: "tadoba-fringe-sunset-run-2025",
    title: "Tadoba Tiger Buffer Peripheral Run",
    subtitle: "Teak Forest Peripheral Route",
    date: "2025-11-08",
    displayDate: "08 NOV 2025",
    status: "completed",
    type: "weekend",
    typeLabel: "Weekend Ride",
    origin: "Nagpur Zero Mile",
    destination: "Moharli Buffer Zone, Chandrapur Fringe",
    terrain: "Teak Forest Corridors & Red Earth Lanes",
    distance: "280 KM Roundtrip",
    distanceKm: 280,
    durationLabel: "Single Day / Overnight",
    shortDescription:
      "A sensory ride under towering teak trees, dry bamboo breaks, and the warm red dust of Vidarbha's deepest wildlife sanctuary edge.",
    description:
      "A peaceful autumn ride hugging the outer boundary perimeter roads of Tadoba Andhari Tiger Reserve. Quiet throttle control, respect for wildlife silence corridors, and dusk reflections beside Erai lake.",
    coverImage: "/images/destinations/pench-forest.jpg",
    gallery: ["/images/destinations/pench-forest.jpg"],
    tags: ["Tiger Reserve", "Buffer Zone", "Teak Canopy"],
    publicHighlights: [
      "Silent cruising through designated buffer zone corridors",
      "Golden hour motorcycle silhouettes alongside lake waterlines",
      "Overnight lakeside campsite debrief under star-filled skies",
    ],
    departureLandmark: "Zero Mile Stone, Nagpur",
    rolloutTime: "06:00 AM",
    routeCharacter: "Dense canopy tree-lined rural tarmac and rustic red earth shoulders",
    midwayWaypoint: "Chandrapur Forest Bypass",
    display: {
      homepage: false,
      ridesPage: true,
      featured: false,
    },
  },
  {
    id: "thar-desert-winter-odyssey-2024",
    slug: "thar-desert-winter-odyssey-2024",
    title: "Thar Desert Horizon Frontier",
    subtitle: "Golden Dunes Trans-State Tour",
    date: "2024-12-10",
    displayDate: "10 DEC 2024",
    status: "completed",
    type: "touring",
    typeLabel: "Touring",
    origin: "Nagpur Zero Mile",
    destination: "Jaisalmer & Longewala Border",
    terrain: "Desert Asphalt & Shifting Golden Dunes",
    distance: "2,200 KM Interstate",
    distanceKm: 2200,
    durationLabel: "9 Days / 8 Nights",
    shortDescription:
      "Straight desert highways cutting through endless golden sands, cold desert nights, and border milestone tributes.",
    description:
      "Crossing central India into the vast sands of Rajasthan. Days of unrelenting straight horizon lines with the rhythmic cadence of the long-stroke engine carrying the riders to the borderlands.",
    coverImage: "/images/destinations/rajasthan-desert.jpg",
    gallery: ["/images/destinations/rajasthan-desert.jpg"],
    tags: ["Desert Highway", "Longewala", "Interstate Tour"],
    publicHighlights: [
      "Cruising endless single-track desert ribbons near Sam dunes",
      "Sub-zero desert dawn starts with frozen dew on instrument clusters",
      "Respects paid at historic Longewala border post",
    ],
    departureLandmark: "Zero Mile Stone, Nagpur",
    rolloutTime: "04:00 AM",
    routeCharacter: "Flat, wind-swept desert expressways and open borderland tarmac",
    midwayWaypoint: "Bikaner & Pokhran Highway Stretch",
    display: {
      homepage: false,
      ridesPage: true,
      featured: false,
    },
  },
];

// --- CANONICAL SELECTORS & QUERIES ---

/**
 * Returns all rides in the system.
 */
export const getAllRides = (): Ride[] => {
  return RIDES_DATA;
};

/**
 * Returns rides designated for the Homepage Featured Expeditions showcase.
 */
export const getHomepageRides = (): Ride[] => {
  return RIDES_DATA.filter((ride) => ride.display.homepage);
};

/**
 * Returns the primary featured upcoming ride for the /rides/ page hero banner.
 */
export const getFeaturedRide = (): Ride | null => {
  return (
    RIDES_DATA.find(
      (ride) => ride.display.featured && ride.status === "upcoming"
    ) || null
  );
};

/**
 * Returns all rides designated to appear on the public /rides/ page.
 */
export const getRidesForRidesPage = (): Ride[] => {
  return RIDES_DATA.filter((ride) => ride.display.ridesPage);
};

/**
 * Returns upcoming rides, excluding the premier featured ride if already showcased.
 */
export const getUpcomingRides = (excludeFeatured = true): Ride[] => {
  return RIDES_DATA.filter((ride) => {
    if (ride.status !== "upcoming" || !ride.display.ridesPage) return false;
    if (excludeFeatured && ride.display.featured) return false;
    return true;
  });
};

/**
 * Returns completed rides for the logbook archive.
 */
export const getCompletedRides = (): Ride[] => {
  return RIDES_DATA.filter(
    (ride) => ride.status === "completed" && ride.display.ridesPage
  );
};

/**
 * Look up a ride by its URL slug.
 */
export const getRideBySlug = (slug: string): Ride | undefined => {
  return RIDES_DATA.find((ride) => ride.slug === slug);
};

/**
 * Look up a ride by its unique ID.
 */
export const getRideById = (id: string): Ride | undefined => {
  return RIDES_DATA.find((ride) => ride.id === id);
};

// --- FILTER CONSTANTS ---

export const RIDE_CATEGORIES = [
  { value: "all", label: "All Types" },
  { value: "breakfast", label: "Breakfast Ride" },
  { value: "weekend", label: "Weekend Ride" },
  { value: "long", label: "Long Distance" },
  { value: "night", label: "Night Ride" },
  { value: "touring", label: "Touring" },
  { value: "special", label: "Special Expedition" },
] as const;

export const RIDE_STATUS_OPTIONS = [
  { value: "all", label: "All Rides" },
  { value: "upcoming", label: "Upcoming Rollouts" },
  { value: "completed", label: "Road Archive" },
] as const;
