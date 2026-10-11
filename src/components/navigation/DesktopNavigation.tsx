"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const isMoreActive =
    isMegaMenuOpen ||
    (pathname ? pathname.replace(/\/+$/, "") === "/contact" : false);

  return (
    <nav
      className="hidden md:flex items-center gap-7 lg:gap-8"
      aria-label="Main Navigation"
    >
      {HEADER_NAV_LINKS.map((link) => {
        const isActive = isLinkActive(link.href);
        const isSamePageScroll = link.href.startsWith("#");
        const linkProps = {
          key: link.label,
          href: link.href,
          "aria-current": isActive ? ("page" as const) : undefined,
          className: `text-xs font-mono uppercase tracking-wider py-1 relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded transition-colors ${
            isActive ? "text-amber-400" : "text-zinc-300 hover:text-amber-400"
          }`,
        };
        const linkChildren = (
          <>
            <span>{link.label}</span>
            {/* Glowing amber underline for active state */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                isActive
                  ? "w-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </>
        );

        return isSamePageScroll ? (
          <Link {...linkProps}>{linkChildren}</Link>
        ) : (
          <a {...linkProps}>{linkChildren}</a>
        );
      })}

      {/* "More ▾" trigger for Mega Menu */}
      <button
        onClick={onToggleMegaMenu}
        aria-expanded={isMegaMenuOpen}
        className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider py-1 relative transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded ${isMoreActive
          ? "text-amber-400 font-bold"
          : "text-zinc-300 hover:text-amber-400"
          }`}
      >
        <span>More</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaMenuOpen
            ? "rotate-180 text-amber-500"
            : isMoreActive
              ? "text-amber-500"
              : "text-zinc-400"
            }`}
        />
        {isMoreActive && (
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
        )}
      </button>
    </nav>
  );
};

