# 🖥️ Termilog

Universal terminal logger for Node.js and frontend frameworks

Termilog lets you send logs from Node.js, React, Vue, Next.js, or any JavaScript app directly to your terminal — without opening browser DevTools.

------------------------------------------------------------

FEATURES

    • Logs appear in your terminal, not the browser console  
    • Works with Node.js, React, Vue, Next.js, and more  
    • Multiple adapters: Terminal, Browser, File  
    • Configurable log levels  
    • Production ready & lightweight  
    • Easy to extend  

------------------------------------------------------------

INSTALLATION

    npm install termilog-js

------------------------------------------------------------

BASIC USAGE (Node.js)

    import { Logger, nodeAdapter } from "termilog-js";

    const log = new Logger(nodeAdapter);

    log.info("Server started");
    log.warn("Low memory");
    log.error("Something went wrong");

------------------------------------------------------------

USING WITH REACT / FRONTEND FRAMEWORKS

Browsers cannot access your terminal directly.  
Termilog solves this using a lightweight logging bridge server.

    STEP 1 — Start the bridge server

    Create file: log-server.js

      import { startBridge } from "termilog-js/bridge";
      startBridge(5000);

    Run it:

     node log-server.js

Keep this terminal open.

STEP 2 — Use Termilog in your React app

     import { Logger, createBrowserAdapter } from "termilog-js";

     const log = new Logger(createBrowserAdapter());

     log.info("React app started");
     log.warn("Button clicked");

Your logs will now appear in the terminal running log-server.js.

------------------------------------------------------------

FILE LOGGING

     import { Logger, createFileAdapter } from "termilog-js";

     const log = new Logger(createFileAdapter("app.log"));

     log.info("Saved to file");

------------------------------------------------------------

MULTIPLE ADAPTERS AT ONCE

    import { Logger, nodeAdapter, createFileAdapter } from "termilog-js";

    const log = new Logger([
       nodeAdapter,
     createFileAdapter("server.log")
     ]);

     log.error("Critical failure");

------------------------------------------------------------

LOG LEVELS

     const log = new Logger(nodeAdapter, { level: "warn" });

     log.debug("Ignored");
     log.info("Ignored");
     log.warn("Shown");
     log.error("Shown");

Log level order:
    debug → info → warn → error

------------------------------------------------------------

CUSTOM ADAPTER

    const myAdapter = {
      write(entry) {
      console.log("CUSTOM:", entry);
      }
     };

     const log = new Logger(myAdapter);

------------------------------------------------------------

EXAMPLE OUTPUT

     [INFO]  2025-12-24T10:15:30Z → Server started  
     [WARN]  2025-12-24T10:15:33Z → Low memory  
     [ERROR] 2025-12-24T10:15:40Z → Database connection failed  

------------------------------------------------------------

WHY TERMILOG?

    Developers waste time opening DevTools.  
    Termilog puts your logs where they belong — in your terminal.

------------------------------------------------------------

LICENSE

MIT

Nischal Dhakal
 