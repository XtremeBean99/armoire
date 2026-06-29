"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LINKS: [string, string][] = [
  ["/", "Generate"],
  ["/wardrobe", "Wardrobe"],
  ["/add", "Add"],
  ["/insights", "Insights"],
  ["/about", "About"],
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Armoire
          </span>
          <span className="hidden text-[10px] tracking-[0.18em] uppercase text-muted sm:inline">
            by Ahmed Hussain
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {LINKS.map(([href, label]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "rounded-md px-3 py-1.5 transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
