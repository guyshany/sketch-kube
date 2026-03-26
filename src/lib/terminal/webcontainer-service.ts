import { WebContainer, type FileSystemTree, type WebContainerProcess } from "@webcontainer/api";

let instance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

const commandHistory: string[] = [];
let outputBuffer = "";

export function getCommandHistory(): string[] {
  return [...commandHistory];
}

export function getOutputBuffer(): string {
  return outputBuffer;
}

export function clearOutputBuffer(): void {
  outputBuffer = "";
}

export function clearCommandHistory(): void {
  commandHistory.length = 0;
}

export async function boot(): Promise<WebContainer> {
  if (instance) return instance;
  if (bootPromise) return bootPromise;

  bootPromise = WebContainer.boot().then((wc) => {
    instance = wc;
    return wc;
  });

  return bootPromise;
}

export async function mountFiles(files: Record<string, string>): Promise<void> {
  const wc = await boot();

  const tree: FileSystemTree = {};
  for (const [path, content] of Object.entries(files)) {
    const parts = path.split("/");
    let current = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      const dir = parts[i];
      if (!current[dir]) {
        current[dir] = { directory: {} };
      }
      const entry = current[dir];
      if ("directory" in entry) {
        current = entry.directory;
      }
    }
    const fileName = parts[parts.length - 1];
    current[fileName] = { file: { contents: content } };
  }

  await wc.mount(tree);
}

export async function spawnShell(): Promise<WebContainerProcess> {
  const wc = await boot();
  const proc = await wc.spawn("jsh", {
    terminal: { cols: 80, rows: 24 },
  });
  return proc;
}

export async function fileExists(path: string): Promise<boolean> {
  const wc = await boot();
  try {
    await wc.fs.readFile(path);
    return true;
  } catch {
    return false;
  }
}

export async function readFile(path: string): Promise<string> {
  const wc = await boot();
  return await wc.fs.readFile(path, "utf-8");
}

export function recordCommand(cmd: string): void {
  const trimmed = cmd.trim();
  if (trimmed) {
    commandHistory.push(trimmed);
  }
}

export function recordOutput(data: string): void {
  outputBuffer += data;
}

export function getLastCommand(): string | undefined {
  return commandHistory[commandHistory.length - 1];
}

export function getRecentOutput(chars = 2000): string {
  return outputBuffer.slice(-chars);
}
