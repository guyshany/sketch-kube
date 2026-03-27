"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { stages } from "@/lib/stages";

const avatarColorMap: Record<string, string> = {
  indigo: "bg-indigo-500",
  cyan: "bg-cyan-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
};

interface CompletionModalProps {
  visible: boolean;
  stars: number;
  maxStars: number;
  stageId: string;
  onRetry: () => void;
  onClose: () => void;
  onNextChallenge?: () => void;
  nextChallengeTitle?: string;
}

export default function CompletionModal({
  visible,
  stars,
  maxStars,
  stageId,
  onRetry,
  onClose,
  onNextChallenge,
  nextChallengeTitle,
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
  const currentStage = stages[currentStageIndex];
  const nextStage = stages[currentStageIndex + 1];
  const isLastChallenge = !onNextChallenge;
  const narrative = currentStage?.narrative;
  const showDebrief = isLastChallenge && narrative?.debrief;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const modal = (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={cn(
              "bg-zinc-900 border border-zinc-700 rounded-2xl p-8 mx-4 text-center shadow-2xl",
              showDebrief ? "max-w-md" : "max-w-sm",
            )}
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
              {showDebrief ? "Stage Complete!" : "Challenge Complete!"}
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

            {showDebrief && narrative && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6 flex items-start gap-3 text-left px-2 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold",
                    avatarColorMap[narrative.character.color] ?? "bg-indigo-500",
                  )}
                >
                  {narrative.character.avatar}
                </div>
                <div>
                  <span className="text-xs font-semibold text-zinc-300">
                    {narrative.character.name}
                  </span>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    {narrative.debrief}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col gap-2">
              {onNextChallenge && nextChallengeTitle ? (
                <button
                  onClick={onNextChallenge}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Next: {nextChallengeTitle}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : nextStage ? (
                <Link
                  href={`/stage/${nextStage.id}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                >
                  Next: {nextStage.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : null}
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

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
