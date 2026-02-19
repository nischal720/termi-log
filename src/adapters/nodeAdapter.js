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

export default {
  write({ time, type, message }) {
    const colors = {
      debug: "\x1b[36m",
      info: "\x1b[32m",
      warn: "\x1b[33m",
      error: "\x1b[31m",
    };

    const reset = "\x1b[0m";
    const color = colors[type] || "";
    const formatted = formatMessage(message);

    // Multi-line pretty output for objects
    if (formatted.includes("\n")) {
      console.log(`${color}[${type.toUpperCase()}] ${time}${reset}`);
      console.log(`${color}${formatted}${reset}`);
    } else {
      console.log(
        `${color}[${type.toUpperCase()}] ${time} → ${formatted}${reset}`,
      );
    }
  },
};
