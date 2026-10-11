import { SITE_CONFIG } from "@/constants/site";

export interface CulturePillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  principles: string[];
}

export interface ExperienceFormat {
  title: string;
  subhead: string;
  description: string;
  image: string;
  tag: string;
}

export const ABOUT_HERO_DATA = {
  badge: "INDEPENDENT MOTORCYCLE FRATERNITY",
  title: "NAGPUR ENFIELD RIDERS",
  subtitle: "A community built around motorcycles, roads, and people.",
  coordinates: SITE_CONFIG.zeroMileCoordinates,
  coordinatesUrl: SITE_CONFIG.zeroMileMapsUrl,
  quote:
    "We don't ride to outrun anything. We ride because out on the open highway, the world slows down to the rhythm of a single cylinder.",
};

export const ABOUT_ORIGIN_DATA = {
  badge: "THE ORIGIN • ZERO MILE",
  headline: "THE CROSSROADS OF THE SUBCONTINENT",
  intro:
    "Nagpur Enfield Riders was born where every journey in India begins: at the historic Zero Mile Stone in Nagpur.",
  narrative1:
    "Nagpur sits at the literal center of India. To our north runs NH44 toward the Himalayas; to our south it descends toward Kanyakumari; east and west, the arterial tarmac of NH53 spans from coast to coast. In this city of long horizons, a fraternity of Royal Enfield riders came together around a simple shared truth: motorcycles are best experienced in good company and with unwavering discipline.",
  narrative2:
    "NER is entirely independent. We are not a corporate marketing initiative, nor are we owned or operated by Royal Enfield. We are an authentic community of owners, touring enthusiasts, and everyday working professionals who ride Royal Enfield motorcycles with profound respect for the road.",
  coordinates: SITE_CONFIG.zeroMileCoordinates,
};

export const ABOUT_PHILOSOPHY_DATA = {
  badge: "RIDING PHILOSOPHY",
  headline: "NOT FOR SPEED. NOT FOR EGO. FOR THE ROAD.",
  subhead: "The open highway is an equalizer. Out there, your title doesn't matter.",
  statement:
    "We believe in the therapeutic cadence of the Royal Enfield thump. We ride at disciplined touring paces where you can smell the damp earth after rain, feel the mountain chill biting through your gloves, and watch the dawn mist burn off national highways.",
  quoteAuthor: "THE NER CREED",
};

export const ABOUT_CULTURE_PILLARS: CulturePillar[] = [
  {
    number: "01",
    title: "SAFETY",
    tagline: "PROTECTION BEFORE IGNITION",
    description:
      "Every ride begins with mandatory safety equipment inspection. No rider or pillion turns a wheel without full protective gear.",
    principles: [
      "Certified full-face helmets",
      "Impact-rated armor on chest, back & joints",
      "Valid motorcycle paperwork on every machine",
    ],
  },
  {
    number: "02",
    title: "DISCIPLINE",
    tagline: "FORMATION & COHESION",
    description:
      "Riding in a pack requires synchronization. We ride in staggered formation with designated Lead and Sweep road captains.",
    principles: [
      "Staggered lane discipline",
      "Standardized hand & mirror signals",
      "Strict overtaking etiquette & speed limits",
    ],
  },
  {
    number: "03",
    title: "COMMUNITY",
    tagline: "THE PACK PROTECTS ITS OWN",
    description:
      "Veterans mentor newcomers. We share mechanical knowledge, roadside troubleshooting, and ensure no rider is left behind.",
    principles: [
      "No rider left stranded on any highway",
      "Technical mentorship for new riders",
      "Egoless camaraderie across generations",
    ],
  },
  {
    number: "04",
    title: "RESPONSIBILITY",
    tagline: "ABSOLUTE SOBRIETY & RESPECT",
    description:
      "We maintain an uncompromising zero-tolerance policy against substance use. We respect local communities and pedestrians.",
    principles: [
      "Strict zero alcohol or narcotics policy",
      "No reckless stunts or public endangerment",
      "Respect for rural villages & wildlife zones",
    ],
  },
  {
    number: "05",
    title: "EXPERIENCE",
    tagline: "STORIES WRITTEN ON ODOMETERS",
    description:
      "The value of a ride is measured in shared laughter over roadside chai, quiet campfire nights, and roads conquered together.",
    principles: [
      "Dawn breakfast runs to regional dhabas",
      "Multi-day expeditions across mountain passes",
      "Monsoon exploration through forest reserves",
    ],
  },
];

export const ABOUT_SAFETY_PROTOCOLS = [
  {
    id: "helmet",
    title: "Full-Face Certified Helmet",
    detail: "Must be ISI, DOT, or ECE certified. Open-face and novelty headwear are strictly prohibited.",
  },
  {
    id: "gear",
    title: "Armored Riding Jacket & Knee Guards",
    detail: "Abrasion-resistant textiles or leather with CE-certified impact armor for joints and spine.",
  },
  {
    id: "formation",
    title: "Lead & Sweep Staggered Formation",
    detail: "Designated road captains establish pace and protect the rear. No unauthorized overtaking of the Lead.",
  },
  {
    id: "sobriety",
    title: "Strict Zero Tolerance Sobriety",
    detail: "Zero alcohol or intoxicating substances before or during any ride. Immediate permanent removal for violations.",
  },
  {
    id: "documents",
    title: "Valid Machine & Rider Documentation",
    detail: "Valid Driving License, Bike RC, comprehensive insurance, and updated PUC certificate must accompany the rider.",
  },
  {
    id: "pillion",
    title: "Full Protective Gear for Pillion Riders",
    detail: "Passengers must wear certified full helmets, sturdy footwear, and protective clothing equal to the rider.",
  },
];

export const ABOUT_EXPERIENCES: ExperienceFormat[] = [
  {
    title: "DAWN BREAKFAST RUNS",
    subhead: "Morning Mist & Steaming Chai",
    description:
      "Rollouts at 5:00 AM before the city wakes. 80 to 150 km outbound runs along open bypasses followed by roadside dhaba breakfast.",
    image: "/images/community/chai-dhaba-dawn.jpg",
    tag: "EVERY WEEKEND",
  },
  {
    title: "FOREST CORRIDORS",
    subhead: "Pench & Satpura Tiger Country",
    description:
      "Winding through dense sal and teak canopies. Slow-paced rides respecting silent ecological corridors and wildlife buffer zones.",
    image: "/images/destinations/pench-forest.jpg",
    tag: "MONSOON & WINTER",
  },
  {
    title: "HIGH-ALTITUDE EXPEDITIONS",
    subhead: "Himalayan Passes & Cold Desert Tarmac",
    description:
      "Annual expeditions crossing world-renowned passes. Pushing rider endurance and mechanical reliability through extreme elevations.",
    image: "/images/destinations/ladakh-pass.jpg",
    tag: "ANNUAL TOURING",
  },
  {
    title: "COASTAL ESCAPES",
    subhead: "Western Ghats to Arabian Seaboard",
    description:
      "Carving through lush mountain ghats down into coastal salt air. Long-distance road trip rhythm with evening campfires.",
    image: "/images/destinations/goa-coastal.jpg",
    tag: "INTERSTATE EXPEDITION",
  },
];
