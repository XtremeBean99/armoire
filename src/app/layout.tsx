import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Armoire",
  description: "Local-first, offline, no-AI men's wardrobe builder.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
