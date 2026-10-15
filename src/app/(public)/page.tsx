import type { Metadata } from "next";
import { HomePage } from "@/features/home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
