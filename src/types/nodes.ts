export type ComponentType =
  | "terminal"
  | "command"
  | "process"
  | "port"
  | "container"
  | "image"
  | "volume"
  | "pod"
  | "deployment"
  | "service"
  | "namespace"
  | "ingress"
  | "configmap"
  | "secret"
  | "pv"
  | "pvc"
  | "loadbalancer"
  | "healthcheck"
  | "helmchart"
  | "helmrelease"
  | "pulumistack"
  | "pulumiprovider";

export interface NodeConfig {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface TerminalConfig extends NodeConfig {
  shell: string;
}

export interface CommandConfig extends NodeConfig {
  command: string;
  args: string;
}

export interface ProcessConfig extends NodeConfig {
  name: string;
  pid: string;
}

export interface PortConfig extends NodeConfig {
  port: number;
  protocol: string;
}

export interface ContainerConfig extends NodeConfig {
  name: string;
  image: string;
  port: number;
  env: string;
}

export interface ImageConfig extends NodeConfig {
  name: string;
  tag: string;
  registry: string;
}

export interface VolumeConfig extends NodeConfig {
  name: string;
  mountPath: string;
  hostPath: string;
}

export interface PodConfig extends NodeConfig {
  name: string;
  labels: string;
  replicas: number;
}

export interface DeploymentConfig extends NodeConfig {
  name: string;
  replicas: number;
  selector: string;
  image: string;
  port: number;
}

export interface ServiceConfig extends NodeConfig {
  name: string;
  type: string;
  port: number;
  targetPort: number;
  selector: string;
}

export interface IngressConfig extends NodeConfig {
  name: string;
  host: string;
  path: string;
  serviceName: string;
  servicePort: number;
}

export interface ConfigMapConfig extends NodeConfig {
  name: string;
  data: string;
}

export interface SecretConfig extends NodeConfig {
  name: string;
  data: string;
}

export interface PVConfig extends NodeConfig {
  name: string;
  capacity: string;
  accessMode: string;
}

export interface PVCConfig extends NodeConfig {
  name: string;
  request: string;
  accessMode: string;
}

export interface LoadBalancerConfig extends NodeConfig {
  name: string;
  algorithm: string;
}

export interface HealthCheckConfig extends NodeConfig {
  path: string;
  port: number;
  interval: number;
}

export interface HelmChartConfig extends NodeConfig {
  name: string;
  version: string;
}

export interface HelmReleaseConfig extends NodeConfig {
  name: string;
  chart: string;
  namespace: string;
  values: string;
}

export interface PulumiStackConfig extends NodeConfig {
  name: string;
  runtime: string;
}

export interface PulumiProviderConfig extends NodeConfig {
  name: string;
  provider: string;
}

export type ConfigByType = {
  terminal: TerminalConfig;
  command: CommandConfig;
  process: ProcessConfig;
  port: PortConfig;
  container: ContainerConfig;
  image: ImageConfig;
  volume: VolumeConfig;
  pod: PodConfig;
  deployment: DeploymentConfig;
  service: ServiceConfig;
  namespace: NodeConfig;
  ingress: IngressConfig;
  configmap: ConfigMapConfig;
  secret: SecretConfig;
  pv: PVConfig;
  pvc: PVCConfig;
  loadbalancer: LoadBalancerConfig;
  healthcheck: HealthCheckConfig;
  helmchart: HelmChartConfig;
  helmrelease: HelmReleaseConfig;
  pulumistack: PulumiStackConfig;
  pulumiprovider: PulumiProviderConfig;
};

export interface SketchNodeData extends Record<string, unknown> {
  label: string;
  componentType: ComponentType;
  config: NodeConfig;
  status?: "idle" | "success" | "error" | "running";
  statusMessage?: string;
}

export interface ComponentDefinition {
  type: ComponentType;
  label: string;
  description: string;
  icon: string;
  category: string;
  defaultConfig: NodeConfig;
  configFields: ConfigField[];
}

export interface ConfigField {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}
