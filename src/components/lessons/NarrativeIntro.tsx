"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Hash, Circle } from "lucide-react";
import { useLessonStore } from "@/lib/store/lesson-store";
import type { Stage } from "@/types/stages";
import { cn } from "@/lib/utils";

interface NarrativeIntroProps {
  stage: Stage;
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  indigo: { bg: "bg-indigo-500", border: "border-indigo-500/30", text: "text-indigo-400" },
  cyan: { bg: "bg-cyan-500", border: "border-cyan-500/30", text: "text-cyan-400" },
  violet: { bg: "bg-violet-500", border: "border-violet-500/30", text: "text-violet-400" },
  amber: { bg: "bg-amber-500", border: "border-amber-500/30", text: "text-amber-400" },
};

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 127 127" className={className}>
      <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2S.8 87.3.8 80s5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2s13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2s-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
      <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2S39.7.6 47 .6s13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9s5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
      <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2s13.2 5.9 13.2 13.2-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2s-13.2-5.9-13.2-13.2V13.8c0-7.3 5.9-13.2 13.2-13.2s13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D" />
      <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2s5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E" />
    </svg>
  );
}

const stageReactions: Record<number, { emoji: string; count: number }[]> = {
  1:  [{ emoji: "\u{1F44B}", count: 4 }, { emoji: "\u{1F680}", count: 2 }],
  2:  [{ emoji: "\u{1F527}", count: 3 }, { emoji: "\u{1F440}", count: 1 }],
  3:  [{ emoji: "\u{1F433}", count: 5 }, { emoji: "\u{1F4AF}", count: 3 }],
  4:  [{ emoji: "\u{1F4C8}", count: 2 }, { emoji: "\u{1F62C}", count: 4 }],
  5:  [{ emoji: "\u2638\uFE0F", count: 6 }, { emoji: "\u{1F389}", count: 2 }],
  6:  [{ emoji: "\u{1F310}", count: 3 }, { emoji: "\u26A1", count: 2 }],
  7:  [{ emoji: "\u{1F510}", count: 4 }, { emoji: "\u{1F44D}", count: 3 }],
  8:  [{ emoji: "\u{1F4E6}", count: 3 }, { emoji: "\u{1F64C}", count: 2 }],
  9:  [{ emoji: "\u{1F3D7}\uFE0F", count: 5 }, { emoji: "\u{1F4AA}", count: 3 }],
  10: [{ emoji: "\u{1F680}", count: 7 }, { emoji: "\u{1F525}", count: 4 }, { emoji: "\u{1F3AF}", count: 2 }],
};

export default function NarrativeIntro({ stage }: NarrativeIntroProps) {
  const setNarrativeSeen = useLessonStore((s) => s.setNarrativeSeen);

  if (!stage.narrative) return null;

  const { character, intro, context } = stage.narrative;
  const colors = colorMap[character.color] ?? colorMap.indigo;

  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-950 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="max-w-xl w-full rounded-xl overflow-hidden border border-zinc-700/60 shadow-2xl shadow-black/40"
      >
        {/* Workspace header */}
        <div className="bg-[#1a1d21] px-4 py-2.5 flex items-center justify-between border-b border-zinc-700/40">
          <div className="flex items-center gap-2.5">
            <SlackIcon className="w-[18px] h-[18px]" />
            <span className="text-sm font-bold text-zinc-100">NovaCraft</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="flex items-center gap-1.5">
            <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
            <span className="text-xs text-zinc-400">You</span>
          </div>
        </div>

        {/* Channel bar */}
        <div className="bg-[#1a1d21] px-4 py-2 border-b border-zinc-700/40 flex items-center gap-1.5">
          <Hash className="w-4 h-4 text-zinc-500" />
          <span className="text-sm font-medium text-zinc-200">
            stage-{stage.number}-briefing
          </span>
        </div>

        {/* Message area */}
        <div className="bg-[#1a1d21] px-4 py-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="flex gap-3"
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold",
                colors.bg,
              )}
            >
              {character.avatar}
            </div>

            <div className="flex-1 min-w-0">
              {/* Author + role + time */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[15px] font-bold text-zinc-100">
                  {character.name}
                </span>
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", colors.text, "bg-zinc-800")}>
                  {character.role}
                </span>
                <span className="text-xs text-zinc-600 ml-auto flex-shrink-0">
                  9:41 AM
                </span>
              </div>

              {/* Message text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="text-[15px] text-zinc-300 leading-relaxed"
              >
                {intro}
              </motion.p>

              {/* Attachment — objective */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className={cn(
                  "mt-3 pl-3 py-2 pr-3 rounded-md bg-zinc-800/50 border-l-[3px]",
                  colors.border,
                )}
              >
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Objective
                </span>
                <span className="text-sm text-zinc-300">{context}</span>
              </motion.div>

              {/* Reactions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.2 }}
                className="flex gap-2 mt-3"
              >
                {stageReactions[stage.number]?.map((r, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                      i === 0
                        ? "bg-indigo-500/10 border border-indigo-500/20"
                        : "bg-zinc-800 border border-zinc-700",
                    )}
                  >
                    <span>{r.emoji}</span>
                    <span className={i === 0 ? "text-indigo-400 font-medium" : "text-zinc-400 font-medium"}>
                      {r.count}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Action bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.2 }}
          className="bg-[#1a1d21] px-4 pb-4 pt-1"
        >
          <button
            onClick={setNarrativeSeen}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors shadow-lg w-full justify-center bg-[#007a5a] hover:bg-[#148567] shadow-emerald-900/20"
          >
            Start Stage {stage.number}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
