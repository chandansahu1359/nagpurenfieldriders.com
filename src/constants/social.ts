import { ENV } from "@/config";
import { SocialLink } from "@/types";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Instagram",
    label: ENV.SOCIAL.INSTAGRAM_HANDLE,
    href: ENV.SOCIAL.INSTAGRAM_URL,
  },
  {
    platform: "YouTube",
    label: "Nagpur Enfield Riders Official",
    href: ENV.SOCIAL.YOUTUBE_URL,
  },
  {
    platform: "Facebook",
    label: "Nagpur Enfield Riders Community",
    href: ENV.SOCIAL.FACEBOOK_URL,
  },
  {
    platform: "Community",
    label: "NER Rider Circle & Brotherhood",
    href: "/contact/",
  },
];
