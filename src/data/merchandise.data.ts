import { MerchandiseItem } from "@/types";

/**
 * Canonical Single Source of Truth for Official NER Merchandise.
 * 
 * Initial state: Empty collection ready for real products when confirmed.
 * Plug-and-play architecture: when items are populated here, all merchandise
 * pages, showcases, and cart flows immediately reflect them without code changes.
 */
export const MERCHANDISE_DATA: MerchandiseItem[] = [];

/**
 * Selectors for querying merchandise collection
 */
export const getAllMerchandise = (): MerchandiseItem[] => {
  return MERCHANDISE_DATA;
};

export const getMerchandiseBySlug = (
  slug: string
): MerchandiseItem | undefined => {
  return MERCHANDISE_DATA.find((item) => item.slug === slug);
};

export const getFeaturedMerchandise = (): MerchandiseItem[] => {
  return MERCHANDISE_DATA.filter((item) => item.isFeatured);
};

export const getMerchandiseCount = (): number => {
  return MERCHANDISE_DATA.length;
};
