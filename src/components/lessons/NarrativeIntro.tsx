"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { useLessonStore } from "@/lib/store/lesson-store";
import type { Stage } from "@/types/stages";

interface NarrativeIntroProps {
  stage: Stage;
}

export default function NarrativeIntro({ stage }: NarrativeIntroProps) {
  const setNarrativeSeen = useLessonStore((s) => s.setNarrativeSeen);

  if (!stage.narrative) return null;

  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-950 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="max-w-lg w-full"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-indigo-400 font-medium uppercase tracking-wider"
              >
                Stage {stage.number}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-zinc-100"
              >
                {stage.title}
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-2">
              Mission Briefing
            </div>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {stage.narrative.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-6"
          >
            <span className="text-xs text-zinc-500 font-medium">Objective: </span>
            <span className="text-xs text-zinc-300">{stage.narrative.context}</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={setNarrativeSeen}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20 w-full justify-center"
          >
            Begin
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
