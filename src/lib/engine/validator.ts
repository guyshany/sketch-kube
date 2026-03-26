import type { Node, Edge } from "@xyflow/react";
import type { SketchNodeData } from "@/types/nodes";
import type { TestCase, Validation } from "@/types/stages";

export interface ValidationResult {
  passed: boolean;
  nodeId?: string;
  message: string;
}

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  results: ValidationResult[];
  path: string[];
}

function checkValidation(
  node: Node<SketchNodeData>,
  validation: Validation,
): ValidationResult {
  const config = node.data.config;
  const value = config[validation.field];

  let passed = false;
  switch (validation.operator) {
    case "equals":
      passed = String(value) === String(validation.value);
      break;
    case "contains":
      passed = String(value ?? "").includes(String(validation.value));
      break;
    case "exists":
      passed = value !== undefined && value !== "" && value !== null;
      break;
    case "gt":
      passed = Number(value) > Number(validation.value);
      break;
    case "lt":
      passed = Number(value) < Number(validation.value);
      break;
    case "matches":
      try {
        passed = new RegExp(String(validation.value)).test(String(value ?? ""));
      } catch {
        passed = false;
      }
      break;
  }

  return {
    passed,
    nodeId: node.id,
    message: passed ? `${validation.field}: OK` : validation.message,
  };
}

function buildAdjacencyList(
  edges: Edge[],
): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const edge of edges) {
    const list = adj.get(edge.source) ?? [];
    list.push(edge.target);
    adj.set(edge.source, list);
  }
  return adj;
}

function findPath(
  adj: Map<string, string[]>,
  start: string,
  end: string,
): string[] | null {
  const visited = new Set<string>();
  const queue: string[][] = [[start]];

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (current === end) return path;
    if (visited.has(current)) continue;
    visited.add(current);

    const neighbors = adj.get(current) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push([...path, neighbor]);
      }
    }
  }
  return null;
}

export function runTestCase(
  nodes: Node<SketchNodeData>[],
  edges: Edge[],
  testCase: TestCase,
): TestResult {
  const results: ValidationResult[] = [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const adj = buildAdjacencyList(edges);

  const entryNode = nodes.find(
    (n) => n.data.componentType === testCase.entryPoint || n.id === testCase.entryPoint,
  );
  if (!entryNode) {
    return {
      testCase,
      passed: false,
      results: [{ passed: false, message: `Entry point "${testCase.entryPoint}" not found. Add a ${testCase.entryPoint} component to start.` }],
      path: [],
    };
  }

  const pathNodeIds: string[] = [];

  if (testCase.expectedPath.length > 0) {
    const usedIds = new Set<string>();

    for (const expectedType of testCase.expectedPath) {
      const found = nodes.find(
        (n) =>
          (n.data.componentType === expectedType || n.id === expectedType) &&
          !usedIds.has(n.id),
      );
      if (!found) {
        const alreadyUsed = nodes.some(
          (n) =>
            (n.data.componentType === expectedType || n.id === expectedType) &&
            usedIds.has(n.id),
        );
        results.push({
          passed: false,
          message: alreadyUsed
            ? `Add another "${expectedType}" component — the existing one is already used in this path.`
            : `Required component "${expectedType}" is missing from the canvas.`,
        });
        return { testCase, passed: false, results, path: [] };
      }
      pathNodeIds.push(found.id);
      usedIds.add(found.id);
    }

    for (let i = 0; i < pathNodeIds.length - 1; i++) {
      const from = pathNodeIds[i];
      const to = pathNodeIds[i + 1];
      const reachable = findPath(adj, from, to);
      if (!reachable) {
        const fromNode = nodeMap.get(from);
        const toNode = nodeMap.get(to);
        results.push({
          passed: false,
          nodeId: from,
          message: `"${fromNode?.data.label ?? from}" is not connected to "${toNode?.data.label ?? to}". Draw a connection between them.`,
        });
        return { testCase, passed: false, results, path: pathNodeIds.slice(0, i + 1) };
      }
    }
  }

  const pathNodeSet = new Set(pathNodeIds);
  for (const validation of testCase.validations) {
    const target =
      pathNodeIds
        .map((id) => nodeMap.get(id))
        .find((n) => n && n.data.componentType === validation.nodeType) ??
      (pathNodeSet.size === 0
        ? nodes.find((n) => n.data.componentType === validation.nodeType)
        : undefined);
    if (!target) {
      results.push({
        passed: false,
        message: `Component "${validation.nodeType}" not found for validation.`,
      });
      continue;
    }
    results.push(checkValidation(target, validation));
  }

  const allPassed = results.every((r) => r.passed);

  return {
    testCase,
    passed: allPassed,
    results,
    path: pathNodeIds,
  };
}

export function runAllTests(
  nodes: Node<SketchNodeData>[],
  edges: Edge[],
  testCases: TestCase[],
): TestResult[] {
  return testCases.map((tc) => runTestCase(nodes, edges, tc));
}
