"use client";

import Link from "next/link";
import { useMemo } from "react";
import { TopBar } from "@/components/TopBar";
import { Avatar, EmptyState, Button } from "@/components/ui";
import { useApp } from "@/lib/store";
import { enrichListing, formatRelativeTime } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export default function ChatListPage() {
  const { currentUser, conversations, users, listings } = useApp();

  const items = useMemo(() => {
    if (!currentUser) return [];
    return conversations
      .filter(
        (c) =>
          c.seekerId === currentUser.id || c.sharerId === currentUser.id
      )
      .map((c) => {
        const otherId =
          c.seekerId === currentUser.id ? c.sharerId : c.seekerId;
        const other = users.find((u) => u.id === otherId);
        const listing = listings.find((l) => l.id === c.listingId);
        const enriched = listing
          ? enrichListing(listing, undefined, undefined, users)
          : null;
        return { conversation: c, other, enriched };
      })
      .sort(
        (a, b) =>
          new Date(b.conversation.updatedAt).getTime() -
          new Date(a.conversation.updatedAt).getTime()
      );
  }, [currentUser, conversations, users, listings]);

  if (!currentUser) {
    return (
      <div className="pb-safe">
        <TopBar title="Messages" />
        <EmptyState
          icon={<MessageCircle className="h-6 w-6" />}
          title="Login to see chats"
          description="In-app chat keeps phone numbers private until you're both ready."
          action={
            <Link href="/login?next=/chat">
              <Button>Login</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="pb-safe">
      <TopBar title="Messages" />
      <main className="px-4 pt-2">
        {items.length === 0 ? (
          <EmptyState
            icon={<MessageCircle className="h-6 w-6" />}
            title="No conversations yet"
            description="Browse listings and tap “I'm interested” to start chatting safely."
            action={
              <Link href="/browse">
                <Button>Browse seats</Button>
              </Link>
            }
          />
        ) : (
          <ul className="divide-y divide-border">
            {items.map(({ conversation, other, enriched }) => (
              <li key={conversation.id}>
                <Link
                  href={`/chat/${conversation.id}`}
                  className="flex items-center gap-3 py-3.5 hover:bg-soft/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <Avatar label={other?.avatar ?? "?"} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate">
                        {other?.name ?? "User"}
                      </p>
                      <span className="text-[10px] text-dim shrink-0">
                        {formatRelativeTime(conversation.updatedAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted truncate">
                      {enriched?.movie.title ?? "Listing"} ·{" "}
                      {enriched?.theater.name ?? ""}
                    </p>
                    <p className="text-xs text-dim truncate mt-0.5">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
