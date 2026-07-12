"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Button, Input, Textarea, Select, Badge } from "@/components/ui";
import { movies, theaters, typeLabels } from "@/lib/data";
import { useApp } from "@/lib/store";
import type { ListingType } from "@/lib/types";
import { Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PostPage() {
  const router = useRouter();
  const { currentUser, addListing } = useApp();
  const [step, setStep] = useState<"form" | "preview" | "done">("form");
  const [error, setError] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null);

  const [movieId, setMovieId] = useState(movies[0].id);
  const [theaterId, setTheaterId] = useState(theaters[0].id);
  const [showDate, setShowDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [showTime, setShowTime] = useState("18:30");
  const [seats, setSeats] = useState(2);
  const [type, setType] = useState<ListingType>("companions");
  const [price, setPrice] = useState("220");
  const [description, setDescription] = useState("");
  const [hasProof, setHasProof] = useState(false);

  const movie = movies.find((m) => m.id === movieId)!;
  const theater = theaters.find((t) => t.id === theaterId)!;

  if (!currentUser) {
    return (
      <div className="pb-safe">
        <TopBar title="Post your seats" showBack backHref="/" />
        <div className="px-4 pt-16 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-accent/15 flex items-center justify-center">
            <Upload className="h-7 w-7 text-accent" />
          </div>
          <h2 className="font-display text-xl font-bold">Login to post seats</h2>
          <p className="text-sm text-muted max-w-xs mx-auto">
            Sign in with phone OTP (demo) so others can trust and chat with you.
          </p>
          <Link href="/login?next=/post">
            <Button size="lg">Continue with phone</Button>
          </Link>
        </div>
      </div>
    );
  }

  function handlePreview() {
    setError("");
    if (!description.trim()) {
      setError("Add a short description so people know what to expect.");
      return;
    }
    if (type !== "free" && (!price || Number(price) < 0)) {
      setError("Enter a valid price per seat, or choose Free seat.");
      return;
    }
    setStep("preview");
  }

  function handlePost() {
    const listing = addListing({
      movieId,
      theaterId,
      showDate,
      showTime,
      seats,
      type,
      pricePerSeat: type === "free" ? null : Number(price) || 0,
      description: description.trim(),
      hasProof,
    });
    if (listing) {
      setCreatedId(listing.id);
      setStep("done");
    }
  }

  if (step === "done" && createdId) {
    return (
      <div className="pb-safe">
        <TopBar title="Posted!" showBack backHref="/" />
        <div className="px-4 pt-16 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-[var(--success-soft)] flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h2 className="font-display text-xl font-bold">Your seats are live</h2>
          <p className="text-sm text-muted max-w-xs mx-auto">
            {hasProof
              ? "Ticket proof attached — listing marked verified for higher trust."
              : "You can still chat with interested people. Add proof next time for a verified badge."}
          </p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Button size="lg" onClick={() => router.push(`/listing/${createdId}`)}>
              View listing
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/browse")}>
              Browse others
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "preview") {
    return (
      <div className="pb-safe">
        <TopBar title="Preview listing" showBack />
        <main className="px-4 pt-4 space-y-4">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex gap-3 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-32 w-24 rounded-xl object-cover"
              />
              <div className="space-y-1.5">
                <h2 className="font-semibold">{movie.title}</h2>
                <p className="text-xs text-muted">
                  {theater.name} · {theater.area}
                </p>
                <p className="text-xs text-muted">
                  {showDate} · {showTime}
                </p>
                <p className="text-xs text-muted">
                  {seats} seat{seats !== 1 ? "s" : ""} ·{" "}
                  {type === "free" ? "Free" : `₹${price}/seat`}
                </p>
                <Badge variant={type === "companions" ? "accent" : "info"}>
                  {typeLabels[type]}
                </Badge>
              </div>
            </div>
            <div className="px-4 pb-4">
              <p className="text-sm text-muted">{description}</p>
              {hasProof && (
                <p className="mt-2 text-xs text-gold font-medium">
                  ✓ Ticket proof attached
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-soft/50 p-3 flex gap-2 text-xs text-muted">
            <AlertTriangle className="h-4 w-4 shrink-0 text-gold" />
            <p>
              Listings are for social connection & legitimate sharing. Follow
              theater T&Cs. FlixBuddy is not responsible for ticket validity.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>
              Edit
            </Button>
            <Button className="flex-1" onClick={handlePost}>
              Post listing
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-safe">
      <TopBar title="Post your seats" showBack backHref="/" />

      <main className="px-4 pt-4 space-y-5">
        <p className="text-sm text-muted">
          Share extra tickets or invite people to join your booking. Companions
          first — resale second.
        </p>

        <Field label="Movie">
          <Select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title} ({m.language})
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Theater (Hyderabad)">
          <Select
            value={theaterId}
            onChange={(e) => setTheaterId(e.target.value)}
          >
            {theaters.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} · {t.area}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <Input
              type="date"
              value={showDate}
              onChange={(e) => setShowDate(e.target.value)}
            />
          </Field>
          <Field label="Show time">
            <Input
              type="time"
              value={showTime}
              onChange={(e) => setShowTime(e.target.value)}
            />
          </Field>
        </div>

        <Field label="Listing type">
          <div className="grid grid-cols-1 gap-2">
            {(
              [
                ["companions", "Companions wanted / split cost"],
                ["sell", "Sell / transfer"],
                ["free", "Free seat"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={cn(
                  "text-left px-3.5 py-3 rounded-xl border text-sm transition-colors",
                  type === value
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border bg-soft text-muted hover:border-accent/30"
                )}
              >
                <span className="font-semibold">{label}</span>
                {value === "companions" && type === value && (
                  <span className="block text-[11px] text-accent mt-0.5">
                    Recommended — social-first
                  </span>
                )}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Seats available">
            <Input
              type="number"
              min={1}
              max={10}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value) || 1)}
            />
          </Field>
          <Field label="Price per seat (₹)">
            <Input
              type="number"
              min={0}
              disabled={type === "free"}
              value={type === "free" ? "0" : price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Face value"
            />
          </Field>
        </div>

        <Field label="Description">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Who are you looking for? Seat row? Any preferences?"
            maxLength={300}
          />
          <p className="text-[11px] text-dim mt-1">{description.length}/300</p>
        </Field>

        <Field label="Ticket proof">
          <button
            type="button"
            onClick={() => setHasProof((v) => !v)}
            className={cn(
              "w-full flex items-center gap-3 p-4 rounded-xl border border-dashed transition-colors",
              hasProof
                ? "border-success bg-[var(--success-soft)]"
                : "border-border bg-soft hover:border-accent/40"
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center",
                hasProof ? "bg-success/20 text-success" : "bg-card text-muted"
              )}
            >
              {hasProof ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">
                {hasProof ? "Proof attached (demo)" : "Upload ticket screenshot / QR"}
              </p>
              <p className="text-[11px] text-muted">
                {hasProof
                  ? "Tap to remove · boosts trust with verified badge"
                  : "Optional but strongly recommended for verification"}
              </p>
            </div>
          </button>
        </Field>

        {error && (
          <p className="text-sm text-accent bg-accent/10 border border-accent/20 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <Button size="lg" className="w-full" onClick={handlePreview}>
          Preview & Post
        </Button>

        <p className="text-[11px] text-dim text-center pb-2">
          By posting you agree to share only legitimate tickets you own and
          respect theater policies.
        </p>
      </main>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}
