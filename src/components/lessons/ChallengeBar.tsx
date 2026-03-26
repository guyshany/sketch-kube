"use client";

import { ChevronUp, ChevronDown, Lightbulb, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLessonStore } from "@/lib/store/lesson-store";
import FormattedContent from "@/components/lessons/FormattedContent";
import LiveTestIndicator from "@/components/lessons/LiveTestIndicator";
import type { Stage } from "@/types/stages";
import SimulationRunner from "@/components/simulation/SimulationRunner";

interface ChallengeBarProps {
  stage: Stage;
}

export default function ChallengeBar({ stage }: ChallengeBarProps) {
  const drawerOpen = useLessonStore((s) => s.drawerOpen);
  const toggleDrawer = useLessonStore((s) => s.toggleDrawer);
  const setMode = useLessonStore((s) => s.setMode);
  const currentChallengeIndex = useLessonStore((s) => s.currentChallengeIndex);
  const hintsRevealed = useLessonStore((s) => s.hintsRevealed);
  const revealHint = useLessonStore((s) => s.revealHint);

  const currentChallenge = stage.challenges[currentChallengeIndex];
  if (!currentChallenge) return null;

  return (
    <div
      className={cn(
        "border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300",
        drawerOpen ? "h-64" : "h-10",
      )}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <button
          onClick={toggleDrawer}
          className="flex items-center gap-3 hover:bg-zinc-800/50 rounded px-2 py-1 -mx-2 transition-colors"
        >
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Challenge
          </span>
          <span className="text-xs text-indigo-400 font-medium">
            {currentChallenge.title}
          </span>
          {drawerOpen ? (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          )}
        </button>
        {!drawerOpen && (
          <LiveTestIndicator challenge={currentChallenge} compact />
        )}
        <button
          onClick={() => setMode("lesson")}
          className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300 px-2 py-0.5 rounded hover:bg-zinc-800 transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          Review Lessons
        </button>
      </div>

      {drawerOpen && (
        <div className="px-4 py-3 h-[calc(100%-40px)] overflow-y-auto">
          <div className="flex gap-6">
            <div className="flex-1 space-y-2">
              <FormattedContent text={currentChallenge.description} />
              {currentChallenge.hints.length > 0 && (
                <div>
                  <button
                    onClick={revealHint}
                    disabled={hintsRevealed >= currentChallenge.hints.length}
                    className={cn(
                      "flex items-center gap-1.5 text-xs transition-colors",
                      hintsRevealed >= currentChallenge.hints.length
                        ? "text-zinc-600 cursor-not-allowed"
                        : "text-amber-400 hover:text-amber-300",
                    )}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {hintsRevealed >= currentChallenge.hints.length
                      ? "No more hints"
                      : `Show Hint (${hintsRevealed}/${currentChallenge.hints.length})`}
                  </button>
                  {hintsRevealed > 0 && (
                    <div className="mt-2 space-y-1">
                      {currentChallenge.hints
                        .slice(0, hintsRevealed)
                        .map((hint, i) => (
                          <p
                            key={i}
                            className="text-xs text-amber-400/70 bg-amber-500/5 rounded px-2 py-1 border border-amber-500/10"
                          >
                            Hint {i + 1}: {hint}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex-shrink-0 space-y-4">
              <LiveTestIndicator challenge={currentChallenge} />
              <SimulationRunner
                challenge={currentChallenge}
                stage={stage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
