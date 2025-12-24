#  Termilog

**Universal terminal logger for Node.js and frontend frameworks**

Termilog lets you send logs from **Node.js, React, Vue, Next.js, or any JavaScript app** directly to your **terminal** — without opening browser DevTools.

---

## Features

- Logs appear in your **terminal**, not browser console
- Works with **Node.js, React, Vue, Next.js, etc.**
- Multiple adapters: Terminal, Browser, File
- Configurable log levels
- Production ready
- Easy to extend

---

## Installation
npm install termilog

## Basic Usage (Node.js)
import { Logger, nodeAdapter } from "termilog";

const log = new Logger(nodeAdapter);

log.info("Server started");
log.warn("Low memory");
log.error("Something went wrong");

## Use with React / Frontend Frameworks
Because browsers can't access your terminal, Termilog uses a lightweight bridge server.
 1. Start the bridge server
   Create file: log-server.js 
     import { startBridge } from "termilog/bridge";
     startBridge(5000);
   Run it:
     bash
     node log-server.js

 2. Use in your React app
     import { Logger, createBrowserAdapter } from "termilog";

     const log = new Logger(createBrowserAdapter());

     log.info("React app started");
      log.warn("Button clicked");
Your logs will now appear in the terminal running the bridge server.

## File Logging
     import { Logger, createFileAdapter } from "termilog";

     const log = new Logger(createFileAdapter("app.log"));

     log.info("Saved to file");

## Multiple Adapters at Once
     import { Logger, nodeAdapter, createFileAdapter } from "termilog";

     const log = new Logger([
        nodeAdapter,
        createFileAdapter("server.log")
     ]);

     log.error("Critical failure");

##  Log Levels
    const log = new Logger(nodeAdapter, { level: "warn" });

    log.debug("Ignored");
    log.info("Ignored");
    log.warn("Shown");
    log.error("Shown");
   Levels: debug → info → warn → error

##  Custom Adapter
     const myAdapter = {
     write(entry) {
    // Send logs anywhere: DB, API, cloud, etc.
      console.log("CUSTOM:", entry);
     }
     };

     const log = new Logger(myAdapter);

## Example Output
      [INFO] 2025-12-24T10:15:30Z → Server started
      [WARN] 2025-12-24T10:15:33Z → Low memory
      [ERROR] 2025-12-24T10:15:40Z → Database connection failed
    
## Why Termilog?
    Developers waste time opening DevTools.
    Termilog puts your logs where they belong — in your terminal.







     



