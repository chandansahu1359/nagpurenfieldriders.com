"use client";

import React, { useEffect, useRef } from "react";
import { CONTACT_CHANNELS } from "../data/contact.data";
import { SITE_CONFIG } from "@/constants/site";
import { registerGSAP } from "@/lib/gsap";
import {
  Compass,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export const ContactHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-10 lg:pr-8">
      {/* Editorial Badge & Origin */}
      <div className="contact-hero-item space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider uppercase">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>DIRECT DISPATCH • NAGPUR, INDIA</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
          LET&apos;S TALK. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            CONNECT WITH NER.
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
          Questions about Nagpur Enfield Riders? Want to enquire about upcoming
          sunday rollouts, brotherhood guidelines, or collaborative expeditions?
          Drop a dispatch below and our road team will get back to you.
        </p>
      </div>

      {/* Direct Contact Channels */}
      <div className="contact-hero-item space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Official Community Channels
        </h2>

        <div className="grid gap-4">
          {CONTACT_CHANNELS.map((channel) => {
            const isClickable = Boolean(channel.href);
            const content = (
              <div className="group p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 hover:bg-zinc-900/90 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-105 group-hover:border-amber-500/50 transition-all">
                  {channel.id === "email" && <Mail className="w-5 h-5" />}
                  {channel.id === "location" && <MapPin className="w-5 h-5" />}
                  {channel.id === "rollout" && <Clock className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {channel.label}
                    </span>
                    {isClickable && (
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors truncate">
                    {channel.value}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">{channel.subtext}</p>
                </div>
              </div>
            );

            if (isClickable && channel.href) {
              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.isExternal ? "_blank" : undefined}
                  rel={channel.isExternal ? "noopener noreferrer" : undefined}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
                >
                  {content}
                </a>
              );
            }

            return <div key={channel.id}>{content}</div>;
          })}
        </div>
      </div>


      {/* Independent Fraternity Seal Note */}
      <div className="contact-hero-item p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3 text-xs text-zinc-400">
        <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-zinc-300">Independent Community:</strong>{" "}
          {SITE_CONFIG.disclaimer}
        </p>
      </div>
    </div>
  );
};
