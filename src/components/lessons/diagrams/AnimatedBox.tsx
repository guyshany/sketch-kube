"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBoxProps {
  label: string;
  color?: string;
  delay?: number;
  className?: string;
  icon?: React.ReactNode;
  sublabel?: string;
}

export function AnimatedBox({
  label,
  color = "border-zinc-600 bg-zinc-800/80",
  delay = 0,
  className,
  icon,
  sublabel,
}: AnimatedBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", damping: 15 }}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border px-4 py-2.5 text-xs font-medium",
        color,
        className,
      )}
    >
      {icon && <div className="mb-1">{icon}</div>}
      <span>{label}</span>
      {sublabel && (
        <span className="text-[10px] text-zinc-500 mt-0.5">{sublabel}</span>
      )}
    </motion.div>
  );
}

interface AnimatedArrowProps {
  delay?: number;
  direction?: "right" | "down";
  label?: string;
  color?: string;
}

export function AnimatedArrow({
  delay = 0,
  direction = "right",
  label,
  color = "text-zinc-500",
}: AnimatedArrowProps) {
  const isRight = direction === "right";
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? -10 : 0, y: isRight ? 0 : -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={cn("flex items-center justify-center", color)}
    >
      <div className={cn("flex items-center gap-1", !isRight && "flex-col")}>
        {label && (
          <span className="text-[10px] text-zinc-500">{label}</span>
        )}
        <svg
          width={isRight ? 32 : 16}
          height={isRight ? 16 : 32}
          viewBox={isRight ? "0 0 32 16" : "0 0 16 32"}
          fill="none"
          className="flex-shrink-0"
        >
          {isRight ? (
            <>
              <motion.line
                x1="0" y1="8" x2="24" y2="8"
                stroke="currentColor" strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: delay + 0.1, duration: 0.3 }}
              />
              <motion.path
                d="M24 4 L30 8 L24 12"
                stroke="currentColor" strokeWidth="1.5" fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              />
            </>
          ) : (
            <>
              <motion.line
                x1="8" y1="0" x2="8" y2="24"
                stroke="currentColor" strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: delay + 0.1, duration: 0.3 }}
              />
              <motion.path
                d="M4 24 L8 30 L12 24"
                stroke="currentColor" strokeWidth="1.5" fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              />
            </>
          )}
        </svg>
      </div>
    </motion.div>
  );
}

interface PulsingDotProps {
  delay?: number;
  color?: string;
  className?: string;
}

export function PulsingDot({ delay = 0, color = "bg-indigo-500", className }: PulsingDotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={cn("relative", className)}
    >
      <motion.div
        className={cn("w-2.5 h-2.5 rounded-full", color)}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: delay + 0.3 }}
      />
      <motion.div
        className={cn("absolute inset-0 w-2.5 h-2.5 rounded-full", color)}
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: delay + 0.3 }}
      />
    </motion.div>
  );
}

interface FlowingDotProps {
  delay?: number;
  horizontal?: boolean;
  width?: number;
}

export function FlowingDot({ delay = 0, horizontal = true, width = 60 }: FlowingDotProps) {
  return (
    <motion.div
      className="relative overflow-hidden flex-shrink-0"
      style={{ width: horizontal ? width : 8, height: horizontal ? 8 : width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <svg
        width={horizontal ? width : 8}
        height={horizontal ? 8 : width}
        className="absolute inset-0"
      >
        <line
          x1={horizontal ? 0 : 4}
          y1={horizontal ? 4 : 0}
          x2={horizontal ? width : 4}
          y2={horizontal ? 4 : width}
          stroke="#3f3f46" strokeWidth="1"
        />
        <circle r="3" fill="#6366f1">
          <animateMotion
            dur="1.2s"
            repeatCount="indefinite"
            path={horizontal ? `M0,4 L${width},4` : `M4,0 L4,${width}`}
          />
        </circle>
      </svg>
    </motion.div>
  );
}
