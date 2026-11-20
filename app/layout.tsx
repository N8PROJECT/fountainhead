import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--sans" });
const display = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--display" });

export const metadata: Metadata = {
  title: "Fountainhead — Café & Co-Living, Meruya",
  description: "Come for coffee, stay for brunch. Find Fountainhead Café & Co-Living in Meruya Utara, West Jakarta.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${display.variable} antialiased`}>{children}</body></html>;
}
