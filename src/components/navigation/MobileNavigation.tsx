"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_NAV_LINKS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { registerGSAP } from "@/lib/gsap";
import { JoinNerButton } from "./JoinNerButton";
import { X, ChevronDown, Compass, ArrowUpRight } from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MORE_LINKS = [
  { label: "Our Story", href: "/about#story" },
  { label: "Community", href: "/about#culture" },
  { label: "Ride Culture", href: "/about#culture" },
  { label: "Safety Protocol", href: "/about#protocols" },
  { label: "Contact Us", href: "/contact" },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    const cleanHref = href.split("#")[0];
    if (cleanHref === "/") {
      return pathname === "/";
    }
    return pathname === cleanHref || pathname.startsWith(cleanHref + "/");
  };

  const isMoreActive =
    pathname ? pathname === "/contact" || pathname.startsWith("/contact/") : false;

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const { gsap } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );

      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsMoreExpanded(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 bg-[#08080a] text-zinc-100 flex flex-col justify-between overflow-y-auto px-6 py-6 sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3"
          aria-label="Nagpur Enfield Riders Home"
        >
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/ner-logo.png"
              alt="Nagpur Enfield Riders Official Logo"
              width={48}
              height={48}
              className="object-contain w-auto h-12"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-white uppercase">
              {SITE_CONFIG.shortName}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
              Zero Mile Origin
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div
        ref={linksContainerRef}
        className="flex-1 py-8 flex flex-col justify-center gap-4 sm:gap-6"
      >
        {HEADER_NAV_LINKS.map((link) => {
          const isActive = isLinkActive(link.href);
          return (
            <div key={link.label} className="mobile-nav-item">
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`text-3xl sm:text-4xl font-black uppercase tracking-tight transition-all flex items-center justify-between py-1.5 px-2 rounded-xl group ${
                  isActive
                    ? "text-amber-400 bg-amber-500/10 border-l-4 border-amber-500 pl-3.5"
                    : "text-zinc-200 hover:text-amber-400"
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <span className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-zinc-600 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                )}
              </Link>
            </div>
          );
        })}

        {/* MORE Accordion */}
        <div className="mobile-nav-item pt-2 border-t border-zinc-900">
          <button
            onClick={() => setIsMoreExpanded(!isMoreExpanded)}
            className={`w-full text-3xl sm:text-4xl font-black uppercase tracking-tight transition-colors flex items-center justify-between py-1.5 px-2 cursor-pointer ${
              isMoreActive
                ? "text-amber-400"
                : "text-zinc-200 hover:text-amber-400"
            }`}
            aria-expanded={isMoreExpanded}
          >
            <span className="flex items-center gap-2">
              <span>MORE</span>
              {isMoreActive && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </span>
            <ChevronDown
              className={`w-6 h-6 text-zinc-400 transition-transform duration-300 ${
                isMoreExpanded ? "rotate-180 text-amber-500" : ""
              }`}
            />
          </button>

          {isMoreExpanded && (
            <div className="grid grid-cols-2 gap-3 pt-4 pb-2 pl-2 animate-in fade-in duration-200">
              {MORE_LINKS.map((item) => {
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm font-mono py-1.5 transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "text-amber-400 font-bold"
                        : "text-zinc-400 hover:text-amber-400"
                    }`}
                  >
                    <span className={`text-xs ${isActive ? "text-amber-400" : "text-amber-500"}`}>•</span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse ml-auto" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area: Large One-Handed CTA and Metadata */}
      <div className="pt-6 border-t border-zinc-800/80 flex flex-col gap-5">
        <JoinNerButton
          size="lg"
          className="w-full py-4 text-center justify-center text-sm"
          onClick={onClose}
        />

        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>NAGPUR • ZERO MILE</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-amber-500/80">
            FEEL THE ROYALNESS
          </span>
        </div>
      </div>
    </div>
  );
};
