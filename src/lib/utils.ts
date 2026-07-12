import { clsx, type ClassValue } from "clsx";
import type { Listing, ListingWithDetails, Movie, Theater, User } from "./types";
import { movies, theaters, users } from "./data";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export function formatPrice(price: number | null): string {
  if (price === null || price === 0) return "Free";
  return `₹${price}`;
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function enrichListing(
  listing: Listing,
  movieList: Movie[] = movies,
  theaterList: Theater[] = theaters,
  userList: User[] = users
): ListingWithDetails | null {
  const movie = movieList.find((m) => m.id === listing.movieId);
  const theater = theaterList.find((t) => t.id === listing.theaterId);
  const sharer = userList.find((u) => u.id === listing.sharerId);
  if (!movie || !theater || !sharer) return null;
  return { ...listing, movie, theater, sharer };
}

export function enrichListings(listings: Listing[]): ListingWithDetails[] {
  return listings
    .map((l) => enrichListing(l))
    .filter((l): l is ListingWithDetails => l !== null);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
