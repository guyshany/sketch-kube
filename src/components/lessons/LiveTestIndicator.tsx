"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/lib/store/canvas-store";
import { runAllTests, type TestResult } from "@/lib/engine/validator";
import type { Challenge } from "@/types/stages";

interface LiveTestIndicatorProps {
  challenge: Challenge;
  compact?: boolean;
}

export default function LiveTestIndicator({ challenge, compact }: LiveTestIndicatorProps) {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const [results, setResults] = useState<TestResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const testCases = challenge.testCases ?? [];

  useEffect(() => {
    if (testCases.length === 0) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const r = runAllTests(nodes, edges, testCases);
      setResults(r);
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [nodes, edges, testCases]);

  if (testCases.length === 0) return null;

  const passing = results.filter((r) => r.passed).length;
  const total = testCases.length;
  const hasNodes = nodes.length > 0;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {testCases.map((tc, i) => {
            const result = results[i];
            const status = !hasNodes ? "pending" : result?.passed ? "pass" : "fail";
            return (
              <div
                key={tc.id}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  status === "pass" && "bg-emerald-500",
                  status === "fail" && "bg-red-500/60",
                  status === "pending" && "bg-zinc-600",
                )}
              />
            );
          })}
        </div>
        {hasNodes && (
          <span className={cn(
            "text-[10px] font-medium",
            passing === total ? "text-emerald-400" : "text-zinc-500",
          )}>
            {passing}/{total}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {testCases.map((tc, i) => {
        const result = results[i];
        const status = !hasNodes ? "pending" : result?.passed ? "pass" : "fail";
        return (
          <div key={tc.id} className="flex items-center gap-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full shrink-0 transition-colors",
                status === "pass" && "bg-emerald-500",
                status === "fail" && "bg-red-500/60",
                status === "pending" && "bg-zinc-600",
              )}
            />
            <span
              className={cn(
                "text-[11px] transition-colors",
                status === "pass" && "text-emerald-400/80",
                status === "fail" && "text-zinc-500",
                status === "pending" && "text-zinc-600",
              )}
            >
              {tc.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
