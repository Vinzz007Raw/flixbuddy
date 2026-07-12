import Link from "next/link";
import { Badge, Avatar, StarRow } from "./ui";
import type { ListingWithDetails } from "@/lib/types";
import { typeBadge } from "@/lib/data";
import { formatDate, formatPrice, formatTime } from "@/lib/utils";
import { MapPin, Clock, Ticket, ShieldCheck } from "lucide-react";

export function ListingCard({ listing }: { listing: ListingWithDetails }) {
  const typeVariant =
    listing.type === "companions"
      ? "accent"
      : listing.type === "free"
        ? "success"
        : "info";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="card-lift block rounded-2xl border border-border bg-card overflow-hidden"
    >
      <div className="flex gap-3 p-3">
        <div className="relative h-28 w-20 shrink-0 rounded-xl overflow-hidden bg-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.movie.poster}
            alt={listing.movie.title}
            className="h-full w-full object-cover"
          />
          {listing.verified && (
            <div className="absolute top-1 left-1">
              <span className="inline-flex items-center gap-0.5 bg-black/70 backdrop-blur px-1.5 py-0.5 rounded-md text-[10px] text-gold font-semibold">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">
                {listing.movie.title}
              </h3>
              <p className="text-[11px] text-dim mt-0.5">
                {listing.movie.language} · {listing.movie.genre}
              </p>
            </div>
            <Badge variant={typeVariant}>{typeBadge[listing.type]}</Badge>
          </div>

          <div className="mt-2 space-y-1 text-xs text-muted">
            <p className="flex items-center gap-1.5 truncate">
              <MapPin className="h-3 w-3 shrink-0 text-dim" />
              {listing.theater.name} · {listing.theater.area}
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 shrink-0 text-dim" />
              {formatDate(listing.showDate)} · {formatTime(listing.showTime)}
            </p>
            <p className="flex items-center gap-1.5">
              <Ticket className="h-3 w-3 shrink-0 text-dim" />
              {listing.seatsLeft} seat{listing.seatsLeft !== 1 ? "s" : ""} ·{" "}
              <span className="text-foreground font-medium">
                {formatPrice(listing.pricePerSeat)}
                {listing.pricePerSeat ? "/seat" : ""}
              </span>
            </p>
          </div>

          <div className="mt-auto pt-2 flex items-center gap-2">
            <Avatar label={listing.sharer.avatar} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">
                {listing.sharer.name}
              </p>
              <StarRow
                rating={listing.sharer.rating}
                count={listing.sharer.reviewCount}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
