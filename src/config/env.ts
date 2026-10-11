/**
 * Centralized Application Environment Configuration
 * 
 * Provides type-safe access to environment variables across the app.
 * Direct access to `process.env` should be avoided in favor of importing `ENV`.
 */

const normalizeUrl = (url?: string): string => {
  if (!url || typeof url !== "string") {
    return "https://www.nagpurenfieldriders.com";
  }
  // Trim and remove any trailing slash for consistent route composition
  const trimmed = url.trim();
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
};

export const ENV = {
  /**
   * Canonical public domain URL (e.g. "https://www.nagpurenfieldriders.com")
   */
  SITE_URL: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),

  /**
   * Node environment flags
   */
  NODE_ENV: (process.env.NODE_ENV || "development") as
    | "development"
    | "production"
    | "test",
  IS_DEV: process.env.NODE_ENV !== "production",
  IS_PROD: process.env.NODE_ENV === "production",
  IS_TEST: process.env.NODE_ENV === "test",

  /**
   * Official community contact details
   */
  CONTACT: {
    EMAIL:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@nagpurenfieldriders.com",
    LOCATION:
      process.env.NEXT_PUBLIC_CONTACT_LOCATION || "Zero Mile Stone, Nagpur, India",
    COORDINATES:
      process.env.NEXT_PUBLIC_CONTACT_COORDINATES || "21.149850°N 79.080598°E",
    MAPS_URL:
      process.env.NEXT_PUBLIC_CONTACT_MAPS_URL ||
      "https://www.google.com/maps?q=21.149850,79.080598",
  },

  /**
   * Official social media channels & handles
   */
  SOCIAL: {
    INSTAGRAM_URL:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    INSTAGRAM_HANDLE:
      process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@nagpurenfieldriders",
    YOUTUBE_URL:
      process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com",
    FACEBOOK_URL:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
  },

  /**
   * Top-level shortcuts for convenience
   */
  CONTACT_EMAIL:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@nagpurenfieldriders.com",
  INSTAGRAM_URL:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
  INSTAGRAM_HANDLE:
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@nagpurenfieldriders",
  YOUTUBE_URL:
    process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com",
  FACEBOOK_URL:
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
} as const;

export type Environment = typeof ENV;
