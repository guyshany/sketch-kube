import type { Edge } from "@xyflow/react";
import type { TestResult } from "./validator";

export interface SimulationStep {
  type: "node" | "edge";
  id: string;
  status: "running" | "success" | "error";
  message?: string;
  delay: number;
}

export function buildSimulationSteps(
  testResult: TestResult,
  edges: Edge[],
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const path = testResult.path;

  if (path.length === 0) return steps;

  const edgeMap = new Map<string, Edge>();
  for (const edge of edges) {
    edgeMap.set(`${edge.source}->${edge.target}`, edge);
  }

  for (let i = 0; i < path.length; i++) {
    const nodeId = path[i];
    const nodeResult = testResult.results.find((r) => r.nodeId === nodeId);
    const nodeStatus = nodeResult
      ? nodeResult.passed
        ? "success"
        : "error"
      : testResult.passed
        ? "success"
        : i === path.length - 1 && !testResult.passed
          ? "error"
          : "success";

    steps.push({
      type: "node",
      id: nodeId,
      status: "running",
      delay: 400,
    });
    steps.push({
      type: "node",
      id: nodeId,
      status: nodeStatus as "success" | "error",
      message: nodeResult?.message,
      delay: 300,
    });

    if (nodeStatus === "error") break;

    if (i < path.length - 1) {
      const nextNodeId = path[i + 1];
      const edge = edgeMap.get(`${nodeId}->${nextNodeId}`);
      if (edge) {
        steps.push({
          type: "edge",
          id: edge.id,
          status: "running",
          delay: 600,
        });
        steps.push({
          type: "edge",
          id: edge.id,
          status: "success",
          delay: 100,
        });
      }
    }
  }

  return steps;
}

export async function runSimulation(
  steps: SimulationStep[],
  onStep: (step: SimulationStep) => void,
): Promise<void> {
  for (const step of steps) {
    onStep(step);
    await new Promise((resolve) => setTimeout(resolve, step.delay));
  }
}
