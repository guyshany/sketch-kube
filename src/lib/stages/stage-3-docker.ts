import type { Stage } from "@/types/stages";

export const stage3Docker: Stage = {
  id: "stage-3",
  number: 3,
  title: "Containers & Docker",
  description: "Learn how Docker packages applications into containers -- portable, isolated environments that run consistently everywhere.",
  icon: "Box",
  unlockedBy: "stage-2",
  lessons: [
    {
      id: "3-1",
      title: "The Problem: 'It Works on My Machine'",
      diagram: "works-on-my-machine",
      content: `Imagine you build a web app on your laptop. It works great! But when you deploy it to a server, it crashes.

Why? Because the server has:
  - A different OS version
  - Different libraries installed
  - Different environment variables
  - Different file paths

This is the "it works on my machine" problem. Docker solves it.`,
    },
    {
      id: "3-2",
      title: "Docker Images",
      diagram: "docker-image",
      content: `A Docker Image is like a snapshot of a complete environment:
  - The operating system (e.g., Ubuntu, Alpine)
  - Your application code
  - All dependencies and libraries
  - Configuration files

Images are defined by a Dockerfile:
  FROM node:18
  COPY . /app
  RUN npm install
  CMD ["node", "server.js"]

Images are stored in registries (like Docker Hub) and identified by name and tag:
  nginx:latest
  postgres:15
  myapp:v1.2.3

An image is read-only. It's the blueprint, not the running thing.`,
    },
    {
      id: "3-3",
      title: "Docker Containers",
      diagram: "container-diagram",
      content: `A Container is a running instance of an Image. Like how a process is a running instance of a program.

  Image → Container  (like  Class → Object)

Containers are:
  - Isolated: they have their own filesystem, network, and processes
  - Lightweight: they share the host OS kernel (unlike VMs)
  - Portable: run the same on any machine with Docker installed
  - Ephemeral: can be stopped and destroyed without affecting the image

You can run multiple containers from the same image:
  docker run -p 8080:80 nginx
  docker run -p 8081:80 nginx

The "-p 8080:80" maps host port 8080 to container port 80.`,
    },
    {
      id: "3-4",
      title: "Volumes: Persistent Storage",
      diagram: "volume-diagram",
      content: `Containers are ephemeral -- when they stop, their data is gone. But sometimes you need data to persist (database files, logs, uploads).

Volumes solve this by mounting a directory from the host into the container:
  docker run -v /host/data:/container/data postgres

Now /container/data inside the container actually points to /host/data on the host machine. Data survives container restarts.

In the challenge, you'll wire up an Image, Container, and Volume.`,
    },
  ],
  challenges: [
    {
      id: "challenge-3-1",
      title: "Containerize an Application",
      description:
        "Build a Docker setup: Create an Image (with a name and tag), connect it to a Container (with a name and port), and attach a Volume for persistent data.",
      availableComponents: ["image", "container", "volume", "port"],
      testCases: [
        {
          id: "test-3-1",
          name: "Image is defined",
          description: "A Docker image with name and tag",
          entryPoint: "image",
          expectedPath: ["image"],
          validations: [
            {
              nodeType: "image",
              field: "tag",
              operator: "exists",
              value: true,
              message: "Image needs a tag (e.g., 'latest' or 'v1.0').",
            },
          ],
          successMessage: "Docker image is properly defined!",
        },
        {
          id: "test-3-2",
          name: "Container runs the image",
          description: "A container connected to the image",
          entryPoint: "image",
          expectedPath: ["image", "container"],
          validations: [
            {
              nodeType: "container",
              field: "image",
              operator: "exists",
              value: true,
              message: "Container must reference an image (e.g., 'nginx:latest').",
            },
          ],
          successMessage: "Container is running the image!",
        },
        {
          id: "test-3-3",
          name: "Volume is attached",
          description: "A volume mounted to the container",
          entryPoint: "container",
          expectedPath: ["container", "volume"],
          validations: [
            {
              nodeType: "volume",
              field: "mountPath",
              operator: "exists",
              value: true,
              message: "Volume needs a mount path inside the container (e.g., '/data').",
            },
          ],
          successMessage: "Volume is mounted for persistent storage!",
        },
        {
          id: "test-3-4",
          name: "Container port is exposed",
          description: "A port mapping for the container",
          entryPoint: "container",
          expectedPath: ["container", "port"],
          validations: [
            {
              nodeType: "port",
              field: "port",
              operator: "gt",
              value: 0,
              message: "Port number must be greater than 0.",
            },
          ],
          successMessage: "Container port is exposed!",
        },
      ],
      hints: [
        "Start with an Image node. Set the tag to 'latest'.",
        "Add a Container, set its image field (e.g., 'nginx:latest'). Connect Image → Container.",
        "Add a Volume with a mount path (e.g., '/usr/share/nginx/html'). Connect Container → Volume.",
        "Add a Port node (e.g., port 80) and connect Container → Port to expose the service.",
      ],
      maxStars: 3,
    },
  ],
};
