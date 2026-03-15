import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StageProgress, ChallengeResult } from "@/types/stages";

interface ProgressState {
  stageProgress: Record<string, StageProgress>;
  achievements: string[];
  currentStageId: string | null;

  isStageUnlocked: (stageId: string, unlockedBy?: string) => boolean;
  isStageCompleted: (stageId: string) => boolean;
  getStageStars: (stageId: string) => number;
  getTotalStars: () => number;

  setCurrentStage: (stageId: string) => void;
  completeLesson: (stageId: string, lessonId: string) => void;
  completeChallenge: (
    stageId: string,
    challengeId: string,
    stars: number,
    hintsUsed: number,
  ) => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      stageProgress: {},
      achievements: [],
      currentStageId: null,

      isStageUnlocked: (stageId, unlockedBy) => {
        if (!unlockedBy) return true;
        return get().isStageCompleted(unlockedBy);
      },

      isStageCompleted: (stageId) => {
        const progress = get().stageProgress[stageId];
        return progress?.completed ?? false;
      },

      getStageStars: (stageId) => {
        const progress = get().stageProgress[stageId];
        if (!progress) return 0;
        return progress.challengeResults.reduce((sum, r) => sum + r.stars, 0);
      },

      getTotalStars: () => {
        return Object.values(get().stageProgress).reduce((sum, sp) => {
          return sum + sp.challengeResults.reduce((s, r) => s + r.stars, 0);
        }, 0);
      },

      setCurrentStage: (stageId) => set({ currentStageId: stageId }),

      completeLesson: (stageId, lessonId) =>
        set((state) => {
          const progress = state.stageProgress[stageId] ?? {
            stageId,
            completed: false,
            lessonsCompleted: [],
            challengeResults: [],
          };
          if (progress.lessonsCompleted.includes(lessonId)) return state;
          return {
            stageProgress: {
              ...state.stageProgress,
              [stageId]: {
                ...progress,
                lessonsCompleted: [...progress.lessonsCompleted, lessonId],
              },
            },
          };
        }),

      completeChallenge: (stageId, challengeId, stars, hintsUsed) =>
        set((state) => {
          const progress = state.stageProgress[stageId] ?? {
            stageId,
            completed: false,
            lessonsCompleted: [],
            challengeResults: [],
          };
          const existing = progress.challengeResults.find(
            (r) => r.challengeId === challengeId,
          );
          const result: ChallengeResult = {
            challengeId,
            completed: true,
            stars: existing ? Math.max(existing.stars, stars) : stars,
            hintsUsed,
          };
          const results = existing
            ? progress.challengeResults.map((r) =>
                r.challengeId === challengeId ? result : r,
              )
            : [...progress.challengeResults, result];
          return {
            stageProgress: {
              ...state.stageProgress,
              [stageId]: {
                ...progress,
                completed: true,
                challengeResults: results,
              },
            },
          };
        }),

      unlockAchievement: (achievementId) =>
        set((state) => {
          if (state.achievements.includes(achievementId)) return state;
          return { achievements: [...state.achievements, achievementId] };
        }),

      resetProgress: () =>
        set({ stageProgress: {}, achievements: [], currentStageId: null }),
    }),
    {
      name: "sketch-kube-progress",
    },
  ),
);
