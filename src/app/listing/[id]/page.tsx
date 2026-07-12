"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Ticket,
  ShieldCheck,
  MessageCircle,
  Flag,
  AlertTriangle,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Avatar, Badge, Button, StarRow } from "@/components/ui";
import { typeLabels } from "@/lib/data";
import { useApp } from "@/lib/store";
import {
  enrichListing,
  formatDate,
  formatPrice,
  formatTime,
  formatRelativeTime,
} from "@/lib/utils";

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { listings, currentUser, startChat, users } = useApp();

  const listing = useMemo(() => {
    const raw = listings.find((l) => l.id === id);
    if (!raw) return null;
    return enrichListing(raw, undefined, undefined, users);
  }, [listings, id, users]);

  if (!listing) {
    return (
      <div className="pb-safe">
        <TopBar title="Listing" showBack backHref="/browse" />
        <p className="p-8 text-center text-muted text-sm">
          Listing not found.{" "}
          <Link href="/browse" className="text-accent">
            Browse seats
          </Link>
        </p>
      </div>
    );
  }

  function handleInterested() {
    if (!currentUser) {
      router.push(`/login?next=/listing/${id}`);
      return;
    }
    if (currentUser.id === listing!.sharerId) {
      alert("This is your own listing.");
      return;
    }
    const chatId = startChat(listing!.id);
    if (chatId) router.push(`/chat/${chatId}`);
  }

  const typeVariant =
    listing.type === "companions"
      ? "accent"
      : listing.type === "free"
        ? "success"
        : "info";

  return (
    <div className="pb-safe">
      <TopBar title="Listing details" showBack backHref="/browse" />

      <main className="space-y-0">
        {/* Hero poster */}
        <div className="relative h-56 w-full bg-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.movie.poster}
            alt={listing.movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant={typeVariant}>{typeLabels[listing.type]}</Badge>
              {listing.verified && (
                <Badge variant="gold">
                  <ShieldCheck className="h-3 w-3" />
                  Verified proof
                </Badge>
              )}
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              {listing.movie.title}
            </h1>
            <p className="text-sm text-muted">
              {listing.movie.language} · {listing.movie.genre}
            </p>
          </div>
        </div>

        <div className="px-4 space-y-5 pt-2">
          {/* Meta */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <MetaRow
              icon={<MapPin className="h-4 w-4" />}
              label="Theater"
              value={`${listing.theater.name} · ${listing.theater.area}`}
            />
            <MetaRow
              icon={<Clock className="h-4 w-4" />}
              label="Show"
              value={`${formatDate(listing.showDate)} · ${formatTime(listing.showTime)}`}
            />
            <MetaRow
              icon={<Ticket className="h-4 w-4" />}
              label="Seats"
              value={`${listing.seatsLeft} available · ${formatPrice(listing.pricePerSeat)}${listing.pricePerSeat ? " / seat" : ""}`}
            />
          </div>

          {/* Sharer */}
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <Avatar label={listing.sharer.avatar} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold truncate">{listing.sharer.name}</p>
                {listing.sharer.verified && (
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted truncate">{listing.sharer.bio}</p>
              <StarRow
                rating={listing.sharer.rating}
                count={listing.sharer.reviewCount}
              />
            </div>
          </div>

          {/* Description */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              About this listing
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {listing.description}
            </p>
            <p className="text-[11px] text-dim mt-2">
              Posted {formatRelativeTime(listing.createdAt)}
            </p>
          </section>

          {/* Ticket proof */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Ticket proof
            </h2>
            {listing.hasProof ? (
              <div className="rounded-2xl border border-gold/30 bg-[var(--gold-soft)] p-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-soft border border-border flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Screenshot / QR uploaded
                  </p>
                  <p className="text-xs text-muted">
                    {listing.verified
                      ? "Reviewed & verified for higher trust"
                      : "Pending review — chat still available"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-soft p-4 text-sm text-muted">
                No ticket proof uploaded for this listing.
              </div>
            )}
          </section>

          {/* Safety */}
          <div className="rounded-xl border border-border bg-soft/40 p-3 flex gap-2 text-xs text-muted">
            <AlertTriangle className="h-4 w-4 shrink-0 text-gold mt-0.5" />
            <p>
              Chat in-app first. Never share OTPs or pay outside agreed terms.
              Report anything suspicious. Ticket transfer is subject to theater
              rules.
            </p>
          </div>

          <div className="flex gap-2 pb-2">
            <Button
              variant="outline"
              className="shrink-0"
              onClick={() => alert("Report received (demo). Our team will review.")}
            >
              <Flag className="h-4 w-4" />
            </Button>
            <Button className="flex-1" size="lg" onClick={handleInterested}>
              <MessageCircle className="h-4 w-4" />
              I&apos;m interested — Start chat
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-xl bg-soft flex items-center justify-center text-muted shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-dim uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
