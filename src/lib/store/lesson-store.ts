import { create } from "zustand";

interface LessonState {
  currentLessonIndex: number;
  currentChallengeIndex: number;
  drawerOpen: boolean;
  hintsRevealed: number;
  mode: "lesson" | "challenge";
  narrativeSeen: boolean;

  setCurrentLessonIndex: (index: number) => void;
  setCurrentChallengeIndex: (index: number) => void;
  nextLesson: () => void;
  prevLesson: () => void;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  revealHint: () => void;
  resetHints: () => void;
  setMode: (mode: "lesson" | "challenge") => void;
  setNarrativeSeen: () => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  currentLessonIndex: 0,
  currentChallengeIndex: 0,
  drawerOpen: true,
  hintsRevealed: 0,
  mode: "lesson",
  narrativeSeen: false,

  setCurrentLessonIndex: (index) => set({ currentLessonIndex: index }),
  setCurrentChallengeIndex: (index) => set({ currentChallengeIndex: index }),

  nextLesson: () =>
    set({ currentLessonIndex: get().currentLessonIndex + 1 }),

  prevLesson: () =>
    set({
      currentLessonIndex: Math.max(0, get().currentLessonIndex - 1),
    }),

  setDrawerOpen: (open) => set({ drawerOpen: open }),
  toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),

  revealHint: () => set({ hintsRevealed: get().hintsRevealed + 1 }),
  resetHints: () => set({ hintsRevealed: 0 }),

  setMode: (mode) => set({ mode }),
  setNarrativeSeen: () => set({ narrativeSeen: true }),

  reset: () =>
    set({
      currentLessonIndex: 0,
      currentChallengeIndex: 0,
      drawerOpen: true,
      hintsRevealed: 0,
      mode: "lesson",
      narrativeSeen: false,
    }),
}));
