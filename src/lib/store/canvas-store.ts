import { create } from "zustand";
import {
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Connection,
} from "@xyflow/react";
import type { SketchNodeData } from "@/types/nodes";

interface CanvasState {
  nodes: Node<SketchNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  simulationRunning: boolean;

  onNodesChange: OnNodesChange<Node<SketchNodeData>>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  setNodes: (nodes: Node<SketchNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node<SketchNodeData>) => void;
  updateNodeData: (nodeId: string, data: Partial<SketchNodeData>) => void;
  updateNodeConfig: (nodeId: string, key: string, value: unknown) => void;
  setSelectedNodeId: (id: string | null) => void;
  setNodeStatus: (
    nodeId: string,
    status: SketchNodeData["status"],
    statusMessage?: string,
  ) => void;
  resetNodeStatuses: () => void;
  setSimulationRunning: (running: boolean) => void;
  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  simulationRunning: false,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection: Connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => set({ nodes: [...get().nodes, node] }),

  updateNodeData: (nodeId, data) =>
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    }),

  updateNodeConfig: (nodeId, key, value) =>
    set({
      nodes: get().nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const config = { ...n.data.config };
        config[key] = value as string | number | boolean | string[] | undefined;
        return { ...n, data: { ...n.data, config } };
      }),
    }),

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  setNodeStatus: (nodeId, status, statusMessage) =>
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, status, statusMessage } } : n,
      ),
    }),

  resetNodeStatuses: () =>
    set({
      nodes: get().nodes.map((n) => ({
        ...n,
        data: { ...n.data, status: "idle" as const, statusMessage: undefined },
      })),
    }),

  setSimulationRunning: (running) => set({ simulationRunning: running }),

  clearCanvas: () =>
    set({ nodes: [], edges: [], selectedNodeId: null }),
}));
