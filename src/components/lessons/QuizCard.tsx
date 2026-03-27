"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types/stages";

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function QuizCard({ questions, onComplete }: QuizCardProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [shake, setShake] = useState(false);

  const question = questions[currentQ];
  if (!question) return null;

  const isCorrect = selected === question.correctIndex;
  const isLast = currentQ >= questions.length - 1;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);

    if (index === question.correctIndex) {
      setAnswered(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleContinue = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <HelpCircle className="w-5 h-5 text-indigo-400" />
        <span className="text-sm text-indigo-400 font-medium uppercase tracking-wider">
          Knowledge Check
        </span>
        {questions.length > 1 && (
          <span className="ml-auto text-xs text-zinc-500 tabular-nums">
            {currentQ + 1} of {questions.length}
          </span>
        )}
      </div>

      <p className="text-base text-zinc-100 font-semibold mb-4 leading-snug">{question.question}</p>

      <motion.div
        animate={shake ? { x: [0, -4, 4, -3, 3, 0] } : {}}
        transition={{ duration: 0.35 }}
        className="space-y-3"
      >
        {question.options.map((option, i) => {
          const isThis = selected === i;
          const isRight = i === question.correctIndex;
          let style = "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800";

          if (answered && isRight) {
            style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
          } else if (isThis && !answered) {
            style = "border-red-500/50 bg-red-500/10 text-red-400";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all",
                style,
                answered && "cursor-default",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {answered && isRight && <CheckCircle2 className="w-5 h-5 ml-auto text-emerald-500 shrink-0" />}
                {isThis && !isCorrect && !answered && <XCircle className="w-5 h-5 ml-auto text-red-500 shrink-0" />}
              </div>
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-400 leading-relaxed">{question.explanation}</p>
            </div>
            <button
              onClick={handleContinue}
              className="mt-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              {isLast ? "Continue" : "Next Question"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
