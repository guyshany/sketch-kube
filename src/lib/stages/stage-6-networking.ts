import type { Stage } from "@/types/stages";

export const stage6Networking: Stage = {
  id: "stage-6",
  number: 6,
  title: "K8s Networking",
  description: "Master Kubernetes networking: expose services externally with NodePort, LoadBalancer, and Ingress.",
  icon: "Globe",
  unlockedBy: "stage-5",
  lessons: [
    {
      id: "6-1",
      title: "Service Types Deep Dive",
      content: `In the previous stage, you created a ClusterIP service. Let's explore all service types:

ClusterIP (default):
  - Only accessible from inside the cluster
  - Gets an internal IP address
  - Use for internal communication between services

NodePort:
  - Exposes the service on a port on every node (30000-32767)
  - Accessible from outside: <NodeIP>:<NodePort>
  - Simple but not production-ready

LoadBalancer:
  - Provisions an external load balancer (cloud providers)
  - Gets a public IP address
  - Production-ready for exposing services`,
    },
    {
      id: "6-2",
      title: "Ingress: HTTP Routing",
      content: `For HTTP/HTTPS traffic, Ingress is the best option. It provides:

  - Host-based routing: api.example.com → API service
                         web.example.com → Web service
  - Path-based routing: example.com/api → API service
                         example.com/ → Web service
  - TLS/SSL termination
  - One external IP for many services

An Ingress needs an Ingress Controller running in the cluster (e.g., nginx-ingress, traefik).

The Ingress resource just defines rules:
  - Host: example.com
  - Path: /api
  - Backend: api-service:8080`,
    },
    {
      id: "6-3",
      title: "Putting It Together",
      content: `A typical production setup looks like:

  [Internet]
      ↓
  [Ingress] → routes by path/host
      ↓
  [Service (ClusterIP)] → stable internal endpoint
      ↓
  [Deployment/Pods] → your actual containers

The Ingress handles external traffic.
The Service provides internal load balancing.
The Deployment manages your container replicas.

Let's build this!`,
    },
  ],
  challenges: [
    {
      id: "challenge-6-1",
      title: "Expose an App via Ingress",
      description:
        "Build a full networking stack: Create a Deployment, expose it via a Service, and add an Ingress to route external HTTP traffic. Configure the Ingress with a host and path that point to your Service.",
      availableComponents: ["deployment", "service", "ingress", "port"],
      testCases: [
        {
          id: "test-6-1",
          name: "Deployment exists",
          description: "A Deployment is running",
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
              field: "image",
              operator: "exists",
              value: true,
              message: "Deployment needs an image.",
            },
          ],
          successMessage: "Deployment is ready!",
        },
        {
          id: "test-6-2",
          name: "Service connected",
          description: "Service exposes the Deployment",
          entryPoint: "deployment",
          expectedPath: ["deployment", "service"],
          validations: [
            {
              nodeType: "service",
              field: "selector",
              operator: "exists",
              value: true,
              message: "Service needs a selector matching the Deployment.",
            },
          ],
          successMessage: "Service is exposing the Deployment!",
        },
        {
          id: "test-6-3",
          name: "Ingress routes traffic",
          description: "Ingress routes to the Service",
          entryPoint: "service",
          expectedPath: ["service", "ingress"],
          validations: [
            {
              nodeType: "ingress",
              field: "host",
              operator: "exists",
              value: true,
              message: "Ingress needs a host (e.g., 'example.com').",
            },
            {
              nodeType: "ingress",
              field: "serviceName",
              operator: "exists",
              value: true,
              message: "Ingress must reference the Service name.",
            },
          ],
          successMessage: "External traffic is routed through Ingress!",
        },
      ],
      hints: [
        "Create a Deployment with a name, image, and selector.",
        "Add a Service with a matching selector, and connect Deployment → Service.",
        "Add an Ingress with a host (like 'myapp.example.com'), path ('/'), and the service name. Connect Service → Ingress.",
      ],
      maxStars: 3,
    },
  ],
};
