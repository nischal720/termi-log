import http from "http";
import nodeAdapter from "../src/adapters/nodeAdapter.js";

export function startBridge(port = 5000) {
  const server = http.createServer((req, res) => {
    // Enable CORS for all requests
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
          const entry = JSON.parse(body);
          nodeAdapter.write(entry);
          res.statusCode = 204;
          res.end();
        } catch (e) {
          res.statusCode = 400;
          res.end("Invalid JSON");
        }
      });
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  });

  server.listen(port, () => {
    console.log(`[Termilog] Bridge server running on port ${port}`);
  });

  return server;
}
