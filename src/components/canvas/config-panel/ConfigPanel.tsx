"use client";

import { useCanvasStore } from "@/lib/store/canvas-store";
import { componentRegistry } from "@/lib/components-registry";
import { X } from "lucide-react";
import type { ConfigField } from "@/types/nodes";

export default function ConfigPanel() {
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const nodes = useCanvasStore((s) => s.nodes);
  const updateNodeConfig = useCanvasStore((s) => s.updateNodeConfig);
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);
  const setSelectedNodeId = useCanvasStore((s) => s.setSelectedNodeId);

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const def = componentRegistry[node.data.componentType];
  if (!def) return null;

  const handleChange = (field: ConfigField, value: string | number) => {
    const parsed = field.type === "number" ? Number(value) : value;
    updateNodeConfig(node.id, field.key, parsed);
    if (field.key === "name") {
      updateNodeData(node.id, { label: `${def.label}: ${value}` });
    }
  };

  return (
    <div className="w-64 bg-zinc-900/50 border-l border-zinc-800 flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-800">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Configure
        </h2>
        <button
          onClick={() => setSelectedNodeId(null)}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        <div className="text-sm font-medium text-zinc-200">{def.label}</div>
        <p className="text-xs text-zinc-500">{def.description}</p>

        <div className="space-y-3 pt-2">
          {def.configFields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs text-zinc-400 mb-1">
                {field.label}
                {field.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              {field.type === "select" ? (
                <select
                  value={String(node.data.config[field.key] ?? "")}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  value={String(node.data.config[field.key] ?? "")}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 text-xs text-zinc-200 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={String(node.data.config[field.key] ?? "")}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 py-2 border-t border-zinc-800">
        <div className="text-[10px] text-zinc-600 font-mono">
          ID: {node.id}
        </div>
      </div>
    </div>
  );
}
