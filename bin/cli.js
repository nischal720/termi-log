#!/usr/bin/env node

import { spawn } from "child_process";
import chokidar from "chokidar";
import path from "path";
import { fileURLToPath } from "url";
import { startBridge } from "../server/bridger.js";

const args = process.argv.slice(2);

// Simple port parsing
let port = 5000;
const portIdx = args.findIndex((arg) => arg === "--port" || arg === "-p");
if (portIdx !== -1 && args[portIdx + 1]) {
  port = parseInt(args[portIdx + 1], 10);
  // Remove the port args so they don't interfere with script parsing
  args.splice(portIdx, 2);
}

// Auto-start the bridge server so browser logs work immediately
try {
  startBridge(port);
} catch (err) {
  console.error(
    `[Termilog] Failed to start bridge server on port ${port}:`,
    err.message,
  );
}

// Standalone mode: just listen for bridge logs (already started above)
if (args.length === 0) {
  console.log(`[Termilog] Bridge server running on port ${port}.`);
  console.log("[Termilog] Waiting for logs... (Press Ctrl+C to exit)");

  // Keep process alive
  setInterval(() => {}, 1000 * 60 * 60);
} else {
  // Runner mode: start script and watch for changes
  const script = args[0];
  const scriptArgs = args.slice(1);

  let childProcess = null;
  let isStarting = false;

  function startProcess() {
    if (isStarting) return;
    isStarting = true;

    if (childProcess) {
      console.log("[Termilog] Restarting due to changes...");
      childProcess.kill();
      childProcess = null;
    } else {
      console.log(`[Termilog] Starting \`${script}\`...`);
    }

    // Small delay to ensure port release or cleanup if needed
    setTimeout(() => {
      childProcess = spawn("node", [script, ...scriptArgs], {
        stdio: "inherit",
        env: process.env,
      });

      childProcess.on("close", (code) => {
        childProcess = null;
      });

      isStarting = false;
    }, 100);
  }

  const watcher = chokidar.watch(".", {
    ignored: [
      /(^|[\/\\])\../, // ignore dotfiles
      "**/node_modules/**",
      "**/.git/**",
    ],
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on("all", (event, path) => {
    startProcess();
  });

  // Start initially
  startProcess();

  process.on("SIGINT", () => {
    if (childProcess) {
      childProcess.kill();
    }
    process.exit();
  });
}
