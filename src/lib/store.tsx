"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  seedConversations,
  seedListings,
  seedMessages,
  users as seedUsers,
} from "./data";
import type {
  ChatMessage,
  Conversation,
  Listing,
  ListingType,
  User,
} from "./types";

const STORAGE_KEY = "flixbuddy-v1";

interface AppState {
  currentUser: User | null;
  listings: Listing[];
  conversations: Conversation[];
  messages: ChatMessage[];
  users: User[];
}

interface AppStore extends AppState {
  hydrated: boolean;
  login: (name: string, phone: string) => void;
  logout: () => void;
  addListing: (input: {
    movieId: string;
    theaterId: string;
    showDate: string;
    showTime: string;
    seats: number;
    type: ListingType;
    pricePerSeat: number | null;
    description: string;
    hasProof: boolean;
  }) => Listing | null;
  startChat: (listingId: string) => string | null;
  sendMessage: (conversationId: string, text: string) => void;
  getMessages: (conversationId: string) => ChatMessage[];
  getConversation: (id: string) => Conversation | undefined;
}

const AppContext = createContext<AppStore | null>(null);

function loadState(): AppState {
  if (typeof window === "undefined") {
    return {
      currentUser: null,
      listings: seedListings,
      conversations: seedConversations,
      messages: seedMessages,
      users: seedUsers,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      return {
        currentUser: parsed.currentUser ?? null,
        listings: parsed.listings?.length ? parsed.listings : seedListings,
        conversations: parsed.conversations ?? seedConversations,
        messages: parsed.messages ?? seedMessages,
        users: parsed.users?.length ? parsed.users : seedUsers,
      };
    }
  } catch {
    /* ignore */
  }
  return {
    currentUser: null,
    listings: seedListings,
    conversations: seedConversations,
    messages: seedMessages,
    users: seedUsers,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    listings: seedListings,
    conversations: seedConversations,
    messages: seedMessages,
    users: seedUsers,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const login = useCallback((name: string, phone: string) => {
    setState((prev) => {
      const existing = prev.users.find(
        (u) => u.phone.replace(/\s/g, "") === phone.replace(/\s/g, "")
      );
      if (existing) {
        return { ...prev, currentUser: existing };
      }
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: name.trim() || "Movie Fan",
        phone,
        avatar: name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "FB",
        bio: "New on FlixBuddy · Hyderabad",
        rating: 5,
        reviewCount: 0,
        verified: false,
      };
      return {
        ...prev,
        users: [...prev.users, newUser],
        currentUser: newUser,
      };
    });
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, currentUser: null }));
  }, []);

  const addListing = useCallback(
    (input: {
      movieId: string;
      theaterId: string;
      showDate: string;
      showTime: string;
      seats: number;
      type: ListingType;
      pricePerSeat: number | null;
      description: string;
      hasProof: boolean;
    }): Listing | null => {
      let created: Listing | null = null;
      setState((prev) => {
        if (!prev.currentUser) return prev;
        created = {
          id: `l-${Date.now()}`,
          movieId: input.movieId,
          theaterId: input.theaterId,
          sharerId: prev.currentUser.id,
          showDate: input.showDate,
          showTime: input.showTime,
          seats: input.seats,
          seatsLeft: input.seats,
          type: input.type,
          pricePerSeat: input.pricePerSeat,
          description: input.description,
          hasProof: input.hasProof,
          verified: input.hasProof,
          status: "active",
          createdAt: new Date().toISOString(),
        };
        return { ...prev, listings: [created, ...prev.listings] };
      });
      return created;
    },
    []
  );

  const startChat = useCallback(
    (listingId: string): string | null => {
      let conversationId: string | null = null;
      setState((prev) => {
        if (!prev.currentUser) return prev;
        const listing = prev.listings.find((l) => l.id === listingId);
        if (!listing) return prev;
        if (listing.sharerId === prev.currentUser.id) return prev;

        const existing = prev.conversations.find(
          (c) =>
            c.listingId === listingId &&
            c.seekerId === prev.currentUser!.id
        );
        if (existing) {
          conversationId = existing.id;
          return prev;
        }

        const id = `c-${Date.now()}`;
        conversationId = id;
        const convo: Conversation = {
          id,
          listingId,
          sharerId: listing.sharerId,
          seekerId: prev.currentUser.id,
          lastMessage: "Chat started — say hi!",
          updatedAt: new Date().toISOString(),
        };
        const hello: ChatMessage = {
          id: `msg-${Date.now()}`,
          conversationId: id,
          senderId: prev.currentUser.id,
          text: "Hi! I'm interested in your seats 🎬",
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          conversations: [convo, ...prev.conversations],
          messages: [...prev.messages, hello],
        };
      });
      return conversationId;
    },
    []
  );

  const sendMessage = useCallback((conversationId: string, text: string) => {
    setState((prev) => {
      if (!prev.currentUser || !text.trim()) return prev;
      const msg: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: prev.currentUser.id,
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };
      return {
        ...prev,
        messages: [...prev.messages, msg],
        conversations: prev.conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: text.trim(),
                updatedAt: new Date().toISOString(),
              }
            : c
        ),
      };
    });
  }, []);

  const getMessages = useCallback(
    (conversationId: string) =>
      state.messages
        .filter((m) => m.conversationId === conversationId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    [state.messages]
  );

  const getConversation = useCallback(
    (id: string) => state.conversations.find((c) => c.id === id),
    [state.conversations]
  );

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      login,
      logout,
      addListing,
      startChat,
      sendMessage,
      getMessages,
      getConversation,
    }),
    [
      state,
      hydrated,
      login,
      logout,
      addListing,
      startChat,
      sendMessage,
      getMessages,
      getConversation,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
