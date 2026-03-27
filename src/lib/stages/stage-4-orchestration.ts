import type { Stage } from "@/types/stages";

export const stage4Orchestration: Stage = {
  id: "stage-4",
  number: 4,
  title: "Container Orchestration",
  description:
    "Understand why we need container orchestration -- scaling, load balancing, and health monitoring.",
  icon: "Network",
  unlockedBy: "stage-3",
  narrative: {
    character: { name: "Alex Rivera", role: "DevOps Lead", avatar: "AR", color: "cyan" },
    intro: "A single container per service won't cut it when traffic spikes — and the marketing team just announced a big launch event. Traffic is going to spike 10x. We need multiple copies, automatic restarts when things crash, and smart traffic distribution. Manual management is over. Time to learn what orchestration really means.",
    context: "Prepare for the launch by understanding scaling and resilience.",
    debrief: "You've got the orchestration concepts down. Maya's impressed — she wants you on the K8s migration team.",
  },
  lessons: [
    {
      id: "4-1",
      title: "Why Orchestration?",
      diagram: "why-orchestration",
      content: `Running a single container is easy. But in production you need:

  - Multiple copies for reliability (if one crashes, others keep serving)
  - Scaling up/down based on traffic
  - Health checks to detect and replace failed containers
  - Load balancing to distribute traffic evenly
  - Rolling updates to deploy without downtime

Managing all this manually with "docker run" commands is painful. Container orchestration tools automate this.

Kubernetes is the most popular orchestrator, but the concepts apply everywhere.`,
    },
    {
      id: "4-2",
      title: "Scaling & Load Balancing",
      diagram: "load-balancer",
      content: `Scaling means running multiple identical copies of your container (replicas).

Instead of one container handling all traffic:
  [User] → [Container]

You have multiple behind a load balancer:
  [User] → [Load Balancer] → [Container 1]
                            → [Container 2]
                            → [Container 3]

The load balancer distributes incoming requests across replicas using algorithms:
  - Round Robin: each request goes to the next container
  - Least Connections: send to the container with fewest active requests
  - IP Hash: same client always goes to the same container`,
    },
    {
      id: "4-3",
      title: "Health Checks",
      diagram: "health-check",
      content: `How do you know if a container is working properly? Health checks!

A health check periodically pings your container:
  GET /health → 200 OK (healthy)
  GET /health → 500 Error (unhealthy)

If a container fails health checks:
  1. The orchestrator stops sending it traffic
  2. It tries to restart the container
  3. If restart fails, it creates a new one

This is called "self-healing" -- the system automatically recovers from failures.

In the challenge, you'll build a scaled setup with a load balancer and health checks.`,
    },
  ],
  challenges: [
    {
      id: "challenge-4-1",
      title: "Orchestrate Multiple Containers",
      description:
        "Set up a Load Balancer that distributes traffic to a Container, and add a Health Check to monitor the container's health.",
      availableComponents: ["container", "loadbalancer", "healthcheck", "port"],
      testCases: [
        {
          id: "test-4-1",
          name: "Load balancer exists",
          description: "A load balancer to distribute traffic",
          entryPoint: "loadbalancer",
          expectedPath: ["loadbalancer"],
          validations: [
            {
              nodeType: "loadbalancer",
              field: "algorithm",
              operator: "exists",
              value: true,
              message: "Load balancer needs a balancing algorithm.",
            },
          ],
          successMessage: "Load balancer is configured!",
        },
        {
          id: "test-4-2",
          name: "Container behind load balancer",
          description: "Load balancer connects to a container",
          entryPoint: "loadbalancer",
          expectedPath: ["loadbalancer", "container"],
          validations: [
            {
              nodeType: "container",
              field: "image",
              operator: "exists",
              value: true,
              message:
                "Container must reference an image (e.g., 'nginx:latest').",
            },
          ],
          successMessage: "Traffic flows from load balancer to container!",
        },
        {
          id: "test-4-3",
          name: "Health check monitors container",
          description: "A health check is attached",
          entryPoint: "container",
          expectedPath: ["container", "healthcheck"],
          validations: [
            {
              nodeType: "healthcheck",
              field: "path",
              operator: "exists",
              value: true,
              message: "Health check needs an endpoint path (e.g., '/health').",
            },
          ],
          successMessage: "Health checks are monitoring the container!",
        },
      ],
      hints: [
        "Add a Load Balancer and choose an algorithm like 'round-robin'.",
        "Add a Container with an image (e.g., 'nginx:latest'), then connect Load Balancer → Container.",
        "Add a Health Check with a path like '/health', then connect Container → Health Check.",
      ],
      maxStars: 3,
    },
  ],
};
