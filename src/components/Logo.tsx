import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand assets (from web/Logo's/ → public/):
 * - /logo.png  → full wordmark (~2.6:1 landscape, 907×346)
 * - /icon.png  → FB mark (~1.7:1 landscape, 596×354)
 */
const FULL_LOGO = "/logo.png";
const ICON_LOGO = "/icon.png";

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
  // Height-driven sizing so new landscape ratios stay sharp
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

  // Icon is wider than square now (~1.7:1) — height + auto width
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

  const src = variant === "mark" ? ICON_LOGO : FULL_LOGO;

  const content = (
    <span className={cn("inline-flex items-center shrink-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="FlixBuddy"
        className={cn(
          "w-auto object-contain object-left select-none",
          variant === "mark"
            ? cn(markHeights[size], markMaxWidths[size])
            : cn(fullHeights[size], fullMaxWidths[size])
        )}
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
