"use client";

import { TerminalIntro, CommandStructure, PipeDiagram } from "./TerminalDiagram";
import { ProcessIntro, PortDiagram, ClientServerDiagram } from "./ProcessDiagram";
import { WorksOnMyMachine, DockerImageDiagram, ContainerDiagram, VolumeDiagram } from "./DockerDiagram";
import { WhyOrchestration, LoadBalancerDiagram, HealthCheckDiagram } from "./OrchestrationDiagram";
import { K8sIntroDiagram, PodDiagram, DeploymentDiagram, ServiceDiagram } from "./K8sDiagram";
import { ServiceTypesDiagram, IngressDiagram, FullStackDiagram } from "./NetworkingDiagram";
import { ConfigMapDiagram, SecretDiagram, PVDiagram } from "./StorageDiagram";
import { HelmProblemDiagram, ChartStructureDiagram, HelmReleaseDiagram } from "./HelmDiagram";
import { IaCIntroDiagram, PulumiCodeDiagram, StackProviderDiagram } from "./IaCDiagram";

interface DiagramEntry {
  component: React.ComponentType;
  scale?: number;
}

const diagramRegistry: Record<string, DiagramEntry> = {
  "terminal-intro": { component: TerminalIntro, scale: 1.75 },
  "command-structure": { component: CommandStructure, scale: 1.75 },
  "pipe-diagram": { component: PipeDiagram, scale: 1.75 },

  "process-intro": { component: ProcessIntro, scale: 1.75 },
  "port-diagram": { component: PortDiagram, scale: 1.75 },
  "client-server": { component: ClientServerDiagram, scale: 1.75 },

  "works-on-my-machine": { component: WorksOnMyMachine, scale: 1.5 },
  "docker-image": { component: DockerImageDiagram, scale: 1.5 },
  "container-diagram": { component: ContainerDiagram, scale: 1.5 },
  "volume-diagram": { component: VolumeDiagram, scale: 1.5 },

  "why-orchestration": { component: WhyOrchestration, scale: 1.5 },
  "load-balancer": { component: LoadBalancerDiagram, scale: 1.5 },
  "health-check": { component: HealthCheckDiagram, scale: 1.5 },

  "k8s-intro": { component: K8sIntroDiagram, scale: 1.5 },
  "pod-diagram": { component: PodDiagram, scale: 1.75 },
  "deployment-diagram": { component: DeploymentDiagram, scale: 1.5 },
  "service-diagram": { component: ServiceDiagram, scale: 1.5 },

  "service-types": { component: ServiceTypesDiagram, scale: 1.5 },
  "ingress-diagram": { component: IngressDiagram, scale: 1.4 },
  "full-stack": { component: FullStackDiagram, scale: 1.3 },

  "configmap-diagram": { component: ConfigMapDiagram, scale: 1.5 },
  "secret-diagram": { component: SecretDiagram, scale: 1.5 },
  "pv-diagram": { component: PVDiagram, scale: 1.5 },

  "helm-problem": { component: HelmProblemDiagram, scale: 1.5 },
  "chart-structure": { component: ChartStructureDiagram, scale: 1.5 },
  "helm-release": { component: HelmReleaseDiagram, scale: 1.5 },

  "iac-intro": { component: IaCIntroDiagram, scale: 1.5 },
  "pulumi-code": { component: PulumiCodeDiagram, scale: 1.4 },
  "stack-provider": { component: StackProviderDiagram, scale: 1.5 },
};

export function DiagramRenderer({ diagramId }: { diagramId: string }) {
  const entry = diagramRegistry[diagramId];
  if (!entry) return null;
  const { component: Component, scale = 1.5 } = entry;
  return (
    <div
      className="py-3 origin-center"
      style={{ transform: `scale(${scale})` }}
    >
      <Component />
    </div>
  );
}

export default diagramRegistry;
