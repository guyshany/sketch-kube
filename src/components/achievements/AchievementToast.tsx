"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/lib/store/progress-store";
import { achievements } from "@/lib/achievements";
import {
  Sparkles, Link, Trophy, Star, Terminal, Box,
  Hexagon, Package, Blocks, Brain,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Link, Trophy, Star, Terminal, Box,
  Hexagon, Package, Blocks, Brain,
};

export default function AchievementToast() {
  const storeAchievements = useProgressStore((s) => s.achievements);
  const [toast, setToast] = useState<{ title: string; description: string; icon: string } | null>(null);
  const prevRef = useRef<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const prev = prevRef.current;
    const newIds = storeAchievements.filter((id) => !prev.includes(id));
    prevRef.current = storeAchievements;

    if (prev.length === 0 && storeAchievements.length > 0) return;

    if (newIds.length > 0) {
      const ach = achievements.find((a) => a.id === newIds[newIds.length - 1]);
      if (ach) {
        setToast({ title: ach.title, description: ach.description, icon: ach.icon });
        setTimeout(() => setToast(null), 4000);
      }
    }
  }, [storeAchievements]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800 border border-amber-500/30 shadow-xl shadow-amber-500/10"
        >
          {(() => {
            const Icon = iconMap[toast.icon] ?? Sparkles;
            return <Icon className="w-5 h-5 text-amber-400 flex-shrink-0" />;
          })()}
          <div>
            <div className="text-sm font-semibold text-amber-300">{toast.title}</div>
            <div className="text-xs text-zinc-400">{toast.description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
