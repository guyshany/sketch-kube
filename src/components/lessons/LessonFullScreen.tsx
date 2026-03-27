"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLessonStore } from "@/lib/store/lesson-store";
import { useProgressStore } from "@/lib/store/progress-store";
import { DiagramRenderer } from "@/components/lessons/diagrams";
import FormattedContent from "@/components/lessons/FormattedContent";
import GlossaryTooltip from "@/components/glossary/GlossaryTooltip";
import QuizCard from "@/components/lessons/QuizCard";
import type { Stage } from "@/types/stages";

interface LessonFullScreenProps {
  stage: Stage;
}

export default function LessonFullScreen({ stage }: LessonFullScreenProps) {
  const currentLessonIndex = useLessonStore((s) => s.currentLessonIndex);
  const setCurrentLessonIndex = useLessonStore((s) => s.setCurrentLessonIndex);
  const setMode = useLessonStore((s) => s.setMode);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const [showingQuiz, setShowingQuiz] = useState(false);

  const lessons = stage.lessons;
  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex >= lessons.length - 1;
  const hasQuiz = currentLesson?.quiz && currentLesson.quiz.length > 0;

  const advance = () => {
    if (currentLesson) {
      completeLesson(stage.id, currentLesson.id);
    }
    if (isLastLesson) {
      setMode("challenge");
    } else {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setShowingQuiz(false);
    }
  };

  const handleNext = () => {
    if (hasQuiz && !showingQuiz) {
      setShowingQuiz(true);
      return;
    }
    advance();
  };

  const handlePrev = () => {
    if (showingQuiz) {
      setShowingQuiz(false);
      return;
    }
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setShowingQuiz(false);
    }
  };

  if (!currentLesson) return null;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 py-3 border-b border-zinc-800/50">
        {lessons.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentLessonIndex(i);
              setShowingQuiz(false);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === currentLessonIndex
                ? "bg-indigo-500 w-6"
                : i < currentLessonIndex
                  ? "bg-indigo-500/40"
                  : "bg-zinc-700",
            )}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {showingQuiz && hasQuiz ? (
          <div className="h-full flex items-center justify-center px-10 py-6">
            <div className="max-w-lg w-full">
              <div className="text-center mb-6">
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Lesson {currentLessonIndex + 1}: {currentLesson.title}
                </span>
              </div>
              <QuizCard
                questions={currentLesson.quiz!}
                onComplete={advance}
              />
            </div>
          </div>
        ) : currentLesson.diagram ? (
          <div className="flex h-full">
            <div className="w-[45%] overflow-y-auto px-10 py-8">
              <GlossaryTooltip>
                <div className="max-w-lg ml-auto pr-8">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
                      Lesson {currentLessonIndex + 1} of {lessons.length}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                    {currentLesson.title}
                  </h2>
                  <FormattedContent text={currentLesson.content} />
                </div>
              </GlossaryTooltip>
            </div>
            <div className="w-[55%] flex items-center justify-center px-8 py-8 overflow-hidden">
              <DiagramRenderer diagramId={currentLesson.diagram} />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto px-10 py-8">
            <GlossaryTooltip>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
                    Lesson {currentLessonIndex + 1} of {lessons.length}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                  {currentLesson.title}
                </h2>
                <FormattedContent text={currentLesson.content} />
              </div>
            </GlossaryTooltip>
          </div>
        )}
      </div>

      {/* Navigation footer */}
      <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm px-10 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentLessonIndex === 0 && !showingQuiz}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              currentLessonIndex === 0 && !showingQuiz
                ? "text-zinc-600 cursor-not-allowed"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            {showingQuiz ? "Back to Lesson" : "Previous"}
          </button>

          <span className="text-xs text-zinc-600">
            {showingQuiz
              ? "Knowledge Check"
              : `${currentLessonIndex + 1} / ${lessons.length}`}
          </span>

          {!showingQuiz && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
            >
              {isLastLesson && !hasQuiz ? "Start Challenge" : hasQuiz ? "Knowledge Check" : "Next Lesson"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
