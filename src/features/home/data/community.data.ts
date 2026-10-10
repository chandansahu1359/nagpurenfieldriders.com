import { CommunityPillar } from "@/types";

export const COMMUNITY_PILLARS: CommunityPillar[] = [
  {
    id: "chai-breakfast",
    title: "The Dawn Chai & Dhaba Ritual",
    subtitle: "Weekend Culture",
    tagline: "4:30 AM engines warm up. 6:30 AM hot cutting chai.",
    description:
      "Riding isn't just about high speed; it is about early morning highway fog, the collective click into first gear, and pulling over at an open roadside dhaba for steaming tea and camaraderie before the city wakes up.",
    image: {
      src: "/images/community/chai-dhaba-dawn.jpg",
      alt: "NER riders gathered at roadside dhaba drinking tea and laughing together",
    },
    metrics: {
      value: "52+",
      label: "Sunrise Runs Per Year",
    },
  },
  {
    id: "safety-discipline",
    title: "Discipline Before Throttle",
    subtitle: "Riding Protocol",
    tagline: "No gear, no ride. Staggered formation. Zero reckless stunts.",
    description:
      "Every NER ride operates with disciplined military precision: a designated Lead Rider setting pace, a vigilant Sweep maintaining the pack, and two-way hand signals across every kilometer. Brotherhood means keeping each other safe.",
    image: {
      src: "/images/hero/hero-cinematic.jpg",
      alt: "Rider in complete protective gear with helmet and jacket on open highway",
    },
    metrics: {
      value: "100%",
      label: "Protective Gear Mandate",
    },
  },
  {
    id: "long-distance",
    title: "The Zero Mile Endurance",
    subtitle: "Long Distance Touring",
    tagline: "From the geographic heart of India to every coast and crest.",
    description:
      "Nagpur sits at the very center of India. When NER rides out, every direction is an epic highway waiting to be unrolled. Whether enduring 14-hour monsoon saddles or cold desert winds, we ride side by side.",
    image: {
      src: "/images/destinations/rajasthan-desert.jpg",
      alt: "Long distance motorcycle touring over open desert highway",
    },
    metrics: {
      value: "1,750 KM",
      label: "Farthest Single Expedition",
    },
  },
];

export const NER_CREED = [
  {
    number: "01",
    title: "The Rider Before The Machine",
    text: "We honor the person behind the handlebars. Respect, humility, and unwavering support on and off the asphalt.",
  },
  {
    number: "02",
    title: "Safety is Non-Negotiable",
    text: "Certified helmets, protective jackets, boots, and disciplined staggered formations on every single ride.",
  },
  {
    number: "03",
    title: "Leave No Rider Stranded",
    text: "Puncture on an empty highway? Mechanical stall in the ghats? We stop together, fix it together, and roll out together.",
  },
  {
    number: "04",
    title: "Respect Every Road & Town",
    text: "No aggressive revving in quiet towns, no reckless overtaking, zero alcohol on rides, and utmost respect for local communities.",
  },
];
