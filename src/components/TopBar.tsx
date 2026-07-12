"use client";

import Link from "next/link";
import { MapPin, Bell } from "lucide-react";
import { useApp } from "@/lib/store";
import { Avatar } from "./ui";

export function TopBar({
  title,
  showLocation = false,
  showBack = false,
  backHref = "/",
  right,
}: {
  title?: string;
  showLocation?: boolean;
  showBack?: boolean;
  backHref?: string;
  right?: React.ReactNode;
}) {
  const { currentUser } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-lg px-4 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {showBack ? (
            <Link
              href={backHref}
              className="text-muted hover:text-foreground text-sm font-medium mr-1"
            >
              ← Back
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="h-8 w-8 rounded-xl bg-accent flex items-center justify-center text-white font-display font-bold text-sm shadow-md shadow-accent/30">
                FB
              </span>
              {!title && (
                <span className="font-display font-bold text-lg tracking-tight">
                  Flix<span className="text-accent">Buddy</span>
                </span>
              )}
            </Link>
          )}
          {title && (
            <h1 className="font-display font-bold text-base truncate">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {showLocation && (
            <div className="hidden xs:flex items-center gap-1 text-xs text-muted bg-soft px-2.5 py-1.5 rounded-full border border-border">
              <MapPin className="h-3 w-3 text-accent" />
              Hyderabad
            </div>
          )}
          {right}
          {!right && (
            <>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-soft border border-border flex items-center justify-center text-muted hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <Link href={currentUser ? "/profile" : "/login"}>
                {currentUser ? (
                  <Avatar label={currentUser.avatar} size="sm" />
                ) : (
                  <span className="text-xs font-semibold text-accent px-2">
                    Login
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
      {showLocation && (
        <div className="mx-auto max-w-lg px-4 pb-2 -mt-1 flex sm:hidden">
          <div className="inline-flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3 w-3 text-accent" />
            Hyderabad · Social movie seats
          </div>
        </div>
      )}
    </header>
  );
}
