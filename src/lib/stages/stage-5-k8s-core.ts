import type { Stage } from "@/types/stages";

export const stage5K8sCore: Stage = {
  id: "stage-5",
  number: 5,
  title: "Kubernetes Core",
  description:
    "Learn the fundamental building blocks of Kubernetes: Pods, Deployments, and Services.",
  icon: "Hexagon",
  unlockedBy: "stage-4",
  narrative: {
    character: { name: "Maya Chen", role: "CTO", avatar: "MC", color: "indigo" },
    intro: "Manual orchestration won't scale for what's coming — I'm pulling you into the Kubernetes migration directly. The team voted, and K8s is our platform going forward. Your first job: deploy our web app on the cluster. Pods, Deployments, Services — these are the building blocks. Get them right and everything else falls into place.",
    context: "Deploy the web app on Kubernetes with Pods, Deployments, and Services.",
    debrief: "The app is running on K8s — milestone moment for NovaCraft. I'm connecting you with Jordan from the SRE team next.",
  },
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
      quiz: [
        {
          question:
            "How does Kubernetes differ from running Docker commands manually?",
          options: [
            "Kubernetes uses a different container format",
            "You declare the desired state and K8s maintains it automatically",
            "Kubernetes doesn't use containers at all",
            "Kubernetes only works on Linux",
          ],
          correctIndex: 1,
          explanation:
            "Kubernetes is declarative: you describe what you want (e.g., 3 replicas), and K8s continuously ensures reality matches your declaration — restarting crashed pods, scaling, etc.",
        },
      ],
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

Labels are how other K8s resources find and connect to pods.

[deep-dive: Pod networking under the hood]
Every Pod gets its own IP address within the cluster. Containers inside the same Pod share a network namespace — they can talk to each other via localhost. But Pods on different nodes communicate through a cluster-wide virtual network (CNI plugin). This flat network means any Pod can reach any other Pod by IP, regardless of which node it runs on.
[/deep-dive]`,
      quiz: [
        {
          question: "What do labels on a Pod do?",
          options: [
            "They set environment variables",
            "They control which node the Pod runs on",
            "They let other resources (like Services) find and connect to the Pod",
            "They limit the Pod's memory usage",
          ],
          correctIndex: 2,
          explanation:
            "Labels are key-value pairs that act as identifiers. Services and Deployments use label selectors to find the right Pods.",
        },
      ],
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
      quiz: [
        {
          question:
            "Why do you create a Deployment instead of individual Pods?",
          options: [
            "Pods can't run containers",
            "Deployments manage replicas, handle crashes, and enable rolling updates",
            "Deployments are faster than Pods",
            "Pods don't support labels",
          ],
          correctIndex: 1,
          explanation:
            "A Deployment ensures the right number of Pods are always running, replaces crashed ones, and handles zero-downtime updates — things raw Pods can't do on their own.",
        },
      ],
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
              message:
                "Deployment needs a container image (e.g., 'nginx:latest').",
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
              field: "selector",
              operator: "exists",
              value: true,
              message:
                "Service needs a selector that matches the Deployment (e.g., 'app=web').",
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
              field: "labels",
              operator: "exists",
              value: true,
              message:
                "Pod needs labels matching the Deployment selector (e.g., 'app=web').",
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
    {
      id: "challenge-5-2",
      title: "kubectl Basics",
      type: "terminal",
      description:
        "Use kubectl to explore a Kubernetes cluster. List resources, inspect pods, and view logs -- the essential skills for any K8s operator.",
      terminalFiles: {
        "deployment.yaml":
          "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-deployment\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n      - name: web\n        image: nginx:latest\n        ports:\n        - containerPort: 80",
        "service.yaml":
          "apiVersion: v1\nkind: Service\nmetadata:\n  name: web-service\nspec:\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 80\n  type: ClusterIP",
      },
      terminalTasks: [
        {
          id: "t5-1",
          instruction: "List all running pods with `kubectl get pods`",
          validation: {
            type: "command_match",
            pattern: "kubectl\\s+get\\s+pods?",
          },
          successMessage:
            "kubectl get pods shows all pods with their status, restarts, and age!",
        },
        {
          id: "t5-2",
          instruction: "List all services with `kubectl get services`",
          validation: {
            type: "command_match",
            pattern: "kubectl\\s+get\\s+(services?|svc)",
          },
          successMessage:
            "Services provide stable network endpoints for your pods!",
        },
        {
          id: "t5-3",
          instruction:
            "Inspect a pod in detail: `kubectl describe pod web-deployment-7d4f8b6c9-x2k4l`",
          validation: { type: "command_match", pattern: "kubectl\\s+describe" },
          successMessage:
            "kubectl describe shows detailed info: events, containers, volumes, and more!",
        },
        {
          id: "t5-4",
          instruction: "View the deployment YAML file: `cat deployment.yaml`",
          validation: { type: "output_contains", pattern: "apiVersion" },
          successMessage:
            "Kubernetes resources are defined as YAML manifests. This Deployment creates 2 replicas of nginx!",
        },
      ],
      hints: [
        "kubectl commands follow the pattern: kubectl <action> <resource>",
        "Common actions: get (list), describe (details), apply (create/update), delete, logs",
        "You can use short names: pods/po, services/svc, deployments/deploy",
        "The YAML manifest defines the desired state that Kubernetes maintains.",
      ],
      maxStars: 3,
    },
  ],
};
