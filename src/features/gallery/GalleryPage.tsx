"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { GalleryHero } from "./components/GalleryHero";
import { GalleryCollections } from "./components/GalleryCollections";
import { GalleryFilterBar } from "./components/GalleryFilterBar";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryLightbox } from "./components/GalleryLightbox";
import { GalleryEmptyState } from "./components/GalleryEmptyState";
import { GALLERY_COLLECTIONS, GALLERY_PHOTOS } from "./data/gallery.data";
import { GalleryFilterState } from "./types";

export const GalleryPage: React.FC = () => {
  const [filters, setFilters] = useState<GalleryFilterState>({
    category: "all",
    collection: "all",
    searchQuery: "",
  });

  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const handleFilterChange = (updates: Partial<GalleryFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setFilters({
      category: "all",
      collection: "all",
      searchQuery: "",
    });
  };

  const handleSelectCollection = (slug: string) => {
    setFilters((prev) => ({
      ...prev,
      collection: slug,
      category: "all", // Clear category restriction to show full collection
    }));
  };

  // Filter photos
  const filteredPhotos = useMemo(() => {
    return GALLERY_PHOTOS.filter((photo) => {
      // Category
      if (filters.category !== "all" && photo.category !== filters.category) {
        return false;
      }
      // Collection
      if (
        filters.collection !== "all" &&
        photo.collectionSlug !== filters.collection
      ) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = photo.title.toLowerCase().includes(query);
        const matchesLoc = photo.location.toLowerCase().includes(query);
        const matchesCap = photo.caption.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCap) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  // Lightbox handlers
  const handleOpenPhoto = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleNextPhoto = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Global Navigation */}
      <Header />

      <main className="flex-1">
        {/* Minimal Powerful Hero */}
        <GalleryHero />

        {/* Curated Editorial Story Collections */}
        <GalleryCollections
          collections={GALLERY_COLLECTIONS}
          selectedCollection={filters.collection}
          onSelectCollection={handleSelectCollection}
        />

        {/* Interactive Filtering */}
        <GalleryFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalCount={filteredPhotos.length}
        />

        {/* Editorial Photo Grid or Empty State */}
        {filteredPhotos.length === 0 ? (
          <GalleryEmptyState onReset={handleReset} />
        ) : (
          <GalleryGrid
            photos={filteredPhotos}
            onPhotoClick={handleOpenPhoto}
          />
        )}

        {/* Accessible Lightbox Modal */}
        <GalleryLightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={handleCloseLightbox}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
