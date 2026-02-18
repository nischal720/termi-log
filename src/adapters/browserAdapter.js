export default function createBrowserAdapter(options = {}) {
  let url;
  if (typeof options === "string") {
    url = options;
  } else {
    const {
      port = 5000,
      host = "localhost",
      protocol = "http",
      path = "/__termi_log__",
    } = options;
    url = options.url || `${protocol}://${host}:${port}${path}`;
  }

  return {
    write(entry) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }).catch(() => {
        // Silently fail in browser to avoid cluttering console
      });
    },
  };
}
