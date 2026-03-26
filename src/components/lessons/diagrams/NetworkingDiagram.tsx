"use client";

import { motion } from "framer-motion";

export function ServiceTypesDiagram() {
  const types = [
    {
      name: "ClusterIP",
      desc: "Internal only",
      scope: "cluster",
      color: "border-blue-500/30 bg-blue-500/5 text-blue-400",
      delay: 0.2,
    },
    {
      name: "NodePort",
      desc: "Node IP:30000+",
      scope: "external",
      color: "border-amber-500/30 bg-amber-500/5 text-amber-400",
      delay: 0.5,
    },
    {
      name: "LoadBalancer",
      desc: "Public IP",
      scope: "external",
      color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
      delay: 0.8,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-end justify-center gap-3">
        {types.map((t) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.delay, type: "spring", damping: 15 }}
            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg border ${t.color}`}
          >
            <span className="text-xs font-semibold">{t.name}</span>
            <span className="text-[9px] text-zinc-500">{t.desc}</span>
            <div className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${t.scope === "external" ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-400"}`}>
              {t.scope}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function IngressDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-3 py-1.5 rounded-lg border border-zinc-600 bg-zinc-800/80 text-[10px] text-zinc-300"
      >
        <span className="font-mono font-bold tracking-tight text-sky-400">WEB</span> Internet
      </motion.div>

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
        className="relative px-6 py-3 rounded-xl border-2 border-violet-500/30 bg-violet-500/5"
      >
        <span className="absolute -top-2.5 left-3 px-1.5 bg-zinc-950 text-[10px] text-violet-400 font-semibold">
          Ingress
        </span>
        <div className="flex flex-col gap-1 mt-1">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 text-[9px]"
          >
            <span className="font-mono text-violet-400">api.app.com/</span>
            <span className="text-zinc-600">→</span>
            <span className="text-blue-400">api-svc:8080</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-2 text-[9px]"
          >
            <span className="font-mono text-violet-400">app.com/</span>
            <span className="text-zinc-600">→</span>
            <span className="text-emerald-400">web-svc:80</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-4"
      >
        <svg width="50" height="20" viewBox="0 0 50 20">
          <line x1="25" y1="0" x2="10" y2="14" stroke="#3b82f6" strokeWidth="1" />
          <path d="M7 12 L10 18 L13 12" stroke="#3b82f6" strokeWidth="1" fill="none" transform="rotate(-15 10 14)" />
        </svg>
        <svg width="50" height="20" viewBox="0 0 50 20">
          <line x1="25" y1="0" x2="40" y2="14" stroke="#22c55e" strokeWidth="1" />
          <path d="M37 12 L40 18 L43 12" stroke="#22c55e" strokeWidth="1" fill="none" transform="rotate(15 40 14)" />
        </svg>
      </motion.div>

      <div className="flex gap-3">
        {[
          { label: "API Service", color: "text-blue-400 border-blue-500/30 bg-blue-500/5" },
          { label: "Web Service", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
        ].map((svc, i) => (
          <motion.div
            key={svc.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.15 }}
            className={`px-3 py-1.5 rounded border text-[10px] ${svc.color}`}
          >
            {svc.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function FullStackDiagram() {
  const layers = [
    { label: "Internet", icon: "WEB", color: "border-zinc-600 bg-zinc-800/80 text-zinc-300", delay: 0.1 },
    { label: "Ingress", icon: "ING", color: "border-violet-500/30 bg-violet-500/5 text-violet-400", delay: 0.4 },
    { label: "Service", icon: "SVC", color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400", delay: 0.7 },
    { label: "Deployment → Pods", icon: "PKG", color: "border-indigo-500/30 bg-indigo-500/5 text-indigo-400", delay: 1.0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-1"
    >
      {layers.map((layer, i) => (
        <div key={layer.label} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: layer.delay, type: "spring", damping: 15 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${layer.color}`}
          >
            <span className="text-[10px] font-mono font-bold tracking-tight opacity-90">{layer.icon}</span>
            <span className="text-[10px] font-medium">{layer.label}</span>
          </motion.div>
          {i < layers.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: layer.delay + 0.2 }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16">
                <line x1="6" y1="0" x2="6" y2="10" stroke="#3f3f46" strokeWidth="1.5" />
                <path d="M3 10 L6 15 L9 10" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
                <circle r="2" fill="#6366f1">
                  <animateMotion dur="0.6s" repeatCount="indefinite" path="M6,0 L6,10" />
                </circle>
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
}
