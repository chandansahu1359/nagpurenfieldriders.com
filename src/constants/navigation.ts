import { NavLink, FooterNavItem, FooterNavColumn } from "@/types";

export type { NavLink, FooterNavItem, FooterNavColumn };

export const HEADER_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About NER", href: "/about/" },
  { label: "Rides", href: "/rides/" },
  { label: "Events", href: "/events/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Merchandise", href: "/merchandise/" },
  { label: "Contact", href: "/contact/" },
];

export const FOOTER_NAV_COLUMNS: FooterNavColumn[] = [
  {
    title: "EXPLORE",
    items: [
      { label: "Rides", href: "/rides/" },
      { label: "Events", href: "/events/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "Merchandise", href: "/merchandise/" },
      { label: "Routes from Zero Mile", href: "/#destinations" },
    ],
  },
  {
    title: "ABOUT",
    items: [
      { label: "About NER", href: "/about/" },
      { label: "Our Story", href: "/about/#story" },
      { label: "The Community", href: "/about/#culture" },
      { label: "Safety Code", href: "/about/#protocols" },
    ],
  },
  {
    title: "CONNECT",
    items: [
      { label: "Contact Us", href: "/contact/" },
      { label: "Join The Ride", href: "/contact/" },
      { label: "Zero Mile Base", href: "/about/#story" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Community Guidelines", href: "/about/#protocols" },
    ],
  },
];
