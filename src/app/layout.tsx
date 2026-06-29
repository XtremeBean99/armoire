import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const baseUrl = "https://armoire.ahmedyhussain.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Armoire · Wardrobe Builder", template: "%s | Armoire" },
  description:
    "A local-first, offline, no-AI wardrobe builder for men's clothing. Detects exact colours in the browser and builds colour-coherent outfits from what you own.",
  applicationName: "Armoire",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Armoire", statusBarStyle: "black-translucent" },
  alternates: { canonical: baseUrl },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Armoire",
    title: "Armoire · Wardrobe Builder",
    description:
      "Local-first, offline, no-AI wardrobe builder for men's clothing. Exact colour detection and colour-theory outfit generation.",
  },
};

export const viewport = { themeColor: "#09090b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-foreground focus:border focus:border-border focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative z-10 mx-auto w-full max-w-container px-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
