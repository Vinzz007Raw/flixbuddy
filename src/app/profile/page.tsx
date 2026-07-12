"use client";

import Link from "next/link";
import { useMemo } from "react";
import { TopBar } from "@/components/TopBar";
import { Avatar, Button, StarRow, EmptyState } from "@/components/ui";
import { ListingCard } from "@/components/ListingCard";
import { useApp } from "@/lib/store";
import { enrichListings } from "@/lib/utils";
import {
  LogOut,
  Shield,
  Star,
  Ticket,
  MapPin,
  User as UserIcon,
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, logout, listings } = useApp();

  const myListings = useMemo(() => {
    if (!currentUser) return [];
    return enrichListings(
      listings.filter((l) => l.sharerId === currentUser.id)
    );
  }, [currentUser, listings]);

  if (!currentUser) {
    return (
      <div className="pb-safe">
        <TopBar title="Profile" />
        <EmptyState
          icon={<UserIcon className="h-6 w-6" />}
          title="You're not logged in"
          description="Create a profile to post seats, chat, and build trust ratings."
          action={
            <Link href="/login?next=/profile">
              <Button size="lg">Login with phone</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="pb-safe">
      <TopBar title="Profile" />

      <main className="px-4 pt-6 space-y-6">
        <section className="rounded-3xl border border-border bg-card p-5 text-center">
          <Avatar label={currentUser.avatar} size="lg" className="mx-auto mb-3 h-16 w-16 text-lg" />
          <h1 className="font-display text-xl font-bold">{currentUser.name}</h1>
          <p className="text-sm text-muted mt-0.5">{currentUser.bio}</p>
          <div className="mt-2 flex justify-center">
            <StarRow
              rating={currentUser.rating}
              count={currentUser.reviewCount}
            />
          </div>
          <p className="text-xs text-dim mt-2">{currentUser.phone}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted bg-soft px-3 py-1.5 rounded-full border border-border">
            <MapPin className="h-3 w-3 text-accent" />
            Hyderabad
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {[
            {
              icon: Ticket,
              label: "Listings",
              value: String(myListings.length),
            },
            {
              icon: Star,
              label: "Rating",
              value: currentUser.rating.toFixed(1),
            },
            {
              icon: Shield,
              label: "Status",
              value: currentUser.verified ? "Verified" : "New",
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card p-3 text-center"
            >
              <Icon className="h-4 w-4 mx-auto text-muted mb-1" />
              <p className="text-sm font-bold">{value}</p>
              <p className="text-[10px] text-dim">{label}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-display font-bold text-lg mb-3">My listings</h2>
          {myListings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted mb-3">
                You haven&apos;t posted any seats yet.
              </p>
              <Link href="/post">
                <Button>Post seats</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myListings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-soft/40 p-4 text-xs text-muted space-y-2">
          <p className="font-semibold text-foreground text-sm">Safety tips</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Meet in public theater lobbies</li>
            <li>Verify tickets together before payment</li>
            <li>Use in-app chat until you feel safe</li>
            <li>Report scams immediately</li>
          </ul>
        </section>

        <Button
          variant="danger"
          className="w-full"
          onClick={() => {
            logout();
          }}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>

        <p className="text-[11px] text-dim text-center pb-2">
          FlixBuddy MVP · Demo data stored in your browser
        </p>
      </main>
    </div>
  );
}
