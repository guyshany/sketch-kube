import type { ComponentType, SketchNodeData } from "./nodes";
import type { Node, Edge } from "@xyflow/react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  diagram?: string;
  quiz?: QuizQuestion[];
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

export interface TerminalValidation {
  type: "command_match" | "output_contains" | "file_exists" | "file_contains";
  pattern: string;
}

export interface TerminalTask {
  id: string;
  instruction: string;
  validation: TerminalValidation;
  successMessage: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type?: "canvas" | "terminal";
  availableComponents?: ComponentType[];
  initialNodes?: Node<SketchNodeData>[];
  initialEdges?: Edge[];
  testCases?: TestCase[];
  terminalTasks?: TerminalTask[];
  terminalFiles?: Record<string, string>;
  hints: string[];
  maxStars: number;
}

export interface NarrativeCharacter {
  name: string;
  role: string;
  avatar: string;
  color: string;
}

export interface StageNarrative {
  character: NarrativeCharacter;
  intro: string;
  context: string;
  debrief: string;
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
  narrative?: StageNarrative;
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
