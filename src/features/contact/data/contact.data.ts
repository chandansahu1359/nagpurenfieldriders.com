import { ENV } from "@/config";
import { ContactChannel } from "@/types";
import { CONTACT_FAQS_LIST } from "./contactFaq.data";

export type { ContactChannel };

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    label: "Direct Inquiries",
    value: ENV.CONTACT.EMAIL,
    href: `mailto:${ENV.CONTACT.EMAIL}`,
    subtext: "For ride invitations, collaboration & rider questions.",
  },
  {
    id: "location",
    label: "Headquarters & Origin",
    value: ENV.CONTACT.LOCATION,
    href: ENV.CONTACT.MAPS_URL,
    isExternal: true,
    subtext: `${ENV.CONTACT.COORDINATES} • The geographic center of India.`,
  },
  {
    id: "rollout",
    label: "Weekend Rollouts",
    value: "Every Sunday Dawn • 5:00 AM",
    subtext: "Designated assembly at Zero Mile & Outer Ring Road bypass.",
  },
];

// Single source of truth re-export
export { CONTACT_FAQS_LIST, CONTACT_FAQS_LIST as CONTACT_FAQS };
