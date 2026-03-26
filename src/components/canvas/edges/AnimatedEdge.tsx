"use client";

import { memo } from "react";
import {
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";

interface AnimatedEdgeData extends Record<string, unknown> {
  animated?: boolean;
  status?: "idle" | "success" | "error" | "running";
}

function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps<Edge<AnimatedEdgeData>>) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  const isAnimating = data?.animated || data?.status === "running";
  const status = data?.status ?? "idle";

  const strokeColor = {
    idle: selected ? "#6366f1" : "#3f3f46",
    success: "#22c55e",
    error: "#ef4444",
    running: "#6366f1",
  }[status];

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: strokeColor,
          strokeWidth: status !== "idle" ? 2.5 : 2,
          transition: "stroke 0.3s ease",
        }}
      />
      {isAnimating && (
        <circle r="6" fill="#6366f1">
          <animateMotion dur="1.5s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  );
}

export default memo(AnimatedEdge);
