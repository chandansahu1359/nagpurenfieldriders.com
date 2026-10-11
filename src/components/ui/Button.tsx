import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  isExternal = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:opacity-50 disabled:pointer-events-none select-none tracking-wide cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-md gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-lg gap-2",
    lg: "text-base px-7 py-3.5 rounded-lg gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 active:scale-[0.98]",
    secondary:
      "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-zinc-900/60 text-zinc-200 border border-zinc-700 hover:border-amber-500/60 hover:text-amber-400 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 active:scale-[0.98]",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }

    // In-page section scrolling uses <Link>, cross-page navigation uses <a> anchor tag
    const isSamePageScroll = href.startsWith("#");

    if (isSamePageScroll) {
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
