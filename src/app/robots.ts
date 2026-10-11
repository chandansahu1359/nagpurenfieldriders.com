import type { MetadataRoute } from "next";
import { ENV } from "@/config";

/**
 * Global robots.txt configuration
 * 
 * Rules:
 * - Crawlers are allowed to read pages so they can detect the <meta name="robots" content="noindex, nofollow" /> directive.
 * - Permanently blocks any fragment/anchor URLs (/#<slug>, /*#*, /*%23*) to prevent search engines from treating
 *   in-page anchor links as separate distinct crawlable pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*#*",
          "/#*",
          "/*#",
          "/*/#*",
          "/*%23*",
          "/%23*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/*#*",
          "/#*",
          "/*#",
          "/*/#*",
          "/*%23*",
          "/%23*",
        ],
      },
    ],
    sitemap: `${ENV.SITE_URL}/sitemap.xml`,
  };
}
