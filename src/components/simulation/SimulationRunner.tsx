"use client";

import { useCallback, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { Play, RotateCcw, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/lib/store/canvas-store";
import { useLessonStore } from "@/lib/store/lesson-store";
import { useProgressStore } from "@/lib/store/progress-store";
import { runAllTests, type TestResult } from "@/lib/engine/validator";
import { buildSimulationSteps, runSimulation } from "@/lib/engine/simulator";
import { useAchievements } from "@/lib/hooks/use-achievements";
import CompletionModal from "./CompletionModal";
import type { Challenge } from "@/types/stages";

interface SimulationRunnerProps {
  challenge: Challenge;
  stageId: string;
}

export default function SimulationRunner({ challenge, stageId }: SimulationRunnerProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const setNodeStatus = useCanvasStore((s) => s.setNodeStatus);
  const resetNodeStatuses = useCanvasStore((s) => s.resetNodeStatuses);
  const setSimulationRunning = useCanvasStore((s) => s.setSimulationRunning);
  const setEdges = useCanvasStore((s) => s.setEdges);

  const hintsRevealed = useLessonStore((s) => s.hintsRevealed);
  const completeChallenge = useProgressStore((s) => s.completeChallenge);
  const { onChallengeCompleted } = useAchievements();
  const { fitView } = useReactFlow();

  const handleTest = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setSimulationRunning(true);
    resetNodeStatuses();
    setResults([]);

    const testResults = runAllTests(nodes, edges, challenge.testCases);

    for (const result of testResults) {
      const steps = buildSimulationSteps(result, edges);

      await runSimulation(steps, (step) => {
        if (step.type === "node") {
          setNodeStatus(step.id, step.status, step.message);
        } else if (step.type === "edge") {
          setEdges(
            edges.map((e) =>
              e.id === step.id
                ? { ...e, data: { ...e.data, status: step.status, animated: step.status === "running" } }
                : e,
            ),
          );
        }
      });
    }

    setResults(testResults);
    setSimulationRunning(false);
    setRunning(false);

    const allPassed = testResults.every((r) => r.passed);
    if (!allPassed) {
      const failedResult = testResults.find((r) => !r.passed);
      const failedNodeId = failedResult?.results.find((r) => !r.passed)?.nodeId;
      if (failedNodeId) {
        fitView({ nodes: [{ id: failedNodeId }], duration: 500, padding: 0.5 });
      }
    }
    if (allPassed) {
      const starReduction = Math.min(hintsRevealed, challenge.maxStars - 1);
      const stars = Math.max(1, challenge.maxStars - starReduction);
      completeChallenge(stageId, challenge.id, stars, hintsRevealed);
      onChallengeCompleted(stageId, hintsRevealed, stars, challenge.maxStars);
      setEarnedStars(stars);
      setTimeout(() => setShowCompletion(true), 600);
    }
  }, [
    running, nodes, edges, challenge, stageId, hintsRevealed,
    setNodeStatus, resetNodeStatuses, setSimulationRunning,
    setEdges, completeChallenge, onChallengeCompleted,
  ]);

  const handleReset = useCallback(() => {
    resetNodeStatuses();
    setResults([]);
    setEdges(
      edges.map((e) => ({
        ...e,
        data: { ...e.data, status: "idle", animated: false },
      })),
    );
  }, [resetNodeStatuses, setEdges, edges]);

  const allPassed = results.length > 0 && results.every((r) => r.passed);
  const hasFailed = results.some((r) => !r.passed);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={handleTest}
          disabled={running}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            running
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 cursor-pointer",
          )}
        >
          {running ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {running ? "Running..." : "Test Solution"}
        </button>

        {results.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {allPassed && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-emerald-400 font-medium">
                All tests passed! Challenge complete.
              </span>
            </div>
          )}

          {results.map((result) => (
            <div
              key={result.testCase.id}
              className={cn(
                "p-3 rounded-lg border",
                result.passed
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-red-500/5 border-red-500/20",
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {result.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    result.passed ? "text-emerald-400" : "text-red-400",
                  )}
                >
                  {result.testCase.name}
                </span>
              </div>
              {!result.passed && (
                <div className="ml-6 space-y-1">
                  {result.results
                    .filter((r) => !r.passed)
                    .map((r, i) => (
                      <p key={i} className="text-xs text-red-400/80">
                        {r.message}
                      </p>
                    ))}
                </div>
              )}
              {result.passed && (
                <p className="ml-6 text-xs text-emerald-400/70">
                  {result.testCase.successMessage}
                </p>
              )}
            </div>
          ))}

          {hasFailed && (
            <p className="text-xs text-zinc-500 pl-1">
              Fix the issues above and test again.
            </p>
          )}
        </div>
      )}

      <CompletionModal
        visible={showCompletion}
        stars={earnedStars}
        maxStars={challenge.maxStars}
        stageId={stageId}
        onRetry={() => {
          setShowCompletion(false);
          handleReset();
        }}
        onClose={() => setShowCompletion(false)}
      />
    </div>
  );
}
