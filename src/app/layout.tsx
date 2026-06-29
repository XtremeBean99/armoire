import "./globals.css";
import type { Metadata } from "next";
import { AppNav } from "@/components/AppNav";

export const metadata: Metadata = {
  title: "Armoire",
  description: "Local-first, offline, no-AI men's wardrobe builder.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-3xl">
        <AppNav />
        {children}
      </body>
    </html>
  );
}
