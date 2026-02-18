# 🖥️ Termilog

> **Universal terminal logger for Node.js, React, Vue, Next.js, and modern JavaScript applications.**

[![npm version](https://img.shields.io/npm/v/termilog-js?style=flat-square)](https://www.npmjs.com/package/termilog-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Termilog** bridges the gap between your browser and your terminal. It allows you to pipe console logs from your frontend application directly to your terminal window, keeping your debugging flow in one place without constant context switching to browser DevTools.

Now features a built-in **Development CLI** with auto-restart capabilities (process watcher), making it a perfect lightweight alternative to `nodemon` for your development scripts.

---

## ✨ Features

- **Universal Logging**: Unified logging interface for both Backend (Node.js) and Frontend (Browser).
- **Log Bridging**: Stream browser logs instantly to your local terminal.
- **⚡ Zero-Config CLI**: New `termilog` command to run and watch your scripts (Hot Reload).
- **Flexible Adapters**: Built-in support for Console, File, and Bridge adapters.
- **Lightweight**: Minimal dependencies, focused on performance.
- **Isomorphic**: Works out-of-the-box in Browsers (React, Vue, etc.) and Node.js.

---

## 🏗️ Framework Compatibility

Termilog is designed to be **Universal**. Here is how it behaves in different environments:

| Environment       | Mode                  | Supported Adapters                                 | Notes                                          |
| :---------------- | :-------------------- | :------------------------------------------------- | :--------------------------------------------- |
| **Browsers**      | React, Vue, Next.js   | `browserAdapter`, `remoteAdapter`, `nodeAdapter`\* | \*`nodeAdapter` uses `console.log` in browser. |
| **Node.js**       | Express, Fastify, CLI | `nodeAdapter`, `remoteAdapter`, `fileAdapter`      | Full access to file system and terminal.       |
| **Next.js (SSR)** | Edge / Serverless     | `nodeAdapter`, `remoteAdapter`                     | Works in API routes and `getServerSideProps`.  |

Termilog automatically detects the environment and safely falls back or skips adapters that aren't compatible (e.g., `fileAdapter` is a silent no-op in the browser).

---

## 🚀 Installation

```bash
# Recommended: Install as a dev dependency
npm install --save-dev termilog-js
# or
npm install -D termilog-js

# Global installation for standalone binary
npm install -g termilog-js
```

---

## 🛠️ CLI Usage (New!)

Termilog now comes with a development runner that creates a seamless logging environment. It watches your files for changes and automatically restarts your script, just like `nodemon`.

### Running a script

```bash
npx termilog src/server.js
```

### Watching a different file

```bash
npx termilog app.js
```

### Using a custom port

```bash
npx termilog --port 6000
# or
npx termilog app.js -p 6000
```

The CLI automatically:

1.  **Starts the Bridge Server** (Default Port 5000) for browser logs.
2.  **Watches files** and restarts your script on change.
3.  **Cleanups processes** on exit.

---

## 📖 Library Usage

### 1. Node.js Environment

Use the default Node adapter for standard terminal output.

```javascript
import { Logger, nodeAdapter } from "termilog-js";

const log = new Logger(nodeAdapter);

log.info("Server initialized on port 3000");
log.warn("Memory usage high");
log.error("Database connection failed");
```

### 2. Frontend Frameworks (React, Vue, Next.js)

To see browser logs in your terminal, you need to use the **Bridge Adapter**.

**Step A: Start the Bridge Server**

- **Option 1 (Recommended):** Just run `npx termilog` (or `npx termilog dev.js`) in your terminal. It starts the bridge server automatically!
- **Option 2 (Manual):** If you are not using the CLI, start it in your own script:

```javascript
// scripts/dev-server.js
import { startBridge } from "termilog-js/bridge";

// Starts the log receiver on a custom port (e.g., 6000)
startBridge(6000);
```

**Step B: Configure the Logger in your App**

```javascript
// src/utils/logger.js
import { Logger, createBrowserAdapter } from "termilog-js";

// Connects to the bridge server running on localhost:6000
const log = new Logger(createBrowserAdapter({ port: 6000 }));

export default log;
```

**Step C: Log from your Component**

```javascript
import log from "./utils/logger";

function App() {
  const handleClick = () => {
    log.info("Button clicked in browser!"); // This appears in your TERMINAL!
  };
  return <button onClick={handleClick}>Click Me</button>;
}
```

### 3. Remote Logging (Standalone / Universal Mode)

Termilog can act as a **central log server**. You can run `npx termilog` in one terminal, and have multiple apps (Frontend OR Backend) pipe logs to it.

**Terminal 1 (Listener)**

```bash
npx termilog
# Starts bridge server on port 5000 and waits for logs...
```

**Terminal 2 (Node.js App)**
Instead of `nodeAdapter`, use `createRemoteAdapter` to send logs to the listener.

```javascript
import { Logger, createRemoteAdapter } from "termilog-js";

// Connects to localhost:5000 (default)
const log = new Logger(createRemoteAdapter());

log.info("This log is sent over the network to Terminal 1!");
```

**Terminal 3 (React App)**
Same as standard frontend usage: `createBrowserAdapter()` connects to the same listener automatically.

---

## 📂 File Logging

Need to persist logs? Use the File Adapter.

```javascript
import { Logger, createFileAdapter } from "termilog-js";

const fileLog = new Logger(createFileAdapter("application.log"));

fileLog.info("This line is written to application.log");
```

---

## 🧩 Advanced: Multiple Adapters

You can combine adapters to pipe logs to multiple destinations simultaneously (e.g., Terminal + File).

```javascript
import { Logger, nodeAdapter, createFileAdapter } from "termilog-js";

const log = new Logger([nodeAdapter, createFileAdapter("debug.log")]);

log.error("This goes to stdout AND debug.log");
```

---

## 📄 License

MIT © [Nischal Dhakal](https://github.com/nischal720)
