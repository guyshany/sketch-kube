export const DOCKER_SCRIPT = `#!/usr/bin/env node
const args = process.argv.slice(2);
const sub = args[0];

const images = [
  { repo: "nginx", tag: "latest", id: "a8281ce2b3e1", created: "2 weeks ago", size: "187MB" },
  { repo: "postgres", tag: "15", id: "b3d7c3f2a1e4", created: "3 weeks ago", size: "379MB" },
  { repo: "node", tag: "18-alpine", id: "c9f4e1d2b3a5", created: "1 week ago", size: "175MB" },
  { repo: "redis", tag: "7", id: "d1e2f3a4b5c6", created: "4 days ago", size: "130MB" },
];

if (sub === "images") {
  console.log("REPOSITORY          TAG       IMAGE ID       CREATED         SIZE");
  for (const img of images) {
    console.log(img.repo.padEnd(20) + img.tag.padEnd(10) + img.id.padEnd(15) + img.created.padEnd(16) + img.size);
  }
} else if (sub === "run") {
  const imgName = args.filter(a => !a.startsWith("-")).slice(1)[0] || "unknown";
  const id = Math.random().toString(36).slice(2, 14);
  console.log(id);
} else if (sub === "ps") {
  console.log("CONTAINER ID   IMAGE          COMMAND       CREATED        STATUS         PORTS     NAMES");
  console.log("a1b2c3d4e5f6   nginx:latest   \\"nginx -g…\\"   5 seconds ago  Up 4 seconds   80/tcp    web-server");
  console.log("f6e5d4c3b2a1   postgres:15    \\"postgres\\"     2 minutes ago  Up 2 minutes   5432/tcp  my-database");
} else if (sub === "build") {
  console.log("Step 1/4 : FROM node:18-alpine");
  console.log(" ---> c9f4e1d2b3a5");
  console.log("Step 2/4 : COPY . /app");
  console.log("Step 3/4 : RUN npm install");
  console.log("Step 4/4 : CMD [\\"node\\", \\"server.js\\"]");
  const tag = args.find((a, i) => args[i - 1] === "-t") || "myapp:latest";
  console.log("Successfully tagged " + tag);
} else if (sub === "stop" || sub === "rm") {
  console.log(args[1] || "");
} else {
  console.log("Usage:  docker [OPTIONS] COMMAND");
  console.log("Commands: build, images, ps, run, stop, rm");
}
`;

export const KUBECTL_SCRIPT = `#!/usr/bin/env node
const args = process.argv.slice(2);
const sub = args[0];

if (sub === "get") {
  const r = args[1];
  if (r === "pods" || r === "pod" || r === "po") {
    console.log("NAME                                    READY   STATUS    RESTARTS   AGE");
    console.log("web-deployment-7d4f8b6c9-x2k4l          1/1     Running   0          5m");
    console.log("web-deployment-7d4f8b6c9-m8n3p          1/1     Running   0          5m");
    console.log("postgres-5c8f9d7b2-q1w2e                1/1     Running   1          12m");
  } else if (r === "services" || r === "svc" || r === "service") {
    console.log("NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE");
    console.log("kubernetes      ClusterIP   10.96.0.1      <none>        443/TCP    30d");
    console.log("web-service     ClusterIP   10.96.45.12    <none>        80/TCP     5m");
    console.log("postgres-svc    ClusterIP   10.96.78.34    <none>        5432/TCP   12m");
  } else if (r === "deployments" || r === "deploy") {
    console.log("NAME              READY   UP-TO-DATE   AVAILABLE   AGE");
    console.log("web-deployment    2/2     2            2           5m");
    console.log("postgres          1/1     1            1           12m");
  } else if (r === "nodes" || r === "node") {
    console.log("NAME       STATUS   ROLES           AGE   VERSION");
    console.log("minikube   Ready    control-plane   30d   v1.28.3");
  } else {
    console.error("error: the server doesn't have a resource type \\"" + r + "\\"");
    process.exit(1);
  }
} else if (sub === "apply") {
  console.log("deployment.apps/web-deployment created");
  console.log("service/web-service created");
} else if (sub === "describe") {
  const name = args[2] || "web-deployment-7d4f8b6c9-x2k4l";
  console.log("Name:         " + name);
  console.log("Namespace:    default");
  console.log("Status:       Running");
  console.log("IP:           172.17.0.4");
  console.log("Containers:");
  console.log("  web:");
  console.log("    Image:    nginx:latest");
  console.log("    Port:     80/TCP");
} else if (sub === "logs") {
  console.log("[10:00:01] INFO  Starting server...");
  console.log("[10:00:02] INFO  Listening on port 80");
  console.log("[10:00:15] INFO  GET / 200 3ms");
} else {
  console.log("kubectl controls the Kubernetes cluster manager.");
  console.log("Commands: get, describe, apply, delete, logs");
}
`;

export const PS_SCRIPT = `#!/usr/bin/env node
const args = process.argv.slice(2);
const hasAux = args.join(" ").includes("aux");

if (hasAux) {
  console.log("USER       PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND");
  console.log("root         1   0.0  0.1   4536  3200 ?        Ss   10:00   0:01 /sbin/init");
  console.log("root        42   0.0  0.2   8920  5120 ?        S    10:00   0:00 /usr/sbin/sshd");
  console.log("www        128   0.2  1.5  45672 18432 ?        S    10:01   0:05 nginx: master process");
  console.log("www        129   0.1  1.2  46200 15360 ?        S    10:01   0:03 nginx: worker process");
  console.log("postgres   256   0.3  2.1 215040 32768 ?        S    10:02   0:12 postgres -D /var/lib/postgresql");
  console.log("node       512   1.2  3.5 980224 71680 ?        Sl   10:05   0:30 node /app/server.js");
} else {
  console.log("  PID TTY          TIME CMD");
  console.log(" 1024 pts/0    00:00:00 bash");
  console.log(" 1025 pts/0    00:00:00 ps");
}
`;

export const NETSTAT_SCRIPT = `#!/usr/bin/env node
const args = process.argv.slice(2);
const listening = args.some(a => a.includes("l")) || args.includes("-tulpn");

if (listening) {
  console.log("Active Internet connections (only servers)");
  console.log("Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program");
  console.log("tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      128/nginx");
  console.log("tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      128/nginx");
  console.log("tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      256/postgres");
  console.log("tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      512/node");
  console.log("tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      42/sshd");
} else {
  console.log("Active Internet connections");
  console.log("Proto Recv-Q Send-Q Local Address           Foreign Address         State");
  console.log("tcp        0      0 192.168.1.10:52340      93.184.216.34:443       ESTABLISHED");
}
`;

export function getMockCommandFiles(): Record<string, string> {
  return {
    "bin/docker": DOCKER_SCRIPT,
    "bin/kubectl": KUBECTL_SCRIPT,
    "bin/ps-mock": PS_SCRIPT,
    "bin/netstat": NETSTAT_SCRIPT,
  };
}
