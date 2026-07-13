import type { Conversation, ChatMessage, Listing, Movie, Theater, User } from "./types";

/**
 * Current & upcoming films (Hyderabad demo).
 * Posters prefer local /posters/* when available; Wikimedia URLs as CDN fallback.
 */
const P = {
  spidey:
    "https://upload.wikimedia.org/wikipedia/en/9/9a/Spider-Man_Brand_New_Day_poster.jpg",
  odyssey:
    "https://upload.wikimedia.org/wikipedia/en/9/90/The_Odyssey_%282026_film%29_poster.jpg",
  coolie:
    "https://upload.wikimedia.org/wikipedia/en/a/a8/Coolie_%282025_film%29_poster.jpg",
  og: "https://upload.wikimedia.org/wikipedia/en/0/0c/OG_Poster.jpg",
  superman:
    "https://upload.wikimedia.org/wikipedia/en/3/32/Superman_%282025_film%29_poster.jpg",
  doomsday:
    "https://upload.wikimedia.org/wikipedia/en/e/ee/Avengers_Doomsday_poster.jpg",
  supergirl:
    "https://upload.wikimedia.org/wikipedia/en/5/58/Supergirl_%282026_film%29_poster.jpg",
  f4: "https://upload.wikimedia.org/wikipedia/en/1/13/The_Fantastic_Four_First_Steps_poster.jpg",
  avatar:
    "https://upload.wikimedia.org/wikipedia/en/9/95/Avatar_Fire_and_Ash_poster.jpeg",
  pushpa:
    "https://upload.wikimedia.org/wikipedia/en/1/11/Pushpa_2-_The_Rule.jpg",
};

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Spider-Man: Brand New Day",
    language: "English",
    poster: P.spidey,
    genre: "Superhero · Action",
    trending: true,
  },
  {
    id: "m2",
    title: "The Odyssey",
    language: "English",
    poster: P.odyssey,
    genre: "Epic · Adventure",
    trending: true,
  },
  {
    id: "m3",
    title: "Coolie",
    language: "Tamil",
    poster: P.coolie,
    genre: "Action",
    trending: true,
  },
  {
    id: "m4",
    title: "They Call Him OG",
    language: "Telugu",
    poster: P.og,
    genre: "Action",
    trending: true,
  },
  {
    id: "m5",
    title: "Superman",
    language: "English",
    poster: P.superman,
    genre: "Superhero",
    trending: true,
  },
  {
    id: "m6",
    title: "Avengers: Doomsday",
    language: "English",
    poster: P.doomsday,
    genre: "Superhero · Action",
    trending: true,
  },
  {
    id: "m7",
    title: "Supergirl",
    language: "English",
    poster: P.supergirl,
    genre: "Superhero",
    trending: true,
  },
  {
    id: "m8",
    title: "The Fantastic Four: First Steps",
    language: "English",
    poster: P.f4,
    genre: "Superhero",
    trending: false,
  },
  {
    id: "m9",
    title: "Avatar: Fire and Ash",
    language: "English",
    poster: P.avatar,
    genre: "Sci-Fi · Adventure",
    trending: true,
  },
  {
    id: "m10",
    title: "Pushpa 2: The Rule",
    language: "Telugu",
    poster: P.pushpa,
    genre: "Action",
    trending: false,
  },
];

export const theaters: Theater[] = [
  { id: "t1", name: "PVR Inorbit", area: "Madhapur", chain: "PVR" },
  { id: "t2", name: "INOX Gachibowli", area: "Gachibowli", chain: "INOX" },
  { id: "t3", name: "Asian Cinemas Radhe", area: "Kompally", chain: "Asian" },
  { id: "t4", name: "AMB Cinemas", area: "Gachibowli", chain: "AMB" },
  { id: "t5", name: "PVR Icon", area: "Hitech City", chain: "PVR" },
  { id: "t6", name: "Cinepolis DSM", area: "Kondapur", chain: "Cinepolis" },
  { id: "t7", name: "Prasads IMAX", area: "Necklace Road", chain: "Prasads" },
  { id: "t8", name: "Sudarshan 35MM", area: "RTC X Roads", chain: "Sudarshan" },
  { id: "t9", name: "Miraj Cinemas", area: "Banjara Hills", chain: "Miraj" },
  { id: "t10", name: "PVR Next Galleria", area: "Panjagutta", chain: "PVR" },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Aarav Reddy",
    phone: "+91 98765 43210",
    avatar: "AR",
    bio: "Tollywood regular · Gachibowli",
    rating: 4.8,
    reviewCount: 12,
    verified: true,
  },
  {
    id: "u2",
    name: "Priya Sharma",
    phone: "+91 91234 56789",
    avatar: "PS",
    bio: "Weekend movie person · Hitec City",
    rating: 4.6,
    reviewCount: 7,
    verified: true,
  },
  {
    id: "u3",
    name: "Karthik M",
    phone: "+91 99887 76655",
    avatar: "KM",
    bio: "IMAX addict · Banjara Hills",
    rating: 4.9,
    reviewCount: 21,
    verified: true,
  },
  {
    id: "u4",
    name: "Sneha Rao",
    phone: "+91 90000 11122",
    avatar: "SR",
    bio: "New here · looking for chill company",
    rating: 5.0,
    reviewCount: 2,
    verified: false,
  },
  {
    id: "u5",
    name: "Vikram S",
    phone: "+91 95555 44433",
    avatar: "VS",
    bio: "Friends cancelled again 😅",
    rating: 4.4,
    reviewCount: 5,
    verified: true,
  },
];

export const seedListings: Listing[] = [
  {
    id: "l1",
    movieId: "m1",
    theaterId: "t7",
    sharerId: "u1",
    showDate: "2026-07-31",
    showTime: "21:30",
    seats: 2,
    seatsLeft: 2,
    type: "companions",
    pricePerSeat: 350,
    description:
      "Opening weekend Spider-Man at Prasads IMAX. Friends cancelled — looking for chill MCU fans. Premium row.",
    hasProof: true,
    verified: true,
    status: "active",
    createdAt: "2026-07-12T08:00:00Z",
  },
  {
    id: "l2",
    movieId: "m2",
    theaterId: "t5",
    sharerId: "u3",
    showDate: "2026-07-17",
    showTime: "18:45",
    seats: 1,
    seatsLeft: 1,
    type: "companions",
    pricePerSeat: 400,
    description:
      "Nolan's Odyssey day one. Going alone — want one buddy who won't talk during the film!",
    hasProof: true,
    verified: true,
    status: "active",
    createdAt: "2026-07-12T09:15:00Z",
  },
  {
    id: "l3",
    movieId: "m6",
    theaterId: "t1",
    sharerId: "u5",
    showDate: "2026-08-02",
    showTime: "20:00",
    seats: 3,
    seatsLeft: 3,
    type: "sell",
    pricePerSeat: 380,
    description:
      "Extra Avengers: Doomsday tickets at face value. Can meet at PVR Inorbit 30 mins early.",
    hasProof: true,
    verified: true,
    status: "active",
    createdAt: "2026-07-12T07:30:00Z",
  },
  {
    id: "l4",
    movieId: "m4",
    theaterId: "t4",
    sharerId: "u2",
    showDate: "2026-07-20",
    showTime: "16:00",
    seats: 2,
    seatsLeft: 1,
    type: "companions",
    pricePerSeat: 250,
    description:
      "OG matinee at AMB. Looking for Telugu cinema fans — mass energy welcome!",
    hasProof: true,
    verified: false,
    status: "active",
    createdAt: "2026-07-12T10:00:00Z",
  },
  {
    id: "l5",
    movieId: "m3",
    theaterId: "t2",
    sharerId: "u4",
    showDate: "2026-07-18",
    showTime: "22:15",
    seats: 1,
    seatsLeft: 1,
    type: "companions",
    pricePerSeat: 220,
    description:
      "Late night Coolie — looking for one buddy. No spoilers please!",
    hasProof: false,
    verified: false,
    status: "active",
    createdAt: "2026-07-12T11:20:00Z",
  },
  {
    id: "l6",
    movieId: "m5",
    theaterId: "t6",
    sharerId: "u3",
    showDate: "2026-07-19",
    showTime: "13:30",
    seats: 2,
    seatsLeft: 2,
    type: "companions",
    pricePerSeat: 280,
    description: "Superman matinee. Split cost, enjoy the spectacle together.",
    hasProof: true,
    verified: true,
    status: "active",
    createdAt: "2026-07-11T18:00:00Z",
  },
  {
    id: "l7",
    movieId: "m9",
    theaterId: "t7",
    sharerId: "u1",
    showDate: "2026-12-19",
    showTime: "19:00",
    seats: 2,
    seatsLeft: 2,
    type: "companions",
    pricePerSeat: 450,
    description:
      "Avatar: Fire and Ash IMAX booking planned. Want 1–2 people for the full immersive experience.",
    hasProof: true,
    verified: true,
    status: "active",
    createdAt: "2026-07-12T14:00:00Z",
  },
];

export const seedConversations: Conversation[] = [
  {
    id: "c1",
    listingId: "l1",
    sharerId: "u1",
    seekerId: "u2",
    lastMessage: "Sounds good! See you at 9 near the food court.",
    updatedAt: "2026-07-12T12:30:00Z",
  },
];

export const seedMessages: ChatMessage[] = [
  {
    id: "msg1",
    conversationId: "c1",
    senderId: "u2",
    text: "Hi Aarav! Interested in the Spider-Man Brand New Day seats at Prasads IMAX 🎬",
    createdAt: "2026-07-12T12:00:00Z",
  },
  {
    id: "msg2",
    conversationId: "c1",
    senderId: "u1",
    text: "Hey Priya! Yes, still available. 2 seats in premium.",
    createdAt: "2026-07-12T12:05:00Z",
  },
  {
    id: "msg3",
    conversationId: "c1",
    senderId: "u2",
    text: "Perfect. Can we meet 30 mins before the show?",
    createdAt: "2026-07-12T12:15:00Z",
  },
  {
    id: "msg4",
    conversationId: "c1",
    senderId: "u1",
    text: "Sounds good! See you at 9 near the food court.",
    createdAt: "2026-07-12T12:30:00Z",
  },
];

export const areas = [
  "All areas",
  "Gachibowli",
  "Madhapur",
  "Hitech City",
  "Banjara Hills",
  "Kondapur",
  "Kompally",
  "Necklace Road",
  "RTC X Roads",
  "Panjagutta",
];

export const typeLabels: Record<string, string> = {
  companions: "Companions wanted",
  sell: "Sell / transfer",
  free: "Free seat",
};

export const typeBadge: Record<string, string> = {
  companions: "Companions",
  sell: "Transfer",
  free: "Free",
};
