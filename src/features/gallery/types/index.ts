export type GalleryCategory =
  | "all"
  | "rides"
  | "events"
  | "community"
  | "people"
  | "places"
  | "details";

export interface GalleryPhoto {
  id: string;
  slug: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  categoryLabel: string;
  date: string;
  displayDate: string;
  location: string;
  caption: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: "wide" | "landscape" | "portrait" | "standard";
  featured?: boolean;
  collectionSlug?: string;
  cameraInfo?: string;
}

export interface GalleryCollection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  coverImage: string;
  photoCount: number;
  description: string;
  location: string;
  category: Exclude<GalleryCategory, "all">;
}

export interface GalleryFilterState {
  category: GalleryCategory;
  collection: string | "all";
  searchQuery: string;
}
