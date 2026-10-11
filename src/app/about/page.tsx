import { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "About Nagpur Enfield Riders | NER",
  description:
    "Discover Nagpur Enfield Riders (NER) — an independent Royal Enfield riding fraternity based in Nagpur, India. United by discipline, roadcraft, and brotherhood from Zero Mile.",
  openGraph: {
    title: "About Nagpur Enfield Riders | NER",
    description:
      "A motorcycle community built around machines, roads, and people. Exploring India with safety, staggered formation, and authentic rider camaraderie.",
    url: "/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
