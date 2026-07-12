import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FlixBuddy — Never watch alone",
  description:
    "Find movie companions and share seats safely in Hyderabad. Social-first ticket sharing for Tollywood, Bollywood & more.",
  applicationName: "FlixBuddy",
  keywords: [
    "FlixBuddy",
    "Hyderabad movies",
    "movie companions",
    "ticket sharing",
    "Tollywood",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FlixBuddy",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
