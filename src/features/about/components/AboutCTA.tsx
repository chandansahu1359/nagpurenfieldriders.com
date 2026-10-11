import React from "react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/constants/site";
import { ArrowRight, ShieldCheck, Mail, Compass } from "lucide-react";

export const AboutCTA: React.FC = () => {
  return (
    <section
      className="py-24 sm:py-32 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-900"
      aria-label="Join Nagpur Enfield Riders Invitation"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-road-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>JOIN THE PACK</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          THE ROAD IS WAITING. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            WILL YOU RIDE WITH US?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          If you own a Royal Enfield, value safe and disciplined road formation,
          and want to experience the pure joy of touring with a dedicated pack,
          we invite you to connect with Nagpur Enfield Riders.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/contact/"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Connect With The Pack
          </Button>

          <Button
            href="#protocols"
            variant="outline"
            size="lg"
            icon={<ShieldCheck className="w-4 h-4 text-amber-400" />}
          >
            Review Road Protocols
          </Button>
        </div>

        {/* Independent Community Disclaimer */}
        <div className="pt-12 border-t border-zinc-850/80 max-w-2xl mx-auto">
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-300">Independent Fraternity:</strong>{" "}
            {SITE_CONFIG.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
