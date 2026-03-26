"use client";

import { motion } from "framer-motion";

export function TerminalIntro() {
  const lines = [
    { prompt: "$ ", text: "echo 'Hello, World!'", delay: 0.3 },
    { prompt: "", text: "Hello, World!", delay: 1.2, isOutput: true },
    { prompt: "$ ", text: "ls -la", delay: 2.0 },
    { prompt: "", text: "drwxr-xr-x  5 user  staff  160 Mar 13 file.txt", delay: 2.8, isOutput: true },
    { prompt: "$ ", text: "", delay: 3.5, cursor: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-zinc-500">bash</span>
      </div>
      <div className="p-3 space-y-1 min-h-[100px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line.delay, duration: 0.1 }}
            className="flex"
          >
            {line.prompt && (
              <span className="text-emerald-400 mr-1">{line.prompt}</span>
            )}
            {line.cursor ? (
              <motion.span
                className="inline-block w-2 h-3.5 bg-zinc-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ) : (
              <motion.span
                className={line.isOutput ? "text-zinc-400" : "text-zinc-200"}
              >
                {line.text.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: line.delay + (line.isOutput ? 0 : ci * 0.03),
                      duration: 0.05,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function CommandStructure() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-emerald-400">$ </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30"
          >
            ls
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30"
          >
            -la
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30"
          >
            /home
          </motion.span>
        </div>
      </div>
      <div className="flex gap-4 text-[10px] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1"
        >
          <div className="w-2 h-2 rounded-sm bg-blue-500/40" />
          <span className="text-zinc-500">Command</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-1"
        >
          <div className="w-2 h-2 rounded-sm bg-amber-500/40" />
          <span className="text-zinc-500">Flags</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex items-center gap-1"
        >
          <div className="w-2 h-2 rounded-sm bg-purple-500/40" />
          <span className="text-zinc-500">Argument</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex items-center gap-3 mt-2 justify-center"
      >
        <div className="flex items-center gap-1.5 text-[10px]">
          <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            exit 0
          </div>
          <span className="text-zinc-600">= success</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400">
            exit 1
          </div>
          <span className="text-zinc-600">= error</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PipeDiagram() {
  const steps = [
    { label: "cat log.txt", color: "border-blue-500/30 bg-blue-500/10 text-blue-400" },
    { label: 'grep "ERROR"', color: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
    { label: "wc -l", color: "border-purple-500/30 bg-purple-500/10 text-purple-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.4, type: "spring", damping: 15 }}
              className={`px-3 py-2 rounded-lg border font-mono text-xs ${step.color}`}
            >
              {step.label}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.4 + 0.2 }}
                className="flex items-center"
              >
                <svg width="36" height="20" viewBox="0 0 36 20">
                  <line x1="0" y1="10" x2="28" y2="10" stroke="#3f3f46" strokeWidth="1.5" />
                  <path d="M28 6 L34 10 L28 14" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
                  <circle r="3" fill="#6366f1">
                    <animateMotion dur="0.8s" repeatCount="indefinite" path="M0,10 L28,10" />
                  </circle>
                </svg>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.4 + 0.3 }}
                  className="text-[10px] text-zinc-600 font-mono absolute -mt-5"
                >
                  |
                </motion.span>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex items-center justify-center gap-2 text-[10px]"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700">
          <span className="text-zinc-500">Output:</span>
          <motion.span
            className="font-mono text-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            42
          </motion.span>
          <span className="text-zinc-600">(error count)</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
