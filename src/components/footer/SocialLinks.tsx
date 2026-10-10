import React from "react";
import { SOCIAL_LINKS } from "@/constants/social";
import { ArrowUpRight, Mail } from "lucide-react";

const InstagramIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const SocialLinks: React.FC = () => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <InstagramIcon />;
      case "youtube":
        return <YoutubeIcon />;
      case "facebook":
        return <FacebookIcon />;
      default:
        return <Mail className="w-4 h-4" />;
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
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/40 transition-all text-xs font-mono text-zinc-300 hover:text-white"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-zinc-400 group-hover:text-amber-400 transition-colors">
                {getIcon(link.platform)}
              </span>
              <span>{link.platform}</span>
            </div>

            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        ))}
      </div>
    </div>
  );
};
