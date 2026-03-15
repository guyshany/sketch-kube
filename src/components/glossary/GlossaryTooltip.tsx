"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const glossary: Record<string, string> = {
  pod: "The smallest deployable unit in Kubernetes. Wraps one or more containers that share network and storage.",
  deployment: "Manages a set of identical Pods, ensuring the desired number of replicas are running.",
  service: "Provides a stable network endpoint (IP + port) to access a set of Pods selected by labels.",
  ingress: "Manages external HTTP/HTTPS access to services, supporting host and path-based routing.",
  configmap: "Stores non-confidential configuration data as key-value pairs, consumable by Pods.",
  secret: "Stores sensitive data (passwords, tokens) encoded in base64. Similar to ConfigMap but for secrets.",
  namespace: "A virtual cluster within K8s for isolating resources and applying resource quotas.",
  container: "A lightweight, standalone package of software that includes everything needed to run an application.",
  image: "A read-only template with instructions for creating a container. Built from a Dockerfile.",
  volume: "A directory accessible to containers in a Pod. Survives container restarts.",
  pv: "PersistentVolume -- a piece of storage provisioned by an admin or dynamically by a StorageClass.",
  pvc: "PersistentVolumeClaim -- a request for storage by a Pod. Binds to a PV.",
  helm: "The package manager for Kubernetes. Bundles K8s manifests into versioned, configurable Charts.",
  chart: "A Helm package containing templated K8s manifests and a values.yaml for configuration.",
  release: "A running instance of a Helm Chart with specific configuration values applied.",
  pulumi: "An IaC tool that lets you define cloud infrastructure using real programming languages.",
  kubectl: "The command-line tool for interacting with Kubernetes clusters.",
  cluster: "A set of machines (nodes) running Kubernetes that manage containerized applications.",
  node: "A worker machine in Kubernetes. Can be a VM or physical machine.",
  selector: "A label query that matches a set of resources. Used by Services to find Pods.",
  labels: "Key-value pairs attached to K8s objects for identification and grouping.",
  replica: "A copy of a Pod. Multiple replicas provide high availability and load distribution.",
  docker: "A platform for building, shipping, and running applications in containers.",
  dockerfile: "A text file with instructions for building a Docker image.",
  registry: "A storage and distribution system for Docker images (e.g., Docker Hub, ECR).",
  port: "A numbered endpoint for network communication. Processes listen on ports to receive traffic.",
  pipe: "A Unix mechanism (|) that connects the output of one command to the input of another.",
  stdout: "Standard output -- the default destination for a program's normal output.",
  stderr: "Standard error -- the default destination for a program's error messages.",
  "exit code": "A number returned by a process when it finishes. 0 = success, non-zero = error.",
  daemon: "A background process that runs continuously, typically providing a service.",
  "load balancer": "Distributes incoming network traffic across multiple servers or containers.",
  "health check": "A periodic probe that verifies a service is functioning correctly.",
  "rolling update": "A deployment strategy that gradually replaces old pods with new ones, avoiding downtime.",
  yaml: "YAML Ain't Markup Language -- a human-readable data serialization format used by K8s manifests.",
  etcd: "A distributed key-value store that K8s uses to store all cluster data.",
};

interface GlossaryTooltipProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlossaryTooltip({ children, className }: GlossaryTooltipProps) {
  const [tooltip, setTooltip] = useState<{ term: string; definition: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.glossary) {
      const term = target.dataset.glossary.toLowerCase();
      const definition = glossary[term];
      if (definition) {
        const rect = target.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          setTooltip({
            term: target.dataset.glossary,
            definition,
            x: rect.left - containerRect.left,
            y: rect.bottom - containerRect.top + 4,
          });
        }
      }
    }
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.glossary) {
      setTooltip(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
      {tooltip && (
        <div
          className="absolute z-50 max-w-xs px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 shadow-xl pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-xs font-semibold text-indigo-400 mb-0.5">
            {tooltip.term}
          </div>
          <div className="text-xs text-zinc-300 leading-relaxed">
            {tooltip.definition}
          </div>
        </div>
      )}
    </div>
  );
}

export { glossary };
