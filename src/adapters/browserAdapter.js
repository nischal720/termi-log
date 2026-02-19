export default function createBrowserAdapter(options = {}) {
  let url;
  let onError = null;

  if (typeof options === "string") {
    url = options;
  } else {
    const {
      port = 5000,
      host = "localhost",
      protocol = "http",
      path = "/__termi_log__",
      onError: _onError = null,
    } = options;
    url = options.url || `${protocol}://${host}:${port}${path}`;
    onError = _onError;
  }

  return {
    write(entry) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }).catch((err) => {
        if (typeof onError === "function") {
          onError(err, entry);
        }
        // Silently fail in browser to avoid cluttering console
      });
    },
  };
}
