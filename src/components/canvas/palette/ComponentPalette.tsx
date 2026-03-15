"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { componentRegistry, categoryLabels } from "@/lib/components-registry";
import type { ComponentType, SketchNodeData } from "@/types/nodes";
import type { Node } from "@xyflow/react";
import { useCanvasStore } from "@/lib/store/canvas-store";
import {
  Terminal, Code, Cpu, Plug, Box, Layers, HardDrive,
  Hexagon, GitBranch, Globe, ArrowRightLeft, FileText,
  Lock, Database, DatabaseZap, Network, HeartPulse,
  Package, Rocket, Blocks, Cloud,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal, Code, Cpu, Plug, Box, Layers, HardDrive,
  Hexagon, GitBranch, Globe, ArrowRightLeft, FileText,
  Lock, Database, DatabaseZap, Network, HeartPulse,
  Package, Rocket, Blocks, Cloud,
};

interface ComponentPaletteProps {
  availableComponents: ComponentType[];
}

export default function ComponentPalette({ availableComponents }: ComponentPaletteProps) {
  const addNode = useCanvasStore((s) => s.addNode);
  const nodes = useCanvasStore((s) => s.nodes);

  const grouped = availableComponents.reduce<Record<string, ComponentType[]>>(
    (acc, type) => {
      const def = componentRegistry[type];
      if (!def) return acc;
      const cat = def.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(type);
      return acc;
    },
    {},
  );

  const handleAdd = useCallback(
    (componentType: ComponentType) => {
      const def = componentRegistry[componentType];
      if (!def) return;
      const id = `${componentType}-${Date.now()}`;
      const xOffset = (nodes.length % 4) * 200 + 100;
      const yOffset = Math.floor(nodes.length / 4) * 120 + 100;
      const node: Node<SketchNodeData> = {
        id,
        type: "sketchNode",
        position: { x: xOffset, y: yOffset },
        data: {
          label: def.label,
          componentType,
          config: { ...def.defaultConfig },
          status: "idle",
        },
      };
      addNode(node);
    },
    [addNode, nodes.length],
  );

  return (
    <div className="flex flex-col h-full bg-zinc-900/50 border-r border-zinc-800">
      <div className="px-3 py-3 border-b border-zinc-800">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Components
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {Object.entries(grouped).map(([category, types]) => (
          <div key={category}>
            <div className="px-1 mb-1.5">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                {categoryLabels[category] ?? category}
              </span>
            </div>
            <div className="space-y-0.5">
              {types.map((type) => {
                const def = componentRegistry[type];
                if (!def) return null;
                const Icon = iconMap[def.icon] ?? Terminal;
                return (
                  <button
                    key={type}
                    onClick={() => handleAdd(type)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left",
                      "hover:bg-zinc-800 transition-colors group cursor-grab active:cursor-grabbing",
                      "text-zinc-400 hover:text-zinc-200",
                    )}
                    title={def.description}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs truncate">{def.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
