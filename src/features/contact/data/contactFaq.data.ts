import { ENV } from "@/config";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CONTACT_FAQS_LIST: FaqItem[] = [
  {
    id: "what-is-ner",
    question: "What is Nagpur Enfield Riders?",
    answer:
      "Nagpur Enfield Riders is an independent Royal Enfield motorcycle community based in Nagpur, India. We are a self-governed brotherhood of touring enthusiasts, united by disciplined formations, road safety, and respect for open highways radiating from India's Zero Mile Stone.",
  },
  {
    id: "can-anyone-join",
    question: "Can anyone join Nagpur Enfield Riders?",
    answer:
      "Yes. Any rider who holds a valid two-wheeler driving license, owns a Royal Enfield motorcycle, commits to full protective gear, and respects our code of disciplined group riding is welcome to join our rollouts.",
  },
  {
    id: "royal-enfield-requirement",
    question: "Do I need a Royal Enfield motorcycle to join NER?",
    answer:
      "Yes. While we deeply respect all riders and motorcycle brands, NER's pack formations, touring pacing, and brotherhood culture are specifically centered around Royal Enfield motorcycles.",
  },
  {
    id: "how-to-join",
    question: "How can I join NER or participate in a ride?",
    answer:
      "Send us a dispatch using the contact form on this page with your details. Our ride coordinators will reach out with details on upcoming rollout dates, pre-ride briefings, and assembly points.",
  },
  {
    id: "riding-experience",
    question: "Do I need previous long-distance riding experience?",
    answer:
      "No prior highway touring experience is required. We encourage newer riders to start with our short morning breakfast rollouts, where experienced road captains help you learn staggered formation, pacing, and hand signals.",
  },
  {
    id: "ride-types",
    question: "What types of rides does NER organize?",
    answer:
      "We organize early morning breakfast rollouts (80 to 150 km), weekend highway rides, forest corridor rides through nearby reserves like Pench and Satpura, and periodic multi-day interstate expeditions.",
  },
  {
    id: "pillion-rules",
    question: "Can I bring a pillion rider?",
    answer:
      "Yes, pillions are welcome on suitable rides. However, the pillion rider must wear the exact same mandatory safety gear as the rider: a certified full-face helmet, sturdy shoes, and protective riding attire.",
  },
  {
    id: "gear-requirements",
    question: "What riding gear is expected during NER rides?",
    answer:
      "Mandatory gear includes an ISI, DOT, or ECE-certified full-face helmet, an armored riding jacket, knee guards or riding pants, sturdy boots, and riding gloves. Riders arriving without certified gear will not be permitted into formation.",
  },
  {
    id: "basic-rules",
    question: "What are the non-negotiable rules for riding with NER?",
    answer:
      "Strict zero tolerance for alcohol or substances, strict staggered lane discipline behind designated Lead and Sweep road captains, no rash overtaking or stunting, and carrying valid documents (DL, Bike RC, Insurance, and PUC).",
  },
  {
    id: "collaboration-contact",
    question: "How can I contact NER for collaborations or events?",
    answer:
      "Submit an inquiry through the official dispatch form above with your organization or proposal details. Our team will review the request and get back to you promptly.",
  },
  {
    id: "follow-online",
    question: "Where can I follow NER online for updates?",
    answer: `You can follow our ride dispatches, route updates, and community media on Instagram (${ENV.SOCIAL.INSTAGRAM_HANDLE}), YouTube, and Facebook via the links in the footer.`,
  },
];
