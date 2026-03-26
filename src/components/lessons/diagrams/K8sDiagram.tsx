"use client";

import { motion } from "framer-motion";
import { AnimatedBox, AnimatedArrow, PulsingDot } from "./AnimatedBox";

export function K8sIntroDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800/50"
        >
          <span className="text-[10px] text-zinc-500 font-medium">You declare:</span>
          <div className="px-3 py-1.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-mono text-[10px] text-indigo-400">
            replicas: 3
          </div>
        </motion.div>

        <AnimatedArrow delay={0.6} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800/50"
        >
          <span className="text-[10px] text-zinc-500 font-medium">K8s ensures:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + i * 0.15, type: "spring" }}
                className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
              >
                <PulsingDot delay={1.2 + i * 0.15} color="bg-emerald-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-center text-[10px] text-zinc-500"
      >
        Declarative: describe the desired state, K8s makes it happen
      </motion.div>
    </motion.div>
  );
}

export function PodDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative p-4 rounded-xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-indigo-400 font-semibold">Pod</span>
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5"
          >
            <span className="text-[10px] font-mono font-bold tracking-tight text-cyan-400">PKG</span>
            <span className="text-[10px] text-cyan-400">nginx</span>
            <span className="text-[9px] text-zinc-600">:80</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/5"
          >
            <span className="text-[10px] font-mono font-bold tracking-tight text-amber-400">PKG</span>
            <span className="text-[10px] text-amber-400">log-agent</span>
            <span className="text-[9px] text-zinc-600">sidecar</span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex items-center gap-2 mt-2 justify-center"
        >
          <span className="text-[9px] text-zinc-600">Labels:</span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-mono text-[9px] text-indigo-400">
            app=web
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function DeploymentDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative px-5 py-3 rounded-xl border-2 border-purple-500/30 bg-purple-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-purple-400 font-semibold">
          Deployment
        </span>
        <div className="flex items-center gap-2 mt-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
              className="px-3 py-2 rounded-lg border border-indigo-500/30 bg-indigo-500/5 flex flex-col items-center gap-0.5"
            >
              <PulsingDot delay={0.8 + i * 0.2} color="bg-emerald-500" />
              <span className="text-[9px] text-indigo-400 mt-1">Pod {i}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-2 mt-2 justify-center text-[9px]"
        >
          <span className="text-zinc-600">selector:</span>
          <span className="font-mono text-purple-400">app=web</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-600">replicas:</span>
          <span className="font-mono text-purple-400">3</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ServiceDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <AnimatedBox
        label="Traffic"
        color="border-zinc-600 bg-zinc-800/80 text-zinc-300"
        delay={0.1}
        icon={<span className="text-[10px] font-mono font-bold tracking-tight text-sky-400">WEB</span>}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <svg width="12" height="20" viewBox="0 0 12 20">
          <line x1="6" y1="0" x2="6" y2="14" stroke="#6366f1" strokeWidth="1.5" />
          <path d="M3 14 L6 20 L9 14" stroke="#6366f1" strokeWidth="1.5" fill="none" />
          <circle r="2" fill="#6366f1">
            <animateMotion dur="0.7s" repeatCount="indefinite" path="M6,0 L6,14" />
          </circle>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-center"
      >
        <span className="text-[10px] text-emerald-400 font-medium">Service: web-svc</span>
        <div className="text-[9px] text-zinc-500 mt-0.5 font-mono">ClusterIP :80</div>
        <div className="text-[9px] text-zinc-600 mt-0.5">selector: app=web</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <svg width="60" height="20" viewBox="0 0 60 20">
          <line x1="10" y1="0" x2="10" y2="14" stroke="#22c55e" strokeWidth="1" />
          <path d="M7 14 L10 20 L13 14" stroke="#22c55e" strokeWidth="1" fill="none" />
          <line x1="30" y1="0" x2="30" y2="14" stroke="#22c55e" strokeWidth="1" />
          <path d="M27 14 L30 20 L33 14" stroke="#22c55e" strokeWidth="1" fill="none" />
          <line x1="50" y1="0" x2="50" y2="14" stroke="#22c55e" strokeWidth="1" />
          <path d="M47 14 L50 20 L53 14" stroke="#22c55e" strokeWidth="1" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex gap-2"
      >
        {["Pod 1", "Pod 2", "Pod 3"].map((pod, i) => (
          <motion.div
            key={pod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            className="px-2 py-1 rounded border border-indigo-500/30 bg-indigo-500/5 text-[9px] text-indigo-400"
          >
            {pod}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
