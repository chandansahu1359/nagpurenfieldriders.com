import React from "react";
import { AboutHero } from "./components/AboutHero";
import { AboutOrigin } from "./components/AboutOrigin";
import { AboutPhilosophy } from "./components/AboutPhilosophy";
import { AboutCulture } from "./components/AboutCulture";
import { AboutProtocols } from "./components/AboutProtocols";
import { AboutExperiences } from "./components/AboutExperiences";
import { AboutCTA } from "./components/AboutCTA";

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Opening & Ethos */}
      <AboutHero />

      {/* 2. Geographic Heart & Independent Origin Story */}
      <AboutOrigin />

      {/* 3. The Cadence of Open Asphalt: What We Ride For */}
      <AboutPhilosophy />

      {/* 4. The Five Pillars of NER Culture */}
      <AboutCulture />

      {/* 5. Non-Negotiable Road Protocols & Safety Creed */}
      <AboutProtocols />

      {/* 6. The Spectrum of Rides */}
      <AboutExperiences />

      {/* 7. Closing Invitation to Connect */}
      <AboutCTA />
    </div>
  );
};
