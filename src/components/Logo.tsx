"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand assets in /public (must match filenames on GitHub/Vercel):
 * - Flix_Buddy_Logo.png  → full wordmark
 * - FB icon.png          → compact mark (space in name → use %20 in URL)
 *
 * Also supports local copies named logo.png / icon.png as fallbacks.
 */
const FULL_LOGO_CANDIDATES = [
  "/Flix_Buddy_Logo.png",
  "/logo.png",
];
const ICON_LOGO_CANDIDATES = [
  "/FB%20icon.png",
  "/icon.png",
];

export function Logo({
  href = "/",
  /** full = wordmark; mark = FB icon */
  variant = "full",
  size = "md",
  className,
}: {
  href?: string;
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const fullHeights = {
    sm: "h-9",
    md: "h-12 sm:h-14",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const fullMaxWidths = {
    sm: "max-w-[200px]",
    md: "max-w-[280px] sm:max-w-[320px]",
    lg: "max-w-[340px] sm:max-w-[400px]",
    xl: "max-w-[400px] sm:max-w-[480px]",
  };

  const markHeights = {
    sm: "h-9",
    md: "h-11 sm:h-12",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const markMaxWidths = {
    sm: "max-w-[100px]",
    md: "max-w-[140px] sm:max-w-[160px]",
    lg: "max-w-[180px] sm:max-w-[210px]",
    xl: "max-w-[240px] sm:max-w-[280px]",
  };

  const candidates =
    variant === "mark" ? ICON_LOGO_CANDIDATES : FULL_LOGO_CANDIDATES;
  const primarySrc = candidates[0];

  const content = (
    <span className={cn("inline-flex items-center shrink-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={primarySrc}
        alt="FlixBuddy"
        className={cn(
          "w-auto object-contain object-left select-none",
          variant === "mark"
            ? cn(markHeights[size], markMaxWidths[size])
            : cn(fullHeights[size], fullMaxWidths[size])
        )}
        onError={(e) => {
          const img = e.currentTarget;
          const idx = candidates.indexOf(img.getAttribute("src") || "");
          const next = candidates[idx + 1];
          if (next) img.src = next;
        }}
      />
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="FlixBuddy home"
    >
      {content}
    </Link>
  );
}
