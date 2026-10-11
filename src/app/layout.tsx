import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ENV } from "@/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(ENV.SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  title: "Nagpur Enfield Riders | Independent Royal Enfield Motorcycle Community (NER)",
  description:
    "Nagpur Enfield Riders (NER) is an independent Royal Enfield riding community based at India's Zero Mile in Nagpur. Built on brotherhood, disciplined highway touring, safety, and epic journeys across the subcontinent.",
  keywords: [
    "Nagpur Enfield Riders",
    "NER",
    "Royal Enfield Nagpur",
    "Motorcycle Community India",
    "Nagpur Riders Club",
    "Zero Mile Riding",
    "Royal Enfield Touring",
  ],
  authors: [{ name: "Nagpur Enfield Riders" }],
  openGraph: {
    title: "Nagpur Enfield Riders | Born at Zero Mile. Forged on the Open Highway.",
    description:
      "Explore epic journeys radiating outward from Nagpur to Ladakh, Goa, Rajasthan, and beyond. An authentic fraternity of passionate Enfield motorcyclists.",
    siteName: "Nagpur Enfield Riders",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagpur Enfield Riders (NER)",
    description: "One Brotherhood. Countless Horizons. An independent motorcycle community in Nagpur, India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
