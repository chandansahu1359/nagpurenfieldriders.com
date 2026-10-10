import React from "react";
import Image from "next/image";
import { COMMUNITY_PILLARS } from "@/features/home/data/community.data";
import { Badge } from "@/components/ui/Badge";
import { Users2, Coffee, Shield, HeartHandshake } from "lucide-react";

export const HomeCulture: React.FC = () => {
  return (
    <section
      id="brotherhood"
      className="relative bg-[#0b0b0e] py-24 sm:py-32 border-b border-zinc-900 overflow-hidden"
      aria-label="Community Culture and Brotherhood"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <Badge variant="amber" size="sm" icon={<Users2 className="w-3.5 h-3.5" />}>
            THE HUMAN SIDE
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight mt-3 mb-4">
            THE MOTORCYCLE UNITES US. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">
              THE BROTHERHOOD KEEPS US RIDING.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            NER is never just iron, chrome, and exhaust notes. It is the cold
            4:30 AM engines ticking in unison, steaming glasses of highway chai,
            a glove tapped on a shoulder when fatigue sets in, and the certainty
            that nobody rides alone.
          </p>
        </div>

        {/* Featured Culture Spotlight with the Roadside Dhaba image */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-900/50 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Photography (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px]">
              <Image
                src="/images/community/chai-dhaba-dawn.jpg"
                alt="NER riders sharing hot chai at a roadside highway dhaba at sunrise"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-zinc-950/90" />
            </div>

            {/* Editorial Story (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-zinc-950/80 backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
                  <Coffee className="w-4 h-4 text-amber-500" />
                  <span>The 5:30 AM Dhaba Ritual</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
                  Chai, Pakodas &amp; Road Stories
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  Before the city of Nagpur begins its day, the rumble gathers.
                  We hit the open bypass, ride past the morning mist, and pull
                  over at our favorite rustic dhabas. Helmets line the wooden tables;
                  hot cutting chai steams in cold palms. This is where friendships
                  turn into family.
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 border-t border-zinc-800 pt-4">
                  <div>
                    <span className="text-white font-bold block text-base font-mono">
                      52+
                    </span>
                    <span>Breakfast Runs / Year</span>
                  </div>
                  <div className="w-[1px] h-8 bg-zinc-800" />
                  <div>
                    <span className="text-white font-bold block text-base font-mono">
                      100%
                    </span>
                    <span>Zero Rider Left Behind</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-500" />
                <span>RESPECT • CAMARADERIE • BROTHERHOOD</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Community Ethos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMMUNITY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-2">
                  {pillar.subtitle}
                </span>
                <h4 className="text-xl font-bold uppercase text-white mb-3">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {pillar.metrics && (
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-300">{pillar.metrics.label}</span>
                  <span className="text-amber-400 font-bold">
                    {pillar.metrics.value}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
