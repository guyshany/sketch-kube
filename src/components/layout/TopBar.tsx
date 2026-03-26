"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useProgressStore } from "@/lib/store/progress-store";
import Logo from "@/components/layout/Logo";
import AchievementsPanel from "@/components/achievements/AchievementsPanel";
import type { Stage } from "@/types/stages";

interface TopBarProps {
  stage?: Stage;
}

export default function TopBar({ stage }: TopBarProps) {
  const totalStars = useProgressStore((s) => s.getTotalStars());

  return (
    <header className="h-12 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        {stage ? (
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Back</span>
          </Link>
        ) : null}
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-sm font-semibold text-zinc-200">
            SketchKube
          </span>
        </Link>
      </div>

      {stage && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Stage {stage.number}:</span>
          <span className="text-sm font-medium text-zinc-300">
            {stage.title}
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <AchievementsPanel />
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-amber-400 tabular-nums">
            {totalStars}
          </span>
        </div>
      </div>
    </header>
  );
}
