import type { ComponentType, SketchNodeData } from "./nodes";
import type { Node, Edge } from "@xyflow/react";

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Validation {
  nodeType: ComponentType;
  field: string;
  operator: "equals" | "contains" | "exists" | "gt" | "lt" | "matches";
  value: string | number | boolean;
  message: string;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  entryPoint: string;
  expectedPath: string[];
  validations: Validation[];
  successMessage: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  availableComponents: ComponentType[];
  initialNodes?: Node<SketchNodeData>[];
  initialEdges?: Edge[];
  testCases: TestCase[];
  hints: string[];
  maxStars: number;
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  challenges: Challenge[];
  unlockedBy?: string;
}

export interface StageProgress {
  stageId: string;
  completed: boolean;
  lessonsCompleted: string[];
  challengeResults: ChallengeResult[];
}

export interface ChallengeResult {
  challengeId: string;
  completed: boolean;
  stars: number;
  hintsUsed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}
