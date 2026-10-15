"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/constants/site";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { JoinNerButton } from "./JoinNerButton";
import { CartIcon } from "@/features/merchandise/components/CartIcon";
import { Menu } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-black border-b border-zinc-800 shadow-2xl shadow-black/90 py-3"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Logo */}
          <div className="flex items-center gap-3 py-1">
            <a
              href="/ner-logo.png"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
              title="Open Nagpur Enfield Riders Logo in new tab"
              aria-label="Open Nagpur Enfield Riders Logo in new tab"
            >
              <Image
                src="/ner-logo.png"
                alt="Nagpur Enfield Riders Official Logo"
                width={52}
                height={52}
                className="object-contain w-auto h-12 drop-shadow-md"
                priority
              />
            </a>

            <a
              href="/"
              className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
              aria-label="Nagpur Enfield Riders Home"
            >
              <p className="text-base sm:text-lg font-black tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{SITE_CONFIG.name}</span>
              </p>
              <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
                <span className="pr-1">Zero Mile Origin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 font-semibold tracking-widest pl-1">
                  NAGPUR
                </span>
              </p>
            </a>
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Desktop Primary Action */}
          <div className="hidden md:flex items-center gap-3">
            <CartIcon />
            <JoinNerButton size="sm" />
          </div>

          {/* Mobile Actions: Cart & Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <CartIcon />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

// Re-export as Navbar for backward compatibility
export const Navbar = Header;
