"use client";

import { useCallback } from "react";
import { useProgressStore } from "@/lib/store/progress-store";
import { stages } from "@/lib/stages";

let firstNodeTriggered = false;
let firstEdgeTriggered = false;

export function useAchievements() {
  const unlockAchievement = useProgressStore((s) => s.unlockAchievement);
  const stageProgress = useProgressStore((s) => s.stageProgress);

  const onNodeAdded = useCallback(() => {
    if (!firstNodeTriggered) {
      firstNodeTriggered = true;
      unlockAchievement("first-node");
    }
  }, [unlockAchievement]);

  const onEdgeAdded = useCallback(() => {
    if (!firstEdgeTriggered) {
      firstEdgeTriggered = true;
      unlockAchievement("first-connection");
    }
  }, [unlockAchievement]);

  const onChallengeCompleted = useCallback(
    (stageId: string, hintsUsed: number, stars: number, maxStars: number) => {
      const totalCompleted = Object.values(stageProgress).reduce(
        (sum, sp) => sum + sp.challengeResults.filter((r) => r.completed).length,
        0,
      );
      if (totalCompleted === 0) {
        unlockAchievement("first-challenge");
      }

      if (stars === maxStars && hintsUsed === 0) {
        unlockAchievement("perfect-score");
      }

      const stageMap: Record<string, string> = {
        "stage-1": "terminal-master",
        "stage-3": "docker-captain",
        "stage-5": "k8s-pilot",
        "stage-8": "helm-navigator",
      };
      if (stageMap[stageId]) {
        unlockAchievement(stageMap[stageId]);
      }

      const allCompleted = stages.every((s) => {
        if (s.id === stageId) return true;
        return stageProgress[s.id]?.completed ?? false;
      });
      if (allCompleted) {
        unlockAchievement("infrastructure-architect");
      }

      const noHintCount = Object.values(stageProgress).reduce(
        (sum, sp) =>
          sum + sp.challengeResults.filter((r) => r.completed && r.hintsUsed === 0).length,
        0,
      );
      const currentNoHint = hintsUsed === 0 ? 1 : 0;
      if (noHintCount + currentNoHint >= 3) {
        unlockAchievement("no-hints");
      }
    },
    [unlockAchievement, stageProgress],
  );

  return { onNodeAdded, onEdgeAdded, onChallengeCompleted };
}
