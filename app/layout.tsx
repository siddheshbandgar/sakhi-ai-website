import type { Metadata } from "next";
import { Playfair_Display, Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakhi AI: the assistant that actually does the work",
  description:
    "Sakhi takes action across 2,000+ apps you already use and gets the work done. AI for Bharat. Join the waitlist for early access.",
  openGraph: {
    title: "Sakhi AI: the assistant that actually does the work",
    description:
      "Sakhi takes action across 2,000+ apps you already use and gets the work done. Join the waitlist for early access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${tiro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
