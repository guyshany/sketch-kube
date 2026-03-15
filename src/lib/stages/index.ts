import type { Stage } from "@/types/stages";
import { stage1Terminal } from "./stage-1-terminal";
import { stage2Processes } from "./stage-2-processes";
import { stage3Docker } from "./stage-3-docker";
import { stage4Orchestration } from "./stage-4-orchestration";
import { stage5K8sCore } from "./stage-5-k8s-core";
import { stage6Networking } from "./stage-6-networking";
import { stage7Storage } from "./stage-7-storage";
import { stage8Helm } from "./stage-8-helm";
import { stage9IaC } from "./stage-9-iac";

export const stages: Stage[] = [
  stage1Terminal,
  stage2Processes,
  stage3Docker,
  stage4Orchestration,
  stage5K8sCore,
  stage6Networking,
  stage7Storage,
  stage8Helm,
  stage9IaC,
];

export function getStageById(id: string): Stage | undefined {
  return stages.find((s) => s.id === id);
}

export function getStageByNumber(num: number): Stage | undefined {
  return stages.find((s) => s.number === num);
}
