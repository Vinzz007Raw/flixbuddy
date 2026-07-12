"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/post", label: "Post", icon: PlusCircle, primary: true },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  // Hide on chat detail (full screen chat)
  if (pathname.startsWith("/chat/") && pathname !== "/chat") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-elevated/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-lg flex items-stretch justify-around h-16 px-1">
        {items.map(({ href, label, icon: Icon, primary }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");

          if (primary) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center flex-1 -mt-3"
              >
                <span className="h-12 w-12 rounded-2xl bg-accent shadow-lg shadow-accent/30 flex items-center justify-center text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <span className="text-[10px] font-semibold mt-1 text-accent">
                  {label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors",
                active ? "text-accent" : "text-dim hover:text-muted"
              )}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
