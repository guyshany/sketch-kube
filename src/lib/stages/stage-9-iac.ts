import type { Stage } from "@/types/stages";

export const stage9IaC: Stage = {
  id: "stage-9",
  number: 9,
  title: "Infrastructure as Code",
  description: "Learn how Pulumi and IaC tools let you define and manage infrastructure using real programming languages.",
  icon: "Blocks",
  unlockedBy: "stage-8",
  lessons: [
    {
      id: "9-1",
      title: "What is Infrastructure as Code?",
      content: `So far, we've defined infrastructure using YAML and CLI commands. Infrastructure as Code (IaC) takes this further:

Instead of manually creating resources, you write code that describes your infrastructure. The IaC tool then creates, updates, or destroys resources to match your code.

Benefits:
  - Version controlled (git tracks all changes)
  - Reproducible (same code = same infrastructure)
  - Reviewable (PRs for infrastructure changes)
  - Testable (unit tests for infrastructure)
  - Automated (CI/CD for infrastructure)

Popular IaC tools:
  - Terraform (HCL language)
  - Pulumi (real programming languages)
  - AWS CDK (TypeScript/Python)
  - Crossplane (K8s-native)`,
    },
    {
      id: "9-2",
      title: "Pulumi: Code, Not Config",
      content: `Pulumi stands out because you use real programming languages (TypeScript, Python, Go) instead of custom DSLs.

This means you can:
  - Use loops, conditionals, functions
  - Import libraries
  - Write unit tests
  - Use your IDE's autocomplete and type checking

Example (TypeScript):
  import * as k8s from "@pulumi/kubernetes";

  const deployment = new k8s.apps.v1.Deployment("web", {
    spec: {
      replicas: 3,
      selector: { matchLabels: { app: "web" } },
      template: {
        metadata: { labels: { app: "web" } },
        spec: {
          containers: [{
            name: "web",
            image: "nginx:latest",
            ports: [{ containerPort: 80 }],
          }],
        },
      },
    },
  });`,
    },
    {
      id: "9-3",
      title: "Stacks & Providers",
      content: `Pulumi organizes infrastructure into:

Stacks: isolated instances of your infrastructure
  - dev, staging, production
  - Each stack has its own state and configuration
  - Same code, different parameters

Providers: plugins that talk to cloud APIs
  - aws: manages AWS resources
  - gcp: manages Google Cloud resources
  - azure: manages Azure resources
  - kubernetes: manages K8s resources

A typical Pulumi project:
  Stack "production"
    → Provider "kubernetes"
      → Deployment, Service, Ingress...
    → Provider "aws"
      → RDS Database, S3 Bucket...

You've completed the journey from shell commands to full infrastructure as code!`,
    },
  ],
  challenges: [
    {
      id: "challenge-9-1",
      title: "Define Infrastructure with Pulumi",
      description:
        "Create a Pulumi Stack, connect it to a Provider (kubernetes), and show the provider managing a Deployment and Service.",
      availableComponents: ["pulumistack", "pulumiprovider", "deployment", "service"],
      testCases: [
        {
          id: "test-9-1",
          name: "Pulumi Stack is configured",
          description: "A stack with name and runtime",
          entryPoint: "pulumistack",
          expectedPath: ["pulumistack"],
          validations: [
            {
              nodeType: "pulumistack",
              field: "name",
              operator: "exists",
              value: true,
              message: "Stack needs a name (e.g., 'production').",
            },
            {
              nodeType: "pulumistack",
              field: "runtime",
              operator: "exists",
              value: true,
              message: "Stack needs a runtime (e.g., 'typescript').",
            },
          ],
          successMessage: "Pulumi Stack is set up!",
        },
        {
          id: "test-9-2",
          name: "Provider is connected",
          description: "Stack connects to a provider",
          entryPoint: "pulumistack",
          expectedPath: ["pulumistack", "pulumiprovider"],
          validations: [
            {
              nodeType: "pulumiprovider",
              field: "provider",
              operator: "exists",
              value: true,
              message: "Provider must specify a cloud provider (e.g., 'kubernetes').",
            },
          ],
          successMessage: "Provider is connected to the Stack!",
        },
        {
          id: "test-9-3",
          name: "Provider manages resources",
          description: "Resources are managed by the provider",
          entryPoint: "pulumiprovider",
          expectedPath: ["pulumiprovider", "deployment"],
          validations: [
            {
              nodeType: "deployment",
              field: "name",
              operator: "exists",
              value: true,
              message: "Deployment needs a name.",
            },
          ],
          successMessage: "Infrastructure is fully managed by Pulumi!",
        },
      ],
      hints: [
        "Create a Pulumi Stack node with a name (e.g., 'production') and runtime ('typescript').",
        "Add a Pulumi Provider with provider set to 'kubernetes'. Connect Stack → Provider.",
        "Add a Deployment managed by the provider. Connect Provider → Deployment.",
      ],
      maxStars: 3,
    },
  ],
};
