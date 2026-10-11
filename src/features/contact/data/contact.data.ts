import { ENV } from "@/config";
import { SITE_CONFIG } from "@/constants/site";

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
  subtext: string;
}

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

export const CONTACT_FAQS = [
  {
    question: "Do I need a Royal Enfield motorcycle to ride with NER?",
    answer:
      "Yes. While we respect all motorcycle brands, NER's organized rides and brotherhood formations are centered around Royal Enfield motorcycles.",
  },
  {
    question: "Is there any membership fee to join NER rides?",
    answer:
      "No. NER is a self-governed fraternity. We do not charge membership fees. Individual fuel, food, and accommodation costs are self-funded.",
  },
  {
    question: "What gear is mandatory before rolling out?",
    answer:
      "Full-face helmet (ECE/DOT/ISI), armored riding jacket, knee guards, sturdy boots, and valid bike documentation (DL, RC, Insurance, PUC). No gear = no ride.",
  },
];
