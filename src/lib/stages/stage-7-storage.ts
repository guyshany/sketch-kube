import type { Stage } from "@/types/stages";

export const stage7Storage: Stage = {
  id: "stage-7",
  number: 7,
  title: "K8s Storage & Config",
  description: "Learn how Kubernetes manages configuration with ConfigMaps and Secrets, and persistent data with Volumes.",
  icon: "Database",
  unlockedBy: "stage-6",
  lessons: [
    {
      id: "7-1",
      title: "ConfigMaps",
      diagram: "configmap-diagram",
      content: `Applications need configuration: database URLs, feature flags, API keys.

Hardcoding config inside container images is bad practice. ConfigMaps let you separate config from code.

A ConfigMap stores key-value pairs:
  apiVersion: v1
  kind: ConfigMap
  data:
    DB_HOST: "postgres.default.svc"
    LOG_LEVEL: "info"

Pods can consume ConfigMaps as:
  - Environment variables
  - Files mounted into the container
  - Command-line arguments

When you update a ConfigMap, pods can pick up the new values without rebuilding the image.`,
    },
    {
      id: "7-2",
      title: "Secrets",
      diagram: "secret-diagram",
      content: `Secrets are like ConfigMaps, but for sensitive data:
  - Passwords
  - API tokens
  - TLS certificates

Secrets are base64-encoded (not encrypted by default!). For real security, use:
  - Encrypted etcd storage
  - External secret managers (Vault, AWS Secrets Manager)

Usage is similar to ConfigMaps:
  apiVersion: v1
  kind: Secret
  type: Opaque
  data:
    DB_PASSWORD: cGFzc3dvcmQ=   (base64 of "password")

Never commit Secrets to git!`,
    },
    {
      id: "7-3",
      title: "Persistent Volumes",
      diagram: "pv-diagram",
      content: `Kubernetes Pods are ephemeral. When a Pod restarts, local data is lost.

For databases and stateful apps, you need Persistent Volumes (PV):

PersistentVolume (PV): a piece of storage provisioned by an admin
  - Has a capacity (e.g., 10Gi)
  - Has an access mode (ReadWriteOnce, ReadOnlyMany, ReadWriteMany)

PersistentVolumeClaim (PVC): a request for storage by a Pod
  - Specifies how much storage it needs
  - K8s binds it to a matching PV

PV → PVC → Pod

This decouples storage from pods. The PV exists independently of any pod.

Let's configure storage and config for a database!`,
    },
  ],
  challenges: [
    {
      id: "challenge-7-1",
      title: "Configure a Stateful Database",
      description:
        "Set up a Deployment for a database, attach a ConfigMap for configuration (like DB_HOST), a Secret for sensitive data (like DB_PASSWORD), and a PersistentVolumeClaim for data storage.",
      availableComponents: ["deployment", "configmap", "secret", "pvc", "pv", "service"],
      testCases: [
        {
          id: "test-7-1",
          name: "Database deployment exists",
          description: "A Deployment for the database",
          entryPoint: "deployment",
          expectedPath: ["deployment"],
          validations: [
            {
              nodeType: "deployment",
              field: "name",
              operator: "exists",
              value: true,
              message: "Deployment needs a name (e.g., 'postgres').",
            },
            {
              nodeType: "deployment",
              field: "image",
              operator: "exists",
              value: true,
              message: "Deployment needs a database image (e.g., 'postgres:15').",
            },
          ],
          successMessage: "Database Deployment is configured!",
        },
        {
          id: "test-7-2",
          name: "ConfigMap provides configuration",
          description: "ConfigMap connected to the Deployment",
          entryPoint: "deployment",
          expectedPath: ["deployment", "configmap"],
          validations: [
            {
              nodeType: "configmap",
              field: "name",
              operator: "exists",
              value: true,
              message: "ConfigMap needs a name.",
            },
            {
              nodeType: "configmap",
              field: "data",
              operator: "exists",
              value: true,
              message: "ConfigMap needs data (e.g., 'DB_HOST=localhost').",
            },
          ],
          successMessage: "Configuration data is attached!",
        },
        {
          id: "test-7-3",
          name: "Secret protects sensitive data",
          description: "Secret connected for credentials",
          entryPoint: "deployment",
          expectedPath: ["deployment", "secret"],
          validations: [
            {
              nodeType: "secret",
              field: "name",
              operator: "exists",
              value: true,
              message: "Secret needs a name.",
            },
            {
              nodeType: "secret",
              field: "data",
              operator: "exists",
              value: true,
              message: "Secret needs data (e.g., 'DB_PASSWORD=mysecret').",
            },
          ],
          successMessage: "Sensitive data is stored securely in a Secret!",
        },
        {
          id: "test-7-4",
          name: "Persistent storage is attached",
          description: "PVC connected for data persistence",
          entryPoint: "deployment",
          expectedPath: ["deployment", "pvc"],
          validations: [
            {
              nodeType: "pvc",
              field: "request",
              operator: "exists",
              value: true,
              message: "PVC needs a storage request (e.g., '10Gi').",
            },
          ],
          successMessage: "Persistent storage is provisioned!",
        },
        {
          id: "test-7-5",
          name: "PV backs the PVC",
          description: "A PersistentVolume is bound to the PVC",
          entryPoint: "pv",
          expectedPath: ["pv", "pvc"],
          validations: [
            {
              nodeType: "pv",
              field: "capacity",
              operator: "exists",
              value: true,
              message: "PV needs a capacity (e.g., '10Gi').",
            },
            {
              nodeType: "pv",
              field: "accessMode",
              operator: "exists",
              value: true,
              message: "PV needs an access mode (e.g., 'ReadWriteOnce').",
            },
          ],
          successMessage: "PersistentVolume is bound to the PVC!",
        },
      ],
      hints: [
        "Create a Deployment for postgres with image 'postgres:15'.",
        "Add a ConfigMap with DB_HOST setting, and a Secret with DB_PASSWORD. Connect both to the Deployment.",
        "Add a PVC requesting storage (e.g., '10Gi') and connect it to the Deployment.",
        "Add a PV with matching capacity and access mode, then connect PV → PVC to bind them.",
      ],
      maxStars: 3,
    },
  ],
};
