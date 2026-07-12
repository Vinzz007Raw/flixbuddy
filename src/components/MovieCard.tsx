import Link from "next/link";
import type { Movie } from "@/lib/types";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/browse?movie=${movie.id}`}
      className="group shrink-0 w-[120px] sm:w-[140px]"
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-soft border border-border mb-2 transition-transform group-hover:scale-[1.02]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
            {movie.language}
          </span>
        </div>
        {movie.trending && (
          <span className="absolute top-2 right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            Hot
          </span>
        )}
      </div>
      <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
        {movie.title}
      </p>
      <p className="text-[11px] text-dim mt-0.5">View seats →</p>
    </Link>
  );
}
