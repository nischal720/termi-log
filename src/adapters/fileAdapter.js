function formatMessage(message) {
  if (message === null || message === undefined) return String(message);
  if (typeof message === "object") {
    try {
      return JSON.stringify(message, null, 2);
    } catch {
      return String(message);
    }
  }
  return String(message);
}

export default function createFileAdapter(filePath = "server.log") {
  let fsPromise = null;

  return {
    write({ time, type, message }) {
      // Only try to use fs if it's available (Node.js)
      if (
        typeof process !== "undefined" &&
        process.release &&
        process.release.name === "node"
      ) {
        if (!fsPromise) {
          fsPromise = import("fs");
        }

        fsPromise
          .then((fs) => {
            const formatted = formatMessage(message);
            const line = `[${time}] [${type.toUpperCase()}] → ${formatted}\n`;
            fs.appendFileSync(filePath, line);
          })
          .catch(() => {
            // Fail silently if fs cannot be imported or written to
          });
      }
    },
  };
}
