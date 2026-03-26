import type { Stage } from "@/types/stages";

export const stage3Docker: Stage = {
  id: "stage-3",
  number: 3,
  title: "Containers & Docker",
  description:
    "Learn how Docker packages applications into containers -- portable, isolated environments that run consistently everywhere.",
  icon: "Box",
  unlockedBy: "stage-2",
  narrative: {
    intro:
      'A new developer just joined NovaCraft and can\'t get the app running on their machine — different OS, missing libraries. The CTO says: "We need to containerize everything." Your job: learn Docker and package the app so it runs identically everywhere.',
    context: "Containerize NovaCraft's application so it works on any machine.",
  },
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
      quiz: [
        {
          question: "What core problem does Docker solve?",
          options: [
            "Making code run faster",
            "Environment inconsistency between machines",
            "Replacing the operating system",
            "Writing code in any language",
          ],
          correctIndex: 1,
          explanation:
            "Docker packages your app with its exact environment (OS, libraries, config), so it runs the same everywhere — your laptop, staging, or production.",
        },
      ],
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

An image is read-only. It's the blueprint, not the running thing.

[deep-dive: How do image layers work?]
Each instruction in a Dockerfile creates a new layer. Layers are cached and shared between images. If you change only your app code (COPY . /app), Docker reuses the cached OS and dependency layers — making rebuilds fast. This is why you put frequently-changing instructions (like COPY) last in your Dockerfile.
[/deep-dive]`,
      quiz: [
        {
          question: "What is a Docker Image?",
          options: [
            "A running container",
            "A read-only snapshot of a complete environment",
            "A virtual machine",
            "A configuration file",
          ],
          correctIndex: 1,
          explanation:
            "An image is a read-only blueprint containing the OS, code, dependencies, and config. Containers are created from images.",
        },
      ],
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

The "-p 8080:80" maps host port 8080 to container port 80.

[deep-dive: Containers vs Virtual Machines]
VMs run a full guest OS on a hypervisor — each VM has its own kernel, drivers, and system libraries (gigabytes of overhead). Containers share the host kernel and only package the application layer (megabytes). This makes containers much faster to start (seconds vs minutes) and far more resource-efficient. The tradeoff: containers provide process isolation, not full hardware isolation.
[/deep-dive]`,
      quiz: [
        {
          question: "How are containers different from virtual machines?",
          options: [
            "Containers include their own kernel",
            "Containers share the host OS kernel, making them lightweight",
            "Containers are slower but more secure",
            "There is no difference",
          ],
          correctIndex: 1,
          explanation:
            "Containers share the host OS kernel and only package the application layer, making them much lighter and faster to start than VMs which include a full guest OS.",
        },
      ],
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
              message:
                "Container must reference an image (e.g., 'nginx:latest').",
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
              message:
                "Volume needs a mount path inside the container (e.g., '/data').",
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
    {
      id: "challenge-3-2",
      title: "Docker CLI Practice",
      type: "terminal",
      description:
        "Practice essential Docker commands: listing images, running containers, and inspecting running containers.",
      terminalFiles: {
        Dockerfile:
          'FROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]',
        "server.js":
          'const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/plain" });\n  res.end("Hello from Docker!");\n});\nserver.listen(3000);',
        "package.json": '{ "name": "myapp", "version": "1.0.0" }',
      },
      terminalTasks: [
        {
          id: "t3-1",
          instruction: "List available Docker images with `docker images`",
          validation: { type: "command_match", pattern: "docker\\s+images" },
          successMessage:
            "You can see all images with their tags, IDs, and sizes!",
        },
        {
          id: "t3-2",
          instruction: "Run an nginx container: `docker run nginx`",
          validation: { type: "command_match", pattern: "docker\\s+run" },
          successMessage:
            "docker run creates and starts a new container from an image!",
        },
        {
          id: "t3-3",
          instruction: "List running containers with `docker ps`",
          validation: { type: "command_match", pattern: "docker\\s+ps" },
          successMessage:
            "docker ps shows all running containers with their ports and status!",
        },
        {
          id: "t3-4",
          instruction:
            "Build an image from the Dockerfile: `docker build -t myapp:v1 .`",
          validation: {
            type: "output_contains",
            pattern: "Successfully tagged",
          },
          successMessage:
            "docker build creates an image from a Dockerfile. The -t flag gives it a name and tag!",
        },
      ],
      hints: [
        "Docker commands follow the pattern: docker <command> [options]",
        "Use docker images to see images, docker ps to see containers.",
        "The docker build command needs -t for tagging and . to specify the build context directory.",
      ],
      maxStars: 3,
    },
  ],
};
