export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  isExternal?: boolean;
}

export interface MegaMenuCategory {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuFeatured {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export const HEADER_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About NER", href: "/about" },
  { label: "Rides", href: "/rides" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

export const MEGA_MENU_CATEGORIES: Record<string, MegaMenuCategory> = {
  about: {
    title: "ABOUT",
    items: [
      {
        label: "About NER",
        href: "/about",
        description: "An authentic, independent fraternity of Enfield riders.",
      },
      {
        label: "Our Story",
        href: "/about#story",
        description: "From India's Zero Mile to brotherhood across highways.",
      },
      {
        label: "Ride Culture",
        href: "/about#culture",
        description: "Discipline, camaraderie, and dawn highway tea stops.",
      },
    ],
  },
  riding: {
    title: "RIDING",
    items: [
      {
        label: "Rides",
        href: "/rides",
        description: "From sunrise breakfast runs to cross-country touring.",
      },
      {
        label: "Events",
        href: "/events",
        description: "Annual gatherings, foundation runs & milestone expeditions.",
      },
      {
        label: "Safety Protocol",
        href: "/about#protocols",
        description: "Strict staggered formation, protective gear & document rules.",
      },
    ],
  },
  explore: {
    title: "EXPLORE",
    items: [
      {
        label: "Gallery",
        href: "/gallery",
        description: "Visual chronicles of bikes, passes, and asphalt ribbons.",
      },
      {
        label: "Destinations Radar",
        href: "/#destinations",
        description: "Routes radiating outward from Zero Mile to Ladakh & Goa.",
      },
      {
        label: "Road Experiences",
        href: "/about#story",
        description: "Dawn breakfast runs, forest corridors & interstate expeditions.",
      },
    ],
  },
  connect: {
    title: "CONNECT",
    items: [
      {
        label: "Contact Us",
        href: "/contact",
        description: "Official dispatch desk for enquiries, coordinates & messages.",
      },
      {
        label: "Instagram",
        href: "https://instagram.com",
        isExternal: true,
        description: "@nagpurenfieldriders • Live ride dispatches.",
      },
      {
        label: "YouTube",
        href: "https://youtube.com",
        isExternal: true,
        description: "Cinematic expedition films & documentary archives.",
      },
      {
        label: "Facebook",
        href: "https://facebook.com",
        isExternal: true,
        description: "Nagpur Enfield Riders official community page.",
      },
    ],
  },
};

export const MEGA_MENU_FEATURED: MegaMenuFeatured = {
  badge: "NEXT EXPEDITION",
  title: "THE PACK RIDES AT DAWN",
  subtitle: "5:00 AM Rollout • Zero Mile Stone",
  description:
    "Synchronized thumps cutting through morning mist. Breakfast, chai, and an open national highway.",
  image: "/images/community/chai-dhaba-dawn.jpg",
  ctaLabel: "Explore Expeditions →",
  ctaHref: "/rides",
};

export interface FooterNavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterNavColumn {
  title: string;
  items: FooterNavItem[];
}

export const FOOTER_NAV_COLUMNS: FooterNavColumn[] = [
  {
    title: "EXPLORE",
    items: [
      { label: "Rides", href: "/rides" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Destinations Radar", href: "/#destinations" },
    ],
  },
  {
    title: "ABOUT",
    items: [
      { label: "About NER", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "The Community", href: "/about#culture" },
      { label: "Safety Code", href: "/about#protocols" },
    ],
  },
  {
    title: "CONNECT",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "Join The Ride", href: "/contact" },
      { label: "Zero Mile Base", href: "/about#story" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Community Guidelines", href: "/about#protocols" },
    ],
  },
];
