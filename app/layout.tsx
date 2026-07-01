import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
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
    <html lang="en" className={`${cormorant.variable} ${hanken.variable} ${tiro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
