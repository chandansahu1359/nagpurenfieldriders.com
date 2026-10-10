"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  { label: "Our Story", href: "#brotherhood" },
  { label: "Community", href: "#brotherhood" },
  { label: "Ride Culture", href: "#brotherhood" },
  { label: "Safety Protocol", href: "#creed" },
  { label: "Stories & Logs", href: "#brotherhood" },
  { label: "Contact Us", href: "mailto:contact@nagpurenfieldriders.com" },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

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
        {HEADER_NAV_LINKS.map((link) => (
          <div key={link.label} className="mobile-nav-item">
            <a
              href={link.href}
              onClick={onClose}
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-200 hover:text-amber-400 transition-colors flex items-center justify-between py-1 group"
            >
              <span>{link.label}</span>
              <span className="text-zinc-600 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </a>
          </div>
        ))}

        {/* MORE Accordion */}
        <div className="mobile-nav-item pt-2 border-t border-zinc-900">
          <button
            onClick={() => setIsMoreExpanded(!isMoreExpanded)}
            className="w-full text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-200 hover:text-amber-400 transition-colors flex items-center justify-between py-1 cursor-pointer"
            aria-expanded={isMoreExpanded}
          >
            <span>MORE</span>
            <ChevronDown
              className={`w-6 h-6 text-zinc-400 transition-transform duration-300 ${
                isMoreExpanded ? "rotate-180 text-amber-500" : ""
              }`}
            />
          </button>

          {isMoreExpanded && (
            <div className="grid grid-cols-2 gap-3 pt-4 pb-2 pl-2 animate-in fade-in duration-200">
              {MORE_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="text-sm font-mono text-zinc-400 hover:text-amber-400 py-1.5 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500 text-xs">•</span>
                  <span>{item.label}</span>
                </a>
              ))}
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
