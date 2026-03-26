import type { Stage } from "@/types/stages";

export const stage5K8sCore: Stage = {
  id: "stage-5",
  number: 5,
  title: "Kubernetes Core",
  description: "Learn the fundamental building blocks of Kubernetes: Pods, Deployments, and Services.",
  icon: "Hexagon",
  unlockedBy: "stage-4",
  lessons: [
    {
      id: "5-1",
      title: "Enter Kubernetes",
      diagram: "k8s-intro",
      content: `Kubernetes (K8s) is the industry standard for container orchestration. It automates deploying, scaling, and managing containerized applications.

K8s organizes everything into "resources" described by YAML manifests. Instead of running commands, you declare the desired state and K8s makes it happen.

"I want 3 replicas of my web server running on port 80"
  → K8s creates 3 pods, keeps them running, restarts failures

Key K8s concepts we'll cover:
  - Pod: the smallest deployable unit (wraps one or more containers)
  - Deployment: manages replicas of Pods
  - Service: provides stable network access to Pods`,
    },
    {
      id: "5-2",
      title: "Pods",
      diagram: "pod-diagram",
      content: `A Pod is the smallest unit you can deploy in Kubernetes. It wraps one or more containers that share:
  - The same network (they can talk via localhost)
  - The same storage volumes
  - The same lifecycle (start together, stop together)

Usually a Pod runs a single container, but sometimes you add "sidecar" containers (e.g., a logging agent alongside your app).

Pods are identified by labels -- key-value pairs:
  labels:
    app: web
    environment: production

Labels are how other K8s resources find and connect to pods.`,
    },
    {
      id: "5-3",
      title: "Deployments",
      diagram: "deployment-diagram",
      content: `You rarely create Pods directly. Instead, you create a Deployment.

A Deployment manages Pods for you:
  - Creates the desired number of replicas
  - Replaces Pods that crash
  - Handles rolling updates (deploy new version without downtime)
  - Allows rollbacks if something goes wrong

A Deployment uses a "selector" to know which Pods it manages:
  selector:
    matchLabels:
      app: web

This means "manage all Pods with label app=web".`,
    },
    {
      id: "5-4",
      title: "Services",
      diagram: "service-diagram",
      content: `Pods get random IP addresses that change when pods restart. So how do other things find your pods?

A Service provides a stable address. It uses selectors to find pods:
  selector:
    app: web

Service types:
  - ClusterIP: accessible only inside the cluster (default)
  - NodePort: accessible from outside via a port on each node
  - LoadBalancer: provisions an external load balancer

The Service acts like a permanent phone number that always reaches the right pods, even as pods come and go.

Now build a K8s architecture!`,
    },
  ],
  challenges: [
    {
      id: "challenge-5-1",
      title: "Deploy an App on Kubernetes",
      description:
        "Create a Deployment (with replicas and an image), connect it to a Service (ClusterIP), and make the service accessible. Configure matching selectors so the Service finds the Deployment's Pods.",
      availableComponents: ["deployment", "service", "pod"],
      testCases: [
        {
          id: "test-5-1",
          name: "Deployment is configured",
          description: "A Deployment with replicas and image",
          entryPoint: "deployment",
          expectedPath: ["deployment"],
          validations: [
            {
              nodeType: "deployment",
              field: "name",
              operator: "exists",
              value: true,
              message: "Deployment needs a name.",
            },
            {
              nodeType: "deployment",
              field: "replicas",
              operator: "gt",
              value: 0,
              message: "Deployment needs at least 1 replica.",
            },
            {
              nodeType: "deployment",
              field: "image",
              operator: "exists",
              value: true,
              message: "Deployment needs a container image (e.g., 'nginx:latest').",
            },
            {
              nodeType: "deployment",
              field: "selector",
              operator: "exists",
              value: true,
              message: "Deployment needs a selector (e.g., 'app=web').",
            },
          ],
          successMessage: "Deployment is properly configured!",
        },
        {
          id: "test-5-2",
          name: "Service routes to Deployment",
          description: "Service connected with matching selector",
          entryPoint: "deployment",
          expectedPath: ["deployment", "service"],
          validations: [
            {
              nodeType: "service",
              field: "name",
              operator: "exists",
              value: true,
              message: "Service needs a name.",
            },
            {
              nodeType: "service",
              field: "selector",
              operator: "exists",
              value: true,
              message: "Service needs a selector that matches the Deployment (e.g., 'app=web').",
            },
            {
              nodeType: "service",
              field: "port",
              operator: "gt",
              value: 0,
              message: "Service needs a port number.",
            },
          ],
          successMessage: "Service is routing traffic to the Deployment!",
        },
        {
          id: "test-5-3",
          name: "Deployment manages Pods",
          description: "A Pod is managed by the Deployment",
          entryPoint: "deployment",
          expectedPath: ["deployment", "pod"],
          validations: [
            {
              nodeType: "pod",
              field: "name",
              operator: "exists",
              value: true,
              message: "Pod needs a name (e.g., 'web-pod').",
            },
            {
              nodeType: "pod",
              field: "labels",
              operator: "exists",
              value: true,
              message: "Pod needs labels matching the Deployment selector (e.g., 'app=web').",
            },
          ],
          successMessage: "Deployment is managing Pods!",
        },
      ],
      hints: [
        "Create a Deployment: set name, replicas (e.g., 2), image (e.g., 'nginx:latest'), and selector (e.g., 'app=web').",
        "Create a Service: set the same selector as the Deployment so it can find the pods. Set port to 80. Connect Deployment → Service.",
        "Add a Pod with a name and labels matching your selector (e.g., 'app=web'). Connect Deployment → Pod to show it manages the pod.",
      ],
      maxStars: 3,
    },
  ],
};
