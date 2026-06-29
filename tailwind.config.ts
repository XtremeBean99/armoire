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
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
