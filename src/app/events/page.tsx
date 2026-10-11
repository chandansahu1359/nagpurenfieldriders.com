import type { Metadata } from "next";
import { EventsPage } from "@/features/events";

export const metadata: Metadata = {
  title: "Events | More Than A Ride | Nagpur Enfield Riders",
  description:
    "Community meetups, starlight wilderness camps, road safety clinics, and mechanical workshops hosted by Nagpur Enfield Riders.",
  openGraph: {
    title: "Events & Gatherings | Nagpur Enfield Riders (NER)",
    description:
      "The moments that bring us together. Discover upcoming assemblies, roadside clinics, and past celebrations from Nagpur's Royal Enfield brotherhood.",
    images: [
      {
        url: "/images/events/dhaba-assembly.jpg",
        width: 1200,
        height: 630,
        alt: "Nagpur Enfield Riders Community Assembly",
      },
    ],
  },
};

export default function Page() {
  return <EventsPage />;
}
