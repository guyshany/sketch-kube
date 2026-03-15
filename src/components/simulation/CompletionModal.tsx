"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { stages } from "@/lib/stages";

interface CompletionModalProps {
  visible: boolean;
  stars: number;
  maxStars: number;
  stageId: string;
  onRetry: () => void;
  onClose: () => void;
}

export default function CompletionModal({
  visible,
  stars,
  maxStars,
  stageId,
  onRetry,
  onClose,
}: CompletionModalProps) {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowStars(true), 300);
      return () => clearTimeout(timer);
    }
    setShowStars(false);
  }, [visible]);

  const currentStageIndex = stages.findIndex((s) => s.id === stageId);
  const nextStage = stages[currentStageIndex + 1];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 15 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-3xl">&#10003;</span>
            </motion.div>

            <h2 className="text-xl font-bold text-zinc-100 mb-2">
              Challenge Complete!
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Great work! You&apos;ve mastered this concept.
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: maxStars }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    showStars
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{
                    delay: i * 0.15 + 0.3,
                    type: "spring",
                    damping: 12,
                  }}
                >
                  <Star
                    className={cn(
                      "w-8 h-8",
                      i < stars
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-600",
                    )}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {nextStage && (
                <Link
                  href={`/stage/${nextStage.id}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                >
                  Next: {nextStage.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <button
                onClick={onRetry}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try for More Stars
              </button>
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-1"
              >
                Back to Stages
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
