"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import {
  CheckCircle2,
  Circle,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Challenge, Stage, TerminalTask } from "@/types/stages";
import {
  boot,
  mountFiles,
  spawnShell,
  recordCommand,
  recordOutput,
  getLastCommand,
  getRecentOutput,
  clearOutputBuffer,
  clearCommandHistory,
  fileExists,
  readFile,
} from "@/lib/terminal/webcontainer-service";
import { getMockCommandFiles } from "@/lib/terminal/mock-fs";
import { useProgressStore } from "@/lib/store/progress-store";
import { useLessonStore } from "@/lib/store/lesson-store";
import { useAchievements } from "@/lib/hooks/use-achievements";
import CompletionModal from "@/components/simulation/CompletionModal";
import TerminalEmulator from "./TerminalEmulator";
import type { WebContainerProcess } from "@webcontainer/api";

interface TerminalChallengeRunnerProps {
  challenge: Challenge;
  stage: Stage;
}

export default function TerminalChallengeRunner({
  challenge,
  stage,
}: TerminalChallengeRunnerProps) {
  const stageId = stage.id;
  const tasks = challenge.terminalTasks ?? [];

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [booting, setBooting] = useState(true);
  const [bootError, setBootError] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [hintsOpen, setHintsOpen] = useState(false);

  const hintsRevealed = useLessonStore((s) => s.hintsRevealed);
  const revealHint = useLessonStore((s) => s.revealHint);
  const resetHints = useLessonStore((s) => s.resetHints);
  const setMode = useLessonStore((s) => s.setMode);
  const currentChallengeIndex = useLessonStore((s) => s.currentChallengeIndex);
  const setCurrentChallengeIndex = useLessonStore((s) => s.setCurrentChallengeIndex);
  const completeChallenge = useProgressStore((s) => s.completeChallenge);
  const { onChallengeCompleted } = useAchievements();

  const nextChallenge = stage.challenges[currentChallengeIndex + 1];

  const terminalRef = useRef<XTerminal | null>(null);
  const shellRef = useRef<WebContainerProcess | null>(null);
  const writerRef = useRef<WritableStreamDefaultWriter | null>(null);

  const currentLineRef = useRef("");
  const validationPendingRef = useRef(false);

  const validateTask = useCallback(
    async (task: TerminalTask): Promise<boolean> => {
      const { validation } = task;
      switch (validation.type) {
        case "command_match": {
          const lastCmd = getLastCommand();
          if (!lastCmd) return false;
          return new RegExp(validation.pattern, "i").test(lastCmd);
        }
        case "output_contains": {
          const output = getRecentOutput(4000);
          return output.includes(validation.pattern);
        }
        case "file_exists": {
          return await fileExists(validation.pattern);
        }
        case "file_contains": {
          const [filePath, ...patternParts] = validation.pattern.split(":");
          const pattern = patternParts.join(":");
          try {
            const content = await readFile(filePath);
            return content.includes(pattern);
          } catch {
            return false;
          }
        }
        default:
          return false;
      }
    },
    [],
  );

  const checkCurrentTask = useCallback(async () => {
    if (activeTaskIndex >= tasks.length) return;
    const task = tasks[activeTaskIndex];
    if (completedTasks.has(task.id)) return;

    const passed = await validateTask(task);
    if (passed) {
      const term = terminalRef.current;
      if (term) {
        term.write(`\r\n\x1b[32m✓ ${task.successMessage}\x1b[0m\x1b[5 q\r\n`);
      }

      setCompletedTasks((prev) => {
        const next = new Set(prev);
        next.add(task.id);
        return next;
      });

      const nextIndex = activeTaskIndex + 1;
      if (nextIndex < tasks.length) {
        setActiveTaskIndex(nextIndex);
      } else {
        const stars = Math.max(
          1,
          challenge.maxStars - Math.floor(hintsRevealed / 2),
        );
        setEarnedStars(stars);
        completeChallenge(stageId, challenge.id, stars, hintsRevealed);
        onChallengeCompleted(stageId, hintsRevealed, stars, challenge.maxStars);
        setTimeout(() => setShowCompletion(true), 600);
      }
    }
  }, [
    activeTaskIndex,
    tasks,
    completedTasks,
    validateTask,
    hintsRevealed,
    challenge,
    stageId,
    completeChallenge,
    onChallengeCompleted,
  ]);

  const checkTaskRef = useRef(checkCurrentTask);
  checkTaskRef.current = checkCurrentTask;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setBooting(true);
        setBootError(null);
        await boot();

        const allFiles: Record<string, string> = {
          ...getMockCommandFiles(),
          ...(challenge.terminalFiles ?? {}),
        };
        await mountFiles(allFiles);

        const proc = await spawnShell();
        shellRef.current = proc;

        const writer = proc.input.getWriter();
        writerRef.current = writer;

        const reader = proc.output.getReader();
        (async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done || cancelled) break;

              terminalRef.current?.write(value);
              recordOutput(value);

              if (value.includes("\n") || value.includes("\r")) {
                if (validationPendingRef.current) {
                  validationPendingRef.current = false;
                  setTimeout(() => checkTaskRef.current(), 200);
                }
              }
            }
          } catch {
            // stream closed
          }
        })();

        writer.write(
          'export PATH="$PWD/bin:$PATH" 2>/dev/null; chmod +x bin/* 2>/dev/null; clear\n',
        );

        if (!cancelled) {
          setBooting(false);
        }
      } catch (err) {
        if (!cancelled) {
          setBootError(
            err instanceof Error ? err.message : "Failed to boot terminal",
          );
          setBooting(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      clearOutputBuffer();
      clearCommandHistory();
    };
  }, [challenge.terminalFiles]);

  const handleTerminalReady = useCallback(
    (terminal: XTerminal) => {
      terminalRef.current = terminal;
    },
    [],
  );

  const handleTerminalData = useCallback(
    (data: string) => {
      const writer = writerRef.current;
      if (!writer) return;

      if (data === "\r" || data === "\n") {
        const cmd = currentLineRef.current.trim();
        if (cmd) {
          recordCommand(cmd);
          validationPendingRef.current = true;
        }
        currentLineRef.current = "";
        writer.write(data);
      } else if (data === "\x7f") {
        currentLineRef.current = currentLineRef.current.slice(0, -1);
        writer.write(data);
      } else {
        currentLineRef.current += data;
        writer.write(data);
      }
    },
    [],
  );

  const handleRetry = useCallback(() => {
    setShowCompletion(false);
    setCompletedTasks(new Set());
    setActiveTaskIndex(0);
    setEarnedStars(0);
    resetHints();
    clearOutputBuffer();
    clearCommandHistory();
  }, [resetHints]);

  const handleNextChallenge = useCallback(() => {
    setShowCompletion(false);
    resetHints();
    setCurrentChallengeIndex(currentChallengeIndex + 1);
  }, [currentChallengeIndex, setCurrentChallengeIndex, resetHints]);

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Task Panel - Left Side */}
      <div className="w-80 flex-shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-semibold text-zinc-200">
              {challenge.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {completedTasks.size}/{tasks.length} tasks completed
            </p>
          </div>
          <button
            onClick={() => setMode("lesson")}
            className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            Lessons
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {tasks.map((task, i) => {
            const isDone = completedTasks.has(task.id);
            const isActive = i === activeTaskIndex && !isDone;

            return (
              <motion.div
                key={task.id}
                layout
                className={cn(
                  "rounded-lg p-3 transition-colors",
                  isActive && "bg-zinc-800/80 ring-1 ring-indigo-500/30",
                  isDone && "bg-emerald-950/20",
                  !isActive && !isDone && "opacity-50",
                )}
              >
                <div className="flex items-start gap-2.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle
                      className={cn(
                        "w-4 h-4 mt-0.5 flex-shrink-0",
                        isActive ? "text-indigo-400" : "text-zinc-600",
                      )}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-xs leading-relaxed",
                        isDone && "text-emerald-300 line-through",
                        isActive && "text-zinc-200",
                        !isActive && !isDone && "text-zinc-500",
                      )}
                    >
                      {task.instruction}
                    </p>
                    <AnimatePresence>
                      {isDone && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[10px] text-emerald-500 mt-1"
                        >
                          {task.successMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hints Section */}
        {challenge.hints.length > 0 && (
          <div className="border-t border-zinc-800 px-3 py-2">
            <button
              onClick={() => setHintsOpen(!hintsOpen)}
              className="flex items-center justify-between w-full text-xs text-zinc-500 hover:text-zinc-300 py-1 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3" />
                Hints
              </span>
              {hintsOpen ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </button>
            <AnimatePresence>
              {hintsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 pt-1 pb-2">
                    {challenge.hints
                      .slice(0, hintsRevealed)
                      .map((hint, i) => (
                        <p
                          key={i}
                          className="text-[10px] text-zinc-400 pl-4 border-l border-zinc-700"
                        >
                          {hint}
                        </p>
                      ))}
                    {hintsRevealed < challenge.hints.length && (
                      <button
                        onClick={revealHint}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Show hint ({hintsRevealed + 1}/
                        {challenge.hints.length})
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Terminal Panel - Right Side */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a]">
        {booting ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-zinc-400">
                Starting terminal environment...
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                This may take a few seconds on first load
              </p>
            </div>
          </div>
        ) : bootError ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-red-400 text-lg">!</span>
              </div>
              <p className="text-sm text-zinc-300 mb-1">
                Terminal failed to start
              </p>
              <p className="text-xs text-zinc-500 mb-4">{bootError}</p>
              <p className="text-xs text-zinc-600">
                WebContainer requires a modern browser with SharedArrayBuffer
                support. Make sure you&apos;re using Chrome, Edge, or Firefox.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-2">
            <TerminalEmulator
              onData={handleTerminalData}
              onReady={handleTerminalReady}
            />
          </div>
        )}
      </div>

      <CompletionModal
        visible={showCompletion}
        stars={earnedStars}
        maxStars={challenge.maxStars}
        stageId={stageId}
        onRetry={handleRetry}
        onClose={() => setShowCompletion(false)}
        onNextChallenge={nextChallenge ? handleNextChallenge : undefined}
        nextChallengeTitle={nextChallenge?.title}
      />
    </div>
  );
}
