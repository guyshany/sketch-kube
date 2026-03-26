import type { Stage } from "@/types/stages";

export const stage2Processes: Stage = {
  id: "stage-2",
  number: 2,
  title: "Processes & Services",
  description: "Understand what processes are, how services work, and how they communicate through network ports.",
  icon: "Cpu",
  unlockedBy: "stage-1",
  lessons: [
    {
      id: "2-1",
      title: "What is a Process?",
      diagram: "process-intro",
      content: `When you run a command, the operating system creates a "process" -- a running instance of a program.

Each process gets:
  - A unique Process ID (PID)
  - Its own memory space
  - CPU time to execute

You can see running processes with: ps aux

Most commands run, produce output, and exit. But some processes are designed to run forever -- we call these "services" or "daemons".

Examples of services:
  - A web server (nginx, Apache)
  - A database (PostgreSQL, MySQL)
  - A messaging system (Redis, RabbitMQ)`,
    },
    {
      id: "2-2",
      title: "Network Ports",
      diagram: "port-diagram",
      content: `Services need a way for other programs to talk to them. They do this by "listening" on a network port.

A port is like a numbered door on your computer:
  - Port 80: HTTP (web traffic)
  - Port 443: HTTPS (secure web traffic)
  - Port 5432: PostgreSQL
  - Port 3000: Common for development servers

When a service starts, it binds to a port:
  "nginx is listening on port 80"

Other programs connect to that port to communicate:
  "Browser connects to localhost:80"

Only one process can listen on a given port at a time. If you try to start two web servers on port 80, the second one will fail.`,
    },
    {
      id: "2-3",
      title: "Client-Server Communication",
      diagram: "client-server",
      content: `Most services follow the client-server model:

1. The SERVER starts and listens on a port
2. A CLIENT connects to that port
3. The client sends a REQUEST
4. The server processes it and sends a RESPONSE

Example:
  - nginx (server) listens on port 80
  - Your browser (client) connects to port 80
  - Browser sends: GET /index.html
  - nginx responds with the HTML file

This request-response cycle is the foundation of everything on the internet!

In the challenge, you'll build a simple client-server setup on the canvas.`,
    },
  ],
  challenges: [
    {
      id: "challenge-2-1",
      title: "Build a Client-Server Setup",
      description:
        "Create a Process (the server) with a name, connect it to a Port, representing a service listening on a network port. Then add a second Process (the client) and connect the Port to it, showing the client connecting to the server.",
      availableComponents: ["process", "port"],
      testCases: [
        {
          id: "test-2-1",
          name: "Server process exists",
          description: "A server process with a name must exist",
          entryPoint: "process",
          expectedPath: ["process"],
          validations: [
            {
              nodeType: "process",
              field: "name",
              operator: "exists",
              value: true,
              message: "The Process needs a name (e.g., 'nginx').",
            },
          ],
          successMessage: "Server process is configured!",
        },
        {
          id: "test-2-2",
          name: "Port is configured",
          description: "A port must be specified",
          entryPoint: "process",
          expectedPath: ["process", "port"],
          validations: [
            {
              nodeType: "port",
              field: "port",
              operator: "gt",
              value: 0,
              message: "Port number must be greater than 0.",
            },
          ],
          successMessage: "Service is listening on the correct port!",
        },
        {
          id: "test-2-3",
          name: "Client connects to server",
          description: "The full pipeline: server → port → client",
          entryPoint: "process",
          expectedPath: ["process", "port", "process"],
          validations: [],
          successMessage: "Client-server pipeline is complete!",
        },
      ],
      hints: [
        "Add a Process component and give it a name like 'nginx' or 'web-server'.",
        "Add a Port component, set the port number (e.g., 80), and connect the Process to the Port.",
      ],
      maxStars: 3,
    },
  ],
};
