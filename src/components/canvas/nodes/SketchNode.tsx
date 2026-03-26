"use client";

import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { componentRegistry } from "@/lib/components-registry";
import { useCanvasStore } from "@/lib/store/canvas-store";
import type { SketchNodeData } from "@/types/nodes";
import {
  Terminal, Code, Cpu, Plug, Box, Layers, HardDrive,
  Hexagon, GitBranch, Globe, ArrowRightLeft, FileText,
  Lock, Database, DatabaseZap, Network, HeartPulse,
  Package, Rocket, Blocks, Cloud, X,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal, Code, Cpu, Plug, Box, Layers, HardDrive,
  Hexagon, GitBranch, Globe, ArrowRightLeft, FileText,
  Lock, Database, DatabaseZap, Network, HeartPulse,
  Package, Rocket, Blocks, Cloud,
};

const statusColors = {
  idle: "border-zinc-600",
  success: "border-emerald-500 shadow-emerald-500/20 shadow-lg",
  error: "border-red-500 shadow-red-500/20 shadow-lg",
  running: "border-indigo-500 shadow-indigo-500/20 shadow-lg animate-pulse",
};

const categoryColors: Record<string, string> = {
  basics: "bg-blue-500/10 text-blue-400",
  docker: "bg-cyan-500/10 text-cyan-400",
  orchestration: "bg-amber-500/10 text-amber-400",
  kubernetes: "bg-indigo-500/10 text-indigo-400",
  helm: "bg-purple-500/10 text-purple-400",
  iac: "bg-emerald-500/10 text-emerald-400",
};

function SketchNodeComponent({ id, data, selected }: NodeProps<Node<SketchNodeData>>) {
  const def = componentRegistry[data.componentType];
  const IconComponent = def ? iconMap[def.icon] : Terminal;
  const category = def?.category ?? "basics";
  const status = data.status ?? "idle";

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const store = useCanvasStore.getState();
      store.setNodes(store.nodes.filter((n) => n.id !== id));
      store.setEdges(store.edges.filter((edge) => edge.source !== id && edge.target !== id));
      store.setSelectedNodeId(null);
    },
    [id],
  );

  return (
    <div
      className={cn(
        "group relative rounded-lg border-2 bg-zinc-900 px-3.5 py-2.5 min-w-[120px] transition-all duration-200",
        statusColors[status],
        selected && "ring-2 ring-indigo-500/50",
      )}
    >
      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-zinc-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-zinc-600 !border-zinc-500 hover:!bg-indigo-500 transition-colors"
      />

      <div className="flex items-center gap-2">
        <div className={cn("rounded-md p-1.5", categoryColors[category])}>
          {IconComponent && <IconComponent className="w-4 h-4" />}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-zinc-300">
            {data.label || def?.label}
          </span>
          {data.config?.name && (
            <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[90px]">
              {String(data.config.name)}
            </span>
          )}
        </div>
      </div>

      {data.statusMessage && (
        <div
          className={cn(
            "absolute -bottom-7 left-0 right-0 text-[9px] rounded px-2 py-0.5 text-center whitespace-nowrap z-10",
            status === "error"
              ? "text-red-400 bg-red-500/10"
              : "text-emerald-400 bg-emerald-500/10",
          )}
        >
          {data.statusMessage}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-zinc-600 !border-zinc-500 hover:!bg-indigo-500 transition-colors"
      />
    </div>
  );
}

export default memo(SketchNodeComponent);
