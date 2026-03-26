"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  type NodeTypes,
  type EdgeTypes,
  type OnNodesDelete,
  type OnEdgesDelete,
} from "@xyflow/react";
import { useCanvasStore } from "@/lib/store/canvas-store";
import { useAchievements } from "@/lib/hooks/use-achievements";
import SketchNode from "./nodes/SketchNode";
import AnimatedEdge from "./edges/AnimatedEdge";

const nodeTypes: NodeTypes = {
  sketchNode: SketchNode,
};

const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
};

export default function SketchCanvas() {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const onNodesChange = useCanvasStore((s) => s.onNodesChange);
  const onEdgesChange = useCanvasStore((s) => s.onEdgesChange);
  const onConnect = useCanvasStore((s) => s.onConnect);
  const setSelectedNodeId = useCanvasStore((s) => s.setSelectedNodeId);
  const { onEdgeAdded } = useAchievements();

  const handleConnect = useCallback(
    (connection: Parameters<typeof onConnect>[0]) => {
      onConnect(connection);
      onEdgeAdded();
    },
    [onConnect, onEdgeAdded],
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string }) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const handleNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      if (deleted.some((n) => n.id === useCanvasStore.getState().selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [setSelectedNodeId],
  );

  const handleEdgesDelete: OnEdgesDelete = useCallback(() => {}, []);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: "animated" as const,
      data: { animated: false, status: "idle" as const },
    }),
    [],
  );

  const showEmptyHint = nodes.length === 0;

  return (
    <div className="flex-1 h-full relative">
      {showEmptyHint && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 py-4 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm max-w-sm">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Drag components from the <span className="text-indigo-400 font-medium">palette</span> on the left and connect them to build your architecture.
            </p>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        onNodesDelete={handleNodesDelete}
        onEdgesDelete={handleEdgesDelete}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
        fitViewOptions={{ maxZoom: 1, padding: 0.4 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="bg-zinc-950"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#27272a"
        />
        <Controls
          className="!bg-zinc-800 !border-zinc-700 !rounded-lg !shadow-lg [&>button]:!bg-zinc-800 [&>button]:!border-zinc-700 [&>button]:!text-zinc-400 [&>button:hover]:!bg-zinc-700"
        />
      </ReactFlow>
    </div>
  );
}
