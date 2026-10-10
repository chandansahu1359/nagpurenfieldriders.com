export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  description: string;
  originCity: string;
  zeroMileCoordinates: string;
  zeroMileMapsUrl: string;
  disclaimer: string;
}
