import type { Achievement } from "@/types/stages";

export const achievements: Achievement[] = [
  {
    id: "first-node",
    title: "First Component",
    description: "Added your first component to the canvas",
    icon: "Sparkles",
    condition: "add_first_node",
  },
  {
    id: "first-connection",
    title: "Making Connections",
    description: "Created your first connection between components",
    icon: "Link",
    condition: "add_first_edge",
  },
  {
    id: "first-challenge",
    title: "Challenge Accepted",
    description: "Completed your first challenge",
    icon: "Trophy",
    condition: "complete_first_challenge",
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Earned 3 stars on a challenge without using hints",
    icon: "Star",
    condition: "perfect_score",
  },
  {
    id: "terminal-master",
    title: "Terminal Master",
    description: "Completed the Terminal stage",
    icon: "Terminal",
    condition: "complete_stage_1",
  },
  {
    id: "docker-captain",
    title: "Docker Captain",
    description: "Completed the Docker stage",
    icon: "Box",
    condition: "complete_stage_3",
  },
  {
    id: "k8s-pilot",
    title: "K8s Pilot",
    description: "Completed the Kubernetes Core stage",
    icon: "Hexagon",
    condition: "complete_stage_5",
  },
  {
    id: "helm-navigator",
    title: "Helm Navigator",
    description: "Completed the Helm Charts stage",
    icon: "Package",
    condition: "complete_stage_8",
  },
  {
    id: "infrastructure-architect",
    title: "Infrastructure Architect",
    description: "Completed all 9 stages",
    icon: "Blocks",
    condition: "complete_all_stages",
  },
  {
    id: "no-hints",
    title: "Self Sufficient",
    description: "Completed 3 challenges without using any hints",
    icon: "Brain",
    condition: "three_no_hints",
  },
];
