import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_NAV_COLUMNS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { SocialLinks } from "./SocialLinks";
import { MapPin, Compass, ArrowUpRight } from "lucide-react";

export const FooterNavigation: React.FC = () => {
  return (
    <div className="py-16 lg:py-20 border-b border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Brand & Origin Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3.5 group w-fit">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/ner-logo.png"
                  alt="Nagpur Enfield Riders Official Logo"
                  width={64}
                  height={64}
                  className="object-contain w-auto h-16 drop-shadow-xl"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-wider uppercase group-hover:text-amber-400 transition-colors">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-xs font-mono text-zinc-400 font-bold tracking-widest uppercase">
                  NAGPUR • INDIA
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Headquartered at India&apos;s Zero Mile Stone in Nagpur. A self-governed
              fellowship of Royal Enfield riders dedicated to high-mileage roadcraft,
              disciplined formations, and brotherhood.
            </p>
          </div>

          {/* Clickable Coordinates */}
          <div className="flex flex-col gap-2">
            <a
              href={SITE_CONFIG.zeroMileMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Zero Mile Stone on Google Maps"
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 bg-zinc-900/60 hover:bg-zinc-900 p-2.5 rounded-xl border border-zinc-800/80 hover:border-amber-500/40 transition-all w-fit group"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
              <span>ZERO MILE • {SITE_CONFIG.zeroMileCoordinates}</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Navigation Modular Columns (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {FOOTER_NAV_COLUMNS.slice(0, 3).map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      {item.isExternal && (
                        <ArrowUpRight className="w-2.5 h-2.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Connection Area (3 cols) */}
        <div className="lg:col-span-3">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};
