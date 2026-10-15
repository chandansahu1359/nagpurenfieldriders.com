import React from "react";
import { HomeHero } from "./components/HomeHero";
import { HomeDestinationMap } from "./components/HomeDestinationMap";
import { HomeCulture } from "./components/HomeCulture";
import { HomeFeaturedExpeditions } from "./components/HomeFeaturedExpeditions";
import { HomeCreed } from "./components/HomeCreed";
import { HomeMerchandise } from "./components/HomeMerchandise";
import { HomeCTA } from "./components/HomeCTA";

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Entry & Origin */}
      <HomeHero />

      {/* 2. Routes from Zero Mile Journey Showcase */}
      <HomeDestinationMap />

      {/* 3. The Human Side & Brotherhood */}
      <HomeCulture />

      {/* 4. The Roads & Diverse Expedition Formats */}
      <HomeFeaturedExpeditions />

      {/* 5. Discipline, Safety & Road Code */}
      <HomeCreed />

      {/* 6. Community Merchandise Showcase */}
      <HomeMerchandise />

      {/* 7. Meaningful Closing CTA */}
      <HomeCTA />
    </div>
  );
};
