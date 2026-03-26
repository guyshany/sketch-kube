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

const diagramRegistry: Record<string, React.ComponentType> = {
  "terminal-intro": TerminalIntro,
  "command-structure": CommandStructure,
  "pipe-diagram": PipeDiagram,

  "process-intro": ProcessIntro,
  "port-diagram": PortDiagram,
  "client-server": ClientServerDiagram,

  "works-on-my-machine": WorksOnMyMachine,
  "docker-image": DockerImageDiagram,
  "container-diagram": ContainerDiagram,
  "volume-diagram": VolumeDiagram,

  "why-orchestration": WhyOrchestration,
  "load-balancer": LoadBalancerDiagram,
  "health-check": HealthCheckDiagram,

  "k8s-intro": K8sIntroDiagram,
  "pod-diagram": PodDiagram,
  "deployment-diagram": DeploymentDiagram,
  "service-diagram": ServiceDiagram,

  "service-types": ServiceTypesDiagram,
  "ingress-diagram": IngressDiagram,
  "full-stack": FullStackDiagram,

  "configmap-diagram": ConfigMapDiagram,
  "secret-diagram": SecretDiagram,
  "pv-diagram": PVDiagram,

  "helm-problem": HelmProblemDiagram,
  "chart-structure": ChartStructureDiagram,
  "helm-release": HelmReleaseDiagram,

  "iac-intro": IaCIntroDiagram,
  "pulumi-code": PulumiCodeDiagram,
  "stack-provider": StackProviderDiagram,
};

export function DiagramRenderer({ diagramId }: { diagramId: string }) {
  const Component = diagramRegistry[diagramId];
  if (!Component) return null;
  return (
    <div className="py-3">
      <Component />
    </div>
  );
}

export default diagramRegistry;
