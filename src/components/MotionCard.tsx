"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cardHover, springSubtle } from "@/lib/motion";

/** Subtle lift on hover, matching the portfolio cards. */
export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      transition={springSubtle}
    >
      {children}
    </motion.div>
  );
}
