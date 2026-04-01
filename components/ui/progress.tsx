"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/70",
        className
      )}
    >
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full bg-primary/85 shadow-[0_0_30px_rgba(129,140,248,0.65)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
