import type { Metadata } from "next";
import { GalleryPage } from "@/features/gallery";

export const metadata: Metadata = {
  title: "Gallery | The Memories We Bring Home | Nagpur Enfield Riders",
  description:
    "Visual chronicles, photo essays, and road memories from the saddles of Nagpur Enfield Riders across mountain passes, forest corridors, and highway tea halts.",
  openGraph: {
    title: "Gallery | Nagpur Enfield Riders (NER)",
    description:
      "The memories we bring home. Explore editorial photo stories and moments captured across the highways of India.",
    images: [
      {
        url: "/images/gallery/tank-gloves-macro.jpg",
        width: 1200,
        height: 630,
        alt: "Nagpur Enfield Riders Visual Archive",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/gallery/",
  },
};

export default function Page() {
  return <GalleryPage />;
}
