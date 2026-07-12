"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ListingCard } from "@/components/ListingCard";
import { EmptyState } from "@/components/ui";
import { areas, movies, typeBadge } from "@/lib/data";
import { useApp } from "@/lib/store";
import { enrichListings, cn } from "@/lib/utils";
import { Filter, Ticket } from "lucide-react";
import type { ListingType } from "@/lib/types";

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialMovie = searchParams.get("movie") ?? "all";
  const { listings } = useApp();

  const [movieId, setMovieId] = useState(initialMovie);
  const [area, setArea] = useState("All areas");
  const [type, setType] = useState<"all" | ListingType>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const enriched = useMemo(() => enrichListings(listings), [listings]);

  const filtered = useMemo(() => {
    return enriched.filter((l) => {
      if (l.status !== "active") return false;
      if (movieId !== "all" && l.movieId !== movieId) return false;
      if (area !== "All areas" && l.theater.area !== area) return false;
      if (type !== "all" && l.type !== type) return false;
      if (verifiedOnly && !l.verified) return false;
      return true;
    });
  }, [enriched, movieId, area, type, verifiedOnly]);

  const chips: { key: string; label: string; active: boolean; onClick: () => void }[] = [
    {
      key: "verified",
      label: "✓ Verified",
      active: verifiedOnly,
      onClick: () => setVerifiedOnly((v) => !v),
    },
    {
      key: "companions",
      label: typeBadge.companions,
      active: type === "companions",
      onClick: () => setType((t) => (t === "companions" ? "all" : "companions")),
    },
    {
      key: "sell",
      label: typeBadge.sell,
      active: type === "sell",
      onClick: () => setType((t) => (t === "sell" ? "all" : "sell")),
    },
    {
      key: "free",
      label: typeBadge.free,
      active: type === "free",
      onClick: () => setType((t) => (t === "free" ? "all" : "free")),
    },
  ];

  return (
    <div className="pb-safe">
      <TopBar title="Browse & Discover" showBack backHref="/" />

      <main className="px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            <span className="text-foreground font-semibold">{filtered.length}</span>{" "}
            listing{filtered.length !== 1 ? "s" : ""} in Hyderabad
          </p>
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent"
          >
            <Filter className="h-3.5 w-3.5" />
            {showFilters ? "Hide" : "Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.onClick}
                  className={cn(
                    "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors",
                    chip.active
                      ? "bg-accent text-white border-accent"
                      : "bg-card text-muted border-border hover:border-accent/40"
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
                className="h-10 px-3 rounded-xl bg-card border border-border text-xs text-foreground"
              >
                <option value="all">All movies</option>
                {movies.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="h-10 px-3 rounded-xl bg-card border border-border text-xs text-foreground"
              >
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Ticket className="h-6 w-6" />}
              title="No matching seats"
              description="Try clearing filters or post your own seats for this show."
            />
          ) : (
            filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="pb-safe">
          <TopBar title="Browse & Discover" showBack backHref="/" />
          <p className="p-8 text-center text-muted text-sm">Loading…</p>
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
