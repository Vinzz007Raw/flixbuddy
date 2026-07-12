"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Send, ShieldCheck } from "lucide-react";
import { Avatar, Button } from "@/components/ui";
import { useApp } from "@/lib/store";
import { enrichListing, cn } from "@/lib/utils";

export default function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const {
    currentUser,
    getConversation,
    getMessages,
    sendMessage,
    users,
    listings,
  } = useApp();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const conversation = getConversation(id);
  const messages = getMessages(id);

  const meta = useMemo(() => {
    if (!conversation || !currentUser) return null;
    const otherId =
      conversation.seekerId === currentUser.id
        ? conversation.sharerId
        : conversation.seekerId;
    const other = users.find((u) => u.id === otherId);
    const listing = listings.find((l) => l.id === conversation.listingId);
    const enriched = listing
      ? enrichListing(listing, undefined, undefined, users)
      : null;
    return { other, enriched };
  }, [conversation, currentUser, users, listings]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!currentUser) router.replace(`/login?next=/chat/${id}`);
  }, [currentUser, id, router]);

  if (!currentUser) {
    return (
      <p className="p-8 text-center text-muted text-sm">Redirecting…</p>
    );
  }

  if (!conversation) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6">
        <p className="text-sm text-muted">
          Conversation not found.{" "}
          <Link href="/chat" className="text-accent">
            Back to chats
          </Link>
        </p>
      </div>
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(id, text);
    setText("");
  }

  return (
    <div className="flex flex-col h-dvh max-w-lg mx-auto bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-elevated/95 backdrop-blur-xl px-3 h-14 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/chat")}
          className="text-muted hover:text-foreground text-sm font-medium"
        >
          ←
        </button>
        <Avatar label={meta?.other?.avatar ?? "?"} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate flex items-center gap-1">
            {meta?.other?.name ?? "User"}
            {meta?.other?.verified && (
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            )}
          </p>
          <p className="text-[11px] text-dim truncate">
            {meta?.enriched?.movie.title} · {meta?.enriched?.theater.name}
          </p>
        </div>
        {meta?.enriched && (
          <Link
            href={`/listing/${meta.enriched.id}`}
            className="text-[11px] font-semibold text-accent"
          >
            Listing
          </Link>
        )}
      </header>

      {/* Safety banner */}
      <div className="shrink-0 px-3 py-2 bg-soft/80 border-b border-border text-[11px] text-muted text-center">
        Stay in-app until you trust each other. Never share OTPs or bank details.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {messages.map((msg) => {
          const mine = msg.senderId === currentUser.id;
          return (
            <div
              key={msg.id}
              className={cn("flex", mine ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                  mine
                    ? "bg-accent text-white rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                )}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p
                  className={cn(
                    "text-[10px] mt-1",
                    mine ? "text-white/70" : "text-dim"
                  )}
                >
                  {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSend}
        className="shrink-0 border-t border-border bg-elevated p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 h-11 px-3.5 rounded-xl bg-soft border border-border text-sm placeholder:text-dim focus:border-accent/50"
        />
        <Button type="submit" disabled={!text.trim()} className="h-11 w-11 p-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
