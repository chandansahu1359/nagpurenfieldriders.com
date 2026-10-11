import React from "react";
import Link from "next/link";
import { FooterHero } from "./FooterHero";
import { FooterNavigation } from "./FooterNavigation";
import { SITE_CONFIG } from "@/constants/site";
import { ShieldAlert, Compass } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050507] text-zinc-300 relative overflow-hidden" aria-label="Global Site Footer">
      {/* 1. Large Visual Closing Hero Area */}
      <FooterHero />

      {/* 2. Modular Navigation & Social Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterNavigation />

        {/* 3. Bottom Legal Notice & Copyright Strip */}
        <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div className="flex items-start gap-2.5 max-w-2xl">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-zinc-400">
              <strong className="text-zinc-400">Legal Notice: </strong>
              {SITE_CONFIG.disclaimer}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-3 text-zinc-400">
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Terms &amp; Conditions
              </Link>
            </div>
            <span className="text-zinc-400">
              © 2026 {SITE_CONFIG.shortName}. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
