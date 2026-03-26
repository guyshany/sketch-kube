"use client";

import { use, useEffect, useMemo } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { getStageById } from "@/lib/stages";
import { useCanvasStore } from "@/lib/store/canvas-store";
import { useLessonStore } from "@/lib/store/lesson-store";
import TopBar from "@/components/layout/TopBar";
import SketchCanvas from "@/components/canvas/SketchCanvas";
import ComponentPalette from "@/components/canvas/palette/ComponentPalette";
import ConfigPanel from "@/components/canvas/config-panel/ConfigPanel";
import LessonFullScreen from "@/components/lessons/LessonFullScreen";
import ChallengeBar from "@/components/lessons/ChallengeBar";
import { notFound } from "next/navigation";

export default function StagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const stage = useMemo(() => getStageById(id), [id]);
  const clearCanvas = useCanvasStore((s) => s.clearCanvas);
  const resetLesson = useLessonStore((s) => s.reset);
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const mode = useLessonStore((s) => s.mode);
  const currentChallengeIndex = useLessonStore((s) => s.currentChallengeIndex);

  useEffect(() => {
    clearCanvas();
    resetLesson();
  }, [id, clearCanvas, resetLesson]);

  if (!stage) {
    notFound();
  }

  const challenge = stage.challenges[currentChallengeIndex] ?? stage.challenges[0];
  const availableComponents = challenge?.availableComponents ?? [];

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen bg-zinc-950">
        <TopBar stage={stage} />

        {mode === "lesson" ? (
          <LessonFullScreen stage={stage} />
        ) : (
          <div className="flex flex-1 overflow-hidden">
            <div className="w-44 flex-shrink-0">
              <ComponentPalette availableComponents={availableComponents} />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <SketchCanvas />
              <ChallengeBar stage={stage} />
            </div>
            {selectedNodeId && (
              <div className="flex-shrink-0">
                <ConfigPanel />
              </div>
            )}
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
}
