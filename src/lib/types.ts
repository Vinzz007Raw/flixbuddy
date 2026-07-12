export type ListingType = "companions" | "sell" | "free";

export type ListingStatus = "active" | "filled" | "expired";

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface Movie {
  id: string;
  title: string;
  language: string;
  poster: string;
  genre: string;
  trending?: boolean;
}

export interface Theater {
  id: string;
  name: string;
  area: string;
  chain: string;
}

export interface Listing {
  id: string;
  movieId: string;
  theaterId: string;
  sharerId: string;
  showDate: string;
  showTime: string;
  seats: number;
  seatsLeft: number;
  type: ListingType;
  pricePerSeat: number | null;
  description: string;
  hasProof: boolean;
  verified: boolean;
  status: ListingStatus;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  listingId: string;
  sharerId: string;
  seekerId: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface ListingWithDetails extends Listing {
  movie: Movie;
  theater: Theater;
  sharer: User;
}
