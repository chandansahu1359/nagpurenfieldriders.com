import React from "react";
import { ABOUT_SAFETY_PROTOCOLS } from "../data/about.data";
import {
  ShieldAlert,
  HardHat,
  Shield,
  Users,
  Ban,
  FileCheck2,
  UserCheck,
} from "lucide-react";

export const AboutProtocols: React.FC = () => {
  const getProtocolIcon = (id: string) => {
    switch (id) {
      case "helmet":
        return <HardHat className="w-5 h-5 text-amber-400" />;
      case "gear":
        return <Shield className="w-5 h-5 text-amber-400" />;
      case "formation":
        return <Users className="w-5 h-5 text-amber-400" />;
      case "sobriety":
        return <Ban className="w-5 h-5 text-red-400" />;
      case "documents":
        return <FileCheck2 className="w-5 h-5 text-amber-400" />;
      case "pillion":
        return <UserCheck className="w-5 h-5 text-amber-400" />;
      default:
        return <Shield className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section
      id="protocols"
      className="py-24 sm:py-32 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-900"
      aria-label="Safety Code and Protocols"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs tracking-wider uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>NON-NEGOTIABLE PROTOCOLS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            DISCIPLINE IS OUR GREATEST GEAR
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Every rider in our formation represents the Nagpur Enfield Riders
            fraternity. We uphold uncompromising road protocols to safeguard our
            members, their pillions, and the general public.
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_SAFETY_PROTOCOLS.map((protocol, idx) => (
            <div
              key={protocol.id}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-850 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                    {getProtocolIcon(protocol.id)}
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    PROTOCOL 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold uppercase text-white mb-2">
                  {protocol.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {protocol.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono uppercase text-zinc-400">
                <span>MANDATORY ENFORCEMENT</span>
                <span className="text-amber-400 font-bold">100% REQUIRED</span>
              </div>
            </div>
          ))}
        </div>

        {/* Zero Tolerance Notice Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-zinc-950/90 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-white tracking-wide">
                No Gear • No Paperwork • No Ride
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                If a rider or pillion arrives at a rollout assembly without
                certified gear or lacking valid documents (DL, RC, Insurance,
                PUC), they will respectfully be denied permission to roll with the
                pack. Safety is non-negotiable.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-center sm:text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
              ZERO COMPROMISE
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              All Rides • All Formations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
