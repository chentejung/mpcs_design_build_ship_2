import type { Metadata } from "next";
import { DM_Sans, Fraunces, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// next/font downloads these at build time and self-hosts them in out/.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-space-grotesk" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Design Build Ship — Week 2",
  description: "Mood boards, design systems, and the final site.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
