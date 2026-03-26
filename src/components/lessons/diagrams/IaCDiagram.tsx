"use client";

import { motion } from "framer-motion";

export function IaCIntroDiagram() {
  const benefits = [
    { icon: "📝", label: "Version controlled", delay: 0.2 },
    { icon: "🔄", label: "Reproducible", delay: 0.4 },
    { icon: "👀", label: "Reviewable (PRs)", delay: 0.6 },
    { icon: "🧪", label: "Testable", delay: 0.8 },
    { icon: "🤖", label: "Automated (CI/CD)", delay: 1.0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/5"
        >
          <span className="text-sm">🖱️</span>
          <span className="text-[10px] text-red-400 line-through">Click-ops</span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-600 text-lg"
        >
          →
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5"
        >
          <span className="text-sm">💻</span>
          <span className="text-[10px] text-emerald-400 font-semibold">Code</span>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {benefits.map((b) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: b.delay, type: "spring", damping: 12 }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[9px] text-zinc-300"
          >
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function PulumiCodeDiagram() {
  const lines = [
    { text: 'import * as k8s from "@pulumi/kubernetes";', color: "text-zinc-500", delay: 0.3 },
    { text: "", delay: 0.4 },
    { text: 'const deploy = new k8s.apps.v1.Deployment("web", {', color: "text-blue-400", delay: 0.5 },
    { text: "  spec: {", color: "text-zinc-400", delay: 0.6 },
    { text: "    replicas: 3,", color: "text-amber-400", delay: 0.7, highlight: true },
    { text: '    selector: { matchLabels: { app: "web" } },', color: "text-zinc-400", delay: 0.8 },
    { text: "    template: { spec: { containers: [{", color: "text-zinc-400", delay: 0.9 },
    { text: '      image: "nginx:latest",', color: "text-emerald-400", delay: 1.0, highlight: true },
    { text: "    }]}}},", color: "text-zinc-400", delay: 1.1 },
    { text: "});", color: "text-blue-400", delay: 1.2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-[10px]"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-zinc-500">index.ts</span>
      </div>
      <div className="p-3 space-y-0.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line.delay }}
            className={`${line.color} ${line.highlight ? "bg-indigo-500/10 -mx-1 px-1 rounded" : ""}`}
          >
            {line.text || "\u00A0"}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function StackProviderDiagram() {
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
        className="px-5 py-2.5 rounded-xl border-2 border-purple-500/30 bg-purple-500/5 text-center"
      >
        <span className="text-xs text-purple-400 font-semibold">Stack: production</span>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <svg width="80" height="24" viewBox="0 0 80 24">
          <line x1="20" y1="0" x2="20" y2="18" stroke="#a855f7" strokeWidth="1" />
          <path d="M17 18 L20 24 L23 18" stroke="#a855f7" strokeWidth="1" fill="none" />
          <line x1="60" y1="0" x2="60" y2="18" stroke="#a855f7" strokeWidth="1" />
          <path d="M57 18 L60 24 L63 18" stroke="#a855f7" strokeWidth="1" fill="none" />
        </svg>
      </motion.div>

      <div className="flex gap-3">
        {[
          { name: "kubernetes", icon: "☸️", color: "border-blue-500/30 bg-blue-500/5 text-blue-400", delay: 0.7 },
          { name: "aws", icon: "☁️", color: "border-amber-500/30 bg-amber-500/5 text-amber-400", delay: 0.9 },
        ].map((p) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: p.delay, type: "spring" }}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border ${p.color}`}
          >
            <span className="text-sm">{p.icon}</span>
            <span className="text-[10px] font-medium">{p.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <svg width="120" height="20" viewBox="0 0 120 20">
          <line x1="20" y1="0" x2="20" y2="14" stroke="#3b82f6" strokeWidth="1" />
          <line x1="40" y1="0" x2="40" y2="14" stroke="#3b82f6" strokeWidth="1" />
          <line x1="80" y1="0" x2="80" y2="14" stroke="#f59e0b" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="14" stroke="#f59e0b" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex gap-2 text-[9px]"
      >
        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Deploy</span>
        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Service</span>
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">RDS</span>
        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">S3</span>
      </motion.div>
    </motion.div>
  );
}
