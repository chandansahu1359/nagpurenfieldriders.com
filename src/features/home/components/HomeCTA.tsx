import React from "react";
import { ENV } from "@/config";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/constants/site";
import { Compass, ArrowRight, Shield, MessageSquare, MapPin } from "lucide-react";

export const HomeCTA: React.FC = () => {
  return (
    <section
      id="connect"
      className="relative bg-[#08080a] py-28 sm:py-36 overflow-hidden"
      aria-label="Connect With Nagpur Enfield Riders"
    >
      {/* Background road grid & amber glow */}
      <div className="absolute inset-0 bg-road-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <Badge
          variant="amber"
          size="md"
          icon={<Compass className="w-3.5 h-3.5" />}
          className="mb-6"
        >
          ZERO MILE STONE • NAGPUR BASE
        </Badge>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[1.08] mb-6">
          THE HIGHWAY IS CALLING. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">
            START FROM ZERO MILE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          Whether you are an experienced highway tourer or stepping up to your
          first long-distance ride on your Royal Enfield, you will find brothers
          who share the road, watch your line, and ride beside you.
        </p>

        {/* Action card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-10 max-w-2xl w-full flex flex-col gap-6 backdrop-blur-md mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-bold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Base Location</span>
              </div>
              <p className="text-xs text-zinc-300">
                Nagpur, Maharashtra • Regular dawn meetups at Zero Mile &amp; Outer Ring Road.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-bold mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Riding Requirement</span>
              </div>
              <p className="text-xs text-zinc-300">
                Royal Enfield motorcycle, mandatory protective riding gear, and safety mindset.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href={`mailto:${ENV.CONTACT.EMAIL}`}
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Reach Out &amp; Ride Along
            </Button>

            <Button
              href="#destinations"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Explore Destinations
            </Button>
          </div>
        </div>

        <p className="text-xs font-mono text-zinc-400 max-w-md">
          {SITE_CONFIG.disclaimer}
        </p>
      </div>
    </section>
  );
};
