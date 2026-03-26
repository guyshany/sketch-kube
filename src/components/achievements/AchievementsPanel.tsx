"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/lib/store/progress-store";
import { achievements } from "@/lib/achievements";
import {
  Sparkles, Link, Trophy, Star, Terminal, Box,
  Hexagon, Package, Blocks, Brain, Award, X,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Link, Trophy, Star, Terminal, Box,
  Hexagon, Package, Blocks, Brain,
};

export default function AchievementsPanel() {
  const [open, setOpen] = useState(false);
  const unlockedIds = useProgressStore((s) => s.achievements);
  const unlockedCount = unlockedIds.length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
        title="Achievements"
      >
        <Award className="w-4 h-4" />
        <span className="text-xs font-medium tabular-nums">
          {unlockedCount}/{achievements.length}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold text-zinc-100">Achievements</h2>
                  <span className="text-xs text-zinc-500 ml-1">
                    {unlockedCount}/{achievements.length} unlocked
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((ach) => {
                  const unlocked = unlockedIds.includes(ach.id);
                  const Icon = iconMap[ach.icon] ?? Sparkles;
                  return (
                    <div
                      key={ach.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border transition-colors",
                        unlocked
                          ? "bg-amber-500/5 border-amber-500/20"
                          : "bg-zinc-800/30 border-zinc-800 opacity-50",
                      )}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                          unlocked
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-zinc-800 text-zinc-600",
                        )}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={cn(
                            "text-xs font-semibold truncate",
                            unlocked ? "text-amber-300" : "text-zinc-500",
                          )}
                        >
                          {ach.title}
                        </div>
                        <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">
                          {ach.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
