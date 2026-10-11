"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryPhoto } from "../types";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Calendar,
} from "lucide-react";

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const currentPhoto = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when lightbox is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${currentPhoto.title}`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none"
    >
      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30">
            {currentPhoto.categoryLabel}
          </span>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        {currentPhoto.cameraInfo && (
          <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-zinc-400">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            <span>{currentPhoto.cameraInfo}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-3 sm:left-6 z-20 p-3 sm:p-3.5 rounded-full bg-zinc-900/80 hover:bg-amber-500 hover:text-black border border-white/10 text-zinc-200 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Current Image Container */}
        <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.caption || currentPhoto.title}
            fill
            sizes="95vw"
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 sm:right-6 z-20 p-3 sm:p-3.5 rounded-full bg-zinc-900/80 hover:bg-amber-500 hover:text-black border border-white/10 text-zinc-200 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Editorial Caption Bar */}
      <div className="relative z-10 w-full px-4 sm:px-8 py-5 border-t border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400 mb-1">
              <span className="flex items-center gap-1 text-amber-400">
                <MapPin className="w-3 h-3" />
                {currentPhoto.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {currentPhoto.displayDate}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-1">
              {currentPhoto.title}
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-3xl font-normal">
              {currentPhoto.caption}
            </p>
          </div>

          <div className="hidden sm:block text-right shrink-0">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
              NAVIGATE: [← / →] • CLOSE: [ESC]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
