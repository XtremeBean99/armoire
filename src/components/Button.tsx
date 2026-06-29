import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background px-5 py-2.5 hover:bg-muted-foreground",
  secondary: "border border-border text-foreground px-5 py-2.5 hover:bg-surface-hover",
  ghost: "text-muted-foreground px-3 py-1.5 hover:text-foreground",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
