"use client";

import { AppProvider } from "@/lib/store";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="cinema-bg min-h-dvh flex flex-col">
        <div className="flex-1 mx-auto w-full max-w-lg">{children}</div>
        <BottomNav />
      </div>
    </AppProvider>
  );
}
