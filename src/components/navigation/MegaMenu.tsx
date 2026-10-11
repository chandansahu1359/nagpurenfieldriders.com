"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MEGA_MENU_CATEGORIES,
  MEGA_MENU_FEATURED,
} from "@/constants/navigation";
import { registerGSAP } from "@/lib/gsap";
import { ArrowUpRight, X, Compass, Shield } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    const cleanHref = href.split("#")[0].replace(/\/+$/, "") || "/";
    const cleanPath = pathname.split("#")[0].replace(/\/+$/, "") || "/";
    if (cleanHref === "/") {
      return cleanPath === "/";
    }
    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/");
  };

  useEffect(() => {
    if (!isOpen || !containerRef.current || !contentRef.current) return;

    const { gsap } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );

      gsap.fromTo(
        ".mega-menu-col",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.08,
        }
      );

      gsap.fromTo(
        ".mega-menu-featured",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out", delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 z-40 bg-[#09090c]/98 backdrop-blur-2xl border-b border-zinc-800 shadow-2xl shadow-black/90 text-zinc-100 overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top accent beam */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative" ref={contentRef}>
        {/* Header bar of mega menu */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>THE EXPANDED ROADMAP</span>
            </span>
            <span className="text-zinc-600 text-xs font-mono hidden sm:inline">|</span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              NAGPUR ENFIELD RIDERS ARCHIVE
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Large Feature Module (4 cols) */}
          <div className="lg:col-span-4 mega-menu-featured flex flex-col justify-between bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden group">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={MEGA_MENU_FEATURED.image}
                alt={MEGA_MENU_FEATURED.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase bg-amber-500 text-zinc-950 font-bold px-2 py-0.5 rounded">
                  {MEGA_MENU_FEATURED.badge}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  {MEGA_MENU_FEATURED.subtitle}
                </span>
                <h4 className="text-lg font-black uppercase text-white tracking-wide group-hover:text-amber-400 transition-colors">
                  {MEGA_MENU_FEATURED.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                  {MEGA_MENU_FEATURED.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <Link
                  href={MEGA_MENU_FEATURED.ctaHref}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>{MEGA_MENU_FEATURED.ctaLabel}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Navigation Modules (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Object.entries(MEGA_MENU_CATEGORIES).map(([key, category]) => (
              <div key={key} className="mega-menu-col flex flex-col gap-4">
                <div className="pb-2 border-b border-zinc-800/80">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
                    {category.title}
                  </span>
                </div>

                <ul className="flex flex-col gap-3.5">
                  {category.items.map((item) => {
                    const isActive = !item.isExternal && isLinkActive(item.href);
                    return (
                      <li key={item.label} className="group/item">
                        {item.isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="flex flex-col gap-0.5"
                          >
                            <span className="text-sm font-semibold tracking-wide text-zinc-200 group-hover/item:text-amber-400 transition-colors flex items-center justify-between">
                              <span>{item.label}</span>
                              <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover/item:text-amber-400 transition-colors" />
                            </span>
                            <span className="text-[11px] text-zinc-500 group-hover/item:text-zinc-400 leading-tight transition-colors">
                              {item.description}
                            </span>
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex flex-col gap-0.5 p-1 rounded-lg transition-colors ${
                              isActive
                                ? "bg-amber-500/10 border-l-2 border-amber-500 pl-2"
                                : ""
                            }`}
                          >
                            <span
                              className={`text-sm font-semibold tracking-wide transition-colors flex items-center justify-between ${
                                isActive
                                  ? "text-amber-400 font-bold"
                                  : "text-zinc-200 group-hover/item:text-amber-400"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <span>{item.label}</span>
                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                )}
                              </span>
                              <span
                                className={`text-xs transition-all ${
                                  isActive
                                    ? "text-amber-400 opacity-100"
                                    : "text-zinc-600 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5"
                                }`}
                              >
                                →
                              </span>
                            </span>
                            <span className="text-[11px] text-zinc-500 group-hover/item:text-zinc-400 leading-tight transition-colors">
                              {item.description}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom subtle motto strip */}
        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>EST. INDEPENDENT ROYAL ENFIELD COMMUNITY • ZERO MILE NAGPUR</span>
          </div>
          <span>BORN FOR THE OPEN TARMAC</span>
        </div>
      </div>
    </div>
  );
};
