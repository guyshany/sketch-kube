"use client";

import { useEffect, useRef, useCallback } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

interface TerminalEmulatorProps {
  onData?: (data: string) => void;
  onReady?: (terminal: Terminal) => void;
}

export default function TerminalEmulator({
  onData,
  onReady,
}: TerminalEmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  const handleResize = useCallback(() => {
    try {
      fitAddonRef.current?.fit();
    } catch {
      // ignore resize errors when element is hidden
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || terminalRef.current) return;

    const terminal = new Terminal({
      theme: {
        background: "#0a0a0a",
        foreground: "#e4e4e7",
        cursor: "#a78bfa",
        cursorAccent: "#0a0a0a",
        selectionBackground: "#6366f133",
        black: "#18181b",
        red: "#ef4444",
        green: "#22c55e",
        yellow: "#eab308",
        blue: "#6366f1",
        magenta: "#a855f7",
        cyan: "#06b6d4",
        white: "#e4e4e7",
        brightBlack: "#52525b",
        brightRed: "#f87171",
        brightGreen: "#4ade80",
        brightYellow: "#facc15",
        brightBlue: "#818cf8",
        brightMagenta: "#c084fc",
        brightCyan: "#22d3ee",
        brightWhite: "#fafafa",
      },
      fontSize: 14,
      fontFamily: '"Geist Mono", "Fira Code", "Cascadia Code", monospace',
      cursorBlink: true,
      cursorStyle: "bar",
      allowTransparency: true,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(containerRef.current);

    try {
      fitAddon.fit();
    } catch {
      // container may not yet be visible
    }

    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;

    if (onData) {
      terminal.onData(onData);
    }

    onReady?.(terminal);

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      terminal.dispose();
      terminalRef.current = null;
      fitAddonRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-lg overflow-hidden bg-[#0a0a0a] p-1"
    />
  );
}
