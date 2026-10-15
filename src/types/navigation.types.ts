/**
 * Canonical Navigation Type Definitions
 */

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}


export interface FooterNavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
}

export interface FooterNavColumn {
  title: string;
  items: FooterNavItem[];
}
