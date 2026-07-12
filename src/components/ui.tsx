import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 disabled:opacity-50",
    secondary: "bg-soft text-foreground hover:bg-border",
    ghost: "bg-transparent text-muted hover:text-foreground hover:bg-soft",
    outline:
      "bg-transparent border border-border text-foreground hover:border-accent/50 hover:bg-soft",
    danger: "bg-accent/15 text-accent hover:bg-accent/25",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm rounded-xl",
    md: "h-11 px-4 text-sm font-semibold rounded-xl",
    lg: "h-12 px-6 text-base font-semibold rounded-2xl",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full h-11 px-3.5 rounded-xl bg-soft border border-border text-foreground placeholder:text-dim text-sm transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full min-h-[100px] px-3.5 py-3 rounded-xl bg-soft border border-border text-foreground placeholder:text-dim text-sm transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20 resize-y",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full h-11 px-3.5 rounded-xl bg-soft border border-border text-foreground text-sm transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20 appearance-none",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "gold" | "success" | "info";
  className?: string;
}) {
  const variants = {
    default: "bg-soft text-muted border-border",
    accent: "bg-[var(--accent-soft)] text-accent border-accent/20",
    gold: "bg-[var(--gold-soft)] text-gold border-gold/20",
    success: "bg-[var(--success-soft)] text-success border-success/20",
    info: "bg-[var(--info-soft)] text-[var(--info)] border-[var(--info)]/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({
  label,
  size = "md",
  className,
}: {
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-accent to-rose-800 flex items-center justify-center font-bold text-white shrink-0",
        sizes[size],
        className
      )}
    >
      {label.slice(0, 2)}
    </div>
  );
}

export function SectionTitle({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between mb-3", className)}>
      <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-14 w-14 rounded-2xl bg-soft flex items-center justify-center text-muted mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-xs mb-4">{description}</p>
      {action}
    </div>
  );
}

export function StarRow({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <span className="text-gold">★</span>
      <span className="text-foreground font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && <span>({count})</span>}
    </span>
  );
}
