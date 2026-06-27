import type { Metadata } from "next";
import { Newsreader, Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
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
  title: "Sakhi AI — The AI assistant that does the work",
  description:
    "Sakhi takes action across 2,000+ apps you already use and gets the work done. AI for Bharat. Join the waitlist for early access.",
  openGraph: {
    title: "Sakhi AI — The AI assistant that does the work",
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
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${tiro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
