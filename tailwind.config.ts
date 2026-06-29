import type { Config } from "tailwindcss";

// Design tokens mirror the ahmedyhussain.com portfolio so Armoire reads as
// part of the same site.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        border: "#27272a",
        "border-subtle": "#18181b",
        muted: "#52525b",
        "muted-foreground": "#a1a1aa",
        surface: "#111113",
        "surface-hover": "#18181b",
        error: "#ef4444",
        "error-muted": "#7f1d1d",
        success: "#22c55e",
        "success-muted": "#14532d",
      },
      maxWidth: {
        container: "72rem",
        prose: "48rem",
      },
    },
  },
  plugins: [],
};

export default config;
