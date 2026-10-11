import type { Metadata } from "next";
import { RidesPage } from "@/features/rides";

export const metadata: Metadata = {
  title: "Rides | The Roads We Ride | Nagpur Enfield Riders",
  description:
    "Explore breakfast rollouts, forest corridors, mountain passes, and cross-country expeditions ridden by Nagpur Enfield Riders from India's Zero Mile.",
  openGraph: {
    title: "Rides | Nagpur Enfield Riders (NER)",
    description:
      "The roads we ride. Discover upcoming expeditions and visual road archives from Nagpur's independent Royal Enfield brotherhood.",
    images: [
      {
        url: "/images/rides/dawn-pack.jpg",
        width: 1200,
        height: 630,
        alt: "Nagpur Enfield Riders Dawn Formation",
      },
    ],
  },
};

export default function Page() {
  return <RidesPage />;
}
