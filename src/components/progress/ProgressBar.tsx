"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  stars?: number;
  maxStars?: number;
}

export default function ProgressBar({ current, total, stars, maxStars }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-zinc-500 tabular-nums whitespace-nowrap">
        {current}/{total}
      </span>
      {stars !== undefined && maxStars !== undefined && (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: maxStars }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3",
                i < stars
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-700",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
