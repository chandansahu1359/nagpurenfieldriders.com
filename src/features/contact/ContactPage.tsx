import React from "react";
import { ContactHero } from "./components/ContactHero";
import { ContactForm } from "./components/ContactForm";
import { ContactFaq } from "./components/ContactFaq";

export const ContactPage: React.FC = () => {
  return (
    <div className="relative pt-28 pb-16 sm:pb-24 overflow-hidden w-full">
      {/* Ambient atmospheric backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-road-grid opacity-20" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Section 1: Hero & Contact Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Visual Storytelling & Info (5 cols on lg) */}
          <div className="lg:col-span-5">
            <ContactHero />
          </div>

          {/* Right Column: Decomposed Contact Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Section 2: Dedicated Frequently Asked Questions */}
        <ContactFaq />
      </div>
    </div>
  );
};
