"use client";

import { motion } from "framer-motion";
import { AnimatedArrow, PulsingDot } from "./AnimatedBox";

export function ArgoCDIntroDiagram() {
  const components = [
    { name: "API Server", icon: "API", color: "border-blue-500/30 bg-blue-500/5 text-blue-400", delay: 0.2 },
    { name: "Controller", icon: "CTL", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400", delay: 0.4 },
    { name: "Repo Server", icon: "GIT", color: "border-purple-500/30 bg-purple-500/5 text-purple-400", delay: 0.6 },
    { name: "Redis", icon: "RDS", color: "border-red-500/30 bg-red-500/5 text-red-400", delay: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-600 bg-zinc-800/80 text-[10px] text-zinc-300"
      >
        <span className="font-mono font-bold tracking-tight text-sky-400">GIT</span> Git Repository
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <svg width="12" height="20" viewBox="0 0 12 20">
          <line x1="6" y1="0" x2="6" y2="14" stroke="#6366f1" strokeWidth="1.5" />
          <path d="M3 14 L6 20 L9 14" stroke="#6366f1" strokeWidth="1.5" fill="none" />
          <circle r="2" fill="#6366f1">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M6,0 L6,14" />
          </circle>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="relative px-3 py-3 rounded-xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-indigo-400 font-semibold">
          Argo CD
        </span>
        <div className="flex items-center gap-2 mt-1">
          {components.map((c) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: c.delay, type: "spring", damping: 15 }}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg border ${c.color}`}
            >
              <span className="text-[10px] font-mono font-bold tracking-tight">{c.icon}</span>
              <span className="text-[9px]">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
        <svg width="12" height="20" viewBox="0 0 12 20">
          <line x1="6" y1="0" x2="6" y2="14" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M3 14 L6 20 L9 14" stroke="#22c55e" strokeWidth="1.5" fill="none" />
          <circle r="2" fill="#22c55e">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M6,0 L6,14" />
          </circle>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-[10px] text-emerald-400"
      >
        <span className="font-mono font-bold tracking-tight">K8S</span> Cluster (synced)
      </motion.div>
    </motion.div>
  );
}

export function NamespaceSADiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative px-6 py-4 rounded-xl border-2 border-dashed border-blue-500/30 bg-blue-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-blue-400 font-semibold">
          Namespace: argocd
        </span>

        <div className="flex items-center gap-3 mt-1">
          {[
            { name: "argocd-server", delay: 0.5 },
            { name: "argocd-controller", delay: 0.7 },
            { name: "argocd-repo-server", delay: 0.9 },
          ].map((sa) => (
            <motion.div
              key={sa.name}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sa.delay, type: "spring", damping: 15 }}
              className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/5"
            >
              <span className="text-[10px] font-mono font-bold tracking-tight text-amber-400">SA</span>
              <span className="text-[9px] text-amber-400">{sa.name}</span>
              <PulsingDot delay={sa.delay + 0.3} color="bg-amber-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-3"
      >
        {["API Token", "Identity", "Permissions"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + i * 0.15 }}
            className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[9px] text-zinc-400"
          >
            {label}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function RBACDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5"
        >
          <span className="text-[10px] font-mono font-bold tracking-tight text-emerald-400">ROLE</span>
          <span className="text-[10px] text-emerald-400">argocd-role</span>
          <div className="space-y-0.5 mt-1">
            {[
              "apps: deployments",
              "core: services",
              "core: configmaps",
            ].map((rule, i) => (
              <motion.div
                key={rule}
                initial={{ opacity: 0, x: -3 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="text-[8px] text-zinc-500 font-mono"
              >
                {rule}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <AnimatedArrow delay={0.9} label="binds" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: "spring" }}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-violet-500/30 bg-violet-500/5"
        >
          <span className="text-[10px] font-mono font-bold tracking-tight text-violet-400">RB</span>
          <span className="text-[10px] text-violet-400">RoleBinding</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <AnimatedArrow delay={1.2} label="grants" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/5"
        >
          <span className="text-[10px] font-mono font-bold tracking-tight text-amber-400">SA</span>
          <span className="text-[10px] text-amber-400">argocd-server</span>
          <PulsingDot delay={1.5} color="bg-amber-500" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-center text-[10px] text-zinc-500"
      >
        Role defines permissions, RoleBinding connects them to a ServiceAccount
      </motion.div>
    </motion.div>
  );
}
