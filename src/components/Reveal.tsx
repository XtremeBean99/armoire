"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** Fade + slide-up on mount. Reduced-motion safe. Mirrors the portfolio reveal. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
