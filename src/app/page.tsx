"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { stages } from "@/lib/stages";
import { useProgressStore, useProgressHydrated } from "@/lib/store/progress-store";
import TopBar from "@/components/layout/TopBar";
import Logo from "@/components/layout/Logo";
import ProgressBar from "@/components/progress/ProgressBar";
import {
  Terminal, Cpu, Box, Network, Hexagon, Globe,
  Database, Package, Blocks, Lock, Check, Star,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal, Cpu, Box, Network, Hexagon, Globe,
  Database, Package, Blocks,
};

const stageGradients = [
  "from-blue-600 to-blue-400",
  "from-cyan-600 to-cyan-400",
  "from-teal-600 to-teal-400",
  "from-amber-600 to-amber-400",
  "from-indigo-600 to-indigo-400",
  "from-violet-600 to-violet-400",
  "from-emerald-600 to-emerald-400",
  "from-purple-600 to-purple-400",
  "from-rose-600 to-rose-400",
];

export default function HomePage() {
  const hydrated = useProgressHydrated();
  const isStageUnlocked = useProgressStore((s) => s.isStageUnlocked);
  const isStageCompleted = useProgressStore((s) => s.isStageCompleted);
  const getStageStars = useProgressStore((s) => s.getStageStars);
  const getTotalStars = useProgressStore((s) => s.getTotalStars);
  const totalStars = hydrated ? getTotalStars() : 0;
  const maxTotalStars = stages.reduce(
    (sum, s) => sum + s.challenges.reduce((cs, c) => cs + c.maxStars, 0),
    0,
  );
  const completedStages = hydrated
    ? stages.filter((s) => isStageCompleted(s.id)).length
    : 0;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <TopBar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <Logo size={72} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <span className="text-xs text-indigo-400 font-medium">Interactive Learning Platform</span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-100 mb-3 tracking-tight">
            Learn Kubernetes,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Visually
            </span>
          </h1>
          <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed">
            From terminal basics to Helm charts and infrastructure as code.
            Drag, connect, and test your way through 9 progressive stages.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">Overall Progress</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs text-amber-400 font-medium tabular-nums">
                {totalStars} / {maxTotalStars}
              </span>
            </div>
          </div>
          <ProgressBar current={completedStages} total={stages.length} />
          {(() => {
            const nextStage = stages.find(
              (s) =>
                !isStageCompleted(s.id) &&
                isStageUnlocked(s.id, s.unlockedBy),
            );
            if (!nextStage) return null;
            return (
              <Link
                href={`/stage/${nextStage.id}`}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20"
              >
                {completedStages === 0 ? "Start Learning" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            );
          })()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((stage, index) => {
            const unlocked = hydrated
              ? isStageUnlocked(stage.id, stage.unlockedBy)
              : !stage.unlockedBy;
            const completed = hydrated && isStageCompleted(stage.id);
            const stars = hydrated ? getStageStars(stage.id) : 0;
            const maxStars = stage.challenges.reduce((s, c) => s + c.maxStars, 0);
            const Icon = iconMap[stage.icon] ?? Terminal;
            const gradient = stageGradients[index] ?? stageGradients[0];

            return (
              <Link
                key={stage.id}
                href={unlocked ? `/stage/${stage.id}` : "#"}
                className={cn(
                  "group relative rounded-xl border p-5 transition-all duration-200",
                  unlocked
                    ? "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 cursor-pointer"
                    : "border-zinc-800/50 bg-zinc-900/20 cursor-not-allowed opacity-50",
                )}
              >
                {completed && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                  </div>
                )}
                {!unlocked && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-4 h-4 text-zinc-600" />
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                      gradient,
                      !unlocked && "grayscale",
                    )}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-semibold">
                      Stage {stage.number}
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2">
                  {stage.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600">
                    {stage.lessons.length} lessons &middot;{" "}
                    {stage.challenges.length} challenge
                    {stage.challenges.length > 1 ? "s" : ""}
                  </span>
                  {unlocked && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: maxStars }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < stars
                              ? "fill-amber-400 text-amber-400"
                              : "text-zinc-700",
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-zinc-800 py-6 text-center">
        <p className="text-xs text-zinc-600">
          SketchKube &mdash; Learn infrastructure by building it
        </p>
      </footer>
    </div>
  );
}
