"use client";

import { motion } from "framer-motion";
import { AnimatedBox, AnimatedArrow, PulsingDot } from "./AnimatedBox";

export function ProcessIntro() {
  const processes = [
    { name: "nginx", pid: "1024", status: "running", color: "border-emerald-500/30 bg-emerald-500/10" },
    { name: "postgres", pid: "2048", status: "running", color: "border-blue-500/30 bg-blue-500/10" },
    { name: "redis", pid: "3072", status: "running", color: "border-amber-500/30 bg-amber-500/10" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-zinc-500 font-mono">
          <span className="w-12">PID</span>
          <span className="w-20">NAME</span>
          <span>STATUS</span>
        </div>
        {processes.map((proc, i) => (
          <motion.div
            key={proc.pid}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className={`flex items-center gap-2 px-3 py-2 border-b border-zinc-800/50 ${proc.color}`}
          >
            <span className="w-12 font-mono text-zinc-400">{proc.pid}</span>
            <span className="w-20 font-medium text-zinc-200">{proc.name}</span>
            <div className="flex items-center gap-1.5">
              <PulsingDot delay={0.5 + i * 0.2} color="bg-emerald-500" />
              <span className="text-emerald-400 ml-2">{proc.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <span className="text-[10px] text-zinc-600">
          Services run continuously, unlike regular commands that exit
        </span>
      </motion.div>
    </motion.div>
  );
}

export function PortDiagram() {
  const ports = [
    { port: "80", service: "HTTP", color: "text-blue-400 border-blue-500/30" },
    { port: "443", service: "HTTPS", color: "text-emerald-400 border-emerald-500/30" },
    { port: "5432", service: "PostgreSQL", color: "text-amber-400 border-amber-500/30" },
    { port: "3000", service: "Dev Server", color: "text-purple-400 border-purple-500/30" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="relative w-40 h-40 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 flex items-center justify-center"
        >
          <span className="text-xs text-zinc-500 font-medium">Your Computer</span>

          {ports.map((p, i) => {
            const angle = (i * 90 - 45) * (Math.PI / 180);
            const x = Math.cos(angle) * 75;
            const y = Math.sin(angle) * 75;
            return (
              <motion.div
                key={p.port}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", damping: 12 }}
                className={`absolute flex flex-col items-center gap-0.5 px-2 py-1 rounded border bg-zinc-900 ${p.color}`}
                style={{ left: `calc(50% + ${x}px - 24px)`, top: `calc(50% + ${y}px - 16px)` }}
              >
                <span className="font-mono text-[10px] font-bold">:{p.port}</span>
                <span className="text-[8px] text-zinc-500">{p.service}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ClientServerDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="flex items-center gap-2">
        <AnimatedBox
          label="Browser"
          sublabel="(client)"
          color="border-blue-500/30 bg-blue-500/10 text-blue-400"
          delay={0.2}
        />
        <div className="flex flex-col items-center gap-0.5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-1"
          >
            <span className="text-[9px] text-zinc-600">GET /index.html</span>
            <svg width="50" height="12" viewBox="0 0 50 12">
              <line x1="0" y1="6" x2="42" y2="6" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M42 3 L48 6 L42 9" stroke="#3b82f6" strokeWidth="1" fill="none" />
              <circle r="2.5" fill="#3b82f6">
                <animateMotion dur="1s" repeatCount="indefinite" path="M0,6 L42,6" />
              </circle>
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-1"
          >
            <svg width="50" height="12" viewBox="0 0 50 12">
              <line x1="50" y1="6" x2="8" y2="6" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M8 3 L2 6 L8 9" stroke="#22c55e" strokeWidth="1" fill="none" />
              <circle r="2.5" fill="#22c55e">
                <animateMotion dur="1s" repeatCount="indefinite" path="M50,6 L8,6" />
              </circle>
            </svg>
            <span className="text-[9px] text-zinc-600">200 OK + HTML</span>
          </motion.div>
        </div>
        <AnimatedBox
          label="nginx"
          sublabel=":80"
          color="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex items-center gap-3 text-[10px] mt-1"
      >
        <div className="flex items-center gap-1">
          <div className="w-6 h-0.5 bg-blue-500 rounded" />
          <span className="text-zinc-500">Request</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-0.5 bg-emerald-500 rounded" />
          <span className="text-zinc-500">Response</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
