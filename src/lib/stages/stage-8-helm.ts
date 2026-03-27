import type { Stage } from "@/types/stages";

export const stage8Helm: Stage = {
  id: "stage-8",
  number: 8,
  title: "Helm Charts",
  description:
    "Learn how Helm packages Kubernetes resources into reusable, configurable charts.",
  icon: "Package",
  unlockedBy: "stage-7",
  narrative: {
    character: { name: "Sam Patel", role: "Release Engineer", avatar: "SP", color: "amber" },
    intro: "Sam here, release engineering. Here's the problem — we're about to spin up staging and dev environments, and copy-pasting YAML files is a disaster waiting to happen. Same K8s resources, different configs — different replica counts, image tags, env vars. Someone will deploy prod secrets to dev eventually. Trust me, I've seen it happen. Helm is the answer — let me show you how to package everything into a reusable chart.",
    context: "Package the app into a Helm chart for multi-environment deployment.",
    debrief: "Beautiful. One chart, multiple environments, no copy-paste disasters. Maya wants to talk to you — she has a bigger vision.",
  },
  lessons: [
    {
      id: "8-1",
      title: "The Problem Helm Solves",
      diagram: "helm-problem",
      content: `By now you've seen that a single application needs many K8s resources:
  - Deployment
  - Service
  - ConfigMap
  - Secret
  - Ingress
  - PVC
  ...

Managing all these YAML files manually is tedious. What if you need to:
  - Deploy the same app in dev, staging, and production (with different configs)?
  - Share your setup with others?
  - Version your infrastructure?

Helm is "the package manager for Kubernetes". It bundles K8s resources into a Chart.`,
      quiz: [
        {
          question: "What problem does Helm solve?",
          options: [
            "Running containers without Kubernetes",
            "Managing many YAML files across environments as a single package",
            "Writing Kubernetes code in Go",
            "Monitoring cluster health",
          ],
          correctIndex: 1,
          explanation:
            "Helm bundles all the YAML resources for an app into a Chart — one package you can version, share, and configure differently per environment.",
        },
      ],
    },
    {
      id: "8-2",
      title: "Charts, Templates & Values",
      diagram: "chart-structure",
      content: `A Helm Chart is a directory with:

  mychart/
    Chart.yaml       # Chart metadata (name, version)
    values.yaml      # Default configuration values
    templates/       # K8s manifest templates
      deployment.yaml
      service.yaml

Templates use Go templating to inject values:
  replicas: {{ .Values.replicaCount }}
  image: {{ .Values.image.repository }}:{{ .Values.image.tag }}

Different environments use different values:
  # values-prod.yaml
  replicaCount: 5
  image:
    tag: "v2.1.0"

  # values-dev.yaml
  replicaCount: 1
  image:
    tag: "latest"

[deep-dive: Go templating syntax]
Helm uses Go's text/template engine. Double curly braces {{ }} denote template expressions. .Values refers to values.yaml, .Release has release metadata (name, namespace), and .Chart has chart metadata. You can use conditionals (if/else), loops (range), and helper functions (include, toYaml). This is powerful but can make templates hard to read — which is why tools like Kustomize take a different, overlay-based approach.
[/deep-dive]`,
      quiz: [
        {
          question: "What is the purpose of values.yaml in a Helm Chart?",
          options: [
            "It lists the Kubernetes cluster nodes",
            "It defines default configuration that templates use to generate manifests",
            "It stores container logs",
            "It replaces the Dockerfile",
          ],
          correctIndex: 1,
          explanation:
            "values.yaml holds default configuration (replicas, image tags, etc.) that Helm injects into templates. Override it per environment with -f values-prod.yaml.",
        },
      ],
    },
    {
      id: "8-3",
      title: "Helm Releases",
      diagram: "helm-release",
      content: `When you install a Chart, you create a Release:

  helm install my-app ./mychart -f values-prod.yaml

A Release is a running instance of a Chart with specific values.

You can have multiple releases of the same chart:
  helm install frontend ./webchart
  helm install backend ./apichart

Releases can be:
  - Upgraded: helm upgrade my-app ./mychart
  - Rolled back: helm rollback my-app 1
  - Uninstalled: helm uninstall my-app

Helm tracks release history, making rollbacks easy.

In the challenge, you'll package a K8s setup as a Helm chart!`,
    },
  ],
  challenges: [
    {
      id: "challenge-8-1",
      title: "Create a Helm Release",
      description:
        "Define a Helm Chart, then create a Helm Release that deploys it. Connect the release to a Deployment and Service to show what the chart installs.",
      availableComponents: [
        "helmchart",
        "helmrelease",
        "deployment",
        "service",
      ],
      testCases: [
        {
          id: "test-8-1",
          name: "Chart is defined",
          description: "A Helm Chart with name and version",
          entryPoint: "helmchart",
          expectedPath: ["helmchart"],
          validations: [
            {
              nodeType: "helmchart",
              field: "version",
              operator: "exists",
              value: true,
              message: "Chart needs a version (e.g., '1.0.0').",
            },
          ],
          successMessage: "Helm Chart is defined!",
        },
        {
          id: "test-8-2",
          name: "Release is installed",
          description: "A Release instantiates the chart",
          entryPoint: "helmchart",
          expectedPath: ["helmchart", "helmrelease"],
          validations: [
            {
              nodeType: "helmrelease",
              field: "chart",
              operator: "exists",
              value: true,
              message: "Release must reference the chart name.",
            },
          ],
          successMessage: "Helm Release is installed from the Chart!",
        },
        {
          id: "test-8-3",
          name: "Release deploys resources",
          description: "The release creates K8s resources",
          entryPoint: "helmrelease",
          expectedPath: ["helmrelease", "deployment"],
          validations: [],
          successMessage: "Helm Release is managing K8s resources!",
        },
        {
          id: "test-8-4",
          name: "Service exposes the Deployment",
          description: "A Service is created alongside the Deployment",
          entryPoint: "deployment",
          expectedPath: ["deployment", "service"],
          validations: [
            {
              nodeType: "service",
              field: "port",
              operator: "gt",
              value: 0,
              message: "Service needs a port number.",
            },
          ],
          successMessage: "Service is exposing the Deployment!",
        },
      ],
      hints: [
        "Start with a Helm Chart node -- give it a name and version.",
        "Add a Helm Release. Set its chart field to match your Chart's name. Connect Chart → Release.",
        "Add a Deployment (the resource the chart creates). Connect Release → Deployment.",
        "Add a Service with a port to expose the Deployment. Connect Deployment → Service.",
      ],
      maxStars: 3,
    },
  ],
};
