"use client";

import { motion } from "framer-motion";

export function HelmProblemDiagram() {
  const resources = ["Deployment", "Service", "ConfigMap", "Secret", "Ingress", "PVC"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {resources.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, y: 4, rotate: -5 + Math.random() * 10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
            className="px-2 py-1 rounded border border-zinc-700 bg-zinc-800/50 text-[10px] text-zinc-400 font-mono"
          >
            {r}.yaml
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[10px] text-zinc-500"
      >
        Managing {resources.length} YAML files per app × environments = chaos
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="flex items-center justify-center"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-500/30 bg-indigo-500/5">
          <span className="text-[10px] font-mono font-bold tracking-tight text-indigo-300">PKG</span>
          <span className="text-xs text-indigo-400 font-semibold">Helm Chart bundles them all</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ChartStructureDiagram() {
  const files = [
    { name: "mychart/", indent: 0, type: "dir", delay: 0.2 },
    { name: "Chart.yaml", indent: 1, type: "meta", delay: 0.35 },
    { name: "values.yaml", indent: 1, type: "config", delay: 0.5 },
    { name: "templates/", indent: 1, type: "dir", delay: 0.65 },
    { name: "deployment.yaml", indent: 2, type: "tmpl", delay: 0.8 },
    { name: "service.yaml", indent: 2, type: "tmpl", delay: 0.95 },
    { name: "ingress.yaml", indent: 2, type: "tmpl", delay: 1.1 },
  ];

  const colors: Record<string, string> = {
    dir: "text-blue-400",
    meta: "text-amber-400",
    config: "text-emerald-400",
    tmpl: "text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-center gap-6"
    >
      <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 font-mono text-[11px]">
        {files.map((f) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: f.delay }}
            className="flex items-center"
            style={{ paddingLeft: f.indent * 16 }}
          >
            <span className={`${colors[f.type]} ${f.type === "dir" ? "font-semibold" : ""}`}>
              {f.type === "dir" ? (
                <>
                  <span className="font-mono font-bold text-blue-300">DIR</span>{" "}
                </>
              ) : (
                <>
                  <span className="font-mono font-bold text-zinc-400">DOC</span>{" "}
                </>
              )}
              {f.name}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 font-mono text-[10px] max-w-[160px]"
      >
        <div className="text-zinc-500 mb-1">values.yaml</div>
        <div><span className="text-emerald-400">replicas</span>: <span className="text-amber-400">3</span></div>
        <div><span className="text-emerald-400">image</span>:</div>
        <div className="pl-3"><span className="text-emerald-400">tag</span>: <span className="text-amber-400">&quot;v2.1&quot;</span></div>
      </motion.div>
    </motion.div>
  );
}

export function HelmReleaseDiagram() {
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
        className="px-4 py-2 rounded-lg border border-purple-500/30 bg-purple-500/5 text-center"
      >
        <span className="text-xs text-purple-400 font-semibold">helm install my-app ./chart</span>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <svg width="12" height="20" viewBox="0 0 12 20">
          <line x1="6" y1="0" x2="6" y2="14" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M3 14 L6 20 L9 14" stroke="#a855f7" strokeWidth="1.5" fill="none" />
          <circle r="2" fill="#a855f7">
            <animateMotion dur="0.7s" repeatCount="indefinite" path="M6,0 L6,14" />
          </circle>
        </svg>
      </motion.div>

      <div className="flex gap-2">
        {[
          { env: "dev", replicas: 1, color: "border-blue-500/30 bg-blue-500/5 text-blue-400" },
          { env: "prod", replicas: 5, color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" },
        ].map((r, i) => (
          <motion.div
            key={r.env}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
            className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg border ${r.color}`}
          >
            <span className="text-xs font-semibold">Release: {r.env}</span>
            <span className="text-[9px] text-zinc-500">replicas: {r.replicas}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
