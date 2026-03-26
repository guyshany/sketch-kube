"use client";

import { motion } from "framer-motion";

export function ConfigMapDiagram() {
  const entries = [
    { key: "DB_HOST", value: "postgres.default.svc", delay: 0.4 },
    { key: "LOG_LEVEL", value: "info", delay: 0.6 },
    { key: "CACHE_TTL", value: "300", delay: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative px-4 py-3 rounded-xl border border-blue-500/30 bg-blue-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-blue-400 font-semibold">
          ConfigMap
        </span>
        <div className="space-y-1 mt-1 font-mono text-[10px]">
          {entries.map((e) => (
            <motion.div
              key={e.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: e.delay }}
              className="flex items-center gap-1"
            >
              <span className="text-blue-400">{e.key}</span>
              <span className="text-zinc-600">=</span>
              <span className="text-zinc-300">{e.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <svg width="40" height="12" viewBox="0 0 40 12">
          <line x1="0" y1="6" x2="32" y2="6" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M32 3 L38 6 L32 9" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
          <circle r="2.5" fill="#3b82f6">
            <animateMotion dur="1s" repeatCount="indefinite" path="M0,6 L32,6" />
          </circle>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/5 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-mono font-bold tracking-tight text-indigo-400">PKG</span>
        <span className="text-[10px] text-indigo-400 font-medium">Pod</span>
        <span className="text-[9px] text-zinc-600">env vars</span>
      </motion.div>
    </motion.div>
  );
}

export function SecretDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-amber-400 font-semibold">
          Secret
        </span>
        <div className="space-y-1.5 mt-1 font-mono text-[10px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-1"
          >
            <span className="text-amber-400">DB_PASS</span>
            <span className="text-zinc-600">=</span>
            <motion.span
              className="text-zinc-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ••••••••
            </motion.span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-1"
          >
            <span className="text-amber-400">API_KEY</span>
            <span className="text-zinc-600">=</span>
            <motion.span
              className="text-zinc-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ••••••••
            </motion.span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-2 text-center"
        >
          <span className="text-[8px] text-red-400">
            <span className="font-mono font-bold tracking-tight">KEY</span> base64 encoded
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function PVDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2"
    >
      {[
        { label: "Pod", sublabel: "ephemeral", color: "border-indigo-500/30 bg-indigo-500/5 text-indigo-400", delay: 0.2 },
        { label: "PVC", sublabel: "request: 10Gi", color: "border-amber-500/30 bg-amber-500/5 text-amber-400", delay: 0.5 },
        { label: "PV", sublabel: "capacity: 10Gi", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400", delay: 0.8 },
      ].map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, type: "spring" }}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border ${item.color}`}
          >
            <span className="text-xs font-semibold">{item.label}</span>
            <span className="text-[9px] text-zinc-500 font-mono">{item.sublabel}</span>
          </motion.div>
          {i < 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: item.delay + 0.2 }}
            >
              <svg width="30" height="12" viewBox="0 0 30 12">
                <line x1="0" y1="6" x2="22" y2="6" stroke="#3f3f46" strokeWidth="1.5" />
                <path d="M22 3 L28 6 L22 9" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
                <circle r="2" fill="#6366f1">
                  <animateMotion dur="0.8s" repeatCount="indefinite" path="M0,6 L22,6" />
                </circle>
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
}
