"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import AchievementToast from "@/components/achievements/AchievementToast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        {children}
        <AchievementToast />
      </LazyMotion>
    </MotionConfig>
  );
}
