import http from "http";
import nodeAdapter from "../src/adapters/nodeAdapter.js";

const VALID_TYPES = new Set(["debug", "info", "warn", "error"]);

export function startBridge(port = 5000) {
  const server = http.createServer((req, res) => {
    // Enable CORS for all requests (frontend → bridge)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    // Only handle POST /__termi_log__
    if (req.method === "POST" && req.url === "/__termi_log__") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const payload = JSON.parse(body);

          // Validate required fields
          if (!payload || typeof payload !== "object") {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Payload must be a JSON object" }));
            return;
          }

          const type = VALID_TYPES.has(payload.type) ? payload.type : "info";
          const message =
            payload.message !== undefined ? payload.message : payload;
          const time =
            typeof payload.time === "string" && payload.time.trim() !== ""
              ? payload.time.trim()
              : new Date().toISOString();

          const entry = { time, type, message };

          nodeAdapter.write(entry);

          res.statusCode = 204;
          res.end();
        } catch (e) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  });

  server.listen(port, () => {
    console.log(
      `\x1b[36m[Termilog] Bridge server running on port ${port}.\x1b[0m`,
    );
    console.log(
      `\x1b[90m[Termilog] Waiting for logs... (Press Ctrl+C to exit)\x1b[0m`,
    );
  });

  return server;
}
