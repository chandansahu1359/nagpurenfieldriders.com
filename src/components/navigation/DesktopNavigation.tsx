"use client";

import React from "react";
import { HEADER_NAV_LINKS } from "@/constants/navigation";
import { ChevronDown } from "lucide-react";

interface DesktopNavigationProps {
  isMegaMenuOpen: boolean;
  onToggleMegaMenu: () => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  isMegaMenuOpen,
  onToggleMegaMenu,
}) => {
  return (
    <nav
      className="hidden md:flex items-center gap-7 lg:gap-8"
      aria-label="Main Navigation"
    >
      {HEADER_NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors py-1 relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded"
        >
          <span>{link.label}</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-500 group-hover:w-full transition-all duration-300" />
        </a>
      ))}

      {/* "More ▾" trigger for Mega Menu */}
      <button
        onClick={onToggleMegaMenu}
        aria-expanded={isMegaMenuOpen}
        className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider py-1 relative transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded ${
          isMegaMenuOpen ? "text-amber-400 font-bold" : "text-zinc-300 hover:text-amber-400"
        }`}
      >
        <span>More</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isMegaMenuOpen ? "rotate-180 text-amber-500" : "text-zinc-400"
          }`}
        />
        {isMegaMenuOpen && (
          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-500" />
        )}
      </button>
    </nav>
  );
};
