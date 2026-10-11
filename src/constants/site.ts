import { ENV } from "@/config";
import { SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "Nagpur Enfield Riders",
  shortName: "NER",
  tagline: "Born at Zero Mile. Forged on the Open Highway.",
  heroHeadline: "ONE BROTHERHOOD. COUNTLESS HORIZONS.",
  heroSubheadline:
    "An independent Royal Enfield touring fraternity based in Nagpur, India. United by discipline, long-distance roadcraft, and the timeless thrum of the open road.",
  description:
    "Nagpur Enfield Riders (NER) is an independent motorcycle riding community headquartered in Nagpur, Maharashtra. Exploring the Indian subcontinent with brotherhood, safety, and respect for the road.",
  originCity: "Nagpur, Maharashtra",
  zeroMileCoordinates: ENV.CONTACT.COORDINATES,
  zeroMileMapsUrl: ENV.CONTACT.MAPS_URL,
  disclaimer:
    "Nagpur Enfield Riders (NER) is a self-governed independent riding fraternity. NER is not affiliated with, endorsed by, sponsored by, or an official entity of Royal Enfield or Eicher Motors Ltd.",
};
