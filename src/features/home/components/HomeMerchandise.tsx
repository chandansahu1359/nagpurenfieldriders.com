"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { getAllMerchandise } from "@/data/merchandise.data";

export const HomeMerchandise: React.FC = () => {
  const merchandise = getAllMerchandise();
  const hasItems = merchandise.length > 0;

  return (
    <section
      id="merchandise"
      className="relative bg-[#060608] py-24 sm:py-32 border-b border-zinc-900 overflow-hidden"
      aria-label="Official NER Merchandise Showcase"
    >
      {/* Background road styling */}
      <div className="absolute inset-0 bg-road-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
                OFFICIAL GEAR & COLLECTIBLES
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              COMMUNITY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">
                MERCHANDISE
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Purpose-built apparel and authentic touring memorabilia representing
              the brotherhood of Nagpur Enfield Riders on the open road.
            </p>
          </div>
        </div>

        {hasItems ? (
          // Populated State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {merchandise.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/merchandise/${item.slug}/`}
                className="group relative bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src={item.images[0] || "/images/gallery/tank-gloves-macro.jpg"}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold bg-black/70 backdrop-blur-md text-amber-400 border border-amber-500/30">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-300 tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Graceful Neutral Empty State (Strictly zero unconfirmed claims)
          <div className="relative rounded-3xl bg-zinc-900/40 border border-zinc-800/80 p-8 sm:p-12 overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  OFFICIAL GEAR CATALOG
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                  OFFICIAL NER MERCHANDISE WILL APPEAR HERE WHEN AVAILABLE
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
                Official community apparel and touring collectibles will be published directly to this page.
                For inquiries or questions, contact our coordination team.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href="/contact/"
                  className="px-6 py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <span>CONTACT NER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/merchandise/"
                  className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs font-mono uppercase tracking-wider hover:text-white hover:border-zinc-700 transition-colors"
                >
                  EXPLORE GEAR DESK
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
