"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Plus, Sparkles, ShieldCheck, Users } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { MovieCard } from "@/components/MovieCard";
import { ListingCard } from "@/components/ListingCard";
import { Button, SectionTitle } from "@/components/ui";
import { movies } from "@/lib/data";
import { useApp } from "@/lib/store";
import { enrichListings } from "@/lib/utils";

export default function HomePage() {
  const { listings } = useApp();
  const [query, setQuery] = useState("");

  const trending = movies.filter((m) => m.trending);
  const enriched = useMemo(() => enrichListings(listings), [listings]);
  const featured = useMemo(() => {
    let list = enriched.filter((l) => l.status === "active");
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.movie.title.toLowerCase().includes(q) ||
          l.theater.name.toLowerCase().includes(q) ||
          l.theater.area.toLowerCase().includes(q)
      );
    }
    return list.slice(0, 4);
  }, [enriched, query]);

  return (
    <div className="pb-safe">
      <TopBar showLocation />

      <main className="px-4 pt-4 space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-elevated to-soft p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Hyderabad · Social first
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-2">
              Never watch alone
              <br />
              <span className="text-accent">unless you want to</span>
            </h1>
            <p className="text-sm text-muted max-w-sm mb-4">
              Find companions, share extra seats, and enjoy movies together —
              with ticket proof & in-app chat.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/post">
                <Button size="lg">
                  <Plus className="h-4 w-4" />
                  Post your seats
                </Button>
              </Link>
              <Link href="/browse">
                <Button size="lg" variant="outline">
                  Browse listings
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search */}
        <section>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, theaters, areas…"
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-card border border-border text-sm placeholder:text-dim focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </section>

        {/* Trust strip */}
        <section className="grid grid-cols-3 gap-2">
          {[
            { icon: ShieldCheck, label: "Verified proof", color: "text-gold" },
            { icon: Users, label: "Companions first", color: "text-accent" },
            { icon: Search, label: "Hyderabad only", color: "text-[var(--info)]" },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card px-2 py-3 text-center"
            >
              <Icon className={`h-4 w-4 mx-auto mb-1 ${color}`} />
              <p className="text-[10px] font-medium text-muted leading-tight">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Trending movies */}
        <section>
          <SectionTitle
            title="Trending in Hyderabad"
            action={
              <Link
                href="/browse"
                className="text-xs font-semibold text-accent hover:underline"
              >
                See all
              </Link>
            }
          />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Featured listings */}
        <section>
          <SectionTitle
            title={query ? "Search results" : "Open seats near you"}
            action={
              <Link
                href="/browse"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Filters
              </Link>
            }
          />
          <div className="space-y-3">
            {featured.length === 0 ? (
              <p className="text-sm text-muted py-8 text-center">
                No listings match your search. Try another movie or{" "}
                <Link href="/post" className="text-accent font-medium">
                  post seats
                </Link>
                .
              </p>
            ) : (
              featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </div>
          {featured.length > 0 && (
            <div className="mt-4">
              <Link href="/browse">
                <Button variant="secondary" className="w-full">
                  View all listings
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <p className="text-[11px] text-dim text-center leading-relaxed pb-2">
          FlixBuddy is a social connector — not a ticket marketplace. Always
          verify tickets and follow theater policies.
        </p>
      </main>
    </div>
  );
}
