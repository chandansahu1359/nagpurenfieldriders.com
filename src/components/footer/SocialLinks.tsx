import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants/social";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  CommunityIcon,
} from "@/components/ui/SocialIcons";

export const SocialLinks: React.FC = () => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <InstagramIcon className="w-[18px] h-[18px] shrink-0 group-hover:scale-110 transition-transform duration-300" />;
      case "youtube":
        return <YoutubeIcon className="w-[18px] h-[18px] shrink-0 group-hover:scale-110 transition-transform duration-300" />;
      case "facebook":
        return <FacebookIcon className="w-[18px] h-[18px] shrink-0 group-hover:scale-110 transition-transform duration-300" />;
      case "community":
      case "community contact":
        return (
          <CommunityIcon className="w-[18px] h-[18px] shrink-0 text-amber-500 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />
        );
      default:
        return <Mail className="w-[18px] h-[18px] shrink-0 text-zinc-400 group-hover:text-amber-400 transition-colors" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
          FOLLOW THE RIDE
        </span>
        <span className="text-xs text-zinc-400">
          Raw road dispatches, expedition archives, and community broadcasts.
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        {SOCIAL_LINKS.map((link) => {
          const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");

          const innerContent = (
            <>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center shrink-0 w-6 h-6 transition-colors">
                  {getIcon(link.platform)}
                </span>
                <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {link.platform}
                </span>
              </div>

              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </>
          );

          if (isExternal) {
            return (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/40 transition-all text-xs font-mono text-zinc-300 hover:text-white"
              >
                {innerContent}
              </a>
            );
          }

          return (
            <Link
              key={link.platform}
              href={link.href}
              className="group flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/40 transition-all text-xs font-mono text-zinc-300 hover:text-white"
            >
              {innerContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

