"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface JoinNerButtonProps {
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export const JoinNerButton: React.FC<JoinNerButtonProps> = ({
  className = "",
  onClick,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-xs tracking-wider",
    lg: "px-7 py-3.5 text-sm tracking-widest",
  };

  return (
    <Link
      href="/contact"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 font-mono uppercase font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg shadow-amber-500/15 hover:shadow-amber-500/30 transition-all duration-300 active:scale-95 cursor-pointer select-none ${sizeClasses[size]} ${className}`}
    >
      <span>JOIN NER</span>
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
};
