"use client";

import { motion } from "framer-motion";
import { AnimatedBox } from "./AnimatedBox";

export function WhyOrchestration() {
  const problems = [
    { icon: "SCL", label: "Scale up/down", delay: 0.3 },
    { icon: "RST", label: "Auto-restart", delay: 0.5 },
    { icon: "HLT", label: "Health checks", delay: 0.7 },
    { icon: "LB", label: "Load balance", delay: 0.9 },
    { icon: "ZDT", label: "Zero-downtime", delay: 1.1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {problems.map((p) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: p.delay, type: "spring", damping: 15 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50"
          >
            <span className="text-[10px] font-mono font-bold tracking-tight text-indigo-400">{p.icon}</span>
            <span className="text-[10px] text-zinc-300 font-medium">{p.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center text-[10px] text-zinc-500"
      >
        Managing all of this manually is painful. Orchestrators automate it.
      </motion.div>
    </motion.div>
  );
}

export function LoadBalancerDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <AnimatedBox
        label="Users"
        color="border-zinc-600 bg-zinc-800/80 text-zinc-300"
        delay={0.1}
        icon={<span className="text-[10px] font-mono font-bold tracking-tight text-zinc-400">USR</span>}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <svg width="12" height="24" viewBox="0 0 12 24">
          <line x1="6" y1="0" x2="6" y2="18" stroke="#6366f1" strokeWidth="1.5" />
          <path d="M3 18 L6 24 L9 18" stroke="#6366f1" strokeWidth="1.5" fill="none" />
          <circle r="2.5" fill="#6366f1">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M6,0 L6,18" />
          </circle>
        </svg>
      </motion.div>

      <AnimatedBox
        label="Load Balancer"
        sublabel="round-robin"
        color="border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
        delay={0.5}
        icon={<span className="text-[10px] font-mono font-bold tracking-tight text-indigo-400">LB</span>}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-end gap-6"
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <svg width="12" height="20" viewBox="0 0 12 20">
              <line x1="6" y1="0" x2="6" y2="14" stroke="#22c55e" strokeWidth="1" />
              <path d="M3 14 L6 20 L9 14" stroke="#22c55e" strokeWidth="1" fill="none" />
              <circle r="2" fill="#22c55e" opacity="0.8">
                <animateMotion dur={`${0.6 + i * 0.2}s`} repeatCount="indefinite" path="M6,0 L6,14" />
              </circle>
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.15, type: "spring" }}
              className="px-2 py-1.5 rounded border border-emerald-500/30 bg-emerald-500/5 text-[10px] text-emerald-400"
            >
              App {i}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function HealthCheckDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800/50"
      >
        <span className="text-[10px] font-mono font-bold tracking-tight text-emerald-400">CHK</span>
        <span className="text-[10px] text-zinc-300 font-medium">Health Check</span>
        <motion.span
          className="font-mono text-[9px] text-zinc-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          GET /health
        </motion.span>
      </motion.div>

      <div className="flex flex-col gap-2">
        <motion.div
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2"
        >
          <svg width="30" height="12" viewBox="0 0 30 12">
            <line x1="0" y1="6" x2="22" y2="6" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M22 3 L28 6 L22 9" stroke="#22c55e" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] text-emerald-400">200 OK</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="flex items-center gap-2"
        >
          <svg width="30" height="12" viewBox="0 0 30 12">
            <line x1="0" y1="6" x2="22" y2="6" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M22 3 L28 6 L22 9" stroke="#ef4444" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
            <span className="text-[10px] text-red-400">500 → restart</span>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-[10px] font-mono font-bold tracking-tight text-red-400"
            >
              RST
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
