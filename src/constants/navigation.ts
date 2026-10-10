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
  { label: "About NER", href: "#brotherhood" },
  { label: "Rides", href: "#expeditions" },
  { label: "Events", href: "#expeditions" },
  { label: "Gallery", href: "#destinations" },
];

export const MEGA_MENU_CATEGORIES: Record<string, MegaMenuCategory> = {
  about: {
    title: "ABOUT",
    items: [
      {
        label: "Our Story",
        href: "#brotherhood",
        description: "From India's Zero Mile to brotherhood across highways.",
      },
      {
        label: "Community",
        href: "#brotherhood",
        description: "An authentic, independent fraternity of Enfield riders.",
      },
      {
        label: "Ride Culture",
        href: "#brotherhood",
        description: "Discipline, camaraderie, and dawn highway tea stops.",
      },
    ],
  },
  riding: {
    title: "RIDING",
    items: [
      {
        label: "Rides",
        href: "#expeditions",
        description: "From sunrise breakfast runs to cross-country touring.",
      },
      {
        label: "Events",
        href: "#expeditions",
        description: "Annual gatherings, foundation runs & milestone expeditions.",
      },
      {
        label: "Safety Protocol",
        href: "#creed",
        description: "Strict staggered formation, protective gear & document rules.",
      },
    ],
  },
  explore: {
    title: "EXPLORE",
    items: [
      {
        label: "Gallery",
        href: "#destinations",
        description: "Visual chronicles of bikes, passes, and asphalt ribbons.",
      },
      {
        label: "Stories & Logs",
        href: "#brotherhood",
        description: "Tales written by odometer miles across the subcontinent.",
      },
      {
        label: "Destinations",
        href: "#destinations",
        description: "Routes radiating outward from Zero Mile to Ladakh & Goa.",
      },
    ],
  },
  connect: {
    title: "CONNECT",
    items: [
      {
        label: "Contact Us",
        href: "mailto:contact@nagpurenfieldriders.com",
        description: "Ride coordination, member inquiries & headquarters.",
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
  subtitle: "5:30 AM Rollout • Zero Mile Stone",
  description:
    "Synchronized thumps cutting through morning mist. Breakfast, chai, and an open national highway.",
  image: "/images/community/chai-dhaba-dawn.jpg",
  ctaLabel: "Explore Expeditions →",
  ctaHref: "#expeditions",
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
      { label: "Rides", href: "#expeditions" },
      { label: "Events", href: "#expeditions" },
      { label: "Gallery", href: "#destinations" },
      { label: "Stories", href: "#brotherhood" },
      { label: "Destinations Radar", href: "#destinations" },
    ],
  },
  {
    title: "ABOUT",
    items: [
      { label: "About NER", href: "#brotherhood" },
      { label: "Our Story", href: "#brotherhood" },
      { label: "The Community", href: "#brotherhood" },
      { label: "Ride Culture", href: "#brotherhood" },
      { label: "Safety Code", href: "#creed" },
    ],
  },
  {
    title: "CONNECT",
    items: [
      { label: "Contact Us", href: "mailto:contact@nagpurenfieldriders.com" },
      { label: "Join The Ride", href: "#connect" },
      { label: "Rider Inquiries", href: "mailto:contact@nagpurenfieldriders.com" },
      { label: "Zero Mile Base", href: "#destinations" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Community Guidelines", href: "#creed" },
    ],
  },
];
