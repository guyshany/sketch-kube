"use client";

import { ChevronUp, ChevronDown, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLessonStore } from "@/lib/store/lesson-store";
import { useProgressStore } from "@/lib/store/progress-store";
import type { Stage } from "@/types/stages";
import SimulationRunner from "@/components/simulation/SimulationRunner";
import { DiagramRenderer } from "@/components/lessons/diagrams";

interface LessonDrawerProps {
  stage: Stage;
}

export default function LessonDrawer({ stage }: LessonDrawerProps) {
  const drawerOpen = useLessonStore((s) => s.drawerOpen);
  const toggleDrawer = useLessonStore((s) => s.toggleDrawer);
  const mode = useLessonStore((s) => s.mode);
  const setMode = useLessonStore((s) => s.setMode);
  const currentLessonIndex = useLessonStore((s) => s.currentLessonIndex);
  const setCurrentLessonIndex = useLessonStore((s) => s.setCurrentLessonIndex);
  const currentChallengeIndex = useLessonStore((s) => s.currentChallengeIndex);
  const hintsRevealed = useLessonStore((s) => s.hintsRevealed);
  const revealHint = useLessonStore((s) => s.revealHint);
  const completeLesson = useProgressStore((s) => s.completeLesson);

  const lessons = stage.lessons;
  const challenges = stage.challenges;
  const currentLesson = lessons[currentLessonIndex];
  const currentChallenge = challenges[currentChallengeIndex];

  const isLastLesson = currentLessonIndex >= lessons.length - 1;

  const handleNextLesson = () => {
    if (currentLesson) {
      completeLesson(stage.id, currentLesson.id);
    }
    if (isLastLesson) {
      setMode("challenge");
    } else {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div
      className={cn(
        "border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300",
        drawerOpen ? "h-80" : "h-10",
      )}
    >
      <button
        onClick={toggleDrawer}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {mode === "lesson" ? "Lesson" : "Challenge"}
          </span>
          {mode === "lesson" && (
            <span className="text-xs text-zinc-600">
              {currentLessonIndex + 1} / {lessons.length}
            </span>
          )}
          {mode === "challenge" && currentChallenge && (
            <span className="text-xs text-indigo-400 font-medium">
              {currentChallenge.title}
            </span>
          )}
        </div>
        {drawerOpen ? (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        )}
      </button>

      {drawerOpen && (
        <div className="px-4 py-3 h-[calc(100%-40px)] overflow-y-auto">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setMode("lesson")}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                mode === "lesson"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200",
              )}
            >
              Lessons
            </button>
            <button
              onClick={() => setMode("challenge")}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                mode === "challenge"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200",
              )}
            >
              Challenge
            </button>
          </div>

          {mode === "lesson" && currentLesson && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-200">
                {currentLesson.title}
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                  {currentLesson.content}
                </div>
                {currentLesson.diagram && (
                  <div className="flex-1 flex items-start justify-center pt-1">
                    <DiagramRenderer diagramId={currentLesson.diagram} />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className={cn(
                    "flex items-center gap-1 text-xs px-3 py-1.5 rounded-md transition-colors",
                    currentLessonIndex === 0
                      ? "text-zinc-600 cursor-not-allowed"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
                  )}
                >
                  <ArrowLeft className="w-3 h-3" />
                  Previous
                </button>
                <button
                  onClick={handleNextLesson}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  {isLastLesson ? "Start Challenge" : "Next"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {mode === "challenge" && currentChallenge && (
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">
                  {currentChallenge.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  {currentChallenge.description}
                </p>
              </div>

              <SimulationRunner
                challenge={currentChallenge}
                stage={stage}
              />

              {currentChallenge.hints.length > 0 && (
                <div className="pt-2 border-t border-zinc-800">
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
                    <div className="mt-2 space-y-1.5">
                      {currentChallenge.hints
                        .slice(0, hintsRevealed)
                        .map((hint, i) => (
                          <p
                            key={i}
                            className="text-xs text-amber-400/70 bg-amber-500/5 rounded px-2 py-1.5 border border-amber-500/10"
                          >
                            Hint {i + 1}: {hint}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
