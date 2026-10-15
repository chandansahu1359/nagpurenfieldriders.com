import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMerchandiseBySlug } from "@/data/merchandise.data";
import { MerchandiseDetail } from "@/features/merchandise/components/MerchandiseDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getMerchandiseBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Nagpur Enfield Riders",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} — Official NER Merchandise`,
    description: product.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${product.name} — Official NER Merchandise`,
      description: product.description,
      images: product.images.map((src) => ({ url: src })),
    },
  };
}

async function MerchandiseContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getMerchandiseBySlug(slug);

  if (!product) {
    notFound();
  }

  return <MerchandiseDetail item={product} />;
}

export default function MerchandiseDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <MerchandiseContent params={params} />
    </Suspense>
  );
}
