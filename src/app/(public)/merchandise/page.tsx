import { Metadata } from "next";
import { MerchandisePage } from "@/features/merchandise/MerchandisePage";

export const metadata: Metadata = {
  title: "Official Merchandise — Nagpur Enfield Riders",
  description:
    "Official apparel, touring badges, and collectibles from Nagpur Enfield Riders (NER).",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerchandiseRoute() {
  return <MerchandisePage />;
}
