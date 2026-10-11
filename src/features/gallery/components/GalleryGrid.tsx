"use client";

import React from "react";
import Image from "next/image";
import { GalleryPhoto } from "../types";
import { Maximize2, MapPin, Camera } from "lucide-react";

interface GalleryGridProps {
  photos: GalleryPhoto[];
  onPhotoClick: (index: number) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  photos,
  onPhotoClick,
}) => {
  if (photos.length === 0) return null;

  // Split into dynamic editorial spreads
  const leadPhoto = photos[0];
  const pairedLeft = photos[1];
  const pairedRight = photos[2];
  const clusterPhotos = photos.slice(3, 6);
  const remainingPhotos = photos.slice(6);

  return (
    <section
      aria-label="Editorial Photographic Monograph"
      className="py-12 md:py-24 bg-[#040406] text-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* SPREAD 1: FULL-WIDTH CENTERFOLD HERO SPREAD */}
        {leadPhoto && (
          <div className="space-y-4">
            <div
              role="button"
              tabIndex={0}
              aria-label={`Open centerfold: ${leadPhoto.title}`}
              onClick={() => onPhotoClick(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPhotoClick(0);
                }
              }}
              className="group cursor-pointer relative w-full h-[380px] sm:h-[500px] lg:h-[620px] rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Image
                src={leadPhoto.src}
                alt={leadPhoto.caption || leadPhoto.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.82] group-hover:brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Technical Film Camera Tag */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  PLATE 01 • {leadPhoto.categoryLabel}
                </span>
                {leadPhoto.cameraInfo && (
                  <span className="hidden sm:inline px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                    {leadPhoto.cameraInfo}
                  </span>
                )}
              </div>

              <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 group-hover:border-amber-500/40 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{leadPhoto.location}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{leadPhoto.displayDate}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-2">
                  {leadPhoto.title}
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed">
                  {leadPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SPREAD 2: ASYMMETRIC PAIRING WITH EDITORIAL WHITESPACE */}
        {(pairedLeft || pairedRight) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {pairedLeft && (
              <div
                role="button"
                tabIndex={0}
                aria-label={`Open photograph: ${pairedLeft.title}`}
                onClick={() => onPhotoClick(1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPhotoClick(1);
                  }
                }}
                className="lg:col-span-7 group cursor-pointer relative h-[360px] sm:h-[460px] rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <Image
                  src={pairedLeft.src}
                  alt={pairedLeft.caption || pairedLeft.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-amber-400 border border-amber-500/30">
                    PLATE 02 • {pairedLeft.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-amber-400 text-xs font-mono uppercase block mb-1">
                    {pairedLeft.location}
                  </span>
                  <h4 className="font-display text-2xl font-black uppercase text-white tracking-tight leading-snug mb-1">
                    {pairedLeft.title}
                  </h4>
                  <p className="text-zinc-300 text-xs line-clamp-2 leading-relaxed">
                    {pairedLeft.caption}
                  </p>
                </div>
              </div>
            )}

            {/* Right Column: Editorial Companion Card & Pull Quote */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {pairedRight ? (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open photograph: ${pairedRight.title}`}
                  onClick={() => onPhotoClick(2)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onPhotoClick(2);
                    }
                  }}
                  className="group cursor-pointer relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Image
                    src={pairedRight.src}
                    alt={pairedRight.caption || pairedRight.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-amber-400 border border-amber-500/30">
                      PLATE 03
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-amber-400 text-xs font-mono uppercase block">
                      {pairedRight.location}
                    </span>
                    <h4 className="font-display text-lg font-bold uppercase text-white tracking-tight">
                      {pairedRight.title}
                    </h4>
                  </div>
                </div>
              ) : null}

              {/* Editorial Pull Quote */}
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-850">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
                  THE PHOTOGRAPHIC CREED
                </span>
                <blockquote className="text-zinc-200 text-sm sm:text-base font-serif italic leading-relaxed mb-3">
                  &ldquo;A photograph on a motorcycle isn&apos;t taken for vanity. It is taken because you survived the cold, tasted the dust, and wanted to bring that feeling back to Nagpur.&rdquo;
                </blockquote>
                <span className="text-zinc-500 text-xs font-mono uppercase">
                  — Nagpur Enfield Riders Archive
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SPREAD 3: TRIPLE CONTACT SHEET SEQUENCE */}
        {clusterPhotos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-500 pb-2 border-b border-zinc-850">
              <span className="text-amber-400 font-bold">FILM CONTACT SEQUENCE • 35MM FRAMES</span>
              <span>NATURAL LIGHT ARCHIVE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {clusterPhotos.map((photo, cIdx) => {
                const actualIndex = 3 + cIdx;
                return (
                  <div
                    key={photo.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open frame: ${photo.title}`}
                    onClick={() => onPhotoClick(actualIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onPhotoClick(actualIndex);
                      }
                    }}
                    className="group cursor-pointer flex flex-col space-y-3 focus:outline-none"
                  >
                    <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950 group-hover:border-amber-500/50 transition-colors">
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-85"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-zinc-400 border border-white/10">
                        FRAME #{String(actualIndex + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase mb-0.5">
                        <span className="text-amber-400">{photo.categoryLabel}</span>
                        <span>{photo.displayDate}</span>
                      </div>
                      <h4 className="font-display text-base font-bold uppercase text-white group-hover:text-amber-300 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-zinc-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SPREAD 4: REMAINING MONOGRAPH FRAMES */}
        {remainingPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-900">
            {remainingPhotos.map((photo, rIdx) => {
              const actualIndex = 6 + rIdx;
              return (
                <div
                  key={photo.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open photograph: ${photo.title}`}
                  onClick={() => onPhotoClick(actualIndex)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onPhotoClick(actualIndex);
                    }
                  }}
                  className="group cursor-pointer relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption || photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-amber-400 border border-amber-500/30">
                      FRAME #{String(actualIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-400 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                    </div>
                    <h4 className="font-display text-2xl font-black uppercase text-white tracking-tight leading-snug mb-1">
                      {photo.title}
                    </h4>
                    <p className="text-zinc-300 text-xs line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
