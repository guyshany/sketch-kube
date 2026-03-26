import type { Stage } from "@/types/stages";

export const stage10ArgoCD: Stage = {
  id: "stage-10",
  number: 10,
  title: "Argo CD & GitOps",
  description:
    "Deploy Argo CD on Kubernetes using Namespaces, ServiceAccounts, and RBAC — tying together everything you've learned.",
  icon: "GitBranch",
  unlockedBy: "stage-9",
  narrative: {
    intro: "NovaCraft's infrastructure is defined as code, but deployments are still triggered manually. The CTO's final ask: adopt GitOps with Argo CD so that pushing to Git automatically deploys to the cluster. This is the capstone — tying together everything you've learned.",
    context: "Set up Argo CD for automated, Git-driven deployments to Kubernetes.",
  },
  lessons: [
    {
      id: "10-1",
      title: "What is GitOps and Argo CD?",
      diagram: "argocd-intro",
      content: `GitOps is an operational model where Git is the single source of truth for infrastructure and application definitions. Instead of running kubectl apply manually, you push to Git and a controller makes the cluster match.

Argo CD is the most popular GitOps tool for Kubernetes. Its architecture:
  - API Server: serves the UI and API, handles auth
  - Application Controller: watches Git repos and compares desired state vs live state
  - Repo Server: clones repos, renders manifests (Helm, Kustomize, plain YAML)
  - Redis: caches repo/cluster state for performance

Workflow:
  1. Developer pushes a change to a Git repo
  2. Argo CD detects the change
  3. It renders the manifests and compares with the live cluster
  4. If out-of-sync, it syncs (applies) the new state
  5. The cluster converges to the desired state

This is "pull-based" deployment: the cluster pulls its own state from Git rather than CI pushing to the cluster.

[deep-dive: Push vs Pull deployment models]
In push-based CI/CD, the pipeline has cluster credentials and runs kubectl apply. This means your CI system is a security-sensitive component with cluster access. In pull-based GitOps, the controller runs inside the cluster and only needs read access to Git. If your CI system is compromised, attackers can't directly modify the cluster. The cluster is also self-healing: if someone manually changes a resource, Argo CD detects the drift and reverts it.
[/deep-dive]`,
      quiz: [
        {
          question: "What makes GitOps 'pull-based' instead of 'push-based'?",
          options: [
            "Developers push Docker images directly to the cluster",
            "The CI pipeline runs kubectl apply",
            "A controller in the cluster watches Git and syncs changes itself",
            "Git automatically deploys code when you commit",
          ],
          correctIndex: 2,
          explanation: "In GitOps, the cluster runs a controller (like Argo CD) that continuously watches a Git repo and pulls changes, rather than having CI push deployments to the cluster.",
        },
      ],
    },
    {
      id: "10-2",
      title: "Namespaces & ServiceAccounts",
      diagram: "ns-sa-diagram",
      content: `Argo CD runs in its own Namespace (typically "argocd"). Namespaces provide:
  - Resource isolation between teams or applications
  - Scope for RBAC policies
  - Resource quotas and limits

Every pod in Kubernetes runs as a ServiceAccount. A ServiceAccount:
  - Provides an identity for processes running in a pod
  - Automatically mounts an API token into the pod
  - Is scoped to a namespace

Argo CD creates several ServiceAccounts:
  - argocd-server: for the API server
  - argocd-application-controller: for the controller that syncs resources
  - argocd-repo-server: for the component that clones Git repos

Without a ServiceAccount, the pods would run as "default" and have no specific permissions. By creating dedicated ServiceAccounts, each Argo CD component gets exactly the access it needs.`,
      quiz: [
        {
          question: "Why does Argo CD use dedicated ServiceAccounts instead of the default one?",
          options: [
            "The default ServiceAccount is disabled in Kubernetes",
            "Each component gets only the specific permissions it needs (least privilege)",
            "ServiceAccounts are required for networking",
            "It's just a naming convention",
          ],
          correctIndex: 1,
          explanation: "Dedicated ServiceAccounts follow the principle of least privilege — the API server, controller, and repo server each get only the permissions they need, improving security.",
        },
      ],
    },
    {
      id: "10-3",
      title: "RBAC — Roles & RoleBindings",
      diagram: "rbac-diagram",
      content: `Argo CD components need permissions to manage cluster resources. Kubernetes controls this with RBAC (Role-Based Access Control).

Role: defines what actions are allowed on which resources within a namespace
  rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "create", "update", "delete"]

ClusterRole: same as Role but applies cluster-wide (across all namespaces)

RoleBinding: grants a Role to a subject (ServiceAccount, user, or group)
  roleRef: argocd-role
  subjects:
  - kind: ServiceAccount
    name: argocd-server

ClusterRoleBinding: grants a ClusterRole cluster-wide

For Argo CD:
  - The application-controller needs broad permissions (it creates/deletes resources in many namespaces)
  - The API server needs permissions to read resources and manage Argo CD CRDs
  - The repo server needs minimal permissions (it only clones Git repos)

Now build the full Argo CD architecture!`,
    },
  ],
  challenges: [
    {
      id: "challenge-10-1",
      title: "Deploy Argo CD Components",
      description:
        "Build a simplified Argo CD deployment: create a Namespace, set up a ServiceAccount with RBAC permissions, deploy the argocd-server with its configuration, and expose it via a Service and Ingress.",
      availableComponents: [
        "namespace",
        "deployment",
        "service",
        "configmap",
        "secret",
        "ingress",
        "serviceaccount",
        "role",
        "rolebinding",
      ],
      testCases: [
        {
          id: "test-10-1",
          name: "Namespace exists",
          description: "An argocd namespace is created",
          entryPoint: "namespace",
          expectedPath: ["namespace"],
          validations: [
            {
              nodeType: "namespace",
              field: "name",
              operator: "exists",
              value: true,
              message: "Namespace needs a name (e.g., 'argocd').",
            },
          ],
          successMessage: "Argo CD namespace is ready!",
        },
        {
          id: "test-10-2",
          name: "ServiceAccount in the namespace",
          description: "A ServiceAccount is scoped to the namespace",
          entryPoint: "namespace",
          expectedPath: ["namespace", "serviceaccount"],
          validations: [
            {
              nodeType: "serviceaccount",
              field: "name",
              operator: "exists",
              value: true,
              message: "ServiceAccount needs a name (e.g., 'argocd-server').",
            },
          ],
          successMessage: "ServiceAccount is created in the namespace!",
        },
        {
          id: "test-10-3",
          name: "Role with rules defined",
          description: "A Role with RBAC rules exists in the namespace",
          entryPoint: "namespace",
          expectedPath: ["namespace", "role"],
          validations: [
            {
              nodeType: "role",
              field: "rules",
              operator: "exists",
              value: true,
              message: "Role needs rules defining API groups, resources, and verbs.",
            },
          ],
          successMessage: "RBAC Role is defined with proper rules!",
        },
        {
          id: "test-10-4",
          name: "RoleBinding connects Role to ServiceAccount",
          description: "A RoleBinding ties the Role to the ServiceAccount",
          entryPoint: "role",
          expectedPath: ["role", "rolebinding"],
          validations: [
            {
              nodeType: "rolebinding",
              field: "roleName",
              operator: "exists",
              value: true,
              message: "RoleBinding must reference a Role name.",
            },
            {
              nodeType: "rolebinding",
              field: "subjects",
              operator: "exists",
              value: true,
              message: "RoleBinding must specify subjects (the ServiceAccount).",
            },
          ],
          successMessage: "RoleBinding connects the Role to the ServiceAccount!",
        },
        {
          id: "test-10-5",
          name: "ConfigMap for Argo CD configuration",
          description: "argocd-cm ConfigMap exists",
          entryPoint: "namespace",
          expectedPath: ["namespace", "configmap"],
          validations: [
            {
              nodeType: "configmap",
              field: "name",
              operator: "exists",
              value: true,
              message: "ConfigMap needs a name (e.g., 'argocd-cm').",
            },
          ],
          successMessage: "Argo CD configuration is stored in a ConfigMap!",
        },
        {
          id: "test-10-6",
          name: "Secret for credentials",
          description: "Argo CD secret for sensitive data",
          entryPoint: "namespace",
          expectedPath: ["namespace", "secret"],
          validations: [
            {
              nodeType: "secret",
              field: "name",
              operator: "exists",
              value: true,
              message: "Secret needs a name (e.g., 'argocd-secret').",
            },
          ],
          successMessage: "Argo CD credentials are stored securely in a Secret!",
        },
        {
          id: "test-10-7",
          name: "Deployment runs argocd-server",
          description: "The argocd-server Deployment is configured",
          entryPoint: "serviceaccount",
          expectedPath: ["serviceaccount", "deployment"],
          validations: [
            {
              nodeType: "deployment",
              field: "image",
              operator: "contains",
              value: "argocd",
              message:
                "Deployment image should contain 'argocd' (e.g., 'quay.io/argoproj/argocd').",
            },
          ],
          successMessage: "Argo CD server Deployment is running!",
        },
        {
          id: "test-10-8",
          name: "Service exposes the Deployment",
          description: "A Service provides access to argocd-server",
          entryPoint: "deployment",
          expectedPath: ["deployment", "service"],
          validations: [
            {
              nodeType: "service",
              field: "port",
              operator: "gt",
              value: 0,
              message: "Service needs a port (e.g., 443).",
            },
          ],
          successMessage: "Service is exposing the Argo CD server!",
        },
        {
          id: "test-10-9",
          name: "Ingress exposes the Service",
          description: "An Ingress makes Argo CD accessible externally",
          entryPoint: "service",
          expectedPath: ["service", "ingress"],
          validations: [
            {
              nodeType: "ingress",
              field: "host",
              operator: "exists",
              value: true,
              message: "Ingress needs a host (e.g., 'argocd.example.com').",
            },
            {
              nodeType: "ingress",
              field: "path",
              operator: "exists",
              value: true,
              message: "Ingress needs a path (e.g., '/').",
            },
          ],
          successMessage: "Argo CD is accessible via Ingress!",
        },
      ],
      hints: [
        "Start with a Namespace node (name: 'argocd'). All other components branch from it.",
        "Add a ServiceAccount (name: 'argocd-server', namespace: 'argocd'). Connect Namespace → ServiceAccount.",
        "Add a Role with rules (e.g., 'apps: deployments: get,list,watch,create,update,delete'). Connect Namespace → Role.",
        "Add a RoleBinding that references the Role and the ServiceAccount. Connect Role → RoleBinding and ServiceAccount → RoleBinding.",
        "Add a ConfigMap (argocd-cm) and Secret (argocd-secret). Connect Namespace → ConfigMap and Namespace → Secret.",
        "Add a Deployment with image 'quay.io/argoproj/argocd'. Connect ServiceAccount → Deployment.",
        "Add a Service (port 443) and an Ingress (host: argocd.example.com). Connect Deployment → Service → Ingress.",
      ],
      maxStars: 3,
    },
    {
      id: "challenge-10-2",
      title: "Explore the argocd Namespace",
      type: "terminal",
      description:
        "Use kubectl to explore resources in the argocd namespace. List pods, services, and service accounts — essential skills for verifying an Argo CD installation.",
      terminalFiles: {
        "namespace.yaml":
          "apiVersion: v1\nkind: Namespace\nmetadata:\n  name: argocd",
        "serviceaccount.yaml":
          "apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: argocd-server\n  namespace: argocd",
        "role.yaml":
          "apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: argocd-role\n  namespace: argocd\nrules:\n- apiGroups: [\"apps\"]\n  resources: [\"deployments\"]\n  verbs: [\"get\", \"list\", \"watch\", \"create\", \"update\", \"delete\"]",
      },
      terminalTasks: [
        {
          id: "t10-1",
          instruction:
            "List all resources in the argocd namespace: `kubectl get all -n argocd`",
          validation: {
            type: "command_match",
            pattern: "kubectl\\s+get\\s+all\\s+-n\\s+argocd",
          },
          successMessage:
            "This shows all pods, services, deployments, and replicasets in the argocd namespace!",
        },
        {
          id: "t10-2",
          instruction:
            "List service accounts in the argocd namespace: `kubectl get serviceaccounts -n argocd`",
          validation: {
            type: "command_match",
            pattern: "kubectl\\s+get\\s+(serviceaccounts?|sa)\\s+-n\\s+argocd",
          },
          successMessage:
            "Each ServiceAccount provides a unique identity and API token for pods in the namespace!",
        },
        {
          id: "t10-3",
          instruction:
            "View the RBAC Role definition: `cat role.yaml`",
          validation: {
            type: "output_contains",
            pattern: "apiGroups",
          },
          successMessage:
            "This Role grants specific permissions (verbs) on specific resources within the argocd namespace!",
        },
        {
          id: "t10-4",
          instruction:
            "List roles in the argocd namespace: `kubectl get roles -n argocd`",
          validation: {
            type: "command_match",
            pattern: "kubectl\\s+get\\s+roles?\\s+-n\\s+argocd",
          },
          successMessage:
            "Roles define RBAC permissions scoped to a namespace. RoleBindings attach them to ServiceAccounts!",
        },
      ],
      hints: [
        "Use -n <namespace> to target a specific namespace with kubectl.",
        "Common resource types: pods, services, deployments, serviceaccounts, roles, rolebindings.",
        "Use 'cat <file>' to view YAML manifests that define the resources.",
        "Short names work too: sa for serviceaccounts, svc for services.",
      ],
      maxStars: 3,
    },
  ],
};
