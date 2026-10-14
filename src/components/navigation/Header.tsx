"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/constants/site";
import { DesktopNavigation } from "./DesktopNavigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { JoinNerButton } from "./JoinNerButton";
import { Menu } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (window.scrollY > 60 && isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMegaMenuOpen]);

  // Click outside to close mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };

    if (isMegaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMegaMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMegaMenuOpen
          ? "bg-black border-b border-zinc-800 shadow-2xl shadow-black/90 py-3"
          : "bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-transparent py-4 sm:py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg py-1"
            aria-label="Nagpur Enfield Riders Home"
            onClick={() => setIsMegaMenuOpen(false)}
          >
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/ner-logo.png"
                alt="Nagpur Enfield Riders Official Logo"
                width={52}
                height={52}
                className="object-contain w-auto h-12 drop-shadow-md"
                priority
              />
            </div>

            <div className="flex flex-col">
              <p className="text-base sm:text-lg font-black tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{SITE_CONFIG.name}</span>
                {/* <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 font-semibold tracking-widest pl-1 border-l border-zinc-700">
                  NAGPUR
                </span> */}
              </p>
              <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
                <span className="pr-1">Zero Mile Origin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 font-semibold tracking-widest pl-1">
                  NAGPUR
                </span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <DesktopNavigation
            isMegaMenuOpen={isMegaMenuOpen}
            onToggleMegaMenu={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          />

          {/* Desktop Primary Action */}
          <div className="hidden md:flex items-center gap-4">
            <JoinNerButton size="sm" onClick={() => setIsMegaMenuOpen(false)} />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
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
