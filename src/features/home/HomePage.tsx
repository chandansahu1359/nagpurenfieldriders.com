import React from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { HomeHero } from "./components/HomeHero";
import { HomeStats } from "./components/HomeStats";
import { HomeDestinationMap } from "./components/HomeDestinationMap";
import { HomeCulture } from "./components/HomeCulture";
import { HomeFeaturedExpeditions } from "./components/HomeFeaturedExpeditions";
import { HomeCreed } from "./components/HomeCreed";
import { HomeCTA } from "./components/HomeCTA";

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Global Navigation */}
      <Header />

      {/* Main Narrative Progression */}
      <main className="flex-1">
        {/* 1. Cinematic Entry & Origin */}
        <HomeHero />

        {/* 2. Scale & Visual Proof Over Text */}
        <HomeStats />

        {/* 3. Centerpiece: Destination & Distance Storytelling */}
        <HomeDestinationMap />

        {/* 4. The Human Side & Brotherhood */}
        <HomeCulture />

        {/* 5. The Roads & Diverse Expedition Formats */}
        <HomeFeaturedExpeditions />

        {/* 6. Discipline, Safety & Road Code */}
        <HomeCreed />

        {/* 7. Meaningful Closing CTA */}
        <HomeCTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
