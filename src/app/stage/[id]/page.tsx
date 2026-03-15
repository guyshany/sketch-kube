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
import LessonDrawer from "@/components/lessons/LessonDrawer";
import { notFound } from "next/navigation";

export default function StagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const stage = useMemo(() => getStageById(id), [id]);
  const clearCanvas = useCanvasStore((s) => s.clearCanvas);
  const resetLesson = useLessonStore((s) => s.reset);
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);

  useEffect(() => {
    clearCanvas();
    resetLesson();
  }, [id, clearCanvas, resetLesson]);

  if (!stage) {
    notFound();
  }

  const challenge = stage.challenges[0];
  const availableComponents = challenge?.availableComponents ?? [];

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen bg-zinc-950">
        <TopBar stage={stage} />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-44 flex-shrink-0">
            <ComponentPalette availableComponents={availableComponents} />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <SketchCanvas />
            <LessonDrawer stage={stage} />
          </div>
          {selectedNodeId && (
            <div className="flex-shrink-0">
              <ConfigPanel />
            </div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
}
