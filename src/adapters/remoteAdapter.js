export default function createRemoteAdapter(options = {}) {
  const config =
    typeof options === "number"
      ? { port: options }
      : typeof options === "string"
        ? { host: options }
        : options;

  const {
    port = 5000,
    host = "localhost",
    protocol = "http",
    path = "/__termi_log__",
  } = config;

  const url = config.url || `${protocol}://${host}:${port}${path}`;

  return {
    write(entry) {
      // Use global fetch (built-in in browsers and Node 18+)
      if (typeof fetch === "function") {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        }).catch(() => {
          // Silently fail if bridge is down
        });
      }
    },
  };
}
