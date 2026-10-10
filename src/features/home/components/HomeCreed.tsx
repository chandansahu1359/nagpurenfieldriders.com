import React from "react";
import { NER_CREED } from "@/features/home/data/community.data";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";

export const HomeCreed: React.FC = () => {
  return (
    <section
      id="creed"
      className="relative bg-[#0b0b0e] py-24 sm:py-32 border-b border-zinc-900 overflow-hidden"
      aria-label="Code of the Road and Safety Discipline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: The Philosophy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <Badge
                variant="amber"
                size="sm"
                icon={<ShieldCheck className="w-3.5 h-3.5" />}
              >
                RESPONSIBLE RIDING ETHOS
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-[1.05]">
              DISCIPLINE IS OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                GREATEST GEAR
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              We ride heavy machines across unforgiving highways. What separates
              a true brotherhood from a reckless pack is absolute discipline.
              We respect the highway, local villages, and every vehicle sharing
              our path.
            </p>

            {/* Non-negotiable safety rules box */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>NON-NEGOTIABLE PROTOCOLS</span>
              </span>

              <ul className="text-xs text-zinc-300 space-y-2.5 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Full Face Helmet (ECE / DOT / ISI Approved)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Armored Riding Jacket &amp; Knee Guards / Pants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Staggered formation with designated Lead &amp; Sweep</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Strict zero alcohol &amp; substance policy on all rides</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Valid Driving Licence (Permanent Two-Wheeler DL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Valid Bike RC (Vehicle Registration Certificate)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Active Comprehensive Insurance &amp; Valid PUC</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Pillion Rider Safety: Mandatory Helmet, Sturdy Shoes &amp; Protective Gear</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: The 4 Tenets Creed (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {NER_CREED.map((creed) => (
              <div
                key={creed.number}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <span className="text-2xl font-black font-mono text-amber-500/80 block mb-4">
                    {creed.number}
                  </span>
                  <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-2">
                    {creed.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {creed.text}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  NER STANDARD PROTOCOL
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
