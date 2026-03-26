"use client";

import { motion } from "framer-motion";
import { AnimatedBox, AnimatedArrow } from "./AnimatedBox";

export function WorksOnMyMachine() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-12 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center">
            <span className="text-sm font-mono font-bold tracking-tight text-emerald-400">PC</span>
          </div>
          <span className="text-[10px] text-zinc-400">Your Laptop</span>
          <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] text-emerald-400">Works!</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-zinc-600 text-lg"
        >
          →
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-12 rounded-lg border border-red-500/30 bg-red-500/5 flex items-center justify-center">
            <span className="text-sm font-mono font-bold tracking-tight text-red-400">SRV</span>
          </div>
          <span className="text-[10px] text-zinc-400">Production</span>
          <div className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
            <span className="text-[10px] text-red-400">Crashes!</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center gap-3 text-[10px] text-zinc-600"
      >
        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">Different OS</span>
        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">Missing libs</span>
        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">Wrong version</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-center"
      >
        <span className="text-xs text-indigo-400 font-medium">Docker solves this.</span>
      </motion.div>
    </motion.div>
  );
}

export function DockerImageDiagram() {
  const layers = [
    { label: "CMD node server.js", color: "border-purple-500/30 bg-purple-500/10 text-purple-400" },
    { label: "RUN npm install", color: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
    { label: "COPY . /app", color: "border-blue-500/30 bg-blue-500/10 text-blue-400" },
    { label: "FROM node:18", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-zinc-500 mb-1 font-medium">Dockerfile Layers</span>
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className={`w-44 px-3 py-1.5 rounded border font-mono text-[10px] text-center ${layer.color}`}
            >
              {layer.label}
            </motion.div>
          ))}
        </div>

        <AnimatedArrow delay={1.2} label="build" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-20 h-20 rounded-xl border-2 border-cyan-500/30 bg-cyan-500/5 flex flex-col items-center justify-center">
            <span className="text-lg font-mono font-bold tracking-tight text-cyan-400">PKG</span>
            <span className="text-[10px] text-cyan-400 font-medium mt-0.5">Image</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">myapp:v1.0</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ContainerDiagram() {
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
          className="flex flex-col items-center gap-1"
        >
          <div className="w-16 h-16 rounded-lg border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center">
            <span className="text-sm font-mono font-bold tracking-tight text-cyan-400">PKG</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-medium">Image</span>
          <span className="text-[9px] text-zinc-600">(blueprint)</span>
        </motion.div>

        <AnimatedArrow delay={0.6} label="run" />

        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
              <span className="text-[10px] text-emerald-400 font-mono">container-{i}</span>
              <span className="text-[9px] text-zinc-600">:808{i - 1}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-center text-[10px] text-zinc-600"
      >
        One image → many containers, each isolated with its own port
      </motion.div>
    </motion.div>
  );
}

export function VolumeDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3"
    >
      <AnimatedBox
        label="Container"
        sublabel="/app/data"
        color="border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
        delay={0.2}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center"
      >
        <svg width="50" height="12" viewBox="0 0 50 12">
          <line x1="0" y1="6" x2="42" y2="6" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M42 3 L48 6 L42 9" stroke="#6366f1" strokeWidth="1.5" fill="none" />
          <circle r="2.5" fill="#6366f1">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M0,6 L42,6" />
          </circle>
        </svg>
        <span className="text-[9px] text-zinc-600">mount</span>
        <svg width="50" height="12" viewBox="0 0 50 12">
          <line x1="50" y1="6" x2="8" y2="6" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M8 3 L2 6 L8 9" stroke="#6366f1" strokeWidth="1.5" fill="none" />
          <circle r="2.5" fill="#6366f1">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M50,6 L8,6" />
          </circle>
        </svg>
      </motion.div>
      <AnimatedBox
        label="Volume"
        sublabel="/host/data"
        color="border-amber-500/30 bg-amber-500/10 text-amber-400"
        delay={0.4}
        icon={
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-mono font-bold tracking-tight text-amber-400"
          >
            VOL
          </motion.span>
        }
      />
    </motion.div>
  );
}
