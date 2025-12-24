export default {
  write({ time, type, message }) {
    const colors = {
      debug: "\x1b[36m",
      info: "\x1b[32m",
      warn: "\x1b[33m",
      error: "\x1b[31m",
    };

    const color = colors[type] || "";
    console.log(`${color}[${type.toUpperCase()}] ${time} → ${message}\x1b[0m`);
  },
};
