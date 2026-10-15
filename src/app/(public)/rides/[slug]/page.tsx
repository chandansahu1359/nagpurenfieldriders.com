import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRideBySlug, getRidesForRidesPage } from "@/features/rides/data/rides.data";
import { RideDetail } from "@/features/rides/components/RideDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const rides = getRidesForRidesPage();
  return rides.map((ride) => ({
    slug: ride.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ride = getRideBySlug(slug);

  if (!ride) {
    return {
      title: "Ride Not Found | Nagpur Enfield Riders",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${ride.title} — Nagpur Enfield Riders`,
    description: ride.shortDescription,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${ride.title} — Nagpur Enfield Riders`,
      description: ride.shortDescription,
      images: [
        {
          url: ride.coverImage,
          width: 1200,
          height: 630,
          alt: ride.title,
        },
      ],
    },
  };
}

export default async function RideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ride = getRideBySlug(slug);

  if (!ride) {
    notFound();
  }

  return <RideDetail ride={ride} />;
}
