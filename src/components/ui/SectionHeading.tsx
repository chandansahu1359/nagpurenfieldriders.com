import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/utils/cn";

export interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  subtitle,
  align = "left",
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {badgeText && (
        <Badge variant="amber" size="sm">
          {badgeText}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};
