import type { Stage } from "@/types/stages";

export const stage1Terminal: Stage = {
  id: "stage-1",
  number: 1,
  title: "The Terminal",
  description: "Learn the basics of the command line -- what a shell is, how commands work, and how data flows through pipes.",
  icon: "Terminal",
  unlockedBy: undefined,
  lessons: [
    {
      id: "1-1",
      title: "What is a Terminal?",
      diagram: "terminal-intro",
      content: `A terminal (or command line) is a text-based interface to your computer. Instead of clicking buttons and icons, you type commands.

Think of it like talking directly to your computer. You type a command, press Enter, and the computer responds with text output.

Every command runs inside a "shell" -- a program that interprets your commands. Common shells include bash, zsh, and sh.

When you open a terminal, you see a prompt like:
  $ _

The dollar sign means the shell is ready for your input.`,
    },
    {
      id: "1-2",
      title: "Running Commands",
      diagram: "command-structure",
      content: `A command has three parts:
1. The command name (e.g., "ls", "echo", "cat")
2. Options/flags (e.g., "-l", "--help")
3. Arguments (e.g., a filename or directory)

Example: ls -la /home
  - "ls" is the command (list files)
  - "-la" are flags (long format + show hidden)
  - "/home" is the argument (which directory)

Every command produces output:
  - stdout (standard output) -- the normal result
  - stderr (standard error) -- error messages

And every command returns an exit code:
  - 0 means success
  - Any other number means an error occurred`,
    },
    {
      id: "1-3",
      title: "Pipes: Connecting Commands",
      diagram: "pipe-diagram",
      content: `The real power of the terminal comes from connecting commands together using pipes ( | ).

A pipe takes the output of one command and feeds it as input to the next command.

Example: ls -la | grep ".txt"
  1. "ls -la" lists all files
  2. The pipe ( | ) sends that list to the next command
  3. "grep .txt" filters and shows only lines containing ".txt"

You can chain as many commands as you want:
  cat log.txt | grep "ERROR" | wc -l
  (reads a file → filters errors → counts lines)

This is the Unix philosophy: small tools that do one thing well, connected together to solve complex problems.

Now let's practice! In the challenge, you'll build a command pipeline on the canvas.`,
    },
  ],
  challenges: [
    {
      id: "challenge-1-1",
      title: "Build a Command Pipeline",
      description:
        "Create a Terminal, connect it to a Command that runs 'ls', then connect a second Command that runs 'grep' to filter the output. This represents the pipeline: Terminal → ls → grep.",
      availableComponents: ["terminal", "command"],
      testCases: [
        {
          id: "test-1-1",
          name: "Terminal exists",
          description: "A terminal shell must be present",
          entryPoint: "terminal",
          expectedPath: ["terminal"],
          validations: [
            {
              nodeType: "terminal",
              field: "shell",
              operator: "exists",
              value: true,
              message: 'Terminal must have a shell configured (e.g., "/bin/bash").',
            },
          ],
          successMessage: "Terminal is set up correctly!",
        },
        {
          id: "test-1-2",
          name: "Command pipeline connected",
          description: "Terminal connects to ls command, which connects to grep",
          entryPoint: "terminal",
          expectedPath: ["terminal", "command"],
          validations: [
            {
              nodeType: "command",
              field: "command",
              operator: "exists",
              value: true,
              message: "The Command must have a command specified (e.g., 'ls' or 'grep').",
            },
          ],
          successMessage: "Pipeline is connected and working!",
        },
      ],
      hints: [
        "Start by dragging a Terminal component from the palette onto the canvas.",
        "Add a Command component and set its command to 'ls'. Then connect the Terminal to the Command.",
        "Add a second Command with 'grep' and connect the first Command to it.",
      ],
      maxStars: 3,
    },
  ],
};
