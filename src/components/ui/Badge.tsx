import React from "react";
import { cn } from "@/utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "amber" | "neutral" | "outline" | "danger";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "amber",
  size = "md",
  className,
  icon,
}) => {
  const baseStyles =
    "inline-flex items-center font-mono font-medium tracking-wider uppercase rounded-full border shrink-0";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    amber:
      "bg-amber-500/10 text-amber-400 border-amber-500/30",
    neutral:
      "bg-zinc-800/80 text-zinc-300 border-zinc-700/60",
    outline:
      "bg-transparent text-zinc-400 border-zinc-800",
    danger:
      "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
